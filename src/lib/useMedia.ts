import { useEffect, useState } from "react";

/** True while the CSS media query matches. */
export function useMedia(query: string, initial = false) {
  // Start with the same value on the server and the first browser render, then update.
  const [matches, setMatches] = useState(initial);
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
