import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { estateProducts, getEstateProductById } from "@/data/estate-products";
import { farms, processingColors, processingLabels } from "@/data/farms";
import { computeItemPrice, bulkDiscountForGrams, roundToNearest5 } from "@/lib/pricing";
import { generateTitle, generateDescription } from "@/lib/seo";

export async function generateStaticParams() {
  return estateProducts.map((p) => ({ productSlug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}): Promise<Metadata> {
  const { productSlug } = await params;
  const product = getEstateProductById(productSlug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: generateTitle(`${product.name} — Koraput, Odisha Green Coffee`),
    description: generateDescription(
      `${product.name} — ${product.grade} green Arabica from Koraput, Odisha. ${product.description}`
    ),
    alternates: { canonical: `/buy-green-beans/${productSlug}` },
  };
}

const availabilityStyles = {
  "in-stock": { bg: "bg-odisha-green text-white", label: "In Stock" },
  limited: { bg: "bg-odisha-yellow text-black", label: "Limited" },
  seasonal: { bg: "bg-[#1E3A8A] text-white", label: "Seasonal" },
};

export default async function GreenCoffeeProductPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = getEstateProductById(productSlug);
  if (!product) notFound();

  const rawBasePerKg = product.pricePerKg + product.shippingPerKg;
  const basePerKg = roundToNearest5(rawBasePerKg);
  const avail = availabilityStyles[product.availability];
  const exportReadyFarms = farms.filter((f) => f.exportReady);

  return (
    <div>
      {/* Hero */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="flex items-center gap-2 mb-6 text-xs flex-wrap">
            <Link href="/" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link href="/buy-green-beans" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Buy Green Beans</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80 uppercase tracking-widest">{product.name}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest border-2 border-odisha-green text-odisha-green px-2 py-0.5 bg-white">
              Green Bean
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 ${processingColors[product.processing]}`}>
              {processingLabels[product.processing]}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 ${avail.bg}`}>
              {avail.label}
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            {product.name} — Koraput, Odisha Green Coffee
          </h1>
          <p className="text-white/70 text-sm max-w-2xl leading-relaxed">
            {product.description}
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left */}
            <div className="lg:col-span-2 space-y-8">
              {product.image && (
                <div className="relative h-64 border-2 border-odisha-black overflow-hidden bg-odisha-offwhite">
                  <Image src={`/${product.image}`} alt={product.name} fill className="object-cover" />
                </div>
              )}

              {/* Specs */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 bg-odisha-red" />
                  <h2 className="font-serif text-xl font-bold text-odisha-black">Lot Specifications</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-0">
                  {[
                    { label: "Origin", value: "Koraput, Odisha" },
                    { label: "Variety", value: product.variety },
                    { label: "Processing", value: processingLabels[product.processing] },
                    { label: "Grade", value: product.grade },
                    { label: "Screen Size", value: product.screenSize },
                    { label: "Moisture", value: product.moisture },
                    { label: "Roast Level", value: "Green / Unroasted" },
                    { label: "Minimum Order", value: product.minOrder },
                  ].map(({ label, value }) => (
                    <div key={label} className="border-2 border-odisha-black -ml-[2px] -mt-[2px] p-4 bg-odisha-offwhite">
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-odisha-black/40 mb-1">
                        {label}
                      </div>
                      <div className="font-serif font-semibold text-odisha-black text-sm">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flavor notes */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 bg-odisha-yellow" />
                  <h2 className="font-serif text-xl font-bold text-odisha-black">Flavour Profile</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.flavorNotes.map((note) => (
                    <span key={note} className="text-sm font-medium px-4 py-2 bg-odisha-offwhite border-2 border-odisha-black text-odisha-black">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Roaster notes */}
              <div className="border-2 border-odisha-black p-6 bg-odisha-offwhite pattachitra-pattern">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-1 h-5 bg-odisha-black" />
                  <h3 className="font-serif font-bold text-odisha-black text-sm uppercase tracking-wide">
                    Roaster Notes
                  </h3>
                </div>
                <p className="text-sm text-odisha-black/70 leading-relaxed">{product.brewingNotes}</p>
              </div>

              {/* Available from */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 bg-odisha-black" />
                  <h2 className="font-serif text-xl font-bold text-odisha-black">
                    Available From Any of Our {farms.length} Koraput Partner Farms
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {farms.map((farm) => (
                    <Link
                      key={farm.id}
                      href={`/farms/${farm.id}/products/${product.id}`}
                      className="text-xs font-medium px-3 py-2 border-2 border-odisha-black/20 text-odisha-black hover:border-odisha-red hover:text-odisha-red transition-colors"
                    >
                      {farm.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — pricing table */}
            <div className="space-y-4">
              <div className="border-2 border-odisha-black bg-white sticky top-4">
                <div className="border-b-2 border-odisha-black px-5 py-3 bg-odisha-offwhite">
                  <div className="text-[10px] uppercase tracking-widest text-odisha-black/50 mb-1">
                    Base Price
                  </div>
                  <div className="font-serif text-3xl font-bold text-odisha-black">
                    ₹{basePerKg.toLocaleString("en-IN")}
                    <span className="text-base font-normal text-odisha-black/50 ml-1">/ kg</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-widest text-odisha-black/50 mb-3">
                    Price by Quantity
                  </div>
                  <div className="space-y-1.5">
                    {product.weightOptions.map((opt) => {
                      const discount = bulkDiscountForGrams(opt.grams);
                      const perKg = roundToNearest5(rawBasePerKg * (1 - discount));
                      const total = computeItemPrice(perKg, opt.grams);
                      return (
                        <div key={opt.label} className="flex items-center justify-between text-sm border-b border-odisha-black/10 pb-1.5">
                          <span className="text-odisha-black/70">{opt.label}</span>
                          <span className="text-odisha-black/50 text-xs">₹{perKg.toLocaleString("en-IN")}/kg</span>
                          <span className="font-semibold text-odisha-black">₹{total.toLocaleString("en-IN")}</span>
                        </div>
                      );
                    })}
                  </div>

                  <Link
                    href="/buy-green-beans"
                    className="mt-5 flex items-center justify-center gap-2 w-full px-4 py-3 bg-odisha-red text-white text-sm font-bold uppercase tracking-widest border-2 border-odisha-red hover:bg-odisha-black hover:border-odisha-black transition-colors"
                  >
                    Select Farm &amp; Order
                  </Link>
                  <p className="text-[10px] text-odisha-black/40 text-center mt-3 leading-relaxed">
                    Choose your partner farm and quantity on the Buy Green Beans page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-odisha-red border-t-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-white text-lg">
              Sourcing at scale from Koraput, Odisha?
            </h3>
            <p className="text-white/60 text-sm mt-1">
              {exportReadyFarms.length} of our {farms.length} partner farms are export-ready — talk to us about bulk quantities.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-white text-odisha-black text-sm font-semibold border-2 border-white hover:bg-odisha-yellow hover:border-odisha-yellow transition-colors whitespace-nowrap"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
