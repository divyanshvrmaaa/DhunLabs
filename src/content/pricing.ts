// ─── PRICING MODEL (internal) ────────────────────────────────────────────────
// These numbers drive the Campaign Planner, Stream Estimator and the
// Cost-Per-Stream Checker. NONE of them are shown to visitors as text:
// visitors only ever see the estimates the tools produce.
//
// Source data (Divyansh, Oct 2026):
//   ₹5,000  → about 5,000 streams
//   ₹10,000 → 12,000 to 15,000 streams
//   ₹25,000 → 30,000 to 40,000 streams
// A straight-line (piecewise linear) model runs through those points.
// "Rate" = streams per ₹1.
//
// IMPORTANT, update when you have more data:
//   • Below ₹5,000 the rate stays at 1.0 (no data there yet).
//   • Above ₹25,000 the rates stay flat at 1.2 (low) and 1.6 (high).
//     We have no data past ₹25,000, so we do NOT extrapolate upward.

/** Budget (₹) at or above which the recommended plan becomes Meta Ads + Playlisting. Internal only, never rendered. */
export const ADS_THRESHOLD = 15000;

/** Rate points for the LOW estimate: [budget, streams per ₹1]. Straight lines between points, flat outside. */
export const RATE_LOW_POINTS: [number, number][] = [
  [5000, 1.0],
  [10000, 1.2],
];

/** Rate points for the HIGH estimate. */
export const RATE_HIGH_POINTS: [number, number][] = [
  [5000, 1.0],
  [10000, 1.5],
  [25000, 1.6],
];

// YouTube views (Google Ads, 11 Aug to 7 Oct 2026)
/** Cheapest cost per view seen (in-stream ads), ₹. */
export const YT_CPV_LOW = 0.11;
/** Most expensive cost per view seen (in-feed ads), ₹. */
export const YT_CPV_HIGH = 0.21;
/** Average cost per view, ₹ (for reference). */
export const YT_CPV_AVG = 0.16;

// Campaign Planner settings
export const PLANNER_MIN = 2000;
export const PLANNER_MAX = 100000;
export const PLANNER_STEP = 500;
export const PLANNER_DEFAULT = 10000;
export const PLANNER_CHIPS = [5000, 10000, 15000, 25000, 50000];
/** Above this budget the planner adds "we'll shape a custom plan on a call". */
export const CUSTOM_PLAN_ABOVE = 50000;

// Stream Estimator settings
export const ESTIMATOR_MIN_STREAMS = 1000;
export const ESTIMATOR_DEFAULT_STREAMS = 10000;
export const STREAM_CHIPS = [5000, 10000, 25000, 50000, 100000];
export const VIEW_CHIPS = [5000, 10000, 25000, 50000, 100000];

// Cost-Per-Stream Checker
/** Our typical cost per stream range, ₹ (from the model above: ₹1 ÷ 1.6 to ₹1 ÷ 1.0). */
export const TYPICAL_CPS_LOW = 0.62;
export const TYPICAL_CPS_HIGH = 1.0;
/** Below this cost per stream, show the "suspiciously cheap" caution. */
export const SUSPICIOUS_CPS_BELOW = 0.3;
/** "Well above our range" starts at this multiple of TYPICAL_CPS_HIGH. */
export const EXPENSIVE_CPS_FACTOR = 1.5;
