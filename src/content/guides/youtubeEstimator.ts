// Written guide under the YouTube Views Estimator (/tools/youtube-views-estimator).
// Every number comes from pricing.ts (our Google Ads results), the same numbers the tool uses.
import { VIEW_CHIPS, YT_CPV_AVG, YT_CPV_HIGH, YT_CPV_LOW } from "../pricing";
import { budgetForViews, viewsForBudget } from "../../lib/estimate";
import { formatINR, formatINR2, formatNumber, formatRange } from "../../lib/format";
import type { ToolGuideContent } from "./types";

const views = (b: number) => {
  const r = viewsForBudget(b);
  return formatRange(r.low, r.high);
};
const budget = (v: number) => {
  const r = budgetForViews(v);
  return formatRange(r.low, r.high, true);
};

export const YT_BUDGET_CHIPS = [5000, 10000, 25000, 50000, 100000];

export const youtubeEstimatorGuide: ToolGuideContent = {
  name: "YouTube Views Estimator",
  howTo: [
    { title: "Pick how you want to plan", body: "Choose 'I have a budget' to see how many views it could buy, or 'I have a view goal' to see what that goal could cost." },
    { title: "Enter the number", body: "Type an amount or tap one of the quick options." },
    { title: "Read the range", body: `You'll see a range: the high end assumes the cheapest cost per view we've seen (${formatINR2(YT_CPV_LOW)}), the low end the most expensive (${formatINR2(YT_CPV_HIGH)}). The middle line uses our average of ${formatINR2(YT_CPV_AVG)}.` },
    { title: "Share it or talk to us", body: "Copy it, share it, save it as an image, or book a strategy audit if you'd like us to run the campaign." },
  ],
  reading: {
    intro: "Cost per view is what you pay for each view: budget divided by views. This is how our own Google Ads video campaigns compare:",
    bands: [
      { label: `Under ${formatINR2(YT_CPV_LOW)}`, tone: "warn", text: "Cheaper than anything our campaigns have paid. If someone sells you views this cheap, check whether real people are watching: look at watch time and comments." },
      { label: `${formatINR2(YT_CPV_LOW)}–${formatINR2(YT_CPV_AVG)}`, tone: "good", text: "The cheaper end of our results. In our campaigns this was mostly in-stream ads, the skippable ads shown before other videos." },
      { label: `${formatINR2(YT_CPV_AVG)}–${formatINR2(YT_CPV_HIGH)}`, tone: "ok", text: "The pricier end of our results. In our campaigns this was mostly in-feed ads, where your video appears in YouTube search and the home feed." },
      { label: `Over ${formatINR2(YT_CPV_HIGH)}`, tone: "high", text: "More than our campaigns paid per view. Worth checking the ad format and the targeting." },
    ],
  },
  method: {
    intro: "The estimator uses the cost per view from our own Google Ads video campaigns, run from 11 Aug to 7 Oct 2026.",
    points: [
      `Cheapest cost per view we saw: ${formatINR2(YT_CPV_LOW)} (in-stream ads). Most expensive: ${formatINR2(YT_CPV_HIGH)} (in-feed ads). Average: ${formatINR2(YT_CPV_AVG)}.`,
      "Budget to views: your budget divided by the cost per view. The high end uses the cheapest rate, the low end the most expensive.",
      "Views to budget: your goal multiplied by the cost per view, the same way round.",
      "Results are rounded to the nearest 100.",
      "It doesn't include the cost of making the video itself, only the ad spend.",
    ],
    table: {
      caption: "What the estimator shows for common budgets and goals (same maths as the tool)",
      head: ["You enter", "Estimate"],
      rows: [
        ...YT_BUDGET_CHIPS.map((b) => [`${formatINR(b)} budget`, `${views(b)} views`]),
        ...VIEW_CHIPS.filter((v) => v >= 10000).map((v) => [`${formatNumber(v)} views`, budget(v)]),
      ],
    },
  },
  benchmarks: {
    intro: "The numbers behind this tool come straight from Receipt C:",
    receiptIds: ["youtube-views"],
  },
  faqs: [
    { q: "How much do 1,00,000 YouTube views cost in India?", a: `In our own Google Ads video campaigns, 1,00,000 views would cost about ${budget(100000)}. The exact price depends on the video, the ad format and the audience.` },
    { q: "What is a good cost per view on YouTube?", a: `Our campaigns paid between ${formatINR2(YT_CPV_LOW)} and ${formatINR2(YT_CPV_HIGH)} per view, ${formatINR2(YT_CPV_AVG)} on average. Anything in that range is in line with what we see.` },
    { q: "Which ad format gets the cheapest views?", a: `In our campaigns, in-stream ads (the skippable ads before other videos) were cheapest, from ${formatINR2(YT_CPV_LOW)} per view. In-feed ads, shown in search and the home feed, cost up to ${formatINR2(YT_CPV_HIGH)}.` },
    { q: "Are cheap view packages worth it?", a: `Be careful. Views sold far below ${formatINR2(YT_CPV_LOW)} each often come from bots or low-quality sources. They don't turn into fans and can hurt how YouTube treats your channel.` },
    { q: "Do you guarantee the number of views?", a: "No. These are estimates from our recent campaigns. Results depend on the video, the format and the audience. We never guarantee views." },
    { q: "Can I promote on YouTube and Spotify together?", a: "Yes. YouTube runs as a separate Google Ads campaign alongside Spotify. The Stream Estimator shows both budgets together, and you can mention YouTube when you book a strategy audit." },
  ],
  related: ["/estimator", "/planner", "/tools/revenue-calculator", "/tools/cost-per-stream"],
};
