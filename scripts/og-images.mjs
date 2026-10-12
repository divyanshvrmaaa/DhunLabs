// Makes the 1200×630 share images (what WhatsApp/Instagram/X show for a link).
// Run with: npm run og   (needs Google Chrome installed; output goes to public/og/)
//   • one image per tool page, in the site's own fonts and colours
//   • one per video page, made from its YouTube thumbnail
import { mkdtemp, writeFile, readdir, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "public", "og");
const fonts = pathToFileURL(path.join(root, "public", "fonts")).href;
const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const tools = [
  { slug: "planner", a: "Music Promotion", b: "Budget Planner", kicker: "Plan your campaign in 30 seconds.", url: "dhunlabs.studio/planner" },
  { slug: "estimator", a: "Spotify Promotion", b: "Cost Estimator", kicker: "Know your goal? See the budget.", url: "dhunlabs.studio/estimator" },
  { slug: "revenue-calculator", a: "Spotify & YouTube", b: "Royalty Calculator", kicker: "What are your streams actually worth?", url: "dhunlabs.studio/tools/revenue-calculator" },
  { slug: "cost-per-stream", a: "Cost Per Stream", b: "Calculator", kicker: "Did you pay a fair price per stream?", url: "dhunlabs.studio/tools/cost-per-stream" },
  { slug: "hook-finder", a: "Hook", b: "Finder", kicker: "Find the best 15 or 30 seconds of your song for ads.", url: "dhunlabs.studio/tools/hook-finder" },
];

const logo = `<svg viewBox="120 140 320 260" width="64" height="52"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6DF051"/><stop offset="100%" stop-color="#0C8E28"/></linearGradient><linearGradient id="d" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4BCC32"/><stop offset="100%" stop-color="#086C1D"/></linearGradient></defs><g fill="url(#g)"><rect x="135" y="241" width="12" height="30" rx="6"/><rect x="160" y="231" width="12" height="50" rx="6"/><rect x="185" y="211" width="12" height="90" rx="6"/><rect x="275" y="211" width="12" height="90" rx="6"/><rect x="300" y="226" width="12" height="60" rx="6"/><rect x="325" y="241" width="12" height="30" rx="6"/></g><path d="M 245 155 C 365 155, 420 210, 420 270 C 420 330, 365 385, 245 385 C 310 385, 355 340, 355 270 C 355 200, 320 185, 245 185 Z" fill="url(#g)"/><polygon points="215,155 258,155 258,345 234,345 234,175" fill="url(#d)"/><ellipse cx="212" cy="345" rx="38" ry="28" transform="rotate(-25 212 345)" fill="url(#g)"/></svg>`;

// Decorative waveform on the right (same bar style as the logo)
const bars = Array.from({ length: 16 }, (_, i) => {
  const h = 16 + Math.round(Math.abs(Math.sin(i * 0.9) * 70 + Math.sin(i * 2.3) * 28));
  return `<span style="height:${h}px"></span>`;
}).join("");

const page = (t) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Syne;src:url(${fonts}/syne-latin.woff2) format("woff2");font-weight:500 800}
@font-face{font-family:"Clash Display";src:url(${fonts}/clash-display-600.woff2) format("woff2");font-weight:600}
@font-face{font-family:"DM Sans";src:url(${fonts}/dm-sans-latin.woff2) format("woff2");font-weight:400 700}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#080808;color:#f2efe9;font-family:"DM Sans";overflow:hidden;position:relative}
.glow{position:absolute;border-radius:50%;filter:blur(60px)}
.g1{width:900px;height:600px;left:-300px;top:-320px;background:radial-gradient(closest-side,rgba(29,185,84,.35),transparent)}
.g2{width:700px;height:500px;right:-250px;bottom:-300px;background:radial-gradient(closest-side,rgba(76,141,255,.22),transparent)}
.frame{position:absolute;inset:24px;border:1.5px solid rgba(255,255,255,.1);border-radius:28px}
.wrap{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:14px;font-family:Syne;font-weight:700;font-size:36px;letter-spacing:-.03em}
.eyebrow{margin-top:72px;display:flex;align-items:center;gap:16px;font-weight:600;font-size:20px;letter-spacing:.2em;color:#8a8680}
.eyebrow i{display:block;width:40px;height:3px;background:#1db954}
h1{margin-top:20px;font-family:Syne;font-weight:700;font-size:76px;line-height:.98;letter-spacing:-.035em;max-width:760px}
h1 b{color:#1db954;font-weight:700}
.k{margin-top:22px;font-family:"Clash Display";font-weight:600;font-size:32px;letter-spacing:-.01em;color:rgba(242,239,233,.9);max-width:720px}
.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;font-size:24px}
.url{font-weight:600}
.chips{color:#8a8680;font-size:20px}
.wave{position:absolute;right:76px;top:52px;display:flex;align-items:center;gap:8px;height:120px;opacity:.85}
.wave span{display:block;width:8px;border-radius:6px;background:linear-gradient(#6DF051,#0C8E28)}
</style></head><body><div class="glow g1"></div><div class="glow g2"></div><div class="frame"></div>
<div class="wave">${bars}</div>
<div class="wrap"><div class="brand">${logo}DhunLabs</div>
<div class="eyebrow"><i></i>FREE TOOL</div>
<h1>${t.a} <b>${t.b}</b></h1><p class="k">${t.kicker}</p>
<div class="foot"><span class="url">${t.url}</span><span class="chips">Free · No sign-up · Runs in your browser</span></div></div></body></html>`;

const tmp = await mkdtemp(path.join(tmpdir(), "og-"));
for (const t of tools) {
  const html = path.join(tmp, `${t.slug}.html`);
  const png = path.join(tmp, `${t.slug}.png`);
  await writeFile(html, page(t));
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files", "--virtual-time-budget=3000", `--window-size=1200,630`, `--screenshot=${png}`, pathToFileURL(html).href], { stdio: "ignore" });
  await sharp(png).resize(1200, 630).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(out, `${t.slug}.jpg`));
  console.log(`og: ${t.slug}.jpg`);
}
await rm(tmp, { recursive: true, force: true });

// Video pages: the YouTube thumbnail, cropped to 1200×630
for (const f of await readdir(path.join(root, "assets-src", "thumbs"))) {
  const id = f.replace(/\.\w+$/, "");
  await sharp(path.join(root, "assets-src", "thumbs", f)).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(out, `video-${id}.jpg`));
  console.log(`og: video-${id}.jpg`);
}
