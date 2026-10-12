import { describe, expect, it } from "vitest";
import { analyse, ANALYSIS_RATE, formatTime, SongTooShortError, WEIGHTS } from "./analysis";
import { SYNTH_SECTIONS, synthSong } from "./synthSong";

const overlap = (a0: number, a1: number, b0: number, b1: number) => Math.max(0, Math.min(a1, b1) - Math.max(a0, b0));
const choruses = SYNTH_SECTIONS.filter((s) => s.name === "chorus");

describe("Hook Finder analysis on a synthetic song", () => {
  const song = synthSong(ANALYSIS_RATE);

  for (const clip of [15, 30]) {
    it(`finds the loud, repeated chorus (${clip}s clips)`, () => {
      const r = analyse(song, ANALYSIS_RATE, clip);
      // A 100 s test song only has room for 2 non-overlapping 30 s clips around its choruses
      expect(r.candidates.length).toBeGreaterThanOrEqual(clip === 15 ? 3 : 2);
      const [first, second] = r.candidates;
      // The top suggestion sits on a chorus
      const best = Math.max(...choruses.map((c) => overlap(first.start, first.end, c.from, c.to)));
      expect(best).toBeGreaterThanOrEqual(Math.min(clip, 15) * 0.85);
      // For 15 s clips the top two are the two choruses
      if (clip === 15) {
        const hit = choruses.map((c) => [first, second].some((k) => overlap(k.start, k.end, c.from, c.to) >= 12));
        expect(hit).toEqual([true, true]);
        expect(first.reasons.join(" ")).toMatch(/likely the chorus or hook/);
      }
      // Suggestions never overlap
      const sorted = [...r.candidates].sort((a, b) => a.start - b.start);
      for (let i = 1; i < sorted.length; i++) expect(sorted[i].start).toBeGreaterThanOrEqual(sorted[i - 1].end - 1e-9);
      // Nothing from the quiet intro ranks first
      expect(first.start).toBeGreaterThan(25);
      console.log(`${clip}s:`, r.candidates.map((c) => `#${c.rank} ${formatTime(c.start)}–${formatTime(c.end)} score ${c.score.toFixed(2)}`).join(" | "));
    });
  }

  it("refuses songs shorter than the clip", () => {
    expect(() => analyse(song.slice(0, ANALYSIS_RATE * 10), ANALYSIS_RATE, 15)).toThrow(SongTooShortError);
  });

  it("weights add up to 1", () => {
    expect(WEIGHTS.energy + WEIGHTS.rhythm + WEIGHTS.repetition).toBeCloseTo(1);
  });
});
