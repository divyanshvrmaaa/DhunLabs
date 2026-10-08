import { mailto, site } from "../../content/site";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { SmartLink } from "../ui/SmartLink";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-line py-28 md:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(29,185,84,0.16),transparent)] blur-3xl" />
      </div>
      <div className="container-x relative text-center">
        <Reveal>
          <h2 id="cta-title" className="h-display mx-auto max-w-5xl text-balance text-[clamp(2.6rem,8vw,6.5rem)]">
            Ready to Build Your <span className="text-accent">Growth Engine?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-muted md:text-lg">
            We don't sell vanity metrics, fake playlist slots, or empty promises. DhunLabs builds dedicated growth infrastructure designed to
            force platform recommendation engines to work for your music.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button form="onboarding" location="final-cta" size="lg" arrow>
              Book a Strategy Audit
            </Button>
            <Button href="/planner" variant="secondary" size="lg">
              Plan Your Campaign
            </Button>
            <Button href={mailto} variant="secondary" size="lg">
              Send an Email
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <ul className="mt-14 flex flex-col items-center justify-center gap-x-8 gap-y-1 text-[0.95rem] text-muted sm:flex-row">
            <li>
              <SmartLink href={mailto} className="inline-flex min-h-11 items-center hover:text-ink">
                {site.email}
              </SmartLink>
            </li>
            <li>
              <SmartLink href={site.instagram} className="inline-flex min-h-11 items-center hover:text-ink">
                Instagram {site.instagramHandle}
              </SmartLink>
            </li>
            <li>
              <SmartLink href={site.youtube} className="inline-flex min-h-11 items-center hover:text-ink">
                YouTube {site.youtubeHandle}
              </SmartLink>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
