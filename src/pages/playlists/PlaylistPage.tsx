import { useParams } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import { Button } from "../../components/ui/Button";
import { SmartLink } from "../../components/ui/SmartLink";
import { BlurImg } from "../../components/ui/BlurImg";
import { SpotifyIcon } from "../../components/PlaylistCard";
import { SpotifyEmbed } from "../../components/content/SpotifyEmbed";
import { Bullets, CtaPanel, Prose, RelatedLinks, Section } from "../../components/content/Blocks";
import { followersAsOf, playlists, playlistsPage } from "../../content/playlists";
import { formatNumber } from "../../lib/format";
import { placeholderFor } from "../../lib/placeholder";
import { track } from "../../lib/analytics";
import NotFound from "../NotFound";

export default function PlaylistPage() {
  const { slug } = useParams();
  const p = playlists.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  const others = playlists.filter((x) => x.id !== p.id);

  return (
    <>
      <PageHeader badge={`SPOTIFY PLAYLIST · ${p.category.toUpperCase()}`} title={p.h1} kicker={p.vibe} compact>
        <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,18rem)_1fr] md:items-end">
          {p.cover && (
            <BlurImg
              src={p.cover}
              placeholder={placeholderFor(p.cover)}
              alt={`Cover of the playlist ${p.name}`}
              width={300}
              height={300}
              loading="eager"
              wrapperClassName="aspect-square w-48 rounded-[var(--radius-md)] border border-line md:w-full"
              className="h-full w-full object-cover"
            />
          )}
          <div>
            <p className="flex items-baseline gap-2">
              <span className="num text-5xl font-semibold">{formatNumber(p.followers)}</span>
              <span className="text-sm text-muted">followers · {followersAsOf}</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <SmartLink
                href={p.url}
                onClick={() => track("playlist_open", { playlist: p.name })}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-bg transition-colors hover:bg-accent"
              >
                <SpotifyIcon /> Open {p.name} on Spotify
              </SmartLink>
              <Button form="track" location={`playlist-${p.slug}`} variant="secondary">
                Submit your track for review
              </Button>
            </div>
          </div>
        </div>
      </PageHeader>

      <Section id="about-playlist" eyebrow="The mood" title={`About ${p.name}`}>
        <Prose>
          <p>{p.about}</p>
          <p>
            Every follower is a real listener who chose this playlist. Like every playlist in our network, it is bot-free and always has been.
          </p>
        </Prose>
      </Section>

      <Section id="fits" eyebrow="Submitting?" title="The kind of tracks that fit">
        <Bullets items={[...p.fits, "Finished and release-ready: mixed and mastered"]} />
        <p className="mt-6 max-w-3xl text-[1.0625rem] leading-relaxed text-ink/85">
          We consider each song for the one playlist in our network that best fits it. Placement is considered, never guaranteed.{" "}
          <SmartLink href="/services/spotify-playlisting" className="underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-accent">
            How our playlist review works
          </SmartLink>
          .
        </p>
      </Section>

      <Section id="listen" eyebrow="Listen" title={`Listen to ${p.name}`}>
        <div className="max-w-3xl">
          <SpotifyEmbed id={p.id} name={p.name} />
        </div>
      </Section>

      <CtaPanel title={playlistsPage.submit.title} body={playlistsPage.submit.body}>
        <Button form="track" location={`playlist-${p.slug}-bottom`} size="lg" arrow>
          Submit Your Track
        </Button>
      </CtaPanel>

      <RelatedLinks
        title="More playlists in our network"
        links={[
          ...others.map((o) => ({ href: `/playlists/${o.slug}`, label: o.name, note: o.vibe })),
          { href: "/playlists", label: "All DhunLabs playlists", note: "The full network in one place." },
        ]}
      />
    </>
  );
}
