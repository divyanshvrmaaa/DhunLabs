import { useState, type CSSProperties } from "react";
import { followersAsOf, type Playlist } from "../content/playlists";
import { formatNumber } from "../lib/format";
import { placeholderFor } from "../lib/placeholder";
import { BlurImg } from "./ui/BlurImg";
import { SmartLink } from "./ui/SmartLink";
import { track } from "../lib/analytics";

interface Props {
  p: Playlist;
  /** Large version for /playlists, with a click-to-load Spotify player. */
  large?: boolean;
  headingLevel?: "h2" | "h3";
}

function Cover({ p, className = "" }: { p: Playlist; className?: string }) {
  if (p.cover) {
    return (
      <BlurImg
        src={p.cover}
        placeholder={placeholderFor(p.cover)}
        alt={`Cover of the playlist ${p.name}`}
        width={300}
        height={300}
        wrapperClassName={`aspect-square ${className}`}
        className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.04]"
      />
    );
  }
  return (
    <span
      className={`flex aspect-square items-center justify-center text-6xl ${className}`}
      style={{ background: `radial-gradient(circle at 30% 20%, ${p.glow}, transparent 70%), #161616` }}
      aria-hidden
    >
      {p.emoji}
    </span>
  );
}

export function PlaylistCard({ p, large, headingLevel = "h3" }: Props) {
  const H = headingLevel;
  const [player, setPlayer] = useState(false);
  const style = { "--glow": p.glow } as CSSProperties;

  return (
    <article
      style={style}
      className="group card relative flex h-full flex-col overflow-hidden p-3 transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-[0_20px_80px_-20px_var(--glow)]"
    >
      <div className="relative overflow-hidden rounded-[var(--radius-md)]">
        <Cover p={p} />
        <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-lg backdrop-blur-md" aria-hidden>
          {p.emoji}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <H className={`font-heading font-semibold leading-tight tracking-tight ${large ? "text-2xl" : "text-xl"}`}>{p.name}</H>
        <p className="mt-2 text-sm leading-relaxed text-muted">{p.vibe}</p>
        <p className="mt-5 flex items-baseline gap-2">
          <span className="num text-2xl font-semibold">{formatNumber(p.followers)}</span>
          <span className="text-xs text-muted">followers · {followersAsOf}</span>
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          <SmartLink
            href={p.url}
            onClick={() => track("playlist_open", { playlist: p.name })}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-bg transition-colors hover:bg-accent"
          >
            <SpotifyIcon /> {large ? "Explore Playlist" : "Open on Spotify"}
          </SmartLink>
          {large && !player && (
            <button
              type="button"
              onClick={() => {
                setPlayer(true);
                track("playlist_player", { playlist: p.name });
              }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:border-white/30"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
              Preview here
            </button>
          )}
        </div>
        {large && player && (
          <iframe
            title={`Spotify player: ${p.name}`}
            src={`https://open.spotify.com/embed/playlist/${p.id}?utm_source=generator&theme=0`}
            className="mt-4 h-[352px] w-full rounded-xl border-0"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        )}
      </div>
    </article>
  );
}

export function SpotifyIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.5 17.3a.75.75 0 0 1-1 .25c-2.86-1.75-6.46-2.14-10.7-1.17a.75.75 0 1 1-.33-1.46c4.64-1.06 8.62-.6 11.8 1.35.36.22.47.68.25 1.03Zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.27-2.01-8.26-2.6-12.13-1.42a.94.94 0 1 1-.55-1.8c4.42-1.34 9.92-.69 13.66 1.62.44.27.58.85.31 1.29Zm.13-3.4C15.18 8.3 8.71 8.08 4.96 9.22a1.13 1.13 0 1 1-.65-2.16c4.3-1.3 11.45-1.05 15.97 1.63a1.13 1.13 0 0 1-1.18 1.94Z"
      />
    </svg>
  );
}
