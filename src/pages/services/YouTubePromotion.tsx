import { PageHeader } from "../../components/PageHeader";
import { Button } from "../../components/ui/Button";
import { Reveal } from "../../components/ui/Reveal";
import { SmartLink } from "../../components/ui/SmartLink";
import { ReceiptCard } from "../../components/home/Work";
import { Bullets, CtaPanel, Prose, RelatedLinks, Section, Steps } from "../../components/content/Blocks";
import { youtubePage } from "../../content/services";
import { youtubeSeparateNote } from "../../content/plans";
import { receipts, receiptsAsOf } from "../../content/caseStudies";
import { YT_CPV_AVG, YT_CPV_HIGH, YT_CPV_LOW } from "../../content/pricing";
import { formatINR2 } from "../../lib/format";

const ytReceipt = receipts.find((r) => r.id === "youtube-views");

export default function YouTubePromotion() {
  return (
    <>
      <PageHeader badge={youtubePage.badge} lines={youtubePage.h1Lines} kicker={youtubePage.kicker} sub={youtubePage.sub}>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button form="onboarding" location="youtube-hero" size="lg" arrow>
            Book a Strategy Audit
          </Button>
          <Button href="/tools/youtube-views-estimator" variant="secondary" size="lg">
            Estimate Your Views
          </Button>
        </div>
      </PageHeader>

      <Section id="how-it-works" eyebrow="How it works" title="A YouTube ad for your music video, tracked per view">
        <Steps steps={youtubePage.flow} />
      </Section>

      <Section id="receipts" eyebrow="Our numbers" title="What our YouTube campaigns have done">
        <Prose>
          <p>
            Across our own Google Ads video campaigns, a view has cost between {formatINR2(YT_CPV_LOW)} and {formatINR2(YT_CPV_HIGH)}, about {formatINR2(YT_CPV_AVG)} on average. Your cost depends on the
            video, the audience and the competition for it.
          </p>
        </Prose>
        {ytReceipt && (
          <Reveal className="mt-10 max-w-xl">
            <ReceiptCard r={ytReceipt} />
          </Reveal>
        )}
        <p className="mt-6 text-sm text-muted">{receiptsAsOf}. Results vary by video, genre and audience; we never guarantee views.</p>
      </Section>

      <Section id="prepare" eyebrow="Before we start" title="What to prepare">
        <Bullets items={youtubePage.prepare} tone="gold" />
        <p className="mt-6 max-w-3xl text-[1.0625rem] leading-relaxed text-ink/85">
          {youtubeSeparateNote}{" "}
          <SmartLink href="/tools/youtube-views-estimator" className="underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-accent">
            See how many views your budget could buy
          </SmartLink>
          .
        </p>
      </Section>

      <CtaPanel title="Want more people to watch your music video?" body="Book a short strategy audit. Tell us about the video and your goal, and we'll plan the campaign together.">
        <Button form="onboarding" location="youtube-bottom" size="lg" arrow>
          Book a Strategy Audit
        </Button>
        <Button href="/tools/youtube-views-estimator" variant="secondary" size="lg">
          Estimate Your Views
        </Button>
      </CtaPanel>

      <RelatedLinks
        links={[
          { href: "/tools/youtube-views-estimator", label: "YouTube Views Estimator", note: "Budget to views, or views to budget, from our own cost per view." },
          { href: "/learn/spotify-growth-plan-independent-artists", label: "The complete Spotify growth plan", note: "When YouTube ads for your music video make sense (Stage 3), in Hindi." },
          { href: "/services/meta-ads", label: "Meta ads for music promotion", note: "Instagram and Facebook ads for your song on Spotify." },
        ]}
      />
    </>
  );
}
