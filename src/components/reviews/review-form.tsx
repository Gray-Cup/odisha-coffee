"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Turnstile, useTurnstile } from "@/components/ui/turnstile";
import { StarRating } from "./star-rating";
import type { PurchasedItem } from "@/app/api/reviews/verify-email/route";

const NEEDS_CAPTCHA = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const MAX_IMAGES = 5;

type Step = "email" | "pick-product" | "write" | "done";

type ReviewFormProps = {
  /** Pre-locks the review to one product (used on a product's own page). */
  lockedProduct?: { slug: string; catalog: "product" | "estate"; name: string };
  onClose?: () => void;
};

export function ReviewForm({ lockedProduct, onClose }: ReviewFormProps) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [items, setItems] = useState<PurchasedItem[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(lockedProduct?.slug ?? null);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const turnstile = useTurnstile();

  async function handleVerifyEmail() {
    setError(null);
    if (!email.trim()) {
      setError("Enter the email address you used to order.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken: turnstile.token }),
      });
      const data = (await res.json()) as { error?: string; verified?: boolean; items?: PurchasedItem[] };
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      if (!data.verified || !data.items || data.items.length === 0) {
        setError("We couldn't find a completed order under that email address.");
        return;
      }
      setItems(data.items);
      if (lockedProduct) {
        const match = (data.items as PurchasedItem[]).find((i) => i.slug === lockedProduct.slug);
        if (!match) {
          setError("We couldn't find this product on an order under that email address.");
          return;
        }
        setStep("write");
      } else {
        setStep("pick-product");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUploadImages(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);
    try {
      const remaining = MAX_IMAGES - images.length;
      const toUpload = Array.from(files).slice(0, remaining);
      const uploaded: string[] = [];
      for (const file of toUpload) {
        const urlRes = await fetch("/api/reviews/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contentType: file.type }),
        });
        const urlData = (await urlRes.json()) as {
          error?: string;
          uploadUrl?: string;
          fields?: Record<string, string>;
          publicUrl?: string;
        };
        if (!urlRes.ok || !urlData.uploadUrl || !urlData.fields || !urlData.publicUrl) {
          throw new Error(urlData.error || "Could not prepare upload.");
        }

        const form = new FormData();
        for (const [key, value] of Object.entries(urlData.fields)) {
          form.append(key, value);
        }
        form.append("file", file);

        const uploadRes = await fetch(urlData.uploadUrl, { method: "POST", body: form });
        if (!uploadRes.ok) throw new Error("Photo upload failed.");
        uploaded.push(urlData.publicUrl);
      }
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Photo upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit() {
    setError(null);
    if (!name.trim()) return setError("Your name is required.");
    if (rating < 1) return setError("Please choose a star rating.");
    if (content.trim().length < 10) return setError("Write a few more words about your experience.");
    if (!selectedSlug) return setError("Choose which product you're reviewing.");

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          productSlug: selectedSlug,
          rating,
          title,
          content,
          images,
          turnstileToken: turnstile.token,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "done") {
    return (
      <div className="py-6 text-center">
        <p className="text-lg font-medium">Thanks for your review!</p>
        <p className="mt-1 text-sm text-gray-600">
          It's been submitted for approval and will appear here once reviewed.
        </p>
        {onClose && (
          <Button className="mt-4" onClick={onClose}>
            Close
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}

      {step === "email" && (
        <div className="space-y-3">
          <div>
            <Label htmlFor="review-email">Email used on your order</Label>
            <Input
              id="review-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          {NEEDS_CAPTCHA && (
            <Turnstile onVerify={turnstile.handleVerify} onError={turnstile.handleError} onExpire={turnstile.handleExpire} />
          )}
          <Button
            onClick={handleVerifyEmail}
            disabled={submitting || (NEEDS_CAPTCHA && !turnstile.isVerified)}
            className="w-full"
          >
            {submitting ? "Checking..." : "Continue"}
          </Button>
        </div>
      )}

      {step === "pick-product" && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">Which product are you reviewing?</p>
          <div className="space-y-2">
            {items.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => {
                  setSelectedSlug(item.slug);
                  setStep("write");
                }}
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-left text-sm hover:border-odisha-green"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "write" && (
        <div className="space-y-3">
          <div>
            <Label>Rating</Label>
            <StarRating value={rating} onChange={setRating} size={28} />
          </div>
          <div>
            <Label htmlFor="review-name">Your name</Label>
            <Input id="review-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="review-title">Title (optional)</Label>
            <Input id="review-title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="review-content">Your review</Label>
            <Textarea
              id="review-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="review-images">Photos (optional, up to {MAX_IMAGES})</Label>
            <Input
              id="review-images"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              disabled={uploading || images.length >= MAX_IMAGES}
              onChange={(e) => handleUploadImages(e.target.files)}
            />
            {images.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {images.map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={src} src={src} alt="Review photo" className="h-16 w-16 rounded object-cover" />
                ))}
              </div>
            )}
          </div>
          <Button onClick={handleSubmit} disabled={submitting || uploading} className="w-full">
            {submitting ? "Submitting..." : "Submit review"}
          </Button>
        </div>
      )}
    </div>
  );
}
