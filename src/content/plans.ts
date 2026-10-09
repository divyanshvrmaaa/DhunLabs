// ─── PLAN DESCRIPTIONS (Campaign Planner & Stream Estimator results) ─────────
import type { PlanId } from "../lib/estimate";

export const plans: Record<PlanId, { name: string; reason: string; includes: string[] }> = {
  playlisting: {
    name: "Spotify Playlisting",
    reason: "At this budget, the best value is getting your track in front of playlist listeners who already love your sound.",
    includes: [
      "We personally review your track for the playlist that best fits your sound",
      "Every playlist in our network is bot-free",
      "Placement is considered, not guaranteed",
    ],
  },
  combined: {
    name: "Meta Ads + Playlisting",
    reason: "At this budget, ads and playlists work together: ads find new listeners, and playlists keep them streaming.",
    includes: [
      "A Meta ad campaign built from 3 to 5 vertical clips of your song (you provide them)",
      "Your song added to our playlists, so ads and playlists boost each other",
      "Conversion tracking on every step",
      "A strategy call before launch",
    ],
  },
};

export const customPlanLine = "For bigger budgets, we'll build a custom plan with you on a call.";
export const otherPlatformsNote =
  "Want Instagram, Apple Music, JioSaavn or another platform? Mention it in the contact form and we'll quote it separately.";
export const youtubeSeparateNote = "YouTube views run as a separate campaign. Mention it in the contact form and we'll include it.";

export const songStatusOptions = [
  { value: "released", label: "Already released" },
  { value: "soon", label: "Releasing in under 30 days" },
  { value: "later", label: "Later" },
] as const;
export type SongStatus = (typeof songStatusOptions)[number]["value"];
