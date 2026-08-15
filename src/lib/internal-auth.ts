import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

// Guards the /api/internal/* routes that orders-graycup (a plain Node app,
// not a Cloudflare Worker) calls over HTTPS to read/write D1 order data it
// can't reach directly - D1 only has a binding API inside a Worker, plus
// Cloudflare's account-level REST API which would need a separate API
// token. A shared secret here avoids provisioning that.
export function requireInternalAuth(request: NextRequest): NextResponse | null {
  const expected = process.env.INTERNAL_API_SECRET;
  if (!expected) {
    return NextResponse.json({ error: "INTERNAL_API_SECRET not configured" }, { status: 500 });
  }
  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token || !safeEqual(token, expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
