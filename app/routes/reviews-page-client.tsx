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
import { StarRating } from "@/components/reviews/star-rating";
import { ReviewForm } from "@/components/reviews/review-form";

type Review = {
  id: string;
  createdAt: number;
  productName: string;
  reviewerName: string;
  rating: number;
  title: string | null;
  content: string;
  images: string[];
};

export function ReviewsPageClient() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/reviews");
      const data = (await res.json()) as { reviews?: Review[] };
      setReviews(data.reviews ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="mt-8">
      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) load();
        }}
      >
        <DialogTrigger asChild>
          <Button>Write a review</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Write a review</DialogTitle>
          </DialogHeader>
          <ReviewForm onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>

      {!loading && reviews.length === 0 && (
        <p className="mt-6 text-sm text-gray-500">No reviews yet, be the first to write one.</p>
      )}

      <ul className="mt-8 space-y-6">
        {reviews.map((review) => (
          <li key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StarRating value={review.rating} size={16} />
                <span className="text-sm font-medium">{review.productName}</span>
              </div>
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
    </div>
  );
}
