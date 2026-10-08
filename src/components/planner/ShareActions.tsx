import { useState } from "react";
import { copyText, whatsappShareUrl } from "../../lib/clipboard";
import { track } from "../../lib/analytics";

/** "Copy my plan" + "Share on WhatsApp" (no phone number, just the prefilled text). */
export function ShareActions({ text, source, copyLabel = "Copy my plan" }: { text: string; source: string; copyLabel?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={async () => {
          if (await copyText(text)) {
            setCopied(true);
            track("copy_result", { source });
            window.setTimeout(() => setCopied(false), 2200);
          }
        }}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:border-white/30 hover:bg-white/5"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          {copied ? <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M9 9h10v10H9zM5 15V5h10" strokeLinejoin="round" />}
        </svg>
        <span aria-live="polite">{copied ? "Copied" : copyLabel}</span>
      </button>
      <a
        href={whatsappShareUrl(text)}
        target="_blank"
        rel="noopener"
        onClick={() => track("whatsapp_share", { source })}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:border-[#25d366]/60 hover:bg-[#25d366]/10"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#25d366]" aria-hidden>
          <path
            fill="currentColor"
            d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"
          />
        </svg>
        Share on WhatsApp
      </a>
    </div>
  );
}
