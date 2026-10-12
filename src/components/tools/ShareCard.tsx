import { useEffect, useRef, useState } from "react";
import { CARD_SIZES, canvasToBlob, downloadBlob, drawCard, type CardSize, type CardSpec } from "../../lib/shareCard";

interface Props {
  spec: CardSpec;
  /** Link included when sharing (with the visitor's inputs and UTM tags). */
  link: string;
  /** Short text that goes with the image when sharing. */
  text: string;
  /** File name without extension, e.g. "dhunlabs-planner". */
  fileName: string;
}

/**
 * "Save your result as an image": Story (1080×1920) or Post (1080×1080).
 * Drawn on the visitor's device. On phones "Share" opens the share sheet with the
 * image attached; where that isn't supported it downloads the image instead.
 */
export function ShareCard({ spec, link, text, fileName }: Props) {
  const [size, setSize] = useState<CardSize>("story");
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const key = JSON.stringify(spec) + size;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Only draw the preview once this box is near the screen
  useEffect(() => {
    if (!ref.current || visible) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { rootMargin: "300px 0px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    let url: string | null = null;
    const t = window.setTimeout(async () => {
      try {
        const canvas = await drawCard(spec, size);
        const blob = await canvasToBlob(canvas);
        if (cancelled) return;
        url = URL.createObjectURL(blob);
        setPreview(url);
      } catch {
        /* preview is optional */
      }
    }, 350);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
      if (url) URL.revokeObjectURL(url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, visible]);

  const make = async () => {
    const canvas = await drawCard(spec, size);
    const blob = await canvasToBlob(canvas);
    return { blob, name: `${fileName}-${size}.png` };
  };

  const onDownload = async () => {
    setBusy(true);
    try {
      const { blob, name } = await make();
      downloadBlob(blob, name);
      setNote("Image saved.");
    } finally {
      setBusy(false);
    }
  };

  const onShare = async () => {
    setBusy(true);
    try {
      const { blob, name } = await make();
      const file = new File([blob], name, { type: "image/png" });
      const data: ShareData = { files: [file], title: "DhunLabs", text: `${text}\n${link}` };
      if (navigator.canShare?.(data)) {
        try {
          await navigator.share(data);
          setNote("");
        } catch (e) {
          if ((e as DOMException).name !== "AbortError") {
            downloadBlob(blob, name);
            setNote("Sharing isn't available here, so the image was saved instead.");
          }
        }
      } else {
        downloadBlob(blob, name);
        setNote("Sharing images isn't supported in this browser, so the image was saved instead.");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div ref={ref} className="rounded-[var(--radius-md)] border border-line bg-surface-2 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold">Save your result as an image</p>
        <div role="radiogroup" aria-label="Image size" className="inline-grid grid-flow-col rounded-full border border-line bg-surface p-1">
          {(Object.keys(CARD_SIZES) as CardSize[]).map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={size === s}
              onClick={() => setSize(s)}
              className={`min-h-9 rounded-full px-3 text-xs font-semibold transition-colors ${size === s ? "bg-ink text-bg" : "text-muted hover:text-ink"}`}
            >
              {CARD_SIZES[s].label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-start gap-4">
        <div className={`shrink-0 overflow-hidden rounded-lg border border-line bg-bg ${size === "story" ? "aspect-[9/16] w-24" : "aspect-square w-28"}`}>
          {preview ? <img src={preview} alt="Preview of your result card" className="h-full w-full object-cover" /> : <span className="block h-full w-full animate-pulse bg-white/[0.04]" aria-hidden />}
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <button
            type="button"
            onClick={onDownload}
            disabled={busy}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:border-white/30 hover:bg-white/5 disabled:opacity-60"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download image
          </button>
          <button
            type="button"
            onClick={onShare}
            disabled={busy}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-bg transition-colors hover:bg-accent disabled:opacity-60"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M12 15V4m0 0L8 8m4-4 4 4M6 12v7h12v-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Share
          </button>
          <p className="text-xs text-muted" aria-live="polite">
            {note || "Made on your device. Nothing is uploaded."}
          </p>
        </div>
      </div>
    </div>
  );
}
