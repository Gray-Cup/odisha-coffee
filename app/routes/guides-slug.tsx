import { getGuide, getRelatedGuides } from "@/lib/guides";
import { Link, data, isRouteErrorResponse, useParams } from "react-router";
import type { Route } from "./+types/guides-slug";
import { guideMdxComponents } from "@/components/product-card";
import { generateTitle, generateDescription, SITE_URL } from "@/lib/seo";

// Same trick as newsroom-slug: the compiled MDX component can't be serialized
// through the loader, so we return only metadata and re-resolve the post
// (cheap in-memory glob lookup) in the component for its `.Content`.
export function loader({ params }: Route.LoaderArgs) {
  const post = getGuide(params.slug);
  if (!post) throw data("Guide not found", { status: 404 });
  const { Content: _Content, ...meta } = post;
  return { ...meta, related: getRelatedGuides(params.slug) };
}

export function meta({ data: post, params }: Route.MetaArgs) {
  if (!post) return [{ title: generateTitle("Guide Not Found") }];
  return [
    { title: generateTitle(post.title) },
    { name: "description", content: generateDescription(post.description) },
    { name: "keywords", content: post.tags?.join(", ") },
    { tagName: "link", rel: "canonical", href: `${SITE_URL}/guides/${params.slug}` },
    { property: "og:title", content: generateTitle(post.title) },
    { property: "og:description", content: generateDescription(post.description) },
    { property: "og:type", content: "article" },
    { property: "article:published_time", content: post.date },
  ];
}

export default function GuidePage({ loaderData: post }: Route.ComponentProps) {
  const { slug } = useParams<{ slug: string }>();
  const full = getGuide(slug ?? "");
  if (!full) return null;
  const Content = full.Content;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6">
      <div className="mb-8">
        <Link to="/guides" className="text-sm text-odisha-red underline">
          ← All guides
        </Link>
      </div>

      <header className="mb-10">
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">{post.title}</h1>
        <p className="text-lg text-muted-foreground">{post.description}</p>
        <div className="mt-4 flex flex-wrap gap-4 border-b pb-4 text-sm text-muted-foreground">
          <span>{post.author}</span>
          {post.date && (
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
          <span>{post.readingTime}</span>
        </div>
      </header>

      <article className="prose prose-lg prose-neutral max-w-none dark:prose-invert">
        <Content components={guideMdxComponents} />
      </article>

      {post.related && post.related.length > 0 && (
        <section className="mt-16 border-t pt-8">
          <h2 className="mb-4 text-lg font-bold">Related guides</h2>
          <ul className="space-y-2">
            {post.related.map((r) => (
              <li key={r.slug}>
                <Link
                  to={`/guides/${r.slug}`}
                  className="text-odisha-red underline hover:no-underline"
                >
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="mt-12 border-t pt-8">
        <p className="mb-4 text-sm text-muted-foreground">
          Looking to source green coffee or buy it freshly roasted?
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/buy-green-beans"
            className="bg-odisha-red px-4 py-2 text-sm font-semibold text-white"
          >
            Buy Green Beans
          </Link>
          <Link
            to="/roasted-coffee"
            className="border-2 border-odisha-black px-4 py-2 text-sm font-semibold"
          >
            Shop Roasted Coffee
          </Link>
        </div>
      </footer>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="mb-4 text-3xl font-bold">Guide not found</h1>
        <Link to="/guides" className="text-odisha-red underline">
          Back to all guides
        </Link>
      </div>
    );
  }
  throw error;
}
