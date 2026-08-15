import { Link } from "react-router";
import { farms } from "@/data/farms";

export function meta() {
  return [
    { title: "Coffee Varieties in Odisha — Arabica Variety Guide" },
    { name: "description", content: "A complete guide to Arabica coffee varieties grown in Odisha. S795, SLN 9, Catuai, HSD and Chandragiri — flavor profiles, elevations, and which Koraput farms grow each variety." },
    { property: "og:title", content: "Coffee Varieties in Odisha — Arabica Variety Guide" },
    { property: "og:description", content: "Arabica S795, SLN 9, Catuai, HSD and Chandragiri from Koraput's Eastern Ghats. Cup profiles, growing conditions, and farm sources for every variety." },
    { property: "og:url", content: "https://odishacoffee.com/odisha-coffee-varieties" },
    { property: "og:locale", content: "en_IN" },
  ];
}

export function links() {
  return [{ rel: "canonical", href: "https://odishacoffee.com/odisha-coffee-varieties" }];
}

const varieties = [
  {
    id: "s795",
    name: "Arabica S795",
    type: "Arabica",
    origin: "Coffee Board of India hybrid — Mysore × Hybrido de Timor lineage",
    elevation: "800–1200m",
    cupProfile: ["Dark Chocolate", "Caramel", "Mild Citrus", "Clean Finish"],
    harvest: "November – February",
    characteristics:
      "S795 is the most widely planted Arabica variety in Odisha. Developed by the Coffee Board of India, it carries disease resistance from its Hybrido de Timor parent while expressing the clean, chocolate-forward cup character typical of the S-series. In Koraput, S795 produces dense, well-structured beans at mid-elevation with reliable yields.",
    processing: ["Washed", "Natural", "Honey"],
    farmExamples: ["Koraput A-1 Coffee", "Agrawal Plantation", "Koraput Organic", "Panigrahi Agro Foundation"],
    exportAvailable: true,
  },
  {
    id: "sln9",
    name: "Arabica SLN 9",
    type: "Arabica",
    origin: "Selection from the Sln (Selection) series at Balehonnur, Karnataka",
    elevation: "1000–1450m",
    cupProfile: ["Bergamot", "Jasmine", "Peach", "Bright Acidity"],
    harvest: "December – March",
    characteristics:
      "SLN 9 is the high-altitude specialty variety of Odisha's coffee belt, planted primarily in the Pottangi highlands where it reaches its full aromatic potential. Slow development at elevation above 1100m concentrates sugars and intensifies floral notes, producing some of the most complex cups from Indian-origin coffee available to specialty buyers.",
    processing: ["Washed", "Honey"],
    farmExamples: ["Oak Winds Farm", "Dream Hill Coffee — Saptagiri Plantation", "Koraput A-1 Coffee"],
    exportAvailable: true,
  },
  {
    id: "catuai",
    name: "Chandragiri",
    type: "Arabica",
    origin: "Brazilian Catuai selection — Mundo Novo × Caturra",
    elevation: "900–1200m",
    cupProfile: ["Golden Raisin", "Honey", "Floral", "Sweet Body"],
    harvest: "December – February",
    characteristics:
      "Catuai is a compact, high-yielding Arabica that performs particularly well under honey and natural processing in Odisha. The variety's high cherry sugar content makes it well-suited to mucilage retention drying, producing cups with pronounced sweetness and honeyed body. Annapurna Estate on the Sunabeda plateau produces some of the most refined Catuai lots in the region.",
    processing: ["Honey", "Washed", "Natural"],
    farmExamples: ["Annapurna Coffee Estate", "Dream Hill Coffee — Saptagiri Plantation"],
    exportAvailable: true,
  },
  {
    id: "hsd",
    name: "Arabica HSD (Hibrido de Timor)",
    type: "Arabica",
    origin: "Disease-resistant Arabica hybrid variety originating in Timor-Leste",
    elevation: "800–1100m",
    cupProfile: ["Citrus", "Green Apple", "Bright Acidity", "Clean"],
    harvest: "November – February",
    characteristics:
      "HSD (Hybrido de Timor / Hibrido de Timor) is a disease-resistant Arabica hybrid variety that Gray Cup processes as specialty-grade green beans. The variety is export-grade certified from Koraput, offering importers a traceable Indian HSD with clean acidity and bright character that distinguishes it from South Indian HSD lots. Ideal for roasters seeking transparency at the variety level.",
    processing: ["Washed"],
    farmExamples: ["Multiple Gray Cup Partner Farms"],
    exportAvailable: true,
  },
  {
    id: "chandragiri",
    name: "Arabica Chandragiri",
    type: "Arabica",
    origin: "Indian Arabica selection bred for disease resistance and consistent yield",
    elevation: "850–1100m",
    cupProfile: ["Red Apple", "Brown Sugar", "Mild Citrus", "Medium Body"],
    harvest: "November – February",
    characteristics:
      "Chandragiri is valued in Odisha for its robust disease resistance and consistent yield, making it a practical choice for estates expanding into coffee without specialist infrastructure. The cup quality, while less complex than S795 or SLN 9 at equivalent processing, can be elevated significantly through careful washed or pulped-natural processing — as Ekayani Plantation has demonstrated.",
    processing: ["Washed", "Pulped Natural"],
    farmExamples: ["Ekayani Plantation", "Brown Valley Coffee Estate", "Maa Sarala Plantation"],
    exportAvailable: false,
  },
];

export default function OdishaCoffeeVarietiesPage() {
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
              Coffee Varieties in Odisha
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Coffee Varieties in Odisha
          </h1>
          <p className="text-white/70 text-sm max-w-2xl leading-relaxed mb-8">
            Odisha&apos;s coffee belt in Koraput district grows a diverse range of Arabica
            varieties — from the widely planted S795 to the rare high-altitude SLN 9 of
            Pottangi. Each variety expresses the Eastern Ghats terroir differently, and processing
            method compounds the variation further. This guide covers every variety in the Gray Cup
            sourcing network.
          </p>

          <div className="flex flex-wrap gap-6">
            {[
              { value: "5", label: "Arabica Varieties" },
              { value: arabicaFarms.length.toString(), label: "Farms Grow Arabica" },
            ].map(({ value, label }) => (
              <div key={label} className="border-l-2 border-white/30 pl-4">
                <div className="font-serif text-2xl font-bold text-white">{value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick nav */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex flex-wrap gap-3">
          <span className="text-[10px] uppercase tracking-widest text-odisha-black/40 self-center mr-2">
            Jump to:
          </span>
          {varieties.map((v) => (
            <a
              key={v.id}
              href={`#${v.id}`}
              className="text-xs border border-odisha-black/20 text-odisha-black/60 px-3 py-1 hover:bg-odisha-red hover:text-white hover:border-odisha-red transition-colors"
            >
              {v.name}
            </a>
          ))}
        </div>
      </section>

      {/* Variety detail cards */}
      <section className="bg-odisha-offwhite pattachitra-pattern">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 space-y-0">
          {varieties.map((variety, idx) => (
            <div
              key={variety.id}
              id={variety.id}
              className={`border-2 border-odisha-black -mt-[2px] ${idx % 2 === 0 ? "bg-white" : "bg-odisha-offwhite"}`}
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Left — identity */}
                  <div className="md:w-64 shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 ${
                          variety.type === "Arabica"
                            ? "bg-[#1E3A8A] text-white"
                            : "bg-[#C2410C] text-white"
                        }`}
                      >
                        {variety.type}
                      </span>
                      {variety.exportAvailable && (
                        <span className="text-[9px] font-bold uppercase tracking-widest border border-odisha-green text-odisha-green px-1.5 py-0.5">
                          Export
                        </span>
                      )}
                    </div>
                    <h2 className="font-serif text-xl font-bold text-odisha-black mt-2 mb-3">
                      {variety.name}
                    </h2>
                    <div className="space-y-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-0.5">
                          Elevation
                        </div>
                        <div className="text-xs font-medium text-odisha-black">
                          {variety.elevation}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-0.5">
                          Harvest
                        </div>
                        <div className="text-xs font-medium text-odisha-black">
                          {variety.harvest}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-1">
                          Cup Profile
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {variety.cupProfile.map((note) => (
                            <span
                              key={note}
                              className="text-[10px] bg-odisha-black/5 border border-odisha-black/10 px-1.5 py-0.5 text-odisha-black/70"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-1">
                          Processing
                        </div>
                        <div className="text-xs text-odisha-black/60">
                          {variety.processing.join(" · ")}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right — detail */}
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-1">
                      Origin
                    </div>
                    <p className="text-xs text-odisha-black/50 mb-4">{variety.origin}</p>

                    <p className="text-sm text-odisha-black/70 leading-relaxed mb-5">
                      {variety.characteristics}
                    </p>

                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-2">
                        Grown At
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {variety.farmExamples.map((f) => (
                          <span
                            key={f}
                            className="text-xs border border-odisha-black/20 text-odisha-black/60 px-2.5 py-1"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-white border-t-2 border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
            Quick Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-odisha-black text-white">
                  <th className="text-left px-4 py-3 font-semibold uppercase tracking-widest">
                    Variety
                  </th>
                  <th className="text-left px-4 py-3 font-semibold uppercase tracking-widest">
                    Type
                  </th>
                  <th className="text-left px-4 py-3 font-semibold uppercase tracking-widest">
                    Elevation
                  </th>
                  <th className="text-left px-4 py-3 font-semibold uppercase tracking-widest">
                    Key Flavour
                  </th>
                  <th className="text-left px-4 py-3 font-semibold uppercase tracking-widest">
                    Best Processing
                  </th>
                  <th className="text-center px-4 py-3 font-semibold uppercase tracking-widest">
                    Export
                  </th>
                </tr>
              </thead>
              <tbody>
                {varieties.map((v, i) => (
                  <tr
                    key={v.id}
                    className={`border-b border-odisha-black/10 ${i % 2 === 0 ? "bg-white" : "bg-odisha-offwhite"}`}
                  >
                    <td className="px-4 py-3 font-medium text-odisha-black">
                      <a href={`#${v.id}`} className="hover:text-odisha-red transition-colors">
                        {v.name}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-odisha-black/60">{v.type}</td>
                    <td className="px-4 py-3 text-odisha-black/60">{v.elevation}</td>
                    <td className="px-4 py-3 text-odisha-black/60">
                      {v.cupProfile.slice(0, 2).join(", ")}
                    </td>
                    <td className="px-4 py-3 text-odisha-black/60">
                      {v.processing[0]}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {v.exportAvailable ? (
                        <span className="text-odisha-green font-bold">✓</span>
                      ) : (
                        <span className="text-odisha-black/30">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="bg-odisha-offwhite border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <h3 className="font-serif font-semibold text-odisha-black mb-4 text-lg">
            Shop by Variety
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/buy-green-beans", label: "Buy Green Beans" },
              { href: "/odisha-coffee-export", label: "Export Green Beans" },
              { href: "/farms", label: "Browse All Farms" },
              { href: "/coffee-farms-koraput", label: "Koraput Farm Guide" },
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
              Want samples of specific varieties?
            </h3>
            <p className="text-white/60 text-sm mt-1">
              We can supply cupping samples of individual variety lots from Koraput.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-block px-6 py-3 bg-white text-odisha-black text-sm font-semibold border-2 border-white hover:bg-odisha-yellow hover:border-odisha-yellow transition-colors whitespace-nowrap"
          >
            Request Samples
          </Link>
        </div>
      </section>
    </div>
  );
}
