// ─── CASE STUDIES ("The Numbers Don't Lie.") ────────────────────────────────
// All data is Divyansh's own, dated 7 Oct 2026.
// Any field set to null is hidden on the page automatically.

export const workIntro = {
  eyebrow: "Work",
  title: "The Numbers Don't Lie.",
  footer: "More campaigns are running right now. We don't publish client rosters; we protect client data.",
};

export const featuredCase = {
  label: "Featured campaign",
  title: "Harman Sohi: 0 → ~25K monthly listeners in 30 days",
  artist: "Harman Sohi",
  descriptor: "Punjabi independent artist",
  start: { value: "0", label: "monthly listeners at the start" },
  result: { value: "~25K", label: "monthly listeners within 30 days" },
  method: [
    "Meta ads built around the track's hook",
    "Conversion tracking on every step",
    "Placement in our playlist network",
  ],
  /** Path to a photo in /public/images, e.g. "/images/harman.webp". null = hidden. */
  artistPhoto: null as string | null,
  /** Harman's Spotify artist link. null = hidden. */
  spotifyArtistUrl: null as string | null,
  /** A short quote from Harman. null = hidden. */
  quote: null as string | null,
  breakdown: {
    label: "Watch the full breakdown",
    url: "https://www.youtube.com/watch?v=VA5XiZy0GCw",
  },
  asOf: "Data as of Oct 2026",
};

export interface Receipt {
  id: string;
  tag: string;
  title: string;
  /** The big headline number. */
  big: string;
  bigLabel: string;
  /** Smaller supporting figures. */
  facts: { value: string; label: string }[];
  context: string;
  metricNote: string | null;
  size: "large" | "small";
}

const META_METRIC = "Metric: tracked visits (Meta Pixel ViewContent)";

export const receipts: Receipt[] = [
  {
    id: "playlist-engine",
    tag: "Receipt A",
    title: "Our own playlist engine",
    big: "₹1.53",
    bigLabel: "per tracked visit",
    facts: [
      { value: "29,501", label: "tracked visits" },
      { value: "3.78M", label: "impressions" },
      { value: "1.82M", label: "reach" },
      { value: "~20.9K", label: "playlist followers now" },
    ],
    context: "Ki Scene Aa? (Punjabi playlist): about ₹45,200 of Meta spend.",
    metricNote: META_METRIC,
    size: "large",
  },
  {
    id: "ad-cost",
    tag: "Receipt B",
    title: "Ad cost that doesn't bleed",
    big: "₹0.79",
    bigLabel: "per result",
    facts: [
      { value: "31,558", label: "results at ₹0.79 (₹24,964 spent)" },
      { value: "16,244", label: "results at ₹1.11 (₹18,088 spent)" },
    ],
    context: "Playlist-promotion campaigns on Meta.",
    metricNote: META_METRIC,
    size: "large",
  },
  {
    id: "youtube-views",
    tag: "Receipt C",
    title: "YouTube video-view campaigns",
    big: "₹0.16",
    bigLabel: "average per view",
    facts: [
      { value: "1,92,372", label: "views" },
      { value: "₹31,057", label: "spent" },
      { value: "1.15M", label: "impressions" },
    ],
    context: "Google Ads, 11 Aug to 7 Oct 2026.",
    metricNote: null,
    size: "large",
  },
  {
    id: "education",
    tag: "Receipt D",
    title: "Education that sells",
    big: "5.8K",
    bigLabel: "views in the last 28 days",
    facts: [
      { value: "261", label: "watch hours" },
      { value: "280", label: "subscribers" },
    ],
    context: "YouTube @DhunLabsNetwork, mostly inbound leads.",
    metricNote: null,
    size: "small",
  },
];

export const receiptsAsOf = "Data as of Oct 2026";
