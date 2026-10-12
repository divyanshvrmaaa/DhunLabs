import { useParams } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import { Button } from "../../components/ui/Button";
import { SmartLink } from "../../components/ui/SmartLink";
import { YouTubeLite } from "../../components/content/YouTubeLite";
import { CtaPanel, Prose, RelatedLinks, Section } from "../../components/content/Blocks";
import { formatDate, videoUrl, videos, videosByDate } from "../../content/videos";
import { transcriptFor } from "../../lib/transcripts";
import NotFound from "../NotFound";

export default function VideoPage() {
  const { slug } = useParams();
  const v = videos.find((x) => x.slug === slug);
  if (!v) return <NotFound />;
  const transcript = transcriptFor(v.id, v.transcript);
  const more = videosByDate()
    .filter((x) => x.id !== v.id)
    .slice(0, 3);

  return (
    <>
      <PageHeader badge={`VIDEO LESSON · ${v.duration} · IN HINDI`} title={v.title} sub={v.hook} compact>
        <p className="mt-4 text-sm text-muted">
          Published on YouTube <time dateTime={v.published}>{formatDate(v.published)}</time>
        </p>
      </PageHeader>

      <div className="container-x pb-4">
        <div className="max-w-4xl">
          <YouTubeLite id={v.id} title={v.title} />
          <p className="mt-3 text-sm text-muted">
            <SmartLink href={videoUrl(v.id)} className="underline decoration-line-strong underline-offset-4 hover:text-ink">
              Watch “{v.title}” on YouTube
            </SmartLink>
          </p>
        </div>
      </div>

      <Section id="summary" eyebrow="In English" title="Summary">
        <Prose>
          {v.summary.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
          {v.summaryNeedsReview && <p className="text-sm text-gold">[TODO: review summary]</p>}
        </Prose>
      </Section>

      <Section id="takeaways" eyebrow="Key takeaways" title="What you'll learn">
        <ol className="grid max-w-4xl gap-3 sm:grid-cols-2">
          {v.takeaways.map((t, i) => (
            <li key={t} className="card flex gap-4 p-5">
              <span className="num text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="leading-relaxed text-ink/90">{t}</span>
            </li>
          ))}
        </ol>
      </Section>

      {transcript && (
        <Section id="transcript" eyebrow="Original language" title="Transcript">
          <details className="group card max-w-4xl p-5 md:p-6">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
              Show the full transcript (Hindi/Hinglish, as spoken)
              <span aria-hidden className="transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <div lang="hi" className="mt-4 max-h-[70vh] space-y-3 overflow-y-auto pr-2 text-[0.98rem] leading-relaxed text-ink/85" data-lenis-prevent>
              {transcript.map((l, i) => (
                <p key={i}>
                  {l.time && <span className="num mr-2 text-xs text-muted">[{l.time}]</span>}
                  {l.text}
                </p>
              ))}
            </div>
          </details>
        </Section>
      )}

      <Section id="put-it-to-work" eyebrow="Next step" title="Put it to work">
        <ul className="grid max-w-4xl gap-3 sm:grid-cols-3">
          {v.related.map((r) => (
            <li key={r.href} className="card p-5">
              <SmartLink href={r.href} className="font-heading text-lg font-semibold tracking-tight underline decoration-line-strong underline-offset-4 hover:text-accent hover:decoration-accent">
                {r.label}
              </SmartLink>
            </li>
          ))}
        </ul>
      </Section>

      <CtaPanel title="Want us to run this for your song?" body="Book a short strategy audit and we'll plan it with you.">
        <Button form="onboarding" location={`video-${v.slug}`} size="lg" arrow>
          Book a Strategy Audit
        </Button>
        <Button href="/learn" variant="secondary" size="lg">
          All video lessons
        </Button>
      </CtaPanel>

      <RelatedLinks title="More free lessons" links={more.map((m) => ({ href: `/learn/${m.slug}`, label: m.title, note: `${m.duration} · ${formatDate(m.published)}` }))} />
    </>
  );
}
