// Google structured data (JSON-LD) for each page. The build script puts these
// into the <head> of every pre-rendered page.
import { SITE_URL, type PageSeo } from "../content/seo";
import { faqs } from "../content/faq";

const abs = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

export function jsonLdFor(page: PageSeo): object[] {
  const out: object[] = [];

  if (page.app) {
    out.push({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: page.app,
      url: abs(page.path),
      description: page.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      publisher: { "@id": `${SITE_URL}/#org` },
    });
  }

  if (page.crumbs && page.crumbs.length > 0) {
    const trail = [{ name: "Home", path: "/" }, ...page.crumbs];
    out.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: trail.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.path) })),
    });
  }

  // Home page: the FAQ section
  if (page.path === "/") {
    out.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }

  return out;
}
