import { Link } from "react-router";
import { farms } from "@/data/farms";

export function meta() {
  return [
    { title: "Coffee Farms Near Bhubaneswar - Odisha Coffee Belt, Koraput" },
    { name: "description", content: "Looking for coffee farms near Bhubaneswar? Odisha's coffee belt is in Koraput district, 400km from Bhubaneswar. Gray Cup sources from 24 verified estates there. Explore farm profiles, visiting information, and direct sourcing." },
    { property: "og:title", content: "Coffee Farms Near Bhubaneswar, Odisha Coffee Belt, Koraput" },
    { property: "og:description", content: "Odisha's coffee farms are in Koraput, ~400km from Bhubaneswar. 24 verified estates growing Arabica at 800–1450m elevation. Sourced by Gray Cup Enterprises." },
    { property: "og:url", content: "https://odishacoffee.com/coffee-farms-near-bhubaneswar" },
    { property: "og:locale", content: "en_IN" },
  ];
}

export function links() {
  return [{ rel: "canonical", href: "https://odishacoffee.com/coffee-farms-near-bhubaneswar" }];
}

const travelOptions = [
  {
    mode: "By Road",
    duration: "~8–9 hours",
    detail:
      "Bhubaneswar to Koraput via NH16 and NH26. The route passes through Berhampur, then climbs through the Eastern Ghats into Koraput district. Well-surfaced national highway for most of the journey.",
  },
  {
    mode: "By Train",
    duration: "~10–12 hours",
    detail:
      "Bhubaneswar Junction to Koraput via trains on the Koraput – Visakhapatnam line (KIOM/Hirakhand Express). The scenic Araku Valley section of this journey is among the most picturesque rail routes in India.",
  },
  {
    mode: "By Flight + Road",
    duration: "~5–6 hours",
    detail:
      "Fly Bhubaneswar to Visakhapatnam (1 hour), then drive NH516E to Koraput (~3.5–4 hours via Araku). The most comfortable option for business visits.",
  },
];

const featuredVisitFarms = farms.filter((f) => f.featured && f.exportReady).slice(0, 4);

export default function CoffeeFarmsNearBhubaneswarPage() {
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
              Coffee Farms Near Bhubaneswar
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Coffee Farms Near Bhubaneswar
          </h1>
          <p className="text-white/70 text-sm max-w-2xl leading-relaxed mb-8">
            Odisha&apos;s coffee country lies in Koraput district, approximately 400 kilometres
            south of Bhubaneswar in the Eastern Ghats highlands. This is where Gray Cup
            Enterprises sources from {farms.length} verified coffee estates growing Arabica
            at elevations between 800 and 1450 metres. Whether you&apos;re looking to
            visit a farm, buy Odisha coffee, or source for your business, this page has you
            covered.
          </p>

          <div className="flex flex-wrap gap-6">
            {[
              { value: "~400 km", label: "From Bhubaneswar" },
              { value: "8–9 hrs", label: "By Road" },
              { value: farms.length.toString(), label: "Coffee Farms" },
              { value: "Koraput", label: "Coffee District" },
            ].map(({ value, label }) => (
              <div key={label} className="border-l-2 border-white/30 pl-4">
                <div className="font-serif text-2xl font-bold text-white">{value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geography context */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="font-serif text-2xl font-bold text-odisha-black mb-4">
                Where Are Odisha&apos;s Coffee Farms?
              </h2>
              <div className="space-y-4 text-sm text-odisha-black/70 leading-relaxed">
                <p>
                  Unlike states such as Karnataka or Kerala where coffee is grown across much of
                  the state, Odisha&apos;s coffee cultivation is concentrated in a single highland
                  district (<strong className="text-odisha-black">Koraput</strong>) in the far
                  south of the state. This is where the Eastern Ghats reach their highest
                  elevations in Odisha, creating a cool, highland climate ideal for Arabica
                  cultivation.
                </p>
                <p>
                  Koraput district lies roughly 390–420 kilometres from Bhubaneswar by road,
                  depending on the route. The terrain changes dramatically from the Odisha coastal
                  plain, as you approach Koraput, the landscape climbs through forests and river
                  valleys into the hills where coffee estates are scattered across slopes and
                  plateaus.
                </p>
                <p>
                  Key growing pockets within Koraput include Jeypore (the commercial hub),
                  Pottangi (the highest zone, up to 1450m), Semiliguda, Sunabeda plateau, and
                  Boipariguda. The district headquarters (Koraput town) sits at about 850
                  metres elevation and serves as the base for most farm visits.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-odisha-black mb-4">
                Getting There from Bhubaneswar
              </h2>
              <div className="space-y-3">
                {travelOptions.map((opt) => (
                  <div
                    key={opt.mode}
                    className="border-2 border-odisha-black p-4 bg-odisha-offwhite"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif font-semibold text-odisha-black text-sm">
                        {opt.mode}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest border border-odisha-black/30 text-odisha-black/50 px-2 py-0.5">
                        {opt.duration}
                      </span>
                    </div>
                    <p className="text-xs text-odisha-black/60 leading-relaxed">{opt.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you'll find */}
      <section className="bg-odisha-offwhite pattachitra-pattern border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-2">
            What to Expect at a Koraput Coffee Farm
          </h2>
          <p className="text-sm text-odisha-black/60 mb-8 max-w-2xl">
            A visit to Odisha&apos;s coffee belt is unlike most tourist coffee experiences, these
            are working farms, not curated estates, and the experience is direct and authentic.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {[
              {
                title: "Shade-Grown Coffee",
                body: "Almost all farms in Koraput maintain natural forest canopy or planted shade trees (silver oak, jackfruit, pepper). Walking through the estates during harvest (Nov–Feb) you'll see coffee cherries ripening under the shade, with tribal picking teams working the slopes.",
              },
              {
                title: "Processing Infrastructure",
                body: "Larger estates have on-site wet mills for washed processing, and raised bed drying infrastructure. Smaller farms often share centralized processing with neighbors. The post-harvest season (Jan–Mar) is the best time to observe active processing.",
              },
              {
                title: "Cupping & Tasting",
                body: "Panigrahi Agro Foundation in Semiliguda runs one of the few operational cupping labs in Odisha. Pre-arranged visits include sensory sessions where you can taste lots directly from the estate in different processing styles.",
              },
              {
                title: "Tribal Culture & Landscape",
                body: "Koraput is one of Odisha's most tribally diverse districts. The coffee belt intersects with Kondh, Koya, and Gadaba communities. Farm visits often include insights into the local food systems and how coffee cultivation coexists with traditional agriculture.",
              },
              {
                title: "High-Altitude Scenery",
                body: "Koraput's coffee zones are strikingly beautiful, forested hills, misty mornings at elevation, the Saberi and Kolab rivers cutting through valleys. Pottangi (Odisha's highest growing zone) offers views across the Eastern Ghats into Andhra Pradesh.",
              },
              {
                title: "Direct Purchase",
                body: "Many Gray Cup partner farms will sell directly if you visit in person. For green bean buyers (importers, roasters) farm visits can include lot inspection and sample approval on-site before finalising export contracts.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="border-2 border-odisha-black -ml-[2px] -mt-[2px] p-5 bg-white"
              >
                <h3 className="font-serif font-semibold text-odisha-black text-base mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-odisha-black/60 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured farms */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-2">
            Featured Koraput Farms
          </h2>
          <p className="text-sm text-odisha-black/60 mb-8">
            Well-established estates, a good starting point for farm visits or sourcing enquiries.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {featuredVisitFarms.map((farm) => (
              <Link
                key={farm.id}
                to={`/farms/${farm.id}`}
                className="group block border-2 border-odisha-black -ml-[2px] -mt-[2px] p-6 bg-white hover:bg-odisha-offwhite transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-serif font-semibold text-odisha-black text-lg group-hover:text-odisha-red transition-colors">
                    {farm.name}
                  </h3>
                  <span className="shrink-0 text-[9px] font-bold uppercase tracking-widest border border-odisha-green text-odisha-green px-1.5 py-0.5">
                    Export
                  </span>
                </div>
                <p className="text-xs text-odisha-black/50 mb-3">
                  {farm.region} · {farm.district} District · {farm.elevation}
                </p>
                <p className="text-sm text-odisha-black/60 leading-relaxed mb-4">
                  {farm.description.slice(0, 180)}…
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-odisha-black/50">
                    {farm.varieties.join(" · ")}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <Link
              to="/farms"
              className="inline-block px-6 py-3 bg-odisha-red text-white text-sm font-semibold border-2 border-odisha-red hover:bg-odisha-black hover:border-odisha-black transition-colors"
            >
              See All {farms.length} Farms →
            </Link>
          </div>
        </div>
      </section>

      {/* Can't travel? */}
      <section className="bg-odisha-offwhite pattachitra-pattern border-b-2 border-odisha-black">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-4">
            Can&apos;t Make the Trip? We&apos;ll Bring Koraput to You.
          </h2>
          <p className="text-sm text-odisha-black/70 leading-relaxed mb-6">
            You don&apos;t need to visit the farms to experience Odisha coffee. Gray Cup ships
            roasted coffee directly from Koraput-sourced lots to anywhere in India. For business
            buyers (roasters, cafes, importers) we can arrange sample sets, cupping lot
            documentation, and farm visit coordination remotely.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-odisha-red text-white text-sm font-semibold border-2 border-odisha-red hover:bg-odisha-black hover:border-odisha-black transition-colors"
            >
              Shop Roasted Coffee
            </Link>
            <Link
              to="/contact"
              className="inline-block px-6 py-3 bg-white text-odisha-black text-sm font-semibold border-2 border-odisha-black hover:bg-odisha-red hover:text-white hover:border-odisha-red transition-colors"
            >
              Enquire About Farm Visits
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-odisha-red border-t-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-white text-lg">
              Explore Odisha&apos;s coffee belt in detail
            </h3>
            <p className="text-white/60 text-sm mt-1">
              Farm profiles, varieties guide, export information, it&apos;s all here.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/coffee-farms-koraput"
              className="inline-block px-4 py-2 bg-white text-odisha-black text-sm font-semibold border-2 border-white hover:bg-odisha-yellow hover:border-odisha-yellow transition-colors whitespace-nowrap"
            >
              Koraput Farms
            </Link>
            <Link
              to="/odisha-coffee-varieties"
              className="inline-block px-4 py-2 bg-transparent text-white text-sm font-semibold border-2 border-white/50 hover:border-white transition-colors whitespace-nowrap"
            >
              Coffee Varieties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
