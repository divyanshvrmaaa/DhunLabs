// ─── SPOTIFY PLAYLIST NETWORK ───────────────────────────────────────────────
// Follower counts as of Oct 2026 (all four read from Spotify on 26 Oct 2026). To update a count, change "followers".
// To add a playlist: copy one block, change the fields, and put its cover
// image in assets-src/covers/ then run `npm run images` (see EDITING-GUIDE.md).

export type PlaylistCategory = "Punjabi" | "Indie" | "Hindi Rap";

export interface Playlist {
  id: string;
  /** Web address of this playlist's own page: dhunlabs.studio/playlists/<slug>. */
  slug: string;
  /** Main heading on the playlist's page. */
  h1: string;
  /** Short mood phrase used in sentences ("… for {mood}"). */
  mood: string;
  /** One or two sentences about the playlist (its page). */
  about: string;
  /** The kind of tracks that fit (its page). */
  fits: string[];
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
    slug: "ki-scene-aa",
    h1: "Ki Scene Aa? Punjabi Spotify Playlist",
    mood: "high-energy Punjabi bangers for car drives",
    about:
      "Ki Scene Aa? is our Punjabi playlist for high-energy bangers: the songs you turn up on a car drive. It's the biggest playlist in our network, grown with real listeners through our own Meta ad campaigns (Receipt A on our Work page).",
    fits: ["High-energy Punjabi tracks", "Songs built for car drives and turning the volume up", "A hook that lands early"],
    emoji: "🚗",
    name: "Ki Scene Aa?",
    vibe: "Punjabi bangers · High energy · Car drives",
    url: "https://open.spotify.com/playlist/6Tfy76YzQlMr3VeaKdAN0V",
    followers: 22958,
    category: "Punjabi",
    cover: "/covers/ki-scene-aa.webp",
    glow: "rgba(245,200,66,0.22)",
  },
  {
    id: "60Xq0z3ygSNBiLj1bddXYL",
    slug: "indie-rock-2026",
    h1: "Indie Rock | 2026 Spotify Playlist",
    mood: "fresh, guitar-driven 2026 indie rock",
    about: "Indie Rock | 2026 collects fresh, guitar-driven indie rock from this year's releases. If guitars lead your song and it came out in 2026, this is the playlist to aim for.",
    fits: ["Guitar-driven indie rock", "Songs released in 2026", "Fresh sounds over throwbacks"],
    emoji: "🎸",
    name: "Indie Rock | 2026",
    vibe: "Fresh indie rock · Guitar-driven · 2026 releases",
    url: "https://open.spotify.com/playlist/60Xq0z3ygSNBiLj1bddXYL",
    followers: 21138,
    category: "Indie",
    cover: "/covers/indie-rock-2026.webp",
    glow: "rgba(242,239,233,0.16)",
  },
  {
    id: "1DW0cAxjba9Qaq2GR2ZXXr",
    slug: "everything-feels-a-little-too-much",
    h1: "everything feels a little too much: Late-Night Indie Playlist",
    mood: "late-night indie, soft pop and lofi",
    about: "everything feels a little too much is for late nights: soft vocals, quiet indie, gentle pop and lofi discoveries. It suits songs that feel personal and unhurried.",
    fits: ["Late-night indie and soft vocal pop", "Lofi and mellow discoveries", "Quiet, intimate songs over loud ones"],
    emoji: "🌙",
    name: "everything feels a little too much",
    vibe: "Late-night indie · Soft vocal pop · Lofi discoveries",
    url: "https://open.spotify.com/playlist/1DW0cAxjba9Qaq2GR2ZXXr",
    followers: 17935,
    category: "Indie",
    cover: "/covers/everything-feels.webp",
    glow: "rgba(76,141,255,0.22)",
  },
  {
    id: "22P74epP4Yhf71eftCqgVp",
    slug: "asli-dhh",
    h1: "Asli DHH: Best of Hindi Rap Spotify Playlist",
    mood: "Desi hip-hop with heavy 808s",
    about: "Asli DHH is our Hindi rap playlist: real Desi hip-hop with heavy 808s, underground heat and street anthems.",
    fits: ["Hindi rap and Desi hip-hop", "Heavy 808s", "Underground cuts and street anthems"],
    emoji: "🎙️",
    name: "Asli DHH | Best of Hindi Rap",
    vibe: "असली देसी हिप-हॉप · Heavy 808s · Underground heat · Street anthems",
    url: "https://open.spotify.com/playlist/22P74epP4Yhf71eftCqgVp",
    followers: 3687,
    category: "Hindi Rap",
    cover: "/covers/asli-dhh.webp",
    glow: "rgba(29,185,84,0.22)",
  },
];

export const playlistFilters: ("All" | PlaylistCategory)[] = ["All", "Punjabi", "Indie", "Hindi Rap"];

export const networkIntro = {
  eyebrow: "Network",
  title: "Built on Taste, Not Volume.",
  body: "Our playlists are closed, hand-curated networks built around specific moods and regional scenes. Every follower is a real listener, and nothing is ever botted.",
};

export const playlistsPage = {
  badge: "DHUNLABS PLAYLIST NETWORK",
  title: "Explore Our Spotify Playlists.",
  sub: "Each playlist is curated around one mood and one audience. Find your vibe, discover new music and, if your track belongs here, send it to us for review.",
  submit: {
    title: "Want Your Music Here?",
    body: "Send us your track and we'll personally review it for our playlists.",
    trust: ["Every track is personally reviewed", "Bot-free, always", "Placement is considered, not guaranteed"],
  },
};
