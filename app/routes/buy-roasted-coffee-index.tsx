import { Link } from "react-router";
import { buyerCities } from "@/data/buyer-cities";
import { INDIA_STATES } from "@/data/locations/india-states";
import { products } from "@/data/products";
import { RoastedCatalog } from "@/components/products/roasted-catalog";
import { GrayCupShowcase } from "@/components/product-card";
import { generateTitle, generateDescription, SITE_URL } from "@/lib/seo";

export function meta() {
  return [
    { title: generateTitle("Buy Roasted Coffee: Odisha Single Origin, Roasted On Demand") },
    {
      name: "description",
      content: generateDescription(
        "Specialty roasted coffee from Koraput's Eastern Ghats, with washed, natural and honey processed Arabica, roasted fresh to order and delivered anywhere in India."
      ),
    },
  ];
}

export function links() {
  return [{ rel: "canonical", href: `${SITE_URL}/buy-roasted-coffee` }];
}

export default function BuyRoastedCoffeeIndexPage() {
  const roastedProducts = products.filter((p) => !p.isGreen && p.roastLevel !== "green");
  const specialtyLots = products.filter((p) => p.availability === "limited" || p.availability === "seasonal");

  return (
    <main>
      {/* Hero */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
          <div className="flex items-center gap-2 mb-5 text-xs flex-wrap">
            <Link to="/" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link to="/buy-coffee" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Buy Coffee</Link>
            <span className="text-white/30">/</span>
            <span className="text-white uppercase tracking-widest">Roasted Coffee</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            Buy Roasted Coffee: Koraput Single Origin, Roasted On Demand
          </h1>
          <p className="mt-4 text-white/70 max-w-2xl text-sm leading-relaxed">
            Small-batch roasted Koraput Arabica with single-origin, espresso blends, and limited seasonal
            micro-lots. Every order is roasted after purchase and delivered anywhere in India.
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            {[
              { value: roastedProducts.length.toString(), label: "Roasted Lots" },
              { value: specialtyLots.length.toString(), label: "Specialty / Seasonal" },
              { value: "48h", label: "Roast-to-Dispatch Rest" },
              { value: "Koraput", label: "Single Origin" },
            ].map(({ value, label }) => (
              <div key={label} className="border-l-2 border-white/30 pl-4">
                <div className="font-serif text-2xl font-bold text-white">{value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not-local disclaimer */}
      <section className="bg-odisha-offwhite border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 text-xs text-odisha-black/60 leading-relaxed">
          We aren't physically based in the cities or states below. These are ordering guides for local
          buyers. Every order is roasted on demand at our roastery, rested ~48h, then dispatched.
        </div>
      </section>

      {/* City directory */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
            Buy Roasted Coffee In Your City
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {buyerCities.map((c) => (
              <Link
                key={c.citySlug}
                to={`/buy-roasted-coffee/${c.citySlug}`}
                className="group block border-2 border-odisha-black bg-odisha-offwhite hover:bg-white transition-colors p-5"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-serif font-semibold text-odisha-black text-lg group-hover:text-odisha-red transition-colors">
                    {c.city}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest border border-odisha-green text-odisha-green px-1.5 py-0.5 shrink-0">
                    {c.transitDays}
                  </span>
                </div>
                <p className="text-xs text-odisha-black/60">{c.state}</p>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {INDIA_STATES.map((s) => (
              <Link
                key={s.slug}
                to={`/buy-roasted-coffee/${s.slug}`}
                className="text-xs font-medium px-3 py-2 border-2 border-odisha-black/20 text-odisha-black hover:border-odisha-red hover:text-odisha-red transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive catalog: select a roast and buy */}
      <RoastedCatalog roastedProducts={roastedProducts} specialtyLots={specialtyLots} />

      {/* Also roasted by Gray Cup, outbound dofollow links to graycup.in, not buyable here */}
      <section className="border-b-2 border-odisha-black bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-2">
            Also roasted by Gray Cup
          </h2>
          <p className="text-sm text-odisha-black/60 mb-6 max-w-2xl">
            Gray Cup roasts our Koraput lots, plus South Indian and Northeast estates and
            traditional filter blends, and ships them freshly roasted across India. Sold on
            graycup.in.
          </p>
          <GrayCupShowcase />
        </div>
      </section>

      {/* Green beans nudge */}
      <section className="bg-odisha-offwhite border-t-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-odisha-black text-lg">Looking for green beans?</h3>
            <p className="text-sm text-odisha-black/60 mt-1">
              AAA to B grade washed and natural lots available from all partner estates.
            </p>
          </div>
          <Link
            to="/buy-green-coffee"
            className="inline-block px-6 py-3 bg-odisha-green text-white text-sm font-semibold border-2 border-odisha-green hover:bg-odisha-black hover:border-odisha-black transition-colors whitespace-nowrap"
          >
            Green Coffee →
          </Link>
        </div>
      </section>
    </main>
  );
}
