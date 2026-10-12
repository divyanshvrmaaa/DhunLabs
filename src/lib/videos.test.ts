import { describe, expect, it } from "vitest";
import { formatDate, isoDuration, videos } from "../content/videos";
import { parseSrt, transcriptFor } from "./transcripts";

describe("video data", () => {
  it("converts YouTube durations to ISO 8601", () => {
    expect(isoDuration("35:45")).toBe("PT35M45S");
    expect(isoDuration("7:31")).toBe("PT7M31S");
    expect(isoDuration("1:02:03")).toBe("PT1H2M3S");
    expect(isoDuration("10:00")).toBe("PT10M");
  });
  it("formats dates the same everywhere", () => {
    expect(formatDate("2026-07-30")).toBe("30 Jul 2026");
  });
  it("has unique ids and slugs, valid dates and 4-6 takeaways", () => {
    expect(new Set(videos.map((v) => v.id)).size).toBe(videos.length);
    expect(new Set(videos.map((v) => v.slug)).size).toBe(videos.length);
    for (const v of videos) {
      expect(v.id).toMatch(/^[\w-]{11}$/);
      expect(v.slug).toMatch(/^[a-z0-9-]+$/);
      expect(v.published).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(v.duration).toMatch(/^(\d+:)?\d{1,2}:\d{2}$/);
      expect(v.takeaways.length).toBeGreaterThanOrEqual(4);
      expect(v.takeaways.length).toBeLessThanOrEqual(6);
    }
  });
});

describe("transcripts", () => {
  it("keeps .srt text exactly and drops only cue numbers", () => {
    const srt = "1\n00:00:01,000 --> 00:00:03,000\nNamaste dosto, aaj hum baat karenge\n\n2\n00:01:02,500 --> 00:01:04,000\nMeta ads ke baare mein\n";
    expect(parseSrt(srt)).toEqual([
      { time: "00:00:01", text: "Namaste dosto, aaj hum baat karenge" },
      { time: "00:01:02", text: "Meta ads ke baare mein" },
    ]);
  });
  it("returns null when there is no transcript file", () => {
    expect(transcriptFor("no-such-id")).toBeNull();
  });
});
