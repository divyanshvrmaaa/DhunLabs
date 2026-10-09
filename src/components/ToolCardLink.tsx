import type { ToolCard } from "../content/tools";
import { SmartLink } from "./ui/SmartLink";

const icons: Record<string, string> = {
  "/planner": "M4 18h16M7 15V9m5 6V5m5 10v-4",
  "/estimator": "M5 19 19 5M7 7h.01M17 17h.01M5 5h4v4H5zM15 15h4v4h-4z",
  "/tools/release-roadmap": "M7 3v3m10-3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm4 9 2 2 4-4",
  "/tools/playlist-readiness": "M9 12l2 2 4-4M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
  "/tools/cost-per-stream": "M7 5h10M7 9h10M7 5c4 0 6 1.5 6 4s-2 4-6 4l7 6",
  "/tools/pitch-writer": "M4 20h4L19 9l-4-4L4 16v4Zm10-14 4 4",
  "/tools/revenue-calculator": "M3 17l5-5 4 4 8-8M15 8h5v5",
};

export function ToolCardLink({ t, featured, headingLevel = "h3" }: { t: ToolCard; featured?: boolean; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <SmartLink
      href={t.href}
      className={`group card relative flex h-full flex-col overflow-hidden p-6 transition-[border-color,transform] duration-500 ease-[var(--ease-brand)] hover:-translate-y-1 hover:border-accent/40 md:p-7 ${
        featured ? "bg-[linear-gradient(160deg,rgba(29,185,84,0.10),transparent_55%)]" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong bg-surface-2 text-accent">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d={icons[t.href] ?? icons["/planner"]} />
          </svg>
        </span>
        <span className="rounded-full border border-line px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-muted">{t.tag}</span>
      </div>
      <H className="mt-8 font-heading text-xl font-semibold tracking-tight md:text-[1.4rem]">{t.title}</H>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{t.benefit}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-ink">
        Open <span aria-hidden className="text-accent transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </SmartLink>
  );
}
