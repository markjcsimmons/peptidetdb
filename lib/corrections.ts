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
    date: "2026-11-17",
    page: "/ (home page)",
    was: "The 'What are the different types?' and 'Are peptides safe?' sections said skin-care peptides had no controlled trial summarised here, that no safety evidence was summarised for oral collagen or topical peptides, and that the site had not summarised trial evidence for any approved peptide drug. All three had gone out of date as studies were added from 10 November (topical peptide trials, oral collagen safety ratings, semaglutide and tirzepatide trials).",
    now: "Both sections were replaced in a redesign by short answers that link to the full pages, and the home page now shows every goal's best and least-supported rating from the same data as the goal pages, so it updates when a rating changes.",
  },
  {
    date: "2026-11-16",
    page: "/products, /grading-rubric, /peptides/oral-peptides and the product panels on goal pages",
    was: "The one-line Pürblack note was followed by a second sentence that varied by page, and the product finder repeated the disclosure when a filter left only Pürblack products.",
    now: "At the operator's request the note is now one shorter line, the same everywhere products are graded: run by a Pürblack employee, Pürblack does not fund or direct the site, and its products are graded like any other. The finder's repeat was removed; the note at the top of the page remains. The full disclosure in the footer and on the About page is unchanged, and nothing about the operator's relationship with Pürblack has changed.",
  },
  {
    date: "2026-11-15",
    page: "/about, /editorial-policy and /grading-rubric",
    was: "Said 10 oral peptide products other than collagen had been graded.",
    now: "Three more were graded on 2026-11-14 (13 in all), and the count was not updated at the time. All three pages now say 13. Found while adding a sixteenth collagen product.",
  },
  {
    date: "2026-11-14",
    page: "/peptides/oral-peptides",
    was: "Life Extension Bioactive Milk Peptides scored 13 of 15 on the claims criterion (49/100): its sleep claim lost 2 points, but its stress claim was left unscored as 'not rated for casein'.",
    now: "Our scoring rules rate food-derived peptides for stress as limited, and other products (Pürblack's Brain AM and Brain PM) had lost 2 points for the same claim. The stress claim now costs 2 points as well, so the product scores 11 (47/100, still 'Partly documented'). Found while grading three more oral peptide products.",
  },
  {
    date: "2026-11-18",
    page: "/peptides/best-peptides-for-skin",
    was: "The scoring-sheet section said “Seven peptide creams and serums, six for skin and one for the scalp, graded on November 13, 2026”, although an eighth product (Vegamour GRO Hair Serum, a second scalp serum) had been graded on 15 November and was in the table below it.",
    now: "The count, the split between skin and scalp products and the dates are now worked out from the grades themselves, so they cannot fall behind again. The section now lists twelve products after four more serums were graded on 18 November.",
  },
  {
    date: "2026-11-17",
    page: "/peptides/oral-peptides",
    was: "All eight Pürblack scoring sheets scored the source criterion 0 of 4 and said the peptide source was not stated, because the labels and product pages do not say what protein the peptides come from. The product finder listed them under “Made from: not stated”.",
    now: "The FAQ on Pürblack's peptides collection page says the peptides are made from marine sources of protein; we had not read that page. It names no species, so under the same rule as “grass-fed” collagen the criterion now scores 2 of 4, and each Pürblack product gains 2 points. The finder lists them as “Marine, species not named”. The allergen criterion stays “could not check”: the label still declares no allergen and the species is not named. Pointed out by the site's operator, who works for Pürblack.",
  },
  {
    date: "2026-11-14",
    page: "/peptides/a-z",
    was: "The note at the foot of the A–Z list gave semax as an example of a peptide we had not yet summarised any study for.",
    now: "Semax studies were added on 2026-11-13 and semax has been in the list since then, so the example was out of date. The note now gives IGF-1 LR3, for which we have no study summaries.",
  },
  {
    date: "2026-11-13",
    page: "/peptides/oral-peptides",
    was: "The safety and product testing note for Pürblack's capsules said its COAs name no laboratory and that we could not read the third-party (NSF) COAs, based on Pürblack's internal COAs for Muscle+ and Joint+.",
    now: "We have now read the third-party certificates for all eight Pürblack peptide products, linked publicly from its COA page. They are issued by Cambium Analytica, a laboratory NSF acquired in October 2025, and report microbiology and heavy metals by batch, with no pass or fail limits, no peptide identity, purity or content result and no banned-substance test. The note now says so and keeps the earlier points about the internal COAs, which still name no laboratory.",
  },
  {
    date: "2026-11-12",
    page: "Per-page Pürblack notes (several pages)",
    was: "Pages on weight loss, sleep, gut health, marine vs bovine collagen and oral marine peptides carried a boxed note about Pürblack, and the full disclosure was repeated in the footer text of several guide pages.",
    now: "The operator decided that a one-line note should appear only on a page whose own text mentions Pürblack (now the grading rubric and the collagen documentation page), and that other pages rely on the footer. The full disclosure remains in the footer of every page and on the home, About, methodology and editorial policy pages. Nothing about the operator's relationship with Pürblack has changed.",
  },
  {
    date: "2026-11-11",
    page: "/peptides/collagen-peptides and six related pages",
    was: "The collagen, collagen-benefits, collagen-side-effects, muscle-growth, skin, hair and joint-pain pages carried a note saying the page covered a product category that includes products Pürblack sells.",
    now: "Pürblack sells oral peptide supplements made from fish protein, not collagen peptides, so the note overstated the overlap and has been removed from those pages. The site-wide disclosure in the footer and About page, and the notes on pages that cover fish-derived products, remain.",
  },
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
