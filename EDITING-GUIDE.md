# DhunLabs website: editing guide

You don't need to know how to code to change this site. Almost everything you'd want to change (words, numbers, links) lives in **one folder**: `src/content/`. Each file there is a plain list of text and numbers.

You have two options for every change below:

- **Ask Claude:** "Change the Ki Scene Aa? follower count to 22,400 and redeploy." Done.
- **Do it yourself:** open the file, change the text between the quote marks, save, then follow **"Put your change live"** at the bottom.

> Rule of thumb: only change what's **inside quote marks** `"like this"` or plain numbers like `20955`. Leave the commas, brackets and colons around them exactly as they are.

---

## Where things live

| I want to change… | Open this file |
|---|---|
| Email, Instagram, YouTube, Google Form links | `src/content/site.ts` |
| The four numbers under the hero (~25K, 60K+, 500K+, 100%) | `src/content/stats.ts` |
| The "Three Pillars" text and "How it works" steps | `src/content/pillars.ts` |
| Case studies (Harman Sohi + the receipts) | `src/content/caseStudies.ts` |
| Playlists (names, vibe lines, follower counts) | `src/content/playlists.ts` |
| YouTube videos in "Learn" | `src/content/videos.ts` |
| "My Story" text, chips, photo | `src/content/founder.ts` |
| Plan names and what each plan includes | `src/content/plans.ts` |
| **Pricing model** (planner and estimator maths) | `src/content/pricing.ts` |
| Free tools text (tools hub cards, readiness questions) | `src/content/tools.ts` |
| Streaming Revenue Calculator rates (per platform, India/global), ₹–$ rate, distributor presets | `src/content/royalties.ts` |
| FAQ questions and answers | `src/content/faq.ts` |
| Page titles and Google descriptions | `src/content/seo.ts` |

---

## Common changes

### Change a number (for example, a follower count)
1. Open `src/content/playlists.ts`.
2. Find the playlist and change `followers: 20955,` to the new number. **No commas inside the number**: write `22400`, not `22,400`. The site adds the commas itself.
3. If the date changed, update `followersAsOf` near the top (e.g. `"as of Jan 2027"`).
4. Also update the "60K+" proof stat in `src/content/stats.ts` if the total changes.

### Update the "as of" dates
Dated numbers say "as of Oct 2026". Search the `src/content/` folder for `Oct 2026` and replace each one.

### Add a playlist
1. Put the cover image in `assets-src/covers/` as a `.jpg` (e.g. `my-new-playlist.jpg`).
2. In `src/content/playlists.ts`, copy one whole block from `{` to `},` and paste it below the others. Change:
   - `id`: the code after `/playlist/` in the Spotify link
   - `emoji`, `name`, `vibe`, `url`, `followers`
   - `category`: one of `"Punjabi"`, `"Indie"`, `"Hindi Rap"`
   - `cover`: `"/covers/my-new-playlist.webp"` (same name as your file, ending in `.webp`)
3. Run `npm run images` (or ask Claude) to make the fast WebP version.

### Add a case study / fill in Harman's details
Open `src/content/caseStudies.ts`. Harman's empty fields are set to `null` and are hidden on the site until you fill them:
- `artistPhoto: null` → put a photo in `public/images/` and write `artistPhoto: "/images/harman.webp",`
- `spotifyArtistUrl: null` → `spotifyArtistUrl: "https://open.spotify.com/artist/…",`
- `quote: null` → `quote: "What Harman said about the campaign",`

To add a new **receipt**, copy one block in `receipts` and change the text. `size: "large"` makes a big card; `"small"` makes a wide strip.

### Add a YouTube video
1. In `src/content/videos.ts`, copy a block and paste the video's 11-character ID (the part after `watch?v=` in the link).
2. Save the thumbnail from `https://i.ytimg.com/vi/<ID>/maxresdefault.jpg` into `assets-src/thumbs/<ID>.jpg`, then run `npm run images`. (Or just ask Claude to "add this video: <link>".)

### Change the pricing model
Open `src/content/pricing.ts`. **Visitors never see these numbers.** They only see the estimates the planner and estimator produce.

- `ADS_THRESHOLD = 15000`: the budget at which the recommended plan switches from **Spotify Playlisting** to **Meta Ads + Playlisting**.
- `RATE_LOW_POINTS` / `RATE_HIGH_POINTS`: "streams per ₹1" at known budgets. Between two points the site draws a straight line.
  - **Below ₹5,000** the rate stays at 1.0 (no data yet).
  - **Above ₹25,000** the rates stay flat at 1.2 (low) and 1.6 (high). We have no data past ₹25,000, so it does **not** extrapolate upward.
  - When you have new data (say ₹50,000 brought 85,000–1,10,000 streams), add a point: `[50000, 1.7]` to the low list and `[50000, 2.2]` to the high list (streams ÷ budget).
- `YT_CPV_LOW` / `YT_CPV_HIGH`: the YouTube cost-per-view range (₹0.11–₹0.21).
- `TYPICAL_CPS_LOW` / `TYPICAL_CPS_HIGH` / `SUSPICIOUS_CPS_BELOW`: used by the Cost-Per-Stream Checker.

**After changing the model**, the automated tests (which check your section 11 table) will fail on purpose if the numbers move. Ask Claude to "update the pricing tests to the new model", or edit `src/lib/estimate.test.ts`. Run the tests with `npm test`.

### Add or edit an FAQ
Open `src/content/faq.ts`. Each question is a block with `q` (question) and `a` (answer). `links` adds optional buttons under the answer. Google also reads these automatically.

### Update the Streaming Revenue Calculator rates
Open `src/content/royalties.ts`. Spotify for Indian listeners is set at ₹0.10 per stream (typical); the other India rates keep the platform ratios from your April–June 2026 distributor statement. To change the level, ask Claude "set Spotify India to ₹X per stream and scale the others". Each platform has an `india` and a `global` rate in **US dollars per stream**, with a `low`, `typical` and `high` value (e.g. `typical: 0.0007` = $0.0007 = about ₹0.07 per stream).
- No platform publishes official rates; these come from the industry sources listed at the bottom of that file (and on the page). Your own distributor statements are the best data: if your Spotify India statements show ₹60 per 1,000 streams, that's `60 / 96.8 / 1000 ≈ 0.00062`.
- `confidence: "limited"` shows a small "limited data" tag next to that platform.
- `india: null` hides a platform when "India" is selected (Deezer and Tidal); `global: null` hides it when "Global" is selected (Instagram & Facebook, until there's global data).
- `USD_TO_INR` is the exchange rate (₹96.8 on 8 Oct 2026). Update it now and then.
- After changing rates, run `npm test`. One test checks Spotify India is ₹0.10 per stream, so update `src/lib/royalties.test.ts` if you change those rates (or ask Claude).

---

## Put your change live

1. **See it locally first:** open Terminal in this folder and run `npm run dev`, then open http://localhost:5173.
2. **Check nothing broke:** `npm test` (pricing tests) and `npm run build` (should end with "postbuild: 9 pages (8 pre-rendered) + shell.html + sitemap.xml").
3. **Save a version:** `git add -A` then `git commit -m "Describe your change"`.
4. **Publish:** `git push`. Vercel deploys automatically:
   - pushing to a **branch** (like `redesign-v2`) creates a **preview link** you can check first;
   - merging into **`main`** updates the live site, **dhunlabs.studio**.
5. **Undo a bad deploy:** in Vercel → your project → **Deployments**, pick the previous good one → **⋯ → Instant Rollback**.

Or simply tell Claude: "Change X, show me the preview, then deploy."

---

## Good to know

- **Pre-rendering:** when the site is built, every page is turned into ready-made HTML, so text appears instantly on slow phones and Google can read it. You don't need to do anything for this; it happens on every build.

- **Images:** originals live in `assets-src/`; `npm run images` makes the small WebP versions in `public/`. Don't put huge photos straight into `public/`.
- **Analytics:** Vercel Analytics only (privacy-friendly). Custom events record form-button clicks, planner/estimator results (plan name and a budget bucket only, never the exact amount) and tool usage. No Meta Pixel or other trackers.
- **Forms:** the Google Forms are embedded on the planner and estimator, and there's always an "Open form in a new tab" button for phones where embeds misbehave.
- **The share image** (`public/og-image.jpg`) is what WhatsApp/Instagram show when someone pastes your link. Ask Claude to regenerate it if the headline changes.
