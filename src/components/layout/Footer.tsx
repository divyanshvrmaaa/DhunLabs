import { mailto, site } from "../../content/site";
import { toolsHub } from "../../content/tools";
import { SmartLink } from "../ui/SmartLink";
import { Logo } from "../ui/Logo";

type FooterLink = { label: string; href: string };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Tools",
    links: [...toolsHub.cards.map((t) => ({ label: t.title, href: t.href })), { label: "All free tools", href: "/tools" }],
  },
  {
    title: "Services",
    links: [
      { label: "All services", href: "/services" },
      { label: "Meta Ads", href: "/services/meta-ads" },
      { label: "Spotify Playlisting", href: "/services/spotify-playlisting" },
      { label: "Our playlists", href: "/playlists" },
      { label: "Submit your track", href: "/submit-track" },
    ],
  },
  {
    title: "Work & Learn",
    links: [
      { label: "Work", href: "/work" },
      { label: "Harman Sohi case study", href: "/work/harman-sohi" },
      { label: "Learn: video lessons", href: "/learn" },
      { label: "FAQ", href: "/#faq" },
      { label: "About", href: "/#about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Follow",
    links: [
      { label: `Instagram · ${site.instagramHandle}`, href: site.instagram },
      { label: `YouTube · ${site.youtubeHandle}`, href: site.youtube },
      { label: "Spotify", href: site.spotifyProfile },
      { label: "Email us", href: mailto },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-10 py-16 md:py-20 lg:grid-cols-[1.3fr_repeat(4,1fr)] lg:gap-8">
        <div className="col-span-2 lg:col-span-1">
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

        {columns.map((c) => (
          <nav key={c.title} aria-label={`Footer: ${c.title}`}>
            <p className="eyebrow mb-3">{c.title}</p>
            <ul className="space-y-0.5 text-[0.95rem]">
              {c.links.map((l) => (
                <li key={l.href + l.label}>
                  <SmartLink href={l.href} className="inline-flex min-h-11 items-center py-1 leading-snug text-muted transition-colors hover:text-ink">
                    {l.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
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
