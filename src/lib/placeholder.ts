import { placeholders } from "../content/placeholders";

/** Blurred preview for an image path ("/covers/x.webp" → "cover:x", "/thumbs/id.webp" → "thumb:id"). */
export function placeholderFor(src: string | null | undefined): string | undefined {
  if (!src) return undefined;
  const name = src.split("/").pop()!.replace(/\.\w+$/, "");
  if (src.startsWith("/covers/")) return placeholders[`cover:${name}`];
  if (src.startsWith("/thumbs/")) return placeholders[`thumb:${name}`];
  if (src.includes("divyansh-portrait")) return placeholders.portrait;
  return undefined;
}

export const phStyle = (src: string | null | undefined) => {
  const ph = placeholderFor(src);
  return ph ? { backgroundImage: `url(${ph})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined;
};
