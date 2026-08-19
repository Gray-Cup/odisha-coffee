#!/usr/bin/env node
// Regenerates public/llms-full.txt from app/data/*.ts and content/newsroom/*.mdx
// so the full-text llms.txt companion (per llmstxt.org) stays in sync with the
// site's actual farms/products/spices/articles instead of drifting out of date.
// Run standalone (`node scripts/generate-llms-full.mjs`) or via the pre-commit hook.

import { execSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import matter from "gray-matter";

const repoRoot = execSync("git rev-parse --show-toplevel").toString().trim();
const SITE_URL = "https://odishacoffee.com";
const OUT_PATH = path.join(repoRoot, "public/llms-full.txt");

function sh(cmd) {
  return execSync(cmd, { cwd: repoRoot }).toString().trim();
}

async function loadDataModule(relPath, exportName) {
  const abs = path.join(repoRoot, relPath);
  const result = await build({
    entryPoints: [abs],
    bundle: true,
    format: "esm",
    platform: "node",
    write: false,
  });

  const tmpDir = mkdtempSync(path.join(tmpdir(), "llms-full-"));
  const tmpFile = path.join(tmpDir, `${path.basename(relPath, ".ts")}.mjs`);
  writeFileSync(tmpFile, result.outputFiles[0].text);

  try {
    const mod = await import(pathToFileURL(tmpFile).href);
    return mod[exportName];
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

function loadNewsroomPosts() {
  const dir = path.join(repoRoot, "content/newsroom");
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = readFileSync(path.join(dir, f), "utf8");
      const { data, content } = matter(raw);
      return { slug: f.replace(/\.mdx$/, ""), ...data, content };
    })
    .filter((p) => p.published !== false)
    .sort((a, b) => new Date(b.date ?? 0) - new Date(a.date ?? 0));
}

function fmtList(arr) {
  return arr && arr.length ? arr.join(", ") : "—";
}

function renderFarm(farm) {
  const lines = [
    `### ${farm.name}`,
    "",
    `- URL: ${SITE_URL}/farms/${farm.id}`,
    `- Region: ${farm.region}, ${farm.district} district`,
    `- Elevation: ${farm.elevation}`,
    `- Area: ${farm.area}`,
    `- Varieties: ${fmtList(farm.varieties)}`,
    `- Processing methods: ${fmtList(farm.processing)}`,
    `- Flavor notes: ${fmtList(farm.flavorNotes)}`,
    `- Harvest season: ${farm.harvestSeason}`,
    `- Established: ${farm.established}`,
    `- Certifications: ${fmtList(farm.certifications)}`,
    `- Export ready: ${farm.exportReady ? "Yes" : "No"}`,
    "",
    farm.description,
    "",
    farm.story,
  ];
  return lines.join("\n");
}

function renderProduct(product) {
  const lines = [
    `### ${product.name}`,
    "",
    `- Farm: ${product.farmName} (${product.region})`,
    `- Variety: ${product.variety}`,
    `- Processing: ${product.processing}`,
    `- Roast level: ${product.roastLevel}`,
    `- Flavor notes: ${fmtList(product.flavorNotes)}`,
    `- Availability: ${product.availability}`,
    `- Weight options: ${fmtList(product.weightOptions)}`,
    `- Price: ₹${product.pricePerKg}/kg`,
    `- Export available: ${product.exportAvailable ? "Yes" : "No"}${product.minOrderExport ? ` (min ${product.minOrderExport})` : ""}`,
    "",
    product.description,
    "",
    `Brewing/roasting notes: ${product.brewingNotes}`,
  ];
  return lines.join("\n");
}

function renderEstateProduct(product) {
  const lines = [
    `### ${product.name}`,
    "",
    `- Variety: ${product.variety}`,
    `- Processing: ${product.processing}`,
    `- Grade: ${product.grade}`,
    `- Moisture: ${product.moisture}`,
    `- Screen size: ${product.screenSize}`,
    `- Flavor notes: ${fmtList(product.flavorNotes)}`,
    `- Availability: ${product.availability}`,
    `- Min order: ${product.minOrder}`,
    `- Price: ₹${product.pricePerKg}/kg (+₹${product.shippingPerKg}/kg shipping)`,
    "",
    product.description,
    "",
    `Brewing notes: ${product.brewingNotes}`,
  ];
  return lines.join("\n");
}

function renderSpice(spice) {
  const lines = [
    `### ${spice.name}`,
    "",
    `- Price: ₹${spice.pricePerKg}/kg`,
    `- Weight options: ${fmtList(spice.weightOptions.map((w) => w.label))}`,
    "",
    spice.description,
  ];
  return lines.join("\n");
}

function renderNewsroomPost(post) {
  const lines = [
    `### ${post.title ?? post.slug}`,
    "",
    `- URL: ${SITE_URL}/newsroom/${post.slug}`,
    post.date ? `- Date: ${post.date}` : null,
    post.author ? `- Author: ${post.author}` : null,
    post.tags?.length ? `- Tags: ${fmtList(post.tags)}` : null,
    "",
    post.description ?? "",
    "",
    post.content.trim(),
  ].filter((l) => l !== null);
  return lines.join("\n");
}

async function main() {
  const farms = await loadDataModule("app/data/farms.ts", "farms");
  const products = await loadDataModule("app/data/products.ts", "products");
  const estateProducts = await loadDataModule("app/data/estate-products.ts", "estateProducts");
  const spices = await loadDataModule("app/data/spices.ts", "spices");
  const newsroomPosts = loadNewsroomPosts();

  const sections = [
    "# Odisha Coffee — Full Reference",
    "",
    `> Complete, machine-readable content for ${SITE_URL}: every coffee estate, green/roasted coffee lot, spice, and newsroom article. See [/llms.txt](${SITE_URL}/llms.txt) for the short link index.`,
    "",
    `Generated from app/data/*.ts and content/newsroom/*.mdx — do not hand-edit; run \`node scripts/generate-llms-full.mjs\` (also runs automatically on commit).`,
    "",
    `## Farms & Estates (${farms.length})`,
    "",
    farms.map(renderFarm).join("\n\n"),
    "",
    `## Coffee Products (${products.length})`,
    "",
    products.map(renderProduct).join("\n\n"),
    "",
    `## Green Coffee Lots (${estateProducts.length})`,
    "",
    estateProducts.map(renderEstateProduct).join("\n\n"),
    "",
    `## Spices (${spices.length})`,
    "",
    spices.map(renderSpice).join("\n\n"),
  ];

  if (newsroomPosts.length > 0) {
    sections.push("", `## Newsroom (${newsroomPosts.length})`, "", newsroomPosts.map(renderNewsroomPost).join("\n\n"));
  }

  writeFileSync(OUT_PATH, sections.join("\n").trimEnd() + "\n");
  console.log(`Wrote ${path.relative(repoRoot, OUT_PATH)}`);

  sh(`git add -- "${path.relative(repoRoot, OUT_PATH)}"`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
