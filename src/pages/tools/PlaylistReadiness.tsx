import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ToolShell } from "../../components/tools/ToolShell";
import { CopyButton } from "../../components/tools/CopyButton";
import { Button } from "../../components/ui/Button";
import { AnimatedNumber } from "../../components/ui/AnimatedNumber";
import { readinessQuestions, readinessVerdicts, sources } from "../../content/tools";
import { track } from "../../lib/analytics";

type Answer = "yes" | "no";

export default function PlaylistReadiness() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const answered = Object.keys(answers).length;
  const total = readinessQuestions.length;
  const score = Object.values(answers).filter((a) => a === "yes").length;
  const done = answered === total;
  const verdict = score >= readinessVerdicts.ready.min ? readinessVerdicts.ready : score >= readinessVerdicts.almost.min ? readinessVerdicts.almost : readinessVerdicts.notYet;
  const fixes = readinessQuestions.filter((q) => answers[q.id] === "no");
  const color = verdict === readinessVerdicts.ready ? "text-accent" : verdict === readinessVerdicts.almost ? "text-gold" : "text-[#ff7a59]";

  const set = (id: string, a: Answer) => {
    setAnswers((prev) => {
      const next = { ...prev, [id]: a };
      if (Object.keys(next).length === total && Object.keys(prev).length < total) track("tool_use", { tool: "playlist-readiness", action: "complete" });
      return next;
    });
  };

  const text = [
    `Playlist-readiness score: ${score}/${total} (${done ? verdict.label : "in progress"})`,
    ...(fixes.length ? ["", "Fixes:", ...fixes.map((f) => `• ${f.fix}`)] : []),
    "",
    "Check yours free at dhunlabs.studio/tools/playlist-readiness",
  ].join("\n");

  return (
    <ToolShell
      badge="FREE TOOL · PLAYLIST READINESS"
      title={
        <>
          Is your song <span className="text-accent">playlist-ready?</span>
        </>
      }
      sub="Answer 10 quick yes/no questions. Get a score out of 10, a straight verdict and the exact fixes to make before you pitch."
      sources={[sources.streams, sources.coverArt, sources.releaseRadar]}
      cta={
        <div className="md:flex md:items-center md:justify-between md:gap-10">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">Ready? Send it to us.</h2>
            <p className="mt-2 max-w-xl text-muted">Every track is personally reviewed for our playlist network. Placement is considered, not guaranteed.</p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button form="track" location="tool-playlist-readiness" size="lg" arrow>
              Submit Your Track
            </Button>
          </div>
        </div>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_minmax(0,24rem)] lg:gap-8">
        <ol className="space-y-3">
          {readinessQuestions.map((q, i) => {
            const a = answers[q.id];
            return (
              <li key={q.id} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
                <p className="flex gap-4 text-[1.02rem] leading-snug">
                  <span className="num pt-0.5 text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span id={`q-${q.id}`}>{q.question}</span>
                </p>
                <div role="radiogroup" aria-labelledby={`q-${q.id}`} className="flex shrink-0 gap-2 pl-9 sm:pl-0">
                  {(["yes", "no"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      role="radio"
                      aria-checked={a === v}
                      onClick={() => set(q.id, v)}
                      className={`min-h-11 min-w-16 rounded-full border px-4 text-sm font-semibold capitalize transition-all duration-300 ${
                        a === v
                          ? v === "yes"
                            ? "border-accent bg-accent text-[#04110a]"
                            : "border-[#ff7a59] bg-[#ff7a59]/15 text-ink"
                          : "border-line-strong text-muted hover:text-ink"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>

        <aside aria-label="Your score" className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6 md:p-8">
            <p className="eyebrow">Score</p>
            <p className="num mt-3 text-[5.5rem] font-semibold leading-none">
              <AnimatedNumber value={score} format={(n) => Math.round(n).toString()} />
              <span className="text-3xl text-muted">/{total}</span>
            </p>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden>
              <motion.div className="h-full rounded-full bg-accent" animate={{ width: `${(answered / total) * 100}%` }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
            </div>
            <p className="mt-2 text-xs text-muted">
              {answered} of {total} answered
            </p>
            <div aria-live="polite">
              <AnimatePresence mode="wait">
                {done && (
                  <motion.div key={verdict.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="mt-6 border-t border-line pt-6">
                    <p className={`font-heading text-3xl font-semibold ${color}`}>{verdict.label}</p>
                    <p className="mt-1 text-muted">{verdict.line}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {fixes.length > 0 && (
              <div className="mt-6 border-t border-line pt-6">
                <p className="text-sm font-semibold">Fix these</p>
                <ul className="mt-3 space-y-3">
                  {fixes.map((f) => (
                    <li key={f.id} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff7a59]" />
                      {f.fix}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              <CopyButton text={text} source="playlist-readiness" />
              {answered > 0 && (
                <button type="button" onClick={() => setAnswers({})} className="min-h-11 px-3 text-sm text-muted underline underline-offset-4 hover:text-ink">
                  Start over
                </button>
              )}
            </div>
          </div>
        </aside>
      </div>
    </ToolShell>
  );
}
