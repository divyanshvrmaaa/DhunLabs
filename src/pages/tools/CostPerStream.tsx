import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ToolShell } from "../../components/tools/ToolShell";
import { CopyButton } from "../../components/tools/CopyButton";
import { NumberField } from "../../components/planner/Fields";
import { Button } from "../../components/ui/Button";
import { AnimatedNumber } from "../../components/ui/AnimatedNumber";
import { SUSPICIOUS_CPS_BELOW, TYPICAL_CPS_HIGH, TYPICAL_CPS_LOW } from "../../content/pricing";
import { verdictFor, type Tone } from "../../lib/cps";
import { ToolGuide, GuideJumpLinks } from "../../components/guide/ToolGuide";
import { costPerStreamGuide } from "../../content/guides/costPerStream";
import { ShareCard } from "../../components/tools/ShareCard";
import { numParam, shareUrl, useUrlInputs } from "../../lib/shareUrl";
import { formatINR2, formatNumber } from "../../lib/format";
import { track } from "../../lib/analytics";

const toneClass: Record<Tone, string> = {
  warn: "text-gold",
  good: "text-success",
  ok: "text-accent",
  high: "text-gold",
  bad: "text-[#ff7a59]",
};

// Gauge runs from ₹0 to ₹2 per stream
const GAUGE_MAX = 2;
const pct = (v: number) => `${Math.min(100, Math.max(0, (v / GAUGE_MAX) * 100))}%`;

export default function CostPerStream() {
  const [spent, setSpent] = useState(0);
  const [streams, setStreams] = useState(0);
  const [saves, setSaves] = useState(0);
  // Shared links open pre-filled: ?spent=10000&streams=12000&saves=900
  useUrlInputs((q) => {
    const a = numParam(q, "spent", 0, 100_000_000);
    if (a !== undefined) setSpent(a);
    const b = numParam(q, "streams", 0, 1_000_000_000);
    if (b !== undefined) setStreams(b);
    const c = numParam(q, "saves", 0, 1_000_000_000);
    if (c !== undefined) setSaves(c);
  });
  const ready = spent > 0 && streams > 0;
  const cps = ready ? spent / streams : 0;
  const v = verdictFor(cps);
  const saveRate = ready && saves > 0 ? (saves / streams) * 100 : null;

  const sent = useRef(false);
  useEffect(() => {
    if (!ready || sent.current) return;
    const t = window.setTimeout(() => {
      sent.current = true;
      track("tool_use", { tool: "cost-per-stream", action: "result", verdict: v.tone });
    }, 1500);
    return () => window.clearTimeout(t);
  }, [ready, v.tone]);

  const link = shareUrl("/tools/cost-per-stream", { spent: spent || null, streams: streams || null, saves: saves || null }, "cost-per-stream");
  const text = ready
    ? [
        `Spent: ₹${formatNumber(spent)} · Streams: ${formatNumber(streams)}`,
        `Cost per stream: ${formatINR2(cps)} (${v.title.toLowerCase()})`,
        saveRate !== null ? `Save rate: ${saveRate.toFixed(1)}%` : null,
        `Check yours: ${link}`,
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  return (
    <ToolShell
      badge="FREE TOOL · COST PER STREAM"
      title={
        <>
          Cost Per Stream Calculator <span className="text-accent">for Music Ads</span>
        </>
      }
      kicker="Did you pay a fair price per stream?"
      guide={<ToolGuide g={costPerStreamGuide} />}
      sub="Enter what a past campaign cost and the streams it brought. See your cost per stream and how it compares with what our campaigns usually see."
      cta={
        <div className="md:flex md:items-center md:justify-between md:gap-10">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">Plan your next one with real numbers.</h2>
            <p className="mt-2 max-w-xl text-muted">Enter a budget and get an honest plan with an estimated stream range.</p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button href="/planner" size="lg" arrow>
              Plan Your Campaign
            </Button>
          </div>
        </div>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
        <section aria-label="Your campaign" className="card grid gap-6 self-start p-6 md:p-8">
          <NumberField id="spent" label="Money spent (₹)" value={spent} onChange={setSpent} prefix="₹" placeholder="10,000" allowEmpty max={100_000_000} />
          <NumberField id="streams" label="Streams received" value={streams} onChange={setStreams} placeholder="12,000" allowEmpty max={1_000_000_000} />
          <NumberField id="saves" label="Saves (optional)" value={saves} onChange={setSaves} placeholder="0" allowEmpty max={1_000_000_000} />
        </section>

        <section aria-label="Result" className="card p-6 md:p-8" aria-live="polite">
          <p className="eyebrow">Cost per stream</p>
          <p className="num mt-3 text-[clamp(3.5rem,11vw,6rem)] font-semibold leading-none">
            {ready ? (
              <AnimatedNumber value={cps} format={(n) => formatINR2(n)} />
            ) : (
              <span className="text-muted">₹0.00</span>
            )}
          </p>

          <div className="mt-8">
            <div className="relative h-2 rounded-full bg-white/10" aria-hidden>
              <div className="absolute inset-y-0 rounded-full bg-accent/40" style={{ left: pct(TYPICAL_CPS_LOW), width: `calc(${pct(TYPICAL_CPS_HIGH)} - ${pct(TYPICAL_CPS_LOW)})` }} />
              <div className="absolute inset-y-0 left-0 rounded-l-full bg-gold/30" style={{ width: pct(SUSPICIOUS_CPS_BELOW) }} />
              {ready && (
                <motion.span
                  className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-bg bg-ink shadow-[0_0_20px_rgba(242,239,233,0.5)]"
                  animate={{ left: pct(cps) }}
                  transition={{ type: "spring", stiffness: 160, damping: 22 }}
                />
              )}
            </div>
            <div className="relative mt-2 h-4 text-[0.7rem] text-muted">
              <span className="absolute left-0">₹0</span>
              <span className="absolute -translate-x-1/2" style={{ left: pct((TYPICAL_CPS_LOW + TYPICAL_CPS_HIGH) / 2) }}>
                typical
              </span>
              <span className="absolute right-0">₹{GAUGE_MAX}+</span>
            </div>
          </div>

          {ready ? (
            <div className="mt-8 border-t border-line pt-6">
              <p className={`font-heading text-2xl font-semibold ${toneClass[v.tone]}`}>{v.title}</p>
              <p className="mt-2 leading-relaxed text-muted">{v.line}</p>
              <p className="mt-3 text-sm text-muted">
                Our typical range: {formatINR2(TYPICAL_CPS_LOW)}–{formatINR2(TYPICAL_CPS_HIGH)} per stream.
              </p>
              {saveRate !== null && (
                <p className="mt-5 text-[0.95rem]">
                  Save rate: <span className="num font-semibold">{saveRate.toFixed(1)}%</span>{" "}
                  <span className="text-muted">
                    ({formatNumber(saves)} saves ÷ {formatNumber(streams)} streams)
                  </span>
                </p>
              )}
              <div className="mt-6">
                <CopyButton text={text} source="cost-per-stream" />
              </div>
              <div className="mt-4">
                <ShareCard
                  fileName="dhunlabs-cost-per-stream"
                  link={link}
                  text={`My cost per stream: ${formatINR2(cps)} (${v.title.toLowerCase()})`}
                  spec={{
                    tool: "Cost-Per-Stream Checker",
                    lead: `₹${formatNumber(spent)} for ${formatNumber(streams)} streams =`,
                    big: formatINR2(cps),
                    tail: `per stream · ${v.title.toLowerCase()}`,
                    inputs: [
                      ["Money spent", `₹${formatNumber(spent)}`],
                      ["Streams received", formatNumber(streams)],
                      ...(saveRate !== null ? [["Save rate", `${saveRate.toFixed(1)}%`] as [string, string]] : []),
                    ],
                    url: "dhunlabs.studio/tools/cost-per-stream",
                  }}
                />
              </div>
            </div>
          ) : (
            <p className="mt-8 border-t border-line pt-6 text-muted">Enter the money spent and the streams received to see your result.</p>
          )}
        </section>
      </div>
      <GuideJumpLinks />
    </ToolShell>
  );
}
