import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/ui/Reveal";
import { SmartLink } from "../components/ui/SmartLink";
import { ToolCardLink } from "../components/ToolCardLink";
import { toolsHub } from "../content/tools";

export default function ToolsHub() {
  return (
    <>
      <PageHeader badge={toolsHub.badge} title={toolsHub.title} sub={toolsHub.sub} />
      <div className="container-x pb-24 md:pb-36">
        <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {toolsHub.cards.map((t, i) => (
            <Reveal as="li" key={t.href} delay={(i % 3) * 0.06}>
              <ToolCardLink t={t} featured={i < 2 || t.isNew} headingLevel="h2" long />
            </Reveal>
          ))}
        </ul>

        <section aria-labelledby="why-tools" className="mx-auto mt-20 max-w-3xl md:mt-28">
          <h2 id="why-tools" className="font-heading text-[1.75rem] font-semibold leading-tight tracking-tight md:text-[2.25rem]">
            Honest numbers before you spend a rupee
          </h2>
          {toolsHub.intro.map((p) => (
            <p key={p.slice(0, 24)} className="mt-4 text-[1.0625rem] leading-relaxed text-ink/85">
              {p}
            </p>
          ))}
          <p className="mt-6 text-sm text-muted">
            Want the strategy behind the numbers?{" "}
            <SmartLink href="/services" className="underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-accent">
              See how our music promotion services work
            </SmartLink>
            .
          </p>
        </section>
      </div>
    </>
  );
}
