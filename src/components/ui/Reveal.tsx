import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}

/**
 * Fade-and-rise once when scrolled into view.
 * Reduced-motion visitors get a plain fade: <MotionConfig reducedMotion="user"> in App.tsx
 * switches off the movement. (Don't branch on reduced motion here: the pre-rendered HTML
 * starts hidden, and only the animation reveals it.)
 */
export function Reveal({ children, delay = 0, y = 24, className, as = "div" }: Props) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}
