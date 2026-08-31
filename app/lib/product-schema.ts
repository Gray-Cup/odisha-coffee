// Shared schema.org Product builders so every catalogue page (roasted-coffee,
// buy-roasted-coffee, buy-green-beans + its product pages) emits consistent
// structured data with images — what Google reads to show a product thumbnail
// and price next to a search result.
import type { Product } from "@/data/products";
import type { EstateProduct } from "@/data/estate-products";
import { roundToNearest5 } from "@/lib/pricing";
import { SITE_URL } from "@/lib/seo";

const PRICE_VALID_UNTIL = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];

function availability(a: string) {
  if (a === "in-stock") return "https://schema.org/InStock";
  if (a === "limited" || a === "seasonal") return "https://schema.org/LimitedAvailability";
  return "https://schema.org/OutOfStock";
}

const SHIPPING_AND_RETURNS = {
  shippingDetails: {
    "@type": "OfferShippingDetails",
    shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "INR" },
    shippingDestination: { "@type": "DefinedRegion", addressCountry: "IN" },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
      transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 7, unitCode: "DAY" },
    },
  },
  hasMerchantReturnPolicy: {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "IN",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 7,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
  },
};

function base(id: string, name: string, description: string, image: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#${id}`,
    name,
    description,
    image: [image],
    url,
    sku: `OC-${id.toUpperCase()}`,
    brand: { "@type": "Brand", name: "Odisha Coffee" },
    category: "Food, Beverages & Tobacco > Food Items > Beverages > Coffee",
    countryOfOrigin: { "@type": "Country", name: "India" },
  };
}

export function roastedProductSchema(p: Product, pageUrl = `${SITE_URL}/roasted-coffee/${p.id}`) {
  const image = p.image ? `${SITE_URL}/products/${p.image}` : `${SITE_URL}/og.webp`;
  return {
    ...base(p.id, p.name, p.description, image, pageUrl),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: p.pricePerKg.toFixed(2),
      unitText: "per kg",
      availability: availability(p.availability),
      url: pageUrl,
      seller: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Odisha Coffee" },
      priceValidUntil: PRICE_VALID_UNTIL,
      itemCondition: "https://schema.org/NewCondition",
      ...SHIPPING_AND_RETURNS,
    },
  };
}

export function greenProductSchema(p: EstateProduct) {
  const image = p.image ? `${SITE_URL}/${p.image}` : `${SITE_URL}/og.webp`;
  const url = `${SITE_URL}/buy-green-beans/${p.id}`;
  const perKg = roundToNearest5(p.pricePerKg + p.shippingPerKg);
  return {
    ...base(p.id, `${p.name} — Green Coffee from Koraput, Odisha`, p.description, image, url),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: perKg.toFixed(2),
      unitText: "per kg",
      availability: availability(p.availability),
      url,
      seller: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Odisha Coffee" },
      priceValidUntil: PRICE_VALID_UNTIL,
      itemCondition: "https://schema.org/NewCondition",
      ...SHIPPING_AND_RETURNS,
    },
  };
}

// Wraps a set of product schemas as an ItemList for a catalogue page.
export function itemListSchema(url: string, name: string, items: Array<{ url: string; name: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}#itemlist`,
    name,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: it.url,
      name: it.name,
    })),
  };
}

export function jsonLdScript(obj: unknown) {
  return {
    "script:ld+json": obj as Record<string, unknown>,
  };
}
