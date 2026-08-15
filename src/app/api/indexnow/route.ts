export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as { urlList?: unknown } | unknown[] | null;
    const urls: string[] =
      Array.isArray(body) ? body : Array.isArray(body?.urlList) ? body.urlList : [];

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return Response.json({ error: "Invalid url list" }, { status: 400 });
    }

    const siteUrl = process.env.SITE_URL || "https://odishacoffee.com";
    const host = new URL(siteUrl).host;
    const key = process.env.INDEXNOW_KEY;

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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return Response.json({ success: res.ok });
  } catch (e) {
    return Response.json({ error: "Unexpected error" }, { status: 500 });
  }
}
