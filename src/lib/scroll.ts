// Smooth scrolling (Lenis) and section jumps that account for the sticky nav.
import type Lenis from "lenis";

let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};
export const getLenis = () => lenis;

const navOffset = () => {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--nav-h");
  return (parseInt(v, 10) || 72) + 8;
};

export function scrollToId(id: string, immediate = false) {
  const el = document.getElementById(id);
  if (!el) return false;
  if (lenis) {
    // Re-measure first: after a page change Lenis still knows the old page's height
    lenis.resize();
    // Lenis already respects the page's scroll-padding-top (nav height), so no extra offset here
    lenis.scrollTo(el, { immediate, force: true, duration: 1.2 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset();
    window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
  }
  return true;
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}
