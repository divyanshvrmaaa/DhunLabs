import { useEffect, useState } from "react";

/** True while the CSS media query matches. */
export function useMedia(query: string, initial = false) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? initial : window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/** Desktop with a real mouse (used for magnetic buttons and cursor effects). */
export const useFinePointer = () => useMedia("(hover: hover) and (pointer: fine)");
