// ─── SERVICES PAGES (/services, /services/meta-ads, /services/spotify-playlisting) ──
// Copy builds on the home page "Three Pillars" text in pillars.ts.

export const servicesHub = {
  badge: "SERVICES",
  h1Lines: ["Music Promotion Services", "for Independent Artists"],
  youtubeCampaigns: {
    title: "YouTube video campaigns",
    body: "Want YouTube views as well? We run Google Ads video campaigns for music videos as a separate campaign. Our own campaigns averaged the cost per view shown in Receipt C.",
  },
  never: [
    "No bots, fake streams or botted playlists. Ever.",
    "No guaranteed streams or guaranteed playlist placement. We give honest estimates instead.",
    "No fake playlist slots or vanity numbers.",
  ],
};

export const metaAdsPage = {
  badge: "SERVICE · META PROMOTIONS",
  h1: "Meta Ads for Music Promotion",
  flow: [
    { title: "Your track's hook", body: "We pick the strongest part of your song with you. The ad has to earn attention in its first seconds, so it starts on the hook." },
    { title: "Targeted Meta ad", body: "Instagram and Facebook ads aimed at people likely to save the song, replay it and keep streaming, not at anyone who might scroll past." },
    { title: "Tracked visit", body: "Conversion tracking on every step, from the ad to the listener landing on your song, so you can see what each rupee did." },
    { title: "Save & replay", body: "Listeners land on your song. Your track also goes into our playlists, so the ads and the playlists boost each other." },
  ],
  prepare: [
    "A finished, release-ready song (mixed and mastered).",
    "Its Spotify link, or the release date if it isn't out yet.",
    "3 to 5 vertical clips of your song. They become your ads, so each should open on the hook.",
  ],
};

export const playlistingPage = {
  badge: "SERVICE · SPOTIFY PLAYLISTING",
  h1Lines: ["Spotify Playlist Promotion", "for Independent Artists"],
  review: [
    { title: "Send us your track", body: "Use the track submission form. It takes a couple of minutes." },
    { title: "We listen personally", body: "Every submission is listened to by a person, not filtered by an algorithm." },
    { title: "One best-fit playlist", body: "Your song is considered for the one playlist in our network that best fits its sound and mood." },
    { title: "We get in touch", body: "If the track fits, we'll contact you. Placement is considered, never guaranteed." },
  ],
  botFree:
    "Every playlist in our network is bot-free and always has been. Followers are real listeners who chose to follow a mood or a scene. We never use bots or fake streams: platforms penalise them, and they never turn into fans.",
};

export const youtubePage = {
  badge: "SERVICE · YOUTUBE VIDEO CAMPAIGNS",
  h1Lines: ["YouTube Promotion", "for Music Videos"],
  kicker: "Views from people who chose to watch.",
  sub: "Google Ads video campaigns for your music video or lyric video, run as a separate campaign next to (or instead of) Meta ads, with the cost per view tracked from the first day.",
  flow: [
    { title: "Your music video", body: "Send us the YouTube link of your music video or lyric video. It should already be live on your channel." },
    { title: "Google Ads video campaign", body: "We run the video as a YouTube ad aimed at people who listen to your kind of music, so views come from viewers likely to enjoy it." },
    { title: "Tracked cost per view", body: "Views, spend and cost per view come straight from the campaign, so you can see what each rupee did." },
    { title: "Fans, not just views", body: "YouTube viewers who stay tend to become your most loyal fans. We look at who keeps watching, not only the view count, and never compare YouTube views with Spotify listeners." },
  ],
  prepare: [
    "Your music video or lyric video, live on YouTube.",
    "Who it's for: the genre, language and region of your listeners.",
    "A view goal or a budget. The YouTube Views Estimator turns one into the other.",
  ],
};
