import type { ReactNode } from "react";
import { PageHeader } from "../PageHeader";
import { Reveal } from "../ui/Reveal";
import { SmartLink } from "../ui/SmartLink";

interface Props {
  badge: string;
  /** The H1: holds the main search phrase. */
  title: ReactNode;
  /** The catchy line under the H1. */
  kicker?: ReactNode;
  sub: string;
  /** The written guide shown under the tool. */
  guide?: ReactNode;
  children: ReactNode;
  cta: ReactNode;
  sources?: { label: string; url: string }[];
}

/** Common frame for the free tools: header, the tool, a soft CTA and source notes. */
export function ToolShell({ badge, title, kicker, sub, children, cta, sources, guide }: Props) {
  return (
    <>
      <PageHeader compact badge={badge} title={title} kicker={kicker} sub={sub}>
        <SmartLink href="/tools" className="mt-6 inline-flex min-h-11 items-center gap-1 text-sm text-muted hover:text-ink">
          <span aria-hidden>←</span> All free tools
        </SmartLink>
      </PageHeader>
      <div className="container-x pb-24 md:pb-36">
        {children}
        {guide}
        <Reveal className="mt-16 md:mt-20">
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface p-7 md:p-12">
            <div aria-hidden className="pointer-events-none absolute -left-24 -top-32 h-80 w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(29,185,84,0.16),transparent)] blur-3xl" />
            <div className="relative">{cta}</div>
          </div>
        </Reveal>
        {sources && sources.length > 0 && (
          <div className="mt-10 border-t border-line pt-6 text-xs leading-relaxed text-muted">
            <p>Sources (checked Oct 2026):</p>
            <ul className="mt-1">
              {sources.map((s) => (
                <li key={s.label} className="flex min-h-8 items-center">
                  {s.url ? (
                    <SmartLink href={s.url} className="inline-flex min-h-8 items-center underline decoration-line-strong underline-offset-2 hover:text-ink">
                      {s.label}
                    </SmartLink>
                  ) : (
                    <span>{s.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
