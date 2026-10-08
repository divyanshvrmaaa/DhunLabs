import { useEffect, useMemo, useRef, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { AnimatedNumber } from "../components/ui/AnimatedNumber";
import { SmartLink } from "../components/ui/SmartLink";
import { NumberField, Chips, Segmented } from "../components/planner/Fields";
import { PlanCard } from "../components/planner/PlanCard";
import { PlanForms } from "../components/planner/PlanForms";
import { ShareActions } from "../components/planner/ShareActions";
import { EstimateNote, FOOTNOTE } from "../components/planner/EstimateNote";
import { MobileResultBar } from "../components/planner/MobileResultBar";
import {
  CUSTOM_PLAN_ABOVE,
  PLANNER_CHIPS,
  PLANNER_DEFAULT,
  PLANNER_MAX,
  PLANNER_MIN,
  PLANNER_STEP,
} from "../content/pricing";
import { customPlanLine, plans, songStatusOptions, type SongStatus } from "../content/plans";
import { budgetBucket, costPerStreamForBudget, planForBudget, streamsForBudget } from "../lib/estimate";
import { formatINR, formatINR2, formatNumber, formatRange } from "../lib/format";
import { track } from "../lib/analytics";
import { site } from "../content/site";

export default function Planner() {
  const [budget, setBudget] = useState(PLANNER_DEFAULT);
  const [status, setStatus] = useState<SongStatus | null>(null);

  const streams = useMemo(() => streamsForBudget(budget), [budget]);
  const cps = useMemo(() => costPerStreamForBudget(budget), [budget]);
  const plan = planForBudget(budget);
  const single = streams.low === streams.high;
  const fill = ((budget - PLANNER_MIN) / (PLANNER_MAX - PLANNER_MIN)) * 100;

  // Record the result once the visitor stops adjusting (plan + coarse bucket only).
  const lastSent = useRef("");
  useEffect(() => {
    const t = window.setTimeout(() => {
      const key = `${plan}|${budgetBucket(budget)}`;
      if (key !== lastSent.current) {
        lastSent.current = key;
        track("planner_result", { plan, bucket: budgetBucket(budget) });
      }
    }, 1500);
    return () => window.clearTimeout(t);
  }, [plan, budget]);

  const summary = [
    "My DhunLabs campaign plan",
    `Budget: ${formatINR(budget)}`,
    `Plan: ${plans[plan].name}`,
    `Estimated streams: ${single ? "~" + formatNumber(streams.low) : formatRange(streams.low, streams.high)}`,
    status ? `Song: ${songStatusOptions.find((o) => o.value === status)!.label}` : null,
    FOOTNOTE,
    `Plan yours: ${site.siteUrl}/planner`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <>
      <PageHeader
        compact
        badge="CAMPAIGN PLANNER"
        title={
          <>
            Plan your campaign in <span className="text-accent">30 seconds.</span>
          </>
        }
        sub="Enter your promotion budget. Get an honest plan, an estimated stream range and the right next step."
      />

      <div className="container-x pb-24 md:pb-36">
        <div className="grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:grid-rows-[auto_1fr] lg:gap-x-8">
          {/* Inputs (main) */}
          <section aria-labelledby="budget-label" className="card p-6 md:p-8 lg:col-start-1 lg:row-start-1">
            <h2 id="budget-label" className="eyebrow">
              Your promotion budget
            </h2>
            <p className="num mt-4 text-[clamp(3.25rem,10vw,5.75rem)] font-semibold leading-none" aria-hidden>
              <span className="text-muted">₹</span>
              <AnimatedNumber value={budget} format={(n) => formatNumber(Math.round(n / 100) * 100)} duration={0.35} />
            </p>

            <div className="mt-6">
              <label htmlFor="budget-range" className="sr-only">
                Budget slider
              </label>
              <input
                id="budget-range"
                type="range"
                className="range"
                min={PLANNER_MIN}
                max={PLANNER_MAX}
                step={PLANNER_STEP}
                value={Math.min(PLANNER_MAX, Math.max(PLANNER_MIN, budget))}
                onChange={(e) => setBudget(Number(e.target.value))}
                aria-valuetext={formatINR(budget)}
                style={{ ["--fill" as string]: `${fill}%` }}
              />
              <div className="flex justify-between text-xs text-muted">
                <span>{formatINR(PLANNER_MIN)}</span>
                <span>{formatINR(PLANNER_MAX)}</span>
              </div>
            </div>

            <div className="mt-6">
              <Chips label="Quick budgets" values={PLANNER_CHIPS} current={budget} onPick={setBudget} format={formatINR} />
            </div>
          </section>

          {/* Inputs (details) — below the result on phones */}
          <section aria-label="Details" className="card order-last self-start p-6 md:p-8 lg:order-none lg:col-start-1 lg:row-start-2">
            <div className="grid gap-6">
              <NumberField
                id="budget-input"
                label="Or type an exact amount"
                value={budget}
                onChange={setBudget}
                min={PLANNER_MIN}
                max={PLANNER_MAX}
                prefix="₹"
                hint={`Between ${formatINR(PLANNER_MIN)} and ${formatINR(PLANNER_MAX)}.`}
              />
              <Segmented label="Is your song out yet? (optional)" options={[...songStatusOptions]} value={status} onChange={setStatus} />
            </div>
          </section>

          {/* Result */}
          <section id="planner-result" aria-label="Your plan" className="scroll-mt-24 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="lg:sticky lg:top-24">
            <PlanCard
              plan={plan}
              extra={
                <div className="space-y-5">
                  {budget > CUSTOM_PLAN_ABOVE && (
                    <p className="rounded-xl border border-gold/30 bg-gold/[0.06] px-4 py-3 text-sm text-ink/90">{customPlanLine}</p>
                  )}
                  {status && (
                    <p className="text-sm text-muted">
                      Your song: <span className="text-ink">{songStatusOptions.find((o) => o.value === status)!.label}</span>
                    </p>
                  )}
                  <ShareActions text={summary} source="planner" />
                  <EstimateNote />
                </div>
              }
            >
              <div className="mt-6 border-t border-line pt-6">
                <p className="text-sm text-muted">Estimated streams</p>
                <p className="num mt-2 text-[clamp(2.4rem,4.6vw,3.4rem)] font-semibold leading-[1.02] sm:whitespace-nowrap" aria-live="polite">
                  {single ? (
                    <>
                      <span className="text-muted">~</span>
                      <AnimatedNumber value={streams.low} format={formatNumber} />
                    </>
                  ) : (
                    <>
                      <AnimatedNumber value={streams.low} format={formatNumber} />
                      <span className="text-muted">–</span>
                      <br className="sm:hidden" />
                      <AnimatedNumber value={streams.high} format={formatNumber} />
                    </>
                  )}
                </p>
                <p className="mt-4 flex flex-wrap items-baseline gap-x-2 text-sm text-muted">
                  Est. cost per stream
                  <span className="num text-lg font-semibold text-ink">
                    {Math.abs(cps.low - cps.high) < 0.005 ? formatINR2(cps.low) : `${formatINR2(cps.low)}–${formatINR2(cps.high)}`}
                  </span>
                </p>
              </div>
            </PlanCard>
            <p className="mt-5 text-center text-sm text-muted lg:text-left">
              <SmartLink href="/estimator" className="inline-flex min-h-11 items-center gap-1 underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-accent">
                Know your stream goal instead? Use the Stream Estimator →
              </SmartLink>
            </p>
            </div>
          </section>
        </div>

        <PlanForms plan={plan} location="planner" />
        <MobileResultBar
          targetId="planner-result"
          title={plans[plan].name}
          value={`${single ? "~" + formatNumber(streams.low) : formatRange(streams.low, streams.high)} streams`}
        />
      </div>
    </>
  );
}
