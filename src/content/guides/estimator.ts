// Written guide under the Stream Estimator (/estimator).
// Numbers are calculated from pricing.ts and royalties.ts, so they always match the tools.
import { ESTIMATOR_MIN_STREAMS, STREAM_CHIPS, SUSPICIOUS_CPS_BELOW, YT_CPV_AVG, YT_CPV_HIGH, YT_CPV_LOW } from "../pricing";
import { budgetForStreams, budgetForViews } from "../../lib/estimate";
import { calculateRevenue } from "../../lib/royalties";
import { formatINR, formatINR2, formatNumber, formatRange } from "../../lib/format";
import { cpsBands } from "./shared";
import type { ToolGuideContent } from "./types";

const budget = (streams: number) => {
  const r = budgetForStreams(streams);
  return formatRange(r.low, r.high, true);
};
const viewsBudget = (views: number) => {
  const r = budgetForViews(views);
  return formatRange(r.low, r.high, true);
};
const indiaSpotify10k = calculateRevenue({
  audience: "india",
  indiaShare: 100,
  streams: { spotify: 10000 },
  distributorKeep: 100,
  youtubeExtraCut: 0,
  ownership: 100,
}).totals.you.typical;

export const estimatorGuide: ToolGuideContent = {
  name: "Stream Estimator",
  howTo: [
    {
      title: "Enter your Spotify stream goal",
      body: `Type the number of streams you want (at least ${formatNumber(ESTIMATOR_MIN_STREAMS)}) or tap a quick goal.`,
    },
    {
      title: "Add YouTube views if you want them (optional)",
      body: "YouTube views run as a separate Google Ads campaign, so they get their own budget line and are added to the total.",
    },
    {
      title: "Read the budget range",
      body: "You'll see the estimated budget for each goal, the total, and the plan that fits that budget.",
    },
    {
      title: "Share it or talk to us",
      body: "Copy it, share it on WhatsApp, save it as an image, or use the forms below to send us your track.",
    },
  ],
  reading: {
    intro:
      "The estimator gives a budget range. The lower number assumes the campaign performs at the better end of our results; the higher number assumes the cautious end. Plan with the higher number so you're not caught short. To judge any quote you get elsewhere, divide the price by the streams promised and compare:",
    bands: [
      ...cpsBands(),
      {
        label: `YouTube ${formatINR2(YT_CPV_LOW)}–${formatINR2(YT_CPV_HIGH)}`,
        tone: "info",
        text: `The cost per view range we saw on our own Google Ads video campaigns (average ${formatINR2(YT_CPV_AVG)}). Far cheaper "views" are worth questioning.`,
      },
    ],
  },
  method: {
    intro: "The estimator uses the same model as the Campaign Planner, run in reverse.",
    points: [
      "For Spotify, it searches for the budget at which our estimate reaches your goal. The lower budget comes from our optimistic estimate, the higher one from our cautious estimate.",
      `For YouTube, it multiplies your views by the cost per view from our own Google Ads video campaigns (11 Aug to 7 Oct 2026): ${formatINR2(YT_CPV_LOW)} at the cheapest (in-stream ads) up to ${formatINR2(YT_CPV_HIGH)} (in-feed ads).`,
      "Budgets are rounded to the nearest ₹100, and the total is the two budgets added together.",
      "The plan shown is based on the top of your total budget range.",
    ],
    table: {
      caption: "What the estimator shows for some common goals (same maths as the tool)",
      head: ["Goal", "Estimated budget"],
      rows: [...STREAM_CHIPS.map((s) => [`${formatNumber(s)} Spotify streams`, budget(s)]), ["1,00,000 YouTube views", viewsBudget(100000)]],
    },
  },
  benchmarks: {
    intro: "The YouTube numbers come straight from Receipt C. The Spotify side is built on our Meta campaigns, like Receipt B.",
    receiptIds: ["youtube-views", "ad-cost"],
  },
  faqs: [
    {
      q: "How much does it cost to get 10,000 Spotify streams in India?",
      a: `Based on our recent campaigns, about ${budget(10000)}. The exact amount depends on your song, its genre and the audience it reaches. Treat this as an estimate, not a price list.`,
    },
    {
      q: "How much do 1,00,000 YouTube views cost?",
      a: `About ${viewsBudget(100000)} with Google Ads video campaigns. Our own campaigns averaged ${formatINR2(YT_CPV_AVG)} per view between 11 Aug and 7 Oct 2026.`,
    },
    {
      q: "Why is the estimate a range and not one number?",
      a: "Because songs perform differently. A track whose hook grabs people in the first seconds of an ad gets streams more cheaply than one that takes time to land. The range shows both ends of what we've seen.",
    },
    {
      q: "Can I just buy a stream package instead?",
      a: `We don't recommend it. Streams that cost under ${formatINR2(SUSPICIOUS_CPS_BELOW)} each often come from bots or low-quality sources. Platforms can remove them and penalise the track, and they never turn into fans. Every playlist in our network is bot-free.`,
    },
    {
      q: "Will the streams pay back what I spend?",
      a: `Usually not directly. 10,000 Spotify streams from Indian listeners earn roughly ${formatINR(indiaSpotify10k)} (see the Streaming Revenue Calculator), while getting them through ads costs more. Artists promote to build listeners who come back and follow, not to earn the money back on the first streams.`,
    },
    {
      q: "Do you guarantee the number of streams?",
      a: "No. These are estimates from our recent campaigns. We never guarantee streams or playlist placement.",
    },
  ],
  related: ["/tools/youtube-views-estimator", "/planner", "/tools/revenue-calculator", "/tools/hook-finder"],
};
