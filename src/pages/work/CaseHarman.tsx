import { PageHeader } from "../../components/PageHeader";
import { Button } from "../../components/ui/Button";
import { SmartLink } from "../../components/ui/SmartLink";
import { BlurImg } from "../../components/ui/BlurImg";
import { SpotifyIcon } from "../../components/PlaylistCard";
import { YouTubeLite } from "../../components/content/YouTubeLite";
import { CtaPanel, Prose, RelatedLinks, Section } from "../../components/content/Blocks";
import { featuredCase as fc, harmanPage as h } from "../../content/caseStudies";
import { videos } from "../../content/videos";
import { placeholderFor } from "../../lib/placeholder";

const breakdownId = new URL(fc.breakdown.url).searchParams.get("v")!;
const breakdownVideo = videos.find((v) => v.id === breakdownId);

export default function CaseHarman() {
  return (
    <>
      <PageHeader badge="CASE STUDY" title={h.h1} kicker={h.kicker} sub={h.sub} compact />

      <div className="container-x pb-6">
        <div className="grid gap-5 md:grid-cols-[1fr_1.4fr]">
          {fc.artistPhoto && (
            <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-line">
              <BlurImg
                src={fc.artistPhoto}
                placeholder={placeholderFor(fc.artistPhoto)}
                alt={`${fc.artist}, ${fc.descriptor}`}
                width={640}
                height={747}
                loading="eager"
                wrapperClassName="aspect-[4/3] md:aspect-auto md:h-full"
                className="h-full w-full object-cover object-[50%_22%]"
              />
              {fc.spotifyArtistUrl && (
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(8,8,8,0.92),transparent)] p-4 pt-16">
                  <SmartLink
                    href={fc.spotifyArtistUrl}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-[#04110a] transition-colors hover:bg-[#21cc5d]"
                  >
                    <SpotifyIcon /> Listen to Harman Sohi on Spotify
                  </SmartLink>
                </div>
              )}
            </div>
          )}
          <div className="card flex flex-col justify-center p-6 sm:p-8 md:p-10">
            <p className="eyebrow">The result</p>
            <div className="mt-6 flex items-end gap-6">
              <div>
                <p className="num text-[clamp(3rem,8vw,5rem)] font-semibold leading-none text-muted/70">{fc.start.value}</p>
                <p className="mt-2 max-w-[9rem] text-xs text-muted">{fc.start.label}</p>
              </div>
              <span aria-hidden className="mb-8 text-2xl text-accent">
                →
              </span>
              <div>
                <p className="num text-[clamp(3rem,8vw,5rem)] font-semibold leading-none text-accent">{fc.result.value}</p>
                <p className="mt-2 max-w-[11rem] text-xs text-muted">{fc.result.label}</p>
              </div>
            </div>
            <p className="mt-8 text-xs text-muted">{fc.asOf}</p>
          </div>
        </div>
      </div>

      <Section id="starting-point" eyebrow="01" title="The starting point">
        <Prose>
          {h.starting.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Prose>
      </Section>

      <Section id="goal" eyebrow="02" title="The goal">
        <Prose>
          {h.goal.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Prose>
      </Section>

      <Section id="what-we-did" eyebrow="03" title="What we did">
        <ol className="grid gap-4 md:grid-cols-3">
          {h.did.map((d, i) => (
            <li key={d.title} className="card p-6">
              <span className="num text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-heading text-xl font-semibold tracking-tight">{d.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{d.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="result" eyebrow="04" title="The result">
        <Prose>
          <p>
            {h.result} <span className="text-muted">({fc.asOf}.)</span>
          </p>
          <p>{h.moreNumbers}</p>
          <p className="rounded-xl border border-gold/30 bg-gold/[0.06] px-4 py-3 text-[0.98rem] text-ink/90">{h.promise}</p>
        </Prose>
      </Section>

      <Section id="breakdown-video" eyebrow="Watch" title="The full breakdown video">
        <div className="max-w-3xl">
          <YouTubeLite id={breakdownId} title={breakdownVideo?.title ?? fc.breakdown.label} />
          <p className="mt-4 text-sm text-muted">
            In Hindi · {breakdownVideo?.duration}
            {breakdownVideo && (
              <>
                {" · "}
                <SmartLink href={`/learn/${breakdownVideo.slug}`} className="underline decoration-line-strong underline-offset-4 hover:text-ink">
                  Read the English summary of the breakdown
                </SmartLink>
              </>
            )}
          </p>
        </div>
      </Section>

      <CtaPanel title="Want to see what your song could do?" body="Every song is different. Tell us about yours and we'll plan honestly around it.">
        <Button form="onboarding" location="case-harman" size="lg" arrow>
          Book a Strategy Audit
        </Button>
        <Button href="/planner" variant="secondary" size="lg">
          Plan Your Campaign
        </Button>
      </CtaPanel>

      <RelatedLinks
        links={[
          { href: "/work", label: "All our campaign results", note: "Receipts from our own ad accounts, dated." },
          { href: "/services/meta-ads", label: "Meta ads for music promotion", note: "The hook-first method used in this campaign." },
          { href: "/tools/hook-finder", label: "Find your song's hook", note: "Free tool: suggests the best 15 or 30 seconds to cut as ads." },
        ]}
      />
    </>
  );
}
