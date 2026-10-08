// ─── GLOBAL SITE SETTINGS ───────────────────────────────────────────────────
// Brand, contact details and every important link live here.

export const site = {
  brand: "DhunLabs",
  tagline: "Music Growth Agency",
  location: "Delhi, India",
  siteUrl: "https://dhunlabs.studio",

  /** "Book a Strategy Audit", "Get Started", "Contact us". Short link for buttons. */
  onboardingForm: "https://forms.gle/gpPcddPTHNCw5Koe9",
  /** Full address of the same form, used to embed it inside the page. */
  onboardingFormEmbed:
    "https://docs.google.com/forms/d/e/1FAIpQLSdhQatzyTV_o4tMhrhBHvzvLW0lxgKjxCMp-kz_QYSvpBkJHw/viewform?embedded=true",

  /** "Submit Your Track". Short link for buttons. */
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

/** Main navigation. "anchor" items scroll on the home page; "route" items go to their own page. */
export const nav: { label: string; anchor?: string; route?: string }[] = [
  { label: "Services", anchor: "services" },
  { label: "Work", anchor: "work" },
  { label: "Network", anchor: "network" },
  { label: "Tools", route: "/tools" },
  { label: "Learn", anchor: "learn" },
  { label: "About", anchor: "about" },
];

/** The date shown next to dated numbers on the site. */
export const dataAsOf = "Oct 2026";
