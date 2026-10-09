// ─── FREE TOOLS ─────────────────────────────────────────────────────────────
// Text and settings for /tools and the four artist tools.
// Facts checked against Spotify's help pages on 9 Oct 2026 (sources below).

export const sources = {
  releaseRadar: {
    label: "Spotify for Artists: Getting music on Release Radar",
    url: "https://support.spotify.com/us/artists/article/getting-music-on-release-radar/",
  },
  streams: {
    label: "Spotify for Artists: How your streams are counted",
    url: "https://support.spotify.com/us/artists/article/how-we-count-streams/",
  },
  coverArt: {
    label: "Spotify for Artists: Cover art requirements",
    url: "https://support.spotify.com/us/artists/article/cover-art-requirements/",
  },
};

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
  sub: "Plan a campaign, see what your streams earn, check if a song is ready and sanity-check past ad results. Everything runs in your browser, with no sign-up and nothing stored.",
  cards: [
    { href: "/planner", title: "Campaign Planner", benefit: "Enter a budget. Get an honest plan and a stream estimate.", tag: "Budget → plan" },
    { href: "/estimator", title: "Stream Estimator", benefit: "Enter a stream goal. See the budget it takes.", tag: "Goal → budget" },
    { href: "/tools/revenue-calculator", title: "Streaming Revenue Calculator", benefit: "What your streams earn on each platform, for Indian or global listeners, after your distributor's cut.", tag: "Streams → ₹", wide: true },
    { href: "/tools/playlist-readiness", title: "Playlist-Readiness Checker", benefit: "Answer 10 quick questions to find out if your song is ready to pitch.", tag: "Score /10" },
    { href: "/tools/cost-per-stream", title: "Cost-Per-Stream Checker", benefit: "Find out if a past campaign paid a fair price per stream.", tag: "₹ per stream" },
  ] as ToolCard[],
};

/** Home page strip: four of the hub cards. */
export const homeToolsStrip = {
  title: "Free tools for independent artists",
  hrefs: ["/planner", "/estimator", "/tools/revenue-calculator", "/tools/playlist-readiness"],
};

// ── Playlist-Readiness Checker ──
export interface ReadinessQuestion {
  id: string;
  question: string;
  fix: string;
}

export const readinessQuestions: ReadinessQuestion[] = [
  { id: "mix", question: "Is the song properly mixed and mastered?", fix: "Get a proper mix and master. Curators skip songs that sound quieter or muddier than the rest of their playlist." },
  { id: "hook", question: "Does the hook land before the 30-second mark?", fix: "Bring the hook forward. Spotify counts a stream only after 30 seconds of listening, so the first 30 seconds have to hold attention." },
  { id: "intro", question: "Is the intro clean and short, with no long silence?", fix: "Trim the intro. Long or silent openings get skipped in playlists." },
  { id: "art", question: "Is your cover art square and at least 3000×3000 px?", fix: "Export square cover art at 3000×3000 px. It's the size most distributors ask for." },
  { id: "meta", question: "Are titles, metadata and credits complete and correct?", fix: "Fill in every credit and check spelling of titles and artist names, so the song is attributed correctly." },
  { id: "genre", question: "Could you name the genre, mood and 3 similar artists?", fix: "Pin down the genre and mood. Curators and editors place songs by sound, so you need a clear answer." },
  { id: "samples", question: "Are all samples cleared (or are there none)?", fix: "Clear every sample before release. Uncleared samples can get a song taken down." },
  { id: "lead", question: "Is the release scheduled at least 7 days away?", fix: "Move the release date so it's at least a week out. That's Spotify's cutoff for pitching to get on Release Radar." },
  { id: "profile", question: "Is your Spotify for Artists profile claimed, with a photo and bio?", fix: "Claim your profile in Spotify for Artists and add a photo and bio. It's free, and you need it to pitch." },
  { id: "clips", question: "Do you have 3 to 5 short vertical clips of the song?", fix: "Film a few vertical clips around the hook. You'll need them for teasers and ads." },
];

export const readinessVerdicts = {
  ready: { min: 9, label: "Ready", line: "This song is in good shape to pitch and promote." },
  almost: { min: 6, label: "Almost", line: "A few fixes and you're there." },
  notYet: { min: 0, label: "Not yet", line: "Fix these first. You only get one release day." },
};

// ── Cost-Per-Stream Checker ── (thresholds live in pricing.ts)
