import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ToolShell } from "../../components/tools/ToolShell";
import { CopyButton } from "../../components/tools/CopyButton";
import { NumberField, Chips } from "../../components/planner/Fields";
import { MobileResultBar } from "../../components/planner/MobileResultBar";
import { AnimatedNumber } from "../../components/ui/AnimatedNumber";
import { Button } from "../../components/ui/Button";
import {
  youtubeExtraCutPresets,
  DEFAULT_YOUTUBE_EXTRA_CUT,
  DEFAULT_INDIA_SHARE,
  distributorPresets,
  ownershipPresets,
  royaltySources,
  SPOTIFY_MIN_STREAMS,
  USD_TO_INR,
  USD_TO_INR_AS_OF,
  type Audience,
  type PlatformId,
} from "../../content/royalties";
import { calculateRevenue, formatMoney, per1000, platformsFor, rateFor } from "../../lib/royalties";
import { formatNumber } from "../../lib/format";
import { track } from "../../lib/analytics";

type Currency = "INR" | "USD";
type Period = "total" | "monthly";

const audienceOptions: { value: Audience; label: string; sub: string }[] = [
  { value: "india", label: "India", sub: "Most listeners in India" },
  { value: "global", label: "Global", sub: "Most listeners abroad" },
  { value: "mix", label: "Mix", sub: "Set the India share" },
];

function Toggle<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-grid auto-cols-fr grid-flow-col rounded-full border border-line bg-surface-2 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`min-h-10 rounded-full px-4 text-sm font-semibold transition-colors ${value === o.value ? "bg-ink text-bg" : "text-muted hover:text-ink"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function RevenueCalculator() {
  const [audience, setAudience] = useState<Audience>("india");
  const [indiaShare, setIndiaShare] = useState(DEFAULT_INDIA_SHARE);
  const [streams, setStreams] = useState<Partial<Record<PlatformId, number>>>({ spotify: 100000, youtube: 20000, meta: 10000 });
  const [keep, setKeep] = useState(100);
  const [youtubeExtraCut, setYoutubeExtraCut] = useState(DEFAULT_YOUTUBE_EXTRA_CUT);
  const [ownership, setOwnership] = useState(100);
  const [currency, setCurrency] = useState<Currency>("INR");
  const [period, setPeriod] = useState<Period>("total");

  const visible = platformsFor(audience);
  const result = useMemo(
    () => calculateRevenue({ audience, indiaShare, streams, distributorKeep: keep, youtubeExtraCut, ownership }),
    [audience, indiaShare, streams, keep, youtubeExtraCut, ownership],
  );
  const t = result.totals;
  const money = (n: number) => formatMoney(n, currency);
  const spotifyStreams = streams.spotify ?? 0;
  const spotifyWarn = spotifyStreams > 0 && spotifyStreams < SPOTIFY_MIN_STREAMS;
  const per = period === "monthly" ? " / month" : "";
  const shares = t.gross.typical > 0 ? { you: t.you.typical / t.gross.typical, others: t.others.typical / t.gross.typical, dist: t.distributor.typical / t.gross.typical } : { you: 1, others: 0, dist: 0 };

  const sent = useRef(false);
  useEffect(() => {
    if (sent.current || t.streams === 0) return;
    const id = window.setTimeout(() => {
      sent.current = true;
      track("tool_use", { tool: "revenue-calculator", audience });
    }, 2000);
    return () => window.clearTimeout(id);
  }, [t.streams, audience]);

  const audienceLabel = audience === "mix" ? `Mix (${indiaShare}% India)` : `${audienceOptions.find((o) => o.value === audience)!.label} audience`;
  const summary = [
    `My estimated streaming revenue${per} (${audienceLabel})`,
    ...result.rows.map((r) => `${r.name}: ${formatNumber(r.streams)} streams → ${money(r.you.typical)} (range ${money(r.you.low)}–${money(r.you.high)})`),
    `Take-home: ${money(t.you.typical)}${per} (range ${money(t.you.low)}–${money(t.you.high)})`,
    period === "monthly" ? `≈ ${money(t.you.typical * 12)} per year` : null,
    `Distributor keeps: ${money(t.distributor.typical)} · Co-owners/label: ${money(t.others.typical)}`,
    "Estimates for the recording side only, before tax. Calculated at dhunlabs.studio/tools/revenue-calculator",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <ToolShell
      badge="FREE TOOL · STREAMING REVENUE"
      title={
        <>
          What are your streams <span className="text-accent">actually worth?</span>
        </>
      }
      sub="Enter your streams on each platform, choose where your listeners are and what your distributor takes. See an honest estimate of what reaches your pocket."
      sources={royaltySources}
      cta={
        <div className="md:flex md:items-center md:justify-between md:gap-10">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">Want more streams to count?</h2>
            <p className="mt-2 max-w-xl text-muted">Plan a campaign that brings real listeners who save and replay, not empty plays.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            <Button href="/planner" size="lg" arrow>
              Plan Your Campaign
            </Button>
            <Button href="/estimator" variant="secondary" size="lg">
              Stream Estimator
            </Button>
          </div>
        </div>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
        {/* Inputs */}
        <div className="space-y-5">
          <section aria-labelledby="rev-audience" className="card p-6 md:p-8">
            <h2 id="rev-audience" className="eyebrow">
              1 · Where are your listeners?
            </h2>
            <div role="radiogroup" aria-labelledby="rev-audience" className="mt-4 grid grid-cols-3 gap-2">
              {audienceOptions.map((o) => {
                const on = audience === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setAudience(o.value)}
                    className={`flex min-h-14 flex-col items-start justify-center rounded-xl border px-3 py-3 text-left transition-all duration-300 sm:px-4 ${
                      on ? "border-accent bg-accent/10 shadow-[0_0_24px_-8px_rgba(29,185,84,0.6)]" : "border-line-strong hover:border-white/25"
                    }`}
                  >
                    <span className={`text-sm font-semibold ${on ? "text-ink" : "text-ink/85"}`}>
                      {o.label}
                      {o.value !== "mix" && <span className="hidden sm:inline"> audience</span>}
                    </span>
                    <span className="hidden text-xs text-muted sm:block">{o.sub}</span>
                  </button>
                );
              })}
            </div>
            {audience === "mix" && (
              <div className="mt-6">
                <div className="flex items-baseline justify-between">
                  <label htmlFor="india-share" className="text-sm font-medium text-muted">
                    Streams from India
                  </label>
                  <span className="num text-lg font-semibold">
                    {indiaShare}% <span className="text-sm font-normal text-muted">India · {100 - indiaShare}% abroad</span>
                  </span>
                </div>
                <input
                  id="india-share"
                  type="range"
                  className="range"
                  min={0}
                  max={100}
                  step={5}
                  value={indiaShare}
                  onChange={(e) => setIndiaShare(Number(e.target.value))}
                  aria-valuetext={`${indiaShare}% of streams from India`}
                  style={{ ["--fill" as string]: `${indiaShare}%` }}
                />
                <p className="text-xs text-muted">Tip: Spotify for Artists → Audience → Location shows your real split.</p>
              </div>
            )}
          </section>

          <section aria-labelledby="rev-streams" className="card p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="rev-streams" className="eyebrow">
                2 · Streams on each platform
              </h2>
              <Toggle
                label="Stream period"
                value={period}
                onChange={setPeriod}
                options={[
                  { value: "total", label: "Total" },
                  { value: "monthly", label: "Per month" },
                ]}
              />
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {visible.map((p) => {
                const r = rateFor(p, audience, indiaShare);
                const conf = audience === "global" ? p.confidence.global : audience === "india" ? p.confidence.india : p.confidence.india === "limited" || p.confidence.global === "limited" ? "limited" : "good";
                const indiaOnlyInMix = audience === "mix" && !p.global;
                return (
                  <NumberField
                    key={p.id}
                    id={`rev-${p.id}`}
                    allowEmpty
                    placeholder="0"
                    max={10_000_000_000}
                    value={streams[p.id] ?? 0}
                    onChange={(n) => setStreams((s) => ({ ...s, [p.id]: n }))}
                    label={
                      <span className="flex flex-col">
                        <span className="text-ink">{p.name}</span>
                        {p.hint && <span className="text-xs font-normal text-muted">{p.hint}</span>}
                      </span>
                    }
                    hint={
                      <>
                        <span className="whitespace-nowrap">≈ {per1000(r.low, currency)}–{per1000(r.high, currency)} per 1,000 streams</span>
                        {conf === "limited" && <span className="ml-1.5 inline-block whitespace-nowrap rounded-full border border-line-strong px-1.5 py-px text-[0.65rem] text-muted">limited data</span>}
                        {indiaOnlyInMix && <span className="ml-1.5 inline-block whitespace-nowrap text-[0.65rem] text-muted">(India rate only)</span>}
                      </>
                    }
                  />
                );
              })}
            </div>
            {spotifyWarn && (
              <p className="mt-5 rounded-xl border border-gold/30 bg-gold/[0.06] px-4 py-3 text-sm text-ink/90">
                Heads-up: since April 2024, Spotify pays nothing for a track with fewer than {formatNumber(SPOTIFY_MIN_STREAMS)} streams in the past 12 months.
              </p>
            )}
          </section>

          <section aria-labelledby="rev-splits" className="card p-6 md:p-8">
            <h2 id="rev-splits" className="eyebrow">
              3 · Who gets a cut?
            </h2>

            <div className="mt-5">
              <p className="text-sm font-medium text-ink">Your distributor</p>
              <p className="mt-0.5 text-xs text-muted">What % of the royalties do you keep after your distributor?</p>
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Distributor presets">
                {distributorPresets.map((d) => {
                  const on = keep === d.keep;
                  return (
                    <button
                      key={d.label}
                      type="button"
                      aria-pressed={on}
                      title={d.note}
                      onClick={() => setKeep(d.keep)}
                      className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-all duration-300 ${
                        on ? "border-accent bg-accent/15 text-ink" : "border-line-strong text-muted hover:text-ink"
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-muted">{distributorPresets.find((d) => d.keep === keep)?.note || "Custom split"}</p>
              <div className="mt-3 max-w-[12rem]">
                <NumberField id="rev-keep" label="Or type your %" value={keep} onChange={setKeep} min={0} max={100} />
              </div>
            </div>

            {visible.some((p) => p.extraCut) && (
              <div className="mt-7 border-t border-line pt-6">
                <p className="text-sm font-medium text-ink">Extra cut on YouTube</p>
                <p className="mt-0.5 text-xs text-muted">Some distributors take an extra 10–20% of YouTube Content ID, even on "keep 100%" plans. Leave at 0% if yours doesn't.</p>
                <div className="mt-3">
                  <Chips label="Extra YouTube cut" values={youtubeExtraCutPresets} current={youtubeExtraCut} onPick={setYoutubeExtraCut} format={(n) => `${n}%`} />
                </div>
              </div>
            )}

            <div className="mt-7 border-t border-line pt-6">
              <p className="text-sm font-medium text-ink">How much of the song do you own?</p>
              <p className="mt-0.5 text-xs text-muted">Your share of the recording after splits with producers, featured artists or a label.</p>
              <div className="mt-3 flex flex-wrap items-end gap-3">
                <Chips label="Ownership" values={ownershipPresets} current={ownership} onPick={setOwnership} format={(n) => `${n}%`} />
                <div className="w-32">
                  <NumberField id="rev-own" label="Custom %" value={ownership} onChange={setOwnership} min={0} max={100} />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Result */}
        <section id="revenue-result" aria-label="Estimated revenue" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-line-strong bg-surface p-6 shadow-[0_40px_120px_-40px_rgba(29,185,84,0.35)] md:p-8">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(29,185,84,0.25),transparent)] blur-3xl" />
            <div className="relative flex flex-wrap items-center justify-between gap-3">
              <p className="eyebrow">Your estimated take-home{per}</p>
              <Toggle
                label="Currency"
                value={currency}
                onChange={setCurrency}
                options={[
                  { value: "INR", label: "₹ INR" },
                  { value: "USD", label: "$ USD" },
                ]}
              />
            </div>

            <p className="num relative mt-4 text-[clamp(2.75rem,8vw,4.5rem)] font-semibold leading-none" aria-live="polite">
              <AnimatedNumber value={t.you.typical} format={money} />
            </p>
            <p className="relative mt-3 text-sm text-muted">
              Likely range <span className="num font-semibold text-ink">{money(t.you.low)}</span> –{" "}
              <span className="num font-semibold text-ink">{money(t.you.high)}</span>
              {period === "monthly" && t.you.typical > 0 && (
                <>
                  {" "}
                  · ≈ <span className="num font-semibold text-ink">{money(t.you.typical * 12)}</span> a year
                </>
              )}
            </p>

            {/* Split bar */}
            <div className="relative mt-7">
              <div className="flex h-3 overflow-hidden rounded-full bg-white/10" aria-hidden>
                <motion.div className="h-full bg-accent" animate={{ width: `${shares.you * 100}%` }} transition={{ duration: 0.5 }} />
                <motion.div className="h-full bg-ink/50" animate={{ width: `${shares.others * 100}%` }} transition={{ duration: 0.5 }} />
                <motion.div className="h-full bg-dim" animate={{ width: `${shares.dist * 100}%` }} transition={{ duration: 0.5 }} />
              </div>
              <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
                <div>
                  <dt className="flex items-center gap-1.5 text-xs text-muted">
                    <span className="h-2 w-2 rounded-full bg-accent" /> You
                  </dt>
                  <dd className="num font-semibold">{money(t.you.typical)}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 text-xs text-muted">
                    <span className="h-2 w-2 rounded-full bg-ink/50" /> Co-owners / label
                  </dt>
                  <dd className="num font-semibold">{money(t.others.typical)}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 text-xs text-muted">
                    <span className="h-2 w-2 rounded-full bg-dim" /> Distributor
                  </dt>
                  <dd className="num font-semibold">{money(t.distributor.typical)}</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-muted">
                Total paid out by the platforms: <span className="num text-ink">{money(t.gross.typical)}</span>
              </p>
            </div>

            {/* Per-platform breakdown */}
            {result.rows.length > 0 && (
              <div className="relative mt-7 border-t border-line pt-6">
                <p className="text-sm font-semibold">By platform</p>
                <ul className="mt-3 space-y-2.5">
                  {[...result.rows]
                    .sort((a, b) => b.you.typical - a.you.typical)
                    .map((r) => {
                      const w = t.you.typical > 0 ? (r.you.typical / t.you.typical) * 100 : 0;
                      return (
                        <li key={r.id}>
                          <div className="flex items-baseline justify-between gap-3 text-sm">
                            <span>
                              {r.name} <span className="text-xs text-muted">· {formatNumber(r.streams)} streams</span>
                            </span>
                            <span className="num font-semibold">{money(r.you.typical)}</span>
                          </div>
                          <div className="mt-1 h-1 rounded-full bg-white/[0.06]" aria-hidden>
                            <motion.div className="h-full rounded-full bg-accent/70" animate={{ width: `${w}%` }} transition={{ duration: 0.5 }} />
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}

            <div className="relative mt-7 flex flex-wrap gap-2">
              <CopyButton text={summary} source="revenue-calculator" />
            </div>

            <div className="relative mt-6 border-t border-line pt-5 text-xs leading-relaxed text-muted">
              <p>
                Estimates, not a statement. No platform publishes a fixed per-stream rate: payouts depend on listener country, free vs paid accounts and the month. Covers the recording
                (master) side only. Songwriting royalties (e.g. IPRS in India) are extra. Before tax. $1 = ₹{USD_TO_INR} ({USD_TO_INR_AS_OF}).
              </p>
            </div>
          </div>
        </section>
      </div>
      <MobileResultBar targetId="revenue-result" title={`Your estimated take-home${per}`} value={money(t.you.typical)} cta="See breakdown" />
    </ToolShell>
  );
}
