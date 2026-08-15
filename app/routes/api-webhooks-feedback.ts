import type { Route } from "./+types/api-webhooks-feedback";

export async function action({ request, context }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = (await request.json().catch(() => ({}))) as any;
    const { message, email, twitter } = body || {};

    if (!message || !email) {
      return Response.json({ error: "Message and email are required" }, { status: 400 });
    }

    const env = (context as any)?.cloudflare?.env || process.env;
    const webhookUrl = env.DISCORD_FEEDBACK_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("Discord webhook URL is not configured");
      return Response.json({ error: "Webhook not configured" }, { status: 500 });
    }

    const discordMessage = {
      embeds: [
        {
          title: "💬 New Feedback",
          color: 10181046,
          fields: [
            { name: "Feedback", value: message },
            { name: "Contact", value: `Email: ${email}\nTwitter: ${twitter || "Not provided"}` },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordMessage),
    });

    if (!res.ok) {
      throw new Error(`Discord webhook error: ${res.statusText}`);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error sending feedback to Discord:", error);
    return Response.json({ error: "Failed to send to Discord" }, { status: 500 });
  }
}

export async function loader() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
