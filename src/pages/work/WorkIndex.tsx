import { PageHeader } from "../../components/PageHeader";
import { Reveal } from "../../components/ui/Reveal";
import { Button } from "../../components/ui/Button";
import { BlurImg } from "../../components/ui/BlurImg";
import { ReceiptCard } from "../../components/home/Work";
import { CtaPanel, RelatedLinks, Section, Prose } from "../../components/content/Blocks";
import { experiment, featuredCase as fc, receipts, receiptsAsOf, workPage } from "../../content/caseStudies";
import { videos } from "../../content/videos";
import { placeholderFor } from "../../lib/placeholder";

const breakdownVideo = videos.find((v) => v.id === new URL(fc.breakdown.url).searchParams.get("v"));

export default function WorkIndex() {
  return (
    <>
      <PageHeader badge={workPage.badge} lines={workPage.h1Lines} kicker={workPage.kicker} sub={workPage.sub} />

      <Section id="featured-case" eyebrow="Featured case study" title={fc.title}>
        <Reveal>
          <article className="card relative grid overflow-hidden md:grid-cols-[1fr_1.2fr]">
            {fc.artistPhoto && (
              <BlurImg
                src={fc.artistPhoto}
                placeholder={placeholderFor(fc.artistPhoto)}
                alt={`${fc.artist}, ${fc.descriptor}`}
                width={640}
                height={747}
                wrapperClassName="aspect-[4/3] md:aspect-auto md:h-full"
                className="h-full w-full object-cover object-[50%_22%]"
              />
            )}
            <div className="p-6 sm:p-8 md:p-10">
              <p className="text-muted">
                {fc.artist} · {fc.descriptor}
              </p>
              <div className="mt-6 flex items-end gap-6">
                <div>
                  <p className="num text-5xl font-semibold leading-none text-muted/70">{fc.start.value}</p>
                  <p className="mt-2 max-w-[9rem] text-xs text-muted">{fc.start.label}</p>
                </div>
                <span aria-hidden className="mb-6 text-accent">
                  →
                </span>
                <div>
                  <p className="num text-5xl font-semibold leading-none text-accent">{fc.result.value}</p>
                  <p className="mt-2 max-w-[11rem] text-xs text-muted">{fc.result.label}</p>
                </div>
              </div>
              <ul className="mt-8 space-y-2">
                {fc.method.map((m) => (
                  <li key={m} className="flex gap-3 text-[0.98rem]">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {m}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-muted">{fc.asOf}</p>
              <div className="mt-6">
                <Button href={breakdownVideo ? `/learn/${breakdownVideo.slug}` : fc.breakdown.url} arrow>
                  Watch the full breakdown
                </Button>
              </div>
            </div>
          </article>
        </Reveal>
      </Section>

      <Section id="experiment" eyebrow={experiment.label} title={experiment.title}>
        <Prose>
          <p>{experiment.body}</p>
        </Prose>
        <ul className="mt-6 flex flex-wrap gap-2">
          {experiment.points.map((pt) => (
            <li key={pt} className="rounded-full border border-line-strong px-4 py-2 text-sm text-ink/85">
              {pt}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={experiment.video.url} variant="secondary">
            Watch the ₹15,000 playlist experiment on YouTube
          </Button>
        </div>
      </Section>

      <Section id="receipts" eyebrow="Receipts" title="Dated results from our own ad accounts">
        <Prose>
          <p>{workPage.metricExplainer}</p>
        </Prose>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {receipts.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.06}>
              <ReceiptCard r={r} />
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted">{receiptsAsOf}. Results vary by song, genre and audience. Nothing here is a guarantee.</p>
      </Section>

      <CtaPanel title="Want results like these for your song?" body="Book a short strategy audit, or see what your budget could do first.">
        <Button form="onboarding" location="work-page" size="lg" arrow>
          Book a Strategy Audit
        </Button>
        <Button href="/planner" variant="secondary" size="lg">
          Plan Your Campaign
        </Button>
      </CtaPanel>

      <RelatedLinks
        links={[
          { href: "/services/meta-ads", label: "Meta ads for music promotion", note: "How the hook-first ad campaigns behind these receipts work." },
          { href: "/services/spotify-playlisting", label: "Spotify playlist promotion", note: "How our bot-free playlist review works." },
          { href: "/learn", label: "Free video lessons", note: "Campaign breakdowns and the exact setups we use." },
        ]}
      />
    </>
  );
}
