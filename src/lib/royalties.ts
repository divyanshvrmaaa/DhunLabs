// Maths for the Streaming Revenue Calculator. Rates live in src/content/royalties.ts.
import { platforms, USD_TO_INR, type Audience, type Platform, type PlatformId, type Rate } from "../content/royalties";

export interface RevenueInput {
  audience: Audience;
  /** % of streams from India (only used in "mix"). */
  indiaShare: number;
  streams: Partial<Record<PlatformId, number>>;
  /** % the artist keeps after the distributor (normal platforms). */
  distributorKeep: number;
  /** Extra % some distributors take on YouTube (Content ID), on top of the normal split. */
  youtubeExtraCut: number;
  /** % of the recording the artist owns (after producer/feature/label splits). */
  ownership: number;
}

export interface PlatformResult {
  id: PlatformId;
  name: string;
  streams: number;
  /** Effective USD per stream used. */
  rate: Rate;
  /** Gross before distributor, ₹. */
  gross: Rate;
  distributor: Rate;
  others: Rate;
  you: Rate;
}

export interface RevenueResult {
  rows: PlatformResult[];
  totals: { streams: number; gross: Rate; distributor: Rate; others: Rate; you: Rate };
}

const zero = (): Rate => ({ low: 0, typical: 0, high: 0 });
const map = (r: Rate, f: (n: number) => number): Rate => ({ low: f(r.low), typical: f(r.typical), high: f(r.high) });
const add = (a: Rate, b: Rate): Rate => ({ low: a.low + b.low, typical: a.typical + b.typical, high: a.high + b.high });

/** Platforms shown for an audience. India hides services not available there; Global hides those with no global data. */
export const platformsFor = (audience: Audience) =>
  platforms.filter((p) => (audience === "india" ? p.india !== null : audience === "global" ? p.global !== null : true));

/**
 * USD per stream for a platform and audience. Mix = weighted blend.
 * If one side has no data, the other side's rate is used for the whole mix.
 */
export function rateFor(p: Platform, audience: Audience, indiaShare: number): Rate {
  const india = p.india ?? p.global!;
  const global = p.global ?? p.india!;
  if (audience === "india") return india;
  if (audience === "global") return global;
  const w = Math.min(100, Math.max(0, indiaShare)) / 100;
  return {
    low: w * india.low + (1 - w) * global.low,
    typical: w * india.typical + (1 - w) * global.typical,
    high: w * india.high + (1 - w) * global.high,
  };
}

export function calculateRevenue(input: RevenueInput): RevenueResult {
  const own = Math.min(100, Math.max(0, input.ownership)) / 100;
  const rows: PlatformResult[] = [];
  let totals = { streams: 0, gross: zero(), distributor: zero(), others: zero(), you: zero() };

  for (const p of platformsFor(input.audience)) {
    const streams = Math.max(0, input.streams[p.id] ?? 0);
    if (!streams) continue;
    const rate = rateFor(p, input.audience, input.indiaShare);
    const baseKeep = Math.min(100, Math.max(0, input.distributorKeep)) / 100;
    const keep = p.extraCut ? baseKeep * (1 - Math.min(100, Math.max(0, input.youtubeExtraCut)) / 100) : baseKeep;
    const gross = map(rate, (r) => r * streams * USD_TO_INR);
    const afterDistributor = map(gross, (g) => g * keep);
    const distributor = map(gross, (g) => g * (1 - keep));
    const you = map(afterDistributor, (a) => a * own);
    const others = map(afterDistributor, (a) => a * (1 - own));
    rows.push({ id: p.id, name: p.name, streams, rate, gross, distributor, others, you });
    totals = {
      streams: totals.streams + streams,
      gross: add(totals.gross, gross),
      distributor: add(totals.distributor, distributor),
      others: add(totals.others, others),
      you: add(totals.you, you),
    };
  }
  return { rows, totals };
}

/** Money display: ₹ (Indian grouping) or $; paise/cents shown only for small amounts. */
export function formatMoney(inr: number, currency: "INR" | "USD"): string {
  const v = currency === "INR" ? inr : inr / USD_TO_INR;
  const sym = currency === "INR" ? "₹" : "$";
  const locale = currency === "INR" ? "en-IN" : "en-US";
  const digits = v !== 0 && Math.abs(v) < 100 ? 2 : 0;
  return sym + new Intl.NumberFormat(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(v);
}

/** Rate per 1,000 streams for display: whole rupees, or dollars to 2 decimals (these are estimates, not exact rates). */
export function per1000(usdPerStream: number, currency: "INR" | "USD"): string {
  const usd = usdPerStream * 1000;
  return currency === "INR" ? `₹${new Intl.NumberFormat("en-IN").format(Math.round(usd * USD_TO_INR))}` : `$${usd.toFixed(2)}`;
}
