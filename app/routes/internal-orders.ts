import { desc } from "drizzle-orm";
import type { Route } from "./+types/internal-orders";
import { getOrdersDb, odishaCoffeeOrders } from "@/db/d1";
import { requireInternalAuth } from "@/lib/internal-auth";

// Read by orders-graycup (admin dashboard) - see app/lib/internal-auth.ts
// for why this exists instead of a direct D1 REST/binding connection.
export async function loader({ request, context }: Route.LoaderArgs) {
  const env = context.cloudflare.env;
  const unauthorized = requireInternalAuth(request, env);
  if (unauthorized) return unauthorized;

  const ordersDb = getOrdersDb(env);
  const rows = await ordersDb
    .select()
    .from(odishaCoffeeOrders)
    .orderBy(desc(odishaCoffeeOrders.created_at));

  return Response.json(
    rows.map((r) => ({ ...r, created_at: new Date(r.created_at).toISOString() }))
  );
}
