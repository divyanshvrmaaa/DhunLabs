// ─── PLAN DESCRIPTIONS (Campaign Planner & Stream Estimator results) ─────────
import type { PlanId } from "../lib/estimate";

export const plans: Record<PlanId, { name: string; reason: string; includes: string[] }> = {
  playlisting: {
    name: "Spotify Playlisting",
    reason: "At this budget, the best value is putting your track in front of a playlist audience that already loves your sound.",
    includes: [
      "Your track is personally reviewed and considered for the playlist that best matches your sound",
      "Our playlists are bot-free",
      "Placement is considered, not guaranteed",
    ],
  },
  combined: {
    name: "Meta Ads + Playlisting (combined)",
    reason: "At this budget, ads and playlists work together: ads find new listeners, playlists keep them streaming.",
    includes: [
      "A Meta ad campaign built from vertical clips you provide (have 3 to 5 vertical clips of your song ready)",
      "Your song added to our playlists so ads and playlist work together",
      "Conversion tracking end to end",
      "A strategy call",
    ],
  },
};

export const customPlanLine = "For larger budgets we'll shape a custom plan on a call.";
export const otherPlatformsNote =
  "Looking for Instagram, Apple Music, JioSaavn or something else? Mention it in the contact form and we'll quote it separately.";
export const youtubeSeparateNote = "YouTube views run as a separate campaign. Mention it in the contact form and we'll include it.";

export const songStatusOptions = [
  { value: "released", label: "Already released" },
  { value: "soon", label: "Releasing in under 30 days" },
  { value: "later", label: "Later" },
] as const;
export type SongStatus = (typeof songStatusOptions)[number]["value"];
