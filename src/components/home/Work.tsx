import { featuredCase as fc, receipts, receiptsAsOf, workIntro, type Receipt } from "../../content/caseStudies";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { SmartLink } from "../ui/SmartLink";
import { BlurImg } from "../ui/BlurImg";
import { placeholderFor } from "../../lib/placeholder";

const breakdownId = new URL(fc.breakdown.url).searchParams.get("v");

function Featured() {
  return (
    <article className="card relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[28rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(29,185,84,0.16),transparent)] blur-3xl" />
      <div className="relative grid lg:grid-cols-[1.25fr_1fr]">
        <div className="p-6 sm:p-8 md:p-12">
          <p className="eyebrow text-accent">{fc.label}</p>
          <h3 className="mt-5 max-w-xl font-heading text-[1.9rem] font-semibold leading-[1.08] tracking-tight md:text-[2.6rem]">{fc.title}</h3>
          <p className="mt-3 text-muted">
            {fc.artist} · {fc.descriptor}
          </p>

          <div className="mt-10 flex items-end gap-4 sm:gap-8">
            <div>
              <p className="num text-[clamp(3rem,8vw,5.5rem)] font-semibold leading-none text-muted/70">{fc.start.value}</p>
              <p className="mt-2 max-w-[9rem] text-xs leading-snug text-muted sm:text-sm">{fc.start.label}</p>
            </div>
            <svg viewBox="0 0 120 24" className="mb-10 h-6 w-16 shrink-0 text-accent sm:w-28" aria-hidden>
              <path d="M2 12h108" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 5" />
              <path d="M104 5l10 7-10 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p className="num text-[clamp(3rem,8vw,5.5rem)] font-semibold leading-none text-accent">{fc.result.value}</p>
              <p className="mt-2 max-w-[11rem] text-xs leading-snug text-muted sm:text-sm">{fc.result.label}</p>
            </div>
          </div>

          <ul className="mt-10 space-y-3 border-t border-line pt-8">
            {fc.method.map((m) => (
              <li key={m} className="flex gap-3 text-[0.98rem]">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {m}
              </li>
            ))}
          </ul>

          {fc.quote && (
            <blockquote className="mt-8 border-l-2 border-accent pl-5 text-lg italic text-ink/90">
              “{fc.quote}”<footer className="mt-2 text-sm not-italic text-muted">{fc.artist}</footer>
            </blockquote>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            {fc.spotifyArtistUrl && (
              <SmartLink href={fc.spotifyArtistUrl} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium hover:text-accent">
                {fc.artist} on Spotify <span aria-hidden>↗</span>
              </SmartLink>
            )}
            <p className="text-xs text-muted">{fc.asOf}</p>
          </div>
        </div>

        <div className="relative border-t border-line p-6 sm:p-8 md:p-12 lg:border-l lg:border-t-0">
          {fc.artistPhoto && (
            <BlurImg src={fc.artistPhoto} alt={fc.artist} width={600} height={600} wrapperClassName="mb-6 aspect-square rounded-[var(--radius-md)]" className="h-full w-full object-cover" />
          )}
          <SmartLink href={fc.breakdown.url} className="group block" aria-label={`${fc.breakdown.label} on YouTube`}>
            <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-line">
              {breakdownId && (
                <BlurImg
                  src={`/thumbs/${breakdownId}.webp`}
                  placeholder={placeholderFor(`/thumbs/${breakdownId}.webp`)}
                  alt=""
                  width={640}
                  height={360}
                  wrapperClassName="aspect-video"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.03]"
                />
              )}
              <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/10">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ink/95 text-bg shadow-2xl transition-transform duration-500 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" aria-hidden>
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </span>
              </span>
            </div>
            <p className="mt-5 flex items-center justify-between gap-4 font-heading text-xl font-semibold tracking-tight">
              {fc.breakdown.label}
              <span aria-hidden className="text-accent transition-transform group-hover:translate-x-1">
                →
              </span>
            </p>
            <p className="mt-1 text-sm text-muted">On YouTube · @DhunLabsNetwork</p>
          </SmartLink>
        </div>
      </div>
    </article>
  );
}

function ReceiptCard({ r }: { r: Receipt }) {
  return (
    <article className="card group relative flex h-full flex-col p-6 transition-colors duration-500 hover:border-line-strong md:p-8">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">{r.tag}</p>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>
      <h3 className="mt-4 font-heading text-xl font-semibold tracking-tight md:text-2xl">{r.title}</h3>
      <p className="num mt-8 text-[clamp(3rem,7vw,4.75rem)] font-semibold leading-none text-ink">{r.big}</p>
      <p className="mt-2 text-sm text-accent">{r.bigLabel}</p>
      <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-line pt-6">
        {r.facts.map((f) => (
          <div key={f.label}>
            <dt className="sr-only">{f.label}</dt>
            <dd className="num text-xl font-semibold">{f.value}</dd>
            <dd className="text-xs leading-snug text-muted">{f.label}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-[0.95rem] leading-relaxed text-muted">{r.context}</p>
      <div className="mt-auto pt-6 text-xs text-muted">
        {r.metricNote && <p>{r.metricNote}</p>}
        <p className="mt-1">{receiptsAsOf}</p>
      </div>
    </article>
  );
}

export function Work() {
  const large = receipts.filter((r) => r.size === "large");
  const small = receipts.filter((r) => r.size === "small");
  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-line py-24 md:py-36">
      <div className="container-x">
        <SectionHeader id="work-title" eyebrow={workIntro.eyebrow} title={workIntro.title} />
        <Reveal className="mt-14 md:mt-20">
          <Featured />
        </Reveal>

        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {large.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.06}>
              <ReceiptCard r={r} />
            </Reveal>
          ))}
        </div>

        {small.map((r) => (
          <Reveal key={r.id} className="mt-5">
            <article className="card flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <p className="eyebrow">{r.tag}</p>
                <h3 className="mt-3 font-heading text-xl font-semibold tracking-tight md:text-2xl">{r.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{r.context}</p>
              </div>
              <dl className="flex flex-wrap gap-x-10 gap-y-4">
                <div>
                  <dt className="sr-only">{r.bigLabel}</dt>
                  <dd className="num text-3xl font-semibold text-gold">{r.big}</dd>
                  <dd className="text-xs text-muted">{r.bigLabel}</dd>
                </div>
                {r.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="sr-only">{f.label}</dt>
                    <dd className="num text-3xl font-semibold">{f.value}</dd>
                    <dd className="text-xs text-muted">{f.label}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        ))}

        <Reveal className="mt-10">
          <p className="max-w-2xl text-sm text-muted">{workIntro.footer}</p>
        </Reveal>
      </div>
    </section>
  );
}
