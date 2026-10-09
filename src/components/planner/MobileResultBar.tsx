import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToId } from "../../lib/scroll";

/**
 * Phones only: a slim bar pinned to the bottom of the screen that shows the live
 * result while the visitor is still above the result card. Tapping it scrolls there.
 */
export function MobileResultBar({ targetId, title, value, cta = "See plan" }: { targetId: string; title: ReactNode; value: ReactNode; cta?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => {
      const el = document.getElementById(targetId);
      if (!el) return;
      setShow(el.getBoundingClientRect().top > window.innerHeight - 24);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-3 bottom-3 z-40 md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            type="button"
            onClick={() => scrollToId(targetId)}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-line-strong bg-[rgba(22,22,22,0.96)] px-4 py-3 text-left shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          >
            <span className="min-w-0">
              <span className="block truncate text-xs text-muted">{title}</span>
              <span className="num block truncate text-lg font-semibold">{value}</span>
            </span>
            <span className="shrink-0 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-[#04110a]">{cta} ↓</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
