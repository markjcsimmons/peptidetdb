/**
 * Draft grading rubric for stage 2 (product grading). Published BEFORE any product is graded, at
 * /grading-rubric. If this changes, bump `RUBRIC_VERSION`, update `RUBRIC_DATE`, and log the
 * change on the page. Grades must record the version they used.
 *
 * The rubric mainly scores how well a product's public documentation can be checked. Since v0.2 it also deducts
 * points for two safety concerns (banned or undeclared drug substances, unapproved injectables). It does not score
 * whether the product works.
 */
export const RUBRIC_VERSION = "0.2 (draft)";
export const RUBRIC_DATE = "2026-11-13";
export const RUBRIC_FIRST_PUBLISHED = "2026-11-10";

export type Criterion = { id: string; name: string; points: number; asks: string };
export type Category = { id: string; name: string; why: string; criteria: Criterion[] };

export const RUBRIC: Category[] = [
  {
    id: "testing",
    name: "Batch testing",
    why: "A lab report is the only way to check what is in a particular container. See how to read a peptide COA.",
    criteria: [
      {
        id: "coa-batch",
        name: "Batch-specific report",
        points: 10,
        asks: "Is there a certificate of analysis for the lot being sold, with a lot number that can be matched to the container?",
      },
      {
        id: "coa-lab",
        name: "Independent, named laboratory",
        points: 8,
        asks: "Is the lab named, separate from the seller, and any accreditation claim checkable in the accreditor's own directory for the test performed?",
      },
      {
        id: "coa-numbers",
        name: "Identity, purity and content with numbers",
        points: 10,
        asks: "Does the report give methods, limits and actual results for identity, purity and the amount of active ingredient, rather than “pass”?",
      },
      {
        id: "coa-contaminants",
        name: "Contaminant tests that suit the product",
        points: 6,
        asks: "Are the contaminants relevant to the product type tested and reported with limits and results (for example heavy metals and microbes for an oral supplement; sterility and endotoxin for an injectable)?",
      },
      {
        id: "certification",
        name: "Independent certification programme",
        points: 8,
        asks:
          "Is the product listed, under the name it is sold as, in the public directory of an independent certification programme? Programmes that test for substances banned in sport, such as NSF Certified for Sport, Informed Sport or BSCG Certified Drug Free, earn 8 points; contents-only certification, such as NSF/ANSI 173 Contents Certified, earns 4. A badge on the product's own website without a matching directory listing earns nothing.",
      },
    ],
  },
  {
    id: "label",
    name: "Label and ingredient disclosure",
    why: "A buyer should be able to tell what is in a serving and what it came from.",
    criteria: [
      { id: "amount", name: "Amount per serving", points: 8, asks: "Is the amount of each active ingredient stated per serving?" },
      { id: "source", name: "Source stated", points: 4, asks: "Is the source stated, for example the animal or species it comes from?" },
      {
        id: "allergen",
        name: "Allergen declaration",
        points: 5,
        asks: "Are relevant allergens declared, such as fish for marine-derived products? (Fish collagen has caused anaphylaxis in a child with fish allergy; see the collagen side-effects page.)",
      },
      { id: "blend", name: "No hidden amounts", points: 6, asks: "Are all active ingredients listed with amounts, with no proprietary blend that hides them?" },
    ],
  },
  {
    id: "claims",
    name: "Claims against the evidence",
    why: "Marketing claims are compared with the human evidence summarised on this site, not with the seller's own pages.",
    criteria: [
      {
        id: "claims-match",
        name: "Claims match the human evidence",
        points: 15,
        asks: "Do the product's claims stay within what controlled human studies support? Claims to treat, cure or prevent disease, or claims resting only on animal studies, lose points.",
      },
      { id: "dose-match", name: "Dose matches the studies cited", points: 5, asks: "When a study is cited, does the product deliver a dose similar to the one tested?" },
      { id: "cites-real", name: "Studies cited exist and are described correctly", points: 5, asks: "Can each cited paper be found, and does the seller describe it accurately?" },
    ],
  },
  {
    id: "honesty",
    name: "Regulatory status and company identity",
    why: "Buyers should know what kind of product it is and who stands behind it.",
    criteria: [
      {
        id: "category",
        name: "Regulatory category stated correctly",
        points: 5,
        asks: "Is the product described as what it is (supplement, compounded drug, or other), and not labelled “research use only” while marketed for human use?",
      },
      { id: "identity", name: "Company identity and complaint route", points: 5, asks: "Does the seller give its legal name, address and a way to report a problem?" },
    ],
  },
];

/** Deductions applied after scoring (the total cannot go below 0). Each needs a dated source in the scoring sheet. */
export type Deduction = { id: string; name: string; points: number; asks: string };

export const DEDUCTIONS: Deduction[] = [
  {
    id: "banned",
    name: "Banned or undeclared drug substance",
    points: -30,
    asks:
      "Does the product list, or has a regulator or accredited laboratory found in it, a substance prohibited in sport or a drug ingredient not declared on the label (for example in an FDA warning or tainted-product notice)?",
  },
  {
    id: "injectable",
    name: "Unapproved injectable",
    points: -20,
    asks:
      "Is the product sold for injection without FDA approval for that use, including vials labelled 'for research use only' that are marketed to people?",
  },
];

export const TOTAL_POINTS = RUBRIC.reduce((n, c) => n + c.criteria.reduce((m, k) => m + k.points, 0), 0);

export type Band = { label: string; range: string; meaning: string };

export const BANDS: Band[] = [
  { label: "Well documented", range: "85 to 100", meaning: "Almost everything we check can be verified from public documents." },
  { label: "Documented", range: "65 to 84", meaning: "Most things can be verified; some gaps." },
  { label: "Partly documented", range: "40 to 64", meaning: "Important parts cannot be verified." },
  { label: "Poorly documented", range: "0 to 39", meaning: "Little can be verified." },
];

export const CAPS: string[] = [
  "A product with no batch-specific report cannot be rated above “Partly documented”.",
  "A product whose claims include treating, curing or preventing a disease cannot be rated above “Documented”.",
  "If there is not enough public information to score at least half of the criteria, the product is listed as “Not graded” rather than given a low grade.",
  "A product with a banned or undeclared drug substance cannot be rated above “Poorly documented”, whatever its other points.",
];

/** Dated changes to the rubric, newest first. Say who asked for a change and whom it could favour. */
export const VERSIONS: { date: string; version: string; text: string }[] = [
  {
    date: "2026-11-13",
    version: "0.2 (draft)",
    text:
      "Added up to 8 points for a listing in an independent certification programme (8 for programmes that test for substances banned in sport, 4 for contents-only certification), paid for by small cuts to four other criteria so the total stays 100. Added deductions of 30 points for a banned or undeclared drug substance and 20 points for an unapproved injectable, and a cap for the first. These changes were requested by the site's operator, who works for Pürblack. Pürblack sells oral supplements and holds NSF Certified for Sport listings for some of its products, so the changes favour it over some competitors; we judged each change worth making on its own merits. No product had been graded when the rules changed.",
  },
  { date: "2026-11-10", version: "0.1 (draft)", text: "First published for comment." },
];
