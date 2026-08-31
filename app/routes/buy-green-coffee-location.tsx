import { Link, data, isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/buy-green-coffee-location";
import { INDIA_STATES, getStateBySlug } from "@/data/locations/india-states";
import { getCitiesByState, getIndiaCityBySlugAny, getRelatedIndiaCities } from "@/data/locations/india-cities";
import { farms } from "@/data/farms";
import { estateProducts } from "@/data/estate-products";
import { ProductsCatalog } from "@/components/products/products-catalog";
import { generateDescription, SITE_URL } from "@/lib/seo";
import {
  greenCityTitle,
  greenCityDescription,
  greenStateTitle,
  greenStateDescription,
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

const OG_IMAGE = `${SITE_URL}/products/green-coffee-beans.webp`;

export function meta({ data: loaderData, params }: Route.MetaArgs) {
  if (!loaderData) return [{ title: "Not Found" }];
  const url = `${SITE_URL}/buy-green-coffee/${params.location}`;
  const title =
    loaderData.kind === "state"
      ? greenStateTitle(loaderData.state.name)
      : greenCityTitle(loaderData.city);
  const description =
    loaderData.kind === "state"
      ? greenStateDescription(loaderData.state.slug, loaderData.state.name)
      : greenCityDescription(loaderData.city);
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

export default function BuyGreenCoffeeLocationPage({ loaderData }: Route.ComponentProps) {
  const exportReadyFarms = farms.filter((f) => f.exportReady);
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
            <Link to="/buy-coffee" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Buy Coffee</Link>
            <span className="text-white/30">/</span>
            <span className="text-white uppercase tracking-widest">{name}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            Green Coffee Beans in {name}, India
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl text-base">
            Traceable, tribal-farmed Koraput Arabica from the Eastern Ghats, export-ready.
            Select a grade below and order direct, with delivery anywhere in {name}
            {loaderData.kind === "city" ? ` in ${loaderData.city.transitDays}` : ""}.
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            {[
              { value: estateProducts.length.toString(), label: "Grade Lots" },
              { value: farms.length.toString(), label: "Partner Farms" },
              { value: exportReadyFarms.length.toString(), label: "Export Ready" },
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
          We are not physically based in {name}. This page exists so buyers here can order Koraput
          green coffee directly. Beans ship from our Delhi facility to {name}
          {loaderData.kind === "city" ? ` in ${loaderData.city.transitDays}` : ""}.
        </div>
      </section>

      {/* City grid (state view) */}
      {loaderData.kind === "state" && loaderData.cities.length > 0 && (
        <section className="bg-white border-b-2 border-odisha-black">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
            <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
              Cities We Supply in {name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {loaderData.cities.map((c) => (
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

      {/* City context (city view) */}
      {loaderData.kind === "city" && (
        <section className="bg-white border-b-2 border-odisha-black">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-odisha-black mb-4">
                    Who Buys Koraput Coffee in {name}
                  </h2>
                  <p className="text-odisha-black/80 leading-relaxed mb-4">
                    {name} is home to a growing base of {loaderData.city.industries.slice(0, 3).join(", ").toLowerCase()}{" "}
                    buyers sourcing traceable, single-origin Indian green coffee. Koraput Arabica, shade-grown
                    in the Eastern Ghats by tribal farming communities at 700–1,100m elevation, ships to{" "}
                    {name} in {loaderData.city.transitDays}, with specialty lots from {loaderData.city.moq}.
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
                    Logistics to {name}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-odisha-black/10 pb-2">
                      <span className="text-odisha-black/60">Transit Time</span>
                      <span className="font-semibold text-odisha-black">{loaderData.city.transitDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-odisha-black/60">Minimum Order</span>
                      <span className="font-semibold text-odisha-black">{loaderData.city.moq}</span>
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

      {/* Interactive catalog: select a grade and buy */}
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
                Can buyers in {name} order Koraput green coffee online?
              </h3>
              <p className="text-odisha-black/70 leading-relaxed">
                Yes. Select a grade and farm above, choose your quantity, and either add it to your
                cart or proceed straight to checkout. Specialty lots start from 250 g cupping samples.
              </p>
            </div>
            <div className="border-l-4 border-odisha-red pl-5">
              <h3 className="font-semibold text-odisha-black mb-2">
                Is Gray Cup based in {name}?
              </h3>
              <p className="text-odisha-black/70 leading-relaxed">
                No. We source from Koraput, Odisha and ship green coffee from our Delhi facility to
                buyers across India, including {name}. This page is a local ordering guide, not a branch office.
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
              Other Cities We Supply
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {loaderData.related.map((rc) => (
                <Link
                  key={rc.citySlug}
                  to={`/buy-green-coffee/${rc.citySlug}`}
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
              Other States We Supply
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherStates.map((s) => (
                <Link
                  key={s.slug}
                  to={`/buy-green-coffee/${s.slug}`}
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
