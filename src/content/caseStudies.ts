// ─── CASE STUDIES ("The Numbers Don't Lie.") ────────────────────────────────
// All data is Divyansh's own, dated 7 Oct 2026. Numbers are real; only the framing is chosen.
// Any field set to null is hidden on the page automatically.

export const workIntro = {
  eyebrow: "Work",
  title: "The Numbers Don't Lie.",
  footer: "More campaigns are live right now. We don't publish client lists, to protect our artists' data.",
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

/** Video case study shown right after the featured campaign. */
export const experiment = {
  label: "Open experiment",
  title: "₹15,000 to grow a Spotify playlist from scratch",
  body: "We invested ₹15,000 to grow a Spotify playlist from zero, then published everything: the raw data, the backend analytics and the conversion maths. Watch it before you spend a rupee on playlist promotion.",
  points: ["The raw campaign data", "The backend analytics", "The conversion maths, step by step"],
  video: { id: "_buZHdVwI1E", label: "Watch the experiment", url: "https://www.youtube.com/watch?v=_buZHdVwI1E" },
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
  /** Service colour: meta = blue, youtube = yellow, playlist = green. */
  tone: "meta" | "youtube" | "playlist";
}

const META_METRIC = "Metric: tracked visits (Meta Pixel ViewContent)";

export const receipts: Receipt[] = [
  {
    id: "playlist-engine",
    tag: "Receipt A",
    title: "Our own playlist engine",
    big: "1.82M",
    bigLabel: "people reached",
    facts: [
      { value: "3.78M", label: "impressions" },
      { value: "29,501", label: "tracked visits" },
      { value: "₹1.53", label: "per tracked visit" },
      { value: "~20.9K", label: "playlist followers now" },
    ],
    context: "How we grew our Punjabi playlist Ki Scene Aa? with about ₹45,200 of Meta ads.",
    metricNote: META_METRIC,
    size: "large",
    tone: "meta",
  },
  {
    // 31,558 + 16,244 = 47,802 results for ₹24,964 + ₹18,088 = ₹43,052 (avg ₹0.90)
    id: "ad-cost",
    tag: "Receipt B",
    title: "Ads that don't burn money",
    big: "47,802",
    bigLabel: "tracked visits from two campaigns",
    facts: [
      { value: "₹0.79", label: "lowest cost per visit" },
      { value: "₹0.90", label: "average cost per visit" },
      { value: "₹43,052", label: "total spend" },
    ],
    context: "Two playlist-promotion campaigns on Meta.",
    metricNote: META_METRIC,
    size: "large",
    tone: "meta",
  },
  {
    id: "youtube-views",
    tag: "Receipt C",
    title: "YouTube views at scale",
    big: "1,92,372",
    bigLabel: "YouTube views in 8 weeks",
    facts: [
      { value: "₹0.16", label: "average per view" },
      { value: "1.15M", label: "impressions" },
      { value: "₹31,057", label: "spent" },
    ],
    context: "Google Ads video campaigns, 11 Aug to 7 Oct 2026.",
    metricNote: null,
    size: "large",
    tone: "youtube",
  },
];

export const receiptsAsOf = "Data as of Oct 2026";
