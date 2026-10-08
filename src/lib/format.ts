// Number formatting in Indian style: 1,00,000 and ranges with an en dash.
const fmt = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
const fmt2 = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const formatNumber = (n: number) => fmt.format(Math.round(n));
export const formatINR = (n: number) => `₹${formatNumber(n)}`;
export const formatINR2 = (n: number) => `₹${fmt2.format(n)}`;

export function formatRange(low: number, high: number, rupees = false): string {
  const f = rupees ? formatINR : formatNumber;
  return low === high ? f(low) : `${f(low)}–${f(high)}`;
}

/** Parse a typed number like "1,00,000" or "₹25000" into 25000. Returns NaN for junk. */
export function parseNumber(input: string): number {
  const cleaned = input.replace(/[^\d.]/g, "");
  return cleaned ? Number(cleaned) : NaN;
}
