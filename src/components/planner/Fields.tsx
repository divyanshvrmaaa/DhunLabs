import { useEffect, useState, type ReactNode } from "react";
import { formatNumber, parseNumber } from "../../lib/format";

interface NumberFieldProps {
  id: string;
  label: ReactNode;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  prefix?: string;
  placeholder?: string;
  hint?: ReactNode;
  size?: "xl" | "lg";
  allowEmpty?: boolean;
}

/** Number box that shows Indian formatting (1,00,000) and accepts typing like "25000" or "₹25,000". */
export function NumberField({ id, label, value, onChange, min = 0, max = Infinity, prefix, placeholder, hint, size = "lg", allowEmpty }: NumberFieldProps) {
  const [text, setText] = useState(value ? formatNumber(value) : "");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setText(value ? formatNumber(value) : allowEmpty ? "" : formatNumber(value));
  }, [value, focused, allowEmpty]);

  const commit = (raw: string) => {
    const n = parseNumber(raw);
    if (Number.isNaN(n)) {
      if (allowEmpty) onChange(0);
      return;
    }
    onChange(Math.min(max, Math.max(min, Math.round(n))));
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-muted">
        {label}
      </label>
      <div
        className={`mt-2 flex items-baseline gap-1 rounded-[var(--radius-md)] border bg-surface-2 px-4 transition-colors focus-within:border-accent/60 ${
          focused ? "border-accent/60" : "border-line-strong"
        }`}
      >
        {prefix && <span className={`num text-muted ${size === "xl" ? "text-3xl md:text-4xl" : "text-xl"}`}>{prefix}</span>}
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={text}
          placeholder={placeholder}
          onFocus={(e) => {
            setFocused(true);
            setText(value ? String(value) : "");
            requestAnimationFrame(() => e.target.select());
          }}
          onBlur={() => {
            setFocused(false);
            commit(text);
          }}
          onChange={(e) => {
            const digits = e.target.value.replace(/[^\d]/g, "").slice(0, 9);
            setText(digits);
            const n = Number(digits);
            if (digits && n >= min && n <= max) onChange(n);
            else if (!digits && allowEmpty) onChange(0);
          }}
          onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
          className={`num w-full min-w-0 bg-transparent py-3 font-semibold text-ink outline-none placeholder:text-dim ${
            size === "xl" ? "text-3xl md:text-4xl" : "text-xl"
          }`}
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-xs text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}

interface ChipsProps {
  label: string;
  values: number[];
  current: number;
  onPick: (n: number) => void;
  format: (n: number) => string;
}

export function Chips({ label, values, current, onPick, format }: ChipsProps) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {values.map((v) => {
        const on = v === current;
        return (
          <button
            key={v}
            type="button"
            aria-pressed={on}
            onClick={() => onPick(v)}
            className={`num min-h-11 rounded-full border px-4 text-sm font-medium transition-all duration-300 ${
              on ? "border-accent bg-accent/15 text-ink shadow-[0_0_24px_-6px_rgba(29,185,84,0.6)]" : "border-line-strong text-muted hover:border-white/25 hover:text-ink"
            }`}
          >
            {format(v)}
          </button>
        );
      })}
    </div>
  );
}

interface SegmentedProps<T extends string> {
  label: string;
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (v: T) => void;
}

export function Segmented<T extends string>({ label, options, value, onChange }: SegmentedProps<T>) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-muted">{label}</legend>
      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        {options.map((o) => {
          const on = o.value === value;
          return (
            <label
              key={o.value}
              className={`flex min-h-11 cursor-pointer items-center justify-center rounded-xl border px-3 text-center text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${
                on ? "border-accent/70 bg-accent/10 text-ink" : "border-line-strong text-muted hover:text-ink"
              }`}
            >
              <input type="radio" className="sr-only" name={label} value={o.value} checked={on} onChange={() => onChange(o.value)} />
              {o.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
