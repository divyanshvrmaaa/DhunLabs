import { describe, expect, it } from "vitest";
import {
  budgetForStreams,
  budgetForViews,
  estimate,
  planForBudget,
  round100,
  streamsForBudget,
} from "./estimate";
import { formatINR, formatRange } from "./format";

// The table from section 11 of the build brief.
const budgetToStreams: [number, number, number][] = [
  [5000, 5000, 5000],
  [7500, 8200, 9400],
  [10000, 12000, 15000],
  [15000, 18000, 23000],
  [20000, 24000, 31300],
  [25000, 30000, 40000],
  [50000, 60000, 80000],
  [100000, 120000, 160000],
];

const streamsToBudget: [number, number, number][] = [
  [5000, 5000, 5000],
  [10000, 7800, 8700],
  [12000, 8700, 10000],
  [15000, 10000, 12500],
  [20000, 13100, 16700],
  [30000, 19200, 25000],
  [40000, 25000, 33300],
  [100000, 62500, 83300],
];

describe("budget → streams", () => {
  it.each(budgetToStreams)("₹%i → %i–%i streams", (budget, low, high) => {
    expect(streamsForBudget(budget)).toEqual({ low, high });
  });
});

describe("streams → budget", () => {
  it.each(streamsToBudget)("%i streams → ₹%i–₹%i", (streams, low, high) => {
    expect(budgetForStreams(streams)).toEqual({ low, high });
  });
});

describe("YouTube views → budget", () => {
  it("10,000 views → ₹1,100–₹2,100", () => {
    expect(budgetForViews(10000)).toEqual({ low: 1100, high: 2100 });
  });
  it("1,00,000 views → ₹11,000–₹21,000", () => {
    expect(budgetForViews(100000)).toEqual({ low: 11000, high: 21000 });
  });
});

describe("plan decision", () => {
  it("planner ₹14,999 → Spotify Playlisting", () => {
    expect(planForBudget(14999)).toBe("playlisting");
  });
  it("planner ₹15,000 → Meta Ads + Playlisting", () => {
    expect(planForBudget(15000)).toBe("combined");
  });
  it("estimator 10,000 streams (max ₹8,700) → Spotify Playlisting", () => {
    const r = estimate(10000, 0);
    expect(r.total.high).toBe(8700);
    expect(r.plan).toBe("playlisting");
  });
  it("estimator 20,000 streams (max ₹16,700) → Meta Ads + Playlisting", () => {
    const r = estimate(20000, 0);
    expect(r.total.high).toBe(16700);
    expect(r.plan).toBe("combined");
  });
  it("estimator adds YouTube to the total before deciding", () => {
    // 10,000 streams (max ₹8,700) + 1,00,000 views (max ₹21,000) = ₹29,700
    const r = estimate(10000, 100000);
    expect(r.total).toEqual({ low: 7800 + 11000, high: 8700 + 21000 });
    expect(r.plan).toBe("combined");
  });
});

describe("rounding and display", () => {
  it("rounds exact halves down and ignores float noise", () => {
    expect(round100(8250)).toBe(8200);
    expect(round100(7500 * 1.1)).toBe(8200);
    expect(round100(9375)).toBe(9400);
    expect(round100(8251)).toBe(8300);
  });
  it("formats Indian style with an en dash", () => {
    expect(formatINR(100000)).toBe("₹1,00,000");
    expect(formatRange(120000, 160000)).toBe("1,20,000–1,60,000");
    expect(formatRange(5000, 8700, true)).toBe("₹5,000–₹8,700");
  });
});
