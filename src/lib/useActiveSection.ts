import { useEffect, useState } from "react";

/** Returns the id of the section currently in the middle of the screen. */
export function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        const first = ids.find((id) => visible.get(id));
        setActive(first ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    // Sections may mount slightly later (lazy content), so retry briefly.
    const attach = () => ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    attach();
    const t = window.setTimeout(attach, 600);
    return () => {
      window.clearTimeout(t);
      observer.disconnect();
    };
  }, [key, enabled]);

  return active;
}
