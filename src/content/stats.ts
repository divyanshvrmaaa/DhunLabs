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
    // 22,958 + 21,138 + 17,935 + 3,687 = 65,718 followers (read from Spotify 26 Oct 2026)
    value: 65,
    suffix: "K+",
    label: "combined followers across our 4 Spotify playlists",
    note: "22,958 + 21,138 + 17,935 + 3,687 · as of Oct 2026",
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
