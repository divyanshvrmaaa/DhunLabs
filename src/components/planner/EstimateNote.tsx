import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const FOOTNOTE = "Estimates based on our recent campaigns. Results vary by song, genre and audience. Not a guarantee.";

/** The always-visible footnote plus the "How we estimate this" expander. */
export function EstimateNote() {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="border-t border-line pt-5">
      <p className="text-xs leading-relaxed text-muted">{FOOTNOTE}</p>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink/90 hover:text-accent"
      >
        How we estimate this
        <span aria-hidden className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ul className="space-y-2 pb-1 pt-1 text-sm leading-relaxed text-muted">
              <li>• Estimates come from the results of our recent campaigns.</li>
              <li>• Higher budgets generally earn a better cost per stream.</li>
              <li>• The real outcome depends on the song: how strong the hook is, the genre and the audience it reaches.</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
