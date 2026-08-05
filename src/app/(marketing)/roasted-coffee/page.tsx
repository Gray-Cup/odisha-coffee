import Link from "next/link";
import { products } from "@/data/products";
import { RoastedCatalog } from "@/components/products/roasted-catalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roasted Coffee — Odisha Single Origin & Specialty Lots",
  description:
    "Specialty roasted coffee from Koraput's Eastern Ghats — washed, natural and honey processed Arabica, roasted in small batches by Gray Cup. Espresso blends, filter lots, and seasonal micro-lots.",
  alternates: { canonical: "/roasted-coffee" },
};

const BASE_URL = "https://odishacoffee.com";
const PRICE_VALID_UNTIL = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];

function schemaAvailability(a: string) {
  if (a === "in-stock") return "https://schema.org/InStock";
  if (a === "limited") return "https://schema.org/LimitedAvailability";
  return "https://schema.org/OutOfStock";
}

function buildSchema(product: (typeof products)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BASE_URL}/roasted-coffee#${product.id}`,
    name: product.name,
    description: product.description,
    image: product.image ? `${BASE_URL}/products/${product.image}` : `${BASE_URL}/og.png`,
    url: `${BASE_URL}/roasted-coffee`,
    sku: `OC-${product.id.toUpperCase()}`,
    brand: { "@type": "Brand", name: "Odisha Coffee" },
    category: "Food, Beverages & Tobacco > Food Items > Beverages > Coffee",
    countryOfOrigin: { "@type": "Country", name: "India" },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.pricePerKg.toFixed(2),
      unitText: "per kg",
      availability: schemaAvailability(product.availability),
      url: `${BASE_URL}/roasted-coffee`,
      seller: { "@type": "Organization", "@id": `${BASE_URL}/#organization`, name: "Odisha Coffee" },
      priceValidUntil: PRICE_VALID_UNTIL,
      itemCondition: "https://schema.org/NewCondition",
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
    },
  };
}

export default function RoastedCoffeePage() {
  const roastedProducts = products.filter((p) => !p.isGreen && p.roastLevel !== "green");
  const specialtyLots   = products.filter((p) => p.availability === "limited" || p.availability === "seasonal");
  const schemas = roastedProducts.map(buildSchema);

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div>
        {/* Hero */}
        <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
            <div className="flex items-center gap-3 mb-5">
              <Link href="/" className="text-xs text-white/40 hover:text-white/70 uppercase tracking-widest transition-colors">Home</Link>
              <span className="text-white/20">/</span>
              <span className="text-xs text-white/60 uppercase tracking-widest">Roasted Coffee</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Roasted Coffee
            </h1>
            <p className="text-white/70 text-sm max-w-2xl leading-relaxed mb-8">
              Small-batch roasted coffee from Koraput partner estates — single-origin Arabica and Robusta,
              specialty espresso blends, and limited seasonal micro-lots. All beans are sourced directly
              from verified farms and roasted by Gray Cup.
            </p>

            <div className="flex flex-wrap gap-6">
              {[
                { value: roastedProducts.length.toString(), label: "Roasted Lots" },
                { value: specialtyLots.length.toString(), label: "Specialty / Seasonal" },
                { value: "48h", label: "Roast-to-Dispatch Rest" },
                { value: "Koraput", label: "Single Origin" },
              ].map(({ value, label }) => (
                <div key={label} className="border-l-2 border-white/30 pl-4">
                  <div className="font-serif text-2xl font-bold text-white">{value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/60">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <RoastedCatalog roastedProducts={roastedProducts} specialtyLots={specialtyLots} />

        {/* Green beans nudge */}
        <section className="bg-odisha-offwhite border-b-2 border-odisha-black">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-odisha-black text-lg">Looking for green beans?</h3>
              <p className="text-sm text-odisha-black/60 mt-1">
                AAA to B grade washed and natural lots available from all 24 partner estates.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/buy-green-beans"
                className="inline-block px-6 py-3 bg-odisha-green text-white text-sm font-semibold border-2 border-odisha-green hover:bg-odisha-black hover:border-odisha-black transition-colors whitespace-nowrap"
              >
                Green Beans →
              </Link>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-transparent text-odisha-black text-sm font-semibold border-2 border-odisha-black hover:bg-odisha-red hover:text-white hover:border-odisha-red transition-colors whitespace-nowrap"
              >
                Wholesale Inquiry
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
