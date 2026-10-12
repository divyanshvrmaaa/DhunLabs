// ─── ON-SITE FORMS ───────────────────────────────────────────────────────────
// The two forms people fill in on the site. When someone presses "Submit",
// the answers are sent straight into the matching Google Form in the
// background, so responses still land in the same Google Form / Sheet as
// before. Visitors never leave dhunlabs.studio.
//
// IMPORTANT if you edit a Google Form:
//   • Each question below is linked to its Google Form question by its
//     "entry" number. Renaming a question in Google Forms is fine.
//   • Adding, deleting or changing the type of a question, or changing the
//     wording of a multiple-choice option, needs the matching change here,
//     otherwise that answer won't be recorded. Ask Claude: "I changed my
//     Google Form, update the site form".
//   • The labels shown on the site can be reworded freely here.

export type FieldType = "text" | "email" | "tel" | "url" | "date" | "textarea" | "radio" | "checkboxes";

export interface FormField {
  /** Short name used in code and for pre-filling. */
  name: string;
  /** Google Form question id, e.g. "entry.2074708868". */
  entry: string;
  label: string;
  hint?: string;
  type: FieldType;
  required: boolean;
  /** For radio/checkboxes: must match the Google Form option text EXACTLY. */
  options?: string[];
  /** The Google question has an "Other" box (shown as a text field). */
  other?: { label: string; placeholder?: string };
  placeholder?: string;
  autoComplete?: string;
}

export interface SiteFormDef {
  id: "onboarding" | "track";
  /** The Google Form that receives the answers. */
  googleFormId: string;
  title: string;
  intro: string;
  submitLabel: string;
  successTitle: string;
  successBody: string;
  fields: FormField[];
}

export const onboardingForm: SiteFormDef = {
  id: "onboarding",
  googleFormId: "1FAIpQLSdhQatzyTV_o4tMhrhBHvzvLW0lxgKjxCMp-kz_QYSvpBkJHw",
  title: "Book a Strategy Audit",
  intro: "Tell us about you, your music and your next release. We'll text you on WhatsApp to set up a short call.",
  submitLabel: "Send my details",
  successTitle: "Got it. Thank you!",
  successBody: "Your details are with us. We'll message you on WhatsApp to schedule the call. Keep an eye on your phone and email.",
  fields: [
    { name: "legalName", entry: "entry.2074708868", label: "Your legal name", type: "text", required: true, autoComplete: "name" },
    { name: "artistName", entry: "entry.2035742356", label: "Artist name", type: "text", required: true },
    {
      name: "whatsapp",
      entry: "entry.888334494",
      label: "WhatsApp number",
      hint: "With country code. We'll text you here to schedule the call.",
      type: "tel",
      required: true,
      placeholder: "+91 98765 43210",
      autoComplete: "tel",
    },
    { name: "email", entry: "entry.1100178937", label: "Email address", type: "email", required: true, placeholder: "you@example.com", autoComplete: "email" },
    {
      name: "spotify",
      entry: "entry.1179103632",
      label: "Spotify artist profile link",
      hint: "Spotify → your artist profile → Share → Copy link.",
      type: "url",
      required: true,
      placeholder: "https://open.spotify.com/artist/…",
    },
    {
      name: "genre",
      entry: "entry.1954241961",
      label: "Primary genre or vibe of your upcoming music",
      hint: "Pick all that fit.",
      type: "checkboxes",
      required: true,
      options: ["Hip-Hop / Rap", "Pop / Commercial", "Indie Pop / Acoustic", "Lo-Fi / Chill / Ambient", "Electronic / R&B"],
      other: { label: "Other", placeholder: "e.g. Punjabi, Desi Hip Hop" },
    },
    {
      name: "releaseStatus",
      entry: "entry.447325697",
      label: "Status of your next release",
      type: "radio",
      required: true,
      options: ["The track is already out (I want to revive/scale current momentum)", "Releasing in less than 14 days", "Releasing in 15–30 days"],
      other: { label: "Other", placeholder: "e.g. Releasing in 2 months" },
    },
    {
      name: "budget",
      entry: "entry.1656914450",
      label: "Monthly marketing budget for this release",
      type: "radio",
      required: true,
      options: ["Under ₹5,000", "₹5,000 to ₹15,000", "₹15,000 to ₹30,000", "₹30,000+"],
    },
    {
      name: "goal",
      entry: "entry.1239025761",
      label: "Is music your career, or a passion project for now?",
      type: "radio",
      required: true,
      options: ["Building this as a serious commercial brand/career.", "Independent passion project."],
    },
    { name: "notes", entry: "entry.799728154", label: "Anything else we should know?", type: "textarea", required: false },
  ],
};

export const trackForm: SiteFormDef = {
  id: "track",
  googleFormId: "1FAIpQLSf_SDkszOoSZB9G-PbZzGq5Wb3P1XhkP2abWldbXpNlIUaAGA",
  title: "Submit your track",
  intro: "We listen to every submission personally and consider it for the one playlist that fits it best. Placement is considered, never guaranteed.",
  submitLabel: "Submit my track",
  successTitle: "Track received. Thank you!",
  successBody: "We'll listen to it personally. If it fits one of our playlists, we'll get in touch on WhatsApp or email.",
  fields: [
    { name: "artistName", entry: "entry.1388021667", label: "Artist name", type: "text", required: true },
    { name: "trackTitle", entry: "entry.712343077", label: "Track title", type: "text", required: true },
    {
      name: "spotifyTrack",
      entry: "entry.2023322943",
      label: "Spotify track link",
      hint: "Spotify → the song → Share → Copy song link.",
      type: "url",
      required: true,
      placeholder: "https://open.spotify.com/track/…",
    },
    { name: "releaseDate", entry: "entry.1573675458", label: "Release date", type: "date", required: true },
    {
      name: "mood",
      entry: "entry.562143914",
      label: "Main mood or lyrical theme of the track",
      type: "text",
      required: true,
      placeholder: "e.g. late-night heartbreak, high-energy party",
    },
    {
      name: "metaAds",
      entry: "entry.1623274901",
      label: "Are you running Meta (Instagram/Facebook) ads for this release?",
      type: "radio",
      required: true,
      options: ["Yes, actively running conversion campaigns.", "No, relying entirely on organic/playlist reach.", "Not yet, but planning to launch ads soon."],
    },
    { name: "whatsapp", entry: "entry.1350460305", label: "WhatsApp number", hint: "With country code, so we can reach you if your track is added.", type: "tel", required: true, placeholder: "+91 98765 43210", autoComplete: "tel" },
    { name: "email", entry: "entry.804825268", label: "Email address", type: "email", required: true, placeholder: "you@example.com", autoComplete: "email" },
  ],
};

export const siteForms = { onboarding: onboardingForm, track: trackForm };
