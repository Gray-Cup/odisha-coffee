#!/usr/bin/env node
// Converts staged (or all, with --all) jpg/jpeg/png images to .webp,
// removes the originals, and rewrites any code/content references
// from the old extension to .webp.

import { execSync } from "node:child_process";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const repoRoot = execSync("git rev-parse --show-toplevel").toString().trim();
const IMAGE_EXT_RE = /\.(jpe?g|png)$/i;
const SKIP_DIR_RE = /(^|\/)(node_modules|\.next|\.open-next|\.wrangler|\.git)(\/|$)/;

function sh(cmd) {
  return execSync(cmd, { cwd: repoRoot }).toString().trim();
}

function getTargetFiles() {
  const all = process.argv.includes("--all");
  const files = all
    ? sh("git ls-files").split("\n")
    : sh("git diff --cached --name-only --diff-filter=ACM").split("\n");

  return files
    .filter(Boolean)
    .filter((f) => IMAGE_EXT_RE.test(f))
    .filter((f) => !SKIP_DIR_RE.test(f))
    .filter((f) => existsSync(path.join(repoRoot, f)));
}

function freeWebpPath(abs) {
  const base = abs.replace(IMAGE_EXT_RE, "");
  let candidate = `${base}.webp`;
  let n = 2;
  while (existsSync(candidate)) {
    candidate = `${base}-${n}.webp`;
    n += 1;
  }
  return candidate;
}

async function convertToWebp(relPath) {
  const abs = path.join(repoRoot, relPath);
  const webpAbs = freeWebpPath(abs);
  const webpRel = path.relative(repoRoot, webpAbs);

  await sharp(abs).webp({ quality: 82 }).toFile(webpAbs);
  unlinkSync(abs);

  return { oldRel: relPath, newRel: webpRel };
}

function rewriteReferences(oldRel, newRel) {
  const oldBase = path.basename(oldRel);
  const newBase = path.basename(newRel);

  // Only touch tracked text files, skip binaries/lockfiles.
  const candidates = sh("git ls-files")
    .split("\n")
    .filter(Boolean)
    .filter((f) => !SKIP_DIR_RE.test(f))
    .filter((f) => !IMAGE_EXT_RE.test(f))
    .filter((f) => !/\.(webp|lock|lockb|ico|svg|woff2?|ttf|otf|pdf)$/i.test(f))
    .filter((f) => existsSync(path.join(repoRoot, f)));

  const changed = [];
  for (const file of candidates) {
    const abs = path.join(repoRoot, file);
    let text;
    try {
      text = readFileSync(abs, "utf8");
    } catch {
      continue;
    }
    if (!text.includes(oldBase)) continue;

    const updated = text.split(oldBase).join(newBase);
    if (updated !== text) {
      writeFileSync(abs, updated);
      changed.push(file);
    }
  }
  return changed;
}

async function main() {
  const targets = getTargetFiles();
  if (targets.length === 0) {
    return;
  }

  console.log(`Converting ${targets.length} image(s) to .webp...`);
  const converted = [];
  for (const relPath of targets) {
    const result = await convertToWebp(relPath);
    if (result) converted.push(result);
  }

  const touchedFiles = new Set();
  for (const { oldRel, newRel } of converted) {
    console.log(`  ${oldRel} -> ${newRel}`);
    for (const f of rewriteReferences(oldRel, newRel)) touchedFiles.add(f);
  }

  if (converted.length === 0) return;

  const toAdd = [
    ...converted.map((c) => c.newRel),
    ...converted.map((c) => c.oldRel),
    ...touchedFiles,
  ];
  sh(`git add -- ${toAdd.map((f) => `"${f}"`).join(" ")}`);

  if (touchedFiles.size > 0) {
    console.log(`Updated references in: ${[...touchedFiles].join(", ")}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
