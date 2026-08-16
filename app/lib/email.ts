import { Resend } from "resend";

function getResend(env: Env): Resend | null {
  const key = env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY is not set - transactional email will not be sent");
    return null;
  }
  return new Resend(key);
}

// Order creation must never fail because an email couldn't be sent.
async function send(env: Env, to: string, subject: string, html: string) {
  const resend = getResend(env);
  if (!resend) return;

  try {
    const from =
      env.RESEND_FROM_EMAIL || "Odisha Coffee <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

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
          <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;color:#171717;font-size:14px;">
            <div style="font-weight:500;">
              ${item.name}
            </div>
            <div style="color:#737373;font-size:12px;margin-top:3px;">
              ${item.tier}${item.quantity > 1 ? ` · Qty ${item.quantity}` : ""}
            </div>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;text-align:right;color:#171717;font-size:14px;white-space:nowrap;">
            ₹${item.price.toLocaleString("en-IN")}
          </td>
        </tr>`
    )
    .join("");

  await send(
    env,
    to,
    `Order received — ${orderRef} — Odisha Coffee`,
    `
      <div style="margin:0;padding:32px 16px;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#171717;">
        <div style="max-width:520px;margin:0 auto;">

          <!-- Main card -->
          <div style="background:#ffffff;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">

            <!-- Header -->
            <div style="padding:28px 28px 22px;border-bottom:1px solid #eeeeee;">
              <div style="font-size:13px;color:#737373;letter-spacing:0.02em;margin-bottom:10px;">
                ODISHACOFFEE
              </div>

              <h1 style="margin:0;font-size:22px;line-height:1.3;font-weight:600;letter-spacing:-0.02em;color:#111111;">
                Order received
              </h1>

              <p style="margin:8px 0 0;color:#737373;font-size:14px;line-height:1.5;">
                Thanks for your order, ${name || "there"}.
              </p>
            </div>

            <!-- Order reference -->
            <div style="padding:20px 28px 4px;">
              <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#8a8a8a;margin-bottom:5px;">
                Order reference
              </div>

              <div style="font-size:14px;font-weight:600;color:#171717;">
                ${orderRef}
              </div>
            </div>

            <!-- Items -->
            <div style="padding:4px 28px 0;">
              <table style="width:100%;border-collapse:collapse;">
                <tbody>
                  ${itemRows}

                  <tr>
                    <td style="padding:18px 0 6px;font-size:14px;font-weight:600;color:#171717;">
                      Total
                    </td>
                    <td style="padding:18px 0 6px;text-align:right;font-size:16px;font-weight:600;color:#111111;">
                      ₹${totalAmount.toLocaleString("en-IN")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Delivery -->
            <div style="margin:20px 28px 28px;padding:16px;background:#f7f7f7;border-radius:8px;">
              <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#8a8a8a;margin-bottom:7px;">
                Delivering to
              </div>

              <div style="font-size:14px;line-height:1.5;color:#333333;">
                ${address}<br />
                ${pincode}
              </div>
            </div>

            <!-- Status message -->
            <div style="padding:0 28px 28px;">
              <p style="margin:0;color:#555555;font-size:13px;line-height:1.6;">
                We’ll verify your payment and confirm your order shortly.
                If we find any issue, we’ll contact you by email, phone, or WhatsApp.
              </p>

              <p style="margin:12px 0 0;color:#999999;font-size:12px;line-height:1.5;">
                If you have any questions about this order, simply reply to this email.
              </p>
            </div>

          </div>

          <!-- Brand footer -->
          <div style="margin-top:12px;background:rgb(107,21,21);border-radius:12px;padding:24px;text-align:center;">
            <div style="font-size:15px;font-weight:600;color:#ffffff;">
              Odisha Coffee
            </div>

            <a
              href="https://odishacoffee.com"
              style="display:inline-block;margin-top:6px;color:#e6caca;font-size:12px;text-decoration:none;"
            >
              odishacoffee.com
            </a>

            <div style="height:1px;background:rgba(255,255,255,0.18);margin:18px 0;"></div>

            <div style="font-size:12px;line-height:1.7;color:#eadada;">
              <strong style="color:#ffffff;">Need help?</strong><br />

              <a
                href="tel:+918527914317"
                style="color:#eadada;text-decoration:none;"
              >
                +91 8527914317
              </a>

              &nbsp;&nbsp;·&nbsp;&nbsp;

              <a
                href="mailto:office@graycup.org"
                style="color:#eadada;text-decoration:none;"
              >
                office@graycup.org
              </a>
            </div>

            <div style="height:1px;background:rgba(255,255,255,0.18);margin:18px 0;"></div>

            <div style="font-size:10px;line-height:1.6;color:#d8bebe;">
              Odisha Coffee is owned and operated by Gray Cup Enterprises Private Limited.

              <br />

              Harsha Bhawan, 4th Floor, 13/29 E- Block,
              Connaught Place, New Delhi-110001

              <br />

              GSTIN: 07AAMCG4985H1Z2
            </div>

            <div style="margin-top:12px;">
              <a
                href="https://graycup.com"
                style="color:#ffffff;font-size:11px;text-decoration:none;"
              >
                graycup.com
              </a>
            </div>
          </div>

          <!-- Copyright -->
          <div style="padding:16px 0;text-align:center;color:#a3a3a3;font-size:11px;">
            © ${new Date().getFullYear()} Gray Cup Enterprises Private Limited
          </div>

        </div>
      </div>
    `,
  );
}