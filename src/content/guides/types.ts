// Shape of the written guide shown under each free tool (see components/guide/ToolGuide.tsx).

export interface GuideBand {
  label: string;
  tone: "good" | "ok" | "high" | "warn" | "bad" | "info";
  text: string;
}

export interface ToolGuideContent {
  /** Tool name as used in "How to use the …". */
  name: string;
  howTo: { title: string; body: string }[];
  reading: { intro: string; bands: GuideBand[]; outro?: string };
  method?: {
    /** Heading (default "How we calculate this"). */
    title?: string;
    intro: string;
    points: string[];
    table?: { caption: string; head: string[]; rows: string[][] };
    outro?: string;
  };
  /** Extra sections after the method (e.g. "What makes a good ad hook"). */
  extraSections?: { id: string; title: string; paragraphs?: string[]; bullets?: string[] }[];
  benchmarks: {
    intro: string;
    /** Receipts from caseStudies.ts, by id. */
    receiptIds: string[];
    /** Extra dated benchmark cards. */
    extra?: { title: string; text: string; note?: string }[];
    outro?: string;
  };
  faqs: { q: string; a: string }[];
  /** Links to other tools (their href in tools.ts). */
  related: string[];
}
