// Small building blocks for the content pages (work, services, playlists, learn).
import type { ReactNode } from "react";
import { Reveal } from "../ui/Reveal";
import { SmartLink } from "../ui/SmartLink";

export function Section({ id, eyebrow, title, children, className = "" }: { id: string; eyebrow?: string; title: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section aria-labelledby={id} className={`border-t border-line py-16 md:py-24 ${className}`}>
      <div className="container-x">
        {eyebrow && (
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden className="h-px w-6 bg-accent" />
            {eyebrow}
          </p>
        )}
        <h2 id={id} className="mt-4 max-w-3xl scroll-mt-28 font-heading text-[clamp(1.9rem,4.4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight">
          {title}
        </h2>
        <div className="mt-8 md:mt-10">{children}</div>
      </div>
    </section>
  );
}

export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-3xl space-y-4 text-[1.0625rem] leading-relaxed text-ink/85 ${className}`}>{children}</div>;
}

export function Bullets({ items, tone = "accent" }: { items: ReactNode[]; tone?: "accent" | "meta" | "gold" }) {
  const dot = tone === "meta" ? "bg-meta" : tone === "gold" ? "bg-gold" : "bg-accent";
  return (
    <ul className="max-w-3xl space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-[1.0625rem] leading-relaxed text-ink/85">
          <span aria-hidden className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function Steps({ steps, tone = "accent" }: { steps: { title: string; body: ReactNode }[]; tone?: "accent" | "meta" }) {
  const text = tone === "meta" ? "text-meta" : "text-accent";
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="card p-6">
          <span className={`num text-sm ${text}`}>{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 font-heading text-lg font-semibold tracking-tight">{s.title}</h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** "Related pages" list with descriptive link text. */
export function RelatedLinks({ links, title = "Keep exploring" }: { links: { href: string; label: string; note?: string }[]; title?: string }) {
  return (
    <section aria-labelledby="related" className="border-t border-line py-16 md:py-20">
      <div className="container-x">
        <h2 id="related" className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l) => (
            <li key={l.href} className="card p-5">
              <SmartLink href={l.href} className="font-heading text-lg font-semibold tracking-tight underline decoration-line-strong underline-offset-4 hover:text-accent hover:decoration-accent">
                {l.label}
              </SmartLink>
              {l.note && <p className="mt-1 text-sm leading-relaxed text-muted">{l.note}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The big rounded call-to-action panel used at the bottom of content pages. */
export function CtaPanel({ title, body, children }: { title: ReactNode; body?: ReactNode; children: ReactNode }) {
  return (
    <div className="container-x py-16 md:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface p-7 md:p-12">
          <div aria-hidden className="pointer-events-none absolute -left-24 -top-32 h-80 w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(29,185,84,0.18),transparent)] blur-3xl" />
          <div className="relative md:flex md:items-center md:justify-between md:gap-10">
            <div>
              <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-[2.25rem] md:leading-tight">{title}</h2>
              {body && <p className="mt-3 max-w-xl text-muted">{body}</p>}
            </div>
            <div className="mt-6 flex flex-wrap gap-3 md:mt-0 md:shrink-0">{children}</div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
