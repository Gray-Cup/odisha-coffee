import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db, odishaCoffeeOrders } from "@/db";
import { resolveCartProduct } from "@/lib/pricing";
import { verifyTurnstileToken } from "@/lib/turnstile-verify";

export type PurchasedItem = {
  slug: string;
  catalog: "product" | "estate";
  name: string;
  image: string | null;
  orderLinkId: string;
};

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const turnstileToken = typeof body?.turnstileToken === "string" ? body.turnstileToken : null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const humanVerified = await verifyTurnstileToken(turnstileToken);
  if (!humanVerified) {
    return NextResponse.json({ error: "Captcha verification failed." }, { status: 400 });
  }

  const orders = await db
    .select({ linkId: odishaCoffeeOrders.link_id, itemsDetail: odishaCoffeeOrders.items_detail })
    .from(odishaCoffeeOrders)
    .where(
      sql`lower(${odishaCoffeeOrders.email}) = lower(${email}) AND ${odishaCoffeeOrders.payment_status} = 'paid'`
    );

  if (orders.length === 0) {
    return NextResponse.json({ verified: false, items: [] });
  }

  const itemsBySlug = new Map<string, PurchasedItem>();
  for (const order of orders) {
    if (!order.itemsDetail) continue;
    let parsed: Array<{ slug: string; name: string; image: string | null }>;
    try {
      parsed = JSON.parse(order.itemsDetail);
    } catch {
      continue;
    }
    for (const item of parsed) {
      if (itemsBySlug.has(item.slug)) continue;
      const resolved = resolveCartProduct(item.slug);
      if (!resolved) continue;
      itemsBySlug.set(item.slug, {
        slug: item.slug,
        catalog: resolved.kind,
        name: resolved.product.name,
        image: item.image ?? null,
        orderLinkId: order.linkId,
      });
    }
  }

  return NextResponse.json({ verified: true, items: Array.from(itemsBySlug.values()) });
}
