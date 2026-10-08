// The maths behind the Campaign Planner and Stream Estimator.
// Numbers live in src/content/pricing.ts; this file only does the calculation.
import {
  ADS_THRESHOLD,
  RATE_HIGH_POINTS,
  RATE_LOW_POINTS,
  YT_CPV_HIGH,
  YT_CPV_LOW,
} from "../content/pricing";

export type PlanId = "playlisting" | "combined";

/** Straight-line interpolation through the points, flat before the first and after the last. */
function interpolate(points: [number, number][], b: number): number {
  if (b <= points[0][0]) return points[0][1];
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i];
    if (b <= x1) {
      const [x0, y0] = points[i - 1];
      return y0 + ((y1 - y0) * (b - x0)) / (x1 - x0);
    }
  }
  return points[points.length - 1][1];
}

export const rateLow = (b: number) => interpolate(RATE_LOW_POINTS, b);
export const rateHigh = (b: number) => interpolate(RATE_HIGH_POINTS, b);
export const streamsLow = (b: number) => b * rateLow(b);
export const streamsHigh = (b: number) => b * rateHigh(b);

/** Find the budget where f(budget) = target. f only increases, so binary search is safe. */
function solve(f: (b: number) => number, target: number): number {
  let lo = 0;
  let hi = Math.max(target, 1); // every rate is >= 1, so the budget can never exceed the streams
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (f(mid) < target) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/**
 * Round to the nearest 100. An exact half rounds DOWN (8,250 → 8,200),
 * which keeps estimates on the cautious side. The tiny epsilon absorbs
 * floating-point noise such as 8250.000000000001.
 */
export function round100(x: number): number {
  return Math.max(0, Math.ceil(x / 100 - 0.5 - 1e-7) * 100);
}

export interface Range {
  low: number;
  high: number;
}

/** Budget → streams range (rounded to 100). */
export function streamsForBudget(budget: number): Range {
  return { low: round100(streamsLow(budget)), high: round100(streamsHigh(budget)) };
}

/** Budget → cost per stream range in ₹ (cheapest first). */
export function costPerStreamForBudget(budget: number): Range {
  if (budget <= 0) return { low: 0, high: 0 };
  return { low: budget / streamsHigh(budget), high: budget / streamsLow(budget) };
}

/** Streams wanted → budget range (rounded to 100). min uses the high estimate, max the low one. */
export function budgetForStreams(streams: number): Range {
  if (streams <= 0) return { low: 0, high: 0 };
  return { low: round100(solve(streamsHigh, streams)), high: round100(solve(streamsLow, streams)) };
}

/** YouTube views wanted → budget range (rounded to 100). */
export function budgetForViews(views: number): Range {
  if (views <= 0) return { low: 0, high: 0 };
  return { low: round100(views * YT_CPV_LOW), high: round100(views * YT_CPV_HIGH) };
}

/** Which plan a budget points to. */
export function planForBudget(budget: number): PlanId {
  return budget >= ADS_THRESHOLD ? "combined" : "playlisting";
}

export interface EstimatorResult {
  spotify: Range;
  youtube: Range;
  total: Range;
  plan: PlanId;
}

/** Streams and views wanted → budgets and plan. The plan uses the upper end of the total. */
export function estimate(streams: number, views: number): EstimatorResult {
  const spotify = budgetForStreams(streams);
  const youtube = budgetForViews(views);
  const total = { low: spotify.low + youtube.low, high: spotify.high + youtube.high };
  return { spotify, youtube, total, plan: planForBudget(total.high) };
}

/** Coarse bucket for analytics (never the exact budget). */
export function budgetBucket(budget: number): string {
  if (budget < 5000) return "<5k";
  if (budget < 10000) return "5k-10k";
  if (budget < 15000) return "10k-15k";
  if (budget < 25000) return "15k-25k";
  if (budget < 50000) return "25k-50k";
  return "50k+";
}
