import type { Metadata } from "next";
import { generateTitle, generateDescription } from "@/lib/seo";
import { ReviewsPageClient } from "./reviews-page-client";

export const metadata: Metadata = {
  title: generateTitle("Customer Reviews"),
  description: generateDescription(
    "Read what buyers say about Gray Cup's Odisha coffee — green beans and roasted lots straight from Koraput's partner estates."
  ),
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Customer Reviews</h1>
      <p className="mt-2 text-gray-600">
        Real feedback from verified buyers of our Odisha coffee.
      </p>
      <ReviewsPageClient />
    </main>
  );
}
