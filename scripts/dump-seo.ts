// Crawls every URL in public/sitemap-0.xml against a running server and dumps
// the actual rendered <title> + meta description + canonical + og:image to
// content-drafts/seo-all.md, grouped by section. This reflects exactly what
// ships — farms, guides, country pages, India locations, product pages,
// static pages — with no meta() logic duplicated here.
//
//   npm run dev            # in one terminal
//   BASE=http://localhost:5173 npx tsx scripts/dump-seo.ts
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:5173";
const sitemap = readFileSync(new URL("../public/sitemap-0.xml", import.meta.url), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  m[1].replace("https://odishacoffee.com", "")
);

function pick(html: string, re: RegExp) {
  const m = html.match(re);
  return m ? m[1].replace(/\s+/g, " ").trim() : "";
}

type Row = { path: string; title: string; desc: string; canonical: string; og: string };
const rows: Row[] = [];

for (const path of locs) {
  try {
    const res = await fetch(BASE + (path || "/"));
    const html = await res.text();
    rows.push({
      path: path || "/",
      title: pick(html, /<title>([^<]*)<\/title>/i),
      desc: pick(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i),
      canonical: pick(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i),
      og: pick(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i),
    });
  } catch (e) {
    rows.push({ path: path || "/", title: `ERROR: ${(e as Error).message}`, desc: "", canonical: "", og: "" });
  }
}

function section(p: string) {
  if (p === "/") return "Home";
  if (p.startsWith("/guides/")) return "Guides (articles)";
  if (p === "/guides") return "Guides (index)";
  if (p.startsWith("/farms/") && p.split("/").length > 3) return "Farm subpages";
  if (p.startsWith("/farms")) return "Farms";
  if (p.startsWith("/buy-green-beans/")) return "Green bean product pages";
  if (p.startsWith("/buy-green-coffee/")) return "India — green coffee (state/city)";
  if (p.startsWith("/buy-roasted-coffee/")) return "India — roasted coffee (state/city)";
  if (/^\/[a-z-]+\/green-coffee$/.test(p)) return "Country — green coffee export";
  if (p.startsWith("/buy-") || p.startsWith("/roasted-coffee") || p.startsWith("/spices")) return "Catalogue hubs";
  return "Static / other";
}

const bySection = new Map<string, Row[]>();
for (const r of rows) {
  const s = section(r.path);
  (bySection.get(s) ?? bySection.set(s, []).get(s)!).push(r);
}

let md = `# All pages — SEO titles & descriptions\n\n`;
md += `Crawled ${rows.length} URLs from sitemap-0.xml against ${BASE}.\n`;
md += `Generated ${new Date().toISOString()}.\n`;

for (const [s, list] of bySection) {
  md += `\n---\n\n## ${s} (${list.length})\n\n`;
  for (const r of list.sort((a, b) => a.path.localeCompare(b.path))) {
    md += `### \`${r.path}\`\n`;
    md += `- **Title (${r.title.length}):** ${r.title}\n`;
    md += `- **Description (${r.desc.length}):** ${r.desc || "— none —"}\n`;
    if (r.canonical && r.canonical !== `https://odishacoffee.com${r.path}`) {
      md += `- **Canonical:** ${r.canonical}\n`;
    }
    md += `\n`;
  }
}

mkdirSync(new URL("../content-drafts/", import.meta.url), { recursive: true });
writeFileSync(new URL("../content-drafts/seo-all.md", import.meta.url), md);
console.log(`Wrote content-drafts/seo-all.md (${rows.length} pages, ${bySection.size} sections)`);
