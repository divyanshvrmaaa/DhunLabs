// Written guide under the Cost-Per-Stream Checker (/tools/cost-per-stream).
// Verdicts come from lib/cps.ts, the same rules the checker uses.
import { SUSPICIOUS_CPS_BELOW, TYPICAL_CPS_HIGH, TYPICAL_CPS_LOW, RATE_HIGH_POINTS, RATE_LOW_POINTS } from "../pricing";
import { EXPENSIVE_CPS_FROM, verdictFor } from "../../lib/cps";
import { formatINR, formatINR2, formatNumber } from "../../lib/format";
import { cpsBands, metricNoteVisits } from "./shared";
import type { ToolGuideContent } from "./types";

const bestRate = Math.max(...RATE_HIGH_POINTS.map((p) => p[1]));
const worstRate = Math.min(...RATE_LOW_POINTS.map((p) => p[1]));
const v50 = verdictFor(0.5);
const example = { spent: 10000, streams: 12000 };

export const costPerStreamGuide: ToolGuideContent = {
  name: "Cost-Per-Stream Checker",
  howTo: [
    {
      title: "Enter what the campaign cost",
      body: "Add up everything you paid for that one campaign: ad spend plus any promotion or agency fees.",
    },
    {
      title: "Enter the streams it brought",
      body: "Open Spotify for Artists, look at the campaign dates, and take away the streams you'd normally get in that time. What's left is what the campaign added.",
    },
    {
      title: "Add saves (optional)",
      body: "If you enter saves, the checker also shows your save rate: saves divided by streams.",
    },
    {
      title: "Read the verdict",
      body: "You'll see your cost per stream, where it sits on the gauge, and how it compares with what our campaigns usually see.",
    },
  ],
  reading: {
    intro: "Your cost per stream is simply what you spent divided by the streams you got. This is how the checker grades it:",
    bands: cpsBands(),
    outro:
      "Save rate shows whether the new listeners actually liked the song. We don't publish a save-rate benchmark yet, so compare it across your own releases: if two campaigns cost the same, the one with more saves found better listeners.",
  },
  method: {
    intro: "The checker compares your number with the range our own campaigns produce.",
    points: [
      `Cost per stream = money spent ÷ streams received. For example, ${formatINR(example.spent)} ÷ ${formatNumber(example.streams)} streams = ${formatINR2(example.spent / example.streams)} per stream.`,
      `Our typical range, ${formatINR2(TYPICAL_CPS_LOW)}–${formatINR2(TYPICAL_CPS_HIGH)}, comes from the same model as the Campaign Planner: our campaigns bring roughly ${worstRate} to ${bestRate} streams per ₹1.`,
      `Above ${formatINR2(TYPICAL_CPS_HIGH)} you paid more than we usually see; above ${formatINR2(EXPENSIVE_CPS_FROM)} (1.5 times the top of our range) a lot more.`,
      `Below ${formatINR2(SUSPICIOUS_CPS_BELOW)} the checker flags the result as worth a closer look, because real listeners rarely come that cheap.`,
      "Nothing you type is sent anywhere. The sums happen in your browser.",
    ],
    table: {
      caption: "Example verdicts (same rules as the checker)",
      head: ["Cost per stream", "Verdict"],
      rows: [0.2, 0.5, 0.8, 1.2, 2].map((c) => [formatINR2(c), verdictFor(c).title]),
    },
  },
  benchmarks: {
    intro: `For comparison, here is what reaching people cost in our own Meta campaigns. ${metricNoteVisits}`,
    receiptIds: ["ad-cost", "playlist-engine"],
  },
  faqs: [
    {
      q: "Is ₹0.50 per stream a good price?",
      a: `By our numbers: ${v50.title.toLowerCase()}. ${v50.line} Check the save rate too: cheap streams that nobody saves are worth less than they look.`,
    },
    {
      q: "What is a normal cost per stream for Spotify promotion in India?",
      a: `In our recent campaigns it's usually ${formatINR2(TYPICAL_CPS_LOW)} to ${formatINR2(TYPICAL_CPS_HIGH)} per stream. Bigger budgets tend to sit at the lower end. Results vary by song, genre and audience.`,
    },
    {
      q: "Why are very cheap streams a red flag?",
      a: `Streams under ${formatINR2(SUSPICIOUS_CPS_BELOW)} each often come from bots, stream farms or listeners who never chose your song. Platforms can remove those streams and penalise the track, and they don't turn into fans.`,
    },
    {
      q: "How do I work out cost per stream?",
      a: `Divide the total you spent by the streams the campaign brought. ${formatINR(example.spent)} for ${formatNumber(example.streams)} streams is ${formatINR2(example.spent / example.streams)} per stream. The checker does this for you.`,
    },
    {
      q: "What is a good save rate?",
      a: "We don't publish a benchmark for it yet. Use it to compare your own campaigns: the same spend with a higher save rate means the ads found listeners who actually liked the song.",
    },
    {
      q: "Should I count all my streams or only the new ones?",
      a: "Only the streams the campaign added. Take your usual daily streams before the campaign, multiply by the campaign's days, and subtract that from the streams during the campaign.",
    },
  ],
  related: ["/planner", "/estimator", "/tools/revenue-calculator", "/tools/hook-finder"],
};
