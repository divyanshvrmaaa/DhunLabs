// Sends an on-site form's answers into the matching Google Form (see content/forms.ts).
import type { SiteFormDef } from "../content/forms";

export type Answers = Record<string, string | string[]>;
/** Text typed into an "Other" box, keyed by field name. */
export type OtherAnswers = Record<string, string>;

const OTHER = "__other_option__";

/** Builds the exact request body Google Forms expects. */
export function buildBody(def: SiteFormDef, answers: Answers, other: OtherAnswers): URLSearchParams {
  const body = new URLSearchParams();
  for (const f of def.fields) {
    const v = answers[f.name];
    const values = Array.isArray(v) ? v : v ? [v] : [];
    for (const one of values) body.append(f.entry, one === OTHER ? OTHER : one);
    if (values.includes(OTHER)) body.append(`${f.entry}.other_option_response`, other[f.name] ?? "");
  }
  body.append("fvv", "1");
  return body;
}

export const OTHER_VALUE = OTHER;

/**
 * Posts the answers. Google doesn't let other websites read its reply, so a
 * response we can't read counts as sent; only a network failure (offline,
 * blocked) is reported as an error, and the visitor is then offered the
 * Google Form itself as a backup.
 */
export async function submitToGoogleForm(def: SiteFormDef, answers: Answers, other: OtherAnswers): Promise<void> {
  await fetch(`https://docs.google.com/forms/d/e/${def.googleFormId}/formResponse`, {
    method: "POST",
    mode: "no-cors",
    body: buildBody(def, answers, other),
  });
}

/** "2026-10-13" → "13 Oct 2026" (how the release date is stored in the sheet). */
export function readableDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1]} ${y}`;
}

/** Returns an error message for a field, or "" if it's fine. */
export function validate(type: string, required: boolean, value: string | string[], otherText?: string): string {
  const empty = Array.isArray(value) ? value.length === 0 : !value.trim();
  if (empty) return required ? "Please fill this in." : "";
  if (Array.isArray(value) ? value.includes(OTHER) : value === OTHER) {
    if (!otherText?.trim()) return "Please tell us what 'Other' means for you.";
  }
  if (Array.isArray(value)) return "";
  const v = value.trim();
  if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "That email doesn't look right.";
  if (type === "tel" && v.replace(/\D/g, "").length < 10) return "Please include the full number with country code.";
  return "";
}
