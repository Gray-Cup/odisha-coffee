import type { ComponentType } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MDXComponent = ComponentType<any>;

export interface NewsroomFrontmatter {
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  readingTime?: string;
}

export interface NewsroomPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  readingTime: string;
  Content: MDXComponent;
}

// Compiled at build time by @mdx-js/rollup (see vite.config.ts) - unlike the
// old fs.readFileSync-based version, this works in a Cloudflare Worker (no
// filesystem at request time) since Vite resolves every .mdx file into a
// real module during the build, not read off disk on each request.
const modules = import.meta.glob("/content/newsroom/*.mdx", {
  eager: true,
}) as Record<
  string,
  {
    default: MDXComponent;
    frontmatter?: NewsroomFrontmatter;
  }
>;

function slugFromPath(path: string): string {
  return path.replace("/content/newsroom/", "").replace(/\.mdx$/, "");
}

function allPosts(): NewsroomPost[] {
  return Object.entries(modules)
    .map(([path, mod]) => {
      const fm = mod.frontmatter ?? {};
      return {
        slug: slugFromPath(path),
        title: fm.title || "",
        description: fm.description || "",
        date: fm.date || "",
        author: fm.author || "",
        tags: fm.tags || [],
        published: fm.published !== false,
        featured: fm.featured || false,
        readingTime: fm.readingTime || "5 min read",
        Content: mod.default,
      };
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getNewsroomPosts(): NewsroomPost[] {
  return allPosts();
}

export function getNewsroomPost(slug: string): NewsroomPost | null {
  return allPosts().find((post) => post.slug === slug) ?? null;
}

export function getAllSlugs(): string[] {
  return Object.keys(modules).map(slugFromPath);
}
