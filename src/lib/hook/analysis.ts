// Hook Finder analysis. Pure maths, no browser APIs, so it runs in a Web Worker
// (and in tests). Input: the song as mono samples at a low sample rate.
//
// In plain words:
//  1. Cut the song into short overlapping frames and measure, for each one,
//     its loudness, how much "new sound" starts (drum hits, note changes) and
//     which musical notes are playing (a 12-note "chroma" fingerprint).
//  2. Group frames into half-second blocks.
//  3. For every possible 15 s / 30 s window, score:
//       energy      – how loud it is
//       rhythm      – how many hits/onsets per second
//       repetition  – how closely the same notes come back somewhere else in
//                     the song (a repeated section is usually the chorus/hook)
//  4. Pick the 3 best windows that don't overlap, and nudge each start to just
//     before the energy lifts, because the first seconds of an ad matter most.

/** Sample rate the browser converts the song to before analysis. */
export const ANALYSIS_RATE = 11025;
/** Size of one block, in seconds. Windows move in steps of one block. */
export const BLOCK_SECONDS = 0.5;
/** How much each signal counts in a window's score (adds up to 1). */
export const WEIGHTS = { energy: 0.4, rhythm: 0.25, repetition: 0.35 };
/** How many suggestions to return. */
export const CANDIDATES = 3;
/** Only the first 15 minutes are analysed (longer files are rare and slow). */
export const MAX_SECONDS = 15 * 60;

const FRAME = 2048;
const HOP = 512;
const STACK = 4; // chroma blocks stacked together (2 s) when comparing sections

export interface HookCandidate {
  /** Rank, 1 = strongest. */
  rank: number;
  start: number;
  end: number;
  score: number;
  energy: number;
  rhythm: number;
  repetition: number;
  /** Start of the most similar other section, if it repeats. */
  repeatsAt: number | null;
  /** The start was moved to just before a lift in energy. */
  nudged: boolean;
  reasons: string[];
}

export interface AnalysisResult {
  duration: number;
  analysedSeconds: number;
  clipSeconds: number;
  candidates: HookCandidate[];
  /** Waveform outline: loudest point per column, 0–1. */
  peaks: Float32Array;
}

export class SongTooShortError extends Error {}

/** 72.4 → "1:12" (rounded down, so a clip never seems to start later than it does). */
export function formatTime(s: number): string {
  const t = Math.max(0, Math.floor(s + 1e-6));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}

// ── FFT (radix-2, in place) ──────────────────────────────────────────────────
function makeFft(n: number) {
  const levels = Math.log2(n);
  const rev = new Uint32Array(n);
  for (let i = 0; i < n; i++) {
    let r = 0;
    for (let b = 0; b < levels; b++) r |= ((i >> b) & 1) << (levels - 1 - b);
    rev[i] = r;
  }
  const cos = new Float64Array(n / 2);
  const sin = new Float64Array(n / 2);
  for (let i = 0; i < n / 2; i++) {
    cos[i] = Math.cos((2 * Math.PI * i) / n);
    sin[i] = Math.sin((2 * Math.PI * i) / n);
  }
  return (re: Float64Array, im: Float64Array) => {
    for (let i = 0; i < n; i++) {
      const j = rev[i];
      if (j > i) {
        let t = re[i];
        re[i] = re[j];
        re[j] = t;
        t = im[i];
        im[i] = im[j];
        im[j] = t;
      }
    }
    for (let size = 2; size <= n; size *= 2) {
      const half = size / 2;
      const step = n / size;
      for (let i = 0; i < n; i += size) {
        for (let j = 0, k = 0; j < half; j++, k += step) {
          const tre = re[i + j + half] * cos[k] + im[i + j + half] * sin[k];
          const tim = -re[i + j + half] * sin[k] + im[i + j + half] * cos[k];
          re[i + j + half] = re[i + j] - tre;
          im[i + j + half] = im[i + j] - tim;
          re[i + j] += tre;
          im[i + j] += tim;
        }
      }
    }
  };
}

/** Spreads values over 0–1 using the 5th–95th percentile (robust to outliers). */
function normalise(values: Float32Array): Float32Array {
  const sorted = Float32Array.from(values).sort();
  const lo = sorted[Math.floor(sorted.length * 0.05)];
  const hi = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))];
  const out = new Float32Array(values.length);
  if (!(hi - lo > 1e-6)) return out.fill(0.5);
  for (let i = 0; i < values.length; i++) out[i] = Math.min(1, Math.max(0, (values[i] - lo) / (hi - lo)));
  return out;
}

export function analyse(samples: Float32Array, sampleRate: number, clipSeconds: number, onProgress: (p: number) => void = () => {}): AnalysisResult {
  const duration = samples.length / sampleRate;
  const n = Math.min(samples.length, Math.floor(MAX_SECONDS * sampleRate));
  const analysedSeconds = n / sampleRate;
  const nBlocks = Math.floor(analysedSeconds / BLOCK_SECONDS);
  const L = Math.round(clipSeconds / BLOCK_SECONDS);
  if (nBlocks < L + 2) throw new SongTooShortError(`The song needs to be longer than ${clipSeconds + 1} seconds for ${clipSeconds}-second clips.`);

  // ── 1. Frame features ──
  const fft = makeFft(FRAME);
  const win = new Float64Array(FRAME);
  for (let i = 0; i < FRAME; i++) win[i] = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (FRAME - 1));
  const half = FRAME / 2;
  const binPc = new Int8Array(half).fill(-1);
  for (let k = 1; k < half; k++) {
    const f = (k * sampleRate) / FRAME;
    if (f >= 65 && f <= 2100) binPc[k] = (((Math.round(12 * Math.log2(f / 440)) + 69) % 12) + 12) % 12;
  }
  const fluxBins = Math.min(half, Math.round((5000 * FRAME) / sampleRate));
  const nFrames = Math.max(0, Math.floor((n - FRAME) / HOP) + 1);
  const power = new Float32Array(nFrames);
  const flux = new Float32Array(nFrames);
  const chroma = new Float32Array(nFrames * 12);
  const re = new Float64Array(FRAME);
  const im = new Float64Array(FRAME);
  const prev = new Float64Array(half);

  for (let f = 0; f < nFrames; f++) {
    const off = f * HOP;
    let sq = 0;
    for (let i = 0; i < FRAME; i++) {
      const x = samples[off + i];
      sq += x * x;
      re[i] = x * win[i];
      im[i] = 0;
    }
    power[f] = sq / FRAME;
    fft(re, im);
    let fl = 0;
    for (let k = 1; k < half; k++) {
      const mag = Math.hypot(re[k], im[k]) / half;
      if (k < fluxBins) {
        const lg = Math.log1p(1000 * mag);
        const d = lg - prev[k];
        if (d > 0 && f > 0) fl += d;
        prev[k] = lg;
      }
      const pc = binPc[k];
      if (pc >= 0) chroma[f * 12 + pc] += mag;
    }
    flux[f] = fl;
    if (f % 256 === 0) onProgress(0.55 * (f / nFrames));
  }

  // ── Onsets: peaks in the flux that stand out from their surroundings ──
  const W = Math.round((1.5 * sampleRate) / HOP);
  const pre = new Float64Array(nFrames + 1);
  let maxFlux = 0;
  for (let f = 0; f < nFrames; f++) {
    pre[f + 1] = pre[f] + flux[f];
    if (flux[f] > maxFlux) maxFlux = flux[f];
  }
  const isOnset = new Uint8Array(nFrames);
  let last = -10;
  for (let f = 1; f < nFrames - 1; f++) {
    if (!(flux[f] > flux[f - 1] && flux[f] >= flux[f + 1])) continue;
    const a = Math.max(0, f - W);
    const b = Math.min(nFrames, f + W + 1);
    const local = (pre[b] - pre[a]) / (b - a);
    if (flux[f] > 1.4 * local && flux[f] > 0.05 * maxFlux && f - last >= 2) {
      isOnset[f] = 1;
      last = f;
    }
  }

  // ── 2. Half-second blocks ──
  const bPow = new Float64Array(nBlocks);
  const bCount = new Uint32Array(nBlocks);
  const bOnsets = new Float32Array(nBlocks);
  const bChroma = new Float64Array(nBlocks * 12);
  for (let f = 0; f < nFrames; f++) {
    const t = (f * HOP + FRAME / 2) / sampleRate;
    const b = Math.floor(t / BLOCK_SECONDS);
    if (b >= nBlocks) break;
    bPow[b] += power[f];
    bCount[b]++;
    bOnsets[b] += isOnset[f];
    for (let c = 0; c < 12; c++) bChroma[b * 12 + c] += chroma[f * 12 + c];
  }
  const loud = new Float32Array(nBlocks);
  let maxLoud = -Infinity;
  for (let b = 0; b < nBlocks; b++) {
    loud[b] = 10 * Math.log10((bCount[b] ? bPow[b] / bCount[b] : 0) + 1e-12);
    if (loud[b] > maxLoud) maxLoud = loud[b];
  }
  const silent = new Uint8Array(nBlocks);
  for (let b = 0; b < nBlocks; b++) silent[b] = loud[b] < maxLoud - 35 ? 1 : 0;
  const onsetRate = new Float32Array(nBlocks);
  for (let b = 0; b < nBlocks; b++) onsetRate[b] = bOnsets[b] / BLOCK_SECONDS;

  // Chroma fingerprints: normalise, remove the song-wide average (so "same key" isn't "same section"), stack 2 s
  const cvec = new Float64Array(nBlocks * 12);
  const mean = new Float64Array(12);
  let voiced = 0;
  for (let b = 0; b < nBlocks; b++) {
    let s = 0;
    for (let c = 0; c < 12; c++) s += bChroma[b * 12 + c] ** 2;
    s = Math.sqrt(s);
    if (silent[b] || s < 1e-9) continue;
    voiced++;
    for (let c = 0; c < 12; c++) {
      cvec[b * 12 + c] = bChroma[b * 12 + c] / s;
      mean[c] += cvec[b * 12 + c];
    }
  }
  for (let c = 0; c < 12; c++) mean[c] /= Math.max(1, voiced);
  for (let b = 0; b < nBlocks; b++) {
    if (silent[b]) continue;
    let s = 0;
    for (let c = 0; c < 12; c++) {
      cvec[b * 12 + c] -= mean[c];
      s += cvec[b * 12 + c] ** 2;
    }
    s = Math.sqrt(s) || 1;
    for (let c = 0; c < 12; c++) cvec[b * 12 + c] /= s;
  }
  const D = STACK * 12;
  const vec = new Float64Array(nBlocks * D);
  for (let b = 0; b < nBlocks; b++) {
    let s = 0;
    for (let k = 0; k < STACK && b + k < nBlocks; k++)
      for (let c = 0; c < 12; c++) {
        const x = cvec[(b + k) * 12 + c];
        vec[b * D + k * 12 + c] = x;
        s += x * x;
      }
    s = Math.sqrt(s) || 1;
    for (let i = 0; i < D; i++) vec[b * D + i] /= s;
  }
  const sim = (a: number, b: number) => {
    let s = 0;
    for (let i = 0; i < D; i++) s += vec[a * D + i] * vec[b * D + i];
    return s > 0 ? s : 0;
  };

  // ── 3. Repetition: best match of each window against every other part of the song ──
  const nWin = nBlocks - L + 1;
  const rep = new Float32Array(nBlocks);
  const partner = new Int32Array(nBlocks).fill(-1);
  const P = new Float64Array(nBlocks + 1);
  for (let d = L; d <= nBlocks - L; d++) {
    const len = nBlocks - d;
    for (let t = 0; t < len; t++) P[t + 1] = P[t] + sim(t, t + d);
    for (let s = 0; s + L <= len; s++) {
      const v = (P[s + L] - P[s]) / L;
      if (v > rep[s]) {
        rep[s] = v;
        partner[s] = s + d;
      }
      if (v > rep[s + d]) {
        rep[s + d] = v;
        partner[s + d] = s;
      }
    }
    if (d % 16 === 0) onProgress(0.55 + 0.4 * ((d - L) / Math.max(1, nBlocks - 2 * L)));
  }

  // ── Window scores ──
  const eW = new Float32Array(nWin);
  const rW = new Float32Array(nWin);
  const pW = new Float32Array(nWin);
  const voicedFrac = new Float32Array(nWin);
  for (let s = 0; s < nWin; s++) {
    let e = 0;
    let r = 0;
    let v = 0;
    for (let k = 0; k < L; k++) {
      e += loud[s + k];
      r += onsetRate[s + k];
      v += silent[s + k] ? 0 : 1;
    }
    eW[s] = e / L;
    rW[s] = r / L;
    pW[s] = rep[s];
    voicedFrac[s] = v / L;
  }
  const E = normalise(eW);
  const R = normalise(rW);
  const Pn = normalise(pW);
  const score = new Float32Array(nWin);
  for (let s = 0; s < nWin; s++) score[s] = (WEIGHTS.energy * E[s] + WEIGHTS.rhythm * R[s] + WEIGHTS.repetition * Pn[s]) * voicedFrac[s];

  // ── 4. Pick the best windows that don't overlap ──
  const order = Array.from({ length: nWin }, (_, i) => i).sort((a, b) => score[b] - score[a]);
  const picks: number[] = [];
  const overlaps = (a: number, b: number) => a < b + L && b < a + L;
  for (const s of order) {
    if (picks.length >= CANDIDATES) break;
    if (picks.every((p) => !overlaps(s, p))) picks.push(s);
  }

  const candidates: HookCandidate[] = picks.map((s, i) => {
    // Nudge the start to half a second before the biggest lift in loudness nearby
    let start = s;
    let nudged = false;
    let best = 3; // dB
    for (let b = Math.max(1, s - 4); b <= Math.min(nBlocks - 1, s + 4); b++) {
      const jump = loud[b] - loud[b - 1];
      if (jump > best) {
        const ns = Math.min(nWin - 1, Math.max(0, b - 1));
        if (picks.every((p, j) => j === i || !overlaps(ns, p))) {
          best = jump;
          start = ns;
        }
      }
    }
    if (start !== s) nudged = true;
    const reasons: string[] = [];
    if (E[s] >= 0.7) reasons.push("One of the loudest, most energetic parts of the song");
    if (R[s] >= 0.7) reasons.push("Busy rhythm: lots of hits and changes");
    if (Pn[s] >= 0.6 && partner[s] >= 0) reasons.push(`Sounds like the section at ${formatTime(partner[s] * BLOCK_SECONDS)}, so it's likely the chorus or hook`);
    if (nudged) reasons.push("Starts just before the energy lifts, so the ad opens on the moment it lands");
    if (reasons.length === 0) reasons.push("A good balance of energy, rhythm and repetition");
    const startSec = start * BLOCK_SECONDS;
    return {
      rank: i + 1,
      start: startSec,
      end: Math.min(duration, startSec + clipSeconds),
      score: score[s],
      energy: E[s],
      rhythm: R[s],
      repetition: Pn[s],
      repeatsAt: partner[s] >= 0 ? partner[s] * BLOCK_SECONDS : null,
      nudged,
      reasons,
    };
  });

  // ── Waveform outline for drawing ──
  const cols = 1200;
  const peaks = new Float32Array(cols);
  const per = samples.length / cols;
  let pmax = 0;
  for (let c = 0; c < cols; c++) {
    let m = 0;
    const a = Math.floor(c * per);
    const b = Math.min(samples.length, Math.floor((c + 1) * per));
    for (let i = a; i < b; i++) {
      const x = Math.abs(samples[i]);
      if (x > m) m = x;
    }
    peaks[c] = m;
    if (m > pmax) pmax = m;
  }
  if (pmax > 0) for (let c = 0; c < cols; c++) peaks[c] /= pmax;

  onProgress(1);
  return { duration, analysedSeconds, clipSeconds, candidates, peaks };
}
