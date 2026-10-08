/** DhunLabs mark (the waveform + note "D") and wordmark. */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="120 140 320 260" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lm-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6DF051" />
          <stop offset="100%" stopColor="#0C8E28" />
        </linearGradient>
        <linearGradient id="lm-d" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4BCC32" />
          <stop offset="100%" stopColor="#086C1D" />
        </linearGradient>
      </defs>
      <g fill="url(#lm-g)">
        <rect x="135" y="241" width="12" height="30" rx="6" />
        <rect x="160" y="231" width="12" height="50" rx="6" />
        <rect x="185" y="211" width="12" height="90" rx="6" />
        <rect x="275" y="211" width="12" height="90" rx="6" />
        <rect x="300" y="226" width="12" height="60" rx="6" />
        <rect x="325" y="241" width="12" height="30" rx="6" />
      </g>
      <path
        d="M 245 155 C 365 155, 420 210, 420 270 C 420 330, 365 385, 245 385 C 310 385, 355 340, 355 270 C 355 200, 320 185, 245 185 Z"
        fill="url(#lm-g)"
      />
      <polygon points="215,155 258,155 258,345 234,345 234,175" fill="url(#lm-d)" />
      <ellipse cx="212" cy="345" rx="38" ry="28" transform="rotate(-25 212 345)" fill="url(#lm-g)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="h-7 w-7" />
      <span className="font-display text-[1.15rem] font-bold tracking-[-0.03em]">DhunLabs</span>
    </span>
  );
}
