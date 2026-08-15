import { Link, useParams } from "react-router";
import { INDIA_STATES, getStateBySlug } from "@/data/locations/india-states";
import { getCitiesByState } from "@/data/locations/india-cities";
import { farms } from "@/data/farms";
import { estateProducts } from "@/data/estate-products";
import { ProductsCatalog } from "@/components/products/products-catalog";

export function meta({ params }: { params: { state?: string } }) {
  const data = params.state ? getStateBySlug(params.state) : undefined;
  if (!data) return [{ title: "Not Found" }];
  return [
    { title: `Green Coffee Beans in ${data.name}, India — Wholesale Koraput Single-Origin` },
    {
      name: "description",
      content: `Buy Koraput, Odisha green Arabica coffee beans in ${data.name}. Traceable, tribal-farmed, Eastern Ghats single-origin lots for roasters, cafés, and exporters.`,
    },
  ];
}

function NotFoundBlock() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-24 text-center">
      <h1 className="font-serif text-2xl font-bold text-odisha-black mb-2">State Not Found</h1>
      <Link to="/buy-in" className="text-odisha-red underline">
        View all available locations
      </Link>
    </div>
  );
}

export default function StateGreenCoffeePage() {
  const { state } = useParams<{ state: string }>();
  const data = state ? getStateBySlug(state) : undefined;

  if (!data || !state) return <NotFoundBlock />;

  const cities = getCitiesByState(state);
  const otherStates = INDIA_STATES.filter((s) => s.slug !== state).slice(0, 8);
  const exportReadyFarms = farms.filter((f) => f.exportReady);

  return (
    <main>
      {/* Hero */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
          <div className="flex items-center gap-2 mb-5 text-xs flex-wrap">
            <Link to="/" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link to="/buy-in" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Buy In Your City</Link>
            <span className="text-white/30">/</span>
            <span className="text-white uppercase tracking-widest">{data.name}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            Green Coffee Beans in {data.name}, India
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl text-base">
            Koraput Arabica from the Eastern Ghats — traceable, tribal-farmed, and export-ready.
            Select a grade below, choose your farm, and order direct — delivered anywhere in {data.name}.
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            {[
              { value: estateProducts.length.toString(), label: "Grade Lots" },
              { value: farms.length.toString(), label: "Partner Farms" },
              { value: exportReadyFarms.length.toString(), label: "Export Ready" },
              { value: cities.length.toString(), label: `Cities in ${data.name}` },
            ].map(({ value, label }) => (
              <div key={label} className="border-l-2 border-white/30 pl-4">
                <div className="font-serif text-2xl font-bold text-white">{value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City grid */}
      {cities.length > 0 && (
        <section className="bg-white border-b-2 border-odisha-black">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
            <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
              Cities We Supply in {data.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((c) => (
                <Link
                  key={c.citySlug}
                  to={`/india/${state}/${c.citySlug}/green-coffee`}
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
                  <p className="text-xs text-odisha-black/60">Min. order {c.moq}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {c.industries.slice(0, 2).map((ind) => (
                      <span key={ind} className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 bg-odisha-black/5 text-odisha-black/60">
                        {ind}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Interactive catalog */}
      <ProductsCatalog />

      {/* FAQ */}
      <section className="bg-white border-t-2 border-odisha-black">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-14">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-odisha-red pl-5">
              <h3 className="font-semibold text-odisha-black mb-2">
                Can buyers in {data.name} order Koraput green coffee online?
              </h3>
              <p className="text-odisha-black/70 leading-relaxed">
                Yes — select a grade and farm above, choose your quantity, and either add it to your
                cart or proceed straight to checkout. Specialty lots start from 250 g cupping samples.
              </p>
            </div>
            <div className="border-l-4 border-odisha-red pl-5">
              <h3 className="font-semibold text-odisha-black mb-2">
                What documentation comes with green coffee shipped to {data.name}?
              </h3>
              <p className="text-odisha-black/70 leading-relaxed">
                All export-ready lots come with APEDA registration, phytosanitary certificate, FSSAI,
                ICO stamp, and full farm-level traceability documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other states */}
      <section className="border-t-2 border-odisha-black bg-odisha-offwhite">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
            Other States We Supply
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherStates.map((s) => (
              <Link
                key={s.slug}
                to={`/india/${s.slug}/green-coffee`}
                className="group block border-2 border-odisha-black bg-white hover:bg-odisha-offwhite transition-colors p-4"
              >
                <h3 className="font-semibold text-odisha-black group-hover:text-odisha-red transition-colors">
                  {s.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
