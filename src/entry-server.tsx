// Build-time pre-renderer: turns each route into HTML so text shows before JavaScript loads.
import { StrictMode } from "react";
import { prerender } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./App";

// The build script (scripts/postbuild.mjs) reads the page list and structured data from here.
export { pages, notFoundSeo, SITE_URL, OG_IMAGE } from "./content/seo";
export { jsonLdFor } from "./lib/structuredData";

function app(url: string) {
  return (
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>
  );
}

/**
 * By default React moves big blocks of content (and pages whose code is still
 * loading) into a hidden block at the end of the HTML, then a script moves them
 * into place. We want every word sitting where it belongs in the HTML the server
 * sends, so: a warm-up pass loads each page's code, and progressiveChunkSize is
 * set high so nothing gets moved out of place.
 */
const options = { progressiveChunkSize: Number.MAX_SAFE_INTEGER };

export async function render(url: string): Promise<string> {
  await prerender(app(url), options).then(({ prelude }) => new Response(prelude).text());
  const { prelude } = await prerender(app(url), options);
  return new Response(prelude).text();
}
