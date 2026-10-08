import { useState } from "react";
import { motion } from "framer-motion";
import type { PlanId } from "../../lib/estimate";
import type { FormKind } from "../../lib/analytics";
import { FormEmbed } from "./FormEmbed";
import { Button } from "../ui/Button";

interface FormSpec {
  kind: FormKind;
  tab: string;
  title: string;
  subtitle: string;
}

const track: FormSpec = {
  kind: "track",
  tab: "Submit your track",
  title: "Submit your track",
  subtitle: "We listen to every submission personally.",
};
const contact: FormSpec = {
  kind: "onboarding",
  tab: "Contact us",
  title: "Questions or want to talk first?",
  subtitle: "Tell us about your music and we'll get back to you.",
};
const audit: FormSpec = {
  kind: "onboarding",
  tab: "Book a Strategy Audit",
  title: "Book a Strategy Audit",
  subtitle: "Tell us about your release and your goal. We'll set up a short call.",
};

/** The forms shown under a planner/estimator result: tabs on mobile, side by side on desktop. */
export function PlanForms({ plan, location }: { plan: PlanId; location: string }) {
  const forms = plan === "playlisting" ? [track, contact] : [audit, track];
  const [tab, setTab] = useState(0);

  return (
    <section aria-labelledby={`${location}-next`} className="mt-16 md:mt-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden className="h-px w-6 bg-accent" />
            Next step
          </p>
          <h2 id={`${location}-next`} className="mt-4 font-heading text-3xl font-semibold tracking-tight md:text-[2.75rem]">
            {plan === "playlisting" ? "Send us your track." : "Let's plan it together."}
          </h2>
        </div>
        {plan === "combined" && (
          <div className="flex flex-wrap gap-3">
            <Button form="onboarding" location={`${location}-plan`} size="lg" arrow>
              Book a Strategy Audit
            </Button>
            <Button form="track" location={`${location}-plan`} variant="secondary" size="lg">
              Submit your track
            </Button>
          </div>
        )}
      </div>

      {/* Mobile: tabs */}
      <div className="mt-8 md:hidden">
        <div role="tablist" aria-label="Forms" className="relative grid grid-cols-2 rounded-full border border-line bg-surface p-1">
          {forms.map((f, i) => (
            <button
              key={f.tab}
              role="tab"
              id={`${location}-tab-${i}`}
              aria-selected={tab === i}
              aria-controls={`${location}-panel-${i}`}
              onClick={() => setTab(i)}
              className={`relative z-10 min-h-11 rounded-full px-3 text-sm font-semibold transition-colors ${tab === i ? "text-bg" : "text-muted"}`}
            >
              {tab === i && (
                <motion.span layoutId={`${location}-tab-pill`} className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
              )}
              {f.tab}
            </button>
          ))}
        </div>
        {forms.map((f, i) => (
          <div key={f.tab} role="tabpanel" id={`${location}-panel-${i}`} aria-labelledby={`${location}-tab-${i}`} hidden={tab !== i} className="mt-4">
            {tab === i && <FormEmbed kind={f.kind} title={f.title} subtitle={f.subtitle} location={location} />}
          </div>
        ))}
      </div>

      {/* Desktop: side by side */}
      <div className={`mt-10 hidden gap-5 md:grid ${plan === "combined" ? "md:grid-cols-[1.35fr_1fr]" : "md:grid-cols-2"}`}>
        {forms.map((f) => (
          <FormEmbed key={f.tab} kind={f.kind} title={f.title} subtitle={f.subtitle} location={location} />
        ))}
      </div>
    </section>
  );
}
