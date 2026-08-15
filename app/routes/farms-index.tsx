import { Link } from "react-router";
import { farms, processingColors, processingLabels } from "@/data/farms";
import type { ProcessingMethod } from "@/data/farms";

export function meta() {
  return [
    { title: "Odisha Coffee Farms — All 24 Partner Estates, Koraput" },
    {
      name: "description",
      content:
        "Browse all 24 Odisha coffee farms sourced by Gray Cup Enterprises. Single-origin Arabica lots from Koraput's Eastern Ghats — traceable, export-ready, and documented by farm.",
    },
  ];
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

export default function FarmsPage() {
  const exportReadyFarms = farms.filter((f) => f.exportReady);
  const washCount = farms.filter((f) => f.processing.includes("washed")).length;
  const natCount = farms.filter((f) => f.processing.includes("natural")).length;
  const honeyCount = farms.filter((f) => f.processing.includes("honey")).length;

  return (
    <div>
      {/* Header */}
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
            <span className="text-xs text-white/80 uppercase tracking-widest">Farms</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Partner Farms
          </h1>
          <p className="text-white/70 text-sm max-w-2xl leading-relaxed mb-8">
            Gray Cup Enterprises sources from {farms.length} verified coffee estates across Koraput and neighbouring districts of Odisha's Eastern Ghats. Each farm profile documents cultivation practices, processing methods, flavor character, and traceability data.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6">
            {[
              { value: farms.length.toString(), label: "Total Farms" },
              { value: exportReadyFarms.length.toString(), label: "Export Ready" },
              { value: washCount.toString(), label: "Washed" },
              { value: natCount.toString(), label: "Natural" },
              { value: honeyCount.toString(), label: "Honey" },
            ].map(({ value, label }) => (
              <div key={label} className="border-l-2 border-white/30 pl-4">
                <div className="font-serif text-2xl font-bold text-white">{value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-odisha-offwhite pattachitra-pattern">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {farms.map((farm) => (
              <Link
                key={farm.id}
                to={`/farms/${farm.id}`}
                className="group block border-2 border-odisha-black -ml-[2px] -mt-[2px] bg-white hover:bg-odisha-offwhite transition-colors"
              >
                {/* Top: color accent bar based on region */}
                <div className="h-1 bg-odisha-red w-full" />

                <div className="p-5">
                  {/* Name + Export badge */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h2 className="font-serif font-semibold text-odisha-black text-base leading-snug group-hover:text-odisha-red transition-colors">
                      {farm.name}
                    </h2>
                    {farm.exportReady && (
                      <span className="shrink-0 text-[9px] font-bold uppercase tracking-widest border-2 border-odisha-green text-odisha-green px-1.5 py-0.5">
                        Export
                      </span>
                    )}
                  </div>

                  {/* Location & elevation */}
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center gap-2 text-xs text-odisha-black/60">
                      <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{farm.region}, {farm.district} District</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-odisha-black/60">
                      <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      <span>{farm.elevation} elevation</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-odisha-black/60">
                      <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      <span>{farm.area} · Est. {farm.established}</span>
                    </div>
                  </div>

                  {/* Varieties */}
                  <p className="text-xs text-odisha-black/50 mb-3">
                    <span className="font-medium text-odisha-black/70">Varieties:</span>{" "}
                    {farm.varieties.join(", ")}
                  </p>

                  {/* Processing tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {farm.processing.map((m) => (
                      <ProcessingTag key={m} method={m} />
                    ))}
                  </div>

                  {/* Flavor notes */}
                  <p className="text-xs text-odisha-black/40 leading-relaxed">
                    {farm.flavorNotes.join(" · ")}
                  </p>
                </div>

                {/* Footer */}
                <div className="border-t-2 border-odisha-black px-5 py-2.5 flex items-center justify-between bg-odisha-black/5 group-hover:bg-odisha-red group-hover:border-odisha-red transition-colors">
                  <span className="text-[10px] uppercase tracking-widest text-odisha-black/50 group-hover:text-white transition-colors">
                    View Full Profile
                  </span>
                  <svg className="w-3.5 h-3.5 text-odisha-black/40 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-odisha-red border-t-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-white text-lg">Looking to source from a specific farm?</h3>
            <p className="text-white/60 text-sm mt-1">Contact Gray Cup with your requirements — we'll connect you directly.</p>
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
