/**
 * Public corrections log, shown at /corrections. Add an entry whenever a published claim, summary,
 * identifier, verdict or date is found to be wrong, or the method changes. Newest first.
 */
export type Correction = {
  /** ISO date the correction was published. */
  date: string;
  /** Path of the page that was changed, e.g. "/science/zdzieblik-2015". */
  page: string;
  /** What the page said before. */
  was: string;
  /** What it says now, and why. */
  now: string;
};

export const CORRECTIONS: Correction[] = [];
