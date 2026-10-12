// Draws a shareable result card (PNG) in the browser with <canvas>.
// Nothing is uploaded anywhere: the image is made on the visitor's device.

export type CardSize = "story" | "post";
export const CARD_SIZES: Record<CardSize, { w: number; h: number; label: string }> = {
  story: { w: 1080, h: 1920, label: "Story 9:16" },
  post: { w: 1080, h: 1080, label: "Post 1:1" },
};

export interface CardSpec {
  /** Tool name, shown small at the top ("STREAMING REVENUE CALCULATOR"). */
  tool: string;
  /** Small line above the big number ("10,000 streams ≈"). */
  lead: string;
  /** The big result ("₹1,000"). */
  big: string;
  /** Line under the big number, in green ("estimated take-home"). */
  tail?: string;
  /** 2–3 key inputs. */
  inputs: [string, string][];
  /** Tool address without https:// ("dhunlabs.studio/planner"). */
  url: string;
}

const C = {
  bg: "#080808",
  ink: "#f2efe9",
  muted: "#8a8680",
  line: "rgba(255,255,255,0.12)",
  accent: "#1db954",
  meta: "#4c8dff",
};

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="120 140 320 260"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6DF051"/><stop offset="100%" stop-color="#0C8E28"/></linearGradient><linearGradient id="d" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4BCC32"/><stop offset="100%" stop-color="#086C1D"/></linearGradient></defs><g fill="url(#g)"><rect x="135" y="241" width="12" height="30" rx="6"/><rect x="160" y="231" width="12" height="50" rx="6"/><rect x="185" y="211" width="12" height="90" rx="6"/><rect x="275" y="211" width="12" height="90" rx="6"/><rect x="300" y="226" width="12" height="60" rx="6"/><rect x="325" y="241" width="12" height="30" rx="6"/></g><path d="M 245 155 C 365 155, 420 210, 420 270 C 420 330, 365 385, 245 385 C 310 385, 355 340, 355 270 C 355 200, 320 185, 245 185 Z" fill="url(#g)"/><polygon points="215,155 258,155 258,345 234,345 234,175" fill="url(#d)"/><ellipse cx="212" cy="345" rx="38" ry="28" transform="rotate(-25 212 345)" fill="url(#g)"/></svg>`;

let logoPromise: Promise<HTMLImageElement> | null = null;
function loadLogo(): Promise<HTMLImageElement> {
  logoPromise ??= new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(LOGO_SVG)}`;
  });
  return logoPromise;
}

/** Wait for the site fonts so the card uses them (not a fallback). */
async function loadFonts() {
  if (!("fonts" in document)) return;
  await Promise.all([
    document.fonts.load('700 100px "Syne"'),
    document.fonts.load('600 100px "Clash Display"'),
    document.fonts.load('500 40px "DM Sans"', "₹0123456789"),
    document.fonts.load('600 40px "DM Sans"'),
  ]).catch(() => undefined);
}

const font = (weight: number, size: number, family: string) => `${weight} ${size}px ${family}`;
const CLASH = '"Clash Display", "Syne", system-ui, sans-serif';
const SYNE = '"Syne", system-ui, sans-serif';
const SANS = '"DM Sans", system-ui, sans-serif';

/** Largest font size (≤ max) at which the text fits the width. */
function fit(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, max: number, weight: number, family: string, min = 40) {
  let size = max;
  ctx.font = font(weight, size, family);
  while (size > min && ctx.measureText(text).width > maxWidth) {
    size -= 4;
    ctx.font = font(weight, size, family);
  }
  return size;
}

/** Wraps text into lines that fit the width. */
function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

function glow(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
}

/** Draws the card and returns the canvas. */
export async function drawCard(spec: CardSpec, size: CardSize): Promise<HTMLCanvasElement> {
  await loadFonts();
  const logo = await loadLogo().catch(() => null);
  const { w, h } = CARD_SIZES[size];
  const story = size === "story";
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const pad = 88;
  const inner = w - pad * 2;

  // Background
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, w, h);
  glow(ctx, w * 0.15, h * 0.12, w * 0.9, "rgba(29,185,84,0.22)");
  glow(ctx, w * 0.95, h * 0.95, w * 0.7, "rgba(76,141,255,0.14)");
  ctx.strokeStyle = C.line;
  ctx.lineWidth = 2;
  ctx.strokeRect(36, 36, w - 72, h - 72);

  // Wordmark
  const y = story ? 170 : 130;
  if (logo) ctx.drawImage(logo, pad, y - 58, 84, 68);
  ctx.fillStyle = C.ink;
  ctx.font = font(700, 58, SYNE);
  ctx.textBaseline = "alphabetic";
  ctx.fillText("DhunLabs", pad + (logo ? 100 : 0), y);

  // Body: measured first, then drawn. On a Story it is centred in the safe middle area.
  const drawBody = (top: number, draw: boolean): number => {
    let y = top;
    const text = (t: string, x: number, yy: number) => draw && ctx.fillText(t, x, yy);

    // Tool name
    ctx.fillStyle = C.accent;
    if (draw) ctx.fillRect(pad, y - 14, 48, 4);
    ctx.fillStyle = C.muted;
    ctx.font = font(600, 30, SANS);
    ctx.letterSpacing = "6px";
    text(spec.tool.toUpperCase(), pad + 70, y);
    ctx.letterSpacing = "0px";

    // Lead line
    y += story ? 110 : 90;
    ctx.fillStyle = C.ink;
    ctx.font = font(600, story ? 60 : 50, CLASH);
    for (const l of wrap(ctx, spec.lead, inner)) {
      text(l, pad, y);
      y += story ? 74 : 62;
    }

    // Big result
    const bigSize = fit(ctx, spec.big, inner, story ? 210 : 168, 600, CLASH);
    y += bigSize * 0.86;
    ctx.fillStyle = C.ink;
    text(spec.big, pad, y);

    // Tail
    if (spec.tail) {
      y += story ? 86 : 70;
      ctx.fillStyle = C.accent;
      ctx.font = font(600, story ? 54 : 44, CLASH);
      const lines = wrap(ctx, spec.tail, inner);
      lines.forEach((l, i) => {
        text(l, pad, y);
        if (i < lines.length - 1) y += story ? 64 : 54;
      });
    }

    // Inputs
    y += story ? 140 : 100;
    if (draw) {
      ctx.strokeStyle = C.line;
      ctx.beginPath();
      ctx.moveTo(pad, y - 62);
      ctx.lineTo(w - pad, y - 62);
      ctx.stroke();
    }
    const rows = spec.inputs.slice(0, 3);
    const rowH = story ? 96 : 64;
    rows.forEach(([label, value], i) => {
      ctx.fillStyle = C.muted;
      ctx.font = font(500, story ? 38 : 30, SANS);
      text(label, pad, y);
      ctx.fillStyle = C.ink;
      const vs = fit(ctx, value, inner * 0.55, story ? 42 : 34, 600, SANS, 22);
      ctx.font = font(600, vs, SANS);
      ctx.textAlign = "right";
      text(value, w - pad, y);
      ctx.textAlign = "left";
      if (i < rows.length - 1) y += rowH;
    });
    return y;
  };

  const headerBottom = story ? 330 : 210;
  const footerTop = h - (story ? 330 : 190);
  const height = drawBody(0, false);
  const top = story ? headerBottom + Math.max(0, (footerTop - headerBottom - height) / 2) : headerBottom;
  drawBody(top, true);

  // Footer: URL + disclaimer
  const footY = h - (story ? 170 : 120);
  ctx.fillStyle = C.ink;
  fit(ctx, spec.url, inner, 40, 600, SANS, 26);
  ctx.fillText(spec.url, pad, footY);
  ctx.fillStyle = C.muted;
  ctx.font = font(500, 30, SANS);
  ctx.fillText("Estimate. Results vary.", pad, footY + 52);
  return canvas;
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/png"));
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}
