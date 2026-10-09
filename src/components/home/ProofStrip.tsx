import { useId, useState } from "react";
import { stats, marqueeExtras } from "../../content/stats";
import { AnimatedNumber } from "../ui/AnimatedNumber";
import { Reveal } from "../ui/Reveal";

function StatNote({ note }: { note: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-describedby={id}
        aria-label="When is this number from?"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="-m-3 inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
          <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8 7v4.2M8 4.6v.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
      <span
        id={id}
        role="tooltip"
        className={`pointer-events-none absolute bottom-full right-0 z-20 mb-2 w-max max-w-[13rem] rounded-lg border border-line-strong bg-surface-3 px-3 py-2 text-xs leading-snug text-ink shadow-xl transition-[opacity,transform] duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible translate-y-1 opacity-0"
        }`}
      >
        {note}
      </span>
    </span>
  );
}

export function ProofStrip() {
  const items = marqueeExtras;
  return (
    <section aria-label="Results at a glance" className="relative border-y border-line">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.06}
            className={`relative py-9 pr-4 md:py-12 ${i % 2 === 1 ? "pl-5 border-l border-line" : ""} ${
              i >= 2 ? "border-t border-line lg:border-t-0" : ""
            } ${i === 2 ? "lg:border-l lg:pl-5" : ""} ${i === 3 ? "lg:pl-5" : ""}`}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="num text-[clamp(2.4rem,6vw,4.25rem)] font-semibold leading-none">
                {s.prefix && <span className="text-muted">{s.prefix}</span>}
                <AnimatedNumber value={s.value} format={(n) => Math.round(n).toString()} countUpOnView />
                <span className="text-accent">{s.suffix}</span>
              </p>
              <StatNote note={s.note} />
            </div>
            <p className="mt-3 max-w-[16rem] text-sm leading-snug text-muted md:text-[0.95rem]">
              {s.value === 100 ? (
                <>
                  <span className="font-semibold text-ink">Bot-free.</span> No botted playlists, ever.
                </>
              ) : (
                s.label
              )}
            </p>
          </Reveal>
        ))}
      </div>

      <div className="relative overflow-hidden border-t border-line py-5" aria-label="What we do">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent md:w-40" />
        <div className="animate-marquee flex w-max motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {items.map((t) => (
                <li key={t} className="flex items-center whitespace-nowrap font-heading text-lg font-medium text-ink/80 md:text-xl">
                  <span className="px-6 md:px-8">{t}</span>
                  <span aria-hidden className="text-accent">
                    ✦
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
