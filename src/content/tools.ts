// ─── FREE TOOLS ─────────────────────────────────────────────────────────────
// Text and settings for /tools and the four artist tools.
// Facts checked against Spotify's help pages on 9 Oct 2026 (sources below).

export const sources = {
  pitching: {
    label: "Spotify for Artists: Pitching music to playlist editors",
    url: "https://support.spotify.com/us/artists/article/pitching-music-to-playlist-editors/",
  },
  releaseRadar: {
    label: "Spotify for Artists: Getting music on Release Radar",
    url: "https://support.spotify.com/us/artists/article/getting-music-on-release-radar/",
  },
  releaseGuide: {
    label: "Spotify for Artists release guide: Preparing for release day",
    url: "https://artists.spotify.com/en/blog/release-guide-preparing-for-release-day",
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
}

export const toolsHub = {
  badge: "FREE TOOLS",
  title: "Free tools for independent artists.",
  sub: "Plan a release, check a song, sanity-check your ad results and write your Spotify pitch. Everything runs in your browser: no sign-up, nothing stored.",
  cards: [
    { href: "/planner", title: "Campaign Planner", benefit: "Enter a budget, get an honest plan and a stream estimate.", tag: "Budget → plan" },
    { href: "/estimator", title: "Stream Estimator", benefit: "Enter a stream goal, see the budget it takes.", tag: "Goal → budget" },
    { href: "/tools/release-roadmap", title: "Release Roadmap", benefit: "A dated checklist from 6 weeks before release to 4 weeks after.", tag: "Calendar" },
    { href: "/tools/playlist-readiness", title: "Playlist-Readiness Checker", benefit: "10 quick questions. Find out if your song is ready to pitch.", tag: "Score /10" },
    { href: "/tools/cost-per-stream", title: "Cost-Per-Stream Checker", benefit: "Check if a past campaign paid a fair price per stream.", tag: "₹ per stream" },
    { href: "/tools/pitch-writer", title: "Spotify Pitch Writer", benefit: "Turn a few answers into a clean editorial pitch.", tag: "Copy & paste" },
  ] as ToolCard[],
};

/** Home page strip: four of the hub cards. */
export const homeToolsStrip = {
  title: "Free tools for independent artists",
  hrefs: ["/planner", "/estimator", "/tools/release-roadmap", "/tools/pitch-writer"],
};

// ── Release Roadmap ──
export type ReleaseType = "single" | "ep" | "album";

export interface RoadmapTask {
  /** Days relative to release day (negative = before). */
  day: number;
  title: string;
  detail: string;
  /** Only for these release types (default: all). */
  only?: ReleaseType[];
  key?: boolean;
}

export const roadmapTasks: RoadmapTask[] = [
  { day: -42, title: "Lock the final master", detail: "Final mix and master signed off. Confirm writer, producer and feature credits and any splits." },
  { day: -42, title: "Choose your focus track", detail: "Spotify lets you pitch only one song at a time, so pick the track you'll pitch and promote first.", only: ["ep", "album"] },
  { day: -35, title: "Cover art and metadata check", detail: "Square cover art (3000×3000 px is the safe target), titles and artist names spelled exactly as they should appear, explicit flag set correctly." },
  { day: -28, title: "Upload to your distributor", detail: "Uploading about four weeks out leaves time for the release to reach Spotify for Artists so you can pitch it.", key: true },
  { day: -21, title: "Set up your pre-save link", detail: "Create a pre-save link and add it to your bio and stories." },
  { day: -21, title: "Shoot teaser content", detail: "Film 3 to 5 vertical clips around the song's hook. These double as ad creatives later." },
  { day: -14, title: "Pitch to Spotify's editors", detail: "Pitch the song in Spotify for Artists. Spotify recommends pitching at least two weeks before release.", key: true },
  { day: -10, title: "Start posting teasers", detail: "Post the hook clips. Watch which one gets the most saves and shares." },
  { day: -7, title: "Release Radar cutoff", detail: "A pitch submitted at least 7 days before release day gets the song on your followers' Release Radar. Make sure your pitch is in.", key: true },
  { day: -3, title: "Announce the date", detail: "Final teaser with the release date and pre-save link." },
  { day: 0, title: "Release day post", detail: "Post the song everywhere, update every bio link and share it in stories.", key: true },
  { day: 1, title: "Ads start", detail: "Start ads with the clip that performed best as a teaser, sending people straight to the song." },
  { day: 7, title: "Post-release playlist outreach", detail: "Submit the song to independent playlist curators that match its sound." },
  { day: 14, title: "Review the data", detail: "Check Spotify for Artists: saves, listeners and where streams come from. Move ad budget to what's working." },
  { day: 21, title: "Second wave of content", detail: "Behind-the-scenes, lyric or live clips to keep the song moving." },
  { day: 28, title: "Plan the follow-up release", detail: "Set the date for your next release while this audience is warm." },
];

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

// ── Spotify Pitch Writer ──
/** Spotify for Artists pitch limit. Widely cited as 500 characters; not stated in Spotify's help article, so check the form itself. */
export const PITCH_CHAR_LIMIT = 500;
