import { useEffect, useRef, useState } from "react";
import { site } from "../../content/site";
import { trackFormClick, type FormKind } from "../../lib/analytics";

interface Props {
  kind: FormKind;
  title: string;
  subtitle?: string;
  location: string;
  /** Load straight away instead of waiting until it's near the screen. */
  eager?: boolean;
}

/**
 * A Google Form shown inside the page. It only loads when it's about to be seen,
 * and there's always a button to open it in a new tab (embedded forms can
 * render badly on some phones).
 */
export function FormEmbed({ kind, title, subtitle, location, eager }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(!!eager);
  const [ready, setReady] = useState(false);
  const embed = kind === "onboarding" ? site.onboardingFormEmbed : site.trackSubmitFormEmbed;
  const direct = kind === "onboarding" ? site.onboardingForm : site.trackSubmitForm;

  useEffect(() => {
    if (load || !ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [load]);

  return (
    <div ref={ref} className="card flex h-full flex-col overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
        <div>
          <h3 className="font-heading text-lg font-semibold tracking-tight md:text-xl">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        </div>
        <a
          href={direct}
          target="_blank"
          rel="noopener"
          onClick={() => trackFormClick(kind, `${location}-newtab`)}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:border-white/30 hover:bg-white/5"
        >
          Open form in a new tab <span aria-hidden>↗</span>
        </a>
      </div>
      <div className="relative bg-[#f8f8f8]" data-lenis-prevent>
        {!ready && (
          <div className="absolute inset-0 flex flex-col gap-3 bg-surface-2 p-6" aria-hidden>
            {[60, 90, 75, 85, 40].map((w, i) => (
              <span key={i} className="h-4 animate-pulse rounded bg-white/[0.06]" style={{ width: `${w}%` }} />
            ))}
          </div>
        )}
        {load && (
          <iframe
            title={title}
            src={embed}
            onLoad={() => setReady(true)}
            className="block h-[72vh] max-h-[820px] min-h-[540px] w-full border-0"
            loading="lazy"
          >
            Loading…
          </iframe>
        )}
        {!load && <div className="h-[72vh] max-h-[820px] min-h-[540px]" />}
      </div>
    </div>
  );
}
