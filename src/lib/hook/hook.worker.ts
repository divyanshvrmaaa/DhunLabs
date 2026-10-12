// Runs the Hook Finder analysis off the main thread, so the page never freezes.
import { analyse, SongTooShortError } from "./analysis";

type Post = (msg: unknown, transfer?: Transferable[]) => void;
const post: Post = (msg, transfer = []) => (self as unknown as { postMessage: Post }).postMessage(msg, transfer);

self.onmessage = (e: MessageEvent<{ samples: Float32Array; sampleRate: number; clipSeconds: number }>) => {
  const { samples, sampleRate, clipSeconds } = e.data;
  let lastSent = -1;
  try {
    const result = analyse(samples, sampleRate, clipSeconds, (p) => {
      if (p - lastSent >= 0.02 || p === 1) {
        lastSent = p;
        post({ type: "progress", p });
      }
    });
    post({ type: "done", result }, [result.peaks.buffer]);
  } catch (err) {
    post({ type: "error", message: err instanceof SongTooShortError ? err.message : "Something went wrong while analysing the song." });
  }
};
