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
  Content: MDXComponent;
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
