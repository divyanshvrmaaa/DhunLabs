import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PlanId } from "../../lib/estimate";
import { plans } from "../../content/plans";

/** The "Recommended plan" header + what's included, with a smooth swap when the plan changes. */
export function PlanCard({ plan, children, extra }: { plan: PlanId; children?: ReactNode; extra?: ReactNode }) {
  const p = plans[plan];
  return (
    <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-line-strong bg-surface p-6 shadow-[0_40px_120px_-40px_rgba(29,185,84,0.35)] md:p-8">
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl transition-colors duration-700 ${
          plan === "combined" ? "bg-[radial-gradient(closest-side,rgba(76,141,255,0.3),transparent)]" : "bg-[radial-gradient(closest-side,rgba(29,185,84,0.28),transparent)]"
        }`}
      />
      <p className="eyebrow relative">Recommended plan</p>
      <div className="relative mt-3 min-h-[5.5rem]" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={plan}
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-heading text-[1.75rem] font-semibold leading-tight tracking-tight md:text-[2.1rem]">
              <span className={plan === "combined" ? "text-meta" : "text-accent"}>●</span> {p.name}
            </h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{p.reason}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative">{children}</div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={plan}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative mt-6 space-y-2.5"
        >
          {p.includes.map((i) => (
            <li key={i} className="flex gap-3 text-[0.95rem] leading-snug">
              <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden>
                <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {i}
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
      {extra && <div className="relative mt-6">{extra}</div>}
    </div>
  );
}
