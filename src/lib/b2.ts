import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

// Backblaze B2's S3-compatible API accepts the standard AWS SDK with the
// endpoint overridden to the bucket's B2 region - see
// https://www.backblaze.com/apidocs/introduction-to-the-s3-compatible-api
function getB2Client(): S3Client {
  const endpoint = process.env.B2_ENDPOINT;
  const region = process.env.B2_REGION;
  const keyId = process.env.B2_KEY_ID;
  const applicationKey = process.env.B2_APPLICATION_KEY;
  if (!endpoint || !region || !keyId || !applicationKey) {
    throw new Error("B2_ENDPOINT / B2_REGION / B2_KEY_ID / B2_APPLICATION_KEY are not set");
  }
  return new S3Client({
    endpoint: `https://${endpoint}`,
    region,
    credentials: { accessKeyId: keyId, secretAccessKey: applicationKey },
  });
}

const ALLOWED_CONTENT_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB

const CONTENT_TYPE_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/**
 * Returns a presigned POST (fields + url) the browser can upload a review
 * photo directly to, plus the public URL it will be reachable at once
 * uploaded. The size/content-type limits are enforced by B2 itself via the
 * POST policy conditions, not just client-side.
 */
export async function createReviewUploadPost(contentType: string) {
  if (!ALLOWED_CONTENT_TYPES.includes(contentType)) {
    throw new Error("Only JPEG, PNG, or WebP images are allowed.");
  }
  const bucket = process.env.B2_BUCKET_NAME;
  const publicBase = process.env.B2_PUBLIC_BASE_URL;
  if (!bucket || !publicBase) {
    throw new Error("B2_BUCKET_NAME / B2_PUBLIC_BASE_URL are not set");
  }

  const ext = CONTENT_TYPE_EXTENSIONS[contentType];
  const key = `reviews/${crypto.randomUUID()}.${ext}`;

  const { url, fields } = await createPresignedPost(getB2Client(), {
    Bucket: bucket,
    Key: key,
    Conditions: [
      ["content-length-range", 0, MAX_IMAGE_BYTES],
      ["eq", "$Content-Type", contentType],
    ],
    Fields: { "Content-Type": contentType },
    Expires: 300, // 5 minutes
  });

  return {
    uploadUrl: url,
    fields,
    publicUrl: `${publicBase.replace(/\/$/, "")}/${key}`,
  };
}

export const MAX_REVIEW_IMAGES = 5;
