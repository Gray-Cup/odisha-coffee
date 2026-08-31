import { Link, data, isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/buy-roasted-coffee-location";
import { INDIA_STATES, getStateBySlug } from "@/data/locations/india-states";
import { getCitiesByState, getIndiaCityBySlugAny, getRelatedIndiaCities } from "@/data/locations/india-cities";
import { products } from "@/data/products";
import { RoastedCatalog } from "@/components/products/roasted-catalog";
import { generateDescription, SITE_URL } from "@/lib/seo";
import {
  roastedCityTitle,
  roastedCityDescription,
  roastedStateTitle,
  roastedStateDescription,
} from "@/data/locations/india-seo";

export function loader({ params }: Route.LoaderArgs) {
  const slug = params.location ?? "";
  const state = getStateBySlug(slug);
  if (state) {
    return { kind: "state" as const, state, cities: getCitiesByState(slug) };
  }
  const city = getIndiaCityBySlugAny(slug);
  if (city) {
    return { kind: "city" as const, city, related: getRelatedIndiaCities(city.citySlug, city.stateSlug) };
  }
  throw data("Not found", { status: 404 });
}

const OG_IMAGE = `${SITE_URL}/products/roasted-coffee-beans.webp`;

export function meta({ data: loaderData, params }: Route.MetaArgs) {
  if (!loaderData) return [{ title: "Not Found" }];
  const url = `${SITE_URL}/buy-roasted-coffee/${params.location}`;
  const title =
    loaderData.kind === "state"
      ? roastedStateTitle(loaderData.state.name)
      : roastedCityTitle(loaderData.city);
  const description =
    loaderData.kind === "state"
      ? roastedStateDescription(loaderData.state.slug, loaderData.state.name)
      : roastedCityDescription(loaderData.city);
  return [
    { title },
    { name: "description", content: generateDescription(description) },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:locale", content: "en_IN" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}

export default function BuyRoastedCoffeeLocationPage({ loaderData }: Route.ComponentProps) {
  const roastedProducts = products.filter((p) => !p.isGreen && p.roastLevel !== "green");
  const specialtyLots = products.filter((p) => p.availability === "limited" || p.availability === "seasonal");
  const name = loaderData.kind === "state" ? loaderData.state.name : loaderData.city.city;
  const otherStates = loaderData.kind === "state" ? INDIA_STATES.filter((s) => s.slug !== loaderData.state.slug).slice(0, 8) : [];

  return (
    <main>
      {/* Hero */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
          <div className="flex items-center gap-2 mb-5 text-xs flex-wrap">
            <Link to="/" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link to="/roasted-coffee" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Roasted Coffee</Link>
            <span className="text-white/30">/</span>
            <span className="text-white uppercase tracking-widest">{name}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            Roasted Coffee in {name}, India
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl text-base">
            Small-batch roasted Koraput Arabica with single-origin, espresso blends, and limited seasonal
            micro-lots. Roasted fresh to order and dispatched to {name}
            {loaderData.kind === "city" ? ` in ${loaderData.city.transitDays}` : ""}.
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            {[
              { value: roastedProducts.length.toString(), label: "Roasted Lots" },
              { value: specialtyLots.length.toString(), label: "Specialty / Seasonal" },
              { value: "48h", label: "Roast-to-Dispatch Rest" },
              loaderData.kind === "state"
                ? { value: loaderData.cities.length.toString(), label: `Cities in ${name}` }
                : { value: loaderData.city.transitDays, label: `Transit to ${name}` },
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
          We are not physically based in {name}. This page exists so buyers here can order roasted
          Koraput coffee directly. Every order is roasted on demand at our roastery, rested ~48h, then
          dispatched to {name}
          {loaderData.kind === "city" ? ` (arrives in ${loaderData.city.transitDays})` : ""}.
        </div>
      </section>

      {/* City grid (state view) */}
      {loaderData.kind === "state" && loaderData.cities.length > 0 && (
        <section className="bg-white border-b-2 border-odisha-black">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
            <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
              Cities We Deliver Roasted Coffee To in {name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {loaderData.cities.map((c) => (
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
                  <p className="text-xs text-odisha-black/60">Min. order {c.moq}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* City context (city view) */}
      {loaderData.kind === "city" && (
        <section className="bg-white border-b-2 border-odisha-black">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-odisha-black mb-4">
                    Roasted Coffee Buyers in {name}
                  </h2>
                  <p className="text-odisha-black/80 leading-relaxed mb-4">
                    {name} is home to a growing base of {loaderData.city.industries.slice(0, 3).join(", ").toLowerCase()}{" "}
                    buyers wanting fresh-roasted, single-origin Koraput Arabica. Every order is roasted after
                    purchase, rested ~48 hours, then dispatched to {name}, arriving in {loaderData.city.transitDays}.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {loaderData.city.industries.map((ind) => (
                      <div key={ind} className="border-2 border-odisha-black p-3 bg-odisha-offwhite">
                        <span className="font-semibold text-odisha-black text-sm">{ind}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="border-2 border-odisha-black bg-white p-5">
                  <h3 className="font-serif font-bold text-odisha-black text-lg mb-4">
                    Delivery to {name}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-odisha-black/10 pb-2">
                      <span className="text-odisha-black/60">Roast-to-Dispatch</span>
                      <span className="font-semibold text-odisha-black">~48h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-odisha-black/60">Transit Time</span>
                      <span className="font-semibold text-odisha-black">{loaderData.city.transitDays}</span>
                    </div>
                  </div>
                </div>
                {loaderData.city.nearbyAreas.length > 0 && (
                  <div className="border-2 border-odisha-black bg-white p-5">
                    <h3 className="font-serif font-bold text-odisha-black text-lg mb-3">
                      Also Serving Nearby
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {loaderData.city.nearbyAreas.map((area) => (
                        <span key={area} className="text-xs border border-odisha-black/20 text-odisha-black/60 px-2 py-1">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* Interactive catalog: select a roast and buy */}
      <RoastedCatalog roastedProducts={roastedProducts} specialtyLots={specialtyLots} />

      {/* Green beans nudge */}
      <section className="bg-odisha-offwhite border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-odisha-black text-lg">Looking for green beans instead?</h3>
            <p className="text-sm text-odisha-black/60 mt-1">
              AAA to B grade washed and natural lots available from all partner estates.
            </p>
          </div>
          <Link
            to={`/buy-green-coffee/${loaderData.kind === "state" ? loaderData.state.slug : loaderData.city.citySlug}`}
            className="inline-block px-6 py-3 bg-odisha-green text-white text-sm font-semibold border-2 border-odisha-green hover:bg-odisha-black hover:border-odisha-black transition-colors whitespace-nowrap"
          >
            Green Beans →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-t-2 border-odisha-black">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-14">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-odisha-red pl-5">
              <h3 className="font-semibold text-odisha-black mb-2">
                Is this coffee roasted in {name}?
              </h3>
              <p className="text-odisha-black/70 leading-relaxed">
                No, we're not based in {name}. Every order is roasted on demand at our roastery, rested
                for about 48 hours to let it degas, then dispatched to you.
              </p>
            </div>
            <div className="border-l-4 border-odisha-red pl-5">
              <h3 className="font-semibold text-odisha-black mb-2">
                How fast will roasted coffee reach {name}?
              </h3>
              <p className="text-odisha-black/70 leading-relaxed">
                Add roast-to-dispatch rest (~48h) to transit time
                {loaderData.kind === "city" ? ` (${loaderData.city.transitDays} to ${name})` : ""}.
                Select a product and weight above to order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related locations */}
      {loaderData.kind === "city" && loaderData.related.length > 0 && (
        <section className="border-t-2 border-odisha-black bg-odisha-offwhite">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
            <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
              Other Cities We Deliver To
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {loaderData.related.map((rc) => (
                <Link
                  key={rc.citySlug}
                  to={`/buy-roasted-coffee/${rc.citySlug}`}
                  className="group block border-2 border-odisha-black bg-white hover:bg-odisha-offwhite transition-colors p-4"
                >
                  <h3 className="font-semibold text-odisha-black group-hover:text-odisha-red transition-colors">
                    {rc.city}
                  </h3>
                  <p className="text-xs text-odisha-black/50 mt-1">{rc.state} · {rc.transitDays}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      {loaderData.kind === "state" && otherStates.length > 0 && (
        <section className="border-t-2 border-odisha-black bg-odisha-offwhite">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
            <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
              Other States We Deliver To
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherStates.map((s) => (
                <Link
                  key={s.slug}
                  to={`/buy-roasted-coffee/${s.slug}`}
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
      )}
    </main>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-2xl font-bold text-odisha-black mb-2">Location Not Found</h1>
        <Link to="/buy-coffee" className="text-odisha-red underline">
          View all available locations
        </Link>
      </div>
    );
  }
  throw error;
}
