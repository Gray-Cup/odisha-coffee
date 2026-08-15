"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StarRating } from "./star-rating";
import { ReviewForm } from "./review-form";

type Review = {
  id: string;
  createdAt: number;
  reviewerName: string;
  rating: number;
  title: string | null;
  content: string;
  images: string[];
};

type ProductReviewsProps = {
  slug: string;
  catalog: "product" | "estate";
  productName: string;
};

export function ProductReviews({ slug, catalog, productName }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?productId=${encodeURIComponent(slug)}&catalog=${catalog}`);
      const data = (await res.json()) as { reviews?: Review[] };
      setReviews(data.reviews ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, catalog]);

  const average =
    reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Reviews</h2>
          {reviews.length > 0 && (
            <div className="mt-1 flex items-center gap-2">
              <StarRating value={Math.round(average)} size={16} />
              <span className="text-sm text-gray-600">
                {average.toFixed(1)} out of 5 ({reviews.length} review{reviews.length === 1 ? "" : "s"})
              </span>
            </div>
          )}
        </div>
        <Dialog
          open={open}
          onOpenChange={(next) => {
            setOpen(next);
            if (!next) load();
          }}
        >
          <DialogTrigger asChild>
            <Button variant="outline">Write a review</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Review {productName}</DialogTitle>
            </DialogHeader>
            <ReviewForm
              lockedProduct={{ slug, catalog, name: productName }}
              onClose={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {!loading && reviews.length === 0 && (
        <p className="mt-4 text-sm text-gray-500">No reviews yet — be the first to review this product.</p>
      )}

      <ul className="mt-6 space-y-6">
        {reviews.map((review) => (
          <li key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
            <div className="flex items-center justify-between">
              <StarRating value={review.rating} size={16} />
              <span className="text-xs text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            {review.title && <p className="mt-2 font-medium">{review.title}</p>}
            <p className="mt-1 text-sm text-gray-700">{review.content}</p>
            <p className="mt-1 text-xs text-gray-500">— {review.reviewerName}</p>
            {review.images.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {review.images.map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={src} src={src} alt="" className="h-20 w-20 rounded object-cover" />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
