// ─── PAGE TITLES & DESCRIPTIONS (Google, WhatsApp/Instagram link previews) ──
// Every page on the site is listed here. The build turns this list into the
// page titles, Google descriptions, share images, breadcrumbs and the sitemap.
// Keep titles under 60 characters and descriptions under 155 where possible.
//
// Playlist pages and video pages are added automatically from playlists.ts and
// videos.ts, so you never list those here by hand.

import { playlists } from "./playlists";
import { videos } from "./videos";
import { formatNumber } from "../lib/format";

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
    title: "DhunLabs | Music Growth Agency for Independent Artists",
    description:
      "We make streams hit different. Meta ads, a bot-free Spotify playlist network and free education that grow real listeners for independent artists in India.",
  },

  // ── Tools ──
  {
    path: "/tools",
    title: "Free Music Marketing Tools for Artists | DhunLabs",
    description:
      "Free tools for independent artists in India: Hook Finder, budget planner, Spotify cost estimator, royalty calculator and cost-per-stream checker.",
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

  {
    path: "/tools/hook-finder",
    title: "Hook Finder: Find Your Song's Best Ad Clip | DhunLabs",
    description:
      "Upload a song, get the 3 strongest 15 or 30-second sections to cut as Instagram and Meta ad clips. Runs in your browser; nothing is uploaded.",
    ogImage: "/og/hook-finder.jpg",
    crumbs: [crumbs.tools, { name: "Hook Finder", path: "/tools/hook-finder" }],
    app: "Hook Finder",
  },

  // ── Playlists ──
  {
    path: "/playlists",
    title: "Spotify Playlists by DhunLabs | Punjabi, Indie & Hindi Rap",
    description:
      "Explore the DhunLabs Spotify playlists: Punjabi bangers, indie rock, late-night indie and Hindi rap. All bot-free. Submit your track for review.",
    crumbs: [crumbs.playlists],
  },

  // ── Forms ──
  {
    path: "/contact",
    title: "Book a Strategy Audit | DhunLabs",
    description:
      "Tell us about your music and your next release, and we'll WhatsApp you to set up a short strategy call. Meta ads and Spotify playlisting for artists.",
    crumbs: [{ name: "Book a Strategy Audit", path: "/contact" }],
  },
  {
    path: "/submit-track",
    title: "Submit Your Track for Playlist Review | DhunLabs",
    description:
      "Send your song to the DhunLabs playlist network. Every track is heard by a person and considered for the playlist that fits. Bot-free, never guaranteed.",
    crumbs: [{ name: "Submit Your Track", path: "/submit-track" }],
  },

  // ── Work ──
  {
    path: "/work",
    title: "Our Work: Music Campaign Results | DhunLabs",
    description:
      "Real, dated results from our music campaigns: the Harman Sohi case study, a ₹15,000 playlist experiment and receipts from our own Meta and Google Ads.",
    crumbs: [crumbs.work],
  },
  {
    path: "/work/harman-sohi",
    title: "Harman Sohi Case Study: 0 to 25K Listeners | DhunLabs",
    description:
      "How Punjabi artist Harman Sohi went from 0 to about 25K monthly Spotify listeners in 30 days: hook-first Meta ads, tracking and playlist placement.",
    crumbs: [crumbs.work, { name: "Harman Sohi", path: "/work/harman-sohi" }],
  },

  // ── Services ──
  {
    path: "/services",
    title: "Music Promotion Services for Artists in India | DhunLabs",
    description:
      "Meta ad campaigns, a bot-free Spotify playlist network and free education for independent artists in India. No bots, no guarantees, honest estimates.",
    crumbs: [crumbs.services],
  },
  {
    path: "/services/meta-ads",
    title: "Meta Ads for Music Promotion in India | DhunLabs",
    description:
      "Instagram and Facebook ads built around your song's hook, with conversion tracking on every step. See our receipts and what to prepare.",
    crumbs: [crumbs.services, { name: "Meta Ads", path: "/services/meta-ads" }],
  },
  {
    path: "/services/spotify-playlisting",
    title: "Spotify Playlist Promotion, Bot-Free | DhunLabs",
    description:
      "How our Spotify playlist review works: every track heard by a person, considered for the one best-fit playlist. Bot-free, never guaranteed.",
    crumbs: [crumbs.services, { name: "Spotify Playlisting", path: "/services/spotify-playlisting" }],
  },
];

/** Adds the optional ending only if the description stays within 155 characters. */
const fit155 = (main: string, extra: string) => ([...(main + extra)].length <= 155 ? main + extra : main);

const playlistPages: PageSeo[] = playlists.map((p) => ({
  path: `/playlists/${p.slug}`,
  title: `${p.h1.length <= 46 ? p.h1 : p.name} | DhunLabs`,
  description: fit155(`${p.name}: a bot-free Spotify playlist of ${p.mood}. ${formatNumber(p.followers)} followers as of 7 Oct 2026.`, " Submit your track."),
  crumbs: [crumbs.playlists, { name: p.name, path: `/playlists/${p.slug}` }],
}));

const videoPages: PageSeo[] = videos.map((v) => ({
  path: `/learn/${v.slug}`,
  title: v.seoTitle ?? `${v.title} | DhunLabs`,
  description: v.seoDescription ?? v.hook,
  ogImage: `/og/video-${v.id}.jpg`,
  crumbs: [crumbs.learn, { name: v.title, path: `/learn/${v.slug}` }],
}));

const learnPages: PageSeo[] = [
  {
    path: "/learn",
    title: "Learn Music Marketing: Free Video Lessons | DhunLabs",
    description:
      "Free music marketing lessons in Hindi: Meta ads for songs, the Spotify Popularity Index, campaign breakdowns and experiments. English summaries.",
    crumbs: [crumbs.learn],
  },
  ...videoPages,
];

export const pages: PageSeo[] = [...staticPages, ...playlistPages, ...learnPages];

export const notFoundSeo: PageSeo = {
  path: "/404",
  title: "Page not found | DhunLabs",
  description: "This page doesn't exist. Head back to DhunLabs.",
};

export function seoFor(path: string): PageSeo {
  return pages.find((p) => p.path === path) ?? notFoundSeo;
}
