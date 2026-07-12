import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { type ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  target?: string;
  className?: string;
}

const MotionLink = motion(Link);

function isExternal(href: string) {
  return (
    /^https?:\/\//.test(href) ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  target,
  className,
}: ButtonProps) {
  const cls = `${styles.btn} ${styles[variant]} ${className ?? ""}`;

  if (href) {
    // External links (or anything explicitly opened in a new tab) stay as real <a> tags
    if (isExternal(href) || target === "_blank" || href.startsWith("#")) {
      return (
        <motion.a
          href={href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className={cls}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {children}
        </motion.a>
      );
    }

    // Internal links use React Router's Link so navigation is client-side (no full reload)
    return (
      <MotionLink
        to={href}
        className={cls}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      className={cls}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.button>
  );
}
