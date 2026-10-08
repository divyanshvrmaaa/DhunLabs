import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { PageHeader } from "../components/PageHeader";
import { PlaylistCard } from "../components/PlaylistCard";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { SmartLink } from "../components/ui/SmartLink";
import { playlistFilters, playlists, playlistsPage } from "../content/playlists";
import { track } from "../lib/analytics";

export default function Playlists() {
  const [filter, setFilter] = useState<(typeof playlistFilters)[number]>("All");
  const shown = playlists.filter((p) => filter === "All" || p.category === filter);

  return (
    <>
      <PageHeader badge={playlistsPage.badge} title={playlistsPage.title} sub={playlistsPage.sub} />

      <div className="container-x pb-24 md:pb-36">
        <LayoutGroup>
          <div role="group" aria-label="Filter playlists" className="flex flex-wrap gap-2">
            {playlistFilters.map((f) => {
              const on = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setFilter(f);
                    track("playlist_filter", { filter: f });
                  }}
                  className={`relative min-h-11 rounded-full border px-5 text-sm font-medium transition-colors ${
                    on ? "border-transparent text-bg" : "border-line-strong text-muted hover:text-ink"
                  }`}
                >
                  {on && (
                    <motion.span layoutId="filter-pill" className="absolute inset-0 -z-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                  )}
                  <span className="relative">{f}</span>
                </button>
              );
            })}
          </div>

          <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((p) => (
                <motion.li
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <PlaylistCard p={p} large headingLevel="h2" />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>

        <Reveal className="mt-20 md:mt-28">
          <section aria-labelledby="submit-title" className="relative overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface p-7 md:p-14">
            <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(29,185,84,0.2),transparent)] blur-3xl" />
            <div className="relative grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
              <div>
                <h2 id="submit-title" className="h-section">
                  {playlistsPage.submit.title}
                </h2>
                <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-muted">{playlistsPage.submit.body}</p>
                <div className="mt-8">
                  <Button form="track" location="playlists-page" size="lg" arrow>
                    Submit Your Track
                  </Button>
                </div>
              </div>
              <div>
                <ul className="space-y-3">
                  {playlistsPage.submit.trust.map((t) => (
                    <li key={t} className="flex items-center gap-3 text-[0.98rem]">
                      <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-accent" aria-hidden>
                        <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {t}
                    </li>
                  ))}
                </ul>
                <SmartLink href="/planner" className="mt-6 inline-flex min-h-11 items-center gap-1 text-sm text-muted underline decoration-line-strong underline-offset-4 hover:text-ink">
                  Not sure what fits your budget? Try the Campaign Planner →
                </SmartLink>
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
