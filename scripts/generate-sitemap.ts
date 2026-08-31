// Regenerates public/sitemap-0.xml from the actual route data files, so it
// never drifts from routes.ts again (the previous file was hand-maintained
// and still listed /buy-in/:city and /india/:state/green-coffee, both now
// 301 redirects, while missing /buy-coffee, /buy-green-coffee,
// /buy-roasted-coffee, and every location page under them).
import { writeFileSync, readdirSync } from "node:fs";
import { farms } from "../app/data/farms";
import { estateProducts } from "../app/data/estate-products";
import { products } from "../app/data/products";
import { countryDestinations } from "../app/data/locations/countries";
import { INDIA_STATES } from "../app/data/locations/india-states";
import { indiaCities } from "../app/data/locations/india-cities";

const SITE_URL = "https://odishacoffee.com";
const now = new Date().toISOString();

type Entry = { path: string; changefreq: string; priority: string };

const entries: Entry[] = [];
function add(path: string, changefreq: string, priority: string) {
  entries.push({ path, changefreq, priority });
}

// Static marketing pages
add("", "weekly", "1");
for (const p of [
  "about", "coffee-farms-koraput", "coffee-farms-near-bhubaneswar",
  "coffee-farms-odisha", "contact", "future-of-coffee", "impressum", "newsroom",
  "odisha-coffee-export", "odisha-coffee-varieties", "policy-coffee-recipe-extension",
  "privacy", "refunds", "reviews", "roasted-coffee", "shipping", "shop", "sites", "guides",
  "social-responsibility", "sourcing", "spices", "terms",
]) add(`/${p}`, "monthly", "0.7");
add("/farms", "monthly", "0.8");
add("/products", "monthly", "0.8");

// Buy coffee hub + dedicated green/roasted indexes
add("/buy-coffee", "monthly", "0.8");
add("/buy-green-coffee", "monthly", "0.85");
add("/buy-roasted-coffee", "monthly", "0.85");
add("/buy-green-beans", "monthly", "0.7");
for (const p of estateProducts) add(`/buy-green-beans/${p.id}`, "monthly", "0.7");
for (const p of products) {
  if (!p.isGreen && p.roastLevel !== "green") add(`/roasted-coffee/${p.id}`, "monthly", "0.8");
}

// One page per Indian state and city, for both green and roasted buying
for (const s of INDIA_STATES) {
  add(`/buy-green-coffee/${s.slug}`, "weekly", "0.8");
  add(`/buy-roasted-coffee/${s.slug}`, "weekly", "0.8");
}
for (const c of indiaCities) {
  add(`/buy-green-coffee/${c.citySlug}`, "weekly", "0.75");
  add(`/buy-roasted-coffee/${c.citySlug}`, "weekly", "0.75");
}

// Farms
for (const f of farms) {
  add(`/farms/${f.id}`, "monthly", f.featured ? "0.9" : "0.7");
  add(`/farms/${f.id}/green-coffee`, "weekly", "0.85");
  add(`/farms/${f.id}/products`, "weekly", "0.8");
  add(`/farms/${f.id}/roasted-coffee`, "weekly", "0.85");
}

// Guide articles (content/guides/*.mdx)
for (const f of readdirSync(new URL("../content/guides", import.meta.url))) {
  if (f.endsWith(".mdx")) add(`/guides/${f.replace(/\.mdx$/, "")}`, "monthly", "0.7");
}

// Countries we export to
for (const c of countryDestinations) add(`/${c.slug}/green-coffee`, "weekly", "0.85");

entries.sort((a, b) => a.path.localeCompare(b.path));

const urls = entries
  .map(
    (e) =>
      `<url><loc>${SITE_URL}${e.path}</loc><lastmod>${now}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`
  )
  .join("\n");

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n` +
  `${urls}\n</urlset>\n`;

writeFileSync(new URL("../public/sitemap-0.xml", import.meta.url), xml);
console.log(`Wrote ${entries.length} URLs to public/sitemap-0.xml`);
