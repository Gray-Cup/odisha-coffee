import { Link, useParams } from "react-router";
import { getFarmBySlug, processingColors, processingLabels } from "@/data/farms";
import { estateProducts } from "@/data/estate-products";

export function meta({ params }: { params: { slug?: string } }) {
  const farm = params.slug ? getFarmBySlug(params.slug) : undefined;
  if (!farm) return [{ title: "Farm Not Found" }];
  return [
    { title: `Buy Coffee from ${farm.name} — Koraput, Odisha` },
    {
      name: "description",
      content: `Browse and buy single-origin coffee lots directly from ${farm.name}, ${farm.region}, Koraput.`,
    },
  ];
}

const availabilityStyles = {
  "in-stock": { bg: "bg-odisha-green text-white", label: "In Stock" },
  limited: { bg: "bg-odisha-yellow text-black", label: "Limited" },
  seasonal: { bg: "bg-[#1E3A8A] text-white", label: "Seasonal" },
};

function NotFoundBlock() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-24 text-center">
      <h1 className="font-serif text-2xl font-bold text-odisha-black mb-2">Farm Not Found</h1>
      <Link to="/farms" className="text-odisha-red underline">
        Browse all farms
      </Link>
    </div>
  );
}

export default function FarmProductsPage() {
  const { slug } = useParams<{ slug: string }>();
  const farm = slug ? getFarmBySlug(slug) : undefined;

  if (!farm || !slug) return <NotFoundBlock />;

  const availableProducts = estateProducts.filter(
    (p) => !p.exclusiveFarmId || p.exclusiveFarmId === slug
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="flex items-center gap-2 mb-6 text-xs flex-wrap">
            <Link to="/" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link to="/farms" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Farms</Link>
            <span className="text-white/30">/</span>
            <Link to={`/farms/${slug}`} className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">{farm.name}</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80 uppercase tracking-widest">Products</span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            Buy from {farm.name}
          </h1>
          <p className="text-white/70 text-sm max-w-xl leading-relaxed">
            {farm.region}, {farm.district} District · {farm.elevation} · Est. {farm.established}
          </p>
        </div>
      </section>

      {/* Farm meta strip */}
      <section className="bg-odisha-offwhite border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex flex-wrap gap-4 items-center">
          <div className="flex flex-wrap gap-1.5">
            {farm.processing.map((m) => (
              <span key={m} className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 ${processingColors[m]}`}>
                {processingLabels[m]}
              </span>
            ))}
          </div>
          <span className="text-odisha-black/30 hidden sm:inline">·</span>
          <span className="text-xs text-odisha-black/60">{farm.varieties.join(", ")}</span>
          {farm.exportReady && (
            <>
              <span className="text-odisha-black/30 hidden sm:inline">·</span>
              <span className="text-[10px] font-bold uppercase tracking-widest border border-odisha-green text-odisha-green px-2 py-0.5">
                Export Ready
              </span>
            </>
          )}
          <div className="ml-auto flex items-center gap-4">
            <Link
              to={`/farms/${slug}/roasted-coffee`}
              className="text-xs text-odisha-black/50 hover:text-odisha-red transition-colors uppercase tracking-widest"
            >
              Roasted Coffee →
            </Link>
            <Link
              to={`/farms/${slug}`}
              className="text-xs text-odisha-black/50 hover:text-odisha-red transition-colors uppercase tracking-widest"
            >
              ← Farm Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-xl font-bold text-odisha-black mb-6">
            Available Green Beans
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {availableProducts.map((product) => {
              const avail = availabilityStyles[product.availability];
              const totalPerKg = product.pricePerKg + product.shippingPerKg;
              return (
                <Link
                  key={product.id}
                  to={`/farms/${slug}/products/${product.id}`}
                  className="group block border-2 border-odisha-black -ml-[2px] -mt-[2px] bg-white hover:bg-odisha-offwhite transition-colors"
                >
                  {/* Top accent */}
                  <div className="h-1 bg-odisha-green w-full" />

                  <div className="p-5">
                    {/* Title + badge */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-serif font-semibold text-odisha-black text-base leading-snug group-hover:text-odisha-red transition-colors">
                        {product.name}
                      </h3>
                      <span className={`shrink-0 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 ${avail.bg}`}>
                        {avail.label}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 ${processingColors[product.processing]}`}>
                        {processingLabels[product.processing]}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 bg-odisha-black/5 text-odisha-black/60 border border-odisha-black/10">
                        Green Bean
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-odisha-black/60 leading-relaxed mb-4 line-clamp-3">
                      {product.description}
                    </p>

                    {/* Grade + Variety */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-odisha-black/40 uppercase tracking-widest text-[10px]">Grade</span>
                        <span className="text-odisha-black font-medium">{product.grade}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-odisha-black/40 uppercase tracking-widest text-[10px]">Variety</span>
                        <span className="text-odisha-black font-medium">{product.variety}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-odisha-black/40 uppercase tracking-widest text-[10px]">Min. Order</span>
                        <span className="text-odisha-black font-medium">{product.minOrder}</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="border-t-2 border-odisha-black/10 pt-3">
                      <span className="font-serif text-xl font-bold text-odisha-black">
                        ₹{totalPerKg.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-odisha-black/50 ml-1">/ kg</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t-2 border-odisha-black px-5 py-2.5 flex items-center justify-between bg-odisha-black/5 group-hover:bg-odisha-red group-hover:border-odisha-red transition-colors">
                    <span className="text-[10px] uppercase tracking-widest text-odisha-black/50 group-hover:text-white transition-colors">
                      View Details &amp; Order
                    </span>
                    <svg className="w-3.5 h-3.5 text-odisha-black/40 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-odisha-red border-t-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-white text-lg">Need a custom lot from {farm.name}?</h3>
            <p className="text-white/60 text-sm mt-1">
              Large volumes, specific screen sizes, or cupping samples — contact us directly.
            </p>
          </div>
          <Link
            to={`/contact?farm=${slug}`}
            className="inline-block px-6 py-3 bg-white text-odisha-black text-sm font-semibold border-2 border-white hover:bg-odisha-yellow hover:border-odisha-yellow transition-colors whitespace-nowrap"
          >
            Custom Enquiry
          </Link>
        </div>
      </section>
    </div>
  );
}
