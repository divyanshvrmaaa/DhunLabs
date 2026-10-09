import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { SmartLink } from "../ui/SmartLink";
import { Waveform } from "./Waveform";

const headline: { word: string; accent?: boolean }[] = [
  { word: "We" },
  { word: "Make" },
  { word: "Streams", accent: true },
  { word: "Hit" },
  { word: "Different." },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  // Always pass the animation props (the pre-rendered HTML starts hidden); MotionConfig turns movement into a fade for reduced motion.
  const rise = (delay: number) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } });

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[88px]">
      {/* Soft glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[58%] h-[46vh] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(29,185,84,0.22),transparent)] blur-2xl" />
        <div className="absolute right-[6%] top-[62%] h-[30vh] w-[40vw] rounded-full bg-[radial-gradient(closest-side,rgba(76,141,255,0.16),transparent)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_70%,#080808)]" />
      </div>

      <div className="container-x relative z-10 flex flex-1 flex-col justify-center pb-6 pt-8 md:pt-14">
        <motion.p {...rise(0.05)} className="eyebrow inline-flex items-center gap-2.5 text-[0.7rem] sm:text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Delhi, India · Music Growth Agency
        </motion.p>

        <h1 id="hero-title" className="h-display mt-6 text-[clamp(3.1rem,min(11vw,13.5vh),9.25rem)] md:mt-8">
          <span className="sr-only">We Make Streams Hit Different.</span>
          <span aria-hidden className="flex flex-wrap gap-x-[0.22em]">
            {headline.map((w, i) => (
              <span key={w.word} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <motion.span
                  className={`inline-block ${w.accent ? "text-accent" : ""}`}
                  initial={{ y: "105%", rotate: 4 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ duration: 1.1, delay: 0.12 + i * 0.07, ease }}
                >
                  {w.word}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-8 grid gap-8 md:mt-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <p className="max-w-xl text-pretty text-[1.0625rem] leading-relaxed text-muted md:text-lg">
            DhunLabs grows independent artists with Meta ads built around your song&apos;s hook and a bot-free Spotify playlist network,
            tracked at every step. You get real listeners who save, replay and get the algorithm working for you.
          </p>

          <motion.div {...rise(0.45)} className="flex flex-col gap-4 lg:items-end">
            <div className="flex flex-wrap gap-3">
              <Button form="onboarding" location="hero" size="lg" arrow>
                Book a Strategy Audit
              </Button>
              <Button href="/#work" variant="secondary" size="lg">
                See Case Studies
              </Button>
            </div>
            <SmartLink
              href="/planner"
              className="group inline-flex min-h-11 items-center gap-1.5 text-[0.95rem] text-muted transition-colors hover:text-ink"
            >
              <span className="underline decoration-line-strong underline-offset-4 group-hover:decoration-accent">
                Plan your campaign in 30 seconds
              </span>
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </SmartLink>
          </motion.div>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="relative h-[20vh] min-h-[120px] max-h-[240px] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4 }}
      >
        <Waveform />
      </motion.div>
    </section>
  );
}
