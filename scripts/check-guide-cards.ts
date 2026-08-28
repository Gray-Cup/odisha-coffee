// Fails if any <ProductCard id> / <ProductRow ids> in content/guides/*.mdx
// points at a product id that doesn't exist in products.ts or estate-products.ts.
// Run: npx tsx scripts/check-guide-cards.ts
import { readdirSync, readFileSync } from "node:fs";
import { products } from "../app/data/products";
import { estateProducts } from "../app/data/estate-products";
import graycup from "../app/data/graycup-products.json" with { type: "json" };

const known = new Set([
  ...products.map((p) => p.id),
  ...estateProducts.map((p) => p.id),
  ...graycup.products.map((p: { slug: string }) => p.slug),
]);

const dir = new URL("../content/guides/", import.meta.url);
let bad = 0;

for (const file of readdirSync(dir)) {
  if (!file.endsWith(".mdx")) continue;
  const src = readFileSync(new URL(file, dir), "utf8");
  const ids = [...src.matchAll(/"([a-z0-9-]+)"/g)]
    .map((m) => m[1])
    // only look at ids inside a ProductCard/ProductRow attribute region
    .filter((id) => new RegExp(`(id|ids|slug|slugs)=(\\{[^}]*)?"${id}"`).test(src));
  for (const id of ids) {
    if (!known.has(id)) {
      console.error(`${file}: unknown product id "${id}"`);
      bad++;
    }
  }
}

if (bad) {
  console.error(`\n${bad} bad product id(s).`);
  process.exit(1);
}
console.log("All guide product cards resolve.");
