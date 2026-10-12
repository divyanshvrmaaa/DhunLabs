// Pieces shared by several tool guides. Every number comes from the same
// constants the tools use (pricing.ts, royalties.ts), never typed in by hand.
import { SUSPICIOUS_CPS_BELOW, TYPICAL_CPS_HIGH, TYPICAL_CPS_LOW } from "../pricing";
import { EXPENSIVE_CPS_FROM, verdictFor } from "../../lib/cps";
import { formatINR2 } from "../../lib/format";
import type { GuideBand } from "./types";

/** "Good / average / bad" bands for a cost per stream, built from the checker's own thresholds. */
export function cpsBands(): GuideBand[] {
  const band = (label: string, sample: number): GuideBand => {
    const v = verdictFor(sample);
    return { label, tone: v.tone, text: `${v.title}. ${v.line}` };
  };
  return [
    band(`Under ${formatINR2(SUSPICIOUS_CPS_BELOW)}`, SUSPICIOUS_CPS_BELOW / 2),
    band(`${formatINR2(SUSPICIOUS_CPS_BELOW)}–${formatINR2(TYPICAL_CPS_LOW)}`, (SUSPICIOUS_CPS_BELOW + TYPICAL_CPS_LOW) / 2),
    band(`${formatINR2(TYPICAL_CPS_LOW)}–${formatINR2(TYPICAL_CPS_HIGH)}`, (TYPICAL_CPS_LOW + TYPICAL_CPS_HIGH) / 2),
    band(`${formatINR2(TYPICAL_CPS_HIGH)}–${formatINR2(EXPENSIVE_CPS_FROM)}`, (TYPICAL_CPS_HIGH + EXPENSIVE_CPS_FROM) / 2),
    band(`Over ${formatINR2(EXPENSIVE_CPS_FROM)}`, EXPENSIVE_CPS_FROM * 1.5),
  ];
}

export const metricNoteVisits =
  "A tracked visit is a person who clicked an ad and landed on the playlist or song page. Not every visit becomes a stream, so a cost per visit is not the same as a cost per stream.";
