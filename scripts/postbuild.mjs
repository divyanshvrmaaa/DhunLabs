// Runs after `vite build`.
// 1. Writes a copy of index.html for every page with that page's own title,
//    description and share tags (WhatsApp/Google read these without running JS).
// 2. Writes sitemap.xml.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { pages, SITE_URL } from "../src/content/seo.ts";

const dist = path.resolve(import.meta.dirname, "..", "dist");
const template = await readFile(path.join(dist, "index.html"), "utf8");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function render(page) {
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
  return html;
}

for (const page of pages) {
  const html = render(page);
  if (page.path === "/") {
    await writeFile(path.join(dist, "index.html"), html);
  } else {
    const dir = path.join(dist, page.path);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "index.html"), html);
  }
}

const today = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages
    .map((p) => `  <url><loc>${SITE_URL}${p.path === "/" ? "/" : p.path}</loc><lastmod>${today}</lastmod><priority>${p.path === "/" ? "1.0" : "0.8"}</priority></url>`)
    .join("\n") +
  `\n</urlset>\n`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap);

console.log(`postbuild: ${pages.length} pages + sitemap.xml`);
