// Runs after `vite build` (browser) and `vite build --ssr` (pre-renderer).
// 1. Writes an HTML file for every page in src/content/seo.ts with that page's
//    own title, description, share tags and structured data (WhatsApp/Google
//    read these without running JS), and the page's content pre-rendered,
//    so text appears before JavaScript loads.
// 2. Writes shell.html (no pre-rendered content) for unknown URLs → 404 page.
// 3. Writes sitemap.xml (every page, with the build date as lastmod).
// 4. Lists any "[TODO" markers left in the pages, so nothing ships by accident.
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const template = await readFile(path.join(dist, "index.html"), "utf8");
const { render, pages, notFoundSeo, SITE_URL, OG_IMAGE, jsonLdFor } = await import(
  pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href
);

/** Pages whose content depends on today's date (or similar) are rendered in the browser only. Add paths here if needed. */
const NO_PRERENDER = new Set([]);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
// JSON-LD inside <script>: escape "<" so text can never close the tag early
const ldJson = (o) => JSON.stringify(o).replace(/</g, "\\u003c");

function renderMeta(page, { structuredData = true } = {}) {
  const url = page.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${page.path}`;
  const image = `${SITE_URL}${page.ogImage ?? OG_IMAGE}`;
  let html = template
    .replace(/<title>.*?<\/title>/s, `<title>${esc(page.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(page.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(page.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(page.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${image}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(page.title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(page.description)}$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${image}$2`);
  if (page.ogImage) html = html.replace(/(<meta property="og:image:alt" content=")[^"]*(")/, `$1${esc(page.title)}$2`);

  if (structuredData) {
    for (const ld of jsonLdFor(page)) {
      html = html.replace("</head>", `    <script type="application/ld+json">${ldJson(ld)}</script>\n  </head>`);
    }
  }
  return html;
}

const todos = [];
for (const page of pages) {
  let html = renderMeta(page);
  if (!NO_PRERENDER.has(page.path)) {
    const body = await render(page.path);
    html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  }
  const found = html.match(/\[TODO[^\]]*\]/g);
  if (found) todos.push(`${page.path}: ${[...new Set(found)].join(" · ")}`);
  // "/" → index.html, "/tools/cost-per-stream" → tools/cost-per-stream.html (Vercel cleanUrls serves it at /tools/cost-per-stream)
  const file = page.path === "/" ? path.join(dist, "index.html") : path.join(dist, `${page.path}.html`);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
}

// Fallback for unknown URLs (Vercel rewrites them here): no pre-rendered content.
await writeFile(
  path.join(dist, "shell.html"),
  renderMeta({ ...notFoundSeo, path: "/" }, { structuredData: false })
    .replace(/<link rel="canonical"[^>]*>\n?\s*/, "")
    .replace("<head>", '<head>\n    <meta name="robots" content="noindex" />'),
);
await rm(path.join(root, "dist-ssr"), { recursive: true, force: true });

const today = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages
    .map((p) => `  <url><loc>${SITE_URL}${p.path === "/" ? "/" : p.path}</loc><lastmod>${today}</lastmod><priority>${p.path === "/" ? "1.0" : "0.8"}</priority></url>`)
    .join("\n") +
  `\n</urlset>\n`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap);

console.log(`postbuild: ${pages.length} pages (${pages.length - NO_PRERENDER.size} pre-rendered) + shell.html + sitemap.xml`);
if (todos.length) console.log(`postbuild: ${todos.length} page(s) still have TODO markers:\n  ${todos.join("\n  ")}`);
