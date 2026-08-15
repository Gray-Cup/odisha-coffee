import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { getOrdersDb, odishaCoffeeOrders } from "@/db/d1";
import { requireInternalAuth } from "@/lib/internal-auth";

// Read by orders-graycup (admin dashboard) - see src/lib/internal-auth.ts
// for why this exists instead of a direct D1 REST/binding connection.
export async function GET(request: NextRequest) {
  const unauthorized = requireInternalAuth(request);
  if (unauthorized) return unauthorized;

  const ordersDb = await getOrdersDb();
  const rows = await ordersDb
    .select()
    .from(odishaCoffeeOrders)
    .orderBy(desc(odishaCoffeeOrders.created_at));

  return NextResponse.json(
    rows.map((r) => ({ ...r, created_at: new Date(r.created_at).toISOString() }))
  );
}
