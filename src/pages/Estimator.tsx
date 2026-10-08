import { useEffect, useMemo, useRef, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { AnimatedNumber } from "../components/ui/AnimatedNumber";
import { SmartLink } from "../components/ui/SmartLink";
import { NumberField, Chips } from "../components/planner/Fields";
import { PlanCard } from "../components/planner/PlanCard";
import { PlanForms } from "../components/planner/PlanForms";
import { ShareActions } from "../components/planner/ShareActions";
import { EstimateNote, FOOTNOTE } from "../components/planner/EstimateNote";
import { MobileResultBar } from "../components/planner/MobileResultBar";
import { ESTIMATOR_DEFAULT_STREAMS, ESTIMATOR_MIN_STREAMS, STREAM_CHIPS, VIEW_CHIPS } from "../content/pricing";
import { otherPlatformsNote, plans, youtubeSeparateNote } from "../content/plans";
import { budgetBucket, estimate, type Range } from "../lib/estimate";
import { formatNumber, formatRange } from "../lib/format";
import { track } from "../lib/analytics";
import { site } from "../content/site";

const MAX_GOAL = 10_000_000;

function RangeNumber({ r, className = "" }: { r: Range; className?: string }) {
  if (r.low === r.high)
    return (
      <span className={className}>
        <span className="text-muted">₹</span>
        <AnimatedNumber value={r.low} format={formatNumber} />
      </span>
    );
  return (
    <span className={className}>
      <span className="text-muted">₹</span>
      <AnimatedNumber value={r.low} format={formatNumber} />
      <span className="text-muted">–₹</span>
      <AnimatedNumber value={r.high} format={formatNumber} />
    </span>
  );
}

export default function Estimator() {
  const [streams, setStreams] = useState(ESTIMATOR_DEFAULT_STREAMS);
  const [views, setViews] = useState(0);
  const result = useMemo(() => estimate(streams, views), [streams, views]);
  const plan = result.plan;
  const hasViews = views > 0;

  const lastSent = useRef("");
  useEffect(() => {
    const t = window.setTimeout(() => {
      const key = `${plan}|${budgetBucket(result.total.high)}`;
      if (key !== lastSent.current) {
        lastSent.current = key;
        track("estimator_result", { plan, bucket: budgetBucket(result.total.high), youtube: hasViews });
      }
    }, 1500);
    return () => window.clearTimeout(t);
  }, [plan, result.total.high, hasViews]);

  const summary = [
    "My DhunLabs stream goal",
    `Spotify streams wanted: ${formatNumber(streams)} → est. budget ${formatRange(result.spotify.low, result.spotify.high, true)}`,
    hasViews ? `YouTube views wanted: ${formatNumber(views)} → est. budget ${formatRange(result.youtube.low, result.youtube.high, true)}` : null,
    hasViews ? `Total estimated budget: ${formatRange(result.total.low, result.total.high, true)}` : null,
    `Plan: ${plans[plan].name}`,
    FOOTNOTE,
    `Estimate yours: ${site.siteUrl}/estimator`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <>
      <PageHeader
        compact
        badge="STREAM ESTIMATOR"
        title={
          <>
            Know your goal? <span className="text-accent">See the budget.</span>
          </>
        }
        sub="Enter how many Spotify streams or YouTube views you want. Get an estimated budget range and the plan that fits."
      />

      <div className="container-x pb-24 md:pb-36">
        <div className="grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:gap-x-8">
          <section aria-label="Your goal" className="card self-start p-6 md:p-8">
            <div>
              <NumberField
                id="streams"
                size="xl"
                label={<span className="eyebrow">Spotify streams wanted</span>}
                value={streams}
                onChange={setStreams}
                min={ESTIMATOR_MIN_STREAMS}
                max={MAX_GOAL}
                hint={`Minimum ${formatNumber(ESTIMATOR_MIN_STREAMS)}.`}
              />
              <div className="mt-4">
                <Chips label="Quick stream goals" values={STREAM_CHIPS} current={streams} onPick={setStreams} format={formatNumber} />
              </div>
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <NumberField
                id="views"
                size="xl"
                allowEmpty
                label={
                  <span className="eyebrow">
                    YouTube views wanted <span className="normal-case tracking-normal">(optional)</span>
                  </span>
                }
                value={views}
                onChange={setViews}
                min={0}
                max={MAX_GOAL}
                placeholder="0"
              />
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Chips label="Quick view goals" values={VIEW_CHIPS} current={views} onPick={(v) => setViews(views === v ? 0 : v)} format={formatNumber} />
                {hasViews && (
                  <button type="button" onClick={() => setViews(0)} className="min-h-11 px-3 text-sm text-muted underline underline-offset-4 hover:text-ink">
                    Clear
                  </button>
                )}
              </div>
            </div>

            <p className="mt-8 rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm leading-relaxed text-muted">{otherPlatformsNote}</p>
          </section>

          <section id="estimator-result" aria-label="Estimated budget" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
            <PlanCard
              plan={plan}
              extra={
                <div className="space-y-5">
                  {plan === "playlisting" && hasViews && (
                    <p className="rounded-xl border border-gold/30 bg-gold/[0.06] px-4 py-3 text-sm text-ink/90">{youtubeSeparateNote}</p>
                  )}
                  <ShareActions text={summary} source="estimator" />
                  <EstimateNote />
                </div>
              }
            >
              <dl className="mt-6 space-y-4 border-t border-line pt-6" aria-live="polite">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <dt className="text-sm text-muted">Spotify ({formatNumber(streams)} streams)</dt>
                  <dd className="num text-xl font-semibold">
                    <RangeNumber r={result.spotify} />
                  </dd>
                </div>
                {hasViews && (
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <dt className="text-sm text-muted">YouTube ({formatNumber(views)} views)</dt>
                    <dd className="num text-xl font-semibold">
                      <RangeNumber r={result.youtube} />
                    </dd>
                  </div>
                )}
                <div className="border-t border-line pt-4">
                  <dt className="text-sm text-muted">{hasViews ? "Total estimated budget" : "Estimated budget"}</dt>
                  <dd className="num mt-2 text-[clamp(2.2rem,6vw,3.4rem)] font-semibold leading-none">
                    <RangeNumber r={result.total} />
                  </dd>
                </div>
              </dl>
            </PlanCard>
            <p className="mt-5 text-center text-sm text-muted lg:text-left">
              <SmartLink href="/planner" className="inline-flex min-h-11 items-center gap-1 underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-accent">
                Know your budget instead? Use the Campaign Planner →
              </SmartLink>
            </p>
          </section>
        </div>

        <PlanForms plan={plan} location="estimator" />
        <MobileResultBar targetId="estimator-result" title={plans[plan].name} value={`${formatRange(result.total.low, result.total.high, true)} est. budget`} />
      </div>
    </>
  );
}

