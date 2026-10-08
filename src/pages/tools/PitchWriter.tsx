import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ToolShell } from "../../components/tools/ToolShell";
import { CopyButton } from "../../components/tools/CopyButton";
import { Button } from "../../components/ui/Button";
import { PITCH_CHAR_LIMIT, sources } from "../../content/tools";
import { track } from "../../lib/analytics";

interface Fields {
  title: string;
  genre: string;
  mood: string;
  instruments: string;
  language: string;
  story: string;
  location: string;
  similar: string;
}

const empty: Fields = { title: "", genre: "", mood: "", instruments: "", language: "", story: "", location: "", similar: "" };

const fieldDefs: { key: keyof Fields; label: string; placeholder: string; long?: boolean; optional?: boolean; wide?: boolean }[] = [
  { key: "title", label: "Song title", placeholder: "e.g. Midnight Drive" },
  { key: "genre", label: "Genre", placeholder: "e.g. Punjabi pop" },
  { key: "mood", label: "Mood", placeholder: "e.g. late-night, bittersweet" },
  { key: "language", label: "Language", placeholder: "e.g. Punjabi" },
  { key: "instruments", label: "Instruments & sound", placeholder: "e.g. tumbi, 808s and a warm Rhodes", wide: true },
  { key: "story", label: "The story behind the song", placeholder: "e.g. writing to a friend who moved abroad", long: true, wide: true },
  { key: "location", label: "Where you're from", placeholder: "e.g. Ludhiana" },
  { key: "similar", label: "For fans of", placeholder: "e.g. similar artists", optional: true },
];

const clean = (s: string) => s.trim().replace(/\s+/g, " ").replace(/[.\s]+$/, "");
const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

/** Fills the template. Template-based only, no AI. */
export function buildPitch(f: Fields): string {
  const title = clean(f.title);
  const genre = clean(f.genre);
  const mood = clean(f.mood);
  const language = clean(f.language);
  const location = clean(f.location);
  const instruments = clean(f.instruments);
  const story = clean(f.story);
  const similar = clean(f.similar);
  const parts: string[] = [];

  const kind = [mood, genre].filter(Boolean).join(" ");
  if (title || kind) {
    const desc = kind || "new";
    const article = /^[aeiou]/i.test(desc) ? "an" : "a";
    let s = title ? `"${title}" is ${article} ${desc} track` : `This is ${article} ${desc} track`;
    if (language) s += ` sung in ${language}`;
    if (location) s += `, from an independent artist based in ${location}`;
    parts.push(s + ".");
  }
  if (instruments) parts.push(`The production is built on ${instruments}.`);
  // "writing to a friend…" → "It's about writing to a friend…"; a full sentence stays as written.
  if (story) parts.push(/^[a-z]/.test(story) ? `It's about ${story}.` : `${cap(story)}.`);
  if (similar) parts.push(`For fans of ${similar}.`);
  return parts.join(" ");
}

export default function PitchWriter() {
  const [f, setF] = useState<Fields>(empty);
  const pitch = buildPitch(f);
  const n = pitch.length;
  const over = n > PITCH_CHAR_LIMIT;
  const near = !over && n > PITCH_CHAR_LIMIT * 0.9;

  const sent = useRef(false);
  useEffect(() => {
    if (sent.current || n < 80) return;
    sent.current = true;
    track("tool_use", { tool: "pitch-writer", action: "draft" });
  }, [n]);

  return (
    <ToolShell
      badge="FREE TOOL · SPOTIFY PITCH WRITER"
      title={
        <>
          Write your Spotify pitch <span className="text-accent">in a minute.</span>
        </>
      }
      sub="Fill in a few short fields. We'll turn them into one clean pitch paragraph for Spotify for Artists, with a live character count."
      sources={[sources.pitching]}
      cta={
        <div className="md:flex md:items-center md:justify-between md:gap-10">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">Pitching to editors? Pitch to us too.</h2>
            <p className="mt-2 max-w-xl text-muted">Every track is personally reviewed for our playlist network. Placement is considered, not guaranteed.</p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button form="track" location="tool-pitch-writer" size="lg" arrow>
              Submit Your Track
            </Button>
          </div>
        </div>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr] lg:gap-8">
        <section aria-label="About your song" className="card grid gap-5 self-start p-6 sm:grid-cols-2 md:p-8">
          {fieldDefs.map((d) => (
            <div key={d.key} className={d.wide ? "sm:col-span-2" : ""}>
              <label htmlFor={`pw-${d.key}`} className="block text-sm font-medium text-muted">
                {d.label} {d.optional && <span className="font-normal">(optional)</span>}
              </label>
              {d.long ? (
                <textarea
                  id={`pw-${d.key}`}
                  rows={3}
                  value={f[d.key]}
                  placeholder={d.placeholder}
                  onChange={(e) => setF({ ...f, [d.key]: e.target.value })}
                  className="mt-2 w-full resize-y rounded-[var(--radius-md)] border border-line-strong bg-surface-2 px-4 py-3 text-ink outline-none placeholder:text-dim focus:border-accent/60"
                />
              ) : (
                <input
                  id={`pw-${d.key}`}
                  type="text"
                  value={f[d.key]}
                  placeholder={d.placeholder}
                  onChange={(e) => setF({ ...f, [d.key]: e.target.value })}
                  className="mt-2 min-h-12 w-full rounded-[var(--radius-md)] border border-line-strong bg-surface-2 px-4 text-ink outline-none placeholder:text-dim focus:border-accent/60"
                />
              )}
            </div>
          ))}
        </section>

        <section aria-label="Your pitch" className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="eyebrow">Your pitch</p>
              <p className={`num text-sm font-semibold ${over ? "text-[#ff7a59]" : near ? "text-gold" : "text-muted"}`} aria-live="polite">
                {n} / {PITCH_CHAR_LIMIT}
              </p>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden>
              <motion.div
                className={`h-full rounded-full ${over ? "bg-[#ff7a59]" : near ? "bg-gold" : "bg-accent"}`}
                animate={{ width: `${Math.min(100, (n / PITCH_CHAR_LIMIT) * 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className={`mt-6 min-h-[9rem] whitespace-pre-wrap text-[1.05rem] leading-relaxed ${pitch ? "text-ink" : "text-muted"}`}>
              {pitch || "Start filling in the fields and your pitch appears here."}
            </p>
            {over && (
              <p className="mt-4 text-sm text-[#ff7a59]">
                That's {n - PITCH_CHAR_LIMIT} characters over the limit. Shorten the story or the instrument list.
              </p>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {pitch && <CopyButton text={pitch} label="Copy" source="pitch-writer" primary />}
              <p className="text-xs text-muted">Limit: {PITCH_CHAR_LIMIT} characters. Check the exact limit in your Spotify for Artists pitch form.</p>
            </div>
          </div>
        </section>
      </div>
    </ToolShell>
  );
}
