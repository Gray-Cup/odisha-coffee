import type { Route } from "./+types/api-contact";

const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const RATE_LIMIT_STORAGE = new Map<string, { count: number; resetTime: number }>();

function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");

  if (cfConnectingIP) return cfConnectingIP;
  if (realIP) return realIP;
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const clientData = RATE_LIMIT_STORAGE.get(ip);

  if (!clientData || now > clientData.resetTime) {
    RATE_LIMIT_STORAGE.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true };
  }

  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      resetTime: clientData.resetTime,
    };
  }

  clientData.count++;
  RATE_LIMIT_STORAGE.set(ip, clientData);
  return { allowed: true };
}

function validateContactData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data?.name || typeof data.name !== "string" || data.name.trim().length === 0) {
    errors.push("Name is required");
  } else if (data.name.trim().length > 100) {
    errors.push("Name must be less than 100 characters");
  }

  if (!data?.email || typeof data.email !== "string") {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push("Invalid email format");
    } else if (data.email.length > 254) {
      errors.push("Email must be less than 254 characters");
    }
  }

  if (!data?.company || typeof data.company !== "string" || data.company.trim().length === 0) {
    errors.push("Company name is required");
  } else if (data.company.trim().length > 100) {
    errors.push("Company name must be less than 100 characters");
  }

  if (!data?.message || typeof data.message !== "string" || data.message.trim().length === 0) {
    errors.push("Message is required");
  } else if (data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters");
  } else if (data.message.trim().length > 2000) {
    errors.push("Message must be less than 2000 characters");
  }

  return { isValid: errors.length === 0, errors };
}

export async function action({ request, context }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP);

    if (!rateLimitResult.allowed) {
      const resetTime = rateLimitResult.resetTime || Date.now();
      const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);

      return Response.json(
        { error: "Too many requests. Please try again later.", retryAfter },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfter.toString(),
            "X-RateLimit-Limit": MAX_REQUESTS_PER_WINDOW.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": Math.ceil(resetTime / 1000).toString(),
          },
        }
      );
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid JSON in request body" }, { status: 400 });
    }

    const validation = validateContactData(body);
    if (!validation.isValid) {
      return Response.json({ error: "Validation failed", details: validation.errors }, { status: 400 });
    }

    const contactData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      company: body.company.trim(),
      message: body.message.trim(),
    };

    const env = (context as any)?.cloudflare?.env || process.env;
    const webhookUrl = env.CONTACT_WEBHOOK_URL;

    if (webhookUrl) {
      fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Gray Cup-Contact-Form/1.0",
        },
        body: JSON.stringify({
          type: "contact_form_submission",
          data: contactData,
          metadata: {
            ip: clientIP,
            userAgent: request.headers.get("user-agent") || "unknown",
            timestamp: new Date().toISOString(),
          },
        }),
      }).catch((err) => console.error("Webhook error:", err));
    }

    return Response.json(
      { success: true, message: "Contact form submitted successfully" },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": MAX_REQUESTS_PER_WINDOW.toString(),
          "X-RateLimit-Remaining": (
            MAX_REQUESTS_PER_WINDOW - (RATE_LIMIT_STORAGE.get(clientIP)?.count || 0)
          ).toString(),
        },
      }
    );
  } catch (error) {
    console.error("Contact form API error:", error);
    return Response.json({ error: "Internal server error. Please try again later." }, { status: 500 });
  }
}

export async function loader() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
