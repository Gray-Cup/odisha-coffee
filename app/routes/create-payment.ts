import { eq } from "drizzle-orm";
import type { Route } from "./+types/create-payment";
import { getOrdersDb, odishaCoffeeOrders } from "@/db/d1";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { getFarmBySlug } from "@/data/farms";
import {
  computeOrderTotal,
  resolveCartProduct,
  gramsForResolved,
  pricePerKgFor,
  computeItemPrice,
  type OrderItem,
} from "@/lib/pricing";

// Orders API + Checkout.js, NOT the Payment Links API (/pg/links). Links are
// Cashfree's no-code/shareable-link product (email/SMS/WhatsApp collection);
// Orders + a payment_session_id is the actual storefront checkout flow, and
// lets the frontend render Cashfree's checkout via the cashfree-js SDK
// instead of redirecting to a bare payments.cashfree.com/links/... page.
const CASHFREE_API_URL = "https://api.cashfree.com/pg/orders";

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

export async function action({ request, context }: Route.ActionArgs) {
  const env = context.cloudflare.env;
  const CASHFREE_CLIENT_ID = env.CASHFREE_CLIENT_ID;
  const CASHFREE_CLIENT_SECRET = env.CASHFREE_CLIENT_SECRET;

  try {
    if (!CASHFREE_CLIENT_ID || !CASHFREE_CLIENT_SECRET) {
      return Response.json({ error: "Payment gateway not configured" }, { status: 500 });
    }

    const body: OdishaOrderRequest = await request.json();
    const { name, phone, email, country, pincode, address, state, gstOrTaxId, businessType, products } = body;

    if (!name || !phone || !address || !pincode || products.length === 0) {
      return Response.json(
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
      totalAmount = computeOrderTotal(orderItems, country);
    } catch (err) {
      return Response.json(
        { error: err instanceof Error ? err.message : "Invalid order items" },
        { status: 400 },
      );
    }

    const linkId = `odisha_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 24);

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
          : (resolved?.kind === "estate" || resolved?.kind === "spice") && resolved.product.image
          ? `${origin}/${resolved.product.image}`
          : null;
      // Green (estate) lots carry the chosen partner farm on `resolved.farm`.
      // Roasted lots (kind "product") are also farm-selectable in the UI —
      // the choice arrives as `item.farmId` and must reach the admin too.
      const roastedFarm =
        resolved?.kind === "product" && !resolved.product.isGreen && item.farmId
          ? getFarmBySlug(item.farmId)
          : undefined;
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
        ...(roastedFarm && { farmId: roastedFarm.id, farmName: roastedFarm.name }),
      };
    });

    const ordersDb = getOrdersDb(env);
    const [insertedOrder] = await ordersDb.insert(odishaCoffeeOrders).values({
      created_at: Date.now(),
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
    // serial id (e.g. OD-0001, OD-0002, ...), no separate counter needed.
    const orderRef = `OD-${String(insertedOrder.id).padStart(4, "0")}`;

    if (email) {
      // Fire-and-forget: sendOrderConfirmationEmail never throws, and a slow/failed
      // email must never delay or block the Cashfree order creation below.
      void sendOrderConfirmationEmail(env, {
        to: email,
        name,
        orderRef,
        items: itemsDetail.map((item) => ({
          name: item.name,
          tier: item.tier,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount,
        address,
        pincode,
      });
    }

    const productSummary = products
      .map((p) => {
        const [id, weight] = p.split(":");
        return `${id} (${weight})`;
      })
      .join(", ");

    const returnUrl = `${origin}/checkout/success?link_id=${linkId}&order_ref=${orderRef}`;

    // `linkId` doubles as Cashfree's order_id, it's already alphanumeric
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
      order_note: `Odisha Coffee ${orderRef}, ${productSummary}`,
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

    // Cashfree returns JSON on both success and (normal) error, but on a
    // gateway-level failure (5xx, WAF block, etc.) the body can be HTML/empty
    // - read as text first so a non-JSON response surfaces its raw content
    // instead of throwing inside this try block and falling through to the
    // generic outer catch below.
    const rawBody = await response.text();
    let data: Record<string, unknown> = {};
    try {
      data = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      console.error("Cashfree API returned non-JSON body:", response.status, rawBody.slice(0, 500));
      return Response.json(
        { error: `Cashfree returned an unexpected response (status ${response.status}): ${rawBody.slice(0, 300) || "empty body"}` },
        { status: 502 }
      );
    }

    if (!response.ok) {
      console.error("Cashfree API error:", response.status, data);
      return Response.json(
        { error: `Cashfree error (status ${response.status}): ${(data as { message?: string }).message || JSON.stringify(data)}` },
        { status: response.status }
      );
    }

    // `cf_link_id` originally tracked the Payment Links product's own id;
    // it's repurposed here to hold Cashfree's internal cf_order_id.
    if (data.cf_order_id) {
      await ordersDb.update(odishaCoffeeOrders)
        .set({ cf_link_id: String(data.cf_order_id) })
        .where(eq(odishaCoffeeOrders.link_id, linkId));
    }

    return Response.json({
      success: true,
      paymentSessionId: data.payment_session_id,
      returnUrl,
      linkId,
      orderRef,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    // Drizzle can wrap driver errors with the real reason (constraint
    // violation, connection error, etc.) on `.cause` - surface that instead
    // of the generic wrapper message when present.
    const cause = error instanceof Error && error.cause instanceof Error ? error.cause : null;
    const message = cause?.message ?? (error instanceof Error ? error.message : String(error));
    return Response.json({ error: `Order creation failed: ${message}` }, { status: 500 });
  }
}
