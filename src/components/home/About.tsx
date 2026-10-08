import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { founder } from "../../content/founder";
import { Reveal } from "../ui/Reveal";
import { BlurImg } from "../ui/BlurImg";
import { placeholderFor } from "../../lib/placeholder";

/** Renders *text* as italics (used for the album name in a chip). */
function withItalics(s: string) {
  return s.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : <span key={i}>{part}</span>,
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line py-24 md:py-36">
      <div className="container-x grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <div ref={ref} className="relative mx-auto max-w-md lg:sticky lg:top-28">
            <div aria-hidden className="absolute -inset-3 rounded-[calc(var(--radius-xl)+6px)] border border-line md:-inset-4" />
            <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-surface-2">
              <motion.div style={{ y }} className="scale-[1.14]">
                <BlurImg
                  src={founder.photo.large}
                  srcSet={`${founder.photo.small} 480w, ${founder.photo.large} 900w`}
                  sizes="(min-width: 1024px) 28rem, 90vw"
                  placeholder={placeholderFor(founder.photo.large)}
                  alt={founder.photo.alt}
                  width={founder.photo.width}
                  height={founder.photo.height}
                  wrapperClassName="aspect-[4/5]"
                  className="h-full w-full object-cover object-[50%_30%]"
                />
              </motion.div>
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(8,8,8,0.55),transparent_45%)]" />
            </div>
            <p className="absolute -bottom-3 left-6 rounded-full border border-line-strong bg-bg px-4 py-1.5 text-xs font-medium tracking-wide text-muted md:-bottom-4">
              Founder · Delhi
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-6 bg-accent" />
              {founder.eyebrow}
            </p>
            <h2 id="about-title" className="h-section mt-5">
              {founder.title}
            </h2>
          </Reveal>
          <div className="mt-10 space-y-6 text-[1.0625rem] leading-[1.75] text-ink/85 md:text-lg">
            {founder.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-pretty">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-10 font-display text-sm font-semibold tracking-[0.14em] text-ink">{founder.signature}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {founder.chips.map((c) => (
                <li key={c} className="rounded-full border border-line-strong bg-white/[0.03] px-4 py-2 text-sm text-ink/85">
                  {withItalics(c)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
