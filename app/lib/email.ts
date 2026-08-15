import { Resend } from "resend";

function getResend(env: Env): Resend | null {
  const key = env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY is not set - transactional email will not be sent");
    return null;
  }
  return new Resend(key);
}

// Order creation must never fail because an email couldn't be sent - the
// Cashfree order/payment flow that follows is the part that actually matters
// to the buyer, so this never throws (mirrors graycup-in-storefront/src/lib/email.ts).
async function send(env: Env, to: string, subject: string, html: string) {
  const resend = getResend(env);
  if (!resend) return;
  try {
    const from = env.RESEND_FROM_EMAIL || "Odisha Coffee <onboarding@resend.dev>";
    const { error } = await resend.emails.send({ from, to, subject, html });
    if (error) console.error("Resend send failed:", error);
  } catch (err) {
    console.error("Resend send threw:", err);
  }
}

export type OrderConfirmationItem = {
  name: string;
  tier: string;
  quantity: number;
  price: number;
};

export async function sendOrderConfirmationEmail(
  env: Env,
  params: {
    to: string;
    name: string;
    orderRef: string;
    items: OrderConfirmationItem[];
    totalAmount: number;
    address: string;
    pincode: string;
  },
) {
  const { to, name, orderRef, items, totalAmount, address, pincode } = params;

  const itemRows = items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #eee">${item.name} (${item.tier})${item.quantity > 1 ? ` × ${item.quantity}` : ""}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">₹${item.price.toLocaleString("en-IN")}</td>
        </tr>`
    )
    .join("");

  await send(
    env,
    to,
    `Order received — ${orderRef} — Odisha Coffee`,
    `<div style="font-family:sans-serif;max-width:480px;margin:0 auto">
      <h2>Hi ${name || "there"},</h2>
      <p>We've received your order <strong>${orderRef}</strong>. Here's a summary:</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        ${itemRows}
        <tr>
          <td style="padding:12px 0 0;font-weight:bold">Total</td>
          <td style="padding:12px 0 0;font-weight:bold;text-align:right">₹${totalAmount.toLocaleString("en-IN")}</td>
        </tr>
      </table>
      <p style="color:#555">Delivering to: ${address}, ${pincode}</p>
      <p style="color:#888;font-size:12px">If you have any questions about this order, just reply to this email.</p>
    </div>`
  );
}
