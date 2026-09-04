import { createHmac, timingSafeEqual } from "node:crypto";
import { and, eq, ne } from "drizzle-orm";
import type { Route } from "./+types/api-webhooks-cashfree";
import { getOrdersDb, odishaCoffeeOrders } from "@/db/d1";

// Cashfree PG webhook. Configure the endpoint (https://odishacoffee.com/api/webhooks/cashfree)
// in the Cashfree dashboard → Developers → Webhooks, subscribed to payment events.
// Signature = base64(HMAC-SHA256(timestamp + rawBody, CASHFREE_CLIENT_SECRET)).
// This is the ONLY thing that flips an order to "paid" automatically - without
// it, an admin has to hit "Verify Payment" / "Mark as Paid" by hand.

function verifySignature(secret: string, timestamp: string, rawBody: string, received: string): boolean {
  const expected = createHmac("sha256", secret).update(timestamp + rawBody).digest("base64");
  const a = Buffer.from(expected);
  const b = Buffer.from(received);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function action({ request, context }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const env = context.cloudflare.env;
  const secret = env.CASHFREE_CLIENT_SECRET;
  if (!secret) {
    console.error("CASHFREE_CLIENT_SECRET not configured - cannot verify webhook");
    return Response.json({ error: "Not configured" }, { status: 500 });
  }

  const rawBody = await request.text();
  const timestamp = request.headers.get("x-webhook-timestamp");
  const signature = request.headers.get("x-webhook-signature");

  if (!timestamp || !signature || !verifySignature(secret, timestamp, rawBody, signature)) {
    console.warn("Cashfree webhook: signature verification failed");
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Only a successful payment matters here. Everything else (FAILED, PENDING,
  // DROPPED, refund events, the dashboard "test" ping) is acknowledged and ignored.
  const orderId: string | undefined = payload?.data?.order?.order_id;
  const paymentStatus: string | undefined = payload?.data?.payment?.payment_status;
  const cfPaymentId = payload?.data?.payment?.cf_payment_id;

  if (payload?.type === "PAYMENT_SUCCESS_WEBHOOK" && paymentStatus === "SUCCESS" && orderId) {
    const ordersDb = getOrdersDb(env);
    // order_id == our link_id (see create-payment.ts). Idempotent: the
    // `ne(payment_status, "paid")` guard means Cashfree's retries / duplicate
    // deliveries are no-ops, and a manual "Mark as Paid" isn't overwritten.
    await ordersDb
      .update(odishaCoffeeOrders)
      .set({
        payment_status: "paid",
        cf_payment_id: cfPaymentId != null ? String(cfPaymentId) : null,
      })
      .where(and(eq(odishaCoffeeOrders.link_id, orderId), ne(odishaCoffeeOrders.payment_status, "paid")));
  }

  return Response.json({ received: true });
}

export async function loader() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
