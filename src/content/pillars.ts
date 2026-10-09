// ─── "THREE PILLARS" SECTION + "HOW IT WORKS" ───────────────────────────────

export const pillarsIntro = {
  eyebrow: "What we do",
  title: "Three Pillars. One Growth Engine.",
  body: "Everything we run has one goal: getting Spotify, YouTube and Instagram to recommend your music to listeners who will keep coming back to it.",
};

export interface Pillar {
  id: "meta" | "spotify" | "youtube";
  number: string;
  title: string;
  subtitle: string;
  body: string;
  metric: string;
  metricLabel: string;
  cta: { label: string; href: string };
}

export const pillars: Pillar[] = [
  {
    id: "meta",
    number: "01",
    title: "Meta Promotions",
    subtitle: "For Artists Who Want Real Listeners.",
    body: "Instagram and Facebook ad campaigns built around the strongest hook in your song, aimed at people likely to save it, replay it and keep streaming. Every rupee is tracked, so you can see exactly what worked.",
    metric: "78×",
    metricLabel: "average reach",
    cta: { label: "Plan your campaign", href: "/planner" },
  },
  {
    id: "spotify",
    number: "02",
    title: "Spotify Playlisting",
    subtitle: "A Closed Network Built on Taste.",
    body: "Our playlists are organised by mood and regional scene, and grown with real listeners who save songs and come back. If your track fits, it reaches people already looking for that sound.",
    metric: "500K+",
    metricLabel: "streams managed",
    cta: { label: "Explore playlists", href: "/playlists" },
  },
  {
    id: "youtube",
    number: "03",
    title: "DhunLabs YouTube",
    subtitle: "Free Education. No Gatekeeping.",
    body: "What we do for clients, we teach for free on our channel: campaign breakdowns, how Spotify's algorithm works and the exact Meta ad setups we use.",
    metric: "5,000+",
    metricLabel: "monthly viewers",
    cta: { label: "Visit the channel", href: "https://youtube.com/@dhunlabsnetwork" },
  },
];

export const howItWorks = {
  eyebrow: "How it works",
  title: "From first message to launch.",
  steps: [
    { title: "Tell us your goal or budget", body: "The free Campaign Planner shows what fits your budget in 30 seconds.", link: { label: "Open the planner", href: "/planner" } },
    { title: "Send us your track", body: "We listen to every song first and only take on tracks that are ready for release." },
    { title: "Have a short strategy call", body: "Together we pick the hook, the audience and the plan." },
    { title: "We launch and track it", body: "We run the campaign and track every step, so you can see what's working." },
  ],
  banner: { title: "Not sure what you need? Try the free Campaign Planner.", cta: "Open the Campaign Planner" },
};
