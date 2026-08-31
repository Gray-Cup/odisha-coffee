// Prints the SEO <title> and meta description for every /:country/green-coffee
// page to content-drafts/country-seo-titles.md for review.
// Run: npx tsx scripts/dump-country-seo.ts
import { writeFileSync, mkdirSync } from "node:fs";
import { countryDestinations } from "../app/data/locations/countries";
import { getCountryExport } from "../app/data/locations/country-export";
import { generateDescription } from "../app/lib/seo";

const rows = countryDestinations
  .map((c) => {
    const ex = getCountryExport(c.slug);
    if (!ex) return null;
    const title = `Wholesale Green Coffee Koraput, Odisha, India to ${c.name}`;
    const description = generateDescription(
      `Buy wholesale green coffee from Koraput, Odisha (India) for roasters and importers in ${c.name}. Traceable Eastern Ghats Arabica, about ${ex.transit} by sea to ${ex.port}, with EUDR-ready GPS traceability on every lot.`
    );
    return { slug: c.slug, name: c.name, region: ex.label, title, description };
  })
  .filter((r): r is NonNullable<typeof r> => Boolean(r))
  .sort((a, b) => a.name.localeCompare(b.name));

let md = `# Country green-coffee pages — SEO titles & descriptions\n\n`;
md += `${rows.length} pages. URL pattern: \`https://odishacoffee.com/<slug>/green-coffee\`\n\n`;
md += `| Country | URL | Title (chars) | Description (chars) |\n`;
md += `|---|---|---|---|\n`;
for (const r of rows) {
  md += `| ${r.name} | \`/${r.slug}/green-coffee\` | ${r.title} _(${r.title.length})_ | ${r.description} _(${r.description.length})_ |\n`;
}

md += `\n---\n\n## Plain list\n\n`;
for (const r of rows) {
  md += `### ${r.name}  ·  ${r.region}\n`;
  md += `- **URL:** https://odishacoffee.com/${r.slug}/green-coffee\n`;
  md += `- **Title (${r.title.length}):** ${r.title}\n`;
  md += `- **Description (${r.description.length}):** ${r.description}\n\n`;
}

mkdirSync(new URL("../content-drafts/", import.meta.url), { recursive: true });
writeFileSync(new URL("../content-drafts/country-seo-titles.md", import.meta.url), md);
console.log(`Wrote content-drafts/country-seo-titles.md (${rows.length} countries)`);
