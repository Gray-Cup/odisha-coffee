import { Link } from "react-router";
import { farms, processingColors, processingLabels } from "@/data/farms";
import type { ProcessingMethod } from "@/data/farms";

export function meta() {
  return [
    { title: "Coffee Farms of Odisha - Estates, Regions & Varieties" },
    { name: "description", content: "Explore all coffee farms of Odisha sourced by Gray Cup Enterprises. 24 verified estates across Koraput, Nabarangpur and the Eastern Ghats, Arabica, washed and natural lots." },
    { property: "og:title", content: "Coffee Farms of Odisha, Estates, Regions & Varieties" },
    { property: "og:description", content: "24 verified coffee estates across Koraput and the Eastern Ghats. Traceable Arabica from Odisha's highland coffee belt, sourced by Gray Cup Enterprises." },
    { property: "og:url", content: "https://odishacoffee.com/coffee-farms-odisha" },
    { property: "og:locale", content: "en_IN" },
  ];
}

export function links() {
  return [{ rel: "canonical", href: "https://odishacoffee.com/coffee-farms-odisha" }];
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

const regions = [
  {
    name: "Koraput District",
    subtitle: "Odisha's Primary Coffee Belt",
    description:
      "Koraput is the heartland of Odisha coffee, a highland district in the southern Eastern Ghats where elevations between 800 and 1450 metres create ideal conditions for Arabica cultivation. The district encompasses distinct growing pockets across Jeypore, Pottangi, Semiliguda, Sunabeda, Boipariguda, Similiguda, Narayanpatna, and Koraput town.",
    farmCount: farms.filter((f) => f.district === "Koraput").length,
  },
  {
    name: "Nabarangpur District",
    subtitle: "Emerging Coffee Country",
    description:
      "Adjacent to Koraput, Nabarangpur district is extending Odisha's coffee map with slightly lower elevations and pronounced seasonal rains that produce heavier-bodied, fruit-forward lots. Gray Cup sources from farms here that complement the Koraput core with distinct regional character.",
    farmCount: farms.filter((f) => f.district === "Nabarangpur").length,
  },
];

export default function CoffeeFarmsOdishaPage() {
  const koraputFarms = farms.filter((f) => f.district === "Koraput");
  const exportReadyFarms = farms.filter((f) => f.exportReady);
  const arabicaFarms = farms.filter((f) =>
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
            <span className="text-xs text-white/80 uppercase tracking-widest">
              Coffee Farms of Odisha
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Coffee Farms of Odisha
          </h1>
          <p className="text-white/70 text-sm max-w-2xl leading-relaxed mb-8">
            Odisha is one of India&apos;s least-known yet most distinctive coffee-growing
            states. Nestled in the Eastern Ghats, farms across Koraput and Nabarangpur
            districts produce Arabica at elevations between 800 and 1450 metres
, under forest shade, with minimal chemical inputs, and with growing
            traceability. Gray Cup Enterprises sources directly from{" "}
            {farms.length} verified estates here.
          </p>

          <div className="flex flex-wrap gap-6">
            {[
              { value: farms.length.toString(), label: "Partner Farms" },
              { value: exportReadyFarms.length.toString(), label: "Export Ready" },
              { value: arabicaFarms.length.toString(), label: "Grow Arabica" },
              { value: "800–1450m", label: "Elevation Range" },
              { value: "2", label: "Districts" },
            ].map(({ value, label }) => (
              <div key={label} className="border-l-2 border-white/30 pl-4">
                <div className="font-serif text-2xl font-bold text-white">{value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-2">
            Coffee-Growing Regions of Odisha
          </h2>
          <p className="text-sm text-odisha-black/60 mb-8 max-w-2xl">
            Odisha&apos;s coffee belt runs through the southern hill districts where the Eastern
            Ghats meet the Deccan plateau. Two districts currently define the growing geography.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {regions.map((r) => (
              <div
                key={r.name}
                className="border-2 border-odisha-black -ml-[2px] -mt-[2px] p-6 bg-odisha-offwhite"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-serif font-semibold text-odisha-black text-lg">
                    {r.name}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest border border-odisha-red text-odisha-red px-2 py-0.5">
                    {r.farmCount} Farms
                  </span>
                </div>
                <p className="text-xs text-odisha-black/50 uppercase tracking-widest mb-3">
                  {r.subtitle}
                </p>
                <p className="text-sm text-odisha-black/70 leading-relaxed">
                  {r.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Odisha Coffee */}
      <section className="bg-odisha-offwhite pattachitra-pattern border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-bold text-odisha-black mb-4">
                Why Odisha Coffee?
              </h2>
              <div className="space-y-4 text-sm text-odisha-black/70 leading-relaxed">
                <p>
                  Unlike better-known South Indian coffee regions, Odisha&apos;s coffee belt
                  remains largely undiscovered by specialty buyers, which means exceptional
                  lots are still available at honest prices. The Eastern Ghats provide
                  altitude, seasonal temperature variation, and rich laterite soils that
                  impart a distinct mineral quality to the cup.
                </p>
                <p>
                  Coffee cultivation in Koraput dates back to the 1990s and early 2000s, with
                  estates now in their second and third generation. Processing infrastructure
                  has evolved steadily, today, farms across the district produce washed,
                  natural, and honey lots, with some estates achieving cupping scores
                  consistently above 82.
                </p>
                <p>
                  Gray Cup Enterprises has built a direct sourcing network across{" "}
                  {farms.length} farms here, providing traceability documentation, export
                  certification support, and quality protocols that connect Odisha growers to
                  domestic specialty roasters and international buyers.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  label: "Harvest Season",
                  value: "November – March",
                  note: "Peak picking Nov–Jan",
                },
                {
                  label: "Primary Varieties",
                  value: "Arabica S795, SLN 9, Catuai, HSD, Chandragiri",
                  note: null,
                },
                {
                  label: "Processing Methods",
                  value: "Washed · Natural · Honey · Pulped Natural",
                  note: null,
                },
                {
                  label: "Certifications Common",
                  value: "FSSAI · APEDA · Organic India · EU Organic",
                  note: null,
                },
                {
                  label: "Export Status",
                  value: `${exportReadyFarms.length} of ${farms.length} farms export-ready`,
                  note: null,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border-2 border-odisha-black bg-white p-4"
                >
                  <div className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-1">
                    {item.label}
                  </div>
                  <div className="text-sm font-medium text-odisha-black">
                    {item.value}
                  </div>
                  {item.note && (
                    <div className="text-[11px] text-odisha-black/40 mt-0.5">
                      {item.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Farm grid, Koraput estates */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-odisha-black mb-1">
                Koraput Coffee Estates
              </h2>
              <p className="text-sm text-odisha-black/50">
                {koraputFarms.length} estates across Jeypore, Pottangi, Semiliguda and more
              </p>
            </div>
            <Link
              to="/farms"
              className="text-xs uppercase tracking-widest text-odisha-red hover:text-odisha-black transition-colors border-b border-odisha-red hover:border-odisha-black"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {koraputFarms.slice(0, 9).map((farm) => (
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
                  <p className="text-xs text-odisha-black/50 mb-2">
                    {farm.region} · {farm.elevation}
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
                    View Profile
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

          {koraputFarms.length > 9 && (
            <div className="mt-6 text-center">
              <Link
                to="/farms"
                className="inline-block px-6 py-3 bg-odisha-red text-white text-sm font-semibold border-2 border-odisha-red hover:bg-odisha-black hover:border-odisha-black transition-colors"
              >
                View All {farms.length} Farms →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* SEO content, long-form */}
      <section className="bg-odisha-offwhite pattachitra-pattern border-b-2 border-odisha-black">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
            Understanding Odisha&apos;s Coffee Landscape
          </h2>
          <div className="space-y-5 text-sm text-odisha-black/70 leading-relaxed">
            <p>
              <strong className="text-odisha-black">Where is coffee grown in Odisha?</strong>{" "}
              Coffee cultivation in Odisha is concentrated in the highland districts of the
              southern Eastern Ghats, primarily Koraput and to a lesser extent Nabarangpur.
              Within Koraput district, key growing pockets include Jeypore, Pottangi, Semiliguda,
              Sunabeda, Boipariguda, Similiguda, Narayanpatna, Lamtaput, and Kotpad. Elevation
              across these zones ranges from 800 metres at the lower valleys to over 1450 metres
              in the Pottangi highlands, the latter being among the highest coffee-growing land
              in peninsular India.
            </p>
            <p>
              <strong className="text-odisha-black">What coffee varieties are grown in Odisha?</strong>{" "}
              The dominant Arabica varieties are S795 (a hybrid developed by the Coffee Board of
              India), SLN 9, Catuai, Chandragiri, and HSD (Hibrido de Timor). A small number of
              farms are experimenting with anaerobic naturals and barrel-aged processing, producing
              micro-lots that have attracted specialty buyers in Mumbai, Bangalore, and abroad.
            </p>
            <p>
              <strong className="text-odisha-black">How is Odisha coffee processed?</strong>{" "}
              The region supports all major processing methods. Washed processing is most common
              on estates with wet mill access; natural processing (whole-cherry sun drying) is
              widely practised across the region; honey processing,
              drying with mucilage intact, has been adopted by several forward-looking estates
              seeking differentiated cup profiles. A few farms also produce pulped-natural lots.
            </p>
            <p>
              <strong className="text-odisha-black">Is Odisha coffee available for export?</strong>{" "}
              Yes. {exportReadyFarms.length} of Gray Cup&apos;s {farms.length} partner farms are
              export-ready, holding APEDA registration and phytosanitary documentation. Green bean
              export is available in FCL and LCL quantities. Contact Gray Cup Enterprises for lot
              availability, cupping reports, and export documentation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-odisha-red border-t-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-white text-lg">
              Source Odisha coffee directly from the farm
            </h3>
            <p className="text-white/60 text-sm mt-1">
              Green beans, roasted lots, or export containers, we connect buyers to verified farms.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/contact"
              className="inline-block px-6 py-3 bg-white text-odisha-black text-sm font-semibold border-2 border-white hover:bg-odisha-yellow hover:border-odisha-yellow transition-colors whitespace-nowrap"
            >
              Contact Us
            </Link>
            <Link
              to="/farms"
              className="inline-block px-6 py-3 bg-transparent text-white text-sm font-semibold border-2 border-white/50 hover:border-white transition-colors whitespace-nowrap"
            >
              All Farms
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
