import { useRef, type ReactNode, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { SmartLink } from "./SmartLink";
import { site } from "../../content/site";
import { trackFormClick, type FormKind } from "../../lib/analytics";
import { useFinePointer } from "../../lib/useMedia";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface Props {
  children: ReactNode;
  /** Route, URL or mailto. Ignored when `form` is set. */
  href?: string;
  /** Opens one of the Google Forms in a new tab and records the click. */
  form?: FormKind;
  /** Where on the site this button sits (for analytics). */
  location?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  className?: string;
  arrow?: boolean;
  type?: "button" | "submit";
  ariaLabel?: string;
}

const base =
  "group relative inline-flex min-h-11 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[background-color,color,border-color,box-shadow] duration-300 ease-[var(--ease-brand)]";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-[#04110a] shadow-[0_0_0_0_rgba(29,185,84,0)] hover:shadow-[0_10px_40px_-8px_rgba(29,185,84,0.65)] hover:bg-[#21cc5d]",
  secondary: "border border-line-strong bg-white/[0.03] text-ink hover:border-white/25 hover:bg-white/[0.07]",
  ghost: "text-ink hover:text-accent",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

export function Button({
  children,
  href,
  form,
  location = "unknown",
  onClick,
  variant = "primary",
  size = "md",
  magnetic,
  className = "",
  arrow,
  type = "button",
  ariaLabel,
}: Props) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const isMagnetic = (magnetic ?? variant === "primary") && fine && !reduce;
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: PointerEvent) => {
    if (!isMagnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const target = form ? (form === "onboarding" ? site.onboardingForm : site.trackSubmitForm) : href;
  const handleClick = () => {
    if (form) trackFormClick(form, location);
    onClick?.();
  };

  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span aria-hidden className="transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-0.5">
          →
        </span>
      )}
    </>
  );

  const inner = target ? (
    <SmartLink href={target} className={cls} onClick={handleClick} aria-label={ariaLabel}>
      {content}
    </SmartLink>
  ) : (
    <button type={type} className={cls} onClick={handleClick} aria-label={ariaLabel}>
      {content}
    </button>
  );

  if (!isMagnetic) return inner;
  return (
    <motion.span ref={ref} className="inline-flex" style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={onLeave}>
      {inner}
    </motion.span>
  );
}
