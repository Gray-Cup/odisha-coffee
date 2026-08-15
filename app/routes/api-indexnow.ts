import type { Route } from "./+types/api-indexnow";

export async function action({ request, context }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = (await request.json().catch(() => null)) as { urlList?: unknown } | unknown[] | null;
    const urls: string[] = Array.isArray(body) ? body : Array.isArray(body?.urlList) ? body.urlList : [];

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return Response.json({ error: "Invalid url list" }, { status: 400 });
    }

    const env = (context as any)?.cloudflare?.env || process.env;
    const siteUrl = env.SITE_URL || "https://odishacoffee.com";
    const host = new URL(siteUrl).host;
    const key = env.INDEXNOW_KEY;

    if (!key) {
      return Response.json({ error: "INDEXNOW_KEY not set" }, { status: 500 });
    }

    const payload = {
      host,
      key,
      keyLocation: `${siteUrl}/${key}.txt`,
      urlList: urls,
    };

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return Response.json({ success: res.ok });
  } catch {
    return Response.json({ error: "Unexpected error" }, { status: 500 });
  }
}

export async function loader() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
