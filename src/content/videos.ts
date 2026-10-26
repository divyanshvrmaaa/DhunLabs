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
    // Added 26 Oct 2026 from the YouTube upload; summary written from the video's chapters and on-screen notes.
    id: "g_uDuMbJLho",
    slug: "spotify-growth-plan-independent-artists",
    title: "The Complete Spotify Growth Plan for Independent Artists",
    published: "2026-10-26",
    duration: "32:40",
    hook: "The 4 stages every independent artist goes through, from 0 to 50K+ monthly listeners, and what to do (and skip) at each one.",
    summary: [
      "Two artists can spend the same budget with the same methods and get completely different results: one goes viral, the other can't get past 10K listeners. The difference is knowing which stage you're in. This free masterclass lays out the full artist development plan we use, split into four stages by monthly listeners.",
      "Stage 1, Foundation (0 to 1K), is about the basics: a properly mixed song with the hook in the first 30 seconds, a real artist profile, pitching Spotify editorial 7+ days before a Friday release, and niche playlist curators. Stage 2, Signal (1K to 10K), is where Meta ads start: saves and repeat listens matter more than raw streams, you test 3 to 5 creatives and move budget to the winner, and you trust Spotify for Artists over Meta's numbers. Stage 3, Scale (10K to 50K), adds retargeting, always-on ads, lookalike audiences, collaborations and YouTube ads for the music video. Stage 4, Business (50K+), covers royalties, IPRS registration and reading a label contract before you sign. The video is in Hindi.",
    ],
    summaryNeedsReview: true,
    takeaways: [
      "Find your stage first: Foundation (0 to 1K), Signal (1K to 10K), Scale (10K to 50K), Business (50K+)",
      "Under 1K monthly listeners, fix the song, profile and release plan before running ads",
      "Saves and repeat listens trigger Spotify's push, not raw stream volume",
      "Test 3 to 5 ad creatives, put most of the budget on the winner and keep winners running",
      "At 10K+, retarget people who already know you before going after cold audiences",
      "At 50K+, register with IPRS for extra royalties and read any label contract carefully",
    ],
    related: [
      { label: "Music Promotion Budget Planner", href: "/planner" },
      { label: "Find your song's hook with Hook Finder", href: "/tools/hook-finder" },
      { label: "Submit your track to our playlists", href: "/submit-track" },
    ],
    seoTitle: "Spotify Growth Plan for Independent Artists | DhunLabs",
    seoDescription:
      "Free masterclass (in Hindi): the 4 stages from 0 to 50K+ monthly Spotify listeners and what to do at each one. English summary and key takeaways.",
  },
  {
    id: "LYLt1syar5I",
    slug: "debut-punjabi-song-20k-streams-meta-ads",
    title: "How We Got 20K+ Streams on a Debut Punjabi Song | Meta Ads",
    published: "2026-10-17",
    duration: "10:05",
    hook: "A debut Punjabi single, a small Meta ads budget and 20,700+ streams in about a month, 96% of them from Spotify's algorithm.",
    summary: [
      "Everyone tells new artists to release ten songs before promoting any of them. This case study shows why one song is enough: the exact Meta ads campaign we ran for Jashan Sandhu's debut single ONE HOPE, on a very small budget, with real Spotify for Artists data on screen.",
      "In about a month the song reached 20,700+ streams, 16,600 listeners, 603 saves and 356 playlist adds, with a Spotify Popularity Index of 30. 96% of the streams came from Spotify's algorithm, not from paid traffic. The video covers why a popularity score above 25 unlocks algorithmic streams, the super listeners who played the song around 27 times each, retargeting moderate listeners, running ads on the YouTube music video, and the two ad creatives we tested, where a simple 2D animation reached ₹4 to ₹5 per conversion. The video is in Hindi.",
    ],
    summaryNeedsReview: true,
    takeaways: [
      "One song is enough to start: you don't need ten releases before you promote",
      "Why a Spotify Popularity Index above 25 unlocks algorithmic streams",
      "The real numbers: 20,700+ streams, 16,600 listeners, 603 saves, 356 playlist adds",
      "96% of streams came from Spotify's algorithm, not from the ads",
      "Super listeners and retargeting: how Meta ads find true fans",
      "The two ad creatives we tested, and why a 2D animation hit ₹4 to ₹5 per conversion",
    ],
    related: [
      { label: "Meta ads for music promotion", href: "/services/meta-ads" },
      { label: "Submit your song to Ki Scene Aa?", href: "/playlists/ki-scene-aa" },
      { label: "Music Promotion Budget Planner", href: "/planner" },
    ],
    seoTitle: "Debut Punjabi Song: 20K+ Streams With Meta Ads | DhunLabs",
    seoDescription:
      "Case study (in Hindi): how a debut Punjabi single reached 20,700+ streams in a month with Meta ads, 96% of them algorithmic. English summary inside.",
  },
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
