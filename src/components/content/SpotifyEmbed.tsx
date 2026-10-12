import { useEffect, useRef, useState } from "react";

/** Spotify playlist player that only loads when it's about to scroll into view. */
export function SpotifyEmbed({ id, name }: { id: string; name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (load || !ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [load]);
  return (
    <div ref={ref} className="h-[352px] overflow-hidden rounded-xl border border-line bg-surface-2">
      {load ? (
        <iframe
          title={`Spotify player: ${name}`}
          src={`https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=0`}
          className="h-[352px] w-full border-0"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-muted" aria-hidden>
          Loading the Spotify player…
        </div>
      )}
    </div>
  );
}
