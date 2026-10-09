import { describe, expect, it } from "vitest";
import { calculateRevenue, formatMoney, per1000, platformsFor, rateFor } from "./royalties";
import { platforms, USD_TO_INR } from "../content/royalties";

const base = { audience: "india" as const, indiaShare: 70, distributorKeep: 100, youtubeExtraCut: 0, ownership: 100 };
const get = (id: string) => platforms.find((p) => p.id === id)!;

describe("streaming revenue calculator", () => {
  it("matches the measured Indian statement (Apr–Jun 2026) within rounding", () => {
    // 32,479 Spotify streams paid ₹1,760.48 before the distributor's share
    const r = calculateRevenue({ ...base, streams: { spotify: 32479 } });
    expect(r.totals.gross.typical).toBeGreaterThan(1760.48 * 0.97);
    expect(r.totals.gross.typical).toBeLessThan(1760.48 * 1.03);
    // 3,549 YouTube units paid ₹87.71
    const y = calculateRevenue({ ...base, streams: { youtube: 3549 } });
    expect(y.totals.gross.typical).toBeGreaterThan(87.71 * 0.95);
    expect(y.totals.gross.typical).toBeLessThan(87.71 * 1.05);
    // With an 85% split, take-home is 85% of gross
    const k = calculateRevenue({ ...base, distributorKeep: 85, streams: { spotify: 32479 } });
    expect(k.totals.you.typical).toBeCloseTo(r.totals.gross.typical * 0.85, 6);
  });

  it("distributor keep %, ownership and the extra YouTube cut", () => {
    const r = calculateRevenue({ ...base, distributorKeep: 91, ownership: 50, youtubeExtraCut: 20, streams: { spotify: 1000, youtube: 1000 } });
    const sp = r.rows.find((x) => x.id === "spotify")!;
    expect(sp.distributor.typical).toBeCloseTo(sp.gross.typical * 0.09, 9);
    expect(sp.you.typical).toBeCloseTo(sp.gross.typical * 0.91 * 0.5, 9);
    const yt = r.rows.find((x) => x.id === "youtube")!;
    expect(yt.you.typical).toBeCloseTo(yt.gross.typical * 0.91 * 0.8 * 0.5, 9);
    const t = r.totals;
    expect(t.you.typical + t.others.typical + t.distributor.typical).toBeCloseTo(t.gross.typical, 9);
  });

  it("mix blends India and global rates", () => {
    const sp = get("spotify");
    expect(rateFor(sp, "mix", 70).typical).toBeCloseTo(0.7 * sp.india!.typical + 0.3 * sp.global!.typical, 12);
  });

  it("hides platforms without data for an audience; mix falls back to the side that has data", () => {
    expect(platformsFor("india").map((p) => p.id)).not.toContain("tidal");
    expect(platformsFor("global").map((p) => p.id)).toContain("tidal");
    expect(platformsFor("global").map((p) => p.id)).not.toContain("meta");
    expect(platformsFor("mix").map((p) => p.id)).toContain("meta");
    expect(rateFor(get("tidal"), "mix", 70)).toEqual(get("tidal").global);
    expect(rateFor(get("meta"), "mix", 70)).toEqual(get("meta").india);
  });

  it("formats money", () => {
    expect(formatMoney(100000, "INR")).toBe("₹1,00,000");
    expect(formatMoney(67.76, "INR")).toBe("₹67.76");
    expect(formatMoney(USD_TO_INR * 2500, "USD")).toBe("$2,500");
    expect(formatMoney(0, "INR")).toBe("₹0");
    expect(per1000(0.00056, "INR")).toBe("₹54");
    expect(per1000(0.0035, "USD")).toBe("$3.50");
  });
});
