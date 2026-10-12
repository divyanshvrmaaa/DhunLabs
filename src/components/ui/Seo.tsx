import { useEffect } from "react";
import { OG_IMAGE, SITE_URL, seoFor, type PageSeo } from "../../content/seo";

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (el) el.setAttribute(attr, value);
}

/** Updates the page title, description, canonical and share tags for the current route. */
export function Seo({ path, override }: { path: string; override?: PageSeo }) {
  useEffect(() => {
    const page = override ?? seoFor(path);
    const url = `${SITE_URL}${page.path === "/" ? "/" : page.path}`;
    const image = `${SITE_URL}${page.ogImage ?? OG_IMAGE}`;
    document.title = page.title;
    setMeta('meta[name="description"]', "content", page.description);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:title"]', "content", page.title);
    setMeta('meta[property="og:description"]', "content", page.description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:image"]', "content", image);
    setMeta('meta[name="twitter:title"]', "content", page.title);
    setMeta('meta[name="twitter:description"]', "content", page.description);
    setMeta('meta[name="twitter:image"]', "content", image);
  }, [path, override]);
  return null;
}
