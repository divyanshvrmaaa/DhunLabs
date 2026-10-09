// ─── YOUTUBE VIDEOS ("Learn Our Systems. For Free.") ────────────────────────
// To add a video: copy a block and paste the 11-character video ID from the
// YouTube link (youtube.com/watch?v=THIS_PART). Put its thumbnail in
// assets-src/thumbs/<ID>.jpg and run `npm run images`.

export const learnIntro = {
  eyebrow: "Learn",
  title: "Learn Our Systems. For Free.",
  body: "We document the strategies we run for clients on our YouTube channel: campaign breakdowns, Spotify algorithm deep dives and the Meta ad setups we use. Watch, learn and use what works."
};

export interface Video {
  id: string;
  title: string;
  hook: string;
}

export const videos: Video[] = [
  {
    id: "A_D18IaKgPw",
    title: "Music Marketing Tierlist",
    hook: "Stop spending money on promotion that doesn't work. A tier list of promotion methods, ranked from our own campaign data.",
  },
  {
    id: "3nq8tMKMDwg",
    title: "Spotify Popularity Index",
    hook: "Get Spotify's algorithm to push your songs. The exact framework we use to earn algorithmic streams for free.",
  },
  {
    id: "3FinJRARyTI",
    title: "FULL GUIDE: Meta Ads For Music Promotion",
    hook: "A complete, step-by-step walkthrough of how we set up Meta ads for a song.",
  },
  {
    id: "VA5XiZy0GCw",
    title: "I Took a Punjabi Artist From Zero to 25K Listeners in 30 Days",
    hook: "The full breakdown of how Harman Sohi went from zero to about 25K monthly listeners.",
  },
];

export const channelCard = {
  handle: "@DhunLabsNetwork",
  line: "Free music marketing education",
  cta: "Visit Channel →",
};

export const videoUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
