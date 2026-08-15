import { sql } from "drizzle-orm";
import type { Route } from "./+types/reviews-verify-email";
import { getOrdersDb, odishaCoffeeOrders } from "@/db/d1";
import { resolveCartProduct } from "@/lib/pricing";
import { verifyTurnstileToken } from "@/lib/turnstile-verify";

export type PurchasedItem = {
  slug: string;
  catalog: "product" | "estate" | "spice";
  name: string;
  image: string | null;
  orderLinkId: string;
};

export async function action({ request, context }: Route.ActionArgs) {
  const env = context.cloudflare.env;
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const turnstileToken = typeof body?.turnstileToken === "string" ? body.turnstileToken : null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const humanVerified = await verifyTurnstileToken(turnstileToken, env);
  if (!humanVerified) {
    return Response.json({ error: "Captcha verification failed." }, { status: 400 });
  }

  const ordersDb = getOrdersDb(env);
  const orders = await ordersDb
    .select({ linkId: odishaCoffeeOrders.link_id, itemsDetail: odishaCoffeeOrders.items_detail })
    .from(odishaCoffeeOrders)
    .where(
      sql`lower(${odishaCoffeeOrders.email}) = lower(${email}) AND ${odishaCoffeeOrders.payment_status} = 'paid'`
    );

  if (orders.length === 0) {
    return Response.json({ verified: false, items: [] });
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

  return Response.json({ verified: true, items: Array.from(itemsBySlug.values()) });
}
