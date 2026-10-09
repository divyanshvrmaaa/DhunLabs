// ─── FAQ (home page, above the final call to action) ────────────────────────
// Keep this file free of imports: the build script also reads it to tell
// Google about the FAQ (FAQPage structured data).
// To add a question: copy a block. "links" are optional buttons under the answer.

export interface FaqItem {
  q: string;
  a: string;
  links?: { label: string; href: string }[];
}

export const faqIntro = {
  eyebrow: "FAQ",
  title: "Questions artists ask us.",
  body: "Straight answers before you book a call. Can't find yours? Email us or use the contact form.",
};

export const faqs: FaqItem[] = [
  {
    q: "Are your playlists and streams real?",
    a: "Yes. Every playlist in our network is bot-free and always has been. Our followers are real listeners who chose to follow a mood or a scene. We never use bots or fake streams: platforms penalise them, and they never turn into fans.",
  },
  {
    q: "Do you guarantee playlist placement or a number of streams?",
    a: "No. We personally review every track and only place songs that fit a playlist's sound, so placement is considered, not guaranteed. Our planner and estimator give honest estimates based on our recent campaigns, and real results depend on the song, the genre and the audience.",
  },
  {
    q: "How much does a campaign cost?",
    a: "It depends on your goal. Enter any budget in the free Campaign Planner to see the plan we'd recommend and an estimated stream range, or enter a stream goal in the Stream Estimator to see the budget it takes. We confirm the final plan with you on a short call.",
    links: [
      { label: "Campaign Planner", href: "/planner" },
      { label: "Stream Estimator", href: "/estimator" },
    ],
  },
  {
    q: "What do I need before we start?",
    a: "A finished, release-ready song (mixed and mastered) and its Spotify link or release date. For Meta ad campaigns, have 3 to 5 vertical clips of your song ready: they become your ads.",
    links: [{ label: "Check if your song is ready", href: "/tools/playlist-readiness" }],
  },
  {
    q: "Can you promote a song that isn't out yet?",
    a: "Yes. Tell us your release date in the form and we'll plan the campaign around it.",
  },
  {
    q: "Which genres do you work with?",
    a: "Mostly Punjabi, Desi Hip Hop, indie and pop. Our playlists cover Punjabi bangers, indie rock, late-night indie and Hindi rap. If you make something else, get in touch anyway. If it isn't a fit, we'll tell you honestly.",
  },
  {
    q: "How do I know my campaign is working?",
    a: "Every campaign runs with conversion tracking on every step, from the ad to the listener landing on your song, so you can see what each rupee did.",
  },
  {
    q: "How long does it take to see results?",
    a: "It depends on the song and the budget. Our featured campaign took a Punjabi artist from zero to about 25K monthly listeners in 30 days. Every song is different, so treat that as an example, not a promise.",
    links: [{ label: "See the case study", href: "/#work" }],
  },
  {
    q: "I just want my song on your playlists. How do I submit?",
    a: "Send it through the track submission form. We listen to every submission personally, and if your track fits one of our playlists, we'll get in touch.",
    links: [{ label: "Submit your track", href: "https://forms.gle/pobacpCdQizm8nQ29" }],
  },
];
