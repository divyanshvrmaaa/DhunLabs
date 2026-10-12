import { useState } from "react";
import { motion } from "framer-motion";
import type { PlanId } from "../../lib/estimate";
import { onboardingForm, trackForm, type SiteFormDef } from "../../content/forms";
import type { Answers } from "../../lib/googleForm";
import { SiteForm } from "../forms/SiteForm";
import { Button } from "../ui/Button";

interface FormSpec {
  def: SiteFormDef;
  tab: string;
  title: string;
  subtitle: string;
}

const track: FormSpec = { def: trackForm, tab: "Submit your track", title: "Submit your track", subtitle: "We listen to every submission personally." };
const contact: FormSpec = { def: onboardingForm, tab: "Contact us", title: "Questions or want to talk first?", subtitle: "Tell us about your music and we'll get back to you." };
const audit: FormSpec = { def: onboardingForm, tab: "Book a Strategy Audit", title: "Book a Strategy Audit", subtitle: "Tell us about your release and your goal. We'll set up a short call." };

/** The planner/estimator budget as the onboarding form's budget bracket (the visitor can change it). */
export function budgetBracket(budget: number): string {
  if (budget < 5000) return "Under ₹5,000";
  if (budget <= 15000) return "₹5,000 to ₹15,000";
  if (budget <= 30000) return "₹15,000 to ₹30,000";
  return "₹30,000+";
}

function FormCard({ f, location, prefill }: { f: FormSpec; location: string; prefill?: Answers }) {
  return (
    <div>
      <h3 className="font-heading text-lg font-semibold tracking-tight md:text-xl">{f.title}</h3>
      <p className="mt-1 text-sm text-muted">{f.subtitle}</p>
      <div className="mt-4">
        <SiteForm def={f.def} location={location} initial={f.def.id === "onboarding" ? prefill : undefined} hideTitle />
      </div>
    </div>
  );
}

/** The forms shown under a planner/estimator result: tabs on mobile, side by side on desktop. */
export function PlanForms({ plan, location, prefill }: { plan: PlanId; location: string; prefill?: Answers }) {
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
          <div key={f.tab} role="tabpanel" id={`${location}-panel-${i}`} aria-labelledby={`${location}-tab-${i}`} hidden={tab !== i} className="mt-6">
            {tab === i && <FormCard f={f} location={location} prefill={prefill} />}
          </div>
        ))}
      </div>

      {/* Desktop: side by side */}
      <div className="mt-10 hidden items-start gap-6 md:grid md:grid-cols-2">
        {forms.map((f) => (
          <FormCard key={f.tab} f={f} location={location} prefill={prefill} />
        ))}
      </div>
    </section>
  );
}
