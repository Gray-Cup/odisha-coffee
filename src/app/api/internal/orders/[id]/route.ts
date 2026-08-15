import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
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
] as const;

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  const unauthorized = requireInternalAuth(request);
  if (unauthorized) return unauthorized;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const update: Record<string, string | null> = {};
  for (const field of PATCHABLE_FIELDS) {
    if (field in body) {
      const value = (body as Record<string, unknown>)[field];
      if (value !== null && typeof value !== "string") {
        return NextResponse.json({ error: `${field} must be a string or null` }, { status: 400 });
      }
      update[field] = value;
    }
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No patchable fields provided" }, { status: 400 });
  }

  const ordersDb = await getOrdersDb();
  await ordersDb.update(odishaCoffeeOrders).set(update).where(eq(odishaCoffeeOrders.id, id));

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const unauthorized = requireInternalAuth(request);
  if (unauthorized) return unauthorized;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const ordersDb = await getOrdersDb();
  await ordersDb.delete(odishaCoffeeOrders).where(eq(odishaCoffeeOrders.id, id));

  return NextResponse.json({ success: true });
}
