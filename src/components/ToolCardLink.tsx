import type { ToolCard } from "../content/tools";
import { SmartLink } from "./ui/SmartLink";

const icons: Record<string, string> = {
  "/planner": "M4 18h16M7 15V9m5 6V5m5 10v-4",
  "/estimator": "M5 19 19 5M7 7h.01M17 17h.01M5 5h4v4H5zM15 15h4v4h-4z",
  "/tools/cost-per-stream": "M7 5h10M7 9h10M7 5c4 0 6 1.5 6 4s-2 4-6 4l7 6",
  "/tools/revenue-calculator": "M3 17l5-5 4 4 8-8M15 8h5v5",
  "/tools/hook-finder": "M3 12h2m3-5v10m4-13v16m4-11v6m4-3h1",
  "/tools/youtube-views-estimator": "M4 6h16v12H4zM10 9.5l4.5 2.5-4.5 2.5z",
};

/**
 * A tool card. The whole card is clickable, but the link's text is just the tool's
 * name (an invisible layer stretches the link over the card), which reads cleanly
 * for screen readers and Google.
 */
export function ToolCardLink({ t, featured, headingLevel = "h3", long }: { t: ToolCard; featured?: boolean; headingLevel?: "h2" | "h3"; long?: boolean }) {
  const H = headingLevel;
  return (
    <div
      className={`group card relative flex h-full flex-col overflow-hidden p-6 transition-[border-color,transform] duration-500 ease-[var(--ease-brand)] focus-within:border-accent/40 hover:-translate-y-1 hover:border-accent/40 md:p-7 ${
        featured ? "bg-[linear-gradient(160deg,rgba(29,185,84,0.10),transparent_55%)]" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong bg-surface-2 text-accent">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d={icons[t.href] ?? icons["/planner"]} />
          </svg>
        </span>
        <span className="flex items-center gap-2">
          {t.isNew && <span className="rounded-full bg-accent px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-[#04110a]">New</span>}
          <span className="rounded-full border border-line px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-muted">{t.tag}</span>
        </span>
      </div>
      <H className="mt-8 font-heading text-xl font-semibold tracking-tight md:text-[1.4rem]">
        <SmartLink href={t.href} className="outline-none after:absolute after:inset-0 after:rounded-[var(--radius-lg)] after:content-[''] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-accent">
          {t.title}
        </SmartLink>
      </H>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{long ? t.description : t.benefit}</p>
      <span aria-hidden className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-ink">
        <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </div>
  );
}
