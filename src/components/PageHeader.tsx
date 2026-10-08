import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  badge: string;
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
}

/** Top of every inner page: badge, big title, one-line sub. */
export function PageHeader({ badge, title, sub, children, compact }: Props) {
  const anim = (d: number) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] as const } });
  return (
    <header className={`relative overflow-hidden ${compact ? "pt-24 pb-7 md:pt-36 md:pb-12" : "pt-32 pb-12 md:pt-44 md:pb-20"}`}>
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(29,185,84,0.14),transparent)] blur-3xl" />
      <div className="container-x relative">
        <motion.p {...anim(0)} className="eyebrow flex items-center gap-3">
          <span aria-hidden className="h-px w-6 bg-accent" />
          {badge}
        </motion.p>
        {/* Title and sub render immediately (no fade) so they paint as soon as the page arrives */}
        <h1 className={`h-display mt-5 max-w-5xl text-balance ${compact ? "text-[clamp(2.25rem,7vw,5rem)]" : "text-[clamp(2.75rem,8.5vw,6.5rem)]"}`}>{title}</h1>
        {sub && (
          <p className="mt-4 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-muted md:mt-6 md:text-lg">{sub}</p>
        )}
        {children}
      </div>
    </header>
  );
}
