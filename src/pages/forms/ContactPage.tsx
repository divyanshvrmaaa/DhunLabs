import { PageHeader } from "../../components/PageHeader";
import { SiteForm } from "../../components/forms/SiteForm";
import { Steps } from "../../components/content/Blocks";
import { SmartLink } from "../../components/ui/SmartLink";
import { onboardingForm } from "../../content/forms";
import { howItWorks } from "../../content/pillars";
import { mailto, site } from "../../content/site";

export default function ContactPage() {
  return (
    <>
      <PageHeader badge="GET STARTED" title="Book a Strategy Audit" kicker="Tell us about your music. We'll take it from there." sub={onboardingForm.intro} compact />
      <div className="container-x grid gap-10 pb-24 md:pb-32 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <SiteForm def={onboardingForm} location="contact-page" hideTitle />
        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          <div>
            <h2 className="font-heading text-xl font-semibold tracking-tight">What happens next</h2>
            <div className="mt-4 [&_ol]:grid-cols-1 [&_ol]:sm:grid-cols-1 [&_ol]:lg:grid-cols-1">
              <Steps steps={howItWorks.steps.slice(1)} />
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted">
            Just want your song on our playlists?{" "}
            <SmartLink href="/submit-track" className="underline decoration-line-strong underline-offset-4 hover:text-ink">
              Submit your track for playlist review
            </SmartLink>
            . Prefer email? Write to{" "}
            <SmartLink href={mailto} className="underline decoration-line-strong underline-offset-4 hover:text-ink">
              {site.email}
            </SmartLink>
            .
          </p>
        </aside>
      </div>
    </>
  );
}
