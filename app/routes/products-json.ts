import type { Route } from "./+types/products-json";
import { products } from "@/data/products";
import { estateProducts } from "@/data/estate-products";
import { farms } from "@/data/farms";
import {
  computeItemPrice,
  pricePerKgFor,
  ROASTED_TIERS,
  GREEN_TIERS,
} from "@/lib/pricing";
import { SITE_URL } from "@/lib/seo";

// Public product feed at /products.json, same shape as graycup.in/products.json
// so Gray Cup (and any other partner) can pull OdishaCoffee's green + roasted
// catalogue directly. Prices come from the shared pricing module, so this
// never drifts from checkout.

type FeedVariant = {
  name: string;
  price: number;
  weightGrams: number | null;
  deliveryCharge: null;
};

type FeedProduct = {
  sku: string;
  slug: string;
  name: string;
  brand: "Odisha Coffee";
  category: "Green Coffee" | "Roasted Coffee";
  categoryTwo: string;
  description: string;
  url: string;
  image: string;
  images: string[];
  currency: "INR";
  priceRange: { min: number; max: number; unit: "" };
  variants: FeedVariant[];
  minimumOrder: { quantity: number; unit: string };
  packaging: string[];
  details: string[];
  locations: string[];
  availability: "in_stock" | "limited_availability" | "out_of_stock";
  mpn: null;
  comingSoon: false;
};

const AVAIL: Record<string, FeedProduct["availability"]> = {
  "in-stock": "in_stock",
  limited: "limited_availability",
  seasonal: "limited_availability",
};

function estateToFeed(p: (typeof estateProducts)[number]): FeedProduct {
  const resolved = { kind: "estate" as const, product: p, farm: farms[0] };
  const variants: FeedVariant[] = p.weightOptions.map((w) => ({
    name: w.label,
    price: computeItemPrice(pricePerKgFor(resolved, w.grams), w.grams),
    weightGrams: w.grams,
    deliveryCharge: null,
  }));
  const prices = variants.map((v) => v.price);
  return {
    sku: `OC-${p.id.toUpperCase()}`,
    slug: p.id,
    name: p.name,
    brand: "Odisha Coffee",
    category: "Green Coffee",
    categoryTwo: p.grade,
    description: p.description,
    url: `${SITE_URL}/buy-green-beans/${p.id}`,
    image: `${SITE_URL}/${p.image ?? "og.webp"}`,
    images: (p.images ?? [p.image].filter(Boolean)).map((i) => `${SITE_URL}/${i}`),
    currency: "INR",
    priceRange: { min: Math.min(...prices), max: Math.max(...prices), unit: "" },
    variants,
    minimumOrder: { quantity: 1, unit: "order" },
    packaging: p.weightOptions.map((w) => w.label),
    details: [
      `Grade: ${p.grade}`,
      `Processing: ${p.processing}`,
      `Variety: ${p.variety}`,
      `Moisture: ${p.moisture}`,
      `Screen: ${p.screenSize}`,
      `Flavour: ${p.flavorNotes.join(", ")}`,
    ],
    locations: ["Koraput, Odisha"],
    availability: AVAIL[p.availability] ?? "in_stock",
    mpn: null,
    comingSoon: false,
  };
}

function productToFeed(p: (typeof products)[number]): FeedProduct {
  const tiers = p.isGreen ? GREEN_TIERS : ROASTED_TIERS;
  const variants: FeedVariant[] = tiers.map((t) => ({
    name: t.label,
    price: computeItemPrice(p.pricePerKg, t.grams),
    weightGrams: t.grams,
    deliveryCharge: null,
  }));
  const prices = variants.map((v) => v.price);
  return {
    sku: `OC-${p.id.toUpperCase()}`,
    slug: p.id,
    name: p.name,
    brand: "Odisha Coffee",
    category: p.isGreen ? "Green Coffee" : "Roasted Coffee",
    categoryTwo: p.isGreen ? "Green Beans" : p.roastLevel,
    description: p.description,
    url: p.isGreen ? `${SITE_URL}/buy-green-beans` : `${SITE_URL}/roasted-coffee/${p.id}`,
    image: `${SITE_URL}/products/${p.image ?? "og.webp"}`,
    images: [`${SITE_URL}/products/${p.image ?? "og.webp"}`],
    currency: "INR",
    priceRange: { min: Math.min(...prices), max: Math.max(...prices), unit: "" },
    variants,
    minimumOrder: {
      quantity: 1,
      unit: p.exportAvailable && p.minOrderExport ? p.minOrderExport : "order",
    },
    packaging: tiers.map((t) => t.label),
    details: [
      `Processing: ${p.processing}`,
      `Variety: ${p.variety}`,
      `Roast: ${p.roastLevel}`,
      `Flavour: ${p.flavorNotes.join(", ")}`,
      ...(p.exportAvailable ? [`Export available${p.minOrderExport ? ` (min ${p.minOrderExport})` : ""}`] : []),
    ],
    locations: [p.region],
    availability: AVAIL[p.availability] ?? "in_stock",
    mpn: null,
    comingSoon: false,
  };
}

export function loader(_: Route.LoaderArgs) {
  const feed = {
    site: "odishacoffee.com",
    baseUrl: SITE_URL,
    currency: "INR",
    generatedAt: new Date().toISOString(),
    products: [
      ...estateProducts.map(estateToFeed),
      ...products.map(productToFeed),
    ],
  };
  return Response.json(feed, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" },
  });
}
