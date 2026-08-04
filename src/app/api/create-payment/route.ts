import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, odishaCoffeeOrders } from "@/db";
import { products as productCatalog } from "@/data/products";

/** "1kg" -> 1000, "250g" -> 250 */
function parseWeightToGrams(weight: string): number {
  const match = weight.trim().match(/^([\d.]+)\s*(kg|g)$/i);
  if (!match) return 0;
  const n = parseFloat(match[1]);
  return match[2].toLowerCase() === "kg" ? Math.round(n * 1000) : Math.round(n);
}

const CASHFREE_API_URL = "https://api.cashfree.com/pg/links";
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
  products: string[]; // "productId:weight" strings
  totalAmount: number; // INR
}

export async function POST(request: NextRequest) {
  try {
    if (!CASHFREE_CLIENT_ID || !CASHFREE_CLIENT_SECRET) {
      return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 });
    }

    const body: OdishaOrderRequest = await request.json();
    const { name, phone, email, country, pincode, address, state, gstOrTaxId, businessType, products, totalAmount } = body;

    if (!name || !phone || !address || !pincode || products.length === 0) {
      return NextResponse.json(
        { error: "Name, phone, address, pincode and at least one product are required" },
        { status: 400 }
      );
    }

    const linkId = `odisha_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 30);

    const origin = request.headers.get("origin") || "https://odishacoffee.com";

    // Per-item breakdown (name/image/price/weight) for the orders-graycup admin
    // dashboard - each entry is "productId:weight" with its own weight.
    const itemsDetail = products.map((entry) => {
      const [id, weight] = entry.split(":");
      const product = productCatalog.find((p) => p.id === id);
      const grams = parseWeightToGrams(weight ?? "");
      const price = product ? Math.round((product.pricePerKg * grams) / 1000) : 0;
      return {
        slug: id,
        name: product?.name ?? id,
        image: product?.image ? `${origin}/${product.image}` : null,
        tier: weight ?? "",
        grams,
        price,
      };
    });

    await db.insert(odishaCoffeeOrders).values({
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
    });

    const productSummary = products
      .map((p) => {
        const [id, weight] = p.split(":");
        return `${id} (${weight})`;
      })
      .join(", ");

    const paymentLinkPayload = {
      link_id: linkId,
      link_amount: totalAmount,
      link_currency: "INR",
      link_purpose: `Odisha Coffee — ${productSummary}`,
      customer_details: {
        customer_name: name,
        customer_phone: phone.replace(/\D/g, "").slice(-10),
        ...(email && { customer_email: email }),
      },
      link_meta: {
        return_url: `${origin}/checkout/success?link_id=${linkId}`,
      },
      link_notify: {
        send_sms: true,
        send_email: !!email,
      },
      link_expiry_time: expiryTime.toISOString(),
    };

    const response = await fetch(CASHFREE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": CASHFREE_CLIENT_ID,
        "x-client-secret": CASHFREE_CLIENT_SECRET,
        "x-api-version": "2023-08-01",
      },
      body: JSON.stringify(paymentLinkPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Cashfree API error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to create payment link" },
        { status: response.status }
      );
    }

    if (data.cf_link_id) {
      await db.update(odishaCoffeeOrders)
        .set({ cf_link_id: String(data.cf_link_id) })
        .where(eq(odishaCoffeeOrders.link_id, linkId));
    }

    return NextResponse.json({ success: true, paymentLink: data.link_url, linkId });
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
