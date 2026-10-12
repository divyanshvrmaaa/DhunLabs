import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Breadcrumbs } from "./Breadcrumbs";

interface Props {
  badge: string;
  title: ReactNode;
  /** A short, catchy line shown right under the title (the title itself holds the search phrase). */
  kicker?: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
}

/** Top of every inner page: breadcrumbs, badge, big title, optional kicker, one-line sub. */
export function PageHeader({ badge, title, kicker, sub, children, compact }: Props) {
  const anim = (d: number) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] as const } });
  return (
    <header className={`relative overflow-hidden ${compact ? "pt-24 pb-7 md:pt-32 md:pb-12" : "pt-28 pb-12 md:pt-40 md:pb-20"}`}>
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(29,185,84,0.14),transparent)] blur-3xl" />
      <div className="container-x relative">
        <Breadcrumbs className="mb-5 md:mb-7" />
        <motion.p {...anim(0)} className="eyebrow flex items-center gap-3">
          <span aria-hidden className="h-px w-6 bg-accent" />
          {badge}
        </motion.p>
        {/* Title and sub render immediately (no fade) so they paint as soon as the page arrives */}
        <h1 className={`h-display mt-5 max-w-5xl text-balance ${compact ? "text-[clamp(2.25rem,7vw,5rem)]" : "text-[clamp(2.75rem,8.5vw,6.5rem)]"}`}>{title}</h1>
        {kicker && <p className="mt-4 max-w-3xl font-heading text-[clamp(1.35rem,3.4vw,2.1rem)] font-semibold leading-tight tracking-tight text-ink/90 md:mt-5">{kicker}</p>}
        {sub && (
          <p className="mt-4 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-muted md:mt-5 md:text-lg">{sub}</p>
        )}
        {children}
      </div>
    </header>
  );
}
