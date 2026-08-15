"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  className?: string;
};

export function StarRating({ value, onChange, size = 20, className }: StarRatingProps) {
  const interactive = !!onChange;

  return (
    <div className={cn("flex items-center gap-0.5", className)} role={interactive ? "radiogroup" : undefined}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          className={cn(interactive && "cursor-pointer")}
        >
          <Star
            size={size}
            className={star <= value ? "fill-odisha-yellow text-odisha-yellow" : "fill-transparent text-gray-300"}
          />
        </button>
      ))}
    </div>
  );
}
