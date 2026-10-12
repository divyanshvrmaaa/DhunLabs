// ─── GLOBAL SITE SETTINGS ───────────────────────────────────────────────────
// Brand, contact details and every important link live here.

export const site = {
  brand: "DhunLabs",
  tagline: "Music Growth Agency",
  location: "Delhi, India",
  siteUrl: "https://dhunlabs.studio",

  // The site's own forms are at /contact and /submit-track (questions in src/content/forms.ts);
  // their answers are sent into these Google Forms. The links below are kept as a backup
  // that visitors see only if sending fails.

  /** Onboarding / strategy audit Google Form. */
  onboardingForm: "https://forms.gle/gpPcddPTHNCw5Koe9",
  /** Full address of the same form, used to embed it inside the page. */
  onboardingFormEmbed:
    "https://docs.google.com/forms/d/e/1FAIpQLSdhQatzyTV_o4tMhrhBHvzvLW0lxgKjxCMp-kz_QYSvpBkJHw/viewform?embedded=true",

  /** Track submission Google Form. */
  trackSubmitForm: "https://forms.gle/pobacpCdQizm8nQ29",
  /** Full address of the same form, used to embed it inside the page. */
  trackSubmitFormEmbed:
    "https://docs.google.com/forms/d/e/1FAIpQLSf_SDkszOoSZB9G-PbZzGq5Wb3P1XhkP2abWldbXpNlIUaAGA/viewform?embedded=true",

  email: "contactdhunlabs@gmail.com",
  instagram: "https://instagram.com/dhunlabs",
  instagramHandle: "@dhunlabs",
  youtube: "https://youtube.com/@dhunlabsnetwork",
  youtubeHandle: "@dhunlabsnetwork",
  spotifyProfile: "https://open.spotify.com/user/31o2cneefwyomdhd3q22u3mq67fu",

  copyrightYear: 2026,
} as const;

export const mailto = `mailto:${site.email}`;

/**
 * Main navigation. "route" items go to their own page; "anchor" items scroll on the home page.
 * "match" lists other pages that should highlight the item (e.g. the planner lights up "Tools").
 */
export const nav: { label: string; anchor?: string; route?: string; match?: string[] }[] = [
  { label: "Services", route: "/services" },
  { label: "Work", route: "/work" },
  { label: "Playlists", route: "/playlists" },
  { label: "Tools", route: "/tools", match: ["/planner", "/estimator"] },
  { label: "Learn", route: "/learn" },
  { label: "About", anchor: "about" },
];

/** The date shown next to dated numbers on the site. */
export const dataAsOf = "Oct 2026";
