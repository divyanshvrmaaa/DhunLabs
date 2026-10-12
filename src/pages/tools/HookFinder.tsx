import { useCallback, useEffect, useRef, useState } from "react";
import { ToolShell } from "../../components/tools/ToolShell";
import { CopyButton } from "../../components/tools/CopyButton";
import { ShareCard } from "../../components/tools/ShareCard";
import { Button } from "../../components/ui/Button";
import { ToolGuide, GuideJumpLinks } from "../../components/guide/ToolGuide";
import { hookFinderGuide } from "../../content/guides/hookFinder";
import { ANALYSIS_RATE, formatTime, type AnalysisResult, type HookCandidate } from "../../lib/hook/analysis";
import { encodeWav } from "../../lib/hook/wav";
import { downloadBlob } from "../../lib/shareCard";
import { shareUrl, useUrlInputs } from "../../lib/shareUrl";

const MAX_MB = 60;
const ACCEPT = ".mp3,.wav,.m4a,audio/mpeg,audio/wav,audio/x-wav,audio/wave,audio/mp4,audio/x-m4a,audio/aac";
const COLORS = ["#1db954", "#4c8dff", "#f5c842"]; // accent, meta, gold
type Status = "idle" | "decoding" | "analysing" | "done" | "error";

/** Decode the file, keep the full-quality audio for playback/download, and make a light mono copy for analysis. */
async function decode(file: File): Promise<{ full: AudioBuffer; mono: Float32Array }> {
  const bytes = await file.arrayBuffer();
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AC();
  try {
    const full = await ctx.decodeAudioData(bytes);
    const off = new OfflineAudioContext(1, Math.ceil(full.duration * ANALYSIS_RATE), ANALYSIS_RATE);
    const src = off.createBufferSource();
    src.buffer = full;
    src.connect(off.destination);
    src.start();
    const rendered = await off.startRendering();
    return { full, mono: rendered.getChannelData(0).slice() };
  } finally {
    ctx.close().catch(() => undefined);
  }
}

function Waveform({ result, playing, playhead }: { result: AnalysisResult; playing: number | null; playhead: number | null }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const draw = useCallback(() => {
    const c = ref.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const w = c.clientWidth;
    const h = c.clientHeight;
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
    const ctx = c.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);
    const x = (t: number) => (t / result.duration) * w;
    // Highlighted regions
    result.candidates.forEach((k, i) => {
      ctx.fillStyle = `${COLORS[i]}${playing === i ? "40" : "26"}`;
      ctx.fillRect(x(k.start), 0, Math.max(2, x(k.end) - x(k.start)), h);
      ctx.fillStyle = COLORS[i];
      ctx.fillRect(x(k.start), 0, 2, h);
      ctx.font = "600 12px 'DM Sans', system-ui, sans-serif";
      ctx.fillText(String(k.rank), x(k.start) + 5, 14);
    });
    // Waveform bars
    const bars = Math.max(60, Math.floor(w / 3));
    const per = result.peaks.length / bars;
    for (let b = 0; b < bars; b++) {
      let m = 0;
      for (let i = Math.floor(b * per); i < Math.floor((b + 1) * per); i++) m = Math.max(m, result.peaks[i]);
      const bh = Math.max(1.5, m * (h - 24));
      const t = ((b + 0.5) / bars) * result.duration;
      const inside = result.candidates.findIndex((k) => t >= k.start && t <= k.end);
      ctx.fillStyle = inside >= 0 ? COLORS[inside] : "rgba(242,239,233,0.35)";
      ctx.fillRect(b * (w / bars), (h + 12 - bh) / 2, Math.max(1, w / bars - 1), bh);
    }
    if (playhead !== null) {
      ctx.fillStyle = "#f2efe9";
      ctx.fillRect(x(playhead), 0, 2, h);
    }
  }, [result, playing, playhead]);

  useEffect(() => {
    draw();
    const ro = new ResizeObserver(draw);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [draw]);

  return (
    <canvas
      ref={ref}
      className="block h-36 w-full rounded-[var(--radius-md)] border border-line bg-surface-2 md:h-44"
      role="img"
      aria-label={`Waveform of your song with ${result.candidates.length} suggested sections: ${result.candidates.map((k) => `${formatTime(k.start)} to ${formatTime(k.end)}`).join(", ")}`}
    />
  );
}

export default function HookFinder() {
  const [clip, setClip] = useState<15 | 30>(15);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [dragging, setDragging] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);
  const [playhead, setPlayhead] = useState<number | null>(null);
  const fullRef = useRef<AudioBuffer | null>(null);
  const monoRef = useRef<Float32Array | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const audioRef = useRef<{ ctx: AudioContext; src: AudioBufferSourceNode | null; raf: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useUrlInputs((q) => {
    if (q.get("len") === "30") setClip(30);
  });

  const stop = useCallback(() => {
    const a = audioRef.current;
    if (a?.src) {
      a.src.onended = null;
      try {
        a.src.stop();
      } catch {
        /* already stopped */
      }
      a.src = null;
    }
    if (a) cancelAnimationFrame(a.raf);
    setPlaying(null);
    setPlayhead(null);
  }, []);

  // Clean up on leaving the page
  useEffect(
    () => () => {
      stop();
      workerRef.current?.terminate();
      audioRef.current?.ctx.close().catch(() => undefined);
    },
    [stop],
  );

  const runAnalysis = useCallback((len: 15 | 30) => {
    const mono = monoRef.current;
    if (!mono) return;
    workerRef.current?.terminate();
    const worker = new Worker(new URL("../../lib/hook/hook.worker.ts", import.meta.url), { type: "module" });
    workerRef.current = worker;
    setStatus("analysing");
    setProgress(0);
    setError("");
    worker.onmessage = (e: MessageEvent) => {
      const m = e.data as { type: "progress"; p: number } | { type: "done"; result: AnalysisResult } | { type: "error"; message: string };
      if (m.type === "progress") setProgress(m.p);
      else if (m.type === "done") {
        setResult(m.result);
        setStatus("done");
        worker.terminate();
      } else {
        setError(m.message);
        setStatus("error");
        worker.terminate();
      }
    };
    worker.onerror = () => {
      setError("Your browser couldn't run the analysis. Try an up-to-date Chrome, Safari or Firefox.");
      setStatus("error");
    };
    const copy = mono.slice();
    worker.postMessage({ samples: copy, sampleRate: ANALYSIS_RATE, clipSeconds: len }, [copy.buffer]);
  }, []);

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    stop();
    setResult(null);
    setError("");
    const okType = /\.(mp3|wav|m4a)$/i.test(file.name) || /^audio\/(mpeg|wav|x-wav|wave|mp4|x-m4a|aac)$/.test(file.type);
    if (!okType) {
      setStatus("error");
      setError("Please choose an MP3, WAV or M4A file.");
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setStatus("error");
      setError(`That file is ${(file.size / 1024 / 1024).toFixed(0)} MB. Please use a file under ${MAX_MB} MB (an MP3 export works well).`);
      return;
    }
    setFileName(file.name);
    setStatus("decoding");
    setProgress(0);
    try {
      const { full, mono } = await decode(file);
      fullRef.current = full;
      monoRef.current = mono;
      runAnalysis(clip);
    } catch {
      setStatus("error");
      setError("Your browser couldn't read this file. Try exporting it as an MP3 or WAV.");
    }
  };

  const changeClip = (len: 15 | 30) => {
    setClip(len);
    stop();
    if (monoRef.current) runAnalysis(len);
  };

  const play = async (i: number, k: HookCandidate) => {
    if (playing === i) return stop();
    stop();
    const full = fullRef.current;
    if (!full) return;
    if (!audioRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioRef.current = { ctx: new AC(), src: null, raf: 0 };
    }
    const a = audioRef.current;
    await a.ctx.resume();
    const src = a.ctx.createBufferSource();
    src.buffer = full;
    src.connect(a.ctx.destination);
    const t0 = a.ctx.currentTime;
    src.start(0, k.start, k.end - k.start);
    src.onended = () => stop();
    a.src = src;
    setPlaying(i);
    const tick = () => {
      setPlayhead(Math.min(k.end, k.start + (a.ctx.currentTime - t0)));
      a.raf = requestAnimationFrame(tick);
    };
    a.raf = requestAnimationFrame(tick);
  };

  const download = (k: HookCandidate) => {
    const full = fullRef.current;
    if (!full) return;
    const base = fileName.replace(/\.[^.]+$/, "").replace(/[^\w\- ]+/g, "").trim() || "song";
    downloadBlob(encodeWav(full, k.start, k.end), `${base} - hook ${k.rank} (${formatTime(k.start).replace(":", "m")}s).wav`);
  };

  const timestamps = result ? result.candidates.map((k) => `Hook ${k.rank}: ${formatTime(k.start)}–${formatTime(k.end)}`).join("\n") : "";
  const top = result?.candidates[0];
  const busy = status === "decoding" || status === "analysing";

  return (
    <ToolShell
      badge="FREE TOOL · HOOK FINDER"
      title={
        <>
          Hook Finder: <span className="text-accent">Find Your Song&apos;s Best Ad Clip</span>
        </>
      }
      kicker="Your hook, in seconds."
      sub="Upload a song and get the 3 strongest 15 or 30-second sections to cut as Instagram and Meta ad clips."
      guide={<ToolGuide g={hookFinderGuide} />}
      cta={
        <div className="md:flex md:items-center md:justify-between md:gap-10">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">Have your clips? Plan your campaign.</h2>
            <p className="mt-2 max-w-xl text-muted">See what your budget could do, or let us build the Meta campaign around your hook.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            <Button href="/planner" size="lg" arrow>
              Plan Your Campaign
            </Button>
            <Button href="/services/meta-ads" variant="secondary" size="lg">
              Meta Ads Service
            </Button>
          </div>
        </div>
      }
    >
      <div className="grid gap-5">
        <section aria-labelledby="hf-upload" className="card p-6 md:p-8">
          <h2 id="hf-upload" className="sr-only">
            Add your song
          </h2>
          <p className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/[0.06] px-4 py-3 text-[0.95rem] leading-relaxed text-ink/90">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5z" strokeLinejoin="round" />
            </svg>
            <span>
              <strong className="font-semibold">Your song never leaves your device.</strong> Everything happens inside your browser and nothing is uploaded, so it's safe
              for unreleased tracks.
            </span>
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-medium text-muted">Clip length</p>
            <div role="radiogroup" aria-label="Clip length" className="inline-grid grid-flow-col rounded-full border border-line bg-surface-2 p-1">
              {([15, 30] as const).map((len) => (
                <button
                  key={len}
                  type="button"
                  role="radio"
                  aria-checked={clip === len}
                  disabled={busy}
                  onClick={() => changeClip(len)}
                  className={`min-h-10 rounded-full px-5 text-sm font-semibold transition-colors disabled:opacity-60 ${clip === len ? "bg-ink text-bg" : "text-muted hover:text-ink"}`}
                >
                  {len} seconds
                </button>
              ))}
            </div>
          </div>

          <label
            htmlFor="hf-file"
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              onFile(e.dataTransfer.files?.[0]);
            }}
            className={`mt-5 flex min-h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-[var(--radius-md)] border-2 border-dashed px-6 py-8 text-center transition-colors ${
              dragging ? "border-accent bg-accent/[0.06]" : "border-line-strong hover:border-white/25"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-9 w-9 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M9 18V6l10-2v12M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm10-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" strokeLinejoin="round" />
            </svg>
            <span className="font-heading text-lg font-semibold">{fileName && status !== "error" ? fileName : "Drop your song here, or tap to choose"}</span>
            <span className="text-sm text-muted">MP3, WAV or M4A · up to {MAX_MB} MB</span>
            <input
              ref={inputRef}
              id="hf-file"
              type="file"
              accept={ACCEPT}
              className="sr-only"
              onChange={(e) => {
                onFile(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </label>

          {busy && (
            <div className="mt-5" aria-live="polite">
              <div className="flex justify-between text-sm text-muted">
                <span>{status === "decoding" ? "Reading your song…" : "Listening for the hook…"}</span>
                <span className="num">{status === "analysing" ? `${Math.round(progress * 100)}%` : ""}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
                <div className={`h-full rounded-full bg-accent transition-[width] duration-300 ${status === "decoding" ? "w-1/5 animate-pulse" : ""}`} style={status === "analysing" ? { width: `${Math.max(4, progress * 100)}%` } : undefined} />
              </div>
            </div>
          )}
          {status === "error" && (
            <p role="alert" className="mt-5 rounded-xl border border-[#ff7a59]/40 bg-[#ff7a59]/[0.06] px-4 py-3 text-sm text-ink/90">
              {error}
            </p>
          )}
        </section>

        {result && status === "done" && (
          <section id="hook-result" aria-labelledby="hf-results" className="card scroll-mt-24 p-6 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 id="hf-results" className="font-heading text-2xl font-semibold tracking-tight">
                Your {result.candidates.length} strongest {result.clipSeconds}-second sections
              </h2>
              <p className="text-sm text-muted">Song length {formatTime(result.duration)}</p>
            </div>
            <p className="mt-2 text-[0.95rem] text-muted">These are suggestions. Your ears make the final call.</p>
            <div className="mt-6">
              <Waveform result={result} playing={playing} playhead={playhead} />
            </div>
            {result.analysedSeconds < result.duration && <p className="mt-2 text-xs text-muted">Only the first {formatTime(result.analysedSeconds)} were analysed.</p>}

            <ol className="mt-6 grid gap-4 lg:grid-cols-3">
              {result.candidates.map((k, i) => (
                <li key={k.rank} className="rounded-[var(--radius-md)] border border-line bg-surface-2 p-5" style={{ borderTopColor: COLORS[i], borderTopWidth: 3 }}>
                  <p className="eyebrow" style={{ color: COLORS[i] }}>
                    Hook {k.rank}
                  </p>
                  <p className="num mt-2 text-3xl font-semibold">
                    {formatTime(k.start)}–{formatTime(k.end)}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm leading-snug text-muted">
                    {k.reasons.map((r) => (
                      <li key={r}>• {r}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => play(i, k)}
                      aria-pressed={playing === i}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-bg transition-colors hover:bg-accent"
                    >
                      {playing === i ? (
                        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                          <path d="M7 6h4v12H7zM13 6h4v12h-4z" fill="currentColor" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                          <path d="M8 5v14l11-7z" fill="currentColor" />
                        </svg>
                      )}
                      {playing === i ? "Stop" : "Play"}
                      <span className="sr-only"> hook {k.rank}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => download(k)}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:border-white/30 hover:bg-white/5"
                    >
                      Download this clip<span className="sr-only"> (hook {k.rank}, WAV)</span>
                    </button>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-6 rounded-xl border border-gold/30 bg-gold/[0.06] px-4 py-3 text-sm leading-relaxed text-ink/90">
              Tip: the first 3 seconds of an ad matter most. A clip can start a moment before the hook lands, so the hook hits right as people decide whether to keep watching.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-[auto_1fr] md:items-start">
              <CopyButton text={timestamps} label="Copy timestamps" source="hook-finder" />
              {top && (
                <ShareCard
                  fileName="dhunlabs-hook"
                  link={shareUrl("/tools/hook-finder", { len: result.clipSeconds }, "hook-finder")}
                  text={`My hook: ${formatTime(top.start)}–${formatTime(top.end)} · Found with DhunLabs Hook Finder`}
                  spec={{
                    tool: "Hook Finder",
                    lead: "My hook:",
                    big: `${formatTime(top.start)}–${formatTime(top.end)}`,
                    tail: "Found with DhunLabs Hook Finder",
                    inputs: [
                      ["Clip length", `${result.clipSeconds} seconds`],
                      ["Song length", formatTime(result.duration)],
                      ...(result.candidates.length > 1 ? [["Also try", result.candidates.slice(1).map((k) => formatTime(k.start)).join(" · ")] as [string, string]] : []),
                    ],
                    url: "dhunlabs.studio/tools/hook-finder",
                  }}
                />
              )}
            </div>
          </section>
        )}
      </div>
      <GuideJumpLinks />
    </ToolShell>
  );
}
