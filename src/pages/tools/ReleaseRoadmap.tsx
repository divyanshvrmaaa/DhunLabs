import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ToolShell } from "../../components/tools/ToolShell";
import { CopyButton } from "../../components/tools/CopyButton";
import { Segmented } from "../../components/planner/Fields";
import { Button } from "../../components/ui/Button";
import { roadmapTasks, sources, type ReleaseType } from "../../content/tools";
import { addDays, buildIcs, formatDay, nextFridayAfter, parseISODate, startOfToday, toISODate } from "../../lib/dates";
import { track } from "../../lib/analytics";

const typeOptions = [
  { value: "single", label: "Single" },
  { value: "ep", label: "EP" },
  { value: "album", label: "Album" },
] as const;

const relLabel = (day: number) => (day === 0 ? "Release day" : day < 0 ? `${Math.abs(day)} days before` : `${day} days after`);

export default function ReleaseRoadmap() {
  const [dateStr, setDateStr] = useState(() => toISODate(nextFridayAfter(42)));
  const [type, setType] = useState<ReleaseType>("single");
  const release = parseISODate(dateStr);
  const today = startOfToday();

  const items = useMemo(() => {
    if (!release) return [];
    return roadmapTasks
      .filter((t) => !t.only || t.only.includes(type))
      .map((t) => ({ ...t, date: addDays(release, t.day) }));
  }, [release?.getTime(), type]);

  const typeLabel = typeOptions.find((o) => o.value === type)!.label;
  const text = release
    ? [`Release roadmap: ${typeLabel}, out ${formatDay(release)}`, "", ...items.map((i) => `${formatDay(i.date)} (${relLabel(i.day)}): ${i.title}. ${i.detail}`), "", "Made with the free Release Roadmap at dhunlabs.studio/tools/release-roadmap"].join("\n")
    : "";

  const download = () => {
    if (!release) return;
    const ics = buildIcs(
      items.map((i) => ({ date: i.date, title: `${i.title} (${typeLabel} release)`, detail: i.detail })),
      `${typeLabel} release roadmap`,
    );
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `release-roadmap-${dateStr}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    track("tool_use", { tool: "release-roadmap", action: "ics", type });
  };

  const tooSoon = release ? (release.getTime() - today.getTime()) / 86400000 < 7 : false;

  return (
    <ToolShell
      badge="FREE TOOL · RELEASE ROADMAP"
      title={
        <>
          Your release, <span className="text-accent">day by day.</span>
        </>
      }
      sub="Pick your release date and type. Get a dated checklist from six weeks before release to four weeks after, ready for your calendar."
      sources={[sources.pitching, sources.releaseRadar, sources.releaseGuide]}
      cta={
        <div className="md:flex md:items-center md:justify-between md:gap-10">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">Want us to run the release campaign?</h2>
            <p className="mt-2 max-w-xl text-muted">We build the ads around your hook and track every step, from pre-save to post-release.</p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button form="onboarding" location="tool-release-roadmap" size="lg" arrow>
              Book a Strategy Audit
            </Button>
          </div>
        </div>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-8">
        <section aria-label="Release details" className="card self-start p-6 md:p-7 lg:sticky lg:top-24">
          <label htmlFor="release-date" className="block text-sm font-medium text-muted">
            Release date
          </label>
          <input
            id="release-date"
            type="date"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="num mt-2 min-h-12 w-full rounded-[var(--radius-md)] border border-line-strong bg-surface-2 px-4 text-lg font-semibold text-ink outline-none [color-scheme:dark] focus:border-accent/60"
          />
          {tooSoon && <p className="mt-2 text-xs text-gold">That's less than a week away, so the pitching steps are already past. Plan the next one with more lead time.</p>}
          <div className="mt-6">
            <Segmented label="Release type" options={[...typeOptions]} value={type} onChange={setType} />
          </div>
          <div className="mt-8 flex flex-col gap-2">
            <button
              type="button"
              onClick={download}
              disabled={!release}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-[#04110a] transition-colors hover:bg-[#21cc5d] disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M7 3v3m10-3v3M4 8h16M5 5h14v15H5zM12 11v6m-3-3 3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download to calendar (.ics)
            </button>
            <CopyButton text={text} label="Copy as text" source="release-roadmap" />
          </div>
        </section>

        <section aria-label="Your roadmap">
          {release ? (
            <ol className="relative">
              <span aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px bg-line-strong" />
              {items.map((i, idx) => {
                const past = i.date < today;
                const isRelease = i.day === 0;
                return (
                  <motion.li
                    key={`${i.day}-${i.title}`}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: idx * 0.025, ease: [0.16, 1, 0.3, 1] }}
                    className="relative pb-7 pl-9 last:pb-0"
                  >
                    <span
                      aria-hidden
                      className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 ${
                        isRelease ? "border-accent bg-accent shadow-[0_0_20px_rgba(29,185,84,0.7)]" : i.key ? "border-accent bg-bg" : "border-line-strong bg-bg"
                      }`}
                    />
                    <p className={`num text-xs font-medium uppercase tracking-wider ${isRelease ? "text-accent" : "text-muted"}`}>
                      {formatDay(i.date)} · {relLabel(i.day)}
                      {past && <span className="ml-2 rounded-full border border-line px-2 py-0.5 normal-case tracking-normal">already past</span>}
                    </p>
                    <h3 className={`mt-1 font-heading font-semibold tracking-tight ${isRelease ? "text-2xl" : "text-lg md:text-xl"} ${past ? "text-ink/50" : ""}`}>{i.title}</h3>
                    <p className={`mt-1 max-w-2xl text-[0.95rem] leading-relaxed ${past ? "text-muted/70" : "text-muted"}`}>{i.detail}</p>
                  </motion.li>
                );
              })}
            </ol>
          ) : (
            <p className="text-muted">Pick a release date to see your roadmap.</p>
          )}
        </section>
      </div>
    </ToolShell>
  );
}
