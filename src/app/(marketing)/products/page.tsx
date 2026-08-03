import Link from "next/link";
import Image from "next/image";
import { products, roastLabels, availabilityColors, availabilityLabels } from "@/data/products";
import { farms, processingColors, processingLabels } from "@/data/farms";
import { estateProducts } from "@/data/estate-products";
import { ProductActions } from "@/components/products/product-actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Odisha Coffee Products — Estate Green Beans, Export & Specialty Lots",
  description:
    "Browse all Odisha coffee products — AAA washed and B+ natural green beans from 24 verified Koraput estates, plus specialty roasted lots and export-grade supply from Gray Cup Enterprises.",
  alternates: { canonical: "/products" },
};

const BASE_URL = "https://odishacoffee.com";
const PRICE_VALID_UNTIL = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];

function schemaAvailability(a: string): string {
  if (a === "in-stock") return "https://schema.org/InStock";
  if (a === "limited") return "https://schema.org/LimitedAvailability";
  return "https://schema.org/OutOfStock";
}

function buildProductSchema(product: (typeof products)[number]) {
  const imageUrl = product.image
    ? `${BASE_URL}/products/${product.image}`
    : `${BASE_URL}/og.png`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BASE_URL}/products#${product.id}`,
    name: product.name,
    description: product.description,
    image: imageUrl,
    url: `${BASE_URL}/products`,
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
      url: `${BASE_URL}/products`,
      seller: {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Odisha Coffee",
      },
      priceValidUntil: PRICE_VALID_UNTIL,
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "INR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 7,
            unitCode: "DAY",
          },
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

export default function ProductsPage() {
  const productSchemas = products.map(buildProductSchema);
  const roastedProducts = products.filter((p) => !p.isGreen && p.roastLevel !== "green");
  const greenProducts   = products.filter((p) => p.isGreen || p.roastLevel === "green");
  const specialtyLots   = products.filter((p) => !p.exportAvailable || p.availability !== "in-stock");

  return (
    <>
      {productSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    <div>
      {/* Header */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
          <div className="flex items-center gap-3 mb-5">
            <Link href="/" className="text-xs text-white/40 hover:text-white/70 uppercase tracking-widest transition-colors">
              Home
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-xs text-white/60 uppercase tracking-widest">Products</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Products
          </h1>
          <p className="text-white/70 text-sm max-w-2xl leading-relaxed mb-8">
            Estate green beans direct from all {farms.length} partner farms in Koraput, plus
            specialty roasted lots and export-grade supply from Gray Cup Enterprises. Every
            product is traceable to its farm of origin.
          </p>

          <div className="flex flex-wrap gap-6">
            {[
              { value: estateProducts.length.toString(), label: "Estate Products" },
              { value: farms.length.toString(), label: "Partner Farms" },
              { value: products.filter((p) => !p.isGreen && p.roastLevel !== "green").length.toString(), label: "Roasted Lots" },
              { value: products.filter((p) => p.exportAvailable).length.toString(), label: "Export Available" },
            ].map(({ value, label }) => (
              <div key={label} className="border-l-2 border-white/30 pl-4">
                <div className="font-serif text-2xl font-bold text-white">{value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESTATE GREEN BEANS ───────────────────────────────────────── */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-6 bg-odisha-green" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-odisha-black">
                Estate Green Beans
              </h2>
              <p className="text-xs text-odisha-black/50 mt-0.5">
                Available direct from all {farms.length} partner farms — click a farm to order
              </p>
            </div>
          </div>
          <p className="text-sm text-odisha-black/60 mb-8 max-w-2xl leading-relaxed">
            These lots are available from every Gray Cup partner estate in Koraput. Select a
            product below to see all farms, or click any farm to go directly to that
            estate&apos;s product page.
          </p>

          <div className="space-y-10">
            {estateProducts.map((ep) => {
              const totalPerKg = ep.pricePerKg + ep.shippingPerKg;
              return (
                <div key={ep.id} className="border-2 border-odisha-black">
                  {/* Product header */}
                  <div className="border-b-2 border-odisha-black bg-odisha-offwhite pattachitra-pattern p-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 ${processingColors[ep.processing]}`}>
                          {processingLabels[ep.processing]}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 bg-odisha-green text-white">
                          Green Bean
                        </span>
                        <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 ${
                          ep.availability === "in-stock"
                            ? "bg-odisha-green text-white"
                            : ep.availability === "limited"
                            ? "bg-odisha-yellow text-black"
                            : "bg-[#1E3A8A] text-white"
                        }`}>
                          {ep.availability === "in-stock" ? "In Stock" : ep.availability === "limited" ? "Limited" : "Seasonal"}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-odisha-black mb-1">
                        {ep.name}
                      </h3>
                      <p className="text-xs text-odisha-black/60 max-w-xl leading-relaxed">
                        {ep.description}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="font-serif text-2xl font-bold text-odisha-black">
                        ₹{totalPerKg.toLocaleString("en-IN")}
                        <span className="text-sm font-normal text-odisha-black/50 ml-1">/ kg</span>
                      </div>
                      <div className="text-[11px] text-odisha-black/40 mt-0.5">
                        ₹{ep.pricePerKg} + ₹{ep.shippingPerKg} shipping
                      </div>
                      <div className="text-[11px] text-odisha-black/40 mt-0.5">
                        Grade: {ep.grade} · Min: {ep.minOrder}
                      </div>
                    </div>
                  </div>

                  {/* Farm grid */}
                  <div className="p-4">
                    <div className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-3">
                      Available from {farms.length} estates — select a farm to order
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-0">
                      {farms.map((farm) => (
                        <Link
                          key={farm.id}
                          href={`/farms/${farm.id}/products/${ep.id}`}
                          className="group border border-odisha-black/10 -ml-[1px] -mt-[1px] p-3 bg-white hover:bg-odisha-red hover:border-odisha-red transition-colors"
                        >
                          <div className="text-xs font-semibold text-odisha-black group-hover:text-white transition-colors leading-snug mb-1">
                            {farm.name}
                          </div>
                          <div className="text-[10px] text-odisha-black/40 group-hover:text-white/70 transition-colors">
                            {farm.region}
                          </div>
                          {farm.exportReady && (
                            <div className="mt-1.5">
                              <span className="text-[9px] font-bold uppercase tracking-widest border border-odisha-green text-odisha-green group-hover:border-white group-hover:text-white px-1 py-0.5 transition-colors">
                                Export
                              </span>
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roasted Products */}
      <section className="bg-odisha-offwhite border-b-2 border-odisha-black pattachitra-pattern">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 bg-odisha-red" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-odisha-black">Roasted Coffee</h2>
              <p className="text-xs text-odisha-black/50 mt-0.5">Small-batch roasted, dispatched fresh</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0">
            {roastedProducts.map((product) => (
              <div
                key={product.id}
                className="border-2 border-odisha-black -ml-[2px] -mt-[2px] bg-white flex flex-col"
              >
                {/* Product image */}
                <div className="relative h-40 bg-odisha-offwhite border-b-2 border-odisha-black overflow-hidden">
                  {product.image ? (
                    <Image
                      src={`/products/${product.image}`}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-odisha-black/20 text-xs">No image</div>
                  )}
                  <span className={`absolute top-2 right-2 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 ${availabilityColors[product.availability]}`}>
                    {availabilityLabels[product.availability]}
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  {/* Title */}
                  <h3 className="font-serif font-bold text-odisha-black text-sm leading-snug mb-2">
                    {product.name}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 ${processingColors[product.processing]}`}>
                      {processingLabels[product.processing]}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 bg-odisha-offwhite border border-odisha-black/30 text-odisha-black">
                      {roastLabels[product.roastLevel]}
                    </span>
                  </div>

                  {/* Flavor notes */}
                  <div className="flex flex-wrap gap-1 mb-3 flex-1">
                    {product.flavorNotes.slice(0, 3).map((note) => (
                      <span key={note} className="text-[10px] px-1.5 py-0.5 bg-odisha-offwhite border border-odisha-black/20 text-odisha-black/60">
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Cart actions */}
                  <div className="border-t-2 border-odisha-black pt-3 mt-auto">
                    <ProductActions product={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Green / Export Lots */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 bg-odisha-green" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-odisha-black">Green Beans & Export Lots</h2>
              <p className="text-xs text-odisha-black/50 mt-0.5">Available for roasters, importers, and wholesale buyers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {greenProducts.map((product) => (
              <div
                key={product.id}
                className="border-2 border-odisha-black -ml-[2px] -mt-[2px] bg-white flex flex-col"
              >
                {/* Color stripe */}
                <div className={`h-1 w-full ${processingColors[product.processing].split(" ")[0]}`} />

                <div className="p-5 flex flex-col flex-1">
                  {/* Product image */}
                  {product.image && (
                    <div className="relative h-28 mb-3 border-2 border-odisha-black overflow-hidden bg-odisha-offwhite">
                      <Image src={`/products/${product.image}`} alt={product.name} fill className="object-cover" />
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-serif font-bold text-odisha-black text-base leading-snug flex-1">
                      {product.name}
                    </h3>
                    <span className={`shrink-0 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 ${availabilityColors[product.availability]}`}>
                      {availabilityLabels[product.availability]}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 ${processingColors[product.processing]}`}>
                      {processingLabels[product.processing]}
                    </span>
                  </div>

                  <div className="space-y-1 mb-3">
                    <div className="flex gap-2 text-xs text-odisha-black/60">
                      <span className="font-medium text-odisha-black/80">Farm:</span>
                      <Link href={`/farms/${product.farmId}`} className="hover:text-odisha-red transition-colors">
                        {product.farmName}
                      </Link>
                    </div>
                    <div className="flex gap-2 text-xs text-odisha-black/60">
                      <span className="font-medium text-odisha-black/80">Variety:</span>
                      <span>{product.variety}</span>
                    </div>
                    <div className="flex gap-2 text-xs text-odisha-black/60">
                      <span className="font-medium text-odisha-black/80">Origin:</span>
                      <span>{product.region}</span>
                    </div>
                  </div>

                  <p className="text-xs text-odisha-black/60 leading-relaxed mb-3 flex-1 line-clamp-3">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.flavorNotes.map((note) => (
                      <span key={note} className="text-[10px] px-2 py-0.5 bg-odisha-offwhite border border-odisha-black/20 text-odisha-black/60">
                        {note}
                      </span>
                    ))}
                  </div>

                  <div className="border-t-2 border-odisha-black pt-4 mt-auto">
                    {product.minOrderExport && (
                      <p className="text-[10px] text-odisha-green font-semibold mb-2">
                        Min. export order: {product.minOrderExport}
                      </p>
                    )}
                    <ProductActions product={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty / Seasonal section */}
      <section className="bg-odisha-offwhite border-b-2 border-odisha-black pattachitra-pattern">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 bg-odisha-orange" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-odisha-black">Specialty & Seasonal Lots</h2>
              <p className="text-xs text-odisha-black/50 mt-0.5">Single-farm micro-lots, limited availability</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {specialtyLots.map((product) => (
              <div key={product.id} className="border-2 border-odisha-black -ml-[2px] -mt-[2px] p-6 bg-white">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-serif font-bold text-odisha-black text-lg leading-snug">
                        {product.name}
                      </h3>
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
                        <Link href={`/farms/${product.farmId}`} className="hover:text-odisha-red transition-colors">
                          {product.farmName}
                        </Link>
                      </p>
                      <p><span className="font-medium text-odisha-black/80">Variety:</span> {product.variety}</p>
                      <p><span className="font-medium text-odisha-black/80">Roast:</span> {roastLabels[product.roastLevel]}</p>
                    </div>

                    <p className="text-xs text-odisha-black/60 leading-relaxed mb-3">{product.description}</p>

                    <div className="border-t border-odisha-black/10 pt-3 mb-4">
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-odisha-black/40 mb-1.5">
                        Brewing Notes
                      </div>
                      <p className="text-xs text-odisha-black/55 leading-relaxed">{product.brewingNotes}</p>
                    </div>

                    <ProductActions product={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale CTA */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-odisha-black mb-2">
              Looking for bulk green beans or custom lots?
            </h2>
            <p className="text-odisha-black/60 text-sm leading-relaxed max-w-xl">
              Gray Cup can source any quantity from individual estates or pooled partner supplies. We work with specialty roasters, importers, and commodity buyers with full documentation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-odisha-red text-white text-sm font-semibold border-2 border-odisha-red hover:bg-odisha-red-dark transition-colors whitespace-nowrap"
            >
              Wholesale Inquiry
            </Link>
            <Link
              href="/farms"
              className="inline-block px-6 py-3 bg-transparent text-odisha-black text-sm font-semibold border-2 border-odisha-black hover:bg-odisha-black hover:text-white transition-colors whitespace-nowrap"
            >
              Browse Farms
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
