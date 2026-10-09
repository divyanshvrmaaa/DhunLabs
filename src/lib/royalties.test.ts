import { describe, expect, it } from "vitest";
import { calculateRevenue, formatMoney, per1000, platformsFor, rateFor } from "./royalties";
import { platforms, USD_TO_INR } from "../content/royalties";

const base = { audience: "india" as const, indiaShare: 70, distributorKeep: 100, contentIdCut: 20, ownership: 100 };
const spotify = platforms.find((p) => p.id === "spotify")!;

describe("streaming revenue calculator", () => {
  it("1,00,000 Spotify streams from India, keep 100%", () => {
    const r = calculateRevenue({ ...base, streams: { spotify: 100000 } });
    expect(r.totals.you.typical).toBeCloseTo(100000 * 0.0007 * USD_TO_INR, 6); // ≈ ₹6,776
    expect(r.totals.you.low).toBeCloseTo(100000 * 0.0004 * USD_TO_INR, 6);
    expect(r.totals.distributor.typical).toBe(0);
  });

  it("distributor keep %, ownership and the separate Content ID cut", () => {
    const r = calculateRevenue({ ...base, distributorKeep: 91, ownership: 50, contentIdCut: 20, streams: { spotify: 1000, youtubeVideos: 1000 } });
    const sp = r.rows.find((x) => x.id === "spotify")!;
    expect(sp.distributor.typical).toBeCloseTo(sp.gross.typical * 0.09, 9);
    expect(sp.you.typical).toBeCloseTo(sp.gross.typical * 0.91 * 0.5, 9);
    expect(sp.others.typical).toBeCloseTo(sp.gross.typical * 0.91 * 0.5, 9);
    const yt = r.rows.find((x) => x.id === "youtubeVideos")!;
    expect(yt.distributor.typical).toBeCloseTo(yt.gross.typical * 0.2, 9);
    // Everything adds back up to the gross
    const t = r.totals;
    expect(t.you.typical + t.others.typical + t.distributor.typical).toBeCloseTo(t.gross.typical, 9);
  });

  it("mix blends India and global rates", () => {
    const r = rateFor(spotify, "mix", 70);
    expect(r.typical).toBeCloseTo(0.7 * 0.0007 + 0.3 * 0.0035, 12);
  });

  it("India mode hides services not available in India; global-only services use global rates in mix", () => {
    expect(platformsFor("india").map((p) => p.id)).not.toContain("tidal");
    expect(platformsFor("global").map((p) => p.id)).toContain("tidal");
    const tidal = platforms.find((p) => p.id === "tidal")!;
    expect(rateFor(tidal, "mix", 70)).toEqual(tidal.global);
  });

  it("formats money", () => {
    expect(formatMoney(100000, "INR")).toBe("₹1,00,000");
    expect(formatMoney(67.76, "INR")).toBe("₹67.76");
    expect(formatMoney(USD_TO_INR * 2500, "USD")).toBe("$2,500");
    expect(formatMoney(0, "INR")).toBe("₹0");
    expect(per1000(0.0007, "INR")).toBe("₹68");
    expect(per1000(0.0035, "USD")).toBe("$3.50");
  });
});
