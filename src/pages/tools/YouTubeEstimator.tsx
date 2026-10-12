import { useMemo, useState } from "react";
import { ToolShell } from "../../components/tools/ToolShell";
import { CopyButton } from "../../components/tools/CopyButton";
import { ShareCard } from "../../components/tools/ShareCard";
import { NumberField, Chips } from "../../components/planner/Fields";
import { MobileResultBar } from "../../components/planner/MobileResultBar";
import { AnimatedNumber } from "../../components/ui/AnimatedNumber";
import { Button } from "../../components/ui/Button";
import { SmartLink } from "../../components/ui/SmartLink";
import { ToolGuide, GuideJumpLinks } from "../../components/guide/ToolGuide";
import { youtubeEstimatorGuide, YT_BUDGET_CHIPS } from "../../content/guides/youtubeEstimator";
import { VIEW_CHIPS, YT_CPV_AVG, YT_CPV_HIGH, YT_CPV_LOW } from "../../content/pricing";
import { budgetForViews, round100, viewsForBudget } from "../../lib/estimate";
import { formatINR, formatINR2, formatNumber, formatRange } from "../../lib/format";
import { numParam, shareUrl, useUrlInputs } from "../../lib/shareUrl";

type Mode = "budget" | "views";
const MAX = 10_000_000;

export default function YouTubeEstimator() {
  const [mode, setMode] = useState<Mode>("budget");
  const [budget, setBudget] = useState(10000);
  const [views, setViews] = useState(100000);

  // Shared links open pre-filled: ?mode=views&views=100000 or ?mode=budget&budget=10000
  useUrlInputs((q) => {
    if (q.get("mode") === "views") setMode("views");
    if (q.get("mode") === "budget") setMode("budget");
    const b = numParam(q, "budget", 0, MAX);
    if (b !== undefined) setBudget(b);
    const v = numParam(q, "views", 0, MAX);
    if (v !== undefined) setViews(v);
  });

  const vr = useMemo(() => viewsForBudget(budget), [budget]);
  const br = useMemo(() => budgetForViews(views), [views]);
  const avgViews = round100(budget / YT_CPV_AVG);
  const avgBudget = round100(views * YT_CPV_AVG);
  const isBudget = mode === "budget";
  const bigText = isBudget ? formatRange(vr.low, vr.high) : formatRange(br.low, br.high, true);
  const link = shareUrl("/tools/youtube-views-estimator", isBudget ? { mode, budget } : { mode, views }, "youtube-views-estimator");
  const summary = [
    isBudget ? `YouTube budget: ${formatINR(budget)} → est. ${bigText} views` : `YouTube views wanted: ${formatNumber(views)} → est. budget ${bigText}`,
    isBudget ? `At our average cost per view (${formatINR2(YT_CPV_AVG)}): about ${formatNumber(avgViews)} views` : `At our average cost per view (${formatINR2(YT_CPV_AVG)}): about ${formatINR(avgBudget)}`,
    "Estimates from our recent Google Ads video campaigns. Results vary. Not a guarantee.",
    `See this estimate: ${link}`,
  ].join("\n");

  return (
    <ToolShell
      badge="FREE TOOL · YOUTUBE VIEWS"
      title={
        <>
          YouTube Promotion <span className="text-gold">Cost Estimator</span>
        </>
      }
      kicker="How many views will your budget buy?"
      sub="Enter a budget or a view goal. See an honest estimate based on what our own Google Ads video campaigns paid per view."
      guide={<ToolGuide g={youtubeEstimatorGuide} />}
      cta={
        <div className="md:flex md:items-center md:justify-between md:gap-10">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">Want us to run your YouTube campaign?</h2>
            <p className="mt-2 max-w-xl text-muted">Tell us about your video and your goal. YouTube runs as its own campaign, alongside Spotify if you like.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            <Button form="onboarding" location="youtube-estimator" size="lg" arrow>
              Book a Strategy Audit
            </Button>
            <Button href="/estimator" variant="secondary" size="lg">
              Spotify + YouTube Estimator
            </Button>
          </div>
        </div>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
        <section aria-label="Your input" className="card self-start p-6 md:p-8">
          <div role="radiogroup" aria-label="What do you know?" className="grid grid-cols-2 gap-2 rounded-full border border-line bg-surface-2 p-1">
            {(
              [
                ["budget", "I have a budget"],
                ["views", "I have a view goal"],
              ] as [Mode, string][]
            ).map(([m, label]) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={mode === m}
                onClick={() => setMode(m)}
                className={`min-h-11 rounded-full px-3 text-sm font-semibold transition-colors ${mode === m ? "bg-ink text-bg" : "text-muted hover:text-ink"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {isBudget ? (
              <>
                <NumberField id="yt-budget" size="xl" prefix="₹" label={<span className="eyebrow">Your YouTube ad budget</span>} value={budget} onChange={setBudget} min={0} max={MAX} />
                <div className="mt-4">
                  <Chips label="Quick budgets" values={YT_BUDGET_CHIPS} current={budget} onPick={setBudget} format={formatINR} />
                </div>
              </>
            ) : (
              <>
                <NumberField id="yt-views" size="xl" label={<span className="eyebrow">YouTube views you want</span>} value={views} onChange={setViews} min={0} max={MAX} />
                <div className="mt-4">
                  <Chips label="Quick view goals" values={VIEW_CHIPS} current={views} onPick={setViews} format={formatNumber} />
                </div>
              </>
            )}
          </div>
          <p className="mt-8 rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm leading-relaxed text-muted">
            Want Spotify streams too?{" "}
            <SmartLink href="/estimator" className="underline decoration-line-strong underline-offset-4 hover:text-ink">
              The Stream Estimator shows both budgets together
            </SmartLink>
            .
          </p>
        </section>

        <section id="yt-result" aria-label="Estimate" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-line-strong bg-surface p-6 shadow-[0_40px_120px_-40px_rgba(245,200,66,0.3)] md:p-8">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(245,200,66,0.22),transparent)] blur-3xl" />
            <p className="eyebrow relative">{isBudget ? "Estimated YouTube views" : "Estimated budget"}</p>
            <p className="num relative mt-4 text-[clamp(2.4rem,6vw,3.6rem)] font-semibold leading-[1.02]" aria-live="polite">
              {isBudget ? (
                <>
                  <AnimatedNumber value={vr.low} format={formatNumber} />
                  <span className="text-muted">–</span>
                  <AnimatedNumber value={vr.high} format={formatNumber} />
                </>
              ) : (
                <>
                  <span className="text-muted">₹</span>
                  <AnimatedNumber value={br.low} format={formatNumber} />
                  <span className="text-muted">–₹</span>
                  <AnimatedNumber value={br.high} format={formatNumber} />
                </>
              )}
            </p>
            <dl className="relative mt-6 space-y-3 border-t border-line pt-6 text-sm">
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="text-muted">At our average ({formatINR2(YT_CPV_AVG)} per view)</dt>
                <dd className="num font-semibold">{isBudget ? `~${formatNumber(avgViews)} views` : `~${formatINR(avgBudget)}`}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="text-muted">Cost per view in our campaigns</dt>
                <dd className="num font-semibold">
                  {formatINR2(YT_CPV_LOW)}–{formatINR2(YT_CPV_HIGH)}
                </dd>
              </div>
            </dl>
            <div className="relative mt-6 flex flex-wrap gap-2">
              <CopyButton text={summary} source="youtube-views-estimator" />
            </div>
            <div className="relative mt-4">
              <ShareCard
                fileName="dhunlabs-youtube-views"
                link={link}
                text={isBudget ? `My YouTube budget: ${formatINR(budget)} → ${bigText} est. views` : `${formatNumber(views)} YouTube views ≈ ${bigText} est. budget`}
                spec={{
                  tool: "YouTube Views Estimator",
                  lead: isBudget ? `My budget: ${formatINR(budget)} →` : `${formatNumber(views)} YouTube views would cost about`,
                  big: bigText,
                  tail: isBudget ? "estimated YouTube views" : "estimated budget",
                  inputs: [
                    ["At our average", isBudget ? `~${formatNumber(avgViews)} views` : `~${formatINR(avgBudget)}`],
                    ["Cost per view", `${formatINR2(YT_CPV_LOW)}–${formatINR2(YT_CPV_HIGH)}`],
                  ],
                  url: "dhunlabs.studio/tools/youtube-views-estimator",
                }}
              />
            </div>
            <p className="relative mt-6 border-t border-line pt-5 text-xs leading-relaxed text-muted">
              Estimates from our Google Ads video campaigns (11 Aug to 7 Oct 2026). Ad spend only. Results vary by video, format and audience. Not a guarantee.
            </p>
          </div>
        </section>
      </div>
      <GuideJumpLinks />
      <MobileResultBar targetId="yt-result" title={isBudget ? "Estimated YouTube views" : "Estimated budget"} value={bigText} cta="See estimate" />
    </ToolShell>
  );
}
