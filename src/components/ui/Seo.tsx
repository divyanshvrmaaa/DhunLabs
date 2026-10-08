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
    document.title = page.title;
    setMeta('meta[name="description"]', "content", page.description);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:title"]', "content", page.title);
    setMeta('meta[property="og:description"]', "content", page.description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:image"]', "content", `${SITE_URL}${OG_IMAGE}`);
    setMeta('meta[name="twitter:title"]', "content", page.title);
    setMeta('meta[name="twitter:description"]', "content", page.description);
  }, [path, override]);
  return null;
}
