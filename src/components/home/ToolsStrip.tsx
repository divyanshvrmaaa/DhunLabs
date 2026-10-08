import { homeToolsStrip, toolsHub } from "../../content/tools";
import { Reveal } from "../ui/Reveal";
import { SmartLink } from "../ui/SmartLink";
import { ToolCardLink } from "../ToolCardLink";

export function ToolsStrip() {
  const cards = homeToolsStrip.hrefs.map((h) => toolsHub.cards.find((c) => c.href === h)!).filter(Boolean);
  return (
    <section aria-labelledby="tools-strip-title" className="border-t border-line py-24 md:py-32">
      <div className="container-x">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-6 bg-accent" />
              Free tools
            </p>
            <h2 id="tools-strip-title" className="mt-5 font-heading text-3xl font-semibold tracking-tight md:text-5xl">
              {homeToolsStrip.title}
            </h2>
          </div>
          <SmartLink href="/tools" className="inline-flex min-h-11 items-center gap-1.5 text-[0.95rem] font-medium text-muted hover:text-ink">
            See all tools <span aria-hidden>→</span>
          </SmartLink>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.href} delay={i * 0.06}>
              <ToolCardLink t={c} featured={i < 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
