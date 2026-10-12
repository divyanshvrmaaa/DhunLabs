import type { ReactNode } from "react";
import type { GuideBand, ToolGuideContent } from "../../content/guides/types";
import { receipts, receiptsAsOf } from "../../content/caseStudies";
import { toolsHub } from "../../content/tools";
import { SmartLink } from "../ui/SmartLink";

const bandTone: Record<GuideBand["tone"], string> = {
  good: "border-success/40 text-success",
  ok: "border-accent/40 text-accent",
  high: "border-gold/40 text-gold",
  warn: "border-gold/40 text-gold",
  bad: "border-[#ff7a59]/40 text-[#ff7a59]",
  info: "border-line-strong text-ink",
};

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 font-heading text-[1.75rem] font-semibold leading-tight tracking-tight md:text-[2.25rem]">
      {children}
    </h2>
  );
}

const P = ({ children }: { children: ReactNode }) => <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink/85">{children}</p>;

/** Small in-page menu shown right under a tool, pointing to the written guide below. */
export function GuideJumpLinks({ hasMethod = true }: { hasMethod?: boolean }) {
  const links = [
    { href: "#how-to-use", label: "How to use it" },
    { href: "#reading-your-result", label: "Reading your result" },
    ...(hasMethod ? [{ href: "#how-we-calculate", label: "How we calculate this" }] : []),
    { href: "#faq", label: "FAQ" },
  ];
  return (
    <nav aria-label="On this page" className="mt-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-sm text-muted">
      <span className="mr-2 text-xs uppercase tracking-[0.14em]">Guide:</span>
      {links.map((l) => (
        <a key={l.href} href={l.href} className="inline-flex min-h-10 items-center rounded-full px-3 underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-accent">
          {l.label}
        </a>
      ))}
    </nav>
  );
}

/** The written guide below each tool: how to use, reading the result, method, benchmarks, FAQ, related tools. */
export function ToolGuide({ g }: { g: ToolGuideContent }) {
  const shownReceipts = g.benchmarks.receiptIds.map((id) => receipts.find((r) => r.id === id)!).filter(Boolean);
  const related = g.related.map((href) => toolsHub.cards.find((c) => c.href === href)!).filter(Boolean);

  return (
    <article aria-label={`${g.name}: guide`} className="mx-auto mt-20 max-w-3xl md:mt-28">
      <p className="eyebrow flex items-center gap-3">
        <span aria-hidden className="h-px w-6 bg-accent" />
        The guide
      </p>

      {/* 1. How to use */}
      <section aria-labelledby="how-to-use" className="mt-6">
        <H2 id="how-to-use">How to use the {g.name}</H2>
        <ol className="mt-6 space-y-5">
          {g.howTo.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="num flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-sm text-accent">{i + 1}</span>
              <div>
                <h3 className="font-heading text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-1 leading-relaxed text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 2. Reading the result */}
      <section aria-labelledby="reading-your-result" className="mt-16 border-t border-line pt-14">
        <H2 id="reading-your-result">How to read your result</H2>
        <P>{g.reading.intro}</P>
        <ul className="mt-6 grid gap-3">
          {g.reading.bands.map((b) => (
            <li key={b.label} className="card flex flex-col gap-1 p-5 sm:flex-row sm:items-baseline sm:gap-5">
              <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider sm:w-44 sm:text-center ${bandTone[b.tone]}`}>{b.label}</span>
              <span className="leading-relaxed text-ink/85">{b.text}</span>
            </li>
          ))}
        </ul>
        {g.reading.outro && <P>{g.reading.outro}</P>}
      </section>

      {/* 3. Method */}
      {g.method && (
        <section aria-labelledby="how-we-calculate" className="mt-16 border-t border-line pt-14">
          <H2 id="how-we-calculate">How we calculate this</H2>
          <P>{g.method.intro}</P>
          <ul className="mt-5 space-y-3">
            {g.method.points.map((pt) => (
              <li key={pt} className="flex gap-3 leading-relaxed text-ink/85">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
          {g.method.table && (
            <div className="mt-8 overflow-x-auto rounded-[var(--radius-md)] border border-line">
              <table className="w-full min-w-[20rem] text-left text-sm">
                <caption className="border-b border-line bg-surface px-4 py-3 text-left text-xs text-muted">{g.method.table.caption}</caption>
                <thead>
                  <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
                    {g.method.table.head.map((h) => (
                      <th key={h} scope="col" className="px-4 py-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {g.method.table.rows.map((row) => (
                    <tr key={row.join("|")} className="border-b border-line last:border-0">
                      {row.map((cell, i) => (
                        <td key={i} className={`num px-4 py-3 ${i === 0 ? "font-semibold text-ink" : "text-ink/85"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {g.method.outro && <P>{g.method.outro}</P>}
        </section>
      )}

      {/* 4. Benchmarks */}
      <section aria-labelledby="benchmarks" className="mt-16 border-t border-line pt-14">
        <H2 id="benchmarks">Real benchmarks from our campaigns</H2>
        <P>{g.benchmarks.intro}</P>
        <ul className="mt-6 grid gap-3">
          {g.benchmarks.extra?.map((b) => (
            <li key={b.title} className="card p-5 md:p-6">
              <p className="eyebrow text-accent">{b.title}</p>
              <p className="mt-3 leading-relaxed text-ink/90">{b.text}</p>
              {b.note && <p className="mt-2 text-sm leading-relaxed text-muted">{b.note}</p>}
            </li>
          ))}
          {shownReceipts.map((r) => (
            <li key={r.id} className="card p-5 md:p-6">
              <p className={`eyebrow ${r.tone === "youtube" ? "text-gold" : r.tone === "meta" ? "text-meta" : "text-accent"}`}>
                {r.tag} · {r.title}
              </p>
              <p className="mt-3 leading-relaxed text-ink/90">
                <span className="num font-semibold text-ink">{r.big}</span> {r.bigLabel}
                {r.facts.map((f) => (
                  <span key={f.label}>
                    {" · "}
                    <span className="num font-semibold text-ink">{f.value}</span> {f.label}
                  </span>
                ))}
                .
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {r.context} {r.metricNote ? `${r.metricNote}. ` : ""}
                {receiptsAsOf}.
              </p>
            </li>
          ))}
        </ul>
        {g.benchmarks.outro && <P>{g.benchmarks.outro}</P>}
        <p className="mt-5 text-sm">
          <SmartLink href="/work" className="inline-flex min-h-11 items-center underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-accent">
            See all our campaign results
          </SmartLink>
        </p>
      </section>

      {/* 5. FAQ */}
      <section aria-labelledby="faq" className="mt-16 border-t border-line pt-14">
        <H2 id="faq">Frequently asked questions</H2>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {g.faqs.map((f) => (
            <div key={f.q} className="py-6">
              <h3 className="font-heading text-lg font-semibold tracking-tight md:text-xl">{f.q}</h3>
              <p className="mt-2 leading-relaxed text-ink/80">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Related tools */}
      <section aria-labelledby="related-tools" className="mt-16 border-t border-line pt-14">
        <H2 id="related-tools">Related free tools</H2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {related.map((t) => (
            <li key={t.href} className="card p-5">
              <SmartLink href={t.href} className="font-heading text-lg font-semibold tracking-tight underline decoration-line-strong underline-offset-4 hover:text-accent hover:decoration-accent">
                {t.title}
              </SmartLink>
              <p className="mt-1 text-sm leading-relaxed text-muted">{t.benefit}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm">
          <SmartLink href="/tools" className="inline-flex min-h-11 items-center underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-accent">
            All free tools for independent artists
          </SmartLink>
        </p>
      </section>
    </article>
  );
}
