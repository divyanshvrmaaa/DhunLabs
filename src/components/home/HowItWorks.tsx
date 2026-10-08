import { howItWorks } from "../../content/pillars";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { SmartLink } from "../ui/SmartLink";

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="pb-24 md:pb-36">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden className="h-px w-6 bg-accent" />
            {howItWorks.eyebrow}
          </p>
          <h2 id="how-title" className="mt-5 font-heading text-3xl font-semibold tracking-tight md:text-5xl">
            {howItWorks.title}
          </h2>
        </Reveal>

        <ol className="relative mt-12 grid gap-0 md:mt-16 md:grid-cols-4 md:gap-6">
          <span aria-hidden className="absolute left-[19px] top-2 bottom-2 w-px bg-line-strong md:left-0 md:right-0 md:top-[19px] md:bottom-auto md:h-px md:w-auto" />
          {howItWorks.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.08} className="relative flex gap-5 pb-10 last:pb-0 md:flex-col md:gap-6 md:pb-0">
              <span className="num relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-bg text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-1.5 md:pt-0">
                <h3 className="font-heading text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{s.body}</p>
                {s.link && (
                  <SmartLink href={s.link.href} className="mt-2 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent hover:underline">
                    {s.link.label} <span aria-hidden>→</span>
                  </SmartLink>
                )}
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-16 md:mt-20">
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface p-7 md:flex md:items-center md:justify-between md:gap-10 md:p-12">
            <div aria-hidden className="pointer-events-none absolute -left-20 -top-28 h-72 w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(29,185,84,0.18),transparent)] blur-2xl" />
            <p className="relative max-w-2xl font-heading text-2xl font-semibold leading-tight tracking-tight md:text-[2.1rem]">
              {howItWorks.banner.title}
            </p>
            <div className="relative mt-6 md:mt-0">
              <Button href="/planner" size="lg" arrow>
                {howItWorks.banner.cta}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
