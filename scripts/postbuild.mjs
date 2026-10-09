// Runs after `vite build` (browser) and `vite build --ssr` (pre-renderer).
// 1. Writes an HTML file for every page with that page's own title,
//    description and share tags (WhatsApp/Google read these without running JS)
//    and the page's content pre-rendered, so text appears before JavaScript loads.
// 2. Writes shell.html (no pre-rendered content) for unknown URLs → 404 page.
// 3. Writes sitemap.xml.
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { pages, notFoundSeo, SITE_URL } from "../src/content/seo.ts";
import { faqs } from "../src/content/faq.ts";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const template = await readFile(path.join(dist, "index.html"), "utf8");
const { render } = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);

/** Pages whose content depends on today's date (or similar) are rendered in the browser only. Add paths here if needed. */
const NO_PRERENDER = new Set([]);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function renderMeta(page) {
  const url = page.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${page.path}`;
  let html = template
    .replace(/<title>.*?<\/title>/s, `<title>${esc(page.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(page.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(page.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(page.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(page.title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(page.description)}$2`);

  // Tools get WebApplication structured data
  if (page.path === "/planner" || page.path === "/estimator" || page.path.startsWith("/tools/")) {
    const ld = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: page.title.split("|")[0].trim(),
      url,
      description: page.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any (web browser)",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      publisher: { "@id": `${SITE_URL}/#org` },
    };
    html = html.replace("</head>", `    <script type="application/ld+json">${JSON.stringify(ld)}</script>\n  </head>`);
  }
  // Home page: tell Google about the FAQ
  if (page.path === "/") {
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    };
    html = html.replace("</head>", `    <script type="application/ld+json">${JSON.stringify(faqLd)}</script>\n  </head>`);
  }
  return html;
}

for (const page of pages) {
  let html = renderMeta(page);
  if (!NO_PRERENDER.has(page.path)) {
    const body = await render(page.path);
    html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  }
  // "/" → index.html, "/tools/cost-per-stream" → tools/cost-per-stream.html (Vercel cleanUrls serves it at /tools/cost-per-stream)
  const file = page.path === "/" ? path.join(dist, "index.html") : path.join(dist, `${page.path}.html`);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
}

// Fallback for unknown URLs (Vercel rewrites them here): no pre-rendered content.
await writeFile(path.join(dist, "shell.html"), renderMeta({ ...notFoundSeo, path: "/" }).replace(/<link rel="canonical"[^>]*>\n?\s*/, "").replace("<head>", '<head>\n    <meta name="robots" content="noindex" />'));
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
