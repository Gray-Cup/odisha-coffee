import { Link } from "react-router";
import { farms, featuredFarms, processingColors, processingLabels } from "@/data/farms";
import type { ProcessingMethod } from "@/data/farms";

export function meta() {
  return [
    { title: "Odisha Coffee — Wholesale, Export & Farm Sourcing" },
    {
      name: "description",
      content:
        "Buy Odisha Coffee wholesale — traceable Arabica from 24 verified farms in Koraput's Eastern Ghats. Export lots, green bean wholesale, and direct farm sourcing by Gray Cup Enterprises.",
    },
    { property: "og:title", content: "Odisha Coffee — Wholesale, Export & Farm Sourcing" },
    {
      property: "og:description",
      content:
        "Traceable Arabica from 24 verified farms in Koraput's Eastern Ghats. Wholesale, export, and direct farm sourcing by Gray Cup Enterprises.",
    },
    { property: "og:url", content: "https://odishacoffee.com" },
    { property: "og:locale", content: "en_IN" },
  ];
}

// ── Reusable tag ────────────────────────────────────────────────────────
function ProcessingTag({ method }: { method: ProcessingMethod }) {
  return (
    <span
      className={`inline-block text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 border border-current ${processingColors[method]}`}
    >
      {processingLabels[method]}
    </span>
  );
}

// ── Farm card ────────────────────────────────────────────────────────────
function FarmCard({ farm }: { farm: (typeof farms)[0] }) {
  return (
    <Link
      to={`/farms/${farm.id}`}
      className="group block pattachitra-card bg-white hover:bg-odisha-offwhite transition-colors"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-serif font-semibold text-odisha-black text-base leading-snug group-hover:text-odisha-red transition-colors">
            {farm.name}
          </h3>
          {farm.exportReady && (
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-widest border border-odisha-green text-odisha-green px-1.5 py-0.5">
              Export
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="space-y-1 mb-4">
          <div className="flex items-center gap-2 text-xs text-odisha-black/60">
            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{farm.region}, {farm.district}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-odisha-black/60">
            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>{farm.elevation}</span>
          </div>
        </div>

        {/* Processing tags */}
        <div className="flex flex-wrap gap-1.5">
          {farm.processing.map((m) => (
            <ProcessingTag key={m} method={m} />
          ))}
        </div>

        {/* Flavor notes */}
        <p className="mt-3 text-xs text-odisha-black/50 leading-relaxed line-clamp-2">
          {farm.flavorNotes.join(" · ")}
        </p>
      </div>

      {/* Bottom stripe */}
      <div className="border-t-2 border-odisha-black px-5 py-2 flex items-center justify-between bg-odisha-offwhite">
        <span className="text-[10px] uppercase tracking-widest text-odisha-black/50">{farm.area}</span>
        <svg className="w-3.5 h-3.5 text-odisha-black/40 group-hover:text-odisha-red transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </Link>
  );
}

// ── Processing method block ─────────────────────────────────────────────
const processingMethods = [
  {
    method: "washed" as ProcessingMethod,
    title: "Washed",
    subtitle: "Transparency & Terroir",
    description:
      "Cherry pulp is removed before fermentation. The bean is then fermented in water tanks, washed thoroughly, and dried on raised beds. This method produces clean, bright cups where the origin terroir shines clearly — the definitive expression of Koraput's mineral highland soils.",
    farms: farms.filter((f) => f.processing.includes("washed")).length,
    bgColor: "bg-[#1E3A8A]",
    textColor: "text-white",
  },
  {
    method: "natural" as ProcessingMethod,
    title: "Natural",
    subtitle: "Fruit & Complexity",
    description:
      "Whole cherries are dried on raised beds for 25–35 days. The fruit remains in contact with the bean throughout, imparting pronounced fruit sweetness, berry notes, and a dense, wine-like body. Odisha's dry-season sun creates ideal conditions for natural processing.",
    farms: farms.filter((f) => f.processing.includes("natural")).length,
    bgColor: "bg-[#C2410C]",
    textColor: "text-white",
  },
  {
    method: "honey" as ProcessingMethod,
    title: "Honey",
    subtitle: "Sweetness & Balance",
    description:
      "Pulp is removed but varying levels of mucilage are retained on the parchment during drying. This hybrid method bridges washed clarity and natural sweetness, producing honeyed, caramel-rich cups. Several Gray Cup partner estates have pioneered honey processing in Odisha.",
    farms: farms.filter((f) => f.processing.includes("honey")).length,
    bgColor: "bg-[#E3A008]",
    textColor: "text-black",
  },
];

// ── Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-odisha-red pattachitra-pattern-red">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-odisha-offwhite/50" />
              <span className="text-xs font-semibold uppercase tracking-widest text-odisha-offwhite/70">
                Eastern Ghats · Koraput, Odisha, India
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-odisha-offwhite leading-[1.1] mb-6">
              Coffee from the<br />
              <span className="italic font-normal">Eastern Ghats</span><br />
              of Odisha
            </h1>

            {/* Sub */}
            <p className="text-odisha-offwhite/75 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
              24 verified growers. Single-origin lots from Koraput's highlands at 800–1500m.
              Fully traceable, export-ready, rooted in the cultural heritage of Odisha.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/farms"
                className="pattachitra-frame inline-block px-6 py-3 bg-odisha-offwhite text-odisha-black text-sm font-semibold border-2 border-odisha-offwhite hover:bg-odisha-yellow hover:border-odisha-yellow transition-colors"
              >
                Explore Farms
              </Link>
              <Link
                to="/contact"
                className="inline-block px-6 py-3 bg-transparent text-odisha-offwhite text-sm font-semibold border-2 border-odisha-offwhite/60 hover:border-odisha-offwhite hover:bg-odisha-offwhite/10 transition-colors"
              >
                Wholesale Inquiry
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-14 flex flex-wrap gap-8 border-t border-odisha-offwhite/20 pt-8">
              {[
                { value: "24", label: "Partner Farms" },
                { value: "800–1500m", label: "Elevation Range" },
                { value: "3", label: "Processing Methods" },
                { value: "Koraput", label: "Primary Region" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl font-serif font-bold text-odisha-offwhite">{value}</div>
                  <div className="text-xs uppercase tracking-widest text-odisha-offwhite/50 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES ODISHA COFFEE UNIQUE ──────────────────────────── */}
      <section className="bg-odisha-offwhite border-b-2 border-odisha-black pattachitra-pattern">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16 md:py-20">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-odisha-black/50">
              Origin Story
            </span>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-odisha-black leading-tight">
              What makes Odisha coffee exceptional
            </h2>
            <p className="mt-4 text-sm text-odisha-black/60 leading-relaxed">
              The Eastern Ghats of southern Odisha create one of India's most distinctive yet under-recognised coffee growing environments — a combination of altitude, soil, tribal agricultural tradition, and climate that produces coffees of remarkable character.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              {
                num: "01",
                title: "Highland Altitude",
                body: "Koraput's coffee belt sits at 800–1500m in the Eastern Ghats. The high altitude slows cherry development by weeks, concentrating sugars and building complex aromatics that define the region's cup character.",
                accent: "bg-odisha-red",
              },
              {
                num: "02",
                title: "Tribal Cultivation",
                body: "Coffee here is grown on small tribal-owned plots, farmed by Kondh and Bhond communities with deep generational knowledge of the land. This human story is embedded in every lot we export.",
                accent: "bg-odisha-blue",
              },
              {
                num: "03",
                title: "Forest Shade Cover",
                body: "Most Odisha coffee grows under a natural canopy of silver oak and native trees. The shade creates a cooler, more humid microclimate that reduces stress on the plant and produces denser, higher-quality beans.",
                accent: "bg-odisha-green",
              },
              {
                num: "04",
                title: "Koraput Microclimate",
                body: "The convergence of the Bay of Bengal monsoon, the Deccan plateau dry season, and Eastern Ghats topography creates a unique rhythm of wet and dry that is ideal for both cherry development and post-harvest drying.",
                accent: "bg-odisha-orange",
              },
            ].map(({ num, title, body, accent }) => (
              <div
                key={num}
                className="border-2 border-odisha-black -ml-[2px] -mt-[2px] p-6 bg-white"
              >
                <div className={`w-8 h-1 ${accent} mb-4`} />
                <div className="font-serif text-xs font-bold text-odisha-black/30 mb-2 tracking-widest">{num}</div>
                <h3 className="font-serif font-semibold text-odisha-black text-lg mb-3 leading-snug">{title}</h3>
                <p className="text-sm text-odisha-black/60 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED FARMS ───────────────────────────────────────────── */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16 md:py-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-odisha-black/50">
                The Growers
              </span>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-odisha-black leading-tight">
                Featured partner farms
              </h2>
            </div>
            <Link
              to="/farms"
              className="inline-flex items-center gap-2 text-sm font-semibold text-odisha-red border-b-2 border-odisha-red pb-0.5 hover:text-odisha-black hover:border-odisha-black transition-colors whitespace-nowrap"
            >
              View all {farms.length} farms
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {featuredFarms.map((farm) => (
              <div key={farm.id} className="-ml-[2px] -mt-[2px]">
                <FarmCard farm={farm} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESSING METHODS ───────────────────────────────────────── */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16 md:py-20">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-odisha-black/40">
              Processing Methods
            </span>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-odisha-black leading-tight">
              The art of processing
            </h2>
            <p className="mt-3 text-sm text-odisha-black/60 leading-relaxed">
              How a coffee is processed after harvest shapes its flavour as much as where it was grown. Our partner farms practise all three primary methods, giving buyers precise choice over the cup character they source.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {processingMethods.map(({ method, title, subtitle, description, farms: count, bgColor, textColor }) => (
              <div
                key={method}
                className={`border-2 border-odisha-black -ml-[2px] -mt-[2px] p-6 ${bgColor} ${textColor}`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold leading-none">{title}</h3>
                    <p className="text-sm font-medium opacity-70 mt-1">{subtitle}</p>
                  </div>
                  <span className="text-3xl font-serif font-bold opacity-20">{count}</span>
                </div>
                <p className="text-sm leading-relaxed opacity-80 mb-5">{description}</p>
                <Link
                  to={`/products?processing=${method}`}
                  className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest border-b pb-0.5 opacity-80 hover:opacity-100 transition-opacity border-current`}
                >
                  View {title} Lots
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHOLESALE & EXPORT ───────────────────────────────────────── */}
      <section className="bg-odisha-offwhite pattachitra-pattern border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-odisha-black/50">
                For Buyers &amp; Importers
              </span>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-odisha-black leading-tight">
                Odisha coffee wholesale &amp; export
              </h2>
              <p className="mt-4 text-sm text-odisha-black/60 leading-relaxed">
               Gray Cup coordinates export-ready green bean supply from verified partner estates across Koraput. All export lots are phytosanitary certified, APEDA registered, and available with full traceability documentation from farm to container.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-block px-6 py-3 bg-odisha-red text-white text-sm font-semibold border-2 border-odisha-red hover:bg-odisha-red-dark transition-colors"
                >
                  Request Samples
                </Link>
                <Link
                  to="/buy-green-beans"
                  className="inline-block px-6 py-3 bg-transparent text-odisha-black text-sm font-semibold border-2 border-odisha-black hover:bg-odisha-black hover:text-white transition-colors"
                >
                  View Export Lots
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
              {[
                {
                  title: "Phytosanitary Certified",
                  desc: "All export consignments are accompanied by phytosanitary certificates from the Dept. of Agriculture, Odisha.",
                },
                {
                  title: "APEDA Registered",
                  desc: "Gray Cup exports are registered with APEDA under the Agricultural & Processed Food Products Export Development Authority.",
                },
                {
                  title: "Full Lot Traceability",
                  desc: "Each export lot is documented by estate, processing date, variety, and moisture content — available to buyers on request.",
                },
                {
                  title: "Minimum Order Flexibility",
                  desc: "From 50kg specialty micro-lots to full container loads. We work with specialty roasters and commodity importers alike.",
                },
              ].map(({ title, desc }) => (
                <div key={title} className="border-2 border-odisha-black -ml-[2px] -mt-[2px] p-5 bg-white">
                  <h4 className="font-serif font-semibold text-odisha-black text-sm mb-2">{title}</h4>
                  <p className="text-xs text-odisha-black/60 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL MEMBER GROWERS ───────────────────────────────────────── */}
      <section className="bg-odisha-offwhite border-b-2 border-odisha-black pattachitra-pattern">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16 md:py-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-odisha-black/50">
                Our Partner Farms
              </span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-odisha-black leading-tight">
                All {farms.length} partner farms
              </h2>
            </div>
            <Link
              to="/farms"
              className="inline-flex items-center gap-2 text-sm font-semibold text-odisha-red border-b-2 border-odisha-red pb-0.5 hover:text-odisha-black hover:border-odisha-black transition-colors whitespace-nowrap"
            >
              Explore detailed profiles
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {farms.map((farm) => (
              <Link
                key={farm.id}
                to={`/farms/${farm.id}`}
                className="group border-2 border-odisha-black -ml-[2px] -mt-[2px] p-4 bg-white hover:bg-odisha-red hover:text-white transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif font-semibold text-sm leading-snug group-hover:text-white transition-colors">
                      {farm.name}
                    </h3>
                    <p className="text-xs text-odisha-black/50 group-hover:text-white/60 mt-0.5 transition-colors">
                      {farm.region} · {farm.elevation}
                    </p>
                  </div>
                  <svg className="w-3.5 h-3.5 shrink-0 mt-0.5 text-odisha-black/30 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {farm.processing.map((m) => (
                    <span
                      key={m}
                      className="text-[9px] uppercase tracking-widest font-semibold px-1.5 py-0.5 border border-current opacity-60 group-hover:opacity-80"
                    >
                      {processingLabels[m]}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────── */}
      <section className="bg-odisha-red pattachitra-pattern-red">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-odisha-offwhite mb-4">
            Ready to source Odisha coffee?
          </h2>
          <p className="text-odisha-offwhite/70 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Whether you're a specialty roaster, a wholesale buyer, or an importer looking for traceable Indian single-origin coffee, Gray Cup can connect you with the right estate and lot.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="px-8 py-3 bg-odisha-offwhite text-odisha-black text-sm font-semibold border-2 border-odisha-offwhite hover:bg-odisha-yellow hover:border-odisha-yellow transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              to="/farms"
              className="px-8 py-3 bg-transparent text-odisha-offwhite text-sm font-semibold border-2 border-odisha-offwhite/60 hover:border-odisha-offwhite transition-colors"
            >
              Browse All Farms
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
