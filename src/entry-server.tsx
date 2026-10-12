// Build-time pre-renderer: turns each route into HTML so text shows before JavaScript loads.
import { StrictMode } from "react";
import { prerender } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./App";

// The build script (scripts/postbuild.mjs) reads the page list and structured data from here.
export { pages, notFoundSeo, SITE_URL, OG_IMAGE } from "./content/seo";
export { jsonLdFor } from "./lib/structuredData";

export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  );
  return new Response(prelude).text();
}
