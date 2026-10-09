// ─── PAGE TITLES & DESCRIPTIONS (Google, WhatsApp/Instagram link previews) ──
// Keep this file free of imports: the build script reads it directly.

export interface PageSeo {
  path: string;
  title: string;
  description: string;
}

export const SITE_URL = "https://dhunlabs.studio";
export const OG_IMAGE = "/og-image.jpg";

export const pages: PageSeo[] = [
  {
    path: "/",
    title: "DhunLabs — Music Growth Agency for Independent Artists",
    description:
      "We make streams hit different. Meta ads, a bot-free Spotify playlist network and free education that grow real listeners for independent artists in India.",
  },
  {
    path: "/playlists",
    title: "Spotify Playlists by DhunLabs | Punjabi, Indie & Hindi Rap",
    description:
      "Explore the DhunLabs Spotify playlist network: Punjabi bangers, indie rock, late-night indie and Hindi rap. Bot-free playlists. Submit your track for review.",
  },
  {
    path: "/planner",
    title: "Free Campaign Planner for Independent Artists | DhunLabs",
    description:
      "Enter your promotion budget and get an honest campaign plan with an estimated stream range, based on our recent campaigns. Free, instant and no sign-up.",
  },
  {
    path: "/estimator",
    title: "Spotify Stream Estimator: Budget for Your Goal | DhunLabs",
    description:
      "How much does it cost to get 10,000 Spotify streams or YouTube views? Enter your goal and see an estimated budget range and the right plan. Free and instant.",
  },
  {
    path: "/tools",
    title: "Free Music Marketing Tools for Independent Artists | DhunLabs",
    description:
      "Free tools for independent artists: campaign planner, stream estimator, release roadmap, playlist-readiness checker, cost-per-stream checker and pitch writer.",
  },
  {
    path: "/tools/release-roadmap",
    title: "Free Music Release Roadmap & Checklist | DhunLabs",
    description:
      "Pick your release date and get a dated checklist from six weeks before release to four weeks after, including your Spotify pitch. Add it to your calendar.",
  },
  {
    path: "/tools/playlist-readiness",
    title: "Is Your Song Playlist-Ready? Free Checker | DhunLabs",
    description:
      "Answer 10 quick questions and get a playlist-readiness score out of 10, a clear verdict and specific fixes before you pitch your song to Spotify playlists.",
  },
  {
    path: "/tools/cost-per-stream",
    title: "Cost Per Stream Calculator for Music Ads | DhunLabs",
    description:
      "Enter what you spent and the streams you got to see your cost per stream, how it compares with typical campaign results, and when cheap streams are a red flag.",
  },
  {
    path: "/tools/pitch-writer",
    title: "Free Spotify Pitch Writer for Artists | DhunLabs",
    description:
      "Fill in a few short fields and get a clean Spotify for Artists editorial pitch with a live character counter. Copy it straight into your pitch form. Free.",
  },
  {
    path: "/tools/revenue-calculator",
    title: "Streaming Revenue Calculator (India & Global) | DhunLabs",
    description:
      "Estimate what your Spotify, YouTube, JioSaavn, Apple Music and Amazon streams earn for Indian or global listeners, after your distributor's cut and splits.",
  },
];

export const notFoundSeo: PageSeo = {
  path: "/404",
  title: "Page not found | DhunLabs",
  description: "This page doesn't exist. Head back to DhunLabs.",
};

export function seoFor(path: string): PageSeo {
  return pages.find((p) => p.path === path) ?? notFoundSeo;
}
