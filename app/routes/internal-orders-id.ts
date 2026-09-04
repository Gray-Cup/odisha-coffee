import { eq } from "drizzle-orm";
import type { Route } from "./+types/internal-orders-id";
import { getOrdersDb, odishaCoffeeOrders } from "@/db/d1";
import { requireInternalAuth } from "@/lib/internal-auth";

// Mirrors the fields lib/shipping/adapters.ts' odishaAdapter (orders-graycup)
// writes: carrier/waybill/pickup/shadowfax/dispatch_status via updateShipping(),
// payment_status via setPaymentStatus(). Only these are ever set from the
// admin side - everything else is buyer-filled and immutable after checkout.
const PATCHABLE_FIELDS = [
  "carrier",
  "delhivery_waybill",
  "delhivery_pickup_date",
  "shadowfax_request_id",
  "dispatch_status",
  "payment_status",
  "cf_payment_id",
] as const;

// Resource routes dispatch every non-GET method through one `action` - PATCH
// vs DELETE is decided by request.method here (Next.js used separate named
// exports for this).
export async function action({ request, params, context }: Route.ActionArgs) {
  const env = context.cloudflare.env;
  const unauthorized = requireInternalAuth(request, env);
  if (unauthorized) return unauthorized;

  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    return Response.json({ error: "Invalid id" }, { status: 400 });
  }

  const ordersDb = getOrdersDb(env);

  if (request.method === "DELETE") {
    await ordersDb.delete(odishaCoffeeOrders).where(eq(odishaCoffeeOrders.id, id));
    return Response.json({ success: true });
  }

  if (request.method === "PATCH") {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return Response.json({ error: "Invalid body" }, { status: 400 });
    }

    const update: Record<string, string | null> = {};
    for (const field of PATCHABLE_FIELDS) {
      if (field in body) {
        const value = (body as Record<string, unknown>)[field];
        if (value !== null && typeof value !== "string") {
          return Response.json({ error: `${field} must be a string or null` }, { status: 400 });
        }
        update[field] = value;
      }
    }

    if (Object.keys(update).length === 0) {
      return Response.json({ error: "No patchable fields provided" }, { status: 400 });
    }

    await ordersDb.update(odishaCoffeeOrders).set(update).where(eq(odishaCoffeeOrders.id, id));
    return Response.json({ success: true });
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
