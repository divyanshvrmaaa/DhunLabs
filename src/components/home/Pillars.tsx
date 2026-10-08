import { pillars, pillarsIntro, type Pillar } from "../../content/pillars";
import { playlists } from "../../content/playlists";
import { videos } from "../../content/videos";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { SmartLink } from "../ui/SmartLink";
import { phStyle } from "../../lib/placeholder";

const tone: Record<Pillar["id"], { text: string; glow: string; ring: string }> = {
  meta: { text: "text-accent", glow: "rgba(29,185,84,0.20)", ring: "group-hover:border-accent/40" },
  spotify: { text: "text-violet", glow: "rgba(155,110,255,0.20)", ring: "group-hover:border-violet/40" },
  youtube: { text: "text-gold", glow: "rgba(245,200,66,0.16)", ring: "group-hover:border-gold/40" },
};

function PillarCard({ p, big }: { p: Pillar; big?: boolean }) {
  const t = tone[p.id];
  return (
    <article
      className={`group card relative flex h-full flex-col overflow-hidden p-6 transition-colors duration-500 md:p-8 ${t.ring}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(closest-side, ${t.glow}, transparent)` }}
      />
      <div className="relative flex items-center justify-between">
        <span className="num text-sm text-muted">{p.number}</span>
        <span className={`eyebrow ${t.text}`}>{p.title}</span>
      </div>

      <h3 className={`relative mt-6 font-heading font-semibold tracking-tight ${big ? "text-3xl md:text-[2.6rem] md:leading-[1.05]" : "text-2xl md:text-[1.75rem] md:leading-tight"}`}>
        {p.subtitle}
      </h3>
      <p className="relative mt-4 max-w-xl text-pretty leading-relaxed text-muted">{p.body}</p>

      {p.id === "meta" && big && (
        <ol className="relative mt-10 hidden gap-2 sm:grid sm:grid-cols-4" aria-label="How a campaign flows">
          {["Your track's hook", "Targeted Meta ad", "Tracked visit", "Save & replay"].map((step, i) => (
            <li key={step} className="relative rounded-xl border border-line bg-white/[0.02] p-4 transition-colors duration-500 group-hover:border-accent/25">
              <span className="num text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-3 text-sm font-medium leading-snug">{step}</p>
              {i < 3 && (
                <span aria-hidden className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 text-xs text-accent">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      )}
      {p.id === "spotify" && (
        <div className="relative mt-6 flex -space-x-3" aria-hidden>
          {playlists.map((pl) =>
            pl.cover ? (
              <img
                key={pl.id}
                src={pl.cover}
                alt=""
                width={56}
                height={56}
                loading="lazy"
                className="h-14 w-14 rounded-lg border-2 border-surface object-cover shadow-lg transition-transform duration-500 group-hover:-translate-y-1"
                style={phStyle(pl.cover)}
              />
            ) : null,
          )}
        </div>
      )}
      {p.id === "youtube" && (
        <div className="relative mt-6 grid grid-cols-2 gap-2" aria-hidden>
          {videos.slice(0, 2).map((v) => (
            <img
              key={v.id}
              src={`/thumbs/${v.id}.webp`}
              alt=""
              width={320}
              height={180}
              loading="lazy"
              className="aspect-video w-full rounded-md border border-line object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
              style={phStyle(`/thumbs/${v.id}.webp`)}
            />
          ))}
        </div>
      )}

      <div className={`relative mt-auto flex flex-wrap items-end justify-between gap-4 ${big ? "pt-12" : "pt-8"}`}>
        <div>
          <p className={`num font-semibold leading-none ${big ? "text-[clamp(4rem,10vw,7.5rem)]" : "text-5xl"} ${t.text}`}>{p.metric}</p>
          <p className="mt-2 text-sm text-muted">{p.metricLabel}</p>
        </div>
        <SmartLink
          href={p.cta.href}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:border-white/30 hover:bg-white/5"
        >
          {p.cta.label} <span aria-hidden>→</span>
        </SmartLink>
      </div>
    </article>
  );
}

export function Pillars() {
  const [meta, spotify, youtube] = pillars;
  return (
    <section id="services" aria-labelledby="services-title" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHeader id="services-title" eyebrow={pillarsIntro.eyebrow} title={pillarsIntro.title} body={pillarsIntro.body} />
        <div className="mt-14 grid gap-4 md:mt-20 md:gap-5 lg:grid-cols-5 lg:grid-rows-2">
          <Reveal className="lg:col-span-3 lg:row-span-2">
            <PillarCard p={meta} big />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-2">
            <PillarCard p={spotify} />
          </Reveal>
          <Reveal delay={0.16} className="lg:col-span-2">
            <PillarCard p={youtube} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
