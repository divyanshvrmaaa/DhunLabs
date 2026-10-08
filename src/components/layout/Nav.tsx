import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useLocation } from "react-router-dom";
import { nav } from "../../content/site";
import { SmartLink } from "../ui/SmartLink";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";
import { useActiveSection } from "../../lib/useActiveSection";
import { getLenis } from "../../lib/scroll";

const anchorIds = nav.filter((n) => n.anchor).map((n) => n.anchor!);

export function Nav() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const active = useActiveSection(anchorIds, pathname === "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on route change; lock scrolling while it's open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.documentElement.style.setProperty("--nav-h", scrolled ? "60px" : "72px");
  }, [scrolled]);

  const items = nav.map((n) => ({
    label: n.label,
    href: n.route ?? `/#${n.anchor}`,
    isActive: n.route ? pathname.startsWith(n.route) : active === n.anchor,
  }));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,height] duration-500 ease-[var(--ease-brand)] ${
          scrolled || open ? "glass border-b border-line" : "border-b border-transparent"
        }`}
        style={{ height: scrolled ? 60 : 72 }}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <nav className="container-x flex h-full items-center justify-between gap-6" aria-label="Main">
          <SmartLink href="/" className="-m-2 rounded-lg p-2" aria-label="DhunLabs home">
            <Logo />
          </SmartLink>

          <ul className="hidden items-center gap-1 lg:flex">
            {items.map((i) => (
              <li key={i.label}>
                <SmartLink
                  href={i.href}
                  aria-current={i.isActive ? "true" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[0.92rem] transition-colors duration-300 ${
                    i.isActive ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {i.label}
                  {i.isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </SmartLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex">
              <Button form="onboarding" location="nav" size="md" arrow>
                Get Started
              </Button>
            </span>
            <button
              type="button"
              className="relative -mr-2 flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 h-[1.5px] w-6 bg-ink transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-6 bg-ink transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
                />
              </span>
            </button>
          </div>
        </nav>
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-accent via-accent to-violet"
          style={{ scaleX: progress }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-bg/95 pt-24 backdrop-blur-xl lg:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: "100%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="container-x flex flex-col">
              {items.map((i, idx) => (
                <motion.li
                  key={i.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + idx * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SmartLink
                    href={i.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center justify-between border-b border-line py-3 font-heading text-[2rem] font-semibold tracking-tight"
                  >
                    {i.label}
                    <span aria-hidden className="text-lg text-muted">
                      →
                    </span>
                  </SmartLink>
                </motion.li>
              ))}
            </ul>
            <div className="container-x mt-auto pb-10">
              <Button form="onboarding" location="mobile-menu" size="lg" className="w-full" arrow magnetic={false}>
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
