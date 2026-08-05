"use client";

import { notFound, useSearchParams } from "next/navigation";
import Link from "next/link";
import { use, useState, Suspense } from "react";
import { getFarmBySlug } from "@/data/farms";
import { getEstateProductById, computeEstateProductTotal } from "@/data/estate-products";
import { processingColors, processingLabels } from "@/data/farms";

// Static params are handled by the parent [slug] segment; this page is
// fully dynamic at the productSlug level since products may be added at runtime.

function FarmProductDetailContent({
  params,
}: {
  params: Promise<{ slug: string; productSlug: string }>;
}) {
  const { slug, productSlug } = use(params);
  const farm = getFarmBySlug(slug);
  const product = getEstateProductById(productSlug);

  if (!farm || !product) notFound();
  if (product.exclusiveFarmId && product.exclusiveFarmId !== slug) notFound();

  const searchParams = useSearchParams();
  const requestedWeight = searchParams.get("weight");
  const [selectedWeight, setSelectedWeight] = useState(
    product.weightOptions.find((w) => w.label === requestedWeight) ?? product.weightOptions[0]
  );

  const pricing = computeEstateProductTotal(
    product.pricePerKg,
    product.shippingPerKg,
    selectedWeight.grams
  );

  const whatsappText = encodeURIComponent(
    `Hi, I'd like to order ${selectedWeight.label} of ${product.name} from ${farm.name} (${farm.region}, Koraput).\n\nProduct: ${product.name}\nFarm: ${farm.name}\nQuantity: ${selectedWeight.label}\nPrice: ₹${pricing.product.toLocaleString("en-IN")} + ₹${pricing.shipping.toLocaleString("en-IN")} shipping = ₹${pricing.total.toLocaleString("en-IN")} total`
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="flex items-center gap-2 mb-6 text-xs flex-wrap">
            <Link href="/" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link href="/farms" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Farms</Link>
            <span className="text-white/30">/</span>
            <Link href={`/farms/${slug}`} className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">{farm.name}</Link>
            <span className="text-white/30">/</span>
            <Link href={`/farms/${slug}/products`} className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Products</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80 uppercase tracking-widest">{product.name}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest border-2 border-odisha-green text-odisha-green px-2 py-0.5">
              Green Bean
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 ${processingColors[product.processing]}`}>
              {processingLabels[product.processing]}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 ${
              product.availability === "in-stock"
                ? "bg-odisha-green text-white"
                : product.availability === "limited"
                ? "bg-odisha-yellow text-black"
                : "bg-[#1E3A8A] text-white"
            }`}>
              {product.availability === "in-stock" ? "In Stock" : product.availability === "limited" ? "Limited" : "Seasonal"}
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            {product.name}
          </h1>
          <p className="text-white/70 text-sm">
            From {farm.name} · {farm.region}, {farm.district} District · {farm.elevation}
          </p>
        </div>
      </section>

      {/* Main layout */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left — product details */}
            <div className="lg:col-span-2 space-y-8">

              {/* Description */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 bg-odisha-green" />
                  <h2 className="font-serif text-xl font-bold text-odisha-black">About This Lot</h2>
                </div>
                <p className="text-sm text-odisha-black/70 leading-relaxed">{product.description}</p>
              </div>

              {/* Specs grid */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 bg-odisha-red" />
                  <h2 className="font-serif text-xl font-bold text-odisha-black">Product Specifications</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-0">
                  {[
                    { label: "Variety", value: product.variety },
                    { label: "Processing", value: processingLabels[product.processing] },
                    { label: "Grade", value: product.grade },
                    { label: "Screen Size", value: product.screenSize },
                    { label: "Moisture", value: product.moisture },
                    { label: "Roast Level", value: "Green / Unroasted" },
                    { label: "Origin", value: `${farm.region}, ${farm.district}` },
                    { label: "Elevation", value: farm.elevation },
                    { label: "Harvest", value: farm.harvestSeason },
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

              {/* Farm traceability */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 bg-odisha-black" />
                  <h2 className="font-serif text-xl font-bold text-odisha-black">Farm Traceability</h2>
                </div>
                <div className="border-2 border-odisha-black bg-white">
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    {[
                      { label: "Estate", value: farm.name },
                      { label: "Sourced By", value: "Gray Cup Enterprises" },
                      { label: "Region", value: farm.region },
                      { label: "District", value: `${farm.district}, Odisha` },
                      { label: "Country", value: "India" },
                      { label: "Established", value: String(farm.established) },
                      { label: "Certifications", value: farm.certifications.join(", ") },
                      { label: "Export Ready", value: farm.exportReady ? "Yes" : "On Request" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between gap-2 border-b border-r border-odisha-black/10 px-4 py-3">
                        <span className="text-[10px] uppercase tracking-widest text-odisha-black/40">{label}</span>
                        <span className="text-xs text-odisha-black font-medium text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3">
                  <Link
                    href={`/farms/${slug}`}
                    className="text-xs uppercase tracking-widest text-odisha-red hover:text-odisha-black transition-colors border-b border-odisha-red hover:border-odisha-black"
                  >
                    Full Farm Profile →
                  </Link>
                </div>
              </div>
            </div>

            {/* Right — order panel */}
            <div className="space-y-4">

              {/* Pricing card */}
              <div className="border-2 border-odisha-black bg-white sticky top-4">
                <div className="border-b-2 border-odisha-black px-5 py-3 bg-odisha-offwhite">
                  <div className="text-[10px] uppercase tracking-widest text-odisha-black/50 mb-1">
                    Base Price
                  </div>
                  <div className="font-serif text-3xl font-bold text-odisha-black">
                    ₹{product.pricePerKg.toLocaleString("en-IN")}
                    <span className="text-base font-normal text-odisha-black/50 ml-1">/ kg</span>
                  </div>
                  <div className="text-xs text-odisha-black/50 mt-1">
                    + ₹{product.shippingPerKg} / kg shipping
                  </div>
                </div>

                <div className="p-5 space-y-5">
                  {/* Weight selector */}
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-odisha-black/50 mb-2">
                      Select Quantity
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {product.weightOptions.map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => setSelectedWeight(opt)}
                          className={`px-3 py-2.5 text-sm font-semibold border-2 transition-colors ${
                            selectedWeight.label === opt.label
                              ? "bg-odisha-red border-odisha-red text-white"
                              : "bg-white border-odisha-black text-odisha-black hover:bg-odisha-offwhite"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <div className="border-2 border-odisha-black/10 bg-odisha-offwhite p-4 space-y-2">
                    <div className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-3">
                      Price Breakdown — {selectedWeight.label}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-odisha-black/60">
                        Product ({selectedWeight.grams / 1000} kg × ₹{product.pricePerKg})
                      </span>
                      <span className="font-medium text-odisha-black">
                        ₹{pricing.product.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-odisha-black/60">
                        Shipping ({selectedWeight.grams / 1000} kg × ₹{product.shippingPerKg})
                      </span>
                      <span className="font-medium text-odisha-black">
                        ₹{pricing.shipping.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="border-t border-odisha-black/10 pt-2 flex justify-between">
                      <span className="font-semibold text-odisha-black text-sm">Total</span>
                      <span className="font-serif font-bold text-odisha-black text-lg">
                        ₹{pricing.total.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp order */}
                  <a
                    href={`https://wa.me/919876543210?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#25D366] text-white text-sm font-semibold border-2 border-[#25D366] hover:bg-[#1ebe5d] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Order via WhatsApp
                  </a>

                  {/* Contact form link */}
                  <Link
                    href={`/contact?farm=${slug}&product=${productSlug}&qty=${selectedWeight.label}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white text-odisha-black text-sm font-semibold border-2 border-odisha-black hover:bg-odisha-red hover:text-white hover:border-odisha-red transition-colors"
                  >
                    Send Enquiry
                  </Link>

                  <p className="text-[10px] text-odisha-black/40 text-center leading-relaxed">
                    Minimum order: {product.minOrder} · Payment after confirmation ·
                    GST applicable
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom nav */}
      <section className="bg-odisha-offwhite border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href={`/farms/${slug}/products`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-odisha-black border-2 border-odisha-black px-4 py-2 hover:bg-odisha-red hover:border-odisha-red hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            All Products from {farm.name}
          </Link>
          <Link
            href="/odisha-coffee-export"
            className="text-xs uppercase tracking-widest text-odisha-black/50 hover:text-odisha-red transition-colors"
          >
            Export Information →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function FarmProductDetailPage(props: {
  params: Promise<{ slug: string; productSlug: string }>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-odisha-black/40">Loading…</div>}>
      <FarmProductDetailContent {...props} />
    </Suspense>
  );
}
