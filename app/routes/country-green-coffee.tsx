import { Link, data, isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/country-green-coffee";
import { getCountryBySlug } from "@/data/locations/countries";
import { getCountryExport, countriesInRegion } from "@/data/locations/country-export";
import { farms } from "@/data/farms";
import { estateProducts } from "@/data/estate-products";
import { ProductsCatalog } from "@/components/products/products-catalog";
import { generateTitle, generateDescription, SITE_URL } from "@/lib/seo";

export function loader({ params }: Route.LoaderArgs) {
  const country = getCountryBySlug(params.country);
  const ex = getCountryExport(params.country);
  if (!country || !ex) {
    throw data("Country not found", { status: 404 });
  }
  return { country, ex, countrySlug: params.country };
}

const OG_IMAGE = `${SITE_URL}/products/green-coffee-beans.webp`;

function faqs(name: string, ex: ReturnType<typeof getCountryExport>) {
  if (!ex) return [];
  return [
    {
      q: `How long does green coffee take to ship from India to ${name}?`,
      a: `Typical sea transit is ${ex.transit}. ${ex.route} Loading is from ${ex.originPorts}, discharging at ${ex.port}.`,
    },
    {
      q: `Is there an import duty on green coffee in ${name}?`,
      a: `${ex.duty} Always confirm the current rate against your own tariff classification (HS 0901.11) before ordering.`,
    },
    {
      q: `What documentation and compliance is needed to import into ${name}?`,
      a: `${ex.compliance} Every lot also ships with a phytosanitary certificate, certificate of origin, ICO mark, APEDA registration and FSSAI documentation, plus farm-level GPS traceability.`,
    },
    {
      q: `Can a roaster in ${name} order Koraput green coffee directly online?`,
      a: `Yes. Choose a grade and partner farm from the catalogue below, set your quantity, and order online or request an FOB quote for full-container volumes. ${ex.container}`,
    },
  ];
}

export function meta({ data: d, params }: Route.MetaArgs) {
  if (!d) return [{ title: "Not Found" }];
  const { country, ex, countrySlug } = d;
  const url = `${SITE_URL}/${countrySlug}/green-coffee`;
  const title = generateTitle(`Green Coffee Export to ${country.name}: Koraput Arabica`);
  const desc = generateDescription(
    `Wholesale Koraput, Odisha green Arabica for roasters and importers in ${country.name}. ${ex.transit} sea transit to ${ex.port}, ${ex.duty} Traceable, tribal-farmed Eastern Ghats lots with EUDR-ready GPS data.`
  );
  return [
    { title },
    { name: "description", content: desc },
    { property: "og:title", content: `Green Coffee Export to ${country.name} ${country.flag}` },
    { property: "og:description", content: desc },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:locale", content: "en_IN" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: OG_IMAGE },
    { tagName: "link", rel: "canonical", href: url },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Export", item: `${SITE_URL}/odisha-coffee-export` },
          { "@type": "ListItem", position: 3, name: country.name, item: url },
        ],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs(country.name, ex).map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    },
  ];
}

export default function CountryGreenCoffeePage({ loaderData }: Route.ComponentProps) {
  const { country, ex, countrySlug } = loaderData;
  const exportReadyFarms = farms.filter((f) => f.exportReady);
  const sameRegion = countriesInRegion(ex.region, countrySlug)
    .map((s) => getCountryBySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .slice(0, 8);
  const list = faqs(country.name, ex);

  return (
    <main>
      {/* Hero */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
          <div className="flex items-center gap-2 mb-5 text-xs flex-wrap">
            <Link to="/" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link to="/odisha-coffee-export" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Export</Link>
            <span className="text-white/30">/</span>
            <span className="text-white uppercase tracking-widest">{country.flag} {country.name}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            Green Coffee Export to {country.name} {country.flag}
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl text-base">
            Koraput Arabica from Odisha's Eastern Ghats, shipped to roasters and importers
            across {ex.label}. Roughly {ex.transit} by sea to {ex.port}, with full
            farm-level traceability and EUDR-ready GPS data on every lot.
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            {[
              { value: ex.transit.split("–")[0].replace(/\D/g, "") + "d+", label: "Sea Transit" },
              { value: estateProducts.length.toString(), label: "Grade Lots" },
              { value: farms.length.toString(), label: "Partner Farms" },
              { value: exportReadyFarms.length.toString(), label: "Export Ready" },
            ].map(({ value, label }) => (
              <div key={label} className="border-l-2 border-white/30 pl-4">
                <div className="font-serif text-2xl font-bold text-white">{value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market context */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-4">
            The {country.name} coffee market
          </h2>
          <p className="text-odisha-black/80 leading-relaxed">{ex.note}</p>
          <p className="text-odisha-black/80 leading-relaxed mt-4">
            Koraput sits at 700–1,100 m in the Eastern Ghats and is one of India's youngest
            traceable origins — washed, natural and honey Arabica (S795, SLN 9, Chandragiri, HSD)
            grown by tribal farming communities across {farms.length} partner estates. For a
            {" "}{country.name} roaster it offers a distinctive Indian profile with clean cup
            character and documentation that stands up to scrutiny at import.
          </p>
        </div>
      </section>

      {/* Shipping */}
      <section className="bg-odisha-offwhite border-b-2 border-odisha-black">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-4">
            Shipping green coffee from India to {country.name}
          </h2>
          <dl className="space-y-4 text-odisha-black/80">
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-1">Route</dt>
              <dd className="leading-relaxed">{ex.route}</dd>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-1">Load port</dt>
                <dd>{ex.originPorts}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-1">Discharge</dt>
                <dd>{ex.port}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-1">Transit</dt>
                <dd>{ex.transit}</dd>
              </div>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-1">Container</dt>
              <dd className="leading-relaxed">{ex.container}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Import & compliance */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-4">
            Import duty &amp; compliance in {country.name}
          </h2>
          <p className="text-odisha-black/80 leading-relaxed">
            <strong>Tariff line:</strong> green, unroasted, non-decaffeinated coffee classifies
            under HS 0901.11. {ex.duty}
          </p>
          <p className="text-odisha-black/80 leading-relaxed mt-4">
            <strong>Compliance:</strong> {ex.compliance}
          </p>
          <p className="text-odisha-black/80 leading-relaxed mt-4">
            Every export lot ships with a phytosanitary certificate, certificate of origin, ICO
            mark, APEDA registration, FSSAI documentation and GPS polygon data for each partner
            plot. Rules change — confirm the current position with your customs broker before you
            order.
          </p>
        </div>
      </section>

      {/* Catalog */}
      <section className="border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-10">
          <h2 className="font-serif text-2xl font-bold text-odisha-black">
            Koraput green coffee lots for {country.name}
          </h2>
          <p className="text-sm text-odisha-black/60 mt-1">
            Select a grade and partner farm, choose your quantity, and order online — or contact
            us for FOB pricing and full-container volumes.
          </p>
        </div>
        <ProductsCatalog />
      </section>

      {/* FAQ */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-14">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
            Importing to {country.name}: FAQ
          </h2>
          <div className="space-y-6">
            {list.map((f) => (
              <div key={f.q} className="border-l-4 border-odisha-red pl-5">
                <h3 className="font-semibold text-odisha-black mb-2">{f.q}</h3>
                <p className="text-odisha-black/70 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {sameRegion.length > 0 && (
        <section className="border-t-2 border-odisha-black bg-odisha-offwhite">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
            <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
              Green coffee export across {ex.label}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {sameRegion.map((c) => (
                <Link
                  key={c.slug}
                  to={`/${c.slug}/green-coffee`}
                  className="group block border-2 border-odisha-black bg-white hover:bg-odisha-offwhite transition-colors p-4"
                >
                  <span className="font-semibold text-odisha-black group-hover:text-odisha-red transition-colors">
                    {c.flag} {c.name}
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/odisha-coffee-export" className="text-sm text-odisha-red underline">
                All export destinations →
              </Link>
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
        <h1 className="text-3xl font-bold mb-4">Country not found</h1>
        <Link to="/odisha-coffee-export" className="text-odisha-red underline">
          Browse export destinations
        </Link>
      </div>
    );
  }
  throw error;
}
