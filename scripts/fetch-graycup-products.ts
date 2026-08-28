// Pulls Gray Cup's live coffee catalogue from graycup.in/products.json and
// writes a trimmed copy to app/data/graycup-products.json, which the guide
// <GrayCupCard> component reads at build time. Re-run whenever Gray Cup's
// catalogue or pricing changes:  npx tsx scripts/fetch-graycup-products.ts
import { writeFileSync } from "node:fs";

const FEED = "https://graycup.in/products.json";

type Variant = { name: string; price: number };
type FeedProduct = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  categoryTwo: string | null;
  description: string;
  url: string;
  image: string;
  currency: string;
  priceRange: { min: number; max: number };
  variants: Variant[];
  availability: string;
};

const res = await fetch(FEED);
if (!res.ok) throw new Error(`${FEED} -> ${res.status}`);
const feed = (await res.json()) as { products: FeedProduct[] };

const coffee = feed.products
  .filter((p) => /^(coffee|accessor)/i.test(p.category))
  .map((p) => ({
    slug: p.slug,
    name: p.name,
    kind: p.categoryTwo ?? "Coffee",
    description: p.description,
    url: p.url,
    image: p.image,
    priceMin: p.priceRange.min,
    // price of the first (smallest, usually 250g) variant, for the card
    startVariant: p.variants[0]?.name ?? "250g",
    startPrice: p.variants[0]?.price ?? p.priceRange.min,
    availability: p.availability,
  }));

writeFileSync(
  new URL("../app/data/graycup-products.json", import.meta.url),
  JSON.stringify({ fetchedAt: new Date().toISOString(), source: FEED, products: coffee }, null, 2) + "\n"
);
console.log(`Wrote ${coffee.length} Gray Cup coffee products.`);
