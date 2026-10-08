// ─── "THREE PILLARS" SECTION + "HOW IT WORKS" ───────────────────────────────

export const pillarsIntro = {
  eyebrow: "What we do",
  title: "Three Pillars. One Growth Engine.",
  body: "Every tool DhunLabs deploys feeds the same objective: making platforms recommend your music to the right listeners, organically and at scale.",
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
    body: "Precision Meta campaigns built around your track's emotional hooks, targeting high-intent listeners who save, replay and stream consistently. Every rupee justified by data.",
    metric: "78×",
    metricLabel: "average reach",
    cta: { label: "Plan your campaign", href: "/planner" },
  },
  {
    id: "spotify",
    number: "02",
    title: "Spotify Playlisting",
    subtitle: "A Closed Network Built on Taste.",
    body: "A high-intent listener ecosystem structured around mood profiles and regional scenes, built on saves, not volume. Real listeners who save and return.",
    metric: "500K+",
    metricLabel: "streams managed",
    cta: { label: "Explore playlists", href: "/playlists" },
  },
  {
    id: "youtube",
    number: "03",
    title: "DhunLabs YouTube",
    subtitle: "Free Education. No Gatekeeping.",
    body: "Every strategy we run for clients is documented publicly: campaign breakdowns, Spotify algorithm deep dives, Meta ad frameworks.",
    metric: "5,000+",
    metricLabel: "monthly viewers",
    cta: { label: "Visit the channel", href: "https://youtube.com/@dhunlabsnetwork" },
  },
];

export const howItWorks = {
  eyebrow: "How it works",
  title: "From first message to launch.",
  steps: [
    { title: "Tell us your goal or budget", body: "Use the free Campaign Planner to see what fits.", link: { label: "Open the planner", href: "/planner" } },
    { title: "Submit your track", body: "We listen first and only move forward with release-ready songs." },
    { title: "Short strategy call", body: "We map the hooks, the audience and the plan together." },
    { title: "We launch and track it", body: "Campaigns run with conversion tracking, end to end." },
  ],
  banner: { title: "Not sure what you need? Try the free Campaign Planner.", cta: "Open the Campaign Planner" },
};
