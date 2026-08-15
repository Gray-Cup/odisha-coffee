import { Link } from "react-router";
import { farms, processingColors, processingLabels } from "@/data/farms";
import { products } from "@/data/products";
import type { ProcessingMethod } from "@/data/farms";

export function meta() {
  return [
    { title: "Odisha Coffee Export — Green Beans, FOB India, Gray Cup" },
    { name: "description", content: "Export Odisha coffee through Gray Cup Enterprises. APEDA-registered, phytosanitary certified green bean lots from Koraput's Eastern Ghats — Arabica S795, SLN 9, and HSD. FCL and LCL quantities." },
    { property: "og:title", content: "Odisha Coffee Export — Green Beans, FOB India" },
    { property: "og:description", content: "APEDA-registered export green beans from 24 verified Koraput estates. Arabica S795, SLN 9, and HSD — traceable, certified, available in FCL and LCL. Gray Cup Enterprises." },
    { property: "og:url", content: "https://odishacoffee.com/odisha-coffee-export" },
    { property: "og:locale", content: "en_IN" },
  ];
}

export function links() {
  return [{ rel: "canonical", href: "https://odishacoffee.com/odisha-coffee-export" }];
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

const exportFarms = farms.filter((f) => f.exportReady);
const exportProducts = products.filter((p) => p.exportAvailable);

const certifications = [
  {
    name: "APEDA Registration",
    desc: "Agricultural and Processed Food Products Export Development Authority — mandatory for Indian coffee export.",
  },
  {
    name: "Phytosanitary Certificate",
    desc: "Issued per-shipment by NPPO India, required by all importing countries for green coffee beans.",
  },
  {
    name: "FSSAI",
    desc: "Food Safety and Standards Authority of India — all Gray Cup partner farms hold FSSAI registration.",
  },
  {
    name: "ICO Registration",
    desc: "International Coffee Organization country-of-origin stamp available on export shipments.",
  },
  {
    name: "Organic Certifications",
    desc: "Select farms hold India Organic (NPOP) and EU Organic certification for premium organic lots.",
  },
  {
    name: "ISO 22000",
    desc: "Food safety management certification held by Brown Valley Coffee Estate, Koraput A-1 Coffee, and Panigrahi Agro Foundation.",
  },
];

const exportProcess = [
  {
    step: "01",
    title: "Enquiry & Requirements",
    body: "Share your volume, variety preferences, processing method, and quality benchmark. We'll respond with current lot availability and farm profiles that match.",
  },
  {
    step: "02",
    title: "Sample Dispatch",
    body: "We dispatch cupping samples (200g per lot) with full traceability documentation — farm name, elevation, harvest date, processing method, moisture content, and screen size.",
  },
  {
    step: "03",
    title: "Cupping & Approval",
    body: "Evaluate the samples at your roastery or lab. We can coordinate cupping calls with the Gray Cup sourcing team to discuss lot characteristics and processing notes.",
  },
  {
    step: "04",
    title: "Contract & Documentation",
    body: "On approval, we issue a pro-forma invoice with FOB pricing. We handle APEDA export documentation, phytosanitary inspection, and ICO stamping end-to-end.",
  },
  {
    step: "05",
    title: "Shipment",
    body: "Green beans are packed in 60kg GrainPro-lined jute bags or as agreed. FCL (20-foot container: ~18 MT) and LCL shipments available from Visakhapatnam or Chennai port.",
  },
  {
    step: "06",
    title: "After Arrival",
    body: "We remain available for feedback, documentation queries, and next-season reservations. Several buyers return annually for the same farm lots.",
  },
];

export default function OdishaCoffeeExportPage() {
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
              Odisha Coffee Export
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Odisha Coffee for Export
          </h1>
          <p className="text-white/70 text-sm max-w-2xl leading-relaxed mb-8">
            Gray Cup Enterprises exports verified green coffee from {exportFarms.length} APEDA-registered
            farms across Koraput district, Odisha. Arabica S795, SLN 9, HSD, and Catuai —
            all fully traceable to the farm level, with phytosanitary certification and ICO
            registration. Available in LCL and FCL quantities, FOB Visakhapatnam or Chennai.
          </p>

          <div className="flex flex-wrap gap-6">
            {[
              { value: exportFarms.length.toString(), label: "Export-Ready Farms" },
              { value: "5+", label: "Arabica Varieties" },
              { value: "FOB", label: "Incoterm Available" },
              { value: "Vizag / Chennai", label: "Export Ports" },
              { value: "APEDA", label: "Registered" },
            ].map(({ value, label }) => (
              <div key={label} className="border-l-2 border-white/30 pl-4">
                <div className="font-serif text-2xl font-bold text-white">{value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export products */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-2">
            Export Green Bean Offerings
          </h2>
          <p className="text-sm text-odisha-black/60 mb-8 max-w-2xl">
            Current export lots with minimum order quantities. All lots are available as raw green
            beans — screened, moisture-tested, and lot-documented.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {exportProducts.map((product) => (
              <div
                key={product.id}
                className="border-2 border-odisha-black -ml-[2px] -mt-[2px] p-6 bg-odisha-offwhite"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-serif font-semibold text-odisha-black text-base mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-odisha-black/50">{product.farmName}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <ProcessingTag method={product.processing} />
                    {product.isGreen && (
                      <span className="text-[9px] font-bold uppercase tracking-widest border border-odisha-black/30 text-odisha-black/50 px-1.5 py-0.5">
                        Green Bean
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-odisha-black/70 leading-relaxed mb-4">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-0.5">
                      Variety
                    </div>
                    <div className="text-xs font-medium text-odisha-black">{product.variety}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-0.5">
                      Min Order
                    </div>
                    <div className="text-xs font-medium text-odisha-black">
                      {product.minOrderExport}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-0.5">
                      Region
                    </div>
                    <div className="text-xs font-medium text-odisha-black">{product.region}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-0.5">
                      Availability
                    </div>
                    <div className="text-xs font-medium text-odisha-black capitalize">
                      {product.availability.replace("-", " ")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-odisha-black/40 mt-6">
            Prices available on request. FOB pricing quoted in USD or INR. Contact us for
            current-season availability and cupping reports.
          </p>
        </div>
      </section>

      {/* Export-ready farms */}
      <section className="bg-odisha-offwhite pattachitra-pattern border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-2">
            Export-Ready Partner Farms
          </h2>
          <p className="text-sm text-odisha-black/60 mb-8">
            {exportFarms.length} farms in the Gray Cup network hold APEDA registration and are
            cleared for direct export. Each farm is documented to lot level.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {exportFarms.map((farm) => (
              <Link
                key={farm.id}
                to={`/farms/${farm.id}`}
                className="group block border-2 border-odisha-black -ml-[2px] -mt-[2px] bg-white hover:bg-odisha-offwhite transition-colors"
              >
                <div className="h-1 bg-odisha-green w-full" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif font-semibold text-odisha-black text-sm leading-snug group-hover:text-odisha-red transition-colors">
                      {farm.name}
                    </h3>
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-widest border border-odisha-green text-odisha-green px-1.5 py-0.5">
                      Export
                    </span>
                  </div>
                  <p className="text-xs text-odisha-black/50 mb-2">
                    {farm.region}, {farm.district} · {farm.elevation}
                  </p>
                  <p className="text-xs text-odisha-black/50 mb-2">
                    {farm.varieties.join(", ")}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {farm.processing.map((m) => (
                      <ProcessingTag key={m} method={m} />
                    ))}
                  </div>
                  {farm.certifications.length > 0 && (
                    <p className="text-[10px] text-odisha-black/40 mt-1">
                      {farm.certifications.join(" · ")}
                    </p>
                  )}
                </div>
                <div className="border-t-2 border-odisha-black px-5 py-2 flex items-center justify-between bg-odisha-black/5 group-hover:bg-odisha-green group-hover:border-odisha-green transition-colors">
                  <span className="text-[10px] uppercase tracking-widest text-odisha-black/50 group-hover:text-white transition-colors">
                    Farm Profile
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

      {/* Certifications */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-2">
            Certifications & Documentation
          </h2>
          <p className="text-sm text-odisha-black/60 mb-8 max-w-2xl">
            Gray Cup manages export compliance for partner farms, handling documentation from farm
            registration through to port clearance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="border-2 border-odisha-black -ml-[2px] -mt-[2px] p-5 bg-odisha-offwhite"
              >
                <h3 className="font-serif font-semibold text-odisha-black text-sm mb-2">
                  {cert.name}
                </h3>
                <p className="text-xs text-odisha-black/60 leading-relaxed">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export process */}
      <section className="bg-odisha-offwhite pattachitra-pattern border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-2">
            How the Export Process Works
          </h2>
          <p className="text-sm text-odisha-black/60 mb-10 max-w-2xl">
            From first enquiry to arrival at your roastery — here&apos;s what the Gray Cup
            export process looks like.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {exportProcess.map((step) => (
              <div
                key={step.step}
                className="border-2 border-odisha-black -ml-[2px] -mt-[2px] p-5 bg-white"
              >
                <div className="font-serif text-3xl font-bold text-odisha-red/20 mb-2">
                  {step.step}
                </div>
                <h3 className="font-serif font-semibold text-odisha-black text-sm mb-3">
                  {step.title}
                </h3>
                <p className="text-xs text-odisha-black/60 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-8">
            Export FAQ
          </h2>
          <div className="space-y-0">
            {[
              {
                q: "What is the minimum export order quantity?",
                a: "Minimums vary by lot. Our export-grade pooled lots (Arabica S795 washed and natural) start at 500–1000kg. Single-estate specialty lots can be as low as 50–200kg. Contact us with your requirement and we will confirm availability.",
              },
              {
                q: "Which ports does Gray Cup ship from?",
                a: "Primary export port is Visakhapatnam (INVTZ), which is approximately 300km from Koraput by road. Chennai (INMAA) is the alternative for buyers preferring that routing. We handle inland transport from the estate to port.",
              },
              {
                q: "What incoterms do you offer?",
                a: "We quote FOB (Visakhapatnam or Chennai) as standard. CIF and CFR can be arranged for established buyers with prior agreement.",
              },
              {
                q: "Can we visit the farms before purchasing?",
                a: "Yes. Gray Cup coordinates farm visit itineraries for serious buyers during the harvest season (November–February) and post-harvest (March–April). Visits typically include farm walkthrough, processing observation, and cupping session. Contact us at least 4 weeks in advance to arrange.",
              },
              {
                q: "Are organic-certified lots available for export?",
                a: "Yes. Koraput Organic and Ekayani Plantation hold India Organic (NPOP) certification; Koraput Organic additionally holds EU Organic certification. These are available in limited quantities — contact us for current-season volumes.",
              },
              {
                q: "What currencies do you invoice in?",
                a: "We invoice in INR (Indian Rupees) by default. USD invoicing is available for established international buyers. Payment terms are 30% advance, balance against Bill of Lading for new buyers.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border-2 border-odisha-black -mt-[2px] p-5"
              >
                <h3 className="font-serif font-semibold text-odisha-black text-sm mb-2">
                  {item.q}
                </h3>
                <p className="text-sm text-odisha-black/60 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-odisha-offwhite border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <h3 className="font-serif font-semibold text-odisha-black mb-4 text-lg">
            Related Pages
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/coffee-farms-odisha", label: "Coffee Farms of Odisha" },
              { href: "/coffee-farms-koraput", label: "Koraput Farm Guide" },
              { href: "/odisha-coffee-varieties", label: "Coffee Varieties" },
              { href: "/farms", label: "Full Farm Directory" },
              { href: "/roasted-coffee", label: "Roasted Coffee" },
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
              Ready to source Odisha coffee for export?
            </h3>
            <p className="text-white/60 text-sm mt-1">
              Share your requirements — variety, volume, processing, target market. We&apos;ll
              respond with available lots and pricing within 24 hours.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-block px-6 py-3 bg-white text-odisha-black text-sm font-semibold border-2 border-white hover:bg-odisha-yellow hover:border-odisha-yellow transition-colors whitespace-nowrap"
          >
            Export Enquiry
          </Link>
        </div>
      </section>
    </div>
  );
}
