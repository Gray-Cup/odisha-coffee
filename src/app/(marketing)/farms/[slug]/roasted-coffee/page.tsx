import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { farms, getFarmBySlug } from "@/data/farms";
import { products } from "@/data/products";
import { RoastedCatalog } from "@/components/products/roasted-catalog";

export async function generateStaticParams() {
  return farms.map((f) => ({ slug: f.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const farm = getFarmBySlug(slug);
  if (!farm) return { title: "Farm Not Found" };
  return {
    title: `${farm.name} Roasted Coffee — Koraput, Odisha`,
    description: `Small-batch roasted coffee from ${farm.name}, ${farm.region}, Koraput. Single-origin Arabica, roasted by Gray Cup — order online or add to your cart.`,
    alternates: { canonical: `/farms/${slug}/roasted-coffee` },
  };
}

export default async function FarmRoastedCoffeePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const farm = getFarmBySlug(slug);
  if (!farm) notFound();

  const farmProducts = products.filter((p) => p.farmId === slug && !p.isGreen && p.roastLevel !== "green");
  const roastedProducts = farmProducts.filter((p) => p.availability !== "limited" && p.availability !== "seasonal");
  const specialtyLots = farmProducts.filter((p) => p.availability === "limited" || p.availability === "seasonal");

  return (
    <div>
      {/* Hero */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="flex items-center gap-2 mb-6 text-xs flex-wrap">
            <Link href="/" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link href="/farms" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Farms</Link>
            <span className="text-white/30">/</span>
            <Link href={`/farms/${slug}`} className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">{farm.name}</Link>
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
              href={`/farms/${slug}/green-coffee`}
              className="text-xs text-odisha-black/50 hover:text-odisha-red transition-colors uppercase tracking-widest"
            >
              Green Coffee →
            </Link>
            <Link
              href={`/farms/${slug}`}
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
                href="/roasted-coffee"
                className="inline-block px-6 py-3 bg-odisha-red text-white text-sm font-semibold border-2 border-odisha-red hover:bg-odisha-black hover:border-odisha-black transition-colors"
              >
                Browse All Roasted Coffee
              </Link>
              <Link
                href={`/farms/${slug}/green-coffee`}
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
              Custom roast profiles, private labelling, or bulk quantities — contact us directly.
            </p>
          </div>
          <Link
            href={`/contact?farm=${slug}`}
            className="inline-block px-6 py-3 bg-white text-odisha-black text-sm font-semibold border-2 border-white hover:bg-odisha-yellow hover:border-odisha-yellow transition-colors whitespace-nowrap"
          >
            Custom Enquiry
          </Link>
        </div>
      </section>
    </div>
  );
}
