import { Children, isValidElement, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Breadcrumbs } from "./Breadcrumbs";

interface Props {
  badge: string;
  /** The H1. Pass `lines` instead to choose exactly where it breaks. */
  title?: ReactNode;
  /** The H1 as two (or more) fixed lines; the last line can be green. */
  lines?: string[];
  accentLast?: boolean;
  /** A short, catchy line shown right under the title (the title itself holds the search phrase). */
  kicker?: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
}

/** Plain text of a title, to size it. */
function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return Children.toArray(node.props.children).map(textOf).join("");
  return "";
}

/**
 * Title size: long titles shrink so they take at most about two lines on a laptop,
 * instead of stacking into four. Short titles keep the big display size.
 */
function titleSize(lineChars: number, totalChars: number, compact?: boolean) {
  const perChar = 0.6; // width of a Syne character in ems, with a safety margin (measured 0.50–0.53)
  const maxRem = compact ? 5 : 6.5;
  const capRem = Math.min(maxRem, 1120 / (lineChars * perChar) / 16);
  const vw = 86 / (lineChars * perChar);
  // Phones: very long titles get a slightly smaller minimum so they don't stack 5–6 lines deep
  const minRem = totalChars > 50 ? 1.75 : totalChars > 30 ? 2 : 2.25;
  return `clamp(${minRem}rem, ${vw.toFixed(2)}vw, ${capRem.toFixed(2)}rem)`;
}

/** Top of every inner page: breadcrumbs, badge, big title, optional kicker, one-line sub. */
export function PageHeader({ badge, title, lines, accentLast, kicker, sub, children, compact }: Props) {
  const anim = (d: number) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] as const } });
  const total = lines ? lines.join(" ").length : textOf(title).length;
  const len = lines ? Math.max(...lines.map((l) => l.length)) : total <= 18 ? total : Math.ceil(total / 2) + 2;
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
        <h1 className="h-display mt-5 max-w-6xl text-balance" style={{ fontSize: titleSize(Math.max(len, 8), total, compact) }}>
          {lines
            ? lines.map((l, i) => (
                <span key={l} className={`block ${accentLast && i === lines.length - 1 ? "text-accent" : ""}`}>
                  {l}
                  {i < lines.length - 1 ? " " : ""}
                </span>
              ))
            : title}
        </h1>
        {kicker && <p className="mt-4 max-w-3xl font-heading text-[clamp(1.35rem,3.4vw,2.1rem)] font-semibold leading-tight tracking-tight text-ink/90 md:mt-5">{kicker}</p>}
        {sub && (
          <p className="mt-4 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-muted md:mt-5 md:text-lg">{sub}</p>
        )}
        {children}
      </div>
    </header>
  );
}
