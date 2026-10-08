import { useState } from "react";
import { copyText } from "../../lib/clipboard";
import { track } from "../../lib/analytics";

export function CopyButton({ text, label = "Copy result", source, primary }: { text: string; label?: string; source: string; primary?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        if (await copyText(text)) {
          setCopied(true);
          track("tool_copy", { tool: source });
          window.setTimeout(() => setCopied(false), 2200);
        }
      }}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors ${
        primary ? "bg-ink text-bg hover:bg-accent" : "border border-line-strong hover:border-white/30 hover:bg-white/5"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        {copied ? <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M9 9h10v10H9zM5 15V5h10" strokeLinejoin="round" />}
      </svg>
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
