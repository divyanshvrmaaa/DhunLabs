// Checks the built site in dist/ (run `npm run build` first, then `npm run check`).
// For every page: exactly one <h1>, a unique title (< 60 chars) and description
// (< 155 chars), a canonical URL matching the page, JSON-LD that parses, and
// internal links that point to real pages (including #section anchors).
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const dist = path.resolve(import.meta.dirname, "..", "dist");
const SITE = "https://dhunlabs.studio";

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const files = (await walk(dist)).filter((f) => f.endsWith(".html") && !f.endsWith("shell.html"));
const pages = new Map(); // path → html
for (const f of files) {
  const rel = path.relative(dist, f).replace(/\.html$/, "");
  pages.set(rel === "index" ? "/" : `/${rel}`, await readFile(f, "utf8"));
}

const problems = [];
const warn = [];
const titles = new Map();
const descs = new Map();
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

async function exists(p) {
  if (pages.has(p)) return true;
  try {
    return (await stat(path.join(dist, p))).isFile();
  } catch {
    return false;
  }
}

for (const [p, html] of pages) {
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) problems.push(`${p}: ${h1} <h1> tags (want exactly 1)`);
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? "");
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const canon = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (!title) problems.push(`${p}: no title`);
  if ([...title].length > 60) warn.push(`${p}: title is ${[...title].length} chars: ${title}`);
  if (!desc) problems.push(`${p}: no description`);
  if ([...desc].length > 155) problems.push(`${p}: description is ${[...desc].length} chars`);
  if (titles.has(title)) problems.push(`${p}: same title as ${titles.get(title)}`);
  if (descs.has(desc)) problems.push(`${p}: same description as ${descs.get(desc)}`);
  titles.set(title, p);
  descs.set(desc, p);
  const want = p === "/" ? `${SITE}/` : `${SITE}${p}`;
  if (canon !== want) problems.push(`${p}: canonical is ${canon}, want ${want}`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      problems.push(`${p}: JSON-LD does not parse (${e.message})`);
    }
  }
  // Internal links
  const body = html.slice(html.indexOf("<body"));
  for (const m of body.matchAll(/href="([^"]+)"/g)) {
    const href = decode(m[1]);
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    const [beforeHash, hash] = href.split("#");
    const target = (beforeHash.split("?")[0] || p).replace(/\/$/, "") || "/";
    if (!(await exists(target))) {
      problems.push(`${p}: broken link → ${href}`);
      continue;
    }
    if (hash && pages.has(target) && !pages.get(target).includes(`id="${hash}"`)) problems.push(`${p}: link → ${href} but #${hash} is not on that page`);
  }
}

console.log(`Checked ${pages.size} pages.`);
if (warn.length) console.log(`\nWarnings (${warn.length}):\n  ${warn.join("\n  ")}`);
if (problems.length) {
  console.log(`\nProblems (${problems.length}):\n  ${[...new Set(problems)].join("\n  ")}`);
  process.exit(1);
}
console.log("No problems found.");
