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

export const CORRECTIONS: Correction[] = [
  {
    date: "2026-11-11",
    page: "/peptides/peptides-for-hair-growth",
    was: "Ranked \"Thymosin beta-4 (TB-500)\" as one option, treating the two names as the same compound.",
    now: "A 2026 orthopaedic review (Tham 2026) describes TB-500 as a distinct seven-amino-acid fragment that is not validated as equivalent to thymosin beta-4. The hair studies we cite are of thymosin beta-4 itself, so the page now labels the option \"Thymosin beta-4 (not the same as TB-500)\" and says we found no hair study of TB-500.",
  },
  {
    date: "2026-11-10",
    page: "/peptides/legal-status",
    was: "Said comments on the HHS enforcement-discretion policy \"were due\" 13 November 2026, and stated that the policy covers six peptides without saying where that list came from.",
    now: "The deadline had not passed when this was published, so it now says comments \"are due\" 13 November. The six-peptide list comes from law-firm summaries because we could not open the HHS document, and the page now says so in the short answer as well as the section.",
  },
  {
    date: "2026-11-10",
    page: "/peptides/peptides-for-muscle-growth",
    was: "Described one author's disclosure as \"lecture support from a collagen manufacturer\", and called ipamorelin's trial \"controlled\".",
    now: "The study record names the company (GELITA AG) and the author's patents on collagen-peptide use but does not call it a manufacturer, so the page now states what the record says. The ipamorelin trial is described as placebo-controlled.",
  },
  {
    date: "2026-11-10",
    page: "/peptides/bpc-157",
    was: "Said BPC-157's plasma half-life of under 30 minutes was seen \"in rodent studies\".",
    now: "The source review says the preclinical ADME study was in two species and does not say they were rodents; the page now says \"in preclinical studies in two species\".",
  },
  {
    date: "2026-11-10",
    page: "/science/nong-2026",
    was: "Described the BMJ network meta-analysis as covering \"mostly industry-run trials\" and said the abstract names no head-to-head trial for most comparisons.",
    now: "The abstract says neither. The caveat now states what the method means: comparisons between drugs are partly inferred through shared comparators. The related weight-loss page now refers to authors of the network meta-analysis reporting fees from drug companies, not to all pooled analyses.",
  },
  {
    date: "2026-11-10",
    page: "/science/qi-2026",
    was: "Summarised the weight-regain meta-analysis as people who stopped having a \"significantly higher weight\", with the difference given in percentage points.",
    now: "The abstract reports a mean difference of 17.9% without making clear what it is a percentage of, so the summary now quotes it as the authors do.",
  },
  {
    date: "2026-11-10",
    page: "/peptides/collagen-peptides",
    was: "Said the studies were \"the most-studied peptide supplement\", that collagen peptides are broken down \"so it dissolves in water\", and that the studies other than reviews and trials were \"safety and laboratory studies\".",
    now: "None of these was supported by a source we cite. The page now says \"among the best-studied\", drops the water claim, and describes the remaining studies as a case report and a laboratory study.",
  },
];
