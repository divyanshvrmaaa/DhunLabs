// ─── STREAMING REVENUE CALCULATOR: per-stream rates ─────────────────────────
// IMPORTANT: no platform publishes an official per-stream rate. Payouts come from
// a revenue pool split by stream share, so the real figure varies with the
// listener's country, free vs paid accounts and the month. These are estimates
// built from the sources below (checked 9 Oct 2026). Update them when better
// data arrives; the calculator shows a low–high range plus a "typical" value.
//
// Figures are USD per stream, for the RECORDING (master) side only, after the
// platform's own cut and BEFORE the distributor's cut. Songwriting/publishing
// royalties (e.g. IPRS in India) are extra and not included.
//
// How the India figures were set:
//   • Spotify India ≈ $0.0004–$0.0008 (StreamingCalculator country model 0.10×;
//     Chartlex and Loststories ≈ $0.0008).
//   • YouTube India from Dynamoi distributor data (late 2025): official audio /
//     Art Track ≈ $0.91–$1.08 per 1,000; Content ID ≈ $0.18 per 1,000.
//   • Apple Music / Amazon Music India: no direct data. Indian subscription prices
//     are roughly 1/8 of US prices (Apple Music ₹139/month, July 2026), so the
//     global range is scaled by ~0.10–0.15×. Lower confidence.
//   • JioSaavn: estimates cluster at $0.0006–$0.0013 (Soundcharts, Grootin).

export type PlatformId = "spotify" | "youtubeMusic" | "youtubeVideos" | "jiosaavn" | "apple" | "amazon" | "deezer" | "tidal";
export type Audience = "india" | "global" | "mix";

export interface Rate {
  low: number;
  typical: number;
  high: number;
}

export interface Platform {
  id: PlatformId;
  name: string;
  hint: string;
  /** "good" = several consistent sources; "limited" = few sources or scaled estimate. */
  confidence: { india: "good" | "limited" | null; global: "good" | "limited" };
  /** null = not really available to Indian listeners (hidden in "India" mode). */
  india: Rate | null;
  global: Rate;
  /** Uses the separate YouTube Content ID cut instead of the normal distributor cut. */
  contentId?: boolean;
}

export const platforms: Platform[] = [
  {
    id: "spotify",
    name: "Spotify",
    hint: "",
    confidence: { india: "good", global: "good" },
    india: { low: 0.0004, typical: 0.0007, high: 0.0008 },
    global: { low: 0.003, typical: 0.0035, high: 0.005 },
  },
  {
    id: "youtubeMusic",
    name: "YouTube Music",
    hint: "Your official audio / Art Tracks",
    confidence: { india: "good", global: "good" },
    india: { low: 0.0008, typical: 0.001, high: 0.0013 },
    global: { low: 0.0045, typical: 0.0056, high: 0.0078 },
  },
  {
    id: "youtubeVideos",
    name: "YouTube videos (Content ID)",
    hint: "Reels, covers and edits using your song",
    confidence: { india: "limited", global: "limited" },
    india: { low: 0.0001, typical: 0.00018, high: 0.0003 },
    global: { low: 0.0005, typical: 0.0009, high: 0.002 },
    contentId: true,
  },
  {
    id: "jiosaavn",
    name: "JioSaavn",
    hint: "",
    confidence: { india: "limited", global: "limited" },
    india: { low: 0.0005, typical: 0.0008, high: 0.001 },
    global: { low: 0.0006, typical: 0.001, high: 0.0013 },
  },
  {
    id: "apple",
    name: "Apple Music",
    hint: "",
    confidence: { india: "limited", global: "good" },
    india: { low: 0.0006, typical: 0.0009, high: 0.0012 },
    global: { low: 0.006, typical: 0.007, high: 0.01 },
  },
  {
    id: "amazon",
    name: "Amazon Music",
    hint: "",
    confidence: { india: "limited", global: "good" },
    india: { low: 0.0004, typical: 0.0007, high: 0.001 },
    global: { low: 0.004, typical: 0.006, high: 0.0088 },
  },
  {
    id: "deezer",
    name: "Deezer",
    hint: "",
    confidence: { india: null, global: "limited" },
    india: null,
    global: { low: 0.004, typical: 0.0055, high: 0.007 },
  },
  {
    id: "tidal",
    name: "Tidal",
    hint: "",
    confidence: { india: null, global: "limited" },
    india: null,
    global: { low: 0.0068, typical: 0.01, high: 0.013 },
  },
];

/** ₹ per US$ (XE mid-market, 8 Oct 2026). Update occasionally. */
export const USD_TO_INR = 96.8;
export const USD_TO_INR_AS_OF = "8 Oct 2026";

/** Default share of streams from India in "Mix" mode. */
export const DEFAULT_INDIA_SHARE = 70;

/** Spotify pays nothing for tracks under this many streams in the past 12 months (since April 2024). */
export const SPOTIFY_MIN_STREAMS = 1000;

export const distributorPresets: { label: string; keep: number; note: string }[] = [
  { label: "Keep 100%", keep: 100, note: "Flat yearly fee, e.g. DistroKid, TuneCore, Ditto" },
  { label: "Keep 91%", keep: 91, note: "e.g. CD Baby (takes 9%)" },
  { label: "Keep 85%", keep: 85, note: "Common for commission distributors" },
  { label: "Keep 80%", keep: 80, note: "Common for aggregators / small labels" },
  { label: "Keep 70%", keep: 70, note: "" },
];

/** Many flat-fee distributors still take a cut of YouTube Content ID (reported 10–20%). */
export const contentIdCutPresets = [0, 10, 15, 20, 30];
export const DEFAULT_CONTENT_ID_CUT = 20;

export const ownershipPresets = [100, 75, 50, 25];

export const royaltySources = [
  { label: "StreamingCalculator: What a stream paid in 2026 (rates and country tiers)", url: "https://streamingcalculator.com/blog/what-a-stream-paid-in-2026-report" },
  { label: "Duetti 2024 Music Economics Report (measured payouts)", url: "https://www.digitalmusicnews.com/2025/01/24/apple-music-royalty-rate-spotify-study/" },
  { label: "Chartlex: Spotify royalty rates by country 2026", url: "https://www.chartlex.com/blog/money/spotify-royalty-rates-by-country-2026" },
  { label: "Dynamoi: YouTube RPM in India (distributor data)", url: "https://dynamoi.com/learn/youtube-music-promotion/youtube-rpm-india" },
  { label: "Dynamoi: How much YouTube pays per 1,000 views for music", url: "https://dynamoi.com/learn/youtube-music-promotion/how-much-does-youtube-pay-per-1000-views-music" },
  { label: "Grootin: How much Indian artists earn from streaming (2026)", url: "https://www.grootin.in/university/how-much-do-indian-artists-earn-streaming" },
  { label: "Soundcharts: Streaming payouts by platform", url: "https://soundcharts.com/en/blog/music-streaming-rates-payouts" },
  { label: "MusicTech: Spotify's 1,000-stream royalty threshold", url: "https://musictech.com/news/industry/update-spotify-royalty-model-threshold-1000-streams/" },
  { label: "Business Today: Apple Music India price (July 2026)", url: "https://www.businesstoday.in/technology/news/story/apple-one-apple-music-gets-costlier-in-india-individual-plan-now-starts-at-543864-2026-07-20" },
];
