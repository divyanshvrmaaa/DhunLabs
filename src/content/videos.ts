// ─── YOUTUBE VIDEOS ("Learn Our Systems. For Free.") ────────────────────────
// To add a video: copy a block and paste the 11-character video ID from the
// YouTube link (youtube.com/watch?v=THIS_PART). Put its thumbnail in
// assets-src/thumbs/<ID>.jpg and run `npm run images`.

export const learnIntro = {
  eyebrow: "Learn",
  title: "Learn Our Systems. For Free.",
  body: "Every strategy we run for clients is documented publicly on our channel. Campaign breakdowns, Spotify algorithm deep-dives, Meta ad frameworks. No fluff, just data.",
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
    hook: "Stop wasting your money on ineffective marketing strategies. Data-backed tier list based on our own experience.",
  },
  {
    id: "3nq8tMKMDwg",
    title: "Spotify Popularity Index",
    hook: "FORCE the algorithm to push your songs. The exact framework to get algorithmic streams on Spotify for free.",
  },
  {
    id: "3FinJRARyTI",
    title: "FULL GUIDE: Meta Ads For Music Promotion",
    hook: "The complete walkthrough of how we set up Meta ads for a song, step by step.",
  },
  {
    id: "VA5XiZy0GCw",
    title: "I Took a Punjabi Artist From Zero to 25K Listeners in 30 Days",
    hook: "The full breakdown of the Harman Sohi campaign.",
  },
];

export const channelCard = {
  handle: "@DhunLabsNetwork",
  line: "Free music marketing education",
  cta: "Visit Channel →",
};

export const videoUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
