/**
 * Product grades under the published rubric (lib/rubric.ts, /grading-rubric).
 *
 * Every criterion of every product has points, a note saying what we saw, and at least one source link.
 * The build fails (checks at the bottom) if a criterion is missing, points exceed the maximum, or a
 * source is missing. Grades describe public documents on the dates given; they do not say whether a
 * product works. `null` points mean "could not check" and count as 0; the note says why.
 *
 * Scoring rules for partial points are in SCORING_RULES and shown on the page with the grades. Apply
 * them the same way to every product, Pürblack's included.
 */
import { DEDUCTIONS, RUBRIC, RUBRIC_VERSION, TOTAL_POINTS, type Criterion } from "@/lib/rubric";

export type Source = { label: string; href: string };
export type Score = { points: number | null; note: string; sources: Source[] };

/** Benefit areas a seller claims, matched to this site's evidence ratings. Used to pick products for each list page. */
export type ClaimArea = "skin" | "joints" | "tendons" | "bone" | "hair" | "muscle" | "gut" | "sleep";

export type ProductGrade = {
  id: string;
  brand: string;
  product: string;
  /** What it is, in a few words. */
  form: string;
  /** Group of products graded together, e.g. "collagen". */
  group: "collagen";
  /** Product page and label details checked on this date; reports and registries on `documentsCheckedOn`. */
  checkedOn: string;
  documentsCheckedOn: string;
  rubricVersion: string;
  claimAreas: ClaimArea[];
  scores: Record<string, Score>;
  deductions: { id: string; note: string; sources: Source[] }[];
  /** True if the seller's claims include treating, curing or preventing a disease (caps the band). */
  diseaseClaims: boolean;
  /** One sentence on what most affects the grade. */
  summary: string;
};

export const GRADES_CHECKED_ON = "2026-11-13";

/** How partial points were given. Shown with the grades. Same rules for every product. */
export const SCORING_RULES: Record<string, string> = {
  "coa-batch":
    "10: public reports for individual lots that a buyer can match to the container. 8: the same, but the public page lists fewer lots than are on sale. 0: no public lot report (including reports sent only on request and “typical” reports that describe no particular lot).",
  "coa-lab":
    "8: named independent lab, accreditation found in the accreditor's own directory for the tests reported. 6: as 8 but the accreditation covers only some of the tests. 5: named independent lab, accreditation not checked or not stated. 2: report from the seller's own lab. 0: no lot report.",
  "coa-numbers":
    "10: identity and content of the active ingredient, with methods, limits and results. 7: collagen or active-ingredient content with limits and results, no separate identity test. 5: protein content only, with a result. 3: a content result in some reports but not the latest. 0: none, or no lot report.",
  "coa-contaminants":
    "6: heavy metals and microbes, each with limits and results. 4: both tested but one group has no stated limits, or only one group tested with limits. 2: one group, no limits. 0: none, or no lot report.",
  certification:
    "As the rubric says: 8 for a listing in the directory of a programme that tests for substances banned in sport; 4 for a contents-only certification listing; 0 for a badge with no matching listing. Gluten-free and non-GMO marks are not counted.",
  amount: "8: the amount of every active ingredient per serving. 4: the total collagen or protein per serving only, or some actives without amounts. 0: no amount we could find.",
  source: "4: the animal (and fish species where relevant) named for every collagen source. 2: the source implied (for example “grass-fed”) but the animal not named. 0: not stated.",
  allergen:
    "5: allergen ingredients declared, or none in the product. 3: only a shared-equipment warning seen for a product that contains an allergen source. 0: an allergen source with no declaration.",
  blend: "6: every active ingredient listed with its amount, or a single ingredient. 0: a named blend or complex whose parts have no amounts.",
  "claims-match":
    "Start at 15. Take off 2 for each benefit area claimed where this site rates the human evidence as limited, and 4 where it is preclinical or no human trials were found. Claims in areas this site has not rated (for example nails, recovery, satiety) are listed but not scored. Ratings used: skin consistent; joints and bone mixed; tendons and ligaments limited; hair limited; muscle mass with training consistent; gut none; sleep limited.",
  "dose-match":
    "5: no study cited (nothing to compare), or cited trials used a similar daily dose. 3: some cited trials used a similar dose and some a very different one. 2: the page appeals to “studies” or “clinically studied” ingredients without naming a paper, so the dose cannot be compared. 0: cited trials used a clearly different dose throughout.",
  "cites-real":
    "5: no study cited, or every cited paper can be found and is described accurately. 2: an appeal to studies without naming them, so a reader cannot find them. 0: a cited paper cannot be found or is misdescribed.",
  category: "5: sold as a dietary supplement with the FDA statement, no “research use only” labelling. 0 otherwise.",
  identity:
    "5: legal name, postal address and a contact route on the seller's site. 3: two of the three. 1: one. 0: none.",
};

// ---------- shared sources ----------
const NSF_SPORT_LIST = { label: "NSF Certified for Sport list (search “collagen”)", href: "https://www.nsfsport.com/certified-products/search-results.php?search=collagen" };
const nsf173 = (company: string) => ({
  label: `NSF/ANSI 173 listings for “${company}”`,
  href: `https://info.nsf.org/Certified/Dietary/Listings.asp?CompanyName=${encodeURIComponent(company)}&Standard=173`,
});
const COLLAGEN_PAGE = { label: "Our collagen documentation check", href: "/peptides/best-collagen-peptides" };
const TOPIC = {
  skin: { label: "Skin evidence", href: "/science/topics/skin" },
  joints: { label: "Joint and tendon evidence", href: "/science/topics/joints" },
  hair: { label: "Hair evidence", href: "/science/topics/hair" },
  muscle: { label: "Muscle evidence", href: "/science/topics/muscle" },
  bone: { label: "Bone evidence (women's health)", href: "/science/topics/womens-health" },
  gut: { label: "Gut evidence", href: "/science/topics/gut" },
  sleep: { label: "Sleep evidence", href: "/science/topics/brain" },
};

const NO_LOT = (page: Source): Score => ({ points: 0, note: "No public lot report, so this criterion cannot be scored above 0.", sources: [page] });
const SUPPLEMENT = (page: Source): Score => ({ points: 5, note: "Sold as a dietary supplement, with the FDA statement on the page.", sources: [page] });
const NONE_CITED = (page: Source): Score => ({ points: 5, note: "No study is cited for the product, so there is nothing to compare.", sources: [page] });
const NO_ALLERGEN = (page: Source, what = "single-ingredient bovine collagen"): Score => ({
  points: 5,
  note: `No major allergen in the ingredients (${what}).`,
  sources: [page],
});
const SINGLE = (page: Source): Score => ({ points: 6, note: "Single ingredient; no blend.", sources: [page] });

// ---------- product pages ----------
const P = {
  momentous: { label: "Momentous product page", href: "https://www.livemomentous.com/products/collagen-peptides" },
  puori: { label: "Puori product page", href: "https://puori.com/products/cp1-pure-collagen-peptides" },
  tl: { label: "Transparent Labs product page", href: "https://www.transparentlabs.com/products/collagen-protein-powder" },
  bubs: { label: "Bubs Naturals product page", href: "https://www.bubsnaturals.com/products/collagen-peptides" },
  thorne: { label: "Thorne product page", href: "https://www.thorne.com/products/dp/collagen-fit" },
  bulk: { label: "BulkSupplements product page", href: "https://www.bulksupplements.com/products/hydrolyzed-bovine-collagen-powder" },
  codeage: { label: "Codeage product page", href: "https://www.codeage.com/products/multi-collagen-protein-powder" },
  vital: { label: "Vital Proteins product page", href: "https://www.vitalproteins.com/products/vp-collagen-peptides" },
  gol: { label: "Garden of Life product page", href: "https://www.gardenoflife.com/collagen-peptides" },
  naked: { label: "Naked Nutrition product page", href: "https://nakednutrition.com/products/collagen-peptides-powder" },
  sr: { label: "Sports Research product page", href: "https://www.sportsresearch.com/products/collagen-peptides-hydrolyzed-gelatin-2" },
  gl: { label: "Great Lakes Wellness product page", href: "https://greatlakeswellness.com/products/16oz-collagen-peptides" },
  orgain: { label: "Orgain product page", href: "https://orgain.com/products/grass-fed-pasture-raised-collagen-peptides" },
  further: { label: "Further Food product page", href: "https://www.furtherfood.com/products/collagen-peptides-powder" },
  ancient: { label: "Ancient Nutrition product page", href: "https://ancientnutrition.com/pages/multi-collagen-100serv2" },
};

const pubmed = (pmid: string, label: string) => ({ label, href: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

export const GRADES: ProductGrade[] = [
  {
    id: "momentous",
    brand: "Momentous",
    product: "Collagen Peptides",
    form: "Bovine collagen peptides with FORTIGEL collagen hydrolysate and vitamin C, powder",
    group: "collagen",
    checkedOn: "2026-11-13",
    documentsCheckedOn: "2026-11-11",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["joints", "tendons", "skin", "muscle"],
    diseaseClaims: false,
    deductions: [],
    summary: "Lot reports for sale lots and an NSF Certified for Sport listing; the reports give protein but no identity test, and no limits for metals.",
    scores: {
      "coa-batch": {
        points: 10,
        note: "A public library has one PDF per lot. The reports are titled “Performance Collagen”; the product page now lists the same formula (11.6 g collagen peptides, 5.2 g FORTIGEL, vitamin C), so we treat them as the same product.",
        sources: [
          { label: "Momentous certificate library", href: "https://www.livemomentous.com/pages/coa-page" },
          { label: "Report, lot 0277B6B", href: "https://www.livemomentous.com/cdn/shop/files/Collagen_Peptides_0277B6B.pdf" },
          P.momentous,
        ],
      },
      "coa-lab": {
        points: 5,
        note: "SGS is named for the heavy-metal test; protein and vitamin C were measured by the company's own methods. No accreditation is stated on the reports, and we did not look one up.",
        sources: [{ label: "Report, lot 0088A6A", href: "https://www.livemomentous.com/cdn/shop/files/Collagen_Peptide_0088A6A.pdf" }],
      },
      "coa-numbers": {
        points: 5,
        note: "Protein 17.6 g and 16.1 g per serving against a 15 g label claim (specification printed). No identity test for collagen.",
        sources: [{ label: "Report, lot 0277B6B", href: "https://www.livemomentous.com/cdn/shop/files/Collagen_Peptides_0277B6B.pdf" }],
      },
      "coa-contaminants": {
        points: 4,
        note: "Heavy metals and microbes are both reported. Microbes have specifications; the metals are marked “Report Only”, with no limit.",
        sources: [{ label: "Report, lot 0277B6B", href: "https://www.livemomentous.com/cdn/shop/files/Collagen_Peptides_0277B6B.pdf" }],
      },
      certification: {
        points: 8,
        note: "“MOMENTOUS COLLAGEN PEPTIDES” is in NSF's Certified for Sport list (also an NSF/ANSI 173 listing).",
        sources: [NSF_SPORT_LIST, nsf173("Momentous")],
      },
      amount: { points: 8, note: "Collagen peptides 11.6 g, FORTIGEL 5.2 g and vitamin C 50 mg per serving are listed.", sources: [P.momentous] },
      source: { points: 4, note: "The reports name the collagen as bovine (skin).", sources: [{ label: "Report, lot 0277B6B", href: "https://www.livemomentous.com/cdn/shop/files/Collagen_Peptides_0277B6B.pdf" }] },
      allergen: NO_ALLERGEN(P.momentous, "bovine collagen and vitamin C"),
      blend: { points: 6, note: "Each ingredient is listed with its amount.", sources: [P.momentous] },
      "claims-match": {
        points: 13,
        note: "Claims joints and mobility (rated mixed), tendons and ligaments (limited, −2), skin (consistent) and lean muscle with recovery (muscle mass consistent; recovery not rated).",
        sources: [P.momentous, TOPIC.joints, TOPIC.skin, TOPIC.muscle],
      },
      "dose-match": {
        points: 3,
        note: "The page cites four trials. Two used doses close to this product's 16.8 g of collagen (20 g; 15 g); two used much less (5 g; 1.2 g). None tested this product.",
        sources: [
          pubmed("30783776", "Clifford 2019 (20 g)"),
          pubmed("38035363", "Bischof 2023 (15 g)"),
          pubmed("29337906", "König 2018 (5 g)"),
          pubmed("22500661", "Bruyère 2012 (1.2 g)"),
        ],
      },
      "cites-real": {
        points: 5,
        note: "All five cited papers (four trials and a review) exist at the links given; the page lists them by title without misdescribing them.",
        sources: [P.momentous, { label: "Cited review (PMC)", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11842160/" }],
      },
      category: SUPPLEMENT(P.momentous),
      identity: {
        points: 5,
        note: "AmpHP, Inc., d/b/a Momentous, with a postal address and email, in the privacy policy.",
        sources: [{ label: "Momentous privacy policy", href: "https://www.livemomentous.com/policies/privacy-policy" }],
      },
    },
  },
  {
    id: "puori",
    brand: "Puori",
    product: "CP1 Pure Collagen Peptides",
    form: "Bovine collagen peptides, single ingredient, powder",
    group: "collagen",
    checkedOn: "2026-11-13",
    documentsCheckedOn: "2026-11-11",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["skin", "joints", "tendons", "bone", "hair"],
    diseaseClaims: false,
    deductions: [],
    summary: "Batch reports from an accredited lab, but the latest report has the protein test pending and no microbe test is shown.",
    scores: {
      "coa-batch": {
        points: 10,
        note: "Clean Label Project publishes a report per batch, found by batch number or QR code.",
        sources: [P.puori, { label: "Report, batch B2512111", href: "https://cleanlabelproject.org/wp-content/uploads/CP1-Pure-Collagen-Peptides-Batch-Number-B2512111-1.pdf" }],
      },
      "coa-lab": {
        points: 6,
        note: "Ellipse Analytics, ISO/IEC 17025 accredited by ANAB (certificate L2441, checked in ANAB's directory). The scope we read covers heavy metals, pesticides and bisphenols in supplements; protein and glyphosate in supplements are not in it.",
        sources: [
          { label: "ANAB directory (search “Ellipse”)", href: "https://search.anab.org/" },
          {
            label: "Ellipse accreditation scope",
            href: "https://search.anab.org/public/organization_files/Third-Party-Validation-and-Verification-LLC-dba-Ellipse-Analytics-Cert-and-Scope-File-02-25-2026_1772035074.pdf",
          },
        ],
      },
      "coa-numbers": {
        points: 3,
        note: "One of four reports (August 2023) gives protein, 10.30 g against 9 g claimed. The latest (March 2026) shows the label-claim test as “Pending”, and two 2023 reports show “Not Run” or “ND” beside a pass.",
        sources: [
          { label: "Report, batch 104804", href: "https://cleanlabelproject.org/wp-content/uploads/securepdfs/CP1-Pure-Collagen-Peptides-Batch-Number-104804.pdf" },
          { label: "Report, batch B2512111", href: "https://cleanlabelproject.org/wp-content/uploads/CP1-Pure-Collagen-Peptides-Batch-Number-B2512111-1.pdf" },
        ],
      },
      "coa-contaminants": {
        points: 4,
        note: "Heavy metals with limits (Proposition 65 levels), plus pesticides, bisphenols and glyphosate. No microbe test in the summaries we read.",
        sources: [{ label: "Report, batch B2512111", href: "https://cleanlabelproject.org/wp-content/uploads/CP1-Pure-Collagen-Peptides-Batch-Number-B2512111-1.pdf" }],
      },
      certification: {
        points: 4,
        note: "Clean Label Project certification; the batch reports are published on Clean Label Project's own site. It is a contaminant programme, not a sport (banned-substance) programme, so it counts as contents-only.",
        sources: [P.puori, { label: "Report on Clean Label Project's site", href: "https://cleanlabelproject.org/wp-content/uploads/CP1-Pure-Collagen-Peptides-Batch-Number-B2512111-1.pdf" }],
      },
      amount: { points: 8, note: "10 g of collagen peptides (9 g protein) per serving.", sources: [P.puori] },
      source: { points: 4, note: "Grass-fed bovine collagen, types I and III.", sources: [P.puori] },
      allergen: NO_ALLERGEN(P.puori),
      blend: SINGLE(P.puori),
      "claims-match": {
        points: 11,
        note: "Claims skin (consistent), joints (mixed), bones (mixed), tendons and connective tissue (limited, −2) and hair and nails (hair limited, −2; nails not rated).",
        sources: [P.puori, TOPIC.skin, TOPIC.joints, TOPIC.hair],
      },
      "dose-match": NONE_CITED(P.puori),
      "cites-real": NONE_CITED(P.puori),
      category: SUPPLEMENT(P.puori),
      identity: {
        points: 5,
        note: "Puori Inc., with a registered office address in Larkspur, California, and a contact email.",
        sources: [{ label: "Puori terms of service", href: "https://puori.com/policies/terms-of-service" }],
      },
    },
  },
  {
    id: "transparent-labs",
    brand: "Transparent Labs",
    product: "Grass-Fed Collagen",
    form: "Bovine hide collagen peptides, powder",
    group: "collagen",
    checkedOn: "2026-11-13",
    documentsCheckedOn: "2026-11-11",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["skin", "joints", "hair", "bone"],
    diseaseClaims: false,
    deductions: [],
    summary: "Lot reports with limits for metals and microbes, a collagen-content report and an Informed Choice listing; the company gives only an email as its identity.",
    scores: {
      "coa-batch": {
        points: 8,
        note: "A searchable test page lists lots with PDFs (12 collagen entries when we looked); the Informed Choice registry lists more batches than the page has reports for.",
        sources: [{ label: "Transparent Labs third-party tests", href: "https://www.transparentlabs.com/pages/third-party-tests" }],
      },
      "coa-lab": {
        points: 5,
        note: "Advanced Laboratories (metals and microbes) and Dyad Labs, on behalf of Mérieux NutriSciences (collagen and protein), are named. The protein test is marked ISO/IEC 17025 accredited on the report; we did not check the accreditor's directory.",
        sources: [
          { label: "Content report, lot 25091091", href: "https://cdn.shopify.com/s/files/1/0866/7664/files/COA_Report_S-20251020-4687_1763758532326.pdf?v=1768864112" },
          {
            label: "Metals and microbes report, lot 26041533",
            href: "https://cdn.shopify.com/s/files/1/0866/7664/files/TPL_Collagen_WS_Vanilla_30_SERV_-_26041533_-_Heavy_Metals_Micro.pdf?v=1779717453",
          },
        ],
      },
      "coa-numbers": {
        points: 7,
        note: "Unflavoured lot 25091091: collagen 22.2 g per serving (specification 19.98 to 26.64 g) and protein 20.7 g (18 to 24 g). The method for the collagen result is not named.",
        sources: [{ label: "Content report, lot 25091091", href: "https://cdn.shopify.com/s/files/1/0866/7664/files/COA_Report_S-20251020-4687_1763758532326.pdf?v=1768864112" }],
      },
      "coa-contaminants": {
        points: 6,
        note: "Arsenic, cadmium, mercury and lead, and six microbe tests, each with a printed limit. Lead in the vanilla lot was 0.45 µg against a 0.5 µg limit.",
        sources: [
          {
            label: "Metals and microbes report, lot 26041533",
            href: "https://cdn.shopify.com/s/files/1/0866/7664/files/TPL_Collagen_WS_Vanilla_30_SERV_-_26041533_-_Heavy_Metals_Micro.pdf?v=1779717453",
          },
        ],
      },
      certification: {
        points: 8,
        note: "Listed in the Informed Choice registry (certified 31 July 2023). Informed Choice tests for substances banned in sport.",
        sources: [{ label: "Informed Choice registry entry", href: "https://choice.wetestyoutrust.com/ja/node/413514" }],
      },
      amount: { points: 8, note: "22 g of hydrolysed bovine collagen per serving.", sources: [P.tl] },
      source: { points: 4, note: "Grass-fed bovine hide.", sources: [P.tl] },
      allergen: NO_ALLERGEN(P.tl, "bovine collagen"),
      blend: SINGLE(P.tl),
      "claims-match": {
        points: 13,
        note: "Claims skin hydration and fewer wrinkles (consistent), joints and cartilage (mixed), bone density (mixed) and strong hair (limited, −2).",
        sources: [P.tl, TOPIC.skin, TOPIC.joints, TOPIC.hair],
      },
      "dose-match": {
        points: 2,
        note: "The page refers to “clinically-validated dosages” without naming a study, so the dose cannot be compared.",
        sources: [P.tl],
      },
      "cites-real": { points: 2, note: "The appeal to clinical validation names no paper a reader could find.", sources: [P.tl] },
      category: SUPPLEMENT(P.tl),
      identity: {
        points: 1,
        note: "Only a support email; we found no legal name or postal address on the product page or terms of service.",
        sources: [P.tl, { label: "Transparent Labs terms of service", href: "https://www.transparentlabs.com/policies/terms-of-service" }],
      },
    },
  },
  {
    id: "bubs",
    brand: "Bubs Naturals",
    product: "Collagen Peptides",
    form: "Bovine collagen peptides, single ingredient, powder",
    group: "collagen",
    checkedOn: "2026-11-13",
    documentsCheckedOn: "2026-11-11",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["skin", "hair"],
    diseaseClaims: false,
    deductions: [],
    summary: "Clear label and an NSF Certified for Sport listing, but no public lot report, which caps the band.",
    scores: {
      "coa-batch": { points: 0, note: "No public lot report; the brand's blog says to contact the company for a certificate.", sources: [P.bubs, COLLAGEN_PAGE] },
      "coa-lab": NO_LOT(P.bubs),
      "coa-numbers": NO_LOT(P.bubs),
      "coa-contaminants": NO_LOT(P.bubs),
      certification: { points: 8, note: "“Bubs Naturals Collagen Peptides” is in NSF's Certified for Sport list.", sources: [NSF_SPORT_LIST] },
      amount: { points: 8, note: "20 g of bovine collagen peptides per 20 g scoop.", sources: [P.bubs] },
      source: { points: 4, note: "Grass-fed, pasture-raised bovine.", sources: [P.bubs] },
      allergen: NO_ALLERGEN(P.bubs),
      blend: SINGLE(P.bubs),
      "claims-match": {
        points: 13,
        note: "Says collagen may enhance skin elasticity and hydration (consistent) and contribute to stronger hair (limited, −2) and nails (not rated).",
        sources: [P.bubs, TOPIC.skin, TOPIC.hair],
      },
      "dose-match": NONE_CITED(P.bubs),
      "cites-real": NONE_CITED(P.bubs),
      category: SUPPLEMENT(P.bubs),
      identity: {
        points: 5,
        note: "Slayer Forever LLC, with a Salt Lake City address, in the terms of service; the site has a contact route.",
        sources: [{ label: "Bubs Naturals terms of service", href: "https://www.bubsnaturals.com/policies/terms-of-service" }],
      },
    },
  },
  {
    id: "thorne",
    brand: "Thorne",
    product: "Collagen Fit",
    form: "Bovine collagen peptides with nicotinamide riboside and betaine, powder",
    group: "collagen",
    checkedOn: "2026-11-13",
    documentsCheckedOn: "2026-11-11",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["joints", "tendons", "bone", "skin", "muscle", "sleep"],
    diseaseClaims: false,
    deductions: [],
    summary: "Full label and an NSF Certified for Sport listing, but no public lot report, which caps the band.",
    scores: {
      "coa-batch": { points: 0, note: "No lot report found; the product page does not mention one.", sources: [P.thorne] },
      "coa-lab": NO_LOT(P.thorne),
      "coa-numbers": NO_LOT(P.thorne),
      "coa-contaminants": NO_LOT(P.thorne),
      certification: { points: 8, note: "“Collagen Fit” is in NSF's Certified for Sport list (also an NSF/ANSI 173 listing).", sources: [NSF_SPORT_LIST, nsf173("Thorne")] },
      amount: { points: 8, note: "Collagen peptides 15 g, nicotinamide riboside 125 mg and betaine 50 mg per scoop.", sources: [P.thorne] },
      source: { points: 4, note: "Bovine.", sources: [P.thorne] },
      allergen: NO_ALLERGEN(P.thorne, "bovine collagen, nicotinamide riboside, betaine"),
      blend: { points: 6, note: "Each ingredient is listed with its amount.", sources: [P.thorne] },
      "claims-match": {
        points: 11,
        note: "Claims joints, bones and skin (consistent or mixed), lean muscle (consistent), tendons and ligaments (limited, −2) and, among the benefits of collagen peptides, the sleep-wake cycle (limited, −2). Recovery and healthy ageing are not rated.",
        sources: [P.thorne, TOPIC.joints, TOPIC.sleep],
      },
      "dose-match": NONE_CITED(P.thorne),
      "cites-real": NONE_CITED(P.thorne),
      category: SUPPLEMENT(P.thorne),
      identity: {
        points: 5,
        note: "Thorne Research, Inc., with a Summerville, South Carolina address, and a support email.",
        sources: [{ label: "Thorne terms of use", href: "https://www.thorne.com/terms-of-use" }],
      },
    },
  },
  {
    id: "bulksupplements",
    brand: "BulkSupplements",
    product: "Hydrolyzed Bovine Collagen",
    form: "Bovine collagen peptides, single ingredient, powder",
    group: "collagen",
    checkedOn: "2026-11-13",
    documentsCheckedOn: "2026-11-11",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["skin", "joints", "bone"],
    diseaseClaims: false,
    deductions: [],
    summary: "Modest claims and an NSF Certified for Sport listing; certificates only on request, which caps the band.",
    scores: {
      "coa-batch": {
        points: 0,
        note: "A support article says a certificate is available for each product through a request form; nothing is published.",
        sources: [{ label: "Support article on certificates", href: "https://support.bulksupplements.com/hc/en-us/articles/360003612254-Do-you-a-provide-COA-for-your-products" }],
      },
      "coa-lab": NO_LOT(P.bulk),
      "coa-numbers": NO_LOT(P.bulk),
      "coa-contaminants": NO_LOT(P.bulk),
      certification: { points: 8, note: "“BOVINE COLLAGEN” under BulkSupplements is in NSF's Certified for Sport list.", sources: [NSF_SPORT_LIST] },
      amount: { points: 8, note: "11 g serving of a single ingredient.", sources: [P.bulk] },
      source: { points: 4, note: "Bovine collagen.", sources: [P.bulk] },
      allergen: NO_ALLERGEN(P.bulk),
      blend: SINGLE(P.bulk),
      "claims-match": {
        points: 15,
        note: "Claims connective tissue, bone and joint support and skin (consistent or mixed). No claim in an area rated limited or lower.",
        sources: [P.bulk, TOPIC.skin, TOPIC.joints],
      },
      "dose-match": NONE_CITED(P.bulk),
      "cites-real": NONE_CITED(P.bulk),
      category: SUPPLEMENT(P.bulk),
      identity: {
        points: 3,
        note: "A Henderson, Nevada address and a legal department under the name BulkSupplements.com; we found no company's legal name.",
        sources: [{ label: "BulkSupplements terms of service", href: "https://www.bulksupplements.com/policies/terms-of-service" }],
      },
    },
  },
  {
    id: "codeage",
    brand: "Codeage",
    product: "Multi Collagen Peptides",
    form: "Collagen from five sources (bovine, chicken, beef broth, fish, eggshell membrane), powder",
    group: "collagen",
    checkedOn: "2026-11-13",
    documentsCheckedOn: "2026-11-11",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: [],
    diseaseClaims: false,
    deductions: [],
    summary: "Allergens declared and no health claims, but the five-source complex has no amounts and there is no public lot report.",
    scores: {
      "coa-batch": { points: 0, note: "No lot report found. The page says the product is independently tested for purity, potency and label accuracy.", sources: [P.codeage] },
      "coa-lab": NO_LOT(P.codeage),
      "coa-numbers": NO_LOT(P.codeage),
      "coa-contaminants": NO_LOT(P.codeage),
      certification: { points: 4, note: "NSF/ANSI 173 (contents) listings for Multi Collagen Peptides. Not in NSF's Certified for Sport list.", sources: [nsf173("Codeage")] },
      amount: {
        points: null,
        note: "We could not find the amount of collagen per serving on the page; it gives amino acids per serving instead.",
        sources: [P.codeage],
      },
      source: { points: 4, note: "Each source is named, including the fish species (cod, snapper).", sources: [P.codeage] },
      allergen: { points: 5, note: "“Contains: Fish (Cod, Snapper), Egg.”", sources: [P.codeage] },
      blend: { points: 0, note: "A “Multi-Collagen Complex” of five sources with no amount for each.", sources: [P.codeage] },
      "claims-match": { points: 15, note: "We saw no specific health claim on the page (only collagen types, amino acids and testing).", sources: [P.codeage] },
      "dose-match": NONE_CITED(P.codeage),
      "cites-real": NONE_CITED(P.codeage),
      category: SUPPLEMENT(P.codeage),
      identity: {
        points: 5,
        note: "Codeage LLC, with a Boca Raton, Florida address, and phone, chat and email support.",
        sources: [{ label: "Codeage terms of service", href: "https://www.codeage.com/policies/terms-of-service" }],
      },
    },
  },
  {
    id: "vital-proteins",
    brand: "Vital Proteins",
    product: "Collagen Peptides (unflavoured)",
    form: "Bovine hide collagen peptides, single ingredient, powder",
    group: "collagen",
    checkedOn: "2026-11-13",
    documentsCheckedOn: "2026-11-11",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["skin", "hair", "bone", "joints"],
    diseaseClaims: false,
    deductions: [],
    summary: "NSF listings but no public lot report, and the page text gives no amount per serving.",
    scores: {
      "coa-batch": { points: 0, note: "No lot report found; the page has no testing information beyond an NSF mark.", sources: [P.vital] },
      "coa-lab": NO_LOT(P.vital),
      "coa-numbers": NO_LOT(P.vital),
      "coa-contaminants": NO_LOT(P.vital),
      certification: {
        points: 8,
        note: "Vital Proteins collagen peptide products are in NSF's Certified for Sport list, and Collagen Peptides has an NSF/ANSI 173 listing under Nestlé Healthcare Nutrition, Inc. DBA Vital Proteins.",
        sources: [NSF_SPORT_LIST, nsf173("Nestle Healthcare")],
      },
      amount: {
        points: null,
        note: "We could not find the amount per serving in the page text (the nutrition panel may be an image we could not read).",
        sources: [P.vital],
      },
      source: { points: 4, note: "Single ingredient from bovine hide.", sources: [P.vital] },
      allergen: NO_ALLERGEN(P.vital),
      blend: SINGLE(P.vital),
      "claims-match": {
        points: 13,
        note: "Claims skin, bones and joints (consistent or mixed), flexibility (not rated), and hair (limited, −2) and nails (not rated).",
        sources: [P.vital, TOPIC.skin, TOPIC.hair],
      },
      "dose-match": {
        points: 2,
        note: "“Various studies have suggested benefits” with no study named, so the dose cannot be compared.",
        sources: [P.vital],
      },
      "cites-real": { points: 2, note: "The appeal to studies names no paper.", sources: [P.vital] },
      category: SUPPLEMENT(P.vital),
      identity: {
        points: 5,
        note: "Vital Proteins, LLC, with a Franklin Park, Illinois address, in the terms.",
        sources: [{ label: "Vital Proteins terms", href: "https://www.vitalproteins.com/policies/terms-of-service" }],
      },
    },
  },
  {
    id: "garden-of-life",
    brand: "Garden of Life",
    product: "Grass Fed Collagen Peptides",
    form: "Grass-fed collagen peptides with a probiotic, powder",
    group: "collagen",
    checkedOn: "2026-11-13",
    documentsCheckedOn: "2026-11-13",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["joints", "skin", "hair"],
    diseaseClaims: false,
    deductions: [],
    summary: "No lot report and no certification listing for this product (NSF lists other Garden of Life collagens).",
    scores: {
      "coa-batch": { points: 0, note: "No lot report found.", sources: [P.gol] },
      "coa-lab": NO_LOT(P.gol),
      "coa-numbers": NO_LOT(P.gol),
      "coa-contaminants": NO_LOT(P.gol),
      certification: {
        points: 0,
        note: "NSF's dietary-supplement listings for Garden of Life include two other collagen products (a turmeric multi-sourced collagen and a collagen with hyaluronic acid), not this one. The page cites non-GMO and gluten-free marks, which are not counted.",
        sources: [nsf173("Garden of Life"), P.gol],
      },
      amount: { points: 8, note: "20 g collagen and 250 million CFU of Bacillus coagulans per serving.", sources: [P.gol] },
      source: { points: 2, note: "“Grass-fed and pasture-raised”; the animal is not named in the page text we read.", sources: [P.gol] },
      allergen: NO_ALLERGEN(P.gol, "collagen and a probiotic"),
      blend: { points: 6, note: "Both actives have amounts.", sources: [P.gol] },
      "claims-match": {
        points: 13,
        note: "Claims joints and mobility (mixed), skin (consistent), and hair (limited, −2) and nails (not rated).",
        sources: [P.gol, TOPIC.joints, TOPIC.hair],
      },
      "dose-match": { points: 2, note: "“Clinically studied probiotics” with no study named.", sources: [P.gol] },
      "cites-real": { points: 2, note: "The appeal to clinical study names no paper.", sources: [P.gol] },
      category: SUPPLEMENT(P.gol),
      identity: {
        points: 3,
        note: "Garden of Life, LLC, with a customer-service phone and email; we found no postal address in the terms.",
        sources: [{ label: "Garden of Life terms of use", href: "https://www.gardenoflife.com/terms-of-use" }],
      },
    },
  },
  {
    id: "naked-nutrition",
    brand: "Naked Nutrition",
    product: "Collagen Peptides",
    form: "Bovine hide collagen peptides, single ingredient, powder",
    group: "collagen",
    checkedOn: "2026-11-13",
    documentsCheckedOn: "2026-11-13",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["skin", "hair", "joints"],
    diseaseClaims: false,
    deductions: [],
    summary: "Claims NSF contents certification, but NSF's registry lists no Naked collagen; no lot report.",
    scores: {
      "coa-batch": { points: 0, note: "No public lot report found.", sources: [P.naked] },
      "coa-lab": NO_LOT(P.naked),
      "coa-numbers": NO_LOT(P.naked),
      "coa-contaminants": NO_LOT(P.naked),
      certification: {
        points: 0,
        note: "The page says “Contents Certified by NSF”. On 13 November 2026 NSF's dietary-supplement registry listed seven Naked Whey, Inc products (energy and creatine powders) and no collagen. It may be listed under another name; we found none.",
        sources: [nsf173("naked"), P.naked],
      },
      amount: { points: 4, note: "9 g of protein per serving is stated; the amount of collagen per serving is not given separately.", sources: [P.naked] },
      source: { points: 4, note: "Bovine hide from European pasture-raised cows.", sources: [P.naked] },
      allergen: NO_ALLERGEN(P.naked),
      blend: SINGLE(P.naked),
      "claims-match": {
        points: 13,
        note: "Claims skin (consistent), joints (mixed), and hair (limited, −2) and nails (not rated).",
        sources: [P.naked, TOPIC.skin, TOPIC.hair],
      },
      "dose-match": {
        points: 2,
        note: "The benefit text has numbered footnotes, but we found no reference list on the page, so no dose can be compared.",
        sources: [P.naked],
      },
      "cites-real": { points: 2, note: "Footnote numbers with no reference list we could find.", sources: [P.naked] },
      category: SUPPLEMENT(P.naked),
      identity: {
        points: 3,
        note: "Naked Whey, Inc. is named in the terms, with a contact route; we found no postal address on the seller's site (NSF's listing gives one).",
        sources: [{ label: "Naked Nutrition terms of use", href: "https://nakednutrition.com/policies/terms-of-service" }],
      },
    },
  },
  {
    id: "sports-research",
    brand: "Sports Research",
    product: "Collagen Peptides",
    form: "Bovine collagen peptides, single ingredient, powder",
    group: "collagen",
    checkedOn: "2026-11-13",
    documentsCheckedOn: "2026-11-13",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["joints", "skin"],
    diseaseClaims: false,
    deductions: [],
    summary: "Modest claims and an Informed Choice listing; no public lot report, which caps the band.",
    scores: {
      "coa-batch": { points: 0, note: "No public lot report found.", sources: [P.sr] },
      "coa-lab": NO_LOT(P.sr),
      "coa-numbers": NO_LOT(P.sr),
      "coa-contaminants": NO_LOT(P.sr),
      certification: {
        points: 8,
        note: "Informed Choice's registry search lists “Collagen Peptides Powder” under Sports Research. The listing page itself was behind a bot check, so we could not read its dates.",
        sources: [{ label: "Informed Choice registry search", href: "https://choice.wetestyoutrust.com/search/node?keys=Sports+Research+Collagen+Peptides" }],
      },
      amount: { points: 8, note: "11 g of collagen peptides per scoop, single ingredient.", sources: [P.sr] },
      source: { points: 4, note: "Bovine.", sources: [P.sr] },
      allergen: NO_ALLERGEN(P.sr),
      blend: SINGLE(P.sr),
      "claims-match": {
        points: 15,
        note: "Claims healthy joints (mixed) and skin (consistent); workout recovery and nails are not rated.",
        sources: [P.sr, TOPIC.joints, TOPIC.skin],
      },
      "dose-match": NONE_CITED(P.sr),
      "cites-real": NONE_CITED(P.sr),
      category: SUPPLEMENT(P.sr),
      identity: {
        points: 3,
        note: "Sports Research Corporation is named (copyright line) and the site has a support route; we found no postal address (the terms link returned an error).",
        sources: [P.sr],
      },
    },
  },
  {
    id: "great-lakes",
    brand: "Great Lakes Wellness",
    product: "Collagen Peptides",
    form: "Grass-fed bovine collagen peptides, powder",
    group: "collagen",
    checkedOn: "2026-11-13",
    documentsCheckedOn: "2026-11-11",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["skin", "hair", "joints", "gut"],
    diseaseClaims: false,
    deductions: [],
    summary: "Says an outside lab tests each batch, but no lab is named and no report or listing is published; claims digestion, where no human trials were found.",
    scores: {
      "coa-batch": { points: 0, note: "The page says products are tested by an independent third-party lab; no report is published.", sources: [P.gl, { label: "FAQ page", href: "https://greatlakeswellness.com/pages/faqs" }] },
      "coa-lab": NO_LOT(P.gl),
      "coa-numbers": NO_LOT(P.gl),
      "coa-contaminants": NO_LOT(P.gl),
      certification: { points: 0, note: "No NSF or Informed Choice listing found; the non-GMO mark is not counted.", sources: [P.gl, COLLAGEN_PAGE] },
      amount: { points: 8, note: "20 g of grass-fed bovine collagen peptides per serving.", sources: [P.gl] },
      source: { points: 4, note: "Grass-fed bovine.", sources: [P.gl] },
      allergen: NO_ALLERGEN(P.gl),
      blend: SINGLE(P.gl),
      "claims-match": {
        points: 9,
        note: "Claims skin (consistent), joints (mixed), hair (limited, −2), digestion (no human trials found for collagen and gut health, −4) and nails (not rated).",
        sources: [P.gl, TOPIC.hair, TOPIC.gut],
      },
      "dose-match": NONE_CITED(P.gl),
      "cites-real": NONE_CITED(P.gl),
      category: SUPPLEMENT(P.gl),
      identity: {
        points: 3,
        note: "Great Lakes Wellness, LLC, with a contact email; we found no postal address in the terms.",
        sources: [{ label: "Great Lakes Wellness terms", href: "https://greatlakeswellness.com/policies/terms-of-service" }],
      },
    },
  },
  {
    id: "orgain",
    brand: "Orgain",
    product: "Grass Fed Pasture Raised Collagen Peptides",
    form: "Collagen peptides, powder",
    group: "collagen",
    checkedOn: "2026-11-13",
    documentsCheckedOn: "2026-11-13",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["joints", "skin", "hair"],
    diseaseClaims: false,
    deductions: [],
    summary: "Clear amount and modest claims, but no lot report, no certification listing and the animal is not named.",
    scores: {
      "coa-batch": { points: 0, note: "No lot report found.", sources: [P.orgain] },
      "coa-lab": NO_LOT(P.orgain),
      "coa-numbers": NO_LOT(P.orgain),
      "coa-contaminants": NO_LOT(P.orgain),
      certification: { points: 0, note: "No NSF or Informed Choice listing found; the non-GMO mark is not counted.", sources: [P.orgain, COLLAGEN_PAGE] },
      amount: { points: 8, note: "20 g of collagen peptides per serving.", sources: [P.orgain] },
      source: { points: 2, note: "“Grass-fed, pasture-raised”; the animal is not named in the page text we read.", sources: [P.orgain] },
      allergen: NO_ALLERGEN(P.orgain, "collagen peptides"),
      blend: SINGLE(P.orgain),
      "claims-match": {
        points: 13,
        note: "Claims healthy joints (mixed), skin (consistent), and hair (limited, −2) and nails (not rated).",
        sources: [P.orgain, TOPIC.hair],
      },
      "dose-match": NONE_CITED(P.orgain),
      "cites-real": NONE_CITED(P.orgain),
      category: SUPPLEMENT(P.orgain),
      identity: {
        points: 3,
        note: "Orgain LLC is named, with a contact route; we found no postal address in the terms.",
        sources: [P.orgain],
      },
    },
  },
  {
    id: "further-food",
    brand: "Further Food",
    product: "Unflavored Collagen Peptides",
    form: "Collagen peptides, single ingredient, powder",
    group: "collagen",
    checkedOn: "2026-11-13",
    documentsCheckedOn: "2026-11-13",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["skin", "hair", "gut", "joints", "bone", "muscle", "tendons"],
    diseaseClaims: false,
    deductions: [],
    summary: "Broad claims, including repairing the gut lining, with no lot report, no listing and no amount per serving in the page text.",
    scores: {
      "coa-batch": { points: 0, note: "The page says the product is independently lab verified; no report or lab is named.", sources: [P.further] },
      "coa-lab": NO_LOT(P.further),
      "coa-numbers": NO_LOT(P.further),
      "coa-contaminants": NO_LOT(P.further),
      certification: { points: 0, note: "No NSF or Informed Choice listing found; the kosher and cGMP mentions are not counted.", sources: [P.further, COLLAGEN_PAGE] },
      amount: { points: null, note: "We could not find the amount of collagen per serving in the page text.", sources: [P.further] },
      source: { points: 2, note: "“Grass-fed, pasture raised”; the animal is not named in the page text we read.", sources: [P.further] },
      allergen: NO_ALLERGEN(P.further, "collagen peptides"),
      blend: SINGLE(P.further),
      "claims-match": {
        points: 7,
        note: "Claims skin, including hiding cellulite and stretch marks (skin consistent; cellulite not rated), hair (limited, −2), gut inflammation and repairing the intestinal lining (no human trials found, −4), joints, bones and ligaments (ligaments limited, −2), lean mass and fullness (not rated).",
        sources: [P.further, TOPIC.gut, TOPIC.hair, TOPIC.joints],
      },
      "dose-match": { points: 2, note: "“Numerous studies show…” with no study named.", sources: [P.further] },
      "cites-real": { points: 2, note: "The appeal to studies names no paper.", sources: [P.further] },
      category: SUPPLEMENT(P.further),
      identity: {
        points: 3,
        note: "An Englewood, Colorado address and an email are in the terms; we found no company legal name.",
        sources: [{ label: "Further Food terms of service", href: "https://www.furtherfood.com/policies/terms-of-service" }],
      },
    },
  },
  {
    id: "ancient-nutrition",
    brand: "Ancient Nutrition",
    product: "Multi Collagen Protein",
    form: "Multi-source collagen with eggshell membrane, a probiotic and vitamin C, powder",
    group: "collagen",
    checkedOn: "2026-11-13",
    documentsCheckedOn: "2026-11-13",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["joints"],
    diseaseClaims: false,
    deductions: [],
    summary: "Publishes a “typical” certificate that describes no particular lot; the multi-source blend has no amounts per source.",
    scores: {
      "coa-batch": {
        points: 0,
        note: "The certificate the FAQ links to is headed “Typical Certificate of Analysis”, with lot code “Typical for all lots”, issued by Ancient Nutrition Quality. It describes no particular lot.",
        sources: [{ label: "Typical certificate (PDF)", href: "https://s3.amazonaws.com/PDFs_Draxe/COA+Multi+Collagen+Protein+-+Pure+2.0+Version.pdf" }, P.ancient],
      },
      "coa-lab": NO_LOT(P.ancient),
      "coa-numbers": NO_LOT(P.ancient),
      "coa-contaminants": NO_LOT(P.ancient),
      certification: { points: 0, note: "No NSF or Informed Choice listing found; the “third-party testing” badge is not counted.", sources: [P.ancient, COLLAGEN_PAGE] },
      amount: {
        points: 4,
        note: "20 g of collagen, 2 billion CFU of a probiotic and 100% of the daily value of vitamin C per serving; the eggshell membrane and each collagen source have no amount.",
        sources: [P.ancient],
      },
      source: { points: 2, note: "“10 types” of collagen and fermented eggshell membrane; the page text we read does not name every animal source.", sources: [P.ancient] },
      allergen: {
        points: 3,
        note: "The page carries a shared-equipment warning that names fish and egg; we did not see a “Contains” statement for the eggshell membrane (an egg product).",
        sources: [P.ancient],
      },
      blend: { points: 0, note: "A multi-source collagen without the amount of each source.", sources: [P.ancient] },
      "claims-match": {
        points: 15,
        note: "Claims less exercise-induced joint discomfort from the eggshell membrane (joints mixed; eggshell membrane not rated), and gut and immune support from the probiotic and vitamin C (not rated for those ingredients).",
        sources: [P.ancient, TOPIC.joints],
      },
      "dose-match": { points: 2, note: "“Backed by human clinical studies” and “clinically studied ingredients” with no study named.", sources: [P.ancient] },
      "cites-real": { points: 2, note: "The appeal to clinical studies names no paper.", sources: [P.ancient] },
      category: SUPPLEMENT(P.ancient),
      identity: {
        points: 5,
        note: "Ancient Brands, LLC dba Ancient Nutrition, with a Franklin, Tennessee address, in the terms.",
        sources: [{ label: "Ancient Nutrition terms of use", href: "https://ancientnutrition.com/policies/terms-of-service" }],
      },
    },
  },
];

// ---------- scoring ----------
export type BandLabel = "Well documented" | "Documented" | "Partly documented" | "Poorly documented" | "Not graded";
const BAND_MIN: { label: Exclude<BandLabel, "Not graded">; min: number }[] = [
  { label: "Well documented", min: 85 },
  { label: "Documented", min: 65 },
  { label: "Partly documented", min: 40 },
  { label: "Poorly documented", min: 0 },
];
const BAND_RANK: BandLabel[] = ["Well documented", "Documented", "Partly documented", "Poorly documented"];

export const CRITERIA: (Criterion & { category: string })[] = RUBRIC.flatMap((c) => c.criteria.map((k) => ({ ...k, category: c.name })));

export type Result = {
  total: number;
  scorable: number;
  band: BandLabel;
  /** The band the points alone would give, when a cap lowered it. */
  uncapped?: BandLabel;
  caps: string[];
};

export function result(g: ProductGrade): Result {
  const scored = CRITERIA.map((k) => g.scores[k.id]);
  const scorable = scored.filter((s) => s.points !== null).length;
  const raw = scored.reduce((n, s) => n + (s.points ?? 0), 0);
  const deducted = g.deductions.reduce((n, d) => n + (DEDUCTIONS.find((x) => x.id === d.id)?.points ?? 0), 0);
  const total = Math.max(0, raw + deducted);
  if (scorable < Math.ceil(CRITERIA.length / 2)) return { total, scorable, band: "Not graded", caps: ["Fewer than half the criteria could be scored."] };
  const byPoints = BAND_MIN.find((b) => total >= b.min)!.label;
  let band: BandLabel = byPoints;
  const caps: string[] = [];
  const cap = (limit: BandLabel, why: string) => {
    if (BAND_RANK.indexOf(band) < BAND_RANK.indexOf(limit)) {
      band = limit;
      caps.push(why);
    }
  };
  if (!g.scores["coa-batch"].points) cap("Partly documented", "No batch-specific report, so the band cannot be higher than Partly documented.");
  if (g.diseaseClaims) cap("Documented", "Disease claims, so the band cannot be higher than Documented.");
  if (g.deductions.some((d) => d.id === "banned")) cap("Poorly documented", "Banned or undeclared drug substance.");
  return { total, scorable, band, uncapped: band !== byPoints ? byPoints : undefined, caps };
}

export function categoryPoints(g: ProductGrade, categoryId: string) {
  const cat = RUBRIC.find((c) => c.id === categoryId)!;
  return {
    got: cat.criteria.reduce((n, k) => n + (g.scores[k.id].points ?? 0), 0),
    max: cat.criteria.reduce((n, k) => n + k.points, 0),
  };
}

/** Graded products, best documented first (ties by brand). */
export function ranked(group: ProductGrade["group"], area?: ClaimArea) {
  return GRADES.filter((g) => g.group === group && (!area || g.claimAreas.includes(area))).sort(
    (a, b) => result(b).total - result(a).total || a.brand.localeCompare(b.brand),
  );
}

// ---------- build checks ----------
for (const g of GRADES) {
  const ids = new Set(Object.keys(g.scores));
  for (const k of CRITERIA) {
    const s = g.scores[k.id];
    if (!s) throw new Error(`grades: ${g.id} has no score for ${k.id}`);
    if (s.points !== null && (s.points < 0 || s.points > k.points)) throw new Error(`grades: ${g.id} ${k.id} points out of range`);
    if (!s.note.trim() || s.sources.length === 0) throw new Error(`grades: ${g.id} ${k.id} needs a note and a source`);
    if (!SCORING_RULES[k.id]) throw new Error(`grades: no scoring rule for ${k.id}`);
    ids.delete(k.id);
  }
  if (ids.size) throw new Error(`grades: ${g.id} has unknown criteria ${[...ids].join(", ")}`);
  if (g.rubricVersion !== RUBRIC_VERSION) throw new Error(`grades: ${g.id} graded under ${g.rubricVersion}, rubric is ${RUBRIC_VERSION}; regrade it`);
  for (const d of g.deductions) {
    if (!DEDUCTIONS.some((x) => x.id === d.id) || d.sources.length === 0) throw new Error(`grades: ${g.id} has a bad deduction`);
  }
}
if (new Set(GRADES.map((g) => g.id)).size !== GRADES.length) throw new Error("grades: duplicate ids");
if (TOTAL_POINTS !== 100) throw new Error("grades: rubric total is not 100");
