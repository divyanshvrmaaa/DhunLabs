// Simple custom events for Vercel Analytics. No other trackers.
import { track as vercelTrack } from "@vercel/analytics";

type Props = Record<string, string | number | boolean | null>;

export function track(event: string, props?: Props) {
  try {
    vercelTrack(event, props);
  } catch {
    // Analytics must never break the page.
  }
}

/** Which form a button opens. */
export type FormKind = "onboarding" | "track";

export const trackFormClick = (form: FormKind, location: string) => track("form_click", { form, location });
