import { PageHeader } from "../../components/PageHeader";
import { Button } from "../../components/ui/Button";
import { Reveal } from "../../components/ui/Reveal";
import { SmartLink } from "../../components/ui/SmartLink";
import { Bullets, CtaPanel, RelatedLinks, Section, Steps } from "../../components/content/Blocks";
import { howItWorks, pillars, pillarsIntro } from "../../content/pillars";
import { servicesHub } from "../../content/services";
import { receipts } from "../../content/caseStudies";
import { YT_CPV_AVG } from "../../content/pricing";
import { formatINR2 } from "../../lib/format";

const pillarLinks: Record<string, { href: string; label: string; tone: string }> = {
  meta: { href: "/services/meta-ads", label: "How our Meta ad campaigns work", tone: "text-meta" },
  spotify: { href: "/services/spotify-playlisting", label: "How Spotify playlist review works", tone: "text-accent" },
  youtube: { href: "/learn", label: "Watch the free video lessons", tone: "text-gold" },
};

const ytReceipt = receipts.find((r) => r.id === "youtube-views");

export default function ServicesHub() {
  return (
    <>
      <PageHeader badge={servicesHub.badge} lines={servicesHub.h1Lines} kicker={pillarsIntro.title} sub={pillarsIntro.body} />

      <div className="container-x pb-16 md:pb-24">
        <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
          {pillars.map((p, i) => {
            const l = pillarLinks[p.id];
            return (
              <Reveal as="li" key={p.id} delay={i * 0.06} className="card flex flex-col p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <span className="num text-sm text-muted">{p.number}</span>
                  <span className={`eyebrow ${l.tone}`}>{p.title}</span>
                </div>
                <h2 className="mt-6 font-heading text-2xl font-semibold tracking-tight">{p.subtitle}</h2>
                <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
                <p className="mt-6">
                  <span className={`num text-4xl font-semibold ${l.tone}`}>{p.metric}</span>{" "}
                  <span className="text-sm text-muted">{p.metricLabel}</span>
                </p>
                <SmartLink
                  href={l.href}
                  className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-6 text-[0.95rem] font-medium underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                >
                  {l.label}
                </SmartLink>
              </Reveal>
            );
          })}
        </ul>
      </div>

      <Section id="youtube-campaigns" eyebrow="Also available" title={servicesHub.youtubeCampaigns.title}>
        <div className="max-w-3xl space-y-4 text-[1.0625rem] leading-relaxed text-ink/85">
          <p>{servicesHub.youtubeCampaigns.body}</p>
          {ytReceipt && (
            <p className="card p-5 text-[0.98rem]">
              <span className="eyebrow text-gold">{ytReceipt.tag}</span>
              <br />
              <span className="num font-semibold">{ytReceipt.big}</span> {ytReceipt.bigLabel}, about {formatINR2(YT_CPV_AVG)} per view on average. {ytReceipt.context}
            </p>
          )}
          <p>
            <SmartLink href="/services/youtube-promotion" className="underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-accent">
              How our YouTube video campaigns work
            </SmartLink>
            {" · "}
            <SmartLink href="/tools/youtube-views-estimator" className="underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-accent">
              Estimate the budget for your YouTube view goal
            </SmartLink>
          </p>
        </div>
      </Section>

      <Section id="how-it-works" eyebrow={howItWorks.eyebrow} title={howItWorks.title}>
        <Steps steps={howItWorks.steps} />
      </Section>

      <Section id="never" eyebrow="Our rules" title="What we never do">
        <Bullets items={servicesHub.never} />
      </Section>

      <CtaPanel title="Not sure which service fits?" body="Tell us about your song and your goal. We'll recommend honestly, even if the answer is to wait.">
        <Button form="onboarding" location="services-hub" size="lg" arrow>
          Book a Strategy Audit
        </Button>
        <Button href="/planner" variant="secondary" size="lg">
          Plan Your Campaign
        </Button>
      </CtaPanel>

      <RelatedLinks
        links={[
          { href: "/learn/spotify-growth-plan-independent-artists", label: "Which stage is your music at?", note: "Our free Spotify growth plan: 4 stages from 0 to 50K+ listeners." },
          { href: "/work", label: "See our campaign results", note: "Featured case studies and dated receipts." },
          { href: "/playlists", label: "Browse our Spotify playlists", note: "Four bot-free playlists, one per mood or scene." },
          { href: "/tools", label: "Free music marketing tools", note: "Planner, estimator, royalty calculator and more." },
        ]}
      />
    </>
  );
}
