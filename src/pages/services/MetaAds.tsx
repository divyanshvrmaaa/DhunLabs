import { PageHeader } from "../../components/PageHeader";
import { Button } from "../../components/ui/Button";
import { Reveal } from "../../components/ui/Reveal";
import { SmartLink } from "../../components/ui/SmartLink";
import { ReceiptCard } from "../../components/home/Work";
import { Bullets, CtaPanel, Prose, RelatedLinks, Section, Steps } from "../../components/content/Blocks";
import { pillars, howItWorks } from "../../content/pillars";
import { plans } from "../../content/plans";
import { metaAdsPage } from "../../content/services";
import { receipts, receiptsAsOf, workPage } from "../../content/caseStudies";
import { faqs } from "../../content/faq";

const meta = pillars.find((p) => p.id === "meta")!;
const shownFaqs = faqs.filter((f) => /guarantee|working|need before/i.test(f.q));

export default function MetaAds() {
  return (
    <>
      <PageHeader badge={metaAdsPage.badge} title={metaAdsPage.h1} kicker={meta.subtitle} sub={meta.body}>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button form="onboarding" location="meta-ads-hero" size="lg" arrow>
            Book a Strategy Audit
          </Button>
          <Button href="/planner" variant="secondary" size="lg">
            Plan Your Campaign
          </Button>
        </div>
      </PageHeader>

      <Section id="how-it-works" eyebrow="How it works" title="A hook-first campaign, tracked at every step">
        <Steps steps={metaAdsPage.flow} tone="meta" />
      </Section>

      <Section id="receipts" eyebrow="Our numbers" title="What our Meta campaigns have done">
        <Prose>
          <p>{workPage.metricExplainer}</p>
        </Prose>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {receipts
            .filter((r) => r.tone === "meta")
            .map((r, i) => (
              <Reveal key={r.id} delay={i * 0.06}>
                <ReceiptCard r={r} />
              </Reveal>
            ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          {receiptsAsOf}. Results vary by song, genre and audience; we never guarantee streams.{" "}
          <SmartLink href="/work" className="underline decoration-line-strong underline-offset-4 hover:text-ink">
            See our featured case study
          </SmartLink>
          .
        </p>
      </Section>

      <Section id="included" eyebrow="What's included" title={`The ${plans.combined.name} plan`}>
        <Prose>
          <p>{plans.combined.reason}</p>
        </Prose>
        <div className="mt-6">
          <Bullets items={plans.combined.includes} tone="meta" />
        </div>
      </Section>

      <Section id="prepare" eyebrow="Before we start" title="What to prepare">
        <Bullets items={metaAdsPage.prepare} tone="meta" />
        <p className="mt-6 max-w-3xl text-[1.0625rem] leading-relaxed text-ink/85">
          Not sure which parts of your song to cut?{" "}
          <SmartLink href="/tools/hook-finder" className="underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-accent">
            The free Hook Finder suggests your strongest 15 or 30 seconds
          </SmartLink>
          , right in your browser.
        </p>
      </Section>

      <Section id="process" eyebrow={howItWorks.eyebrow} title={howItWorks.title}>
        <Steps steps={howItWorks.steps} />
      </Section>

      <Section id="questions" eyebrow="FAQ" title="Questions about Meta campaigns">
        <div className="max-w-3xl divide-y divide-line border-y border-line">
          {shownFaqs.map((f) => (
            <div key={f.q} className="py-6">
              <h3 className="font-heading text-lg font-semibold tracking-tight md:text-xl">{f.q}</h3>
              <p className="mt-2 leading-relaxed text-ink/80">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaPanel title="Ready to put your hook in front of real listeners?" body="Book a short strategy audit. We'll pick the hook, the audience and the plan together.">
        <Button form="onboarding" location="meta-ads-bottom" size="lg" arrow>
          Book a Strategy Audit
        </Button>
        <Button href="/planner" variant="secondary" size="lg">
          Plan Your Campaign
        </Button>
      </CtaPanel>

      <RelatedLinks
        links={[
          { href: "/learn/meta-ads-for-music-promotion-guide", label: "Watch the full Meta ads guide", note: "Our step-by-step setup, in Hindi." },
          { href: "/planner", label: "Music Promotion Budget Planner", note: "See what your budget could do." },
          { href: "/services/spotify-playlisting", label: "Spotify playlist promotion", note: "The other half of a combined campaign." },
        ]}
      />
    </>
  );
}
