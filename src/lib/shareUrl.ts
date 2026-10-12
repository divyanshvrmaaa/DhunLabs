// Shareable result links: the visitor's inputs go in the URL so whoever opens the
// link sees the same result. UTM tags are added ONLY to links people share.
// The page's canonical tag always stays the clean URL (see components/ui/Seo.tsx).
import { useEffect, useRef } from "react";
import { site } from "../content/site";

export type ParamValue = string | number | null | undefined;

/** Clean link with the inputs, e.g. https://dhunlabs.studio/planner?budget=10000 */
export function resultUrl(path: string, params: Record<string, ParamValue>): string {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== null && v !== undefined && v !== "") q.set(k, String(v));
  const s = q.toString();
  return `${site.siteUrl}${path}${s ? `?${s}` : ""}`;
}

/** The link people share: inputs + utm_source=share&utm_medium=result_card&utm_campaign=<tool>. */
export function shareUrl(path: string, params: Record<string, ParamValue>, campaign: string): string {
  return resultUrl(path, { ...params, utm_source: "share", utm_medium: "result_card", utm_campaign: campaign });
}

/** Number from the URL, clamped to [min, max]; undefined if missing or not a number. */
export function numParam(q: URLSearchParams, key: string, min: number, max: number): number | undefined {
  const raw = q.get(key);
  if (raw === null || raw.trim() === "") return undefined;
  const n = Number(raw.replace(/[^\d.]/g, ""));
  if (!Number.isFinite(n)) return undefined;
  return Math.min(max, Math.max(min, Math.round(n)));
}

/** Runs once after the page loads, if the URL has inputs (so shared links open pre-filled). */
export function useUrlInputs(apply: (q: URLSearchParams) => void) {
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    const q = new URLSearchParams(window.location.search);
    if ([...q.keys()].some((k) => !k.startsWith("utm_"))) apply(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
