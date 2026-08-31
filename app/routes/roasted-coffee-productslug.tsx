import { Link, data, isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/roasted-coffee-productslug";
import { getProductById, products, roastLabels } from "@/data/products";
import { getFarmBySlug } from "@/data/farms";
import { RoastedOrderPanel } from "@/components/products/roasted-order-panel";
import { ProductReviews } from "@/components/reviews/product-reviews";
import { roastedProductSchema, jsonLdScript } from "@/lib/product-schema";
import { computeItemPrice } from "@/lib/pricing";
import { generateTitle, generateDescription, SITE_URL } from "@/lib/seo";

export function loader({ params }: Route.LoaderArgs) {
  const product = getProductById(params.productSlug);
  if (!product || product.isGreen || product.roastLevel === "green") {
    throw data("Roasted coffee not found", { status: 404 });
  }
  const farm = getFarmBySlug(product.farmId);
  return { product, farm: farm ?? null, slug: params.productSlug };
}

export function meta({ data: d, params }: Route.MetaArgs) {
  if (!d) return [{ title: "Not Found" }];
  const { product } = d;
  const url = `${SITE_URL}/roasted-coffee/${params.productSlug}`;
  const image = product.image
    ? `${SITE_URL}/products/${product.image}`
    : `${SITE_URL}/products/roasted-coffee-beans.webp`;
  const price250 = computeItemPrice(product.pricePerKg, 250);
  return [
    { title: generateTitle(`${product.name} - Roasted Koraput, Odisha Coffee`) },
    {
      name: "description",
      content: generateDescription(
        `Buy ${product.name}: ${product.processing}-processed ${product.variety} from ${product.region}, ${product.roastLevel.replace("-", " ")} roast. ${product.flavorNotes.slice(0, 3).join(", ")}. From ₹${price250}/250g, roasted to order.`
      ),
    },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "product" },
    { property: "og:url", content: url },
    { property: "og:title", content: `${product.name} - Roasted Koraput Coffee` },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: product.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: image },
    jsonLdScript(roastedProductSchema(product, url)),
  ];
}

export default function RoastedCoffeeProductPage({ loaderData }: Route.ComponentProps) {
  const { product, farm } = loaderData;
  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        !p.isGreen &&
        p.roastLevel !== "green" &&
        (p.farmId === product.farmId || p.processing === product.processing || p.roastLevel === product.roastLevel)
    )
    .slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="flex items-center gap-2 mb-6 text-xs flex-wrap">
            <Link to="/" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link to="/roasted-coffee" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Roasted Coffee</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80 uppercase tracking-widest">{product.name}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest border-2 border-white text-white px-2 py-0.5">
              {roastLabels[product.roastLevel]}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-white text-odisha-black px-2 py-0.5">
              {product.processing}
            </span>
            {product.availability === "limited" && (
              <span className="text-[10px] font-bold uppercase tracking-widest bg-odisha-yellow text-black px-2 py-0.5">
                Limited
              </span>
            )}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            {product.name}
          </h1>
          <p className="text-white/80 text-sm max-w-2xl leading-relaxed">
            {product.variety} · {product.region} · roasted in small batches by Gray Cup, rested 48 hours before dispatch.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <img
              src={`/products/${product.image ?? "roasted-coffee-beans.webp"}`}
              alt={product.name}
              width={1200}
              height={800}
              className="w-full border-2 border-odisha-black object-cover aspect-[3/2]"
            />

            <div>
              <h2 className="font-serif text-xl font-bold text-odisha-black mb-3">About this roast</h2>
              <p className="text-odisha-black/80 leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-odisha-black mb-3">Flavour profile</h2>
              <div className="flex flex-wrap gap-2">
                {product.flavorNotes.map((n) => (
                  <span key={n} className="text-xs border-2 border-odisha-black px-2.5 py-1 bg-odisha-offwhite">
                    {n}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-odisha-black mb-3">Brewing</h2>
              <p className="text-odisha-black/80 leading-relaxed">{product.brewingNotes}</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-odisha-black mb-3">Specifications</h2>
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                {[
                  ["Origin", product.region],
                  ["Variety", product.variety],
                  ["Processing", product.processing],
                  ["Roast level", roastLabels[product.roastLevel]],
                  ["Farm", product.farmName],
                  ["Availability", product.availability],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-odisha-black/10 pb-2">
                    <dt className="text-odisha-black/50">{k}</dt>
                    <dd className="text-odisha-black font-medium text-right">{v}</dd>
                  </div>
                ))}
              </dl>
              {farm && (
                <p className="mt-3 text-sm">
                  <Link to={`/farms/${farm.id}`} className="text-odisha-red underline">
                    Visit the {farm.name} farm profile
                  </Link>
                </p>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="text-sm text-odisha-black/60">
              From{" "}
              <span className="font-serif text-2xl font-bold text-odisha-black">
                ₹{computeItemPrice(product.pricePerKg, 250).toLocaleString("en-IN")}
              </span>{" "}
              / 250 g
            </div>
            <RoastedOrderPanel product={product} />
            <p className="text-xs text-odisha-black/50 leading-relaxed">
              Roasted to order. Ships across India. {product.exportAvailable ? "Export quantities available on request." : ""}
            </p>
          </aside>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
        <ProductReviews slug={product.id} catalog="product" productName={product.name} />
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-odisha-offwhite border-t-2 border-odisha-black">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
            <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">Related roasts</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/roasted-coffee/${p.id}`}
                  className="group block border-2 border-odisha-black bg-white hover:bg-odisha-offwhite transition-colors p-4"
                >
                  <span className="font-serif font-bold text-odisha-black group-hover:text-odisha-red transition-colors block">
                    {p.name}
                  </span>
                  <span className="text-xs text-odisha-black/50 mt-1 block">
                    {roastLabels[p.roastLevel]} · from ₹{computeItemPrice(p.pricePerKg, 250).toLocaleString("en-IN")}/250g
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/roasted-coffee" className="text-sm text-odisha-red underline">
                All roasted coffee →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Roast not found</h1>
        <Link to="/roasted-coffee" className="text-odisha-red underline">
          Browse all roasted coffee
        </Link>
      </div>
    );
  }
  throw error;
}
