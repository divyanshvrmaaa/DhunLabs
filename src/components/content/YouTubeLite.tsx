import { useState } from "react";
import { BlurImg } from "../ui/BlurImg";
import { placeholderFor } from "../../lib/placeholder";
import { track } from "../../lib/analytics";

/**
 * A fast YouTube embed: shows the thumbnail first and loads the real (privacy-enhanced)
 * player only when someone clicks play, so pages stay light.
 */
export function YouTubeLite({ id, title, className = "" }: { id: string; title: string; className?: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className={`relative overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface-2 ${className}`}>
      {play ? (
        <iframe
          className="aspect-video w-full border-0"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setPlay(true);
            track("video_play", { video: id });
          }}
          className="group relative block w-full text-left"
        >
          <BlurImg
            src={`/thumbs/${id}.webp`}
            placeholder={placeholderFor(`/thumbs/${id}.webp`)}
            alt=""
            width={640}
            height={360}
            wrapperClassName="aspect-video"
            className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/10">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ff0033] text-white shadow-2xl transition-transform duration-500 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" aria-hidden>
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </span>
          </span>
          <span className="sr-only">Play video: {title}</span>
        </button>
      )}
    </div>
  );
}
