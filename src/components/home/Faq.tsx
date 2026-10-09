import { useId, useState } from "react";
import { faqIntro, faqs } from "../../content/faq";
import { mailto, site } from "../../content/site";
import { Reveal } from "../ui/Reveal";
import { SmartLink } from "../ui/SmartLink";
import { Button } from "../ui/Button";
import { track } from "../../lib/analytics";

function FaqRow({ q, a, links, defaultOpen }: { q: string; a: string; links?: { label: string; href: string }[]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const id = useId();
  return (
    <li className="border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => {
            setOpen((v) => !v);
            if (!open) track("faq_open", { q: q.slice(0, 60) });
          }}
          className="group flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left font-heading text-lg font-semibold tracking-tight md:text-xl"
        >
          <span className="transition-colors group-hover:text-accent">{q}</span>
          <span
            aria-hidden
            className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-[var(--ease-brand)] ${
              open ? "rotate-45 border-accent bg-accent/15 text-accent" : "border-line-strong text-muted"
            }`}
          >
            +
          </span>
        </button>
      </h3>
      {/* Answers stay in the HTML (good for Google) and animate open with a grid-rows transition */}
      <div
        id={id}
        className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-brand)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        inert={!open}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-5 text-[1.0625rem] leading-relaxed text-muted">{a}</p>
          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-2 pb-6">
              {links.map((l) => (
                <SmartLink
                  key={l.href}
                  href={l.href}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {l.label} <span aria-hidden>→</span>
                </SmartLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line py-24 md:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-6 bg-accent" />
              {faqIntro.eyebrow}
            </p>
            <h2 id="faq-title" className="h-section mt-5 text-balance">
              {faqIntro.title}
            </h2>
            <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-muted">{faqIntro.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button form="onboarding" location="faq" arrow>
                Ask us anything
              </Button>
              <Button href={mailto} variant="secondary">
                {site.email}
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <ul className="border-t border-line">
            {faqs.map((f, i) => (
              <FaqRow key={f.q} {...f} defaultOpen={i === 0} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
