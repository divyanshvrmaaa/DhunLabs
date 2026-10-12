export const FOOTNOTE = "Estimates based on our recent campaigns. Results vary by song, genre and audience. Not a guarantee.";

/**
 * The always-visible footnote plus the "How we estimate this" expander.
 * Uses <details> so the text is always in the page's HTML (Google can read it) even while closed.
 */
export function EstimateNote() {
  return (
    <div className="border-t border-line pt-5">
      <p className="text-xs leading-relaxed text-muted">{FOOTNOTE}</p>
      <details className="group mt-2">
        <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm font-medium text-ink/90 hover:text-accent [&::-webkit-details-marker]:hidden">
          How we estimate this
          <span aria-hidden className="transition-transform duration-300 group-open:rotate-45">
            +
          </span>
        </summary>
        <ul className="space-y-2 pb-1 pt-1 text-sm leading-relaxed text-muted">
          <li>• Estimates come from the results of our recent campaigns.</li>
          <li>• Higher budgets generally earn a better cost per stream.</li>
          <li>• The real outcome depends on the song: how strong the hook is, the genre and the audience it reaches.</li>
          <li>
            • The full method, with the numbers behind it, is in{" "}
            <a href="#how-we-calculate" className="underline decoration-line-strong underline-offset-2 hover:text-ink">
              How we calculate this
            </a>{" "}
            below.
          </li>
        </ul>
      </details>
    </div>
  );
}
