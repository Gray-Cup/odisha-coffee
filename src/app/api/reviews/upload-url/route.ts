import { NextRequest, NextResponse } from "next/server";
import { createReviewUploadPost } from "@/lib/b2";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const contentType = typeof body?.contentType === "string" ? body.contentType : "";

  try {
    const post = await createReviewUploadPost(contentType);
    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not create upload URL." },
      { status: 400 }
    );
  }
}
