// ─── FREE TOOLS ─────────────────────────────────────────────────────────────
// Text for the /tools hub and the home page tools strip.


export interface ToolCard {
  href: string;
  title: string;
  benefit: string;
  tag: string;
  /** Spans two columns on the tools hub (desktop). */
  wide?: boolean;
}

export const toolsHub = {
  badge: "FREE TOOLS",
  title: "Free tools for independent artists.",
  sub: "Plan a campaign, see the budget a stream goal takes, find out what your streams earn and sanity-check past ad results. Everything runs in your browser, with no sign-up and nothing stored.",
  cards: [
    { href: "/planner", title: "Campaign Planner", benefit: "Enter a budget. Get an honest plan and a stream estimate.", tag: "Budget → plan" },
    { href: "/estimator", title: "Stream Estimator", benefit: "Enter a stream goal. See the budget it takes.", tag: "Goal → budget" },
    { href: "/tools/revenue-calculator", title: "Streaming Revenue Calculator", benefit: "What your streams earn on each platform, for Indian or global listeners, after your distributor's cut.", tag: "Streams → ₹" },
    { href: "/tools/cost-per-stream", title: "Cost-Per-Stream Checker", benefit: "Find out if a past campaign paid a fair price per stream.", tag: "₹ per stream" },
  ] as ToolCard[],
};

/** Home page strip: four of the hub cards. */
export const homeToolsStrip = {
  title: "Free tools for independent artists",
  hrefs: ["/planner", "/estimator", "/tools/revenue-calculator", "/tools/cost-per-stream"],
};

// ── Cost-Per-Stream Checker ── (thresholds live in pricing.ts)
