import { Link } from "react-router";
import { buyerCities } from "@/data/buyer-cities";
import { INDIA_STATES } from "@/data/locations/india-states";
import { countryDestinations } from "@/data/locations/countries";
import { generateTitle, generateDescription } from "@/lib/seo";

export function meta() {
  return [
    { title: generateTitle("Buy Odisha Coffee in India — Cities We Serve") },
    {
      name: "description",
      content: generateDescription(
        "Source Odisha green coffee wholesale across India. Roasters, importers, and hospitality buyers in Delhi, Mumbai, Bengaluru, Hyderabad, Chennai and 10+ more cities."
      ),
    },
  ];
}

export function links() {
  return [{ rel: "canonical", href: "https://odishacoffee.com/buy-in" }];
}

export default function BuyInPage() {
  return (
    <main>
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
            <span className="text-xs text-white uppercase tracking-widest">Buy In Your City</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            Buy Odisha Coffee In Your City
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl text-base">
            Koraput Arabica from the Eastern Ghats — traceable, tribal-farmed, and export-ready.
            We deliver to roasters, importers, and hospitality buyers across India.
          </p>
        </div>
      </section>

      {/* City Grid */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {buyerCities.map((c) => (
            <Link
              key={c.citySlug}
              to={`/buy-in/${c.citySlug}`}
              className="group block border-2 border-odisha-black bg-white hover:bg-odisha-offwhite transition-colors p-5"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h2 className="font-serif font-semibold text-odisha-black text-lg group-hover:text-odisha-red transition-colors">
                  {c.city}
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-widest border border-odisha-green text-odisha-green px-1.5 py-0.5 shrink-0">
                  {c.transitDays}
                </span>
              </div>
              <p className="text-xs text-odisha-black/60 mb-3">{c.state}</p>
              <p className="text-sm text-odisha-black/80 leading-relaxed line-clamp-2">
                {c.cityContext}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {c.buyerTypes.slice(0, 2).map((bt) => (
                  <span
                    key={bt}
                    className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 bg-odisha-black/5 text-odisha-black/60"
                  >
                    {bt}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Indian states */}
      <section className="border-t-2 border-odisha-black bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-2">
            Browse Green Coffee By State
          </h2>
          <p className="text-odisha-black/60 text-sm mb-6">
            Select a grade, choose your farm, and order online — anywhere in India.
          </p>
          <div className="flex flex-wrap gap-2">
            {INDIA_STATES.map((s) => (
              <Link
                key={s.slug}
                to={`/india/${s.slug}/green-coffee`}
                className="text-xs font-medium px-3 py-2 border-2 border-odisha-black/20 text-odisha-black hover:border-odisha-red hover:text-odisha-red transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Countries we export to */}
      <section className="border-t-2 border-odisha-black bg-odisha-offwhite">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-2">
            Countries We Export To
          </h2>
          <p className="text-odisha-black/60 text-sm mb-6">
            Export-ready Koraput green coffee, shipped worldwide with full APEDA and phytosanitary documentation.
          </p>
          <div className="flex flex-wrap gap-2">
            {countryDestinations.map((c) => (
              <Link
                key={c.slug}
                to={`/${c.slug}/green-coffee`}
                className="text-xs font-medium px-3 py-2 border-2 border-odisha-black/20 bg-white text-odisha-black hover:border-odisha-red hover:text-odisha-red transition-colors"
              >
                {c.flag} {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-odisha-black bg-white">
        <div className="max-w-3xl mx-auto px-4 py-14 text-center">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-3">
            Your City Not Listed?
          </h2>
          <p className="text-odisha-black/70 mb-6">
            We ship Koraput green coffee across India and worldwide. If your city or country is not
            listed, contact us and we&apos;ll arrange delivery and provide current lot availability.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-odisha-red text-white font-semibold px-6 py-3 hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
