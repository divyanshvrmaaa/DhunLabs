// Written guide under the Campaign Planner (/planner).
// Numbers are calculated from pricing.ts, so they always match the tool.
import { PLANNER_CHIPS, PLANNER_MAX, PLANNER_MIN, RATE_HIGH_POINTS, RATE_LOW_POINTS } from "../pricing";
import { plans } from "../plans";
import { costPerStreamForBudget, streamsForBudget } from "../../lib/estimate";
import { formatINR, formatINR2, formatRange } from "../../lib/format";
import { cpsBands, metricNoteVisits } from "./shared";
import type { ToolGuideContent } from "./types";

const streams = (b: number) => {
  const r = streamsForBudget(b);
  return formatRange(r.low, r.high);
};
const cps = (b: number) => {
  const r = costPerStreamForBudget(b);
  return Math.abs(r.low - r.high) < 0.005 ? formatINR2(r.low) : `${formatINR2(r.low)}–${formatINR2(r.high)}`;
};
const firstPoint = Math.min(RATE_LOW_POINTS[0][0], RATE_HIGH_POINTS[0][0]);
const lastPoint = Math.max(RATE_LOW_POINTS[RATE_LOW_POINTS.length - 1][0], RATE_HIGH_POINTS[RATE_HIGH_POINTS.length - 1][0]);

export const plannerGuide: ToolGuideContent = {
  name: "Campaign Planner",
  howTo: [
    {
      title: "Set your budget",
      body: `Drag the slider, tap a quick budget or type an exact amount between ${formatINR(PLANNER_MIN)} and ${formatINR(PLANNER_MAX)}. Use the money you can spend on this one song without stress.`,
    },
    {
      title: "Tell us if the song is out (optional)",
      body: "This doesn't change the estimate. It only helps us plan around your release date if you get in touch.",
    },
    {
      title: "Read the plan and the stream range",
      body: "You'll see the plan we'd recommend, an estimated range of Spotify streams and the estimated cost per stream.",
    },
    {
      title: "Share it or send us your track",
      body: "Copy the plan, share it on WhatsApp, save it as an image, or use the forms below the result. Nothing is booked until we've talked.",
    },
  ],
  reading: {
    intro:
      "The big number is a range, not a promise. The low end is our cautious estimate; the high end is closer to what we see when the song's hook connects with the audience. Divide the budget by the streams and you get the cost per stream, the number that tells you whether a campaign is good value. Here is how we read it:",
    bands: cpsBands(),
    outro:
      "If someone offers you streams far below the 'worth a closer look' line, ask where those streams come from.",
  },
  method: {
    intro: "The planner turns a budget into a stream range using the results of our recent campaigns. This is the whole method:",
    points: [
      "From our recent campaigns we worked out how many Spotify streams each rupee brought at different budgets: a cautious (low) and an optimistic (high) 'streams per ₹1' rate.",
      `Below ${formatINR(firstPoint)} both estimates use the ${formatINR(firstPoint)} rate, because we don't have campaign data under that amount.`,
      `Between our data points the rate changes in a straight line. Above ${formatINR(lastPoint)} we keep it flat: we haven't measured bigger budgets, so we don't assume they keep getting cheaper.`,
      "Streams are rounded to the nearest 100. When a number is exactly halfway, it rounds down, to stay cautious.",
      "The recommended plan depends on the budget: smaller budgets go furthest with playlisting alone, larger ones add Meta ads to find new listeners.",
    ],
    table: {
      caption: "What the planner shows for some common budgets (same maths as the tool)",
      head: ["Budget", "Estimated streams", "Est. cost per stream"],
      rows: PLANNER_CHIPS.map((b) => [formatINR(b), streams(b), cps(b)]),
    },
    outro: "The Stream Estimator uses exactly the same numbers, run in reverse: you enter a stream goal and it finds the budget.",
  },
  benchmarks: {
    intro: `These are dated results from our own Meta campaigns, the data the planner is built on. ${metricNoteVisits}`,
    receiptIds: ["playlist-engine", "ad-cost"],
  },
  faqs: [
    {
      q: "How much should I spend to promote a song in India?",
      a: `There's no single right number. Start with what you can afford for this one song and see what it buys: in our campaigns, ${formatINR(10000)} has brought an estimated ${streams(10000)} Spotify streams. The planner works for any amount from ${formatINR(PLANNER_MIN)} to ${formatINR(PLANNER_MAX)}.`,
    },
    {
      q: "Does a bigger budget always get cheaper streams?",
      a: `In our data it does, up to a point. The estimated cost per stream falls from about ${cps(firstPoint)} at ${formatINR(firstPoint)} to ${cps(lastPoint)} at ${formatINR(lastPoint)}. Above ${formatINR(lastPoint)} we keep the rate flat because we haven't measured beyond it.`,
    },
    {
      q: "Are these streams guaranteed?",
      a: "No. They are estimates from our recent campaigns. The real result depends on the song, the genre and the audience it reaches. We never guarantee streams or playlist placement.",
    },
    {
      q: "What's the difference between the two plans?",
      a: `${plans.playlisting.name}: ${plans.playlisting.reason} ${plans.combined.name}: ${plans.combined.reason}`,
    },
    {
      q: "What do I need before a Meta ad campaign?",
      a: "A finished, release-ready song and 3 to 5 vertical clips of it. The clips become your ads, so each one should open on the strongest part of the song. Our free Hook Finder suggests which sections to cut.",
    },
    {
      q: "Is my budget saved anywhere?",
      a: `No. The planner runs in your browser. Our privacy-friendly analytics record only which plan was shown and a rough budget bracket, never the exact amount.`,
    },
  ],
  related: ["/estimator", "/tools/cost-per-stream", "/tools/revenue-calculator", "/tools/hook-finder"],
};
