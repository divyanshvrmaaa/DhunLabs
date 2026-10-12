import { describe, expect, it } from "vitest";
import { onboardingForm, trackForm } from "../content/forms";
import { buildBody, OTHER_VALUE, readableDate, validate } from "./googleForm";

describe("on-site forms → Google Forms", () => {
  it("sends every answer to the right Google question, including checkboxes and 'Other'", () => {
    const body = buildBody(
      onboardingForm,
      {
        legalName: "Test Person",
        artistName: "Test Artist",
        whatsapp: "+91 98765 43210",
        email: "test@example.com",
        spotify: "https://open.spotify.com/artist/x",
        genre: ["Hip-Hop / Rap", OTHER_VALUE],
        releaseStatus: "Releasing in less than 14 days",
        budget: "₹5,000 to ₹15,000",
        goal: "Independent passion project.",
        notes: "",
      },
      { genre: "Punjabi" },
    );
    expect(body.get("entry.2074708868")).toBe("Test Person");
    expect(body.getAll("entry.1954241961")).toEqual(["Hip-Hop / Rap", "__other_option__"]);
    expect(body.get("entry.1954241961.other_option_response")).toBe("Punjabi");
    expect(body.get("entry.1656914450")).toBe("₹5,000 to ₹15,000");
    expect(body.has("entry.799728154")).toBe(false); // empty optional answer is left out
  });

  it("every multiple-choice answer matches a Google option exactly", () => {
    for (const def of [onboardingForm, trackForm])
      for (const f of def.fields) if (f.options) expect(new Set(f.options).size).toBe(f.options.length);
  });

  it("checks answers", () => {
    expect(validate("email", true, "nope")).not.toBe("");
    expect(validate("email", true, "a@b.co")).toBe("");
    expect(validate("tel", true, "98765")).not.toBe("");
    expect(validate("tel", true, "+91 98765 43210")).toBe("");
    expect(validate("checkboxes", true, [])).not.toBe("");
    expect(validate("checkboxes", true, [OTHER_VALUE], "")).not.toBe("");
    expect(validate("textarea", false, "")).toBe("");
    expect(readableDate("2026-10-13")).toBe("13 Oct 2026");
  });
});
