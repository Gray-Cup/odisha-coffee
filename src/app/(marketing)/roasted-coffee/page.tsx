import Link from "next/link";
import Image from "next/image";
import { products, roastLabels, availabilityColors, availabilityLabels } from "@/data/products";
import { processingColors, processingLabels } from "@/data/farms";
import { ProductActions } from "@/components/products/product-actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roasted Coffee — Odisha Single Origin & Specialty Lots",
  description:
    "Specialty roasted coffee from Koraput's Eastern Ghats — washed, natural and honey processed Arabica & Robusta, roasted in small batches by Gray Cup. Espresso blends, filter lots, and seasonal micro-lots.",
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

        {/* Roasted grid */}
        <section className="bg-odisha-offwhite border-b-2 border-odisha-black pattachitra-pattern">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-6 bg-odisha-red" />
              <div>
                <h2 className="font-serif text-2xl font-bold text-odisha-black">Roasted Lots</h2>
                <p className="text-xs text-odisha-black/50 mt-0.5">Small-batch roasted, dispatched fresh within 48 hours of roast</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0">
              {roastedProducts.map((product) => (
                <div key={product.id} className="border-2 border-odisha-black -ml-[2px] -mt-[2px] bg-white flex flex-col">
                  <div className="relative h-40 bg-odisha-offwhite border-b-2 border-odisha-black overflow-hidden">
                    {product.image ? (
                      <Image src={`/products/${product.image}`} alt={product.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-odisha-black/20 text-xs">No image</div>
                    )}
                    <span className={`absolute top-2 right-2 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 ${availabilityColors[product.availability]}`}>
                      {availabilityLabels[product.availability]}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-serif font-bold text-odisha-black text-sm leading-snug mb-2">{product.name}</h3>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 ${processingColors[product.processing]}`}>
                        {processingLabels[product.processing]}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 bg-odisha-offwhite border border-odisha-black/30 text-odisha-black">
                        {roastLabels[product.roastLevel]}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3 flex-1">
                      {product.flavorNotes.slice(0, 3).map((note) => (
                        <span key={note} className="text-[10px] px-1.5 py-0.5 bg-odisha-offwhite border border-odisha-black/20 text-odisha-black/60">
                          {note}
                        </span>
                      ))}
                    </div>

                    <div className="border-t-2 border-odisha-black pt-3 mt-auto">
                      <ProductActions product={product} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialty & Seasonal */}
        {specialtyLots.length > 0 && (
          <section className="bg-white border-b-2 border-odisha-black">
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-6 bg-odisha-yellow" />
                <div>
                  <h2 className="font-serif text-2xl font-bold text-odisha-black">Specialty & Seasonal Lots</h2>
                  <p className="text-xs text-odisha-black/50 mt-0.5">Single-farm micro-lots, limited availability</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {specialtyLots.map((product) => (
                  <div key={product.id} className="border-2 border-odisha-black -ml-[2px] -mt-[2px] p-6 bg-odisha-offwhite">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <h3 className="font-serif font-bold text-odisha-black text-lg">{product.name}</h3>
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 ${availabilityColors[product.availability]}`}>
                        {availabilityLabels[product.availability]}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 ${processingColors[product.processing]}`}>
                        {processingLabels[product.processing]}
                      </span>
                    </div>

                    <div className="text-xs text-odisha-black/60 space-y-1 mb-3">
                      <p><span className="font-medium text-odisha-black/80">Farm:</span>{" "}
                        <Link href={`/farms/${product.farmId}`} className="hover:text-odisha-red transition-colors">{product.farmName}</Link>
                      </p>
                      <p><span className="font-medium text-odisha-black/80">Variety:</span> {product.variety}</p>
                      <p><span className="font-medium text-odisha-black/80">Roast:</span> {roastLabels[product.roastLevel]}</p>
                    </div>

                    <p className="text-xs text-odisha-black/60 leading-relaxed mb-3">{product.description}</p>

                    <div className="border-t border-odisha-black/10 pt-3 mb-4">
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-odisha-black/40 mb-1.5">Brewing Notes</div>
                      <p className="text-xs text-odisha-black/55 leading-relaxed">{product.brewingNotes}</p>
                    </div>

                    <ProductActions product={product} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

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
