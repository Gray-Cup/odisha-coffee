import type { ComponentType } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MDXComponent = ComponentType<any>;

// SEO guide articles, same MDX-at-build-time setup as lib/mdx.ts (newsroom),
// just a separate content folder so listicles/buying guides don't pollute the
// press-style newsroom feed. See vite.config.ts for the @mdx-js/rollup plugin.

export interface GuideFrontmatter {
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  readingTime?: string;
  category?: string;
  image?: string;
}

export interface GuidePost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  readingTime: string;
  category: string;
  image: string;
  Content: MDXComponent;
}

// Absolute URL of the article's share/snippet image. Uses the frontmatter
// `image` if set, otherwise a category-based default. Google needs a real
// image in structured data (og:image alone isn't enough) to show a thumbnail
// next to a search result.
// 1200x630 WebP banners generated from product photos (see scripts / public/og/guides).
const CATEGORY_IMAGE: Record<string, string> = {
  "Green Coffee for Roasters": "/og/guides/green.webp",
  "Filter Coffee": "/og/guides/filter.webp",
  "Odisha & Koraput": "/og/guides/odisha.webp",
  "Black Coffee & Fitness": "/og/guides/fitness.webp",
  "Best Coffee in India": "/og/guides/best.webp",
  "Farm & Traceability": "/og/guides/farm.webp",
};

export const GUIDE_IMAGE_W = 1200;
export const GUIDE_IMAGE_H = 630;

export function guideImageUrl(g: Pick<GuidePost, "image" | "category">): string {
  const path = g.image?.trim() || CATEGORY_IMAGE[g.category] || "/og/guides/default.webp";
  return path.startsWith("http")
    ? path
    : `https://odishacoffee.com${path.startsWith("/") ? "" : "/"}${path}`;
}

const modules = import.meta.glob("/content/guides/*.mdx", { eager: true }) as Record<
  string,
  { default: MDXComponent; frontmatter?: GuideFrontmatter }
>;

function slugFromPath(path: string): string {
  return path.replace("/content/guides/", "").replace(/\.mdx$/, "");
}

function allGuides(): GuidePost[] {
  return Object.entries(modules)
    .map(([path, mod]) => {
      const fm = mod.frontmatter ?? {};
      return {
        slug: slugFromPath(path),
        title: fm.title || "",
        description: fm.description || "",
        date: fm.date || "",
        author: fm.author || "Odisha Coffee",
        tags: fm.tags || [],
        published: fm.published !== false,
        featured: fm.featured || false,
        readingTime: fm.readingTime || "6 min read",
        category: fm.category || "Guides",
        image: fm.image || "",
        Content: mod.default,
      };
    })
    .filter((g) => g.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getGuides(): GuidePost[] {
  return allGuides();
}

export function getGuide(slug: string): GuidePost | null {
  return allGuides().find((g) => g.slug === slug) ?? null;
}

export function getAllGuideSlugs(): string[] {
  return Object.keys(modules).map(slugFromPath);
}

// Related guides for in-article interlinking, so every post links out to
// others (crawlable, no per-file maintenance). Ranked by shared tags, then
// same category, then recency; always returns `count` items if that many
// other guides exist.
export function getRelatedGuides(slug: string, count = 6) {
  const all = allGuides();
  const self = all.find((g) => g.slug === slug);
  if (!self) return [];
  const selfTags = new Set(self.tags);
  const scored = all
    .filter((g) => g.slug !== slug)
    .map((g) => ({
      slug: g.slug,
      title: g.title,
      category: g.category,
      score:
        g.tags.filter((t) => selfTags.has(t)).length * 10 +
        (g.category === self.category ? 3 : 0),
    }))
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map(({ slug, title, category }) => ({ slug, title, category }));
}
