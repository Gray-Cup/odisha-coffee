import { Link } from "react-router";
import { farms, processingColors, processingLabels } from "@/data/farms";
import type { ProcessingMethod } from "@/data/farms";

export function meta() {
  return [
    { title: "Coffee Farms in Koraput - Odisha's Eastern Ghats Coffee Belt" },
    { name: "description", content: "Discover coffee farms in Koraput district, Odisha. 23 verified estates across Jeypore, Pottangi, Semiliguda and Sunabeda, Arabica from 800–1450m elevation. Sourced by Gray Cup Enterprises." },
    { property: "og:title", content: "Coffee Farms in Koraput, Odisha's Eastern Ghats Coffee Belt" },
    { property: "og:description", content: "23 verified coffee estates in Koraput district. Arabica S795, SLN 9, Catuai and Chandragiri at 800–1450m, traceable, export-ready lots from Odisha's highland coffee belt." },
    { property: "og:url", content: "https://odishacoffee.com/coffee-farms-koraput" },
    { property: "og:locale", content: "en_IN" },
  ];
}

export function links() {
  return [{ rel: "canonical", href: "https://odishacoffee.com/coffee-farms-koraput" }];
}

function ProcessingTag({ method }: { method: ProcessingMethod }) {
  return (
    <span
      className={`inline-block text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 ${processingColors[method]}`}
    >
      {processingLabels[method]}
    </span>
  );
}

const koraputZones = [
  {
    name: "Pottangi Highlands",
    elevation: "1100–1450m",
    character: "Odisha's highest coffee zone. Intense aromatics, bright acidity, jasmine and citrus notes. Arabica-dominant.",
    farms: ["Dream Hill Coffee, Saptagiri Plantation", "Oak Winds Farm"],
  },
  {
    name: "Sunabeda Plateau",
    elevation: "1000–1200m",
    character: "Cool nights and warm days produce excellent cherry development. Floral and fruit-forward Arabica lots.",
    farms: ["Annapurna Coffee Estate"],
  },
  {
    name: "Jeypore Belt",
    elevation: "870–1100m",
    character: "Established coffee corridor with rich laterite soils. Well-balanced, chocolatey Arabica.",
    farms: ["Agrawal Plantation", "Jayadhar Garden", "Maa Mangala Coffee Plantation"],
  },
  {
    name: "Semiliguda / Similiguda",
    elevation: "880–1150m",
    character: "Diverse estates with full processing infrastructure. Chocolate and fruit character across varieties.",
    farms: ["Koraput Organic", "Panigrahi Agro Foundation", "Urbara Plantation", "Durga Madhav Coffee Estate"],
  },
  {
    name: "Boipariguda",
    elevation: "870–1300m",
    character: "Larger estates with multi-method processing. Milk chocolate, hazelnut, stone fruit profiles.",
    farms: ["Brown Valley Coffee Estate", "SM Plantation"],
  },
  {
    name: "Narayanpatna",
    elevation: "880–1060m",
    character: "Tribal heartland with integrated farming. Full-bodied, well-structured Arabica lots.",
    farms: ["Bighneswari Plantation", "Trinetra Agro"],
  },
];

export default function CoffeeFarmsKoraputPage() {
  const koraputFarms = farms.filter((f) => f.district === "Koraput");
  const exportReady = koraputFarms.filter((f) => f.exportReady);
  const arabica = koraputFarms.filter((f) =>
    f.varieties.some((v) => v.toLowerCase().includes("arabica"))
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14 md:py-18">
          <div className="flex items-center gap-3 mb-5">
            <Link
              to="/"
              className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-widest"
            >
              Home
            </Link>
            <span className="text-white/30">/</span>
            <Link
              to="/coffee-farms-odisha"
              className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-widest"
            >
              Coffee Farms of Odisha
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-xs text-white/80 uppercase tracking-widest">Koraput</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Coffee Farms in Koraput
          </h1>
          <p className="text-white/70 text-sm max-w-2xl leading-relaxed mb-8">
            Koraput district is the core of Odisha&apos;s coffee belt, a highland territory in
            the southern Eastern Ghats where over two dozen estates cultivate Arabica
            at elevations from 800 to 1450 metres. Gray Cup Enterprises sources from{" "}
            {koraputFarms.length} verified farms here, spanning the full range of Koraput&apos;s
            diverse growing zones.
          </p>

          <div className="flex flex-wrap gap-6">
            {[
              { value: koraputFarms.length.toString(), label: "Farms in Koraput" },
              { value: exportReady.length.toString(), label: "Export Ready" },
              { value: arabica.length.toString(), label: "Grow Arabica" },
              { value: "800–1450m", label: "Elevation" },
              { value: "6+", label: "Growing Zones" },
            ].map(({ value, label }) => (
              <div key={label} className="border-l-2 border-white/30 pl-4">
                <div className="font-serif text-2xl font-bold text-white">{value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Growing Zones */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-2">
            Koraput Growing Zones
          </h2>
          <p className="text-sm text-odisha-black/60 mb-8 max-w-2xl">
            Koraput&apos;s coffee landscape is not uniform, each sub-zone has distinct elevation,
            soil character, and microclimate that shapes cup quality.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {koraputZones.map((zone) => (
              <div
                key={zone.name}
                className="border-2 border-odisha-black -ml-[2px] -mt-[2px] p-5 bg-odisha-offwhite"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-serif font-semibold text-odisha-black text-base">
                    {zone.name}
                  </h3>
                  <span className="shrink-0 text-[9px] font-bold uppercase tracking-widest border border-odisha-black/30 text-odisha-black/50 px-1.5 py-0.5">
                    {zone.elevation}
                  </span>
                </div>
                <p className="text-xs text-odisha-black/60 leading-relaxed mb-3">
                  {zone.character}
                </p>
                <div className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-1">
                  Farms
                </div>
                <ul className="space-y-0.5">
                  {zone.farms.map((f) => (
                    <li key={f} className="text-xs text-odisha-black/60">
                      · {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Koraput Farms */}
      <section className="bg-odisha-offwhite pattachitra-pattern border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-2">
            All Koraput Partner Farms
          </h2>
          <p className="text-sm text-odisha-black/60 mb-8">
            {koraputFarms.length} verified estates, click any farm for the full profile including
            elevation, varieties, processing methods, flavor character, and export status.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {koraputFarms.map((farm) => (
              <Link
                key={farm.id}
                to={`/farms/${farm.id}`}
                className="group block border-2 border-odisha-black -ml-[2px] -mt-[2px] bg-white hover:bg-odisha-offwhite transition-colors"
              >
                <div className="h-1 bg-odisha-red w-full" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif font-semibold text-odisha-black text-sm leading-snug group-hover:text-odisha-red transition-colors">
                      {farm.name}
                    </h3>
                    {farm.exportReady && (
                      <span className="shrink-0 text-[9px] font-bold uppercase tracking-widest border border-odisha-green text-odisha-green px-1.5 py-0.5">
                        Export
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 mb-3">
                    <p className="text-xs text-odisha-black/50">
                      {farm.region} · {farm.elevation}
                    </p>
                    <p className="text-xs text-odisha-black/50">
                      Est. {farm.established} · {farm.area}
                    </p>
                  </div>
                  <p className="text-xs text-odisha-black/50 mb-2">
                    <span className="font-medium">Varieties:</span>{" "}
                    {farm.varieties.join(", ")}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {farm.processing.map((m) => (
                      <ProcessingTag key={m} method={m} />
                    ))}
                  </div>
                  <p className="text-xs text-odisha-black/40">
                    {farm.flavorNotes.join(" · ")}
                  </p>
                </div>
                <div className="border-t-2 border-odisha-black px-5 py-2 flex items-center justify-between bg-odisha-black/5 group-hover:bg-odisha-red group-hover:border-odisha-red transition-colors">
                  <span className="text-[10px] uppercase tracking-widest text-odisha-black/50 group-hover:text-white transition-colors">
                    View Full Profile
                  </span>
                  <svg
                    className="w-3 h-3 text-odisha-black/40 group-hover:text-white transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Koraput coffee narrative */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
            About Koraput Coffee
          </h2>
          <div className="space-y-5 text-sm text-odisha-black/70 leading-relaxed">
            <p>
              <strong className="text-odisha-black">Where is Koraput?</strong>{" "}
              Koraput is a highland district in the southernmost corner of Odisha, bordering
              Andhra Pradesh and Chhattisgarh. The district headquarters, Koraput town, lies
              at approximately 853 metres elevation. The broader district encompasses valleys,
              plateaus, and peaks of the Eastern Ghats that rise to over 1500 metres, creating
              a climate far cooler and more variable than the Odisha coastal plain.
            </p>
            <p>
              <strong className="text-odisha-black">When did coffee farming start in Koraput?</strong>{" "}
              Commercial coffee cultivation in Koraput began in the 1990s, encouraged by the
              Coffee Board of India&apos;s extension programmes. The oldest partner estates in the
              Gray Cup network date to 1992–1995. Today, the district has dozens of registered
              coffee estates ranging from 8 to 35 acres, with processing infrastructure that
              includes wet mills, raised drying beds, and covered drying stations.
            </p>
            <p>
              <strong className="text-odisha-black">What makes Koraput coffee distinctive?</strong>{" "}
              Koraput sits on ancient laterite and red loam soils enriched by the decomposition
              of Eastern Ghats forest canopy. The district&apos;s tribal farming traditions mean
              most estates have maintained shade-grown systems, with significant biodiversity in
              the farm ecosystem. Combined with the high-altitude cool climate, average
              temperature ranging from 10°C in winter nights to 30°C in summer afternoons,
              the beans develop slowly and accumulate density and complexity unusual in Indian
              lowland coffees.
            </p>
            <p>
              <strong className="text-odisha-black">How to buy Koraput coffee?</strong>{" "}
              Gray Cup Enterprises offers Koraput coffee in multiple forms: retail roasted bags
              (100g–1kg) through this website, wholesale green beans (minimum 50kg per lot),
              and export-grade containers (FCL and LCL). Contact us with your volume requirements
              and we will provide current lot availability, cupping reports, and pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="bg-odisha-offwhite border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <h3 className="font-serif font-semibold text-odisha-black mb-4 text-lg">
            Explore Further
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/coffee-farms-odisha", label: "All Coffee Farms of Odisha" },
              { href: "/odisha-coffee-varieties", label: "Coffee Varieties in Odisha" },
              { href: "/odisha-coffee-export", label: "Odisha Coffee Export" },
              { href: "/farms", label: "Full Farm Directory" },
              { href: "/buy-green-beans", label: "Buy Koraput Coffee" },
            ].map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm border-2 border-odisha-black px-4 py-2 text-odisha-black hover:bg-odisha-red hover:text-white hover:border-odisha-red transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-odisha-red border-t-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-white text-lg">
              Looking to source from a specific Koraput farm?
            </h3>
            <p className="text-white/60 text-sm mt-1">
              Share your cup profile requirements, we&apos;ll match you with the right estate.
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
