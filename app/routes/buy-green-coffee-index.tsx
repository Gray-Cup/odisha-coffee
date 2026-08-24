import { Link } from "react-router";
import { buyerCities } from "@/data/buyer-cities";
import { INDIA_STATES } from "@/data/locations/india-states";
import { farms } from "@/data/farms";
import { estateProducts } from "@/data/estate-products";
import { ProductsCatalog } from "@/components/products/products-catalog";
import { generateTitle, generateDescription, SITE_URL } from "@/lib/seo";

export function meta() {
  return [
    { title: generateTitle("Buy Wholesale Koraput Arabica Green Coffee Beans in India") },
    {
      name: "description",
      content: generateDescription(
        "Buy Koraput, Odisha green Arabica coffee beans wholesale. Traceable, tribal-farmed, Eastern Ghats single-origin lots for roasters, cafés, and exporters, delivered anywhere in India."
      ),
    },
  ];
}

export function links() {
  return [{ rel: "canonical", href: `${SITE_URL}/buy-green-coffee` }];
}

export default function BuyGreenCoffeeIndexPage() {
  const exportReadyFarms = farms.filter((f) => f.exportReady);

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
            <span className="text-white uppercase tracking-widest">Green Coffee</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            Buy Green Coffee: Koraput Arabica, Delivered Anywhere in India
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl text-base">
            Traceable, tribal-farmed, Eastern Ghats single-origin. Select a grade below and order
            direct, for roasters, cafés, hotels, and exporters.
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            {[
              { value: estateProducts.length.toString(), label: "Grade Lots" },
              { value: farms.length.toString(), label: "Partner Farms" },
              { value: exportReadyFarms.length.toString(), label: "Export Ready" },
              { value: "AAA–B", label: "Grades Available" },
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
          buyers. Green coffee ships from our Delhi facility to anywhere in India.
        </div>
      </section>

      {/* City directory */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
            Buy Green Coffee In Your City
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {buyerCities.map((c) => (
              <Link
                key={c.citySlug}
                to={`/buy-green-coffee/${c.citySlug}`}
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
                to={`/buy-green-coffee/${s.slug}`}
                className="text-xs font-medium px-3 py-2 border-2 border-odisha-black/20 text-odisha-black hover:border-odisha-red hover:text-odisha-red transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive catalog: select a grade and buy */}
      <ProductsCatalog />

      {/* Roasted nudge */}
      <section className="bg-odisha-offwhite border-t-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-odisha-black text-lg">Want it roasted instead?</h3>
            <p className="text-sm text-odisha-black/60 mt-1">
              Small-batch roasted lots, roasted fresh to order.
            </p>
          </div>
          <Link
            to="/buy-roasted-coffee"
            className="inline-block px-6 py-3 bg-odisha-red text-white text-sm font-semibold border-2 border-odisha-red hover:bg-odisha-black hover:border-odisha-black transition-colors whitespace-nowrap"
          >
            Roasted Coffee →
          </Link>
        </div>
      </section>
    </main>
  );
}
