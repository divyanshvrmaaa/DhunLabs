// ─── YOUTUBE VIDEOS (/learn and one page per video) ─────────────────────────
// Each block below is one video. It becomes:
//   • a card on dhunlabs.studio/learn
//   • its own page at dhunlabs.studio/learn/<slug>
//   • a card in the "Learn" section of the home page (the 4 newest videos)
//   • an entry in the sitemap and Google's video data
//
// TO ADD A VIDEO (see EDITING-GUIDE.md for the step-by-step):
//   1. Copy one whole block, from "{" to "},", and paste it at the top of the list.
//   2. Fill in the fields. "id" is the 11 characters after "watch?v=" in the
//      YouTube link. "slug" is the page address (lowercase words joined by "-").
//   3. "published" is the upload date as YYYY-MM-DD; "duration" as it shows on
//      YouTube (e.g. "13:04" or "1:02:30").
//   4. Optional transcript: save it as src/content/transcripts/<id>.txt (or .srt).
//      It appears on the video's page automatically, exactly as written.
//   5. Thumbnail: save https://i.ytimg.com/vi/<id>/maxresdefault.jpg as
//      assets-src/thumbs/<id>.jpg and run `npm run images`.
//
// Verified on YouTube (titles, upload dates, durations) on 13 Oct 2026.

export const learnIntro = {
  eyebrow: "Learn",
  title: "Learn Our Systems. For Free.",
  body: "We document the strategies we run for clients on our YouTube channel: campaign breakdowns, Spotify algorithm deep dives and the Meta ad setups we use. Watch, learn and use what works.",
};

export const learnPage = {
  badge: "LEARN · FREE VIDEO LESSONS",
  h1Lines: ["Learn Music Marketing:", "Free Video Lessons"],
  kicker: "Learn our systems. For free.",
  sub: "Campaign breakdowns, Spotify algorithm deep dives and the exact Meta ad setups we use for clients. All videos are in Hindi, with an English summary on each page.",
};

export interface Video {
  /** The 11-character YouTube ID. */
  id: string;
  /** Page address: dhunlabs.studio/learn/<slug>. */
  slug: string;
  title: string;
  /** Upload date, YYYY-MM-DD. */
  published: string;
  /** Length as shown on YouTube, e.g. "13:04". */
  duration: string;
  /** One line for cards. */
  hook: string;
  /** English summary, one string per paragraph. */
  summary: string[];
  /** true = Divyansh hasn't checked the summary yet. Not shown on the site; the build lists these videos. */
  summaryNeedsReview?: boolean;
  /** 4–6 key takeaways. */
  takeaways: string[];
  /** Matching tools and services, with descriptive link text. */
  related: { label: string; href: string }[];
  /** true = listed on /learn and the home page, but links straight to YouTube (no page of its own). */
  noPage?: boolean;
  /** Optional transcript file name in src/content/transcripts/ (defaults to <id>.txt or <id>.srt). */
  transcript?: string;
  /** Optional: Google title (under 60 characters) and description (under 155). */
  seoTitle?: string;
  seoDescription?: string;
}

export const videos: Video[] = [
  {
    id: "VA5XiZy0GCw",
    slug: "punjabi-artist-zero-to-25k-listeners",
    title: "I Took a Punjabi Artist From Zero to 25K Listeners in 30 Days",
    published: "2026-10-01",
    duration: "13:04",
    hook: "The full breakdown of how Harman Sohi went from zero to about 25K monthly listeners.",
    summary: [
      "The full breakdown of our featured campaign: how Punjabi independent artist Harman Sohi went from zero to about 25K monthly listeners on Spotify in about 30 days.",
      "The video walks through where the artist started, the Meta ads and playlist strategy we used, what we spent and when, the creatives and targeting, what went wrong along the way and what we changed, and the final results. The video is in Hindi.",
    ],
    summaryNeedsReview: true,
    takeaways: [
      "Where the artist started: the numbers, the music and the problem",
      "The Meta ads and playlist strategy, step by step",
      "The budget: what was spent, and when",
      "The creatives and targeting that moved the needle",
      "What went wrong along the way, and what changed",
      "The final results: streams, saves, followers and listeners",
    ],
    related: [
      { label: "See our campaign results", href: "/work" },
      { label: "Meta ads for music promotion", href: "/services/meta-ads" },
      { label: "Music Promotion Budget Planner", href: "/planner" },
    ],
    seoTitle: "Punjabi Artist: 0 to 25K Listeners in 30 Days | DhunLabs",
    seoDescription:
      "Video breakdown (Hindi) of how Punjabi artist Harman Sohi went from zero to about 25K monthly Spotify listeners in 30 days, with an English summary.",
  },
  {
    id: "3FinJRARyTI",
    slug: "meta-ads-for-music-promotion-guide",
    title: "FULL GUIDE: Meta Ads For Music Promotion",
    published: "2026-07-30",
    duration: "35:45",
    hook: "A complete, step-by-step walkthrough of how we set up Meta ads for a song.",
    summary: [
      "A complete, step-by-step walkthrough of how we set up Meta (Instagram and Facebook) ads for a song, with real campaign data on screen.",
      "It covers the campaign structure DhunLabs uses for streams, saves and followers, real results from our own releases and client campaigns, what to spend at each stage, the targeting and creative decisions that matter, and the mistakes that quietly burn ad budget. It's made for independent artists and managers who want to run their own Meta ads. The video is in Hindi.",
    ],
    summaryNeedsReview: true,
    takeaways: [
      "The campaign structure we use for streams, saves and followers",
      "Real ad results from our own releases and client campaigns",
      "What to spend, and when, at every stage",
      "Targeting and creative decisions that matter for Spotify's algorithm",
      "Mistakes that waste ad budget for zero return",
    ],
    related: [
      { label: "Meta ads for music promotion", href: "/services/meta-ads" },
      { label: "Music Promotion Budget Planner", href: "/planner" },
      { label: "Hook Finder: pick your ad clips", href: "/tools/hook-finder" },
    ],
    seoTitle: "Meta Ads for Music Promotion: Full Guide | DhunLabs",
    seoDescription:
      "A full step-by-step guide (in Hindi) to running Meta ads for a song: campaign structure, budget, targeting, creatives and common mistakes.",
  },
  {
    id: "_buZHdVwI1E",
    slug: "15000-spotify-playlist-experiment",
    noPage: true,
    title: "I Spent ₹15,000 to Promote a Spotify Playlist So You Don't Have To",
    published: "2026-07-17",
    duration: "10:12",
    hook: "₹15,000 to grow a Spotify playlist from zero, with every number published.",
    summary: [
      "We invested ₹15,000 to grow a Spotify playlist from zero, then published everything: the raw data, the backend analytics and the conversion maths.",
      "Watch it before you spend money on 'Boost Post' buttons or playlist promotion sites. The video is in Hindi.",
    ],
    summaryNeedsReview: true,
    takeaways: [
      "The raw campaign data from the ₹15,000 spend",
      "The backend analytics behind the playlist's growth",
      "The conversion maths, step by step",
      "Why 'Boost Post' and random playlist promotion sites are a poor use of money",
    ],
    related: [
      { label: "Spotify playlist promotion", href: "/services/spotify-playlisting" },
      { label: "Browse our Spotify playlists", href: "/playlists" },
      { label: "Cost Per Stream Calculator", href: "/tools/cost-per-stream" },
    ],
    seoTitle: "₹15,000 Spotify Playlist Experiment | DhunLabs",
    seoDescription:
      "We spent ₹15,000 growing a Spotify playlist from zero and published the raw data, analytics and conversion maths. Video in Hindi, summary in English.",
  },
  {
    id: "A_D18IaKgPw",
    slug: "spotify-promotion-methods-ranked",
    title: "Ranking Every Spotify Promotion Method: Music Marketing Tier List",
    published: "2026-07-14",
    duration: "11:54",
    hook: "Stop spending money on promotion that doesn't work. A tier list of promotion methods, ranked from our own campaign data.",
    summary: [
      "A tier list of music promotion methods, ranked from S-tier down to F-tier using backend data from our own campaigns at DhunLabs.",
      "It covers everything from Meta ads and playlists to meme marketing and stream packages, so you can stop spending on methods that bring no lasting listeners. The video is in Hindi.",
    ],
    summaryNeedsReview: true,
    takeaways: [
      "Every common promotion method, ranked S to F",
      "Rankings based on backend data from our own campaigns",
      "Meta ads, playlists, meme marketing and stream packages compared",
      "Why some methods bring streams that vanish the next week",
    ],
    related: [
      { label: "Cost Per Stream Calculator", href: "/tools/cost-per-stream" },
      { label: "Our music promotion services", href: "/services" },
      { label: "Music Promotion Budget Planner", href: "/planner" },
    ],
    seoTitle: "Every Spotify Promotion Method, Ranked | DhunLabs",
    seoDescription:
      "A tier list (in Hindi) of music promotion methods, from Meta ads and playlists to stream packages, ranked from our own campaign data.",
  },
  {
    id: "3nq8tMKMDwg",
    slug: "spotify-popularity-index",
    title: "How to Trigger the Spotify Algorithm in 2026 (Popularity Index Explained)",
    published: "2026-07-09",
    duration: "7:31",
    hook: "Get Spotify's algorithm to push your songs. The exact framework we use to earn algorithmic streams for free.",
    summary: [
      "How do you get Spotify to recommend your music for free? This video explains the Spotify Popularity Index (popularity score) and how Spotify's recommendation system uses it to push independent artists into Release Radar, Discover Weekly and Radio.",
      "It also covers why broad Instagram boosts and playlist scams damage your data, and how precise conversion ads build the stream velocity that matters. The video is in Hindi.",
    ],
    summaryNeedsReview: true,
    takeaways: [
      "What the Spotify Popularity Index is",
      "How it feeds Release Radar, Discover Weekly and Radio",
      "Why broad boosts and playlist scams hurt your data",
      "How conversion ads build stream velocity",
    ],
    related: [
      { label: "Meta ads for music promotion", href: "/services/meta-ads" },
      { label: "Spotify Promotion Cost Estimator", href: "/estimator" },
      { label: "Cost Per Stream Calculator", href: "/tools/cost-per-stream" },
    ],
    seoTitle: "Spotify Popularity Index Explained | DhunLabs",
    seoDescription:
      "How the Spotify Popularity Index works and how it pushes songs into Release Radar, Discover Weekly and Radio. Video in Hindi, summary in English.",
  },
];

export const channelCard = {
  handle: "@DhunLabsNetwork",
  line: "Free music marketing education, in Hindi",
  cta: "Visit the DhunLabs YouTube channel",
};

export const videoUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

/** Where a video card links: its own page, or YouTube for videos without one. */
export const videoHref = (v: Video) => (v.noPage ? videoUrl(v.id) : `/learn/${v.slug}`);

/** Newest first. */
export const videosByDate = () => [...videos].sort((a, b) => b.published.localeCompare(a.published));

/** "13:04" → "PT13M4S" (the format Google wants). */
export function isoDuration(d: string): string {
  const parts = d.split(":").map(Number);
  const [h, m, s] = parts.length === 3 ? parts : [0, parts[0], parts[1]];
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}${s ? `${s}S` : ""}` || "PT0S";
}

/** "2026-07-30" → "30 Jul 2026" (same on the server and in the browser). */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${d} ${months[m - 1]} ${y}`;
}
