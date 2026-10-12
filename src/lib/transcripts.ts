// Loads transcripts from src/content/transcripts/<video id>.txt or .srt at build time.
// Text is kept exactly as written; .srt files lose only their cue numbers.

const files = import.meta.glob("../content/transcripts/*.{txt,srt}", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

export interface TranscriptLine {
  time?: string;
  text: string;
}

export function parseSrt(raw: string): TranscriptLine[] {
  const out: TranscriptLine[] = [];
  for (const block of raw.replace(/\r/g, "").split(/\n\s*\n/)) {
    const lines = block.split("\n").filter((l) => l.trim() !== "");
    const timeIdx = lines.findIndex((l) => l.includes("-->"));
    if (timeIdx === -1) continue;
    const time = lines[timeIdx].split("-->")[0].trim().replace(/[,.]\d+$/, "");
    const text = lines.slice(timeIdx + 1).join(" ");
    if (text) out.push({ time, text });
  }
  return out;
}

/** The transcript for a video, or null if there isn't one. */
export function transcriptFor(id: string, fileName?: string): TranscriptLine[] | null {
  const names = fileName ? [fileName] : [`${id}.txt`, `${id}.srt`];
  for (const n of names) {
    const raw = files[`../content/transcripts/${n}`];
    if (raw == null || !raw.trim()) continue;
    if (n.endsWith(".srt")) return parseSrt(raw);
    return raw
      .replace(/\r/g, "")
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((text) => ({ text }));
  }
  return null;
}
