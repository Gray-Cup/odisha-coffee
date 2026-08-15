import { getNewsroomPost } from "@/lib/mdx";
import { Link, data, isRouteErrorResponse, useParams } from "react-router";
import type { Route } from "./+types/newsroom-slug";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Clock } from "lucide-react";
import "highlight.js/styles/github-dark.css";
import { generateTitle, generateDescription } from "@/lib/seo";

// Loader data is serialized for the client (RRv7's SerializeFrom), so a
// compiled React component can't travel through it as `undefined`, which is
// what happens if `NewsroomPost.Content` is returned as-is here. The
// component itself re-resolves the post (cheap: a synchronous in-memory
// glob lookup, no I/O) purely to grab `.Content` for rendering.
export function loader({ params }: Route.LoaderArgs) {
  const post = getNewsroomPost(params.slug);
  if (!post) {
    throw data("Newsroom post not found", { status: 404 });
  }
  const { Content: _Content, ...meta } = post;
  return meta;
}

export function meta({ data: post }: Route.MetaArgs) {
  if (!post) {
    return [{ title: generateTitle("Newsroom Post Not Found") }];
  }
  return [
    { title: generateTitle(`${post.title} Newsroom Update`) },
    { name: "description", content: generateDescription(post.description) },
    { name: "keywords", content: post.tags?.join(", ") },
    { property: "og:title", content: generateTitle(post.title) },
    { property: "og:description", content: generateDescription(post.description) },
    { property: "og:type", content: "article" },
    { property: "article:published_time", content: post.date },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: generateTitle(post.title) },
    { name: "twitter:description", content: generateDescription(post.description) },
  ];
}

export default function NewsroomPostPage({ loaderData: post }: Route.ComponentProps) {
  const { slug } = useParams<{ slug: string }>();
  const fullPost = getNewsroomPost(slug ?? "");
  const readingTime = 5; // Approximate reading time

  if (!fullPost) return null;
  const Content = fullPost.Content;

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link to="/newsroom">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Newsroom
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-12">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          {post.title}
        </h1>

        {/* Description */}
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          {post.description}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b pb-6">
          {post.author && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>
      </header>

      {/* Article Content — real compiled MDX, not a raw-text dump */}
      <article className="prose prose-lg max-w-none prose-neutral dark:prose-invert">
        <Content />
      </article>

      {/* Article Footer */}
      <footer className="mt-16 pt-8 border-t">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h3 className="font-semibold mb-2">Enjoyed this article?</h3>
            <p className="text-muted-foreground text-sm">
              Share it with your network or subscribe for more insights.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/contact">
              <Button size="sm">Subscribe</Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Newsroom post not found</h1>
        <Link to="/newsroom" className="text-odisha-red underline">
          Back to Newsroom
        </Link>
      </div>
    );
  }
  throw error;
}
