// ─── FREE TOOLS ─────────────────────────────────────────────────────────────
// Text for the /tools hub, the home page tools strip, the footer and the
// "Related free tools" lists under each tool.

export interface ToolCard {
  href: string;
  title: string;
  /** One short line (home page strip and "related tools" lists). */
  benefit: string;
  /** 2–3 sentences for the /tools hub. */
  description: string;
  tag: string;
  /** Show a "New" label. */
  isNew?: boolean;
}

export const toolsHub = {
  badge: "FREE TOOLS",
  title: "Free music marketing tools for independent artists.",
  sub: "Plan a campaign, see the budget a stream goal takes, find out what your streams earn and sanity-check past ad results. Everything runs in your browser, with no sign-up and nothing stored.",
  intro: [
    "We built these tools for the questions artists ask us every week: how much should I spend, what will it get me, what do streams actually pay, and did that last campaign work? Each tool gives you an honest estimate based on our own campaign data and real royalty statements, not on what a sales page wants you to believe.",
    "The planner and the estimator use the same model, one starting from your budget and one from your goal. The revenue calculator shows what reaches your pocket after distributors and splits, for Indian and global listeners. The cost-per-stream checker tells you whether a past campaign paid a fair price. Every result can be shared as a link or an image.",
    "All of them are free, need no sign-up and work on your phone. Nothing you type leaves your browser.",
  ],
  cards: [
    {
      href: "/planner",
      title: "Campaign Planner",
      benefit: "Enter a budget. Get an honest plan and a stream estimate.",
      description:
        "Enter the budget you have for a song and see the plan we'd recommend, an estimated range of Spotify streams and the cost per stream. Built on the results of our recent Meta and playlist campaigns.",
      tag: "Budget → plan",
    },
    {
      href: "/estimator",
      title: "Stream Estimator",
      benefit: "Enter a stream goal. See the budget it takes.",
      description:
        "Know how many Spotify streams or YouTube views you want? Enter the goal and see the estimated budget range and the plan that fits. Same model as the planner, run in reverse.",
      tag: "Goal → budget",
    },
    {
      href: "/tools/revenue-calculator",
      title: "Streaming Revenue Calculator",
      benefit: "What your streams earn on each platform, for Indian or global listeners, after your distributor's cut.",
      description:
        "See what your Spotify, YouTube, JioSaavn, Apple Music, Amazon and Instagram streams are likely to earn. Choose Indian, global or mixed listeners, then take off your distributor's cut and any splits.",
      tag: "Streams → ₹",
    },
    {
      href: "/tools/cost-per-stream",
      title: "Cost-Per-Stream Checker",
      benefit: "Find out if a past campaign paid a fair price per stream.",
      description:
        "Enter what a past campaign cost and the streams it brought. See your cost per stream, how it compares with what our campaigns usually see, and whether it's cheap enough to be a red flag.",
      tag: "₹ per stream",
    },
  ] as ToolCard[],
};

/** Home page strip: the hub cards in this order. */
export const homeToolsStrip = {
  title: "Free tools for independent artists",
  hrefs: ["/planner", "/estimator", "/tools/revenue-calculator", "/tools/cost-per-stream"],
};
