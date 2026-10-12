import { PageHeader } from "../../components/PageHeader";
import { SiteForm } from "../../components/forms/SiteForm";
import { Bullets } from "../../components/content/Blocks";
import { SmartLink } from "../../components/ui/SmartLink";
import { trackForm } from "../../content/forms";
import { followersAsOf, playlists, playlistsPage } from "../../content/playlists";
import { formatNumber } from "../../lib/format";

export default function SubmitTrackPage() {
  return (
    <>
      <PageHeader badge="PLAYLIST SUBMISSION" title="Submit Your Track for Playlist Review" kicker={playlistsPage.submit.title} sub={trackForm.intro} compact />
      <div className="container-x grid gap-10 pb-24 md:pb-32 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <SiteForm def={trackForm} location="submit-page" hideTitle />
        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          <div>
            <h2 className="font-heading text-xl font-semibold tracking-tight">Our promise</h2>
            <div className="mt-4">
              <Bullets items={playlistsPage.submit.trust} />
            </div>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold tracking-tight">The playlists</h2>
            <ul className="mt-4 space-y-3">
              {playlists.map((p) => (
                <li key={p.id} className="text-[0.95rem]">
                  <SmartLink href={`/playlists/${p.slug}`} className="font-medium underline decoration-line-strong underline-offset-4 hover:text-accent">
                    {p.name}
                  </SmartLink>
                  <span className="block text-xs text-muted">
                    {p.vibe} · {formatNumber(p.followers)} followers {followersAsOf}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
