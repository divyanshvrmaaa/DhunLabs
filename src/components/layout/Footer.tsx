import { mailto, nav, site } from "../../content/site";
import { SmartLink } from "../ui/SmartLink";
import { Logo } from "../ui/Logo";

const more = [
  { label: "Playlists", href: "/playlists" },
  { label: "Campaign Planner", href: "/planner" },
  { label: "Stream Estimator", href: "/estimator" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr] md:py-20">
        <div>
          <SmartLink href="/" aria-label="DhunLabs home" className="inline-block">
            <Logo />
          </SmartLink>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {site.tagline} for independent artists. {site.location}.
          </p>
          <a href={mailto} className="mt-6 inline-block text-[0.95rem] text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">
            {site.email}
          </a>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow mb-4">Explore</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-[0.95rem]">
            {[...nav.map((n) => ({ label: n.label, href: n.route ?? `/#${n.anchor}` })), ...more].map((l) => (
              <li key={l.label}>
                <SmartLink href={l.href} className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-ink">
                  {l.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4">Follow</p>
          <ul className="space-y-1 text-[0.95rem]">
            <li>
              <SmartLink href={site.instagram} className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-ink">
                Instagram · {site.instagramHandle}
              </SmartLink>
            </li>
            <li>
              <SmartLink href={site.youtube} className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-ink">
                YouTube · {site.youtubeHandle}
              </SmartLink>
            </li>
            <li>
              <SmartLink href={site.spotifyProfile} className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-ink">
                Spotify
              </SmartLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {site.copyrightYear} {site.brand}, Delhi
        </p>
        <p>We use privacy-friendly analytics</p>
      </div>
    </footer>
  );
}
