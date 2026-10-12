// Written guide under the Hook Finder (/tools/hook-finder).
// The weights and settings come from lib/hook/analysis.ts, so the text matches the tool.
import { BLOCK_SECONDS, CANDIDATES, MAX_SECONDS, WEIGHTS } from "../../lib/hook/analysis";
import type { ToolGuideContent } from "./types";

const pct = (n: number) => `${Math.round(n * 100)}%`;

export const hookFinderGuide: ToolGuideContent = {
  name: "Hook Finder",
  howTo: [
    { title: "Add your song", body: "Drop an MP3, WAV or M4A file into the box, or tap to choose one (up to 60 MB). It stays on your device; nothing is uploaded." },
    { title: "Pick 15 or 30 seconds", body: "15 seconds suits Reels and Stories ads. 30 seconds gives a longer story for feed ads. You can switch after the analysis and it re-runs instantly." },
    { title: "Listen to the suggestions", body: `You get up to ${CANDIDATES} sections that don't overlap, marked on the waveform. Press play on each and trust your ears.` },
    { title: "Download your clips", body: "Download each section as a WAV file to drop into your video editor, or copy the timestamps for your editor or for us." },
  ],
  reading: {
    intro: "Each suggestion comes with a short reason. Here's what they mean:",
    bands: [
      { label: "Likely chorus", tone: "good", text: "The section sounds like another part of the song. A part that comes back is usually the chorus or main hook, the bit people remember." },
      { label: "High energy", tone: "ok", text: "One of the loudest, fullest parts of the song. Energy helps stop the scroll in the first seconds of an ad." },
      { label: "Busy rhythm", tone: "ok", text: "Lots of hits and changes per second. Movement keeps eyes and ears on a short clip." },
      { label: "Starts early", tone: "info", text: "The start was moved to just before the energy lifts, so the clip opens right as the hook lands." },
    ],
    outro: "These are suggestions. Your ears make the final call. A quiet, emotional line can be a better hook than the loudest part, especially for soft or lofi songs.",
  },
  method: {
    title: "How it works, in plain words",
    intro: "In plain words, the Hook Finder listens for three things and scores every possible clip:",
    points: [
      `Your browser converts the song to a single, lighter channel and cuts it into ${BLOCK_SECONDS}-second slices.`,
      `Energy (${pct(WEIGHTS.energy)} of the score): how loud and full each slice is.`,
      `Rhythm (${pct(WEIGHTS.rhythm)}): how many new sounds start per second (drum hits, note changes).`,
      `Repetition (${pct(WEIGHTS.repetition)}): it builds a note 'fingerprint' for each slice and checks whether the same run of notes comes back elsewhere in the song. A section that repeats is usually the chorus.`,
      "Every possible 15 or 30-second clip is scored. Silent stretches count for less. The best clips that don't overlap are kept, and each start is nudged to just before a jump in loudness.",
      `The heavy lifting runs in a background thread, so the page stays responsive. Songs longer than ${MAX_SECONDS / 60} minutes are analysed for the first ${MAX_SECONDS / 60} minutes only.`,
      "Nothing is sent to any server: not the song, not the results.",
    ],
  },
  extraSections: [
    {
      id: "good-ad-hook",
      title: "What makes a good ad hook",
      bullets: [
        "The first 3 seconds matter most. People decide whether to keep watching almost instantly, so start the clip right before the hook lands, not on a slow build.",
        "Pick the part people would hum after one listen, usually the chorus or the main melodic line.",
        "Make 3 to 5 clips from different parts of the song. Ads find their own winners, and we build our Meta campaigns around the strongest hook.",
        "Shoot vertical (9:16) video for each clip. Movement and a face on screen help, but the sound has to carry it.",
      ],
    },
  ],
  benchmarks: {
    intro: "Our ad campaigns are built around the song's hook. These are dated results from our own Meta campaigns:",
    receiptIds: ["playlist-engine", "ad-cost"],
  },
  faqs: [
    { q: "Is my song uploaded anywhere?", a: "No. The file is read and analysed entirely inside your browser on your own device. Nothing is uploaded, so it's safe to use with unreleased tracks." },
    { q: "Which file types work?", a: "MP3, WAV and M4A (AAC), up to about 60 MB. Most browsers on phones and laptops can read all three." },
    { q: "Should I use 15 or 30 seconds?", a: "Start with 15 seconds for Reels and Stories ads; it forces the clip to open on the hook. Use 30 seconds if your hook needs a build-up or you're making feed ads." },
    { q: "Why did it pick a part that isn't my chorus?", a: "It judges sound, not meaning. Songs with a quiet chorus, or very consistent energy throughout, can trip it up. Listen to all suggestions and go with your ears." },
    { q: "Can I use the downloaded clip directly in an ad?", a: "Yes, the WAV is cut straight from your file at full quality, with a tiny fade at each end to avoid clicks. Add it to your vertical video in any editor." },
    { q: "Does it work for instrumentals and lofi?", a: "Yes, it looks at energy, rhythm and repetition, not vocals. For calm songs, the 'likely chorus' suggestion is often the most useful one." },
  ],
  related: ["/planner", "/estimator", "/tools/cost-per-stream", "/tools/revenue-calculator"],
};
