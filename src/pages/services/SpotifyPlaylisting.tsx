import { PageHeader } from "../../components/PageHeader";
import { Button } from "../../components/ui/Button";
import { SmartLink } from "../../components/ui/SmartLink";
import { Bullets, CtaPanel, Prose, RelatedLinks, Section, Steps } from "../../components/content/Blocks";
import { pillars } from "../../content/pillars";
import { plans } from "../../content/plans";
import { playlistingPage } from "../../content/services";
import { followersAsOf, playlists } from "../../content/playlists";
import { receipts, receiptsAsOf, experiment } from "../../content/caseStudies";
import { formatNumber } from "../../lib/format";

const spotify = pillars.find((p) => p.id === "spotify")!;
const engine = receipts.find((r) => r.id === "playlist-engine");

export default function SpotifyPlaylisting() {
  return (
    <>
      <PageHeader badge={playlistingPage.badge} lines={playlistingPage.h1Lines} kicker={spotify.subtitle} sub={spotify.body}>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button form="track" location="playlisting-hero" size="lg" arrow>
            Submit Your Track
          </Button>
          <Button href="/playlists" variant="secondary" size="lg">
            Browse the Playlists
          </Button>
        </div>
      </PageHeader>

      <Section id="review" eyebrow="How review works" title="Every track is heard by a person">
        <Steps steps={playlistingPage.review} />
      </Section>

      <Section id="bot-free" eyebrow="Our policy" title={<>Bot-free, always.<br />Never guaranteed.</>}>
        <Prose>
          <p>{playlistingPage.botFree}</p>
          <p>
            Placement is considered, never guaranteed. We'd rather say no than put a song where it doesn't fit, because a playlist only works if its
            listeners trust it.
          </p>
        </Prose>
      </Section>

      <Section id="our-playlists" eyebrow="The network" title="Our Spotify playlists">
        <ul className="grid gap-3 sm:grid-cols-2">
          {playlists.map((p) => (
            <li key={p.id} className="card flex items-start gap-4 p-5">
              {p.cover && <img src={p.cover} alt="" width={64} height={64} loading="lazy" className="h-16 w-16 shrink-0 rounded-lg object-cover" />}
              <div>
                <SmartLink href={`/playlists/${p.slug}`} className="font-heading text-lg font-semibold tracking-tight underline decoration-line-strong underline-offset-4 hover:text-accent">
                  {p.name}
                </SmartLink>
                <p className="mt-1 text-sm text-muted">{p.vibe}</p>
                <p className="mt-1 text-xs text-muted">
                  <span className="num text-ink">{formatNumber(p.followers)}</span> followers · {followersAsOf}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="included" eyebrow="What's included" title={`The ${plans.playlisting.name} plan`}>
        <Prose>
          <p>{plans.playlisting.reason}</p>
        </Prose>
        <div className="mt-6">
          <Bullets items={plans.playlisting.includes} />
        </div>
      </Section>

      {engine && (
        <Section id="proof" eyebrow="Proof" title="How we grew our own playlist">
          <Prose>
            <p>
              {engine.context} {engine.big} {engine.bigLabel}, {engine.facts.map((f) => `${f.value} ${f.label}`).join(", ")}. {engine.metricNote}. {receiptsAsOf}.
            </p>
            <p>
              We also ran an open experiment: {experiment.title}.{" "}
              <SmartLink href={experiment.video.url} className="underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-accent">
                Watch the ₹15,000 playlist experiment on YouTube
              </SmartLink>
              .
            </p>
          </Prose>
        </Section>
      )}

      <CtaPanel title="Think your track belongs on one of our playlists?" body="Send it in. We listen to every submission personally.">
        <Button form="track" location="playlisting-bottom" size="lg" arrow>
          Submit Your Track
        </Button>
        <Button href="/planner" variant="secondary" size="lg">
          Plan Your Campaign
        </Button>
      </CtaPanel>

      <RelatedLinks
        links={[
          { href: "/services/meta-ads", label: "Meta ads for music promotion", note: "Find new listeners and send them to your song." },
          { href: "/tools/cost-per-stream", label: "Cost Per Stream Calculator", note: "Check whether a past campaign paid a fair price." },
          { href: "/work", label: "See our campaign results", note: "Dated receipts from our own ad accounts." },
        ]}
      />
    </>
  );
}
