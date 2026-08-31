import { generateTitle, generateDescription } from "@/lib/seo";
import { ReviewsPageClient } from "@/routes/reviews-page-client";

export function meta() {
  return [
    { title: generateTitle("Customer Reviews") },
    {
      name: "description",
      content: generateDescription(
        "Read what buyers say about Gray Cup's Odisha coffee, green beans and roasted lots straight from Koraput's partner estates."
      ),
    },
  ];
}

export function links() {
  return [{ rel: "canonical", href: "https://odishacoffee.com/reviews" }];
}

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
