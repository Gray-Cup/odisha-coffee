import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq, sql } from "drizzle-orm";
import { createDb, odishaCoffeeOrders } from "@/db";
import { ensureReviewsTable, reviews, tursoDb } from "@/db/turso";
import { resolveCartProduct } from "@/lib/pricing";
import { verifyTurnstileToken } from "@/lib/turnstile-verify";
import { MAX_REVIEW_IMAGES } from "@/lib/b2";

const PAGE_SIZE = 20;

export async function GET(request: NextRequest) {
  await ensureReviewsTable();

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  const catalog = searchParams.get("catalog");
  const cursor = Number(searchParams.get("cursor") ?? 0) || 0;

  const conditions = [eq(reviews.status, "approved")];
  if (productId) conditions.push(eq(reviews.productId, productId));
  if (catalog) conditions.push(eq(reviews.productCatalog, catalog));

  const rows = await tursoDb
    .select()
    .from(reviews)
    .where(and(...conditions))
    .orderBy(desc(reviews.createdAt))
    .limit(PAGE_SIZE + 1)
    .offset(cursor);

  const hasMore = rows.length > PAGE_SIZE;
  const page = rows.slice(0, PAGE_SIZE).map((row) => ({
    ...row,
    images: row.images ? (JSON.parse(row.images) as string[]) : [],
  }));

  return NextResponse.json({
    reviews: page,
    nextCursor: hasMore ? cursor + PAGE_SIZE : null,
  });
}

export async function POST(request: NextRequest) {
  await ensureReviewsTable();

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const reviewerName = typeof body?.name === "string" ? body.name.trim() : "";
  const productSlug = typeof body?.productSlug === "string" ? body.productSlug : "";
  const rating = Number(body?.rating);
  const title = typeof body?.title === "string" ? body.title.trim().slice(0, 120) : null;
  const content = typeof body?.content === "string" ? body.content.trim() : "";
  const images = Array.isArray(body?.images) ? (body.images as unknown[]).filter((u) => typeof u === "string") : [];
  const turnstileToken = typeof body?.turnstileToken === "string" ? body.turnstileToken : null;

  if (!reviewerName) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });
  }
  if (content.length < 10) {
    return NextResponse.json({ error: "Review must be at least 10 characters." }, { status: 400 });
  }
  if (images.length > MAX_REVIEW_IMAGES) {
    return NextResponse.json({ error: `Up to ${MAX_REVIEW_IMAGES} photos allowed.` }, { status: 400 });
  }
  const publicBase = process.env.B2_PUBLIC_BASE_URL?.replace(/\/$/, "");
  if (publicBase && images.some((u) => !u.startsWith(publicBase))) {
    return NextResponse.json({ error: "Invalid image URL." }, { status: 400 });
  }

  const humanVerified = await verifyTurnstileToken(turnstileToken);
  if (!humanVerified) {
    return NextResponse.json({ error: "Captcha verification failed." }, { status: 400 });
  }

  // Re-verify server-side: the client's earlier /verify-email response is
  // never trusted at submit time, and the chosen product must actually be
  // one this email paid for.
  const resolved = resolveCartProduct(productSlug);
  if (!resolved) {
    return NextResponse.json({ error: "Unknown product." }, { status: 400 });
  }

  const { db, close } = createDb();
  let orders;
  try {
    orders = await db
      .select({ linkId: odishaCoffeeOrders.link_id, itemsDetail: odishaCoffeeOrders.items_detail })
      .from(odishaCoffeeOrders)
      .where(
        sql`lower(${odishaCoffeeOrders.email}) = lower(${email}) AND ${odishaCoffeeOrders.payment_status} = 'paid'`
      );
  } finally {
    await close();
  }

  let orderLinkId: string | null = null;
  for (const order of orders) {
    if (!order.itemsDetail) continue;
    try {
      const parsed = JSON.parse(order.itemsDetail) as Array<{ slug: string }>;
      if (parsed.some((item) => item.slug === productSlug)) {
        orderLinkId = order.linkId;
        break;
      }
    } catch {
      continue;
    }
  }

  if (!orderLinkId) {
    return NextResponse.json(
      { error: "We couldn't find this product on a paid order under that email address." },
      { status: 403 }
    );
  }

  const [inserted] = await tursoDb
    .insert(reviews)
    .values({
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      productId: productSlug,
      productCatalog: resolved.kind,
      productName: resolved.product.name,
      reviewerName,
      reviewerEmail: email,
      rating,
      title,
      content,
      images: images.length > 0 ? JSON.stringify(images) : null,
      status: "pending",
      orderLinkId,
    })
    .returning();

  return NextResponse.json({ review: inserted });
}
