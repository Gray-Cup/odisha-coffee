import type { Route } from "./+types/api-webhooks-enterprise";

export async function action({ request, context }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = (await request.json().catch(() => ({}))) as any;
    const {
      companyName,
      website,
      industry,
      teamSize,
      contactName,
      contactEmail,
      contactPhone,
      budgetRange,
      requirements,
      timeline,
      type,
      timestamp,
      step,
    } = body || {};

    if (!companyName || !contactEmail || !contactName) {
      return Response.json(
        { error: "Company name, contact name, and email are required" },
        { status: 400 }
      );
    }

    const env = (context as any)?.cloudflare?.env || process.env;
    const webhookUrl = env.DISCORD_ENTERPRISE_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("Discord webhook URL is not configured");
      return Response.json({ error: "Webhook not configured" }, { status: 500 });
    }

    const discordMessage = {
      embeds: [
        {
          title: "🏢 New Enterprise Inquiry",
          color: 5814783,
          fields: [
            {
              name: "🏢 Company Information",
              value: `**Company:** ${companyName}\n**Website:** ${website || "Not provided"}\n**Industry:** ${industry || "Not provided"}\n**Team Size:** ${teamSize || "Not provided"}`,
              inline: false,
            },
            {
              name: "👤 Contact Details",
              value: `**Name:** ${contactName}\n**Email:** ${contactEmail}\n**Phone:** ${contactPhone || "Not provided"}`,
              inline: false,
            },
            {
              name: "💰 Requirements",
              value: `**Budget Range:** ${budgetRange || "Not provided"}\n**Timeline:** ${timeline || "Not provided"}`,
              inline: false,
            },
            {
              name: "📋 Project Details",
              value: requirements || "No additional requirements provided",
              inline: false,
            },
            {
              name: "📊 Form Info",
              value: `**Type:** ${type}\n**Step Completed:** ${step || "All steps"}\n**Submitted:** ${new Date(timestamp || Date.now()).toLocaleString()}`,
              inline: false,
            },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Enterprise CRM Platform - New Lead",
            icon_url: "https://cdn-icons-png.flaticon.com/512/4712/4712105.png",
          },
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

    return Response.json({ success: true, message: "Enterprise inquiry submitted successfully" });
  } catch (error) {
    console.error("Error sending enterprise inquiry to Discord:", error);
    return Response.json({ error: "Failed to submit enterprise inquiry" }, { status: 500 });
  }
}

export async function loader() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
