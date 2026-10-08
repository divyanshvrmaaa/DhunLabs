import { networkIntro, playlists } from "../../content/playlists";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { PlaylistCard } from "../PlaylistCard";

export function Network() {
  return (
    <section id="network" aria-labelledby="network-title" className="border-t border-line py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader id="network-title" eyebrow={networkIntro.eyebrow} title={networkIntro.title} body={networkIntro.body} />
          <Reveal className="shrink-0">
            <Button href="/playlists" variant="secondary" size="lg" arrow>
              Explore Playlists
            </Button>
          </Reveal>
        </div>
        <div
          className="-mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 md:mt-20 lg:grid-cols-4 lg:gap-5 [&::-webkit-scrollbar]:hidden"
          aria-label="Our playlists"
        >
          {playlists.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <PlaylistCard p={p} />
            </Reveal>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted sm:hidden" aria-hidden>
          Swipe to see all four →
        </p>
      </div>
    </section>
  );
}
