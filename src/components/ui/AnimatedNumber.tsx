import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface Props {
  value: number;
  format: (n: number) => string;
  /** Count up from 0 the first time it scrolls into view. */
  countUpOnView?: boolean;
  duration?: number;
  className?: string;
}

/** A number that tweens smoothly whenever its value changes. */
export function AnimatedNumber({ value, format, countUpOnView, duration = 0.6, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const current = useRef(countUpOnView ? 0 : value);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (countUpOnView && !inView) {
      el.textContent = format(0);
      return;
    }
    if (reduce) {
      current.current = value;
      el.textContent = format(value);
      return;
    }
    const controls = animate(current.current, value, {
      duration: countUpOnView && current.current === 0 ? 1.8 : duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        current.current = v;
        el.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [value, inView, countUpOnView, reduce, duration, format]);

  return (
    <span ref={ref} className={className}>
      {format(countUpOnView ? 0 : value)}
    </span>
  );
}
