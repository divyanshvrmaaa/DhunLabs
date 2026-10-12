// Written guide under the Streaming Revenue Calculator (/tools/revenue-calculator).
// Rates come from royalties.ts, the same numbers the calculator uses.
import { DEFAULT_INDIA_SHARE, ownStatement, platforms, SPOTIFY_MIN_STREAMS, USD_TO_INR, USD_TO_INR_AS_OF } from "../royalties";
import { calculateRevenue, formatMoney, per1000 } from "../../lib/royalties";
import { formatINR2, formatNumber } from "../../lib/format";
import { YT_CPV_AVG } from "../pricing";
import type { ToolGuideContent } from "./types";

const p = (id: string) => platforms.find((x) => x.id === id)!;
const spotify = p("spotify");
const youtube = p("youtube");
const meta = p("meta");

const inrPerStream = (usd: number) => formatMoney(usd * USD_TO_INR, "INR");
const k = (usd: number) => per1000(usd, "INR");
const ratio = (a: number, b: number) => (Math.round((a / b) * 100) / 100).toString();

const lakhSpotifyIndia = calculateRevenue({
  audience: "india",
  indiaShare: 100,
  streams: { spotify: 100000 },
  distributorKeep: 100,
  youtubeExtraCut: 0,
  ownership: 100,
}).totals.you;

const si = spotify.india!;
const sg = spotify.global!;

export const revenueGuide: ToolGuideContent = {
  name: "Streaming Revenue Calculator",
  howTo: [
    {
      title: "Choose where your listeners are",
      body: `Pick India, Global, or Mix and set the share of streams from India (it starts at ${DEFAULT_INDIA_SHARE}%). Spotify for Artists → Audience → Location shows your real split.`,
    },
    {
      title: "Enter your streams on each platform",
      body: "Use your total streams, or switch to 'Per month' to see a monthly and yearly figure.",
    },
    {
      title: "Set who takes a cut",
      body: "Pick what you keep after your distributor, any extra YouTube Content ID cut, and how much of the song you own after splits with producers, features or a label.",
    },
    {
      title: "Read your take-home",
      body: "The big number is what reaches you. The bar shows what goes to co-owners and to the distributor. Switch between ₹ and $ any time.",
    },
  ],
  reading: {
    intro: `The take-home is an estimate with a likely range, because no platform publishes a fixed per-stream rate. To check a real statement, divide what Spotify paid by your streams and multiply by 1,000. For Indian listeners, compare with our Spotify range of ${k(si.low)}–${k(si.high)} per 1,000 streams:`,
    bands: [
      {
        label: `Above ${k(si.high)}`,
        tone: "good",
        text: "Better than typical for India. Usually means more listeners on paid plans, or more listeners abroad.",
      },
      {
        label: `${k(si.low)}–${k(si.high)}`,
        tone: "ok",
        text: `Normal for Indian listeners. Our typical figure is ${k(si.typical)} per 1,000 (${inrPerStream(si.typical)} per stream).`,
      },
      {
        label: `Below ${k(si.low)}`,
        tone: "bad",
        text: "Lower than typical. Check your distributor's cut, extra YouTube fees, and whether most of your listeners use free accounts.",
      },
    ],
    outro: `Listeners abroad pay much more: our global Spotify range is ${k(sg.low)}–${k(sg.high)} per 1,000 streams.`,
  },
  method: {
    intro: "Every rate is an estimate for the recording (master) side, after the platform's own cut and before your distributor's. This is how we set them:",
    points: [
      `Spotify for Indian listeners is set at ${inrPerStream(si.typical)} per stream (typical). The other India rates keep the platform ratios from our own Indian distributor statement (${ownStatement.period}): YouTube earns about ${ratio(youtube.india!.typical, si.typical)}× Spotify per stream, and Instagram & Facebook about ${ratio(meta.india!.typical, si.typical)}×.`,
      "Apple Music and Amazon Music in India: we have no direct data, so we scale their global rates down to match Indian subscription prices. These are marked 'limited data'.",
      "JioSaavn, Deezer and Tidal use published industry estimates (listed under Sources below).",
      `In Mix mode each rate is blended: the India rate for your Indian share and the global rate for the rest.`,
      "Your take-home = streams × rate × the share you keep after the distributor (and any extra YouTube cut) × the share of the song you own.",
      `Dollar rates are converted at $1 = ₹${USD_TO_INR} (${USD_TO_INR_AS_OF}). Songwriting royalties (for example IPRS in India) are extra and not included. Figures are before tax.`,
    ],
    table: {
      caption: "Typical earnings per 1,000 streams used by the calculator",
      head: ["Platform", "Indian listeners", "Listeners abroad"],
      rows: platforms.map((x) => [x.name, x.india ? k(x.india.typical) : "Not available", x.global ? k(x.global.typical) : "No data yet"]),
    },
  },
  benchmarks: {
    intro: "Real numbers we've seen, from our own statement and our own campaigns:",
    receiptIds: ["youtube-views"],
    extra: [
      {
        title: `Our Indian distributor statement · ${ownStatement.period}`,
        text: `₹${ownStatement.per1000.spotify.toFixed(2)} per 1,000 Spotify streams, ₹${ownStatement.per1000.youtube.toFixed(2)} per 1,000 YouTube plays and ₹${ownStatement.per1000.meta.toFixed(2)} per 1,000 Instagram/Facebook uses, before the distributor's share.`,
        note: "We use the ratios between these platforms for the India rates. Your own statement is the best data you can have.",
      },
    ],
    outro: `Compare the two: a YouTube view we paid for cost about ${formatINR2(YT_CPV_AVG)} on average (Receipt C), while YouTube pays roughly ${inrPerStream(youtube.india!.typical)} per Indian view. Paid views build an audience; they don't pay for themselves.`,
  },
  faqs: [
    {
      q: "How much does Spotify pay per stream in India?",
      a: `About ${inrPerStream(si.typical)} per stream for Indian listeners in our estimate, usually between ${inrPerStream(si.low)} and ${inrPerStream(si.high)}. That's roughly ${k(si.typical)} per 1,000 streams, before your distributor's cut. Spotify doesn't publish a fixed rate, so it moves with the month and your listeners' plans.`,
    },
    {
      q: "How much does YouTube pay per 1,000 views in India?",
      a: `Roughly ${k(youtube.india!.typical)} per 1,000 plays for music, in a range of ${k(youtube.india!.low)}–${k(youtube.india!.high)}, covering official audio, videos, Shorts and Content ID as distributors report it. Some distributors take an extra cut on YouTube.`,
    },
    {
      q: "How much do 1 lakh Spotify streams earn in India?",
      a: `About ${formatMoney(lakhSpotifyIndia.typical, "INR")}, likely between ${formatMoney(lakhSpotifyIndia.low, "INR")} and ${formatMoney(lakhSpotifyIndia.high, "INR")}, if you keep 100% and own the whole song. Your distributor's cut and any splits come out of that.`,
    },
    {
      q: "Does Spotify pay for songs with very few streams?",
      a: `Since April 2024, Spotify pays nothing for a track with fewer than ${formatNumber(SPOTIFY_MIN_STREAMS)} streams in the past 12 months. The calculator warns you if you enter fewer.`,
    },
    {
      q: "Does this include songwriting royalties like IPRS?",
      a: "No. The calculator covers the recording (master) side that your distributor pays. If you wrote the song, songwriting royalties from IPRS or a publisher are extra.",
    },
    {
      q: "How much does Instagram pay when people use my song in Reels?",
      a: `Very little per use: about ${k(meta.india!.typical)} per 1,000 uses in India. Reels matter for discovery far more than for royalties.`,
    },
  ],
  related: ["/estimator", "/planner", "/tools/cost-per-stream", "/tools/hook-finder"],
};
