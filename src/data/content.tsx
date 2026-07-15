// ─── SITE CONTENT ───────────────────────────────────────────────────────────
// Edit this file to update all site copy, stats, cards, and links.
import { FaSpotify, FaYoutube } from "react-icons/fa";
import { SiMeta } from "react-icons/si";

export const SITE = {
  name: "DhunLabs",
  tagline: "Music Growth Engine",
  email: "contactdhunlabs@gmail.com",
  instagram: "https://instagram.com/dhunlabs",
  youtube: "https://youtube.com/@dhunlabsnetwork",
  spotifyProfile: "https://open.spotify.com/user/31o2cneefwyomdhd3q22u3mq67fu", // Replace with actual Spotify profile link
  formLink: "https://forms.gle/gpPcddPTHNCw5Koe9",
  playlistformLink: "https://forms.gle/pobacpCdQizm8nQ29",
};

export const STATS: { value: string; label: string; accent: string }[] = [
  { value: "135×", label: "Peak monthly listener lift in a single campaign", accent: "coral" },
  { value: "27×",  label: "Spotify popularity index growth (closed window)", accent: "violet" },
  { value: "1M+",  label: "Music streams managed across active campaigns", accent: "gold" },
  { value: "10K+", label: "Active listeners across the playlisting network", accent: "green" },
];

export const PILLARS = [
  {
    id: "meta",
    number: "01",
    icon: <SiMeta />,
    accent: "coral" as const,
    title: "Meta Promotions",
    subtitle: "For Artists Who Want Real Listeners",
    description:
      "We don't run generic music video boosts. DhunLabs builds precision Meta ad campaigns built around your track's emotional hooks — targeting high-intent listeners who save, replay, and stream consistently. Every rupee justified by data.",
    metric: "30×",
    metricLabel: "Average Reach",
    link: SITE.formLink,
  },
  {
    id: "spotify",
    number: "02",
    icon: <FaSpotify />,
    accent: "violet" as const,
    title: "Spotify Playlisting",
    subtitle: "A Closed Network Built on Taste",
    description:
      "Our high-intent listener ecosystem is structured around mood profiles and regional scenes — not volume. Real listeners who save and return. That saves-to-stream ratio forces algorithms to push your music further without paid play.",
    metric: "12M+",
    metricLabel: "Streams Generated",
    link: SITE.spotifyProfile,
  },
  {
    id: "youtube",
    number: "03",
    icon: <FaYoutube />,
    accent: "gold" as const,
    title: "DhunLabs YouTube",
    subtitle: "Free Education. No Gatekeeping.",
    description:
      "Every strategy we run for clients is documented publicly on our channel — campaign breakdowns, Spotify algorithm deep-dives, Meta ad frameworks. Learn the exact systems, or let us run them for you. Either way, you win.",
    metric: "100K+",
    metricLabel: "Community Views",
    link: SITE.youtube,
  },
];

export const CASE_STUDIES = [
  {
    id: "kaash",
    index: "01",
    artist: "Kaash",
    image: "/artists/kaash.jpg",
    spotify: "https://open.spotify.com/artist/15QpDzPrlwKtuxs9fW4HgO",
    genre: "Canadian Hip-Hop",
    description:
      "DhunLabs built a campaign around emotional recall — soft launching through targeted Meta advertising, micro playlists, and production-led storytelling. Every creative decision amplified the moments listeners save and return to.",
    tactics: ["Meta Advertising", "Playlist Seeding", "Visual Edits"],
    metrics: [
      { label: "Monthly Listener Lift", value: "135×", note: "Within the first 7 days of campaign activation" },
    ],
    note: "The track's hard vocal texture became the campaign language — performer clips, Punjabi playlist placement, and visual edits that felt discovered, not pushed.",
    accent: "coral" as const,
  },
  {
    id: "kaaj",
    index: "02",
    artist: "Kaaj",
    image: "/artists/kaaj.jpg",
    spotify: "https://open.spotify.com/artist/2WssPruJGD6K6tmg9lmSGk",
    genre: "Catalog Optimization",
    description:
      "Kaaj had hit a listener ceiling. DhunLabs layered cross-platform optimization and amplified UGC signals to push deeper algorithmic indexing — sustaining momentum and routing top tracks into active recommendation loops.",
    tactics: ["Meta Advertising", "Signal Amplification", "Catalog Growth"],
    metrics: [
      { label: "Listener Expansion", value: "+56%", note: "Net monthly baseline growth" },
      { label: "Stream Acceleration", value: "2×", note: "Velocity on primary focus singles" },
    ],
    note: "Compounding platform signals over a 3-week window turned stagnant catalog into an active discovery funnel.",
    accent: "violet" as const,
  },
  {
    id: "featured",
    index: "03",
    artist: "Divyansh Verma",
    image: "/artists/divyansh.jpg",
    spotify: "https://open.spotify.com/artist/58s0k45u8t9Gc18V8Akq2x",
    genre: "DhunLabs Signature Campaign",
    description:
      "[Description of your featured campaign — the artist, the challenge, the strategy DhunLabs deployed, and what made this campaign unique. This slot is reserved for your most impressive result.]",
    tactics: ["[Tactic 1]", "[Tactic 2]", "[Tactic 3]"],
    metrics: [
      { label: "streams", value: "100k+", note: "100k+ streams on spotify" },
    ],
    note: "[What made this campaign tick — your creative approach, audience insight, and execution.]",
    accent: "gold" as const,
    featured: true,
  },
];

export const PLAYLISTS = [
  {
    icon: "🌙",
    name: "everything feels a little too much",
    mood: "Late-night indie · Soft vocal pop · Lofi discoveries",
    link: "https://open.spotify.com/playlist/1DW0cAxjba9Qaq2GR2ZXXr",
  },
  {
    icon: "🚗",
    name: "Ki Scene Aa?",
    mood: "Punjabi bangers · High energy · Car drives",
    link: "https://open.spotify.com/playlist/6Tfy76YzQlMr3VeaKdAN0V",
  },
  {
    icon: "🔥",
    name: "[Playlist Name]",
    mood: "More curated playlists coming",
    link: "",
    placeholder: true,
  },
  {
    icon: "✨",
    name: "[Playlist Name]",
    mood: "More curated playlists coming",
    link: "",
    placeholder: true,
  },
];
export const VIDEOS = [
  {
    id: "7ujDXcgc7dE",
    tag: "Playlist Strategy",
    title: "Stop Buying Dead Playlists. Build Your Own.",
    desc: "Engineer your own targeted listener pipelines for less than ₹1 per high-retention follower.",
  },
  {
    id: "crPmQcVElzA",
    tag: "Meta Ads",
    title: "Steal Our VIRAL Ads",
    desc: "The exact visual hooks, pacing mechanics, and content formats that capture high-intent listeners.",
  },
];

export const TICKER_ITEMS = [
  "🎵 Meta Ads for Artists",
  "📈 135× Monthly Listener Growth",
  "🎧 Spotify Playlisting Network",
  "📊 27× Popularity Index Lift",
  "🎬 Free Music Education",
  "🚀 1M+ Streams Managed",
  "🎵 Delhi, India · Music Growth Agency",
  "📣 High-Intent Listener Campaigns",
];
