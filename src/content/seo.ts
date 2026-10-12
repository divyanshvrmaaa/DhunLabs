// ─── PAGE TITLES & DESCRIPTIONS (Google, WhatsApp/Instagram link previews) ──
// Every page on the site is listed here. The build turns this list into the
// page titles, Google descriptions, share images, breadcrumbs and the sitemap.
// Keep titles under 60 characters and descriptions under 155 where possible.

export interface Crumb {
  name: string;
  path: string;
}

export interface PageSeo {
  path: string;
  title: string;
  description: string;
  /** Share image (1200×630) shown by WhatsApp/Instagram. Defaults to OG_IMAGE. */
  ogImage?: string;
  /** Breadcrumb trail after "Home". The last item is this page. */
  crumbs?: Crumb[];
  /** Tools only: the name used in Google's WebApplication data. */
  app?: string;
}

export const SITE_URL = "https://dhunlabs.studio";
export const OG_IMAGE = "/og-image.jpg";

export const crumbs = {
  tools: { name: "Tools", path: "/tools" },
  work: { name: "Work", path: "/work" },
  services: { name: "Services", path: "/services" },
  playlists: { name: "Playlists", path: "/playlists" },
  learn: { name: "Learn", path: "/learn" },
} satisfies Record<string, Crumb>;

const staticPages: PageSeo[] = [
  {
    path: "/",
    title: "DhunLabs — Music Growth Agency for Independent Artists",
    description:
      "We make streams hit different. Meta ads, a bot-free Spotify playlist network and free education that grow real listeners for independent artists in India.",
  },

  // ── Tools ──
  {
    path: "/tools",
    title: "Free Music Marketing Tools for Artists | DhunLabs",
    description:
      "Free tools for independent artists in India: a budget planner, a Spotify cost estimator, a royalty calculator and a cost-per-stream checker.",
    crumbs: [crumbs.tools],
  },
  {
    path: "/planner",
    title: "Music Promotion Budget Planner (Free) | DhunLabs",
    description:
      "Enter your music promotion budget and get an honest plan with an estimated Spotify stream range, based on our real campaigns. Free, no sign-up.",
    ogImage: "/og/planner.jpg",
    crumbs: [crumbs.tools, { name: "Campaign Planner", path: "/planner" }],
    app: "Music Promotion Budget Planner",
  },
  {
    path: "/estimator",
    title: "Spotify Promotion Cost Estimator (Free) | DhunLabs",
    description:
      "How much does it cost to get 10,000 Spotify streams or YouTube views in India? Enter your goal and see an estimated budget range. Free and instant.",
    ogImage: "/og/estimator.jpg",
    crumbs: [crumbs.tools, { name: "Stream Estimator", path: "/estimator" }],
    app: "Spotify Promotion Cost Estimator",
  },
  {
    path: "/tools/revenue-calculator",
    title: "Spotify & YouTube Royalty Calculator India | DhunLabs",
    description:
      "Estimate what Spotify, YouTube, JioSaavn and Instagram streams earn for Indian or global listeners, after your distributor's cut and splits.",
    ogImage: "/og/revenue-calculator.jpg",
    crumbs: [crumbs.tools, { name: "Streaming Revenue Calculator", path: "/tools/revenue-calculator" }],
    app: "Spotify & YouTube Royalty Calculator (India)",
  },
  {
    path: "/tools/cost-per-stream",
    title: "Cost Per Stream Calculator for Music Ads | DhunLabs",
    description:
      "Enter what you spent and the streams you got. See your cost per stream, how it compares with our campaigns, and when cheap streams are a red flag.",
    ogImage: "/og/cost-per-stream.jpg",
    crumbs: [crumbs.tools, { name: "Cost-Per-Stream Checker", path: "/tools/cost-per-stream" }],
    app: "Cost Per Stream Calculator for Music Ads",
  },

  // ── Playlists ──
  {
    path: "/playlists",
    title: "Spotify Playlists by DhunLabs | Punjabi, Indie & Hindi Rap",
    description:
      "Explore the DhunLabs Spotify playlist network: Punjabi bangers, indie rock, late-night indie and Hindi rap. Bot-free playlists. Submit your track for review.",
    crumbs: [crumbs.playlists],
  },
];

export const pages: PageSeo[] = [...staticPages];

export const notFoundSeo: PageSeo = {
  path: "/404",
  title: "Page not found | DhunLabs",
  description: "This page doesn't exist. Head back to DhunLabs.",
};

export function seoFor(path: string): PageSeo {
  return pages.find((p) => p.path === path) ?? notFoundSeo;
}
