// ─── SPOTIFY PLAYLIST NETWORK ───────────────────────────────────────────────
// Follower counts as of 7 Oct 2026. To update a count, change "followers".
// To add a playlist: copy one block, change the fields, and put its cover
// image in assets-src/covers/ then run `npm run images` (see EDITING-GUIDE.md).

export type PlaylistCategory = "Punjabi" | "Indie" | "Hindi Rap";

export interface Playlist {
  id: string;
  emoji: string;
  name: string;
  vibe: string;
  url: string;
  followers: number;
  category: PlaylistCategory;
  /** File in /public/covers (WebP). null = a gradient tile with the emoji is shown. */
  cover: string | null;
  /** Hover glow colour for this card. */
  glow: string;
}

export const followersAsOf = "as of Oct 2026";

export const playlists: Playlist[] = [
  {
    id: "6Tfy76YzQlMr3VeaKdAN0V",
    emoji: "🚗",
    name: "Ki Scene Aa?",
    vibe: "Punjabi bangers · High energy · Car drives",
    url: "https://open.spotify.com/playlist/6Tfy76YzQlMr3VeaKdAN0V",
    followers: 20955,
    category: "Punjabi",
    cover: "/covers/ki-scene-aa.webp",
    glow: "rgba(245,200,66,0.22)",
  },
  {
    id: "60Xq0z3ygSNBiLj1bddXYL",
    emoji: "🎸",
    name: "Indie Rock | 2026",
    vibe: "Fresh indie rock · Guitar-driven · 2026 releases",
    url: "https://open.spotify.com/playlist/60Xq0z3ygSNBiLj1bddXYL",
    followers: 19844,
    category: "Indie",
    cover: "/covers/indie-rock-2026.webp",
    glow: "rgba(242,239,233,0.16)",
  },
  {
    id: "1DW0cAxjba9Qaq2GR2ZXXr",
    emoji: "🌙",
    name: "everything feels a little too much",
    vibe: "Late-night indie · Soft vocal pop · Lofi discoveries",
    url: "https://open.spotify.com/playlist/1DW0cAxjba9Qaq2GR2ZXXr",
    followers: 16318,
    category: "Indie",
    cover: "/covers/everything-feels.webp",
    glow: "rgba(155,110,255,0.24)",
  },
  {
    id: "22P74epP4Yhf71eftCqgVp",
    emoji: "🎙️",
    name: "Asli DHH | Best of Hindi Rap",
    vibe: "असली देसी हिप-हॉप · Heavy 808s · Underground heat · Street anthems",
    url: "https://open.spotify.com/playlist/22P74epP4Yhf71eftCqgVp",
    followers: 3699,
    category: "Hindi Rap",
    cover: "/covers/asli-dhh.webp",
    glow: "rgba(29,185,84,0.22)",
  },
];

export const playlistFilters: ("All" | PlaylistCategory)[] = ["All", "Punjabi", "Indie", "Hindi Rap"];

export const networkIntro = {
  eyebrow: "Network",
  title: "Built on Taste, Not Volume.",
  body: "DhunLabs operates closed, high-intent listener ecosystems across targeted mood profiles and regional scenes. No botted lists. No dead streams. Just real ears on your music.",
};

export const playlistsPage = {
  badge: "DHUNLABS PLAYLIST NETWORK",
  title: "Explore Our Spotify Playlists.",
  sub: "Every playlist is carefully curated around a specific mood and audience. Discover new music, find your vibe, and if your track belongs here, submit it for review.",
  submit: {
    title: "Want Your Music Here?",
    body: "Submit your track and our team will personally review it for playlist consideration.",
    trust: ["Every track is personally reviewed", "Bot-free, always", "Placement is considered, not guaranteed"],
  },
};
