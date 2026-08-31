import { Link, useParams } from "react-router";
import { farms, getFarmBySlug, processingColors, processingLabels } from "@/data/farms";
import type { ProcessingMethod } from "@/data/farms";
import { products } from "@/data/products";

const SITE = "https://odishacoffee.com";

export function meta({ params }: { params: { slug?: string } }) {
  const farm = params.slug ? getFarmBySlug(params.slug) : undefined;
  if (!farm) return [{ title: "Farm Not Found" }];
  const url = `${SITE}/farms/${params.slug}`;
  const desc =
    `${farm.name}: ${farm.varieties.join(" & ")} Arabica grown at ${farm.elevation} in ${farm.region}, Koraput, ${farm.processing.join("/")} processed. ${farm.description}`
      .slice(0, 157)
      .replace(/[\s,.]+\S*$/, "") + ".";
  return [
    { title: `${farm.name} - ${farm.region}, ${farm.district} Coffee Estate` },
    { name: "description", content: desc },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: `${SITE}/products/koraput-washed.webp` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${SITE}/products/koraput-washed.webp` },
  ];
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-2 border-odisha-black p-4 bg-white">
      <div className="text-[10px] font-semibold uppercase tracking-widest text-odisha-black/50 mb-1">
        {label}
      </div>
      <div className="font-serif font-semibold text-odisha-black text-sm">{value}</div>
    </div>
  );
}

function ProcessingTag({ method }: { method: ProcessingMethod }) {
  return (
    <span
      className={`inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 border-2 border-current ${processingColors[method]}`}
    >
      {processingLabels[method]}
    </span>
  );
}

function NotFoundBlock() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-24 text-center">
      <h1 className="font-serif text-2xl font-bold text-odisha-black mb-2">Farm Not Found</h1>
      <p className="text-sm text-odisha-black/60 mb-6">
        We couldn't find a farm with this URL slug.
      </p>
      <Link to="/farms" className="inline-block px-6 py-3 bg-odisha-red text-white font-semibold text-sm">
        Browse All Farms
      </Link>
    </div>
  );
}

export default function FarmDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const farm = slug ? getFarmBySlug(slug) : undefined;

  if (!farm || !slug) return <NotFoundBlock />;

  const farmProducts = products.filter((p) => p.farmId === farm.id);

  return (
    <div>
      {/* ── HEADER ───────────────────────────────────────────────────── */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-10 pb-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-xs">
            <Link to="/" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <Link to="/farms" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">
              Farms
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80 uppercase tracking-widest">{farm.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                {farm.exportReady && (
                  <span className="text-[10px] font-bold uppercase tracking-widest border-2 border-white text-white px-2 py-0.5">
                    Export Ready
                  </span>
                )}
                {farm.featured && (
                  <span className="text-[10px] font-bold uppercase tracking-widest border-2 border-odisha-yellow text-odisha-yellow px-2 py-0.5">
                    Featured Estate
                  </span>
                )}
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
                {farm.name}
              </h1>
              <p className="text-white/70 text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {farm.region}, {farm.district} District, Odisha, India
              </p>
            </div>

            {/* Processing tags */}
            <div className="flex flex-wrap gap-2">
              {farm.processing.map((m) => (
                <ProcessingTag key={m} method={m} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── META GRID ────────────────────────────────────────────────── */}
      <section className="bg-odisha-offwhite border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0">
            <InfoBlock label="Region" value={farm.region} />
            <InfoBlock label="District" value={farm.district} />
            <InfoBlock label="Elevation" value={farm.elevation} />
            <InfoBlock label="Farm Area" value={farm.area} />
            <InfoBlock label="Established" value={String(farm.established)} />
            <InfoBlock label="Harvest" value={farm.harvestSeason} />
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column, about + story */}
            <div className="lg:col-span-2 space-y-10">
              {/* About the farm */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-6 bg-odisha-red" />
                  <h2 className="font-serif text-xl font-bold text-odisha-black">About the Farm</h2>
                </div>
                <p className="text-sm text-odisha-black/70 leading-relaxed">{farm.description}</p>
              </div>

              {/* Farmer story */}
              <div className="border-2 border-odisha-black p-6 bg-odisha-offwhite pattachitra-pattern">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-6 bg-odisha-orange" />
                  <h2 className="font-serif text-xl font-bold text-odisha-black">The Story Behind the Farm</h2>
                </div>
                <p className="text-sm text-odisha-black/70 leading-relaxed">{farm.story}</p>
              </div>

              {/* Coffee varieties grown */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-6 bg-odisha-green" />
                  <h2 className="font-serif text-xl font-bold text-odisha-black">Coffee Varieties</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                  {farm.varieties.map((v) => (
                    <div key={v} className="border-2 border-odisha-black -ml-[2px] -mt-[2px] p-4 bg-white">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-odisha-black rounded-full shrink-0" />
                        <span className="font-serif font-semibold text-sm text-odisha-black">{v}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Processing methods */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-6 bg-odisha-blue" />
                  <h2 className="font-serif text-xl font-bold text-odisha-black">Processing Methods</h2>
                </div>
                <div className="space-y-3">
                  {farm.processing.map((m) => {
                    const descriptions: Record<ProcessingMethod, string> = {
                      washed:
                        "Cherry pulp is mechanically removed before fermentation in water tanks (18–36 hours). The parchment is then thoroughly washed and dried on raised beds for 12–18 days. Produces clean, bright, terroir-transparent cups.",
                      natural:
                        "Whole cherries are dried on raised beds for 25–35 days with regular turning to ensure even drying. The fruit remains in contact with the bean throughout, imparting rich fruit sweetness and body.",
                      honey:
                        "Cherry pulp is removed but mucilage is retained on the parchment during drying (10–18 days). This bridges washed clarity with natural sweetness, producing honeyed, caramel-forward cups.",
                      "pulped-natural":
                        "A variation of honey processing where most but not all mucilage is removed. Drying takes 12–15 days on raised beds. Creates a balanced cup with some fruit sweetness and good clarity.",
                    };
                    return (
                      <div key={m} className="border-2 border-odisha-black p-5 bg-white flex gap-4">
                        <div className={`shrink-0 px-2 py-1 text-[10px] font-bold uppercase tracking-widest h-fit ${processingColors[m]}`}>
                          {processingLabels[m]}
                        </div>
                        <p className="text-sm text-odisha-black/70 leading-relaxed">{descriptions[m]}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right column, sidebar */}
            <div className="space-y-6">
              {/* Flavor profile card */}
              <div className="border-2 border-odisha-black bg-white p-6">
                <h3 className="font-serif font-bold text-odisha-black text-base mb-4 flex items-center gap-2">
                  <div className="w-1 h-4 bg-odisha-red" />
                  Flavor Profile &amp; Cupping Notes
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {farm.flavorNotes.map((note) => (
                    <span key={note} className="text-xs font-semibold px-2.5 py-1 bg-odisha-black/5 text-odisha-black border border-odisha-black/10">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications card */}
              <div className="border-2 border-odisha-black bg-white p-6">
                <h3 className="font-serif font-bold text-odisha-black text-base mb-4 flex items-center gap-2">
                  <div className="w-1 h-4 bg-odisha-green" />
                  Certifications &amp; Standards
                </h3>
                <div className="space-y-2">
                  {farm.certifications.map((cert) => (
                    <div key={cert} className="flex items-center gap-2 text-xs text-odisha-black font-semibold">
                      <svg className="w-4 h-4 text-odisha-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {cert}
                    </div>
                  ))}
                </div>
              </div>

              {/* Wholesale contact box */}
              <div className="border-2 border-odisha-black bg-odisha-black p-6 text-white">
                <h3 className="font-serif font-bold text-white text-sm mb-2">
                  Source from this farm
                </h3>
                <p className="text-white/70 text-xs mb-4 leading-relaxed">
                  Contact Gray Cup to request samples, lot documentation, or export pricing for {farm.name}.
                </p>
                <Link
                  to={`/contact?farm=${farm.id}`}
                  className="block text-center px-4 py-2 bg-white text-odisha-black text-xs font-semibold border-2 border-white hover:bg-odisha-yellow hover:border-odisha-yellow transition-colors"
                >
                  Request Sample / Inquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIMATE & ELEVATION ──────────────────────────────────────── */}
      <section className="bg-odisha-offwhite border-b-2 border-odisha-black pattachitra-pattern">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 bg-odisha-yellow" />
            <h2 className="font-serif text-xl font-bold text-odisha-black">Elevation, Climate &amp; Growing Conditions</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              {
                label: "Elevation Band",
                value: farm.elevation,
                note: "Above sea level in the Eastern Ghats",
              },
              {
                label: "Primary Region",
                value: `${farm.region}, ${farm.district}`,
                note: "Coffee growing belt, Odisha",
              },
              {
                label: "Climate Type",
                value: "Subtropical Highland",
                note: "Distinct wet/dry seasons, cool nights",
              },
              {
                label: "Shade Cover",
                value: "Natural Canopy",
                note: "Silver oak and native forest trees",
              },
            ].map(({ label, value, note }) => (
              <div key={label} className="border-2 border-odisha-black -ml-[2px] -mt-[2px] p-5 bg-white">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-odisha-black/40 mb-2">{label}</div>
                <div className="font-serif font-bold text-odisha-black text-base mb-1">{value}</div>
                <div className="text-xs text-odisha-black/50">{note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS FROM THIS FARM ──────────────────────────────────── */}
      {farmProducts.length > 0 && (
        <section className="bg-white border-b-2 border-odisha-black">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-6 bg-odisha-red" />
              <h2 className="font-serif text-xl font-bold text-odisha-black">
                Available Lots from {farm.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {farmProducts.map((product) => (
                <div key={product.id} className="border-2 border-odisha-black -ml-[2px] -mt-[2px] p-5 bg-white">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-serif font-semibold text-odisha-black text-sm leading-snug">
                      {product.name}
                    </h3>
                    <span
                      className={`shrink-0 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 ${
                        product.availability === "in-stock"
                          ? "bg-odisha-green text-white"
                          : product.availability === "limited"
                          ? "bg-odisha-yellow text-black"
                          : "bg-odisha-blue text-white"
                      }`}
                    >
                      {product.availability === "in-stock" ? "In Stock" : product.availability === "limited" ? "Limited" : "Seasonal"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 ${processingColors[product.processing]}`}>
                      {processingLabels[product.processing]}
                    </span>
                  </div>
                  <p className="text-xs text-odisha-black/60 leading-relaxed mb-3 line-clamp-3">{product.description}</p>
                  <p className="text-xs text-odisha-black/50">{product.flavorNotes.join(" · ")}</p>
                  {product.exportAvailable && product.minOrderExport && (
                    <p className="text-xs text-odisha-green mt-2 font-medium">
                      Min. export: {product.minOrderExport}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NAVIGATION ───────────────────────────────────────────────── */}
      <section className="bg-odisha-offwhite border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/farms"
            className="inline-flex items-center gap-2 text-sm font-semibold text-odisha-black border-2 border-odisha-black px-4 py-2 hover:bg-odisha-red hover:border-odisha-red hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            All Farms
          </Link>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={`/farms/${farm.id}/green-coffee`}
              className="inline-flex items-center gap-2 text-sm font-semibold bg-odisha-green text-white border-2 border-odisha-green px-5 py-2 hover:bg-odisha-black hover:border-odisha-black transition-colors"
            >
              Buy Green Beans
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to={`/farms/${farm.id}/roasted-coffee`}
              className="inline-flex items-center gap-2 text-sm font-semibold bg-odisha-yellow text-odisha-black border-2 border-odisha-yellow px-5 py-2 hover:bg-odisha-black hover:border-odisha-black hover:text-white transition-colors"
            >
              Roasted Coffee
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold bg-odisha-red text-white border-2 border-odisha-red px-6 py-2 hover:bg-odisha-red-dark transition-colors"
            >
              Wholesale Inquiry
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
