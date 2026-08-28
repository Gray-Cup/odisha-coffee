import { Link } from "react-router";
import { products } from "@/data/products";
import { estateProducts } from "@/data/estate-products";
import { computeItemPrice, roundToNearest5 } from "@/lib/pricing";
import graycupFeed from "@/data/graycup-products.json";

type GrayCupProduct = {
  slug: string;
  name: string;
  kind: string;
  description: string;
  url: string;
  image: string;
  priceMin: number;
  startVariant: string;
  startPrice: number;
  availability: string;
};
const graycupProducts = graycupFeed.products as GrayCupProduct[];

// Horizontal product cards for guide articles (content/guides/*.mdx).
// Every link here is a plain <Link>/<a> with NO rel="nofollow" — internal
// links to our own catalogue and dofollow outbound links to Gray Cup.

type Resolved = {
  name: string;
  blurb: string;
  price: string;
  href: string;
  image: string;
  cta: string;
  external?: boolean;
};

function resolve(id: string): Resolved | null {
  const roastLabel: Record<string, string> = {
    green: "Green / unroasted",
    light: "Light roast",
    medium: "Medium roast",
    "medium-dark": "Medium-dark roast",
    dark: "Dark roast",
  };

  const p = products.find((x) => x.id === id);
  if (p) {
    if (p.isGreen) {
      return {
        name: p.name,
        blurb: `${p.variety} · ${p.region} · green beans`,
        price: `From ₹${roundToNearest5(p.pricePerKg).toLocaleString("en-IN")} / kg`,
        href: "/buy-green-beans",
        image: `/products/${p.image ?? "og.webp"}`,
        cta: "Buy / Enquire",
      };
    }
    return {
      name: p.name,
      blurb: `${roastLabel[p.roastLevel] ?? "Roasted"} · ${p.region} · ${p.flavorNotes.slice(0, 3).join(", ")}`,
      price: `₹${computeItemPrice(p.pricePerKg, 250).toLocaleString("en-IN")} · 250 g`,
      href: "/roasted-coffee",
      image: `/products/${p.image ?? "og.webp"}`,
      cta: "Buy Now",
    };
  }

  const e = estateProducts.find((x) => x.id === id);
  if (e) {
    return {
      name: e.name,
      blurb: `${e.grade} · ${e.processing} · Koraput, Odisha`,
      price: `From ₹${roundToNearest5(e.pricePerKg + e.shippingPerKg).toLocaleString("en-IN")} / kg`,
      href: `/buy-green-beans/${e.id}`,
      image: `/${e.image ?? "og.webp"}`,
      cta: "Buy / Enquire",
    };
  }

  return null;
}

export function ProductCard({ id }: { id: string }) {
  const r = resolve(id);
  if (!r) return null;

  const inner = (
    <>
      <img
        src={r.image}
        alt={r.name}
        loading="lazy"
        className="h-32 w-32 shrink-0 border-r-2 border-odisha-black object-cover sm:h-36 sm:w-36"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-1 p-4">
        <div>
          <div className="font-serif text-base font-bold leading-tight text-odisha-black">
            {r.name}
          </div>
          <div className="mt-1 text-xs text-odisha-black/60">{r.blurb}</div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-odisha-black">{r.price}</span>
          <span className="inline-flex items-center gap-1 bg-odisha-red px-3 py-1.5 text-xs font-semibold text-white">
            {r.cta}
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </>
  );

  const cls =
    "my-4 flex w-full items-stretch overflow-hidden border-2 border-odisha-black bg-white no-underline transition-shadow hover:shadow-[4px_4px_0_0_#1a1a1a]";

  return r.external ? (
    <a href={r.href} target="_blank" rel="noopener" className={cls}>
      {inner}
    </a>
  ) : (
    <Link to={r.href} className={cls}>
      {inner}
    </Link>
  );
}

export function ProductRow({ ids }: { ids: string[] }) {
  return (
    <div className="not-prose my-6 flex flex-col gap-3">
      {ids.map((id) => (
        <ProductCard key={id} id={id} />
      ))}
    </div>
  );
}

// ─── Gray Cup roasted coffee (graycup.in feed) ──────────────────────────
// Live-ish data from scripts/fetch-graycup-products.ts. Outbound links are
// dofollow (rel="noopener" only) straight to the graycup.in product page.

export function GrayCupCard({ slug, label }: { slug: string; label?: string }) {
  const p = graycupProducts.find((x) => x.slug === slug);
  if (!p) return null;
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener"
      className="relative my-4 flex w-full items-stretch overflow-hidden border-2 border-odisha-black bg-white no-underline transition-shadow hover:shadow-[4px_4px_0_0_#1a1a1a]"
    >
      {label && (
        <span className="absolute right-0 top-0 z-10 bg-odisha-black px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          {label}
        </span>
      )}
      <img
        src={p.image}
        alt={p.name}
        loading="lazy"
        className="h-32 w-32 shrink-0 border-r-2 border-odisha-black object-cover sm:h-36 sm:w-36"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-1 p-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-odisha-red">
            Gray Cup · freshly roasted
          </div>
          <div className="font-serif text-base font-bold leading-tight text-odisha-black">
            {p.name}
          </div>
          <div className="mt-1 line-clamp-2 text-xs text-odisha-black/60">{p.description}</div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-odisha-black">
            ₹{p.startPrice.toLocaleString("en-IN")} · {p.startVariant}
          </span>
          <span className="inline-flex items-center gap-1 bg-odisha-black px-3 py-1.5 text-xs font-semibold text-white">
            Buy on Gray Cup
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

export function GrayCupRow({ slugs, label }: { slugs: string[]; label?: string }) {
  return (
    <div className="not-prose my-6 flex flex-col gap-3">
      {slugs.map((s, i) => (
        <GrayCupCard key={s} slug={s} label={i === 0 ? label : undefined} />
      ))}
    </div>
  );
}

// Dofollow outbound link to Gray Cup (the roastery that buys OdishaCoffee
// green beans and sells them roasted). No rel="nofollow" — link equity is
// meant to pass to our sister site.
export function GrayCupLink({
  href = "https://graycup.in",
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener" className="font-medium underline">
      {children}
    </a>
  );
}

export const guideMdxComponents = {
  ProductCard,
  ProductRow,
  GrayCupCard,
  GrayCupRow,
  GrayCupLink,
};
