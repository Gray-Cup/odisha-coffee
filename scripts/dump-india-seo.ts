// Prints SEO titles + descriptions for every India location page
// (/buy-green-coffee/:location and /buy-roasted-coffee/:location) to
// content-drafts/india-seo-titles.md. Run: npx tsx scripts/dump-india-seo.ts
import { writeFileSync, mkdirSync } from "node:fs";
import { INDIA_STATES } from "../app/data/locations/india-states";
import { indiaCities, getCitiesByState } from "../app/data/locations/india-cities";
import { generateDescription } from "../app/lib/seo";
import {
  greenCityTitle, greenCityDescription, greenStateTitle, greenStateDescription,
  roastedCityTitle, roastedCityDescription, roastedStateTitle, roastedStateDescription,
  getStateSeo,
} from "../app/data/locations/india-seo";

const B = "https://odishacoffee.com";

function block(name: string, url: string, title: string, rawDesc: string) {
  const desc = generateDescription(rawDesc);
  return `- **URL:** ${url}\n- **Title (${title.length}):** ${title}\n- **Description (${desc.length}):** ${desc}\n`;
}

let md = `# India location pages — SEO titles & descriptions\n\n`;
md += `${INDIA_STATES.length} states + ${indiaCities.length} cities, each with a green-coffee and a roasted-coffee page.\n`;
md += `URL patterns: \`/buy-green-coffee/<slug>\` and \`/buy-roasted-coffee/<slug>\`\n\n`;

for (const st of INDIA_STATES) {
  const seo = getStateSeo(st.slug);
  md += `\n## ${st.name} — ${seo.region}\n\n`;
  md += `_${seo.note}_\n\n`;

  md += `### ${st.name} · state · green coffee\n`;
  md += block(st.name, `${B}/buy-green-coffee/${st.slug}`, greenStateTitle(st.name), greenStateDescription(st.slug, st.name)) + `\n`;
  md += `### ${st.name} · state · roasted coffee\n`;
  md += block(st.name, `${B}/buy-roasted-coffee/${st.slug}`, roastedStateTitle(st.name), roastedStateDescription(st.slug, st.name)) + `\n`;

  for (const c of getCitiesByState(st.slug)) {
    md += `### ${c.city} · city · green coffee\n`;
    md += block(c.city, `${B}/buy-green-coffee/${c.citySlug}`, greenCityTitle(c), greenCityDescription(c)) + `\n`;
    md += `### ${c.city} · city · roasted coffee\n`;
    md += block(c.city, `${B}/buy-roasted-coffee/${c.citySlug}`, roastedCityTitle(c), roastedCityDescription(c)) + `\n`;
  }
}

mkdirSync(new URL("../content-drafts/", import.meta.url), { recursive: true });
writeFileSync(new URL("../content-drafts/india-seo-titles.md", import.meta.url), md);
const pages = INDIA_STATES.length * 2 + indiaCities.length * 2;
console.log(`Wrote content-drafts/india-seo-titles.md (${pages} pages)`);
