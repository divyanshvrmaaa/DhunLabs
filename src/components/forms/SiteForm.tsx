import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { FormField, SiteFormDef } from "../../content/forms";
import { site } from "../../content/site";
import { OTHER_VALUE, readableDate, submitToGoogleForm, validate, type Answers, type OtherAnswers } from "../../lib/googleForm";
import { SmartLink } from "../ui/SmartLink";
import { getLenis } from "../../lib/scroll";

const inputCls =
  "mt-2 w-full rounded-[var(--radius-md)] border border-line-strong bg-surface-2 px-4 py-3 text-[1rem] text-ink outline-none transition-colors placeholder:text-dim focus:border-accent/60 aria-[invalid=true]:border-[#ff7a59]/70";

function Choice({ f, value, onChange, uid }: { f: FormField; value: string | string[]; onChange: (v: string | string[]) => void; uid: string }) {
  const multi = f.type === "checkboxes";
  const list = [...(f.options ?? []), ...(f.other ? [OTHER_VALUE] : [])];
  const isOn = (o: string) => (multi ? (value as string[]).includes(o) : value === o);
  return (
    <div className="mt-2 grid gap-2">
      {list.map((o) => {
        const on = isOn(o);
        return (
          <label
            key={o}
            className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-[0.95rem] leading-snug transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${
              on ? "border-accent/70 bg-accent/10 text-ink" : "border-line-strong text-ink/80 hover:border-white/25"
            }`}
          >
            <input
              type={multi ? "checkbox" : "radio"}
              name={`${uid}-${f.name}`}
              value={o}
              checked={on}
              onChange={() => {
                if (!multi) return onChange(o);
                const cur = value as string[];
                onChange(on ? cur.filter((x) => x !== o) : [...cur, o]);
              }}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#1db954]"
            />
            <span>{o === OTHER_VALUE ? f.other!.label : o}</span>
          </label>
        );
      })}
    </div>
  );
}

interface Props {
  def: SiteFormDef;
  /** Where on the site this form sits (shown nowhere; keeps forms independent). */
  location: string;
  /** Pre-fill answers, e.g. the budget bracket from the planner. */
  initial?: Answers;
  /** Hide the form's own title (when the page already shows it). */
  hideTitle?: boolean;
}

/**
 * A form that lives on the site. Answers go into the matching Google Form in
 * the background (see lib/googleForm.ts), so they land in the same Google Sheet.
 */
export function SiteForm({ def, initial, hideTitle }: Props) {
  const uid = useId().replace(/:/g, "");
  const [answers, setAnswers] = useState<Answers>(() => {
    const a: Answers = {};
    for (const f of def.fields) a[f.name] = initial?.[f.name] ?? (f.type === "checkboxes" ? [] : "");
    return a;
  });
  const [other, setOther] = useState<OtherAnswers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [trap, setTrap] = useState("");
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  // After sending, bring the thank-you message into view (the long form above it is gone)
  useEffect(() => {
    const el = doneRef.current;
    if (state !== "sent" || !el) return;
    const lenis = getLenis(); // the site's smooth scrolling, if it's on
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(el, { offset: -140, duration: 0.9 });
    } else el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [state]);
  const fallback = def.id === "track" ? site.trackSubmitForm : site.onboardingForm;

  // Pre-filled answers follow the page (e.g. the planner budget) until the visitor changes them
  const touched = useRef(new Set<string>());
  const initialKey = JSON.stringify(initial ?? {});
  useEffect(() => {
    const next = JSON.parse(initialKey) as Answers;
    setAnswers((a) => {
      const out = { ...a };
      for (const [k, v] of Object.entries(next)) if (!touched.current.has(k)) out[k] = v;
      return out;
    });
  }, [initialKey]);

  const set = (name: string, v: string | string[]) => {
    touched.current.add(name);
    setAnswers((a) => ({ ...a, [name]: v }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    for (const f of def.fields) {
      const msg = validate(f.type, f.required, answers[f.name], other[f.name]);
      if (msg) next[f.name] = msg;
    }
    setErrors(next);
    const firstBad = def.fields.find((f) => next[f.name]);
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstBad.name}"] input, [data-field="${firstBad.name}"] textarea`)?.focus();
      return;
    }
    // Spam trap: bots fill hidden fields or submit instantly. Pretend it worked.
    if (trap || Date.now() - startedAt.current < 2500) {
      setState("sent");
      return;
    }
    setState("sending");
    const out: Answers = { ...answers };
    for (const f of def.fields) if (f.type === "date" && typeof out[f.name] === "string") out[f.name] = readableDate(out[f.name] as string);
    try {
      await submitToGoogleForm(def, out, other);
      setState("sent");
    } catch {
      setState("failed");
    }
  };

  if (state === "sent") {
    return (
      <div ref={doneRef} role="status" className="card p-6 text-center md:p-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-5 font-heading text-2xl font-semibold tracking-tight">{def.successTitle}</h3>
        <p className="mx-auto mt-2 max-w-md leading-relaxed text-muted">{def.successBody}</p>
        <p className="mt-6 text-sm">
          <SmartLink href="/tools" className="underline decoration-line-strong underline-offset-4 hover:text-ink">
            While you wait, try our free tools
          </SmartLink>
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card p-6 md:p-8" aria-labelledby={hideTitle ? undefined : `${uid}-title`} aria-label={hideTitle ? def.title : undefined}>
      {!hideTitle && (
        <>
          <h3 id={`${uid}-title`} className="font-heading text-xl font-semibold tracking-tight md:text-2xl">
            {def.title}
          </h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{def.intro}</p>
        </>
      )}

      <div className="mt-6 grid gap-6">
        {def.fields.map((f) => {
          const id = `${uid}-${f.name}`;
          const err = errors[f.name];
          const describedBy = [f.hint ? `${id}-hint` : "", err ? `${id}-err` : ""].filter(Boolean).join(" ") || undefined;
          const isChoice = f.type === "radio" || f.type === "checkboxes";
          const label = (
            <>
              {f.label}
              {!f.required && <span className="font-normal text-muted"> (optional)</span>}
            </>
          );
          return (
            <div key={f.name} data-field={f.name}>
              {isChoice ? (
                <fieldset aria-describedby={describedBy} aria-invalid={!!err || undefined}>
                  <legend className="text-[0.95rem] font-medium text-ink">{label}</legend>
                  {f.hint && (
                    <p id={`${id}-hint`} className="mt-1 text-xs text-muted">
                      {f.hint}
                    </p>
                  )}
                  <Choice f={f} value={answers[f.name]} onChange={(v) => set(f.name, v)} uid={uid} />
                  {f.other && (Array.isArray(answers[f.name]) ? (answers[f.name] as string[]).includes(OTHER_VALUE) : answers[f.name] === OTHER_VALUE) && (
                    <input
                      aria-label={`${f.label}: other`}
                      className={inputCls}
                      value={other[f.name] ?? ""}
                      placeholder={f.other.placeholder}
                      onChange={(e) => {
                        setOther((o) => ({ ...o, [f.name]: e.target.value }));
                        if (errors[f.name]) setErrors((x) => ({ ...x, [f.name]: "" }));
                      }}
                    />
                  )}
                </fieldset>
              ) : (
                <>
                  <label htmlFor={id} className="block text-[0.95rem] font-medium text-ink">
                    {label}
                  </label>
                  {f.hint && (
                    <p id={`${id}-hint`} className="mt-1 text-xs text-muted">
                      {f.hint}
                    </p>
                  )}
                  {f.type === "textarea" ? (
                    <textarea
                      id={id}
                      rows={4}
                      className={inputCls}
                      value={answers[f.name] as string}
                      onChange={(e) => set(f.name, e.target.value)}
                      aria-invalid={!!err || undefined}
                      aria-describedby={describedBy}
                    />
                  ) : (
                    <input
                      id={id}
                      type={f.type === "url" ? "url" : f.type}
                      inputMode={f.type === "tel" ? "tel" : f.type === "email" ? "email" : f.type === "url" ? "url" : undefined}
                      autoComplete={f.autoComplete ?? "off"}
                      placeholder={f.placeholder}
                      className={inputCls}
                      value={answers[f.name] as string}
                      onChange={(e) => set(f.name, e.target.value)}
                      aria-invalid={!!err || undefined}
                      aria-describedby={describedBy}
                      required={f.required}
                    />
                  )}
                </>
              )}
              {err && (
                <p id={`${id}-err`} className="mt-2 text-sm text-[#ff7a59]">
                  {err}
                </p>
              )}
            </div>
          );
        })}

        {/* Spam trap: invisible to people, bots fill it in */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Leave this empty
            <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
          </label>
        </div>
      </div>

      {Object.values(errors).some(Boolean) && (
        <p role="alert" className="mt-6 text-sm text-[#ff7a59]">
          Please check the highlighted answers above.
        </p>
      )}
      {state === "failed" && (
        <p role="alert" className="mt-6 rounded-xl border border-[#ff7a59]/40 bg-[#ff7a59]/[0.06] px-4 py-3 text-sm text-ink/90">
          We couldn't send that (your connection may have dropped). Please try again, or{" "}
          <SmartLink href={fallback} className="underline underline-offset-2">
            use our backup form
          </SmartLink>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-7 text-base font-semibold text-[#04110a] transition-colors hover:bg-[#21cc5d] disabled:opacity-70 sm:w-auto"
      >
        {state === "sending" ? "Sending…" : def.submitLabel}
        {state !== "sending" && <span aria-hidden>→</span>}
      </button>
      <p className="mt-3 text-xs text-muted">We only use your details to get back to you.</p>
    </form>
  );
}
