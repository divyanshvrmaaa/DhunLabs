import { useParams } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import { Button } from "../../components/ui/Button";
import { SmartLink } from "../../components/ui/SmartLink";
import { YouTubeLite } from "../../components/content/YouTubeLite";
import { CtaPanel, Prose, RelatedLinks, Section } from "../../components/content/Blocks";
import { featuredCases } from "../../content/caseStudies";
import { videoUrl, videos } from "../../content/videos";
import { CaseCard } from "./WorkIndex";
import NotFound from "../NotFound";

export default function CaseStudyPage() {
  const { slug } = useParams();
  const fc = featuredCases.find((c) => c.slug === slug);
  if (!fc) return <NotFound />;
  const breakdownId = new URL(fc.breakdown.url).searchParams.get("v");
  const video = videos.find((v) => v.id === breakdownId);
  const others = featuredCases.filter((c) => c.slug !== fc.slug);

  return (
    <>
      <PageHeader badge="CASE STUDY" title={fc.title} kicker={`${fc.artist} · ${fc.descriptor}`} sub={fc.intro} compact />

      <Section id="results" eyebrow={fc.asOf} title="The campaign at a glance">
        <CaseCard fc={fc} />
      </Section>

      {video && breakdownId && (
        <Section id="breakdown" eyebrow="Video breakdown · in Hindi" title="How we ran it">
          <div className="max-w-4xl">
            <YouTubeLite id={breakdownId} title={video.title} />
            <p className="mt-3 text-sm text-muted">
              <SmartLink href={videoUrl(breakdownId)} className="underline decoration-line-strong underline-offset-4 hover:text-ink">
                Watch “{video.title}” on YouTube
              </SmartLink>
            </p>
          </div>
          <Prose className="mt-10">
            {video.summary.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </Prose>
          <ol className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2">
            {video.takeaways.map((t, i) => (
              <li key={t} className="card flex gap-4 p-5">
                <span className="num text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="leading-relaxed text-ink/90">{t}</span>
              </li>
            ))}
          </ol>
        </Section>
      )}

      <CtaPanel title="Want a campaign like this for your song?" body="Book a short strategy audit, or see what your budget could do first. Results vary by song, genre and audience; nothing here is a guarantee.">
        <Button form="onboarding" location={`case-${fc.slug}`} size="lg" arrow>
          Book a Strategy Audit
        </Button>
        <Button href="/planner" variant="secondary" size="lg">
          Plan Your Campaign
        </Button>
      </CtaPanel>

      <RelatedLinks
        links={[
          ...others.map((c) => ({ href: `/work/${c.slug}`, label: `${c.artist} case study`, note: c.title })),
          { href: "/work", label: "All our campaign results", note: "Featured case studies and dated receipts from our ad accounts." },
          { href: "/services/meta-ads", label: "Meta ads for music promotion", note: "How our hook-first ad campaigns work." },
        ]}
      />
    </>
  );
}
