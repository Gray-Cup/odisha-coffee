import type { Route } from "./+types/reviews-upload-url";
import { createReviewUploadPost } from "@/lib/b2";

export async function action({ request, context }: Route.ActionArgs) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const contentType = typeof body?.contentType === "string" ? body.contentType : "";

  try {
    const post = await createReviewUploadPost(contentType, context.cloudflare.env);
    return Response.json(post);
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Could not create upload URL." },
      { status: 400 }
    );
  }
}
