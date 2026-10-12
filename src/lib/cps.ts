// Cost-per-stream verdicts. Used by the Cost-Per-Stream Checker AND the written
// guides/FAQs, so the text and the tool always agree. Thresholds live in src/content/pricing.ts.
import { EXPENSIVE_CPS_FACTOR, SUSPICIOUS_CPS_BELOW, TYPICAL_CPS_HIGH, TYPICAL_CPS_LOW } from "../content/pricing";

export type Tone = "warn" | "good" | "ok" | "high" | "bad";

export function verdictFor(cps: number): { tone: Tone; title: string; line: string } {
  if (cps < SUSPICIOUS_CPS_BELOW)
    return {
      tone: "warn",
      title: "Worth a closer look",
      line: "Streams this cheap often come from low-quality or artificial sources, which platforms can penalise. Worth checking where they came from.",
    };
  if (cps < TYPICAL_CPS_LOW) return { tone: "good", title: "Better than our typical range", line: "That's a lower cost per stream than our campaigns usually see. Nice work." };
  if (cps <= TYPICAL_CPS_HIGH) return { tone: "ok", title: "Within our typical range", line: "That's in line with what our campaigns usually see." };
  if (cps <= TYPICAL_CPS_HIGH * EXPENSIVE_CPS_FACTOR) return { tone: "high", title: "A bit above our typical range", line: "You paid somewhat more per stream than our campaigns usually see." };
  return { tone: "bad", title: "Well above our typical range", line: "You paid a lot more per stream than our campaigns usually see. There's likely room to bring this down." };
}

/** Upper edge of "a bit above our typical range", ₹ per stream. */
export const EXPENSIVE_CPS_FROM = TYPICAL_CPS_HIGH * EXPENSIVE_CPS_FACTOR;
