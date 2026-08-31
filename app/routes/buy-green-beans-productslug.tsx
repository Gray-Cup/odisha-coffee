import { Link, data, isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/buy-green-beans-productslug";
import { ProductImageZoom } from "@/components/product-image-zoom";
import { getEstateProductById } from "@/data/estate-products";
import { farms, processingColors, processingLabels } from "@/data/farms";
import { roundToNearest5 } from "@/lib/pricing";
import { generateTitle, generateDescription, SITE_URL } from "@/lib/seo";
import { ProductReviews } from "@/components/reviews/product-reviews";
import { OrderPanel } from "@/components/products/order-panel";

export function loader({ params }: Route.LoaderArgs) {
  const product = getEstateProductById(params.productSlug);
  if (!product) {
    throw data("Product not found", { status: 404 });
  }
  return { product, productSlug: params.productSlug };
}

export function meta({ data, params }: Route.MetaArgs) {
  if (!data) return [{ title: "Product Not Found" }];
  const { product } = data;
  return [
    { title: generateTitle(`${product.name} Green Coffee from Koraput, Odisha`) },
    {
      name: "description",
      content: generateDescription(
        `${product.name}, ${product.grade} green Arabica from Koraput, Odisha. ${product.description}`
      ),
    },
    { tagName: "link", rel: "canonical", href: `${SITE_URL}/buy-green-beans/${params.productSlug}` },
  ];
}

const availabilityStyles = {
  "in-stock": { bg: "bg-odisha-green text-white", label: "In Stock" },
  limited: { bg: "bg-odisha-yellow text-black", label: "Limited" },
  seasonal: { bg: "bg-[#1E3A8A] text-white", label: "Seasonal" },
};

export default function GreenCoffeeProductPage({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;

  const rawBasePerKg = product.pricePerKg + product.shippingPerKg;
  const basePerKg = roundToNearest5(rawBasePerKg);
  const avail = availabilityStyles[product.availability as keyof typeof availabilityStyles] ?? availabilityStyles["in-stock"];
  const exportReadyFarms = farms.filter((f) => f.exportReady);
  const exclusiveFarm = product.exclusiveFarmId ? farms.find((f) => f.id === product.exclusiveFarmId) : undefined;

  return (
    <div>
      {/* Hero */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="flex items-center gap-2 mb-6 text-xs flex-wrap">
            <Link to="/" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link to="/buy-green-beans" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Buy Green Beans</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80 uppercase tracking-widest">{product.name}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest border-2 border-odisha-green text-odisha-green px-2 py-0.5 bg-white">
              Green Bean
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 ${processingColors[product.processing as keyof typeof processingColors]}`}>
              {processingLabels[product.processing as keyof typeof processingLabels]}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 ${avail.bg}`}>
              {avail.label}
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            {product.name} Green Coffee from Koraput, Odisha
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
              {product.images && product.images.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  <div className="relative h-64 col-span-3 sm:col-span-2 border-2 border-odisha-black overflow-hidden bg-odisha-offwhite">
                    <ProductImageZoom src={`/${product.images[0]}`} alt={product.name} />
                  </div>
                  <div className="col-span-3 sm:col-span-1 grid grid-cols-2 sm:grid-cols-1 gap-2">
                    {product.images.slice(1).map((src: string) => (
                      <div key={src} className="relative h-[123px] border-2 border-odisha-black overflow-hidden bg-odisha-offwhite">
                        <ProductImageZoom src={`/${src}`} alt={product.name} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                product.image && (
                  <div className="relative h-64 border-2 border-odisha-black overflow-hidden bg-odisha-offwhite">
                    <ProductImageZoom src={`/${product.image}`} alt={product.name} />
                  </div>
                )
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
                    { label: "Processing", value: processingLabels[product.processing as keyof typeof processingLabels] },
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
                  {product.flavorNotes.map((note: string) => (
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
                    {exclusiveFarm
                      ? "Exclusively Available From"
                      : `Available From Any of Our ${farms.length} Koraput Partner Farms`}
                  </h2>
                </div>
                {exclusiveFarm ? (
                  <Link
                    to={`/farms/${exclusiveFarm.id}/products/${product.id}`}
                    className="inline-flex flex-col gap-0.5 px-4 py-3 border-2 border-odisha-black bg-odisha-offwhite hover:border-odisha-red transition-colors"
                  >
                    <span className="font-serif font-bold text-odisha-black">{exclusiveFarm.name}</span>
                    <span className="text-xs text-odisha-black/50">
                      {exclusiveFarm.region}, {exclusiveFarm.district} District
                    </span>
                  </Link>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {farms.map((farm) => (
                      <Link
                        key={farm.id}
                        to={`/farms/${farm.id}/products/${product.id}`}
                        className="text-xs font-medium px-3 py-2 border-2 border-odisha-black/20 text-odisha-black hover:border-odisha-red hover:text-odisha-red transition-colors"
                      >
                        {farm.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right, pricing table */}
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

                <OrderPanel
                  product={product}
                  farm={exclusiveFarm ?? farms[0]}
                  farms={farms}
                  exclusive={Boolean(exclusiveFarm)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6">
        <ProductReviews slug={product.id} catalog="estate" productName={product.name} />
      </section>

      {/* CTA */}
      <section className="bg-odisha-red border-t-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-white text-lg">
              Sourcing at scale from Koraput, Odisha?
            </h3>
            <p className="text-white/60 text-sm mt-1">
              {exportReadyFarms.length} of our {farms.length} partner farms are export-ready, talk to us about bulk quantities.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-block px-6 py-3 bg-white text-odisha-black text-sm font-semibold border-2 border-white hover:bg-odisha-yellow hover:border-odisha-yellow transition-colors whitespace-nowrap"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Product not found</h1>
        <Link to="/buy-green-beans" className="text-odisha-red underline">
          Browse all products
        </Link>
      </div>
    );
  }
  throw error;
}
