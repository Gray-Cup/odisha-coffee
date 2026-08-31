import { Link, useParams } from "react-router";
import { getFarmBySlug } from "@/data/farms";
import { products } from "@/data/products";
import { RoastedCatalog } from "@/components/products/roasted-catalog";

export function meta({ params }: { params: { slug?: string } }) {
  const farm = params.slug ? getFarmBySlug(params.slug) : undefined;
  if (!farm) return [{ title: "Farm Not Found" }];
  return [
    { title: `${farm.name} Roasted Coffee - Koraput, Odisha` },
    {
      name: "description",
      content: `Small-batch roasted coffee from ${farm.name}, ${farm.region}, Koraput. Single-origin Arabica, roasted by Gray Cup, order online or add to your cart.`,
    },
  ];
}

function NotFoundBlock() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-24 text-center">
      <h1 className="font-serif text-2xl font-bold text-odisha-black mb-2">Farm Not Found</h1>
      <Link to="/farms" className="text-odisha-red underline">
        Browse all farms
      </Link>
    </div>
  );
}

export default function FarmRoastedCoffeePage() {
  const { slug } = useParams<{ slug: string }>();
  const farm = slug ? getFarmBySlug(slug) : undefined;

  if (!farm || !slug) return <NotFoundBlock />;

  const farmProducts = products.filter((p) => p.farmId === slug && !p.isGreen && p.roastLevel !== "green");
  const roastedProducts = farmProducts.filter((p) => p.availability !== "limited" && p.availability !== "seasonal");
  const specialtyLots = farmProducts.filter((p) => p.availability === "limited" || p.availability === "seasonal");

  return (
    <div>
      {/* Hero */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="flex items-center gap-2 mb-6 text-xs flex-wrap">
            <Link to="/" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link to="/farms" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Farms</Link>
            <span className="text-white/30">/</span>
            <Link to={`/farms/${slug}`} className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">{farm.name}</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80 uppercase tracking-widest">Roasted Coffee</span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            {farm.name} Roasted Coffee
          </h1>
          <p className="text-white/70 text-sm max-w-xl leading-relaxed">
            {farm.region}, {farm.district} District · {farm.elevation} · Est. {farm.established}
          </p>
        </div>
      </section>

      {/* Farm meta strip */}
      <section className="bg-odisha-offwhite border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex flex-wrap gap-4 items-center">
          <span className="text-xs text-odisha-black/60">{farm.varieties.join(", ")}</span>
          {farm.exportReady && (
            <>
              <span className="text-odisha-black/30 hidden sm:inline">·</span>
              <span className="text-[10px] font-bold uppercase tracking-widest border border-odisha-green text-odisha-green px-2 py-0.5">
                Export Ready
              </span>
            </>
          )}
          <div className="ml-auto flex items-center gap-4">
            <Link
              to={`/farms/${slug}/green-coffee`}
              className="text-xs text-odisha-black/50 hover:text-odisha-red transition-colors uppercase tracking-widest"
            >
              Green Coffee →
            </Link>
            <Link
              to={`/farms/${slug}`}
              className="text-xs text-odisha-black/50 hover:text-odisha-red transition-colors uppercase tracking-widest"
            >
              ← Farm Profile
            </Link>
          </div>
        </div>
      </section>

      {farmProducts.length > 0 ? (
        <RoastedCatalog roastedProducts={roastedProducts} specialtyLots={specialtyLots} />
      ) : (
        <section className="bg-white border-b-2 border-odisha-black">
          <div className="max-w-3xl mx-auto px-4 lg:px-6 py-16 text-center">
            <h2 className="font-serif text-xl font-bold text-odisha-black mb-3">
              No roasted lots from {farm.name} right now
            </h2>
            <p className="text-sm text-odisha-black/60 mb-6">
              This estate&apos;s beans are currently only available as green (unroasted) coffee.
              Browse our full roasted catalogue, or buy green beans direct from {farm.name}.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/roasted-coffee"
                className="inline-block px-6 py-3 bg-odisha-red text-white text-sm font-semibold border-2 border-odisha-red hover:bg-odisha-black hover:border-odisha-black transition-colors"
              >
                Browse All Roasted Coffee
              </Link>
              <Link
                to={`/farms/${slug}/green-coffee`}
                className="inline-block px-6 py-3 bg-transparent text-odisha-black text-sm font-semibold border-2 border-odisha-black hover:bg-odisha-offwhite transition-colors"
              >
                Buy Green Beans from {farm.name}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-odisha-red border-t-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-white text-lg">Need a custom roast from {farm.name}?</h3>
            <p className="text-white/60 text-sm mt-1">
              Custom roast profiles, private labelling, or bulk quantities, contact us directly.
            </p>
          </div>
          <Link
            to={`/contact?farm=${slug}`}
            className="inline-block px-6 py-3 bg-white text-odisha-black text-sm font-semibold border-2 border-white hover:bg-odisha-yellow hover:border-odisha-yellow transition-colors whitespace-nowrap"
          >
            Custom Enquiry
          </Link>
        </div>
      </section>
    </div>
  );
}
