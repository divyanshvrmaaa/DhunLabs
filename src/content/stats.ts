// ─── PROOF STRIP NUMBERS (home page, under the hero) ────────────────────────
// All values as of Oct 2026. "value" is the number that counts up;
// "prefix"/"suffix" wrap it (e.g. "~" and "K").

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Decimal places while counting (e.g. 1 for "1.5"). */
  decimals?: number;
  label: string;
  note: string;
}

export const stats: Stat[] = [
  {
    value: 25,
    prefix: "~",
    suffix: "K",
    label: "monthly listeners for a Punjabi artist in 30 days, starting from zero",
    note: "Harman Sohi campaign · as of Oct 2026",
  },
  {
    // 20,955 + 19,844 + 16,318 + 3,699 = 60,816 followers (7 Oct 2026)
    value: 60,
    suffix: "K+",
    label: "combined followers across our 4 Spotify playlists",
    note: "20,955 + 19,844 + 16,318 + 3,699 · as of 7 Oct 2026",
  },
  {
    value: 500,
    suffix: "K+",
    label: "streams managed",
    note: "as of Oct 2026",
  },
  {
    // Total Meta + Google ad spend across all campaigns (Divyansh, Oct 2026)
    value: 1.5,
    decimals: 1,
    prefix: "₹",
    suffix: "L+",
    label: "ad spend managed across our campaigns",
    note: "Meta and Google ads, all campaigns · as of Oct 2026",
  },
  {
    value: 100,
    suffix: "%",
    label: "bot-free: no botted playlists, ever",
    note: "as of Oct 2026",
  },
];

/** Keywords that scroll in the bar under the proof strip. */
export const marqueeExtras = [
  "Meta Ads",
  "Spotify Playlisting",
  "YouTube Growth",
  "Hook-First Ad Creatives",
  "Conversion Tracking",
  "Bot-Free Playlists",
  "Algorithmic Streams",
  "Release Campaigns",
  "Punjabi · Desi Hip Hop · Indie · Pop",
  "Independent Artists",
];
