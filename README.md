# dhunlabs.studio

Website for DhunLabs, a music growth agency for independent artists.

- **Editing content:** see [EDITING-GUIDE.md](EDITING-GUIDE.md) (plain English, no coding needed).
- **Stack:** Vite + React + TypeScript, Tailwind CSS, Framer Motion, React Router, Lenis. Static output on Vercel.

```bash
npm install       # once
npm run dev       # local preview at http://localhost:5173
npm test          # automatic tests (pricing, royalties, videos, Hook Finder)
npm run build     # production build into dist/ (every page pre-rendered)
npm run check     # check every built page: H1, title, description, canonical, JSON-LD, links
npm run preview   # serve the built site at http://localhost:4173
npm run images    # regenerate WebP images from assets-src/
npm run og        # regenerate the 1200x630 share images in public/og/ (needs Chrome)
```
