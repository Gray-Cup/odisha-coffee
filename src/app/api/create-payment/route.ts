import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, odishaCoffeeOrders } from "@/db";
import {
  computeOrderTotal,
  resolveCartProduct,
  gramsForResolved,
  pricePerKgFor,
  computeItemPrice,
  type OrderItem,
} from "@/lib/pricing";

// Orders API + Checkout.js — NOT the Payment Links API (/pg/links). Links are
// Cashfree's no-code/shareable-link product (email/SMS/WhatsApp collection);
// Orders + a payment_session_id is the actual storefront checkout flow, and
// lets the frontend render Cashfree's checkout via the cashfree-js SDK
// instead of redirecting to a bare payments.cashfree.com/links/... page.
const CASHFREE_API_URL = "https://api.cashfree.com/pg/orders";
const CASHFREE_CLIENT_ID = process.env.CASHFREE_CLIENT_ID;
const CASHFREE_CLIENT_SECRET = process.env.CASHFREE_CLIENT_SECRET;

export interface OdishaOrderRequest {
  name: string;
  phone: string;
  email: string;
  country: string;
  pincode: string;
  address: string;
  state?: string;
  gstOrTaxId?: string;
  businessType?: string;
  products: string[]; // "productId:weight", "productId:weight:farmId", or "productId:weight:farmId:qty" strings
  totalAmount: number; // INR
}

export async function POST(request: NextRequest) {
  try {
    if (!CASHFREE_CLIENT_ID || !CASHFREE_CLIENT_SECRET) {
      return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 });
    }

    const body: OdishaOrderRequest = await request.json();
    const { name, phone, email, country, pincode, address, state, gstOrTaxId, businessType, products } = body;

    if (!name || !phone || !address || !pincode || products.length === 0) {
      return NextResponse.json(
        { error: "Name, phone, address, pincode and at least one product are required" },
        { status: 400 }
      );
    }

    const orderItems: OrderItem[] = products.map((entry) => {
      const [productId, weight, farmId, qty] = entry.split(":");
      return {
        productId,
        weight: weight ?? "",
        farmId: farmId || undefined,
        quantity: qty ? Math.max(1, Math.floor(Number(qty)) || 1) : 1,
      };
    });

    // The order total is ALWAYS computed here from our own product/tier
    // catalogue - the client cannot influence the charged amount by editing
    // the request body. computeOrderTotal throws if any product/weight is invalid.
    let totalAmount: number;
    try {
      totalAmount = computeOrderTotal(orderItems);
    } catch (err) {
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "Invalid order items" },
        { status: 400 },
      );
    }

    const linkId = `odisha_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 30);

    const origin = request.headers.get("origin") || "https://odishacoffee.com";

    // Per-item breakdown (name/image/price/weight) for the orders-graycup admin
    // dashboard - the order row only stores the aggregate total, so this is the
    // only place the "how much per item" detail is ever persisted. Prices here
    // are product-only (delivery is one order-level fee, not per item).
    const itemsDetail = orderItems.map((item) => {
      const resolved = resolveCartProduct(item.productId, item.farmId);
      const grams = resolved ? gramsForResolved(resolved, item.weight) : 0;
      const quantity = item.quantity ?? 1;
      const price = resolved ? computeItemPrice(pricePerKgFor(resolved, grams), grams) * quantity : 0;
      const image =
        resolved?.kind === "product" && resolved.product.image
          ? `${origin}/products/${resolved.product.image}`
          : resolved?.kind === "estate" && resolved.product.image
          ? `${origin}/${resolved.product.image}`
          : null;
      return {
        slug: item.productId,
        name: resolved?.product.name ?? item.productId,
        image,
        tier: item.weight,
        grams,
        price,
        quantity,
        ...(resolved?.kind === "estate" && {
          farmId: resolved.farm.id,
          farmName: resolved.farm.name,
        }),
      };
    });

    const [insertedOrder] = await db.insert(odishaCoffeeOrders).values({
      name,
      phone: phone.replace(/\D/g, "").slice(-12),
      email: email || null,
      country,
      pincode,
      address,
      state: state || null,
      gst_or_tax_id: gstOrTaxId || null,
      business_type: businessType || null,
      items_detail: JSON.stringify(itemsDetail),
      products: JSON.stringify(products),
      quantity_tier: "mixed",
      total_amount: totalAmount,
      link_id: linkId,
      payment_status: "pending",
    }).returning({ id: odishaCoffeeOrders.id });

    // Human-friendly sequential order reference derived from the row's own
    // serial id (e.g. OD-0001, OD-0002, ...) — no separate counter needed.
    const orderRef = `OD-${String(insertedOrder.id).padStart(4, "0")}`;

    const productSummary = products
      .map((p) => {
        const [id, weight] = p.split(":");
        return `${id} (${weight})`;
      })
      .join(", ");

    const returnUrl = `${origin}/checkout/success?link_id=${linkId}&order_ref=${orderRef}`;

    // `linkId` doubles as Cashfree's order_id — it's already alphanumeric
    // with underscores, well within the 3-50 char limit, and unique per order.
    const orderPayload = {
      order_id: linkId,
      order_amount: totalAmount,
      order_currency: "INR",
      customer_details: {
        customer_id: phone.replace(/\D/g, "").slice(-10) || `guest_${Date.now()}`,
        customer_name: name,
        customer_phone: phone.replace(/\D/g, "").slice(-10),
        ...(email && { customer_email: email }),
      },
      order_meta: {
        return_url: returnUrl,
      },
      order_note: `Odisha Coffee ${orderRef} — ${productSummary}`,
      order_expiry_time: expiryTime.toISOString(),
    };

    const response = await fetch(CASHFREE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": CASHFREE_CLIENT_ID,
        "x-client-secret": CASHFREE_CLIENT_SECRET,
        "x-api-version": "2023-08-01",
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Cashfree API error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to create payment order" },
        { status: response.status }
      );
    }

    // `cf_link_id` originally tracked the Payment Links product's own id;
    // it's repurposed here to hold Cashfree's internal cf_order_id.
    if (data.cf_order_id) {
      await db.update(odishaCoffeeOrders)
        .set({ cf_link_id: String(data.cf_order_id) })
        .where(eq(odishaCoffeeOrders.link_id, linkId));
    }

    return NextResponse.json({
      success: true,
      paymentSessionId: data.payment_session_id,
      returnUrl,
      linkId,
      orderRef,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
