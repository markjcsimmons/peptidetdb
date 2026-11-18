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

/**
 * Benefit areas a seller claims for the product's peptide (or collagen) ingredients, matched to this site's evidence
 * ratings. Used to pick products for each list page. Claims made only for added vitamins or herbs do not count here.
 */
export type ClaimArea =
  | "skin"
  | "joints"
  | "tendons"
  | "bone"
  | "hair"
  | "muscle"
  | "gut"
  | "sleep"
  | "brain"
  | "stress"
  | "blood-pressure"
  | "eye"
  | "immune";

export type ProductGrade = {
  id: string;
  brand: string;
  product: string;
  /** What it is, in a few words. */
  form: string;
  /** Group of products graded together; each group's scoring sheets live on one page (SHEETS_PAGE). */
  group: Group;
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

export type Group = "collagen" | "oral" | "topical";
/** The page that carries each group's full scoring sheets. */
export const SHEETS_PAGE: Record<Group, { path: string; title: string }> = {
  collagen: { path: "/peptides/best-collagen-peptides", title: "best collagen peptides (set below from the count)" },
  oral: { path: "/peptides/oral-peptides", title: "oral peptides: do they get absorbed?" },
  topical: { path: "/peptides/best-peptides-for-skin", title: "best peptides for skin (topical products)" },
};
export const isPurblack = (g: { brand: string }) => /p[üu]rblack/i.test(g.brand);

/** How partial points were given. Shown with the grades. Same rules for every product. */
export const SCORING_RULES: Record<string, string> = {
  "coa-batch":
    "10: public reports for individual lots that a buyer can match to the container. 8: the same, but the public page lists fewer lots than are on sale. 0: no public lot report (including reports sent only on request and “typical” reports that describe no particular lot).",
  "coa-lab":
    "8: named independent lab, accreditation found in the accreditor's own directory for the tests reported. 6: as 8 but the accreditation covers only some of the tests. 5: named independent lab, accreditation not checked or not stated. 2: report from the seller's own lab. 0: no lot report.",
  "coa-numbers":
    "10: identity and content of the active ingredient, with methods, limits and results. 7: collagen or active-ingredient content with limits and results, no separate identity test. 5: protein content only, with a result. 3: a content result in some reports but not the latest, or results that cannot be told apart from formula values (no limits, or every result identical to its target). 0: none, no lot report, or a report whose contents do not match the product's label.",
  "coa-contaminants":
    "6: heavy metals and microbes, each with limits and results. 4: both tested but one group has no stated limits, or only one group tested with limits. 2: one group, no limits. 0: none, or no lot report.",
  certification:
    "As the rubric says: 8 for a listing in the directory of a programme that tests for substances banned in sport; 4 for a contents-only certification listing; 0 for a badge with no matching listing. Since version 1.1, a listing under a former name counts if the directory shows the same brand, its label has the same formula and the seller's page links the listing. Gluten-free and non-GMO marks are not counted.",
  amount:
    "8: the amount of every active ingredient per serving. 4: the total collagen or protein per serving only, or some actives without amounts. 0: no amount we could find. For creams and serums, “amount” means the concentration of each peptide (4 if only some are given, or only the share of a supplier's branded solution).",
  source:
    "4: the animal (and fish species where relevant) named for every collagen or protein source the peptides come from. 2: the source implied (for example “grass-fed”) but the animal not named. 0: not stated (“from natural source” does not count). For creams and serums, naming each peptide by its standard cosmetic ingredient (INCI) name counts as 4, because the name defines the molecule.",
  allergen:
    "5: allergen ingredients declared, or none in the product. 3: only a shared-equipment warning seen for a product that contains an allergen source. 0: an allergen source with no declaration. Could not check (0): the label does not say what the peptides are made from, so we cannot tell whether an allergen such as fish or milk should be declared. For creams and serums, a published full ingredient list counts as 5.",
  blend:
    "6: every active ingredient listed with its amount, or a single ingredient. 0: a named blend or complex whose parts have no amounts. For creams and serums, which list ingredients by name rather than amount, 6 when every branded complex is broken down in the full ingredient list.",
  "claims-match":
    "Start at 15. Take off 2 for each benefit area claimed where this site rates the human evidence as limited, and 4 where it is preclinical or no human trials were found. Claims in areas this site has not rated (for example nails, recovery, satiety) are listed but not scored. A specific claim that rests only on cell or animal results counts as preclinical (−4). Ratings used: collagen for skin consistent; joints and bone mixed; tendons and ligaments limited; hair limited; muscle mass with training consistent; gut none; sleep limited. Food-derived peptides and hydrolysates: sleep, memory, stress and blood pressure limited; eyesight and immune function none. Pürblack's own capsules for muscle, joints and blood vessels limited (uncontrolled studies). Peptides on the skin (cosmetic peptides, GHK-Cu) and on the scalp for hair: limited.",
  "dose-match":
    "5: no human trial cited (nothing to compare), or cited trials used a similar daily dose. 3: some cited trials used a similar dose and some a very different one, or the cited trial's abstract gives no dose. 2: the page appeals to “studies” or “clinically studied” ingredients without naming a paper, so the dose cannot be compared. 0: cited trials used a clearly different dose throughout.",
  "cites-real":
    "5: no study cited, or every cited paper can be found and is described accurately. 3: every cited paper can be found, but with citation errors (wrong journal, year or title). 2: an appeal to studies without naming them, so a reader cannot find them. 0: a cited paper cannot be found in PubMed, is misdescribed (for example animal or cell results presented without saying so), or concerns ingredients the product does not contain.",
  category:
    "5: sold as a dietary supplement with the FDA statement, no “research use only” labelling. 3: as 5, but the packaging carries FDA's name as a logo (for example “FDA registered facility”), which can suggest FDA approval, or a cosmetic claims to change how the body works (for example to boost collagen or improve circulation), which US rules treat as a drug claim. 0 otherwise.",
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
  bpn: { label: "Bare Performance Nutrition product page", href: "https://www.bareperformancenutrition.com/products/collagen-protein" },
  gnarly: { label: "Gnarly Nutrition product page", href: "https://gognarly.com/products/gnarly-collagen-pro" },
  bulletproof: { label: "Bulletproof product page", href: "https://www.bulletproof.com/products/collagen-protein-17-6oz" },
};
const GNARLY_LABEL = {
  label: "Gnarly Collagen Pro package back panel (product page image)",
  href: "https://gognarly.com/cdn/shop/files/GN-COTB-UN_D3-WEB.webp",
};
const GNARLY_NSF = { label: "NSF listing: Gnarly Collagen Pro", href: "https://www.nsfsport.com/certified-products/listing-detail.php?id=1330416" };
const GNARLY_SEARCH = { label: "Gnarly Nutrition site search: “certificate of analysis”", href: "https://gognarly.com/search?q=certificate+of+analysis" };
const BP_TESTING = { label: "Bulletproof testing standards page", href: "https://www.bulletproof.com/testing-standards/" };
const BPN_FACTS = {
  label: "Bare Performance Nutrition Supplement Facts panel (product page image)",
  href: "https://www.bareperformancenutrition.com/cdn/shop/files/Collagen_8_-_NFP_4cb7845c-0ada-413a-9052-71b8d6fa0aa7.jpg",
};
const BPN_LIGHT_LABS = {
  label: "Light Labs testing page for BPN Collagen Protein (linked from the product page)",
  href: "https://app.lightlabs.com/comprehensive-testing-report/404/2393",
};
const BPN_NSF = { label: "NSF listing: Collagen Protein (Bare Performance Nutrition)", href: "https://www.nsfsport.com/certified-products/listing-detail.php?id=1646928" };
const BPN_SEARCH = {
  label: "Bare Performance Nutrition site search: “certificate of analysis”",
  href: "https://www.bareperformancenutrition.com/search?q=certificate+of+analysis",
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
  {
    id: "bpn-collagen",
    brand: "Bare Performance Nutrition",
    product: "Collagen Protein",
    form: "Bovine collagen peptides with sea salt, powder",
    group: "collagen",
    checkedOn: "2026-11-15",
    documentsCheckedOn: "2026-11-15",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["joints", "tendons", "skin", "hair"],
    diseaseClaims: false,
    deductions: [],
    summary:
      "Clear single-ingredient label and an NSF Certified for Sport listing; its test results page gives no lot number, so it does not count as a lot report, which caps the band.",
    scores: {
      "coa-batch": {
        points: 0,
        note: "The product page links a Light Labs testing page with results for samples tested 11 and 12 December 2025 (protein 22.4 g; arsenic, cadmium, lead and mercury below the stated detection levels; gluten not detected; microbes within limits). It gives no lot number, so a buyer cannot match it to a container, and limits are described only as “set by Bare Performance Nutrition”. A site search for “certificate of analysis” found no lot reports.",
        sources: [BPN_LIGHT_LABS, P.bpn, BPN_SEARCH],
      },
      "coa-lab": NO_LOT(BPN_LIGHT_LABS),
      "coa-numbers": NO_LOT(BPN_LIGHT_LABS),
      "coa-contaminants": NO_LOT(BPN_LIGHT_LABS),
      certification: {
        points: 8,
        note: "“Collagen Protein” by Bare Performance Nutrition is in NSF's Certified for Sport list (lot: all), with the same 22.2 g scoop, 20 g protein and 80 calories as the label.",
        sources: [BPN_NSF, NSF_SPORT_LIST],
      },
      amount: { points: 8, note: "22 g of grass-fed hydrolysed bovine collagen per 22.2 g scoop (20 g protein).", sources: [BPN_FACTS, P.bpn] },
      source: { points: 4, note: "Grass-fed bovine collagen peptides; the page's FAQ says the collagen comes from bovine hide.", sources: [P.bpn] },
      allergen: NO_ALLERGEN(BPN_FACTS, "bovine collagen and pink Himalayan sea salt"),
      blend: { points: 6, note: "One active ingredient with its amount; the only other ingredient is salt.", sources: [BPN_FACTS] },
      "claims-match": {
        points: 11,
        note: "Claims joint and ligament health and joint comfort (joints mixed; ligaments rated with tendons, limited, −2), skin structure and appearance (consistent), and healthy hair (limited, −2) and nails (not rated). A general line that collagen supports connective tissue “including skin, joints, and bones” is not counted as a bone claim for the product.",
        sources: [P.bpn, TOPIC.joints, TOPIC.skin, TOPIC.hair],
      },
      "dose-match": NONE_CITED(P.bpn),
      "cites-real": NONE_CITED(P.bpn),
      category: SUPPLEMENT(P.bpn),
      identity: {
        points: 5,
        note: "Bare Performance Nutrition, LLC, with a Round Rock, Texas address, telephone number and support email, in the terms of service.",
        sources: [{ label: "Bare Performance Nutrition terms of service", href: "https://www.bareperformancenutrition.com/policies/terms-of-service" }],
      },
    },
  },  {
    id: "gnarly-collagen-pro",
    brand: "Gnarly Nutrition",
    product: "Collagen Pro",
    form: "Bovine collagen peptides with vitamin C, zinc and copper, powder",
    group: "collagen",
    checkedOn: "2026-11-15",
    documentsCheckedOn: "2026-11-15",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["joints", "tendons", "skin", "hair"],
    diseaseClaims: false,
    deductions: [],
    summary: "An NSF Certified for Sport listing and a full label, but no public lot report, an appeal to research without a named study, and no company name or street address.",
    scores: {
      "coa-batch": { points: 0, note: "No public lot report; a search of the maker's site for “certificate of analysis” finds only a blog post.", sources: [P.gnarly, GNARLY_SEARCH] },
      "coa-lab": NO_LOT(P.gnarly),
      "coa-numbers": NO_LOT(P.gnarly),
      "coa-contaminants": NO_LOT(P.gnarly),
      certification: {
        points: 8,
        note: "“Gnarly Collagen Pro” is in NSF's Certified for Sport list, with five lot numbers named on the listing.",
        sources: [GNARLY_NSF, NSF_SPORT_LIST],
      },
      amount: {
        points: 8,
        note: "The label gives 15 g of hydrolysed bovine collagen, 90 mg vitamin C, 15 mg zinc and 1 mg copper per 15 g serving. The page's benefits text says “20g of collagen protein per serving”, which does not match the label.",
        sources: [GNARLY_LABEL, P.gnarly],
      },
      source: { points: 4, note: "Bovine hide from pasture-raised US cattle (page FAQ).", sources: [P.gnarly] },
      allergen: NO_ALLERGEN(GNARLY_LABEL, "bovine collagen, vitamin C, zinc and copper"),
      blend: { points: 6, note: "Each ingredient is listed with its amount; no proprietary blend.", sources: [GNARLY_LABEL] },
      "claims-match": {
        points: 11,
        note: "Claims joint health and mobility (joints mixed), tendons and ligaments (limited, −2), skin (consistent) and “Skin, Hair & Nails health” (hair limited, −2; nails not rated). Tissue regeneration and fewer repeat injuries are not rated.",
        sources: [P.gnarly, TOPIC.joints, TOPIC.skin, TOPIC.hair],
      },
      "dose-match": {
        points: 2,
        note: "“Most research points to consistent daily use of 10–20g over 8–12 weeks”, with no study named, so the dose cannot be compared with a particular trial.",
        sources: [P.gnarly],
      },
      "cites-real": { points: 2, note: "“Backed by research” and “most research points to” name no paper a reader could find.", sources: [P.gnarly] },
      category: { points: 5, note: "Sold as a dietary supplement; the FDA statement is on the package label shown on the page.", sources: [GNARLY_LABEL] },
      identity: {
        points: 3,
        note: "The label gives a Salt Lake City PO box and the site has a contact form and email. We found no legal company name; the only street address in the terms is the copyright agent's.",
        sources: [GNARLY_LABEL, { label: "Gnarly Nutrition terms of service", href: "https://gognarly.com/policies/terms-of-service" }],
      },
    },
  },
  {
    id: "bulletproof-collagen",
    brand: "Bulletproof",
    product: "Collagen Peptides (unflavored)",
    form: "Bovine collagen peptides, single ingredient, powder",
    group: "collagen",
    checkedOn: "2026-11-15",
    documentsCheckedOn: "2026-11-15",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["joints", "bone", "skin"],
    diseaseClaims: false,
    deductions: [],
    summary: "A clear single-ingredient label and full company details, but no public lot report or certification listing, and “backed by clinical studies” without a named study.",
    scores: {
      "coa-batch": {
        points: 0,
        note: "No public lot report. The testing-standards page says each production lot is analysed by accredited third-party labs, but no report is published.",
        sources: [P.bulletproof, BP_TESTING],
      },
      "coa-lab": NO_LOT(BP_TESTING),
      "coa-numbers": NO_LOT(BP_TESTING),
      "coa-contaminants": NO_LOT(BP_TESTING),
      certification: { points: 0, note: "No sport or contents certification listing found (not in NSF's Certified for Sport list).", sources: [NSF_SPORT_LIST] },
      amount: { points: 8, note: "20 g of hydrolysed collagen (18 g protein) per serving.", sources: [P.bulletproof] },
      source: { points: 4, note: "Grass-fed, pasture-raised cows.", sources: [P.bulletproof] },
      allergen: NO_ALLERGEN(P.bulletproof),
      blend: SINGLE(P.bulletproof),
      "claims-match": {
        points: 15,
        note: "Claims joint flexibility (joints mixed), bone strength (bone mixed) and skin hydration and elasticity (consistent). “Fights the effects of aging” is not rated.",
        sources: [P.bulletproof, TOPIC.joints, TOPIC.bone, TOPIC.skin],
      },
      "dose-match": { points: 2, note: "“Ingredients that are backed by clinical studies”, with no study named, so the dose cannot be compared.", sources: [P.bulletproof] },
      "cites-real": { points: 2, note: "The appeal to clinical studies names no paper a reader could find.", sources: [P.bulletproof] },
      category: SUPPLEMENT(P.bulletproof),
      identity: {
        points: 5,
        note: "Bulletproof 360, Inc., with a Seattle postal address and a customer-care email, in the terms of service.",
        sources: [{ label: "Bulletproof terms of service", href: "https://www.bulletproof.com/policies/terms-of-service" }],
      },
    },
  },
];

// ---------- batch 2: oral peptide products (checked 2026-11-13) ----------
// Pürblack is graded by exactly the same rules as everyone else; the operator of this site works for Pürblack.
const PB = (handle: string, name: string) => ({ label: `Pürblack ${name} product page`, href: `https://purblack.com/products/${handle}` });
const PB_COA = (slug: string, name: string) => ({ label: `Pürblack internal certificate, ${name}`, href: `https://purblack.com/pages/coa/${slug}` });
/** Pürblack's peptide collection page; its FAQ states the protein source (read 2026-11-17). */
const PB_FAQ = { label: "Pürblack peptides collection page, FAQ (read 17 Nov 2026)", href: "https://purblack.com/collections/peptides-1" };
const PB_COA_PAGE = { label: "Pürblack certificate-of-analysis page (links the third-party reports)", href: "https://purblack.com/pages/certificate-of-analysis" };
const CAMBIUM = { label: "NSF news release: NSF acquires Cambium Analytica", href: "https://www.nsf.org/news/nsf-acquires-cambium-analytica" };
const ORAL_TESTING = { label: "Our oral peptides page (testing notes)", href: "/peptides/oral-peptides" };
const NSF_REMUSCLE = { label: "NSF listing: Pepts ReMuscle (Pürblack)", href: "https://www.nsfsport.com/certified-products/listing-detail.php?id=1665709" };
const NSF_REJOINT = { label: "NSF listing: Pepts ReJoint (Pürblack)", href: "https://www.nsfsport.com/certified-products/listing-detail.php?id=1665654" };
const PB_RATING = { label: "Our rating of Pürblack's capsules", href: "/science/topics/oral-peptides" };
const TOPIC2 = {
  brain: { label: "Sleep, memory and stress evidence", href: "/science/topics/brain" },
  bp: { label: "Blood pressure evidence", href: "/science/topics/blood-pressure" },
  eye: { label: "Eye evidence", href: "/science/topics/eye" },
  immune: { label: "Immune evidence", href: "/science/topics/immune" },
  muscle: { label: "Muscle evidence", href: "/science/topics/muscle" },
};

// batch 5 sources (checked 2026-11-15)
const DFS = { label: "Designs for Sport product page", href: "https://www.designsforhealth.com/products/pro-formance-peptides-ds/" };
const DFS_FACTS = {
  label: "Pro-Formance Peptides Supplement Facts panel (product page image)",
  href: "https://cdn.sanity.io/images/lemtscrs/production-www/1a5447d129ae90300d405dc17b4b09710176646d-1200x1083.jpg",
};
const DFS_NSF = { label: "NSF listing: Pro-Formance Peptides (Designs for Sport)", href: "https://www.nsfsport.com/certified-products/listing-detail.php?id=1799974" };
const DFH_COA_PAGE = { label: "Designs for Health certificates of analysis by lot", href: "https://www.designsforhealth.com/certificate-of-analysis" };
const DFS_COA_66621 = { label: "Report, lot 66621 (September 2026)", href: "https://cdn.sanity.io/files/lemtscrs/production-www/8a5158b00273ce0c1efb373f7d78dadacc0ea32b.pdf" };
const DFS_COA_66951 = { label: "Report, lot 66951 (March 2026)", href: "https://cdn.sanity.io/files/lemtscrs/production-www/15c6155f904286edf2a2c1eb77ac0ef9f7073a5e.pdf" };
const DFH_HTN = { label: "Designs for Health product page", href: "https://www.designsforhealth.com/products/htn-supreme/" };
const DFH_TERMS = { label: "Designs for Health terms of use", href: "https://www.designsforhealth.com/terms-of-use" };

// batch 4 sources (checked 2026-11-14)
const NF = { label: "Natural Factors product page", href: "https://naturalfactors.com/products/peptace-fish-peptides" };
const NF_SEARCH = { label: "Natural Factors site search: “certificate of analysis”", href: "https://naturalfactors.com/search?q=certificate+of+analysis" };
const NF_TERMS = { label: "Natural Factors terms of service", href: "https://naturalfactors.com/policies/terms-of-service" };
const NF_CONTACT = { label: "Natural Factors contact page", href: "https://naturalfactors.com/pages/contact" };
const BR = { label: "Biotics Research product page", href: "https://shop.bioticsresearch.com/collections/all-products-a-z/products/de-stress" };
const BR_FACTS = { label: "Biotics Research Supplement Facts panel (product page image)", href: "https://shop.bioticsresearch.com/cdn/shop/files/7707-suppfacts.png" };
const BR_ISO = { label: "Biotics Research ISO accreditation page", href: "https://www.bioticsresearch.com/iso-accreditation" };
const BR_CONTACT = { label: "Biotics Research contact page", href: "https://www.bioticsresearch.com/contact-us" };
const PE = { label: "Pure Encapsulations product page", href: "https://www.pureencapsulationspro.com/sereniten-plus-45.html" };
const PE_TERMS = { label: "Pure Encapsulations terms of use", href: "https://www.pureencapsulationspro.com/terms-of-use" };
const PE_CONTACT = { label: "Pure Encapsulations contact page", href: "https://www.pureencapsulationspro.com/contact" };

/** The parts every Pürblack sheet shares; each product overrides what differs. */
function purblack(o: {
  id: string;
  product: string;
  form: string;
  handle: string;
  coaSlug: string;
  claimAreas: ClaimArea[];
  summary: string;
  scores: Partial<Record<string, Score>>;
}): ProductGrade {
  const page = PB(o.handle, o.product);
  const coa = PB_COA(o.coaSlug, o.product);
  const base: Record<string, Score> = {
    "coa-batch": {
      points: 8,
      note: "Pürblack's certificate page links two lot-specific reports for this product: an internal one and a third-party one. Each covers a single batch, so most batches on sale have no public report.",
      sources: [PB_COA_PAGE, coa],
    },
    "coa-lab": {
      points: 5,
      note: "The third-party report is from Cambium Analytica, an independent laboratory that NSF acquired in October 2025; it states ISO/IEC 17025 accreditation, which we could not confirm in the accreditor's own directory. The internal report names no laboratory (it is Pürblack's own).",
      sources: [PB_COA_PAGE, CAMBIUM],
    },
    "coa-numbers": {
      points: 7,
      note: "The internal report gives the content of each ingredient, including the peptide complex, as a percentage with a target range and a result. There is no separate identity test, and the third-party report has no content results.",
      sources: [coa],
    },
    "coa-contaminants": {
      points: 4,
      note: "Both reports cover heavy metals and microbes, but the metals never have a limit and a number in the same report: the internal report gives limits with “complies”, the third-party report gives numbers with no limits.",
      sources: [coa, PB_COA_PAGE],
    },
    certification: {
      points: 0,
      note: "We found no certification listing under this product's name.",
      sources: [NSF_SPORT_LIST, page],
    },
    amount: { points: 8, note: "The label lists every ingredient with its amount per serving.", sources: [page] },
    source: {
      points: 2,
      note: "The FAQ on Pürblack's peptides collection page says “Our peptides are made from marine sources of protein” and that vegetarians can take them if they eat algae or fish. No species is named, and the label and product page do not say. (Pürblack's own buying guide lists “clearly disclosed marine or protein origin” as a mark of quality.)",
      sources: [page, PB_FAQ, { label: "Pürblack buying guide", href: "https://purblack.com/pages/peptides-quality-guide" }],
    },
    allergen: {
      points: null,
      note: "The label has no allergen statement and does not say what the peptides are made from. Pürblack's FAQ says marine protein, which may mean fish, a major allergen, but it names no species, so we cannot tell whether fish should be declared.",
      sources: [page, PB_FAQ],
    },
    blend: { points: 6, note: "Every ingredient, including each peptide complex, is listed with its amount.", sources: [page] },
    "dose-match": NONE_CITED(page),
    "cites-real": NONE_CITED(page),
    category: {
      points: 5,
      note: "Labelled a dietary supplement, with the FDA statement on the label (the product page text itself does not carry it).",
      sources: [page],
    },
    identity: {
      points: 5,
      note: "Pürblack Inc., with a postal address (on its certificates and packaging) and a contact email.",
      sources: [coa, PB_COA_PAGE],
    },
  };
  const scores = { ...base, ...o.scores } as Record<string, Score>;
  return {
    id: o.id,
    brand: "Pürblack",
    product: o.product,
    form: o.form,
    group: "oral",
    checkedOn: "2026-11-13",
    documentsCheckedOn: "2026-11-13",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: o.claimAreas,
    diseaseClaims: false,
    deductions: [],
    summary: o.summary,
    scores,
  };
}

const NSF_NAME_NOTE = (listed: string, listingLot?: string) =>
  `NSF Certified for Sport lists “${listed}”, this product's earlier name, under the brand Pürblack${listingLot ? ` (lot ${listingLot})` : ""}, and the product page links to that listing. The label NSF holds has the same formula, with 45 servings and a different distributor (23 Century LLC). Counted under rubric version 1.1, which accepts a former name on those conditions.`;

export const ORAL_GRADES: ProductGrade[] = [
  purblack({
    id: "purblack-muscle",
    product: "Muscle+",
    form: "Capsules: leucine, valine, isoleucine and a 50 mg peptide complex (IPH AGAA)",
    handle: "muscle-peptide",
    coaSlug: "muscle-plus",
    claimAreas: ["muscle"],
    summary:
      "Lot reports, a full label and an NSF Certified for Sport listing under its earlier name, but the label does not name the peptide source and one cited paper cannot be found.",
    scores: {
      "coa-numbers": {
        points: 7,
        note: "Internal batch 00034: leucine, valine, isoleucine and the peptide complex (5.0% against a limit of 5.0%) with targets and results. L-valine is 24.0% against a stated range of 27.0 to 27.5%; the label's own amounts put valine at about 24%, so the range is probably the error.",
        sources: [PB_COA("muscle-plus", "Muscle+")],
      },
      certification: { points: 8, note: NSF_NAME_NOTE("Pepts ReMuscle", "230504"), sources: [NSF_REMUSCLE, PB("muscle-peptide", "Muscle+")] },
      amount: {
        points: 8,
        note: "Per 2 capsules: leucine 470 mg, valine 237 mg, isoleucine 234 mg, peptide complex IPH AGAA 50 mg (stated as 60% proteins, 1% of the tetrapeptide H-Asp-Glu-Arg-Ala-OH, 39% free amino acids).",
        sources: [PB("muscle-peptide", "Muscle+")],
      },
      "claims-match": {
        points: 9,
        note: "Claims more muscle mass and strength (our rating for Pürblack's capsules: limited, −2) and that it raises alpha-actinin-3 “by up to 4.5 times”, a result that in the company's own 2019 paper came from cultured cells (preclinical, −4). Fat loss and recovery claims are not rated.",
        sources: [PB("muscle-peptide", "Muscle+"), PB_RATING, ORAL_TESTING],
      },
      "dose-match": {
        points: 0,
        note: "The only human trial cited (Wilkinson 2013) gave 3.42 g of leucine; a serving has 470 mg.",
        sources: [pubmed("23551944", "Wilkinson 2013")],
      },
      "cites-real": {
        points: 0,
        note: "One of the four references (Perez 2018, Int J Mol Sci) could not be found in PubMed. The other three, on leucine and amino acids, exist.",
        sources: [PB("muscle-peptide", "Muscle+"), pubmed("16424142", "Norton 2006"), pubmed("16424141", "Shimomura 2006")],
      },
    },
  }),
  purblack({
    id: "purblack-joint",
    product: "Joint+",
    form: "Capsules: leucine, valine, isoleucine and a 50 mg peptide complex (IPH AEN)",
    handle: "joint-peptide",
    coaSlug: "joint-plus",
    claimAreas: ["joints", "bone"],
    summary: "Lot reports, a full label and an NSF Certified for Sport listing under its earlier name, but the label does not name the peptide source.",
    scores: {
      "coa-numbers": {
        points: 7,
        note: "Internal batch 00031: the amino acids and the peptide complex (5.0% against a limit of 5.0%) with targets and results. L-valine is 23.5% against a stated range of 27.0 to 27.5%, which the label's own amounts suggest is a range error.",
        sources: [PB_COA("joint-plus", "Joint+")],
      },
      certification: { points: 8, note: NSF_NAME_NOTE("Pepts ReJoint"), sources: [NSF_REJOINT, PB("joint-peptide", "Joint+")] },
      amount: {
        points: 8,
        note: "Per 2 capsules: leucine 470 mg, valine 237 mg, isoleucine 234 mg, peptide complex IPH AEN 50 mg (stated as 60% proteins, 24% of the tripeptide H-Glu-Ala-Asp-OH, 16% free amino acids).",
        sources: [PB("joint-peptide", "Joint+")],
      },
      "claims-match": {
        points: 13,
        note: "Claims cartilage repair, joint mobility and less discomfort (our rating for Pürblack's capsules: limited, −2). Bone and gene-activation claims are not rated.",
        sources: [PB("joint-peptide", "Joint+"), PB_RATING],
      },
      "cites-real": {
        points: 3,
        note: "All four references exist, but one is cited with the wrong journal (Liu 2018 is in Am J Transl Res, not J Orthop Translation). Three concern leucine and amino acids in muscle rather than joints.",
        sources: [pubmed("29511444", "Liu 2018"), pubmed("19301095", "Wu 2009"), pubmed("16424142", "Norton 2006")],
      },
    },
  }),
  purblack({
    id: "purblack-vascular",
    product: "Vascular+",
    form: "Capsules: amino acids (arginine, glycine, GABA and others) and a 57 mg peptide (AVN)",
    handle: "vascular-peptide-1",
    coaSlug: "vascular-plus",
    claimAreas: ["blood-pressure", "brain", "stress"],
    summary: "Lot reports and a full label, but it claims NSF Certified for Sport with no listing, and two of three cited papers cannot be found.",
    scores: {
      certification: {
        points: 0,
        note: "The product page says Vascular+ is NSF Certified for Sport, but we found no NSF listing for it (NSF lists only Pürblack's joint and muscle formulas, under their earlier names).",
        sources: [NSF_SPORT_LIST, PB("vascular-peptide-1", "Vascular+")],
      },
      amount: {
        points: 8,
        note: "Per 2 capsules: L-arginine 345 mg, L-glycine 300 mg, GABA 255 mg, L-glutamine 210 mg, L-leucine 93 mg, L-lysine 90 mg, L-asparagine 75 mg, beta-alanine 75 mg, AVN peptide 57 mg.",
        sources: [PB("vascular-peptide-1", "Vascular+")],
      },
      "claims-match": {
        points: 9,
        note: "Claims blood-vessel repair and healthy blood pressure (our rating for Pürblack's capsules: limited, −2), memory and focus (limited, −2) and stress resistance (limited, −2).",
        sources: [PB("vascular-peptide-1", "Vascular+"), PB_RATING, TOPIC2.bp, TOPIC2.brain],
      },
      "cites-real": {
        points: 0,
        note: "Two of three references could not be found in PubMed (Li & Delaney 2019, “Glycine and cardiovascular health”; Sander 2017, on GABA and blood pressure). Wu 2009 exists.",
        sources: [PB("vascular-peptide-1", "Vascular+"), pubmed("19301095", "Wu 2009")],
      },
    },
  }),
  purblack({
    id: "purblack-vision",
    product: "Vision+",
    form: "Capsules: acerola, bilberry anthocyanins, lutein, zeaxanthin and two peptide complexes",
    handle: "vision-peptide",
    coaSlug: "vision-plus",
    claimAreas: ["eye"],
    summary: "Lot reports and a full label, but its eye claims have no human trial behind them and its references are about muscle and cartilage.",
    scores: {
      amount: {
        points: 8,
        note: "Per 2 capsules: acerola extract 345 mg, anthocyanins (Vaccinium uliginosum) 300 mg, lutein 255 mg, zeaxanthin 210 mg, peptide complex IPH AEN 93 mg, IPH VIS 57 mg. The product page text names IPH AVN instead of IPH AEN.",
        sources: [PB("vision-peptide", "Vision+")],
      },
      "claims-match": {
        points: 11,
        note: "Claims that its peptides improve retinal sensitivity, macular health, optic-nerve function and tear production. We found no human trial of oral peptides for eyesight (−4).",
        sources: [PB("vision-peptide", "Vision+"), TOPIC2.eye],
      },
      "cites-real": {
        points: 0,
        note: "The four references are about leucine, amino acids, muscle and cartilage, none about eyes, and Vision+ contains none of the amino acids they study.",
        sources: [PB("vision-peptide", "Vision+"), pubmed("16424142", "Norton 2006"), pubmed("29511444", "Liu 2018")],
      },
    },
  }),
  purblack({
    id: "purblack-brain-am",
    product: "Brain AM",
    form: "Capsules: amino acids, vitamin B6 and two 12 mg peptide complexes (AGAP, AVN)",
    handle: "brain-am",
    coaSlug: "brain-am",
    claimAreas: ["brain", "stress"],
    summary: "Lot reports and a full label, but two of its four references cannot be found as cited.",
    scores: {
      amount: {
        points: 8,
        note: "Per 2 capsules: vitamin B6 2 mg, L-glutamic acid 227 mg, beta-alanine 92 mg, L-aspartic acid 92 mg, L-lysine 77 mg, L-leucine 77 mg, GABA 65 mg, L-glycine 65 mg, AGAP peptide complex 12 mg, AVN peptide complex 12 mg.",
        sources: [PB("brain-am", "Brain AM")],
      },
      "claims-match": {
        points: 11,
        note: "Claims better memory, learning and focus (food-derived peptides for memory: limited, −2) and resistance to mental fatigue and stress (limited, −2).",
        sources: [PB("brain-am", "Brain AM"), TOPIC2.brain],
      },
      "dose-match": {
        points: 3,
        note: "The one human study cited (Abdou 2006, GABA) gives no dose in its abstract.",
        sources: [pubmed("16971751", "Abdou 2006")],
      },
      "cites-real": {
        points: 0,
        note: "Dakshinamurti 2016, “Vitamin B6 and brain function”, could not be found in PubMed, and Fernstrom 2000 is cited under a title we could not find (his 2000 paper is “Can nutrient supplements modify brain function?”). Abdou 2006 and Fonnum 1984 exist.",
        sources: [PB("brain-am", "Brain AM"), pubmed("16971751", "Abdou 2006"), pubmed("6139418", "Fonnum 1984")],
      },
    },
  }),
  purblack({
    id: "purblack-brain-pm",
    product: "Brain PM",
    form: "Capsules: glycine, GABA and other amino acids, vitamin B6 and two 25 mg peptide complexes (AVN, GAA)",
    handle: "brain-pm",
    coaSlug: "brain-pm",
    claimAreas: ["sleep", "stress", "brain"],
    summary: "Its published internal certificate is Brain AM's, not Brain PM's, and the box shows an FDA logo.",
    scores: {
      "coa-batch": {
        points: 8,
        note: "The third-party report is for a Brain PM batch. The internal report linked as Brain PM carries the same batch number and contents as Brain AM's (see the next rows), so only one usable lot report is public.",
        sources: [PB_COA_PAGE, PB_COA("brain-pm", "Brain PM"), PB_COA("brain-am", "Brain AM")],
      },
      "coa-numbers": {
        points: 0,
        note: "The internal certificate titled Brain PM (batch 00023, 27 May 2025) lists Brain AM's formula, including L-glutamic acid and the AGAP peptide, which are not on the Brain PM label; it is identical to the Brain AM certificate. The label lists glycine, GABA, taurine and a GAA peptide instead.",
        sources: [PB_COA("brain-pm", "Brain PM"), PB_COA("brain-am", "Brain AM"), PB("brain-pm", "Brain PM")],
      },
      amount: {
        points: 8,
        note: "Per 2 capsules (box label): vitamin B6 5 mg, L-glycine 500 mg, GABA 380 mg, beta-alanine 125 mg, L-leucine 125 mg, L-lysine 125 mg, L-taurine 125 mg, AVN peptide complex 25 mg, GAA peptide complex 25 mg.",
        sources: [PB("brain-pm", "Brain PM")],
      },
      "claims-match": {
        points: 9,
        note: "Claims deeper sleep (limited, −2), lower stress and cortisol (limited, −2) and overnight cognitive recovery (memory: limited, −2).",
        sources: [PB("brain-pm", "Brain PM"), TOPIC2.brain],
      },
      "dose-match": {
        points: 0,
        note: "The human trial cited (Suzuki 2020) gave 3 or 6 g a day of seven essential amino acids; Brain PM has 250 mg of the two of those it contains. The other sleep paper cited is an animal study.",
        sources: [pubmed("33324669", "Suzuki 2020"), pubmed("30707852", "Kim 2019")],
      },
      "cites-real": {
        points: 3,
        note: "All four references exist, but with errors: Kim 2019 is in Pharm Biol (not PLoS ONE), Nguyen 2013 in Neural Plast (not Neuroscience), and the Rafiee 2022 and Suzuki 2020 titles are misquoted.",
        sources: [pubmed("30707852", "Kim 2019"), pubmed("24379976", "Nguyen 2013"), pubmed("35334949", "Rafiee 2022"), pubmed("33324669", "Suzuki 2020")],
      },
      category: {
        points: 3,
        note: "Labelled a dietary supplement with the FDA statement, but the box shows “FDA” as a logo (“Manufactured in an FDA registered facility”), which can suggest FDA approval.",
        sources: [PB("brain-pm", "Brain PM")],
      },
    },
  }),
  purblack({
    id: "purblack-multivitamin",
    product: "Multivitamin+",
    form: "Capsule: vitamins and minerals with three 10 mg peptide complexes (AVN, LIV, SGS)",
    handle: "multi-vitamin-peptide-capsules-60-count-30-servings",
    coaSlug: "multivitamin-plus",
    claimAreas: [],
    summary: "Full label and lot reports; the internal report gives quantities without limits, and the third-party report had a high microbe count.",
    scores: {
      "coa-batch": {
        points: 8,
        note: "An internal and a third-party report, both for batch 00032; other batches have no public report.",
        sources: [PB_COA_PAGE, PB_COA("multivitamin-plus", "Multivitamin+")],
      },
      "coa-numbers": {
        points: 3,
        note: "The internal report lists each ingredient's share of the formula with no target or limit (it says it “features ingredients and their quantity”), so the results cannot be told apart from the recipe.",
        sources: [PB_COA("multivitamin-plus", "Multivitamin+")],
      },
      "coa-contaminants": {
        points: 4,
        note: "Metals and microbes in both reports, without limit and number together for metals. The third-party report for this batch gave a total aerobic count of 30,000 CFU/g and coliforms of 2,000 CFU/g; the internal report for the same batch gives a plate count below 10 CFU/g.",
        sources: [PB_COA("multivitamin-plus", "Multivitamin+"), ORAL_TESTING],
      },
      amount: {
        points: 8,
        note: "Every vitamin, mineral and peptide complex is listed with an amount per capsule (for example vitamin B12 472 mcg, biotin 1,500 mcg, IPH AVN, LIV and SGS 10 mg each).",
        sources: [PB("multi-vitamin-peptide-capsules-60-count-30-servings", "Multivitamin+")],
      },
      "claims-match": {
        points: 13,
        note: "Peptide claims: vascular tone and circulation (limited, −2); liver function and antioxidant defence are not rated. Vitamin and mineral claims are outside this site's ratings.",
        sources: [PB("multi-vitamin-peptide-capsules-60-count-30-servings", "Multivitamin+"), TOPIC2.bp],
      },
      "cites-real": {
        points: 3,
        note: "All four references exist; one has the wrong year (Schwalfenberg is 2017, not 2011). They are reviews of vitamins and choline, not of the peptides.",
        sources: [pubmed("28698808", "Schwalfenberg 2017"), pubmed("17101959", "Ames 2006"), pubmed("31963293", "Gombart 2020"), pubmed("19906248", "Zeisel 2009")],
      },
    },
  }),
  purblack({
    id: "purblack-immune",
    product: "Immune+",
    form: "Capsules: herbal extracts, vitamins D and K2, zinc, selenium and three 9 mg peptide complexes",
    handle: "immune-peptide",
    coaSlug: "immune-plus",
    claimAreas: ["immune"],
    summary: "Lot reports, but the label's selenium and zinc figures read as many times the daily value, and its peptide immune claims have no human trial.",
    scores: {
      "coa-batch": {
        points: 8,
        note: "An internal and a third-party report, both for batch 00021; other batches have no public report.",
        sources: [PB_COA_PAGE, PB_COA("immune-plus", "Immune+")],
      },
      "coa-numbers": {
        points: 3,
        note: "Every result in the internal report is identical to its target (for example 17.69% for each of four extracts, 0.59% for each peptide), so the results cannot be told apart from the recipe.",
        sources: [PB_COA("immune-plus", "Immune+")],
      },
      "coa-contaminants": {
        points: 4,
        note: "Metals and microbes in both reports, without limit and number together for metals. This batch had the highest metals of Pürblack's eight third-party reports (for example lead 0.326 µg/g).",
        sources: [PB_COA("immune-plus", "Immune+"), ORAL_TESTING],
      },
      amount: {
        points: 4,
        note: "Amounts are listed, but selenium (8,850 mcg, 12,642% of the daily value) and zinc (133 mg, 886%) are given as the weight of the compound, while the daily-value figures treat them as the mineral. The internal report says the selenium compound is 1% selenium, so a serving has about 89 mcg of selenium, not 8,850. Vitamin D is 4,425 IU.",
        sources: [PB("immune-peptide", "Immune+"), PB_COA("immune-plus", "Immune+")],
      },
      "claims-match": {
        points: 11,
        note: "Claims that its peptides support the thymus, lungs and immune cells. We found no human trial of oral peptides for immune function (−4). Vitamin and herb claims are outside this site's ratings.",
        sources: [PB("immune-peptide", "Immune+"), TOPIC2.immune],
      },
      "dose-match": {
        points: 3,
        note: "Vitamin D (4,425 IU) is within the range of the cited meta-analysis, but the fucoidan trial used 1 g a day (a serving has 265 mg) and the elderberry meta-analysis tested the berry, while Immune+ contains elder flower.",
        sources: [pubmed("28202713", "Martineau 2017"), pubmed("37331983", "McFadden 2023"), pubmed("30670267", "Hawkins 2019")],
      },
      "cites-real": {
        points: 3,
        note: "All five references exist; the fucoidan trial is cited with the wrong journal and title (it is in J Int Soc Sports Nutr).",
        sources: [pubmed("37331983", "McFadden 2023"), pubmed("38719213", "Nault 2024"), pubmed("18384097", "Hoffmann 2008")],
      },
    },
  }),
  {
    id: "life-extension-milk-peptides",
    brand: "Life Extension",
    product: "Bioactive Milk Peptides",
    form: "Capsule: 150 mg casein decapeptide (Lactium)",
    group: "oral",
    checkedOn: "2026-11-13",
    documentsCheckedOn: "2026-11-13",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["sleep", "stress"],
    diseaseClaims: false,
    deductions: [],
    summary: "Clear label at the dose of the main human trial, but no public lot report, and its sleep claim cites a cat study and a mouse study.",
    scores: {
      "coa-batch": { points: 0, note: "No public lot report found on the product page.", sources: [{ label: "Life Extension product page", href: "https://www.lifeextension.com/vitamins-supplements/item01512/bioactive-milk-peptides" }] },
      "coa-lab": NO_LOT({ label: "Life Extension product page", href: "https://www.lifeextension.com/vitamins-supplements/item01512/bioactive-milk-peptides" }),
      "coa-numbers": NO_LOT({ label: "Life Extension product page", href: "https://www.lifeextension.com/vitamins-supplements/item01512/bioactive-milk-peptides" }),
      "coa-contaminants": NO_LOT({ label: "Life Extension product page", href: "https://www.lifeextension.com/vitamins-supplements/item01512/bioactive-milk-peptides" }),
      certification: { points: 0, note: "No sport or contents certification listing found; the gluten-free and non-GMO marks are not counted.", sources: [{ label: "Life Extension product page", href: "https://www.lifeextension.com/vitamins-supplements/item01512/bioactive-milk-peptides" }] },
      amount: { points: 8, note: "150 mg of casein decapeptide per capsule, single active.", sources: [{ label: "Life Extension product page", href: "https://www.lifeextension.com/vitamins-supplements/item01512/bioactive-milk-peptides" }] },
      source: { points: 4, note: "Casein from milk (Lactium, a milk protein hydrolysate).", sources: [{ label: "Life Extension product page", href: "https://www.lifeextension.com/vitamins-supplements/item01512/bioactive-milk-peptides" }] },
      allergen: { points: 5, note: "“Contains milk (casein decapeptide).”", sources: [{ label: "Life Extension product page", href: "https://www.lifeextension.com/vitamins-supplements/item01512/bioactive-milk-peptides" }] },
      blend: { points: 6, note: "Single active ingredient.", sources: [{ label: "Life Extension product page", href: "https://www.lifeextension.com/vitamins-supplements/item01512/bioactive-milk-peptides" }] },
      "claims-match": {
        points: 11,
        note: "Claims restful sleep (casein hydrolysate for sleep: limited, −2) and a healthy stress response and cortisol (food-derived peptides and stress: limited, −2). Corrected 14 November 2026: the stress claim was first left unscored, unlike the same claim on other products.",
        sources: [{ label: "Life Extension product page", href: "https://www.lifeextension.com/vitamins-supplements/item01512/bioactive-milk-peptides" }, TOPIC2.brain],
      },
      "dose-match": {
        points: 3,
        note: "The 30-day trial in women with stress symptoms used 150 mg a day, the same as a capsule; another cited human study gave 1,200 mg over one day.",
        sources: [pubmed("17136040", "Kim 2007 (150 mg/day)"), pubmed("15517308", "Messaoudi 2005")],
      },
      "cites-real": {
        points: 0,
        note: "All seven references exist, but the sentence “published studies reveal that these bioactive milk peptides promote restful sleep and support relief from stress” cites a cat study and a mouse study without saying so.",
        sources: [pubmed("27677831", "Landsberg 2017 (cats)"), pubmed("27401107", "Dela Peña 2016 (mice)")],
      },
      category: {
        points: 5,
        note: "Sold as a dietary supplement with the FDA statement.",
        sources: [{ label: "Life Extension product page", href: "https://www.lifeextension.com/vitamins-supplements/item01512/bioactive-milk-peptides" }],
      },
      identity: {
        points: 5,
        note: "Life Extension Foundation Buyers Club, Inc., with a Fort Lauderdale address and a legal email, in the terms of use.",
        sources: [{ label: "Life Extension terms of use", href: "https://www.lifeextension.com/legal/terms-of-use" }],
      },
    },
  },
  {
    id: "metagenics-vasotensin",
    brand: "Metagenics",
    product: "Vasotensin",
    form: "Tablets: 750 mg bonito (skipjack tuna) and mackerel fish protein per 2 tablets",
    group: "oral",
    checkedOn: "2026-11-13",
    documentsCheckedOn: "2026-11-13",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["blood-pressure"],
    diseaseClaims: false,
    deductions: [],
    summary: "Clear label, fish declared and a modest claim, but no public lot report or certification listing.",
    scores: {
      "coa-batch": { points: 0, note: "No public lot report found.", sources: [{ label: "Metagenics product page", href: "https://www.metagenics.com/en-us/product/vasotensin" }] },
      "coa-lab": NO_LOT({ label: "Metagenics product page", href: "https://www.metagenics.com/en-us/product/vasotensin" }),
      "coa-numbers": NO_LOT({ label: "Metagenics product page", href: "https://www.metagenics.com/en-us/product/vasotensin" }),
      "coa-contaminants": NO_LOT({ label: "Metagenics product page", href: "https://www.metagenics.com/en-us/product/vasotensin" }),
      certification: { points: 0, note: "No sport or contents certification listing found; the Non-GMO Project and gluten-free marks are not counted.", sources: [{ label: "Label record in NIH's Dietary Supplement Label Database", href: "https://dsld.od.nih.gov/label/295886" }] },
      amount: { points: 8, note: "750 mg of fish protein powder per 2 tablets (4 tablets a day suggested).", sources: [{ label: "Label record in NIH's Dietary Supplement Label Database", href: "https://dsld.od.nih.gov/label/295886" }] },
      source: { points: 4, note: "Bonito fish; the allergen line names skipjack tuna and mackerel.", sources: [{ label: "Label record in NIH's Dietary Supplement Label Database", href: "https://dsld.od.nih.gov/label/295886" }] },
      allergen: { points: 5, note: "“Contains: Fish (skipjack tuna and mackerel).”", sources: [{ label: "Label record in NIH's Dietary Supplement Label Database", href: "https://dsld.od.nih.gov/label/295886" }] },
      blend: { points: 6, note: "Single active ingredient.", sources: [{ label: "Label record in NIH's Dietary Supplement Label Database", href: "https://dsld.od.nih.gov/label/295886" }] },
      "claims-match": {
        points: 13,
        note: "Claims support for blood pressure already in the normal range (fish peptides and blood pressure: limited, −2).",
        sources: [{ label: "Metagenics product page", href: "https://www.metagenics.com/en-us/product/vasotensin" }, TOPIC2.bp],
      },
      "dose-match": NONE_CITED({ label: "Metagenics product page", href: "https://www.metagenics.com/en-us/product/vasotensin" }),
      "cites-real": NONE_CITED({ label: "Metagenics product page", href: "https://www.metagenics.com/en-us/product/vasotensin" }),
      category: SUPPLEMENT({ label: "Label record in NIH's Dietary Supplement Label Database", href: "https://dsld.od.nih.gov/label/295886" }),
      identity: {
        points: 5,
        note: "Metagenics, LLC, with a Jersey City address and a support route, on the product page.",
        sources: [{ label: "Metagenics product page", href: "https://www.metagenics.com/en-us/product/vasotensin" }],
      },
    },
  },
  // ---------- batch 4 (checked 2026-11-14): more oral peptide products for the thin goal pages ----------
  {
    id: "natural-factors-peptace",
    brand: "Natural Factors",
    product: "PeptACE Fish Peptides",
    form: "Capsule: 500 mg bonito fish protein extract (85% peptides)",
    group: "oral",
    checkedOn: "2026-11-14",
    documentsCheckedOn: "2026-11-14",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["blood-pressure"],
    diseaseClaims: false,
    deductions: [],
    summary: "Clear single-ingredient label with the fish declared, but no public lot report or certification listing, and “studies have shown” without naming a study.",
    scores: {
      "coa-batch": { points: 0, note: "No public lot report found; a search of the maker's site for “certificate of analysis” returns nothing.", sources: [NF, NF_SEARCH] },
      "coa-lab": NO_LOT(NF),
      "coa-numbers": NO_LOT(NF),
      "coa-contaminants": NO_LOT(NF),
      certification: { points: 0, note: "No sport or contents certification listing found (NSF/ANSI 173 search for “Natural Factors”: no matching products).", sources: [nsf173("Natural Factors")] },
      amount: { points: 8, note: "500 mg of PeptACE fish (bonito) protein extract per capsule, stated as 85% peptides; 1 to 3 capsules a day.", sources: [NF] },
      source: { points: 4, note: "Bonito fish.", sources: [NF] },
      allergen: { points: 5, note: "“Contains bonito fish.”", sources: [NF] },
      blend: { points: 6, note: "Single active ingredient.", sources: [NF] },
      "claims-match": {
        points: 13,
        note: "Claims to help maintain healthy blood pressure already within the normal range (fish peptides and blood pressure: limited, −2).",
        sources: [NF, TOPIC2.bp],
      },
      "dose-match": { points: 2, note: "“Studies have shown that PeptACE helps maintain healthy blood pressure” names no study, so the dose cannot be compared.", sources: [NF] },
      "cites-real": { points: 2, note: "An appeal to studies without naming them, so a reader cannot find them.", sources: [NF] },
      category: { points: 5, note: "Sold as a dietary supplement, with the FDA statement in the site footer.", sources: [NF] },
      identity: {
        points: 5,
        note: "Natural Factors Nutritional Products Ltd., with a Monroe, Washington address and a customer-service email, in the terms of service; a contact form covers product complaints.",
        sources: [NF_TERMS, NF_CONTACT],
      },
    },
  },
  {
    id: "biotics-de-stress",
    brand: "Biotics Research",
    product: "De-Stress Peptides",
    form: "Capsule: 150 mg casein hydrolysate (Lactium)",
    group: "oral",
    checkedOn: "2026-11-14",
    documentsCheckedOn: "2026-11-14",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["sleep", "stress"],
    diseaseClaims: false,
    deductions: [],
    summary: "Clear label at the dose of the main human trial and milk declared, but no public lot report, and its research appeal names no study.",
    scores: {
      "coa-batch": {
        points: 0,
        note: "No public lot report. The page says every product is tested in the company's in-house lab, which holds ISO/IEC 17025 accreditation from ANAB for heavy metals, minerals, vitamins and coenzyme Q10, but no report for this product is published.",
        sources: [BR, BR_ISO],
      },
      "coa-lab": NO_LOT(BR),
      "coa-numbers": NO_LOT(BR),
      "coa-contaminants": NO_LOT(BR),
      certification: { points: 0, note: "No sport or contents certification listing found (NSF/ANSI 173 search for “Biotics”: no matching products); the gluten-free mark is not counted.", sources: [nsf173("Biotics")] },
      amount: { points: 8, note: "150 mg of De-Stress hydrolysate (hydrolysed casein concentrate) per capsule, one a day.", sources: [BR_FACTS] },
      source: { points: 4, note: "Casein from milk (Lactium, a milk protein hydrolysate).", sources: [BR] },
      allergen: { points: 5, note: "“Contains ingredients derived from milk.”", sources: [BR_FACTS] },
      blend: { points: 6, note: "Single active ingredient.", sources: [BR_FACTS] },
      "claims-match": {
        points: 11,
        note: "Claims a healthy stress response and calmness (food-derived peptides and stress: limited, −2) and restorative sleep (casein hydrolysate for sleep: limited, −2). The label also says the decapeptide has “anxiolytic activity”, a drug-class word, with the FDA statement beside it.",
        sources: [BR, BR_FACTS, TOPIC2.brain],
      },
      "dose-match": {
        points: 2,
        note: "The page says the decapeptide has “demonstrated affinity for GABA-A receptors” without naming a study, so nothing can be compared.",
        sources: [BR],
      },
      "cites-real": { points: 2, note: "An appeal to research without naming it, so a reader cannot find it.", sources: [BR] },
      category: { points: 5, note: "Sold as a dietary supplement, with the FDA statement on the label and in the site footer.", sources: [BR_FACTS] },
      identity: {
        points: 5,
        note: "Biotics Research Corporation, with a Rosenberg, Texas address, phone numbers and an email address, on the contact page.",
        sources: [BR_CONTACT],
      },
    },
  },
  {
    id: "pure-sereniten-plus",
    brand: "Pure Encapsulations",
    product: "Sereniten Plus",
    form: "Capsule: 175 mg casein hydrolysate (Lactium), 50 mg L-theanine, vitamin D",
    group: "oral",
    checkedOn: "2026-11-14",
    documentsCheckedOn: "2026-11-14",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["sleep", "stress", "brain"],
    diseaseClaims: false,
    deductions: [],
    summary: "Every amount and the milk source are on the label, but there is no public lot report, and one cited sleep paper is not in PubMed.",
    scores: {
      "coa-batch": { points: 0, note: "No public lot report found on the product page.", sources: [PE] },
      "coa-lab": NO_LOT(PE),
      "coa-numbers": NO_LOT(PE),
      "coa-contaminants": NO_LOT(PE),
      certification: {
        points: 0,
        note: "No sport or contents certification listing found for this product (NSF/ANSI 173 search for “Pure Encapsulations”: no matching products).",
        sources: [nsf173("Pure Encapsulations")],
      },
      amount: { points: 8, note: "Lactium 175 mg, L-theanine 50 mg and vitamin D 2.5 mcg per capsule.", sources: [PE] },
      source: { points: 4, note: "Lactium from the hydrolysis of milk casein, from cows in France.", sources: [PE] },
      allergen: {
        points: 5,
        note: "The label says “Contains milk”. (The page's general “free from … dairy” panel is the brand's standard wording and does not fit this product.)",
        sources: [PE],
      },
      blend: { points: 6, note: "Every active ingredient listed with its amount.", sources: [PE] },
      "claims-match": {
        points: 9,
        note: "Claims to moderate occasional stress (food-derived peptides and stress: limited, −2), support restful sleep (casein hydrolysate for sleep: limited, −2) and cognitive function (memory: limited, −2), plus mood and cardiovascular function (not rated). Immune and vitamin D claims are made for the other ingredients and not scored.",
        sources: [PE, TOPIC2.brain],
      },
      "dose-match": {
        points: 3,
        note: "The 30-day stress trial it cites used 150 mg a day, close to the 175 mg capsule; another cited human study gave 1,200 mg over one day.",
        sources: [pubmed("17136040", "Kim 2007 (150 mg/day)"), pubmed("15517308", "Messaoudi 2005")],
      },
      "cites-real": {
        points: 0,
        note: "Most references can be found, and the page says where results come from animals. But the sleep claim cites Saint-Hilaire et al., The Open Sleep Journal 2009, which we could not find in PubMed.",
        sources: [PE, { label: "PubMed search: Saint-Hilaire Z, 2009", href: "https://pubmed.ncbi.nlm.nih.gov/?term=Saint-Hilaire+Z%5Bau%5D+AND+2009%5Bdp%5D" }],
      },
      category: { points: 5, note: "Sold as a dietary supplement, with the FDA statement on the label.", sources: [PE] },
      identity: {
        points: 5,
        note: "Pure Encapsulations, LLC, with a Sudbury, Massachusetts address in the terms of use, and a contact form with a quality-complaint option.",
        sources: [PE_TERMS, PE_CONTACT],
      },
    },
  },
  {
    id: "dfs-pro-formance-peptides",
    brand: "Designs for Sport",
    product: "Pro-Formance Peptides",
    form: "Capsules: 2.4 g fava bean protein hydrolysate (PeptiStrong) per 4 capsules",
    group: "oral",
    checkedOn: "2026-11-15",
    documentsCheckedOn: "2026-11-15",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["muscle"],
    diseaseClaims: false,
    deductions: [],
    summary: "Public lot reports and an NSF Certified for Sport listing, but the reports name no laboratory, give the peptide only as “Complies” by a protein method, and give no metal results.",
    scores: {
      "coa-batch": {
        points: 10,
        note: "The maker's certificate page lists reports by lot number for buyers to match to the label; two lots of this product are listed (66951 and 66621).",
        sources: [DFH_COA_PAGE, DFS_COA_66621, DFS_COA_66951],
      },
      "coa-lab": {
        points: 2,
        note: "The reports are issued on the seller's letterhead and mark results as “3rd party testing”, but name no laboratory.",
        sources: [DFS_COA_66621],
      },
      "coa-numbers": {
        points: 3,
        note: "Lot 66621 gives the fava bean hydrolysate (2.4 g, range 2.28–3.6 g) only as “Complies”, measured by Dumas, a nitrogen (protein) method that does not identify the peptides; lot 66951 gives the amount as “Complies” by input, that is, from the formula.",
        sources: [DFS_COA_66621, DFS_COA_66951],
      },
      "coa-contaminants": {
        points: 4,
        note: "Six microbe tests, each with a limit and a result. Heavy metals appear only in a note that the lot was “within specifications”, with no limits or results.",
        sources: [DFS_COA_66621],
      },
      certification: {
        points: 8,
        note: "“Pro-Formance Peptides” by Designs for Sport is in NSF's Certified for Sport list (lot: all), with the same 4-capsule serving as the label; the lot 66621 report also notes NSF approval for banned substances.",
        sources: [DFS_NSF, DFS_COA_66621],
      },
      amount: { points: 8, note: "2.4 g of PeptiStrong fava bean (Vicia faba) protein hydrolysate per 4 capsules.", sources: [DFS_FACTS] },
      source: { points: 4, note: "Fava bean (Vicia faba) protein.", sources: [DFS_FACTS] },
      allergen: { points: 5, note: "No major allergen in the ingredients (fava bean hydrolysate, cellulose, vegetable stearate); labelled free of gluten, dairy and soy.", sources: [DFS_FACTS, DFS] },
      blend: { points: 6, note: "Single active ingredient with its amount.", sources: [DFS_FACTS] },
      "claims-match": {
        points: 13,
        note: "Claims muscle strength, endurance, recovery and retention (fava bean peptides for muscle: limited, −2). Athletic performance and exercise-induced inflammation are not rated.",
        sources: [DFS, TOPIC2.muscle],
      },
      "dose-match": NONE_CITED(DFS),
      "cites-real": NONE_CITED(DFS),
      category: SUPPLEMENT(DFS),
      identity: {
        points: 5,
        note: "Designs for Health, Inc., with a Palm Coast, Florida address and support and legal email addresses, in the terms of use.",
        sources: [DFH_TERMS],
      },
    },
  },
  {
    id: "dfh-htn-supreme",
    brand: "Designs for Health",
    product: "HTN Supreme",
    form: "Capsules: 1.5 g bonito peptide powder (85% peptides) and 200 mg grape seed extract per 4 capsules",
    group: "oral",
    checkedOn: "2026-11-15",
    documentsCheckedOn: "2026-11-15",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: ["blood-pressure"],
    diseaseClaims: false,
    deductions: [],
    summary: "Every amount and the fish source are on the label, but this product is not on the maker's lot-report page and has no certification listing.",
    scores: {
      "coa-batch": {
        points: 0,
        note: "The maker publishes lot reports for many products, but HTN Supreme is not on the list; the page says to call customer service for products not shown.",
        sources: [DFH_COA_PAGE, DFH_HTN],
      },
      "coa-lab": NO_LOT(DFH_HTN),
      "coa-numbers": NO_LOT(DFH_HTN),
      "coa-contaminants": NO_LOT(DFH_HTN),
      certification: { points: 0, note: "No sport or contents certification listing found (not in NSF's Certified for Sport list).", sources: [NSF_SPORT_LIST] },
      amount: { points: 8, note: "1.5 g bonito peptide powder (standardised to 85% peptides) and 200 mg grape seed extract (90% polyphenols) per 4 capsules.", sources: [DFH_HTN] },
      source: { points: 4, note: "Bonito fish, “from dried smoked fish”; the allergen line names tuna and mackerel.", sources: [DFH_HTN] },
      allergen: { points: 5, note: "“Contains fish (tuna, mackerel).”", sources: [DFH_HTN] },
      blend: { points: 6, note: "Each active ingredient is listed with its amount.", sources: [DFH_HTN] },
      "claims-match": {
        points: 13,
        note: "Claims healthy blood pressure (fish peptides and blood pressure: limited, −2). Blood vessels, platelet function, blood flow and antioxidant status are not rated.",
        sources: [DFH_HTN, TOPIC2.bp],
      },
      "dose-match": { points: 5, note: "No study is cited; the page says bonito peptides are “traditionally used in Japan”.", sources: [DFH_HTN] },
      "cites-real": NONE_CITED(DFH_HTN),
      category: SUPPLEMENT(DFH_HTN),
      identity: {
        points: 5,
        note: "Designs for Health, Inc., with a Palm Coast, Florida address and support and legal email addresses, in the terms of use.",
        sources: [DFH_TERMS],
      },
    },
  },
];

// ---------- batch 3: topical peptide products (checked 2026-11-13) ----------
const TOPIC3 = {
  skin: { label: "Skin evidence (topical peptides)", href: "/science/topics/skin" },
  hair: { label: "Hair evidence (topical peptides)", href: "/science/topics/hair" },
};
const TO = (path: string, name: string) => ({ label: `The Ordinary ${name} page`, href: `https://theordinary.com/en-us/${path}` });
const DECIEM_TERMS = { label: "DECIEM terms and conditions", href: "https://theordinary.com/en-us/terms.html" };

/** Shared parts of a topical sheet: cosmetics have no public lot reports or certification programme listings in this batch. */
function topical(o: {
  id: string;
  brand: string;
  product: string;
  form: string;
  page: Source;
  claimAreas: ClaimArea[];
  summary: string;
  /** Defaults to batch 3's date. */
  checkedOn?: string;
  scores: Partial<Record<string, Score>> & Pick<Record<string, Score>, "amount" | "claims-match" | "identity">;
}): ProductGrade {
  const base: Record<string, Score> = {
    "coa-batch": { points: 0, note: "No public lot report found (cosmetic makers rarely publish them).", sources: [o.page] },
    "coa-lab": NO_LOT(o.page),
    "coa-numbers": NO_LOT(o.page),
    "coa-contaminants": NO_LOT(o.page),
    certification: { points: 0, note: "No contents or purity certification listing found; vegan and cruelty-free marks are not counted.", sources: [o.page] },
    source: { points: 4, note: "Each peptide is named by its standard cosmetic ingredient (INCI) name in the full ingredient list.", sources: [o.page] },
    allergen: { points: 5, note: "The full ingredient list is published, so allergen sources can be identified.", sources: [o.page] },
    blend: { points: 6, note: "Branded peptide complexes are broken down into their ingredients in the full list.", sources: [o.page] },
    "dose-match": NONE_CITED(o.page),
    "cites-real": NONE_CITED(o.page),
    category: { points: 5, note: "Sold as a cosmetic, with claims about appearance.", sources: [o.page] },
  };
  return {
    id: o.id,
    brand: o.brand,
    product: o.product,
    form: o.form,
    group: "topical",
    checkedOn: o.checkedOn ?? "2026-11-13",
    documentsCheckedOn: o.checkedOn ?? "2026-11-13",
    rubricVersion: RUBRIC_VERSION,
    claimAreas: o.claimAreas,
    diseaseClaims: false,
    deductions: [],
    summary: o.summary,
    scores: { ...base, ...o.scores } as Record<string, Score>,
  };
}

const UNNAMED_TEST = (page: Source, what: string): Pick<Record<string, Score>, "dose-match" | "cites-real"> => ({
  "dose-match": { points: 2, note: `${what} No study is named, so the concentration tested cannot be compared.`, sources: [page] },
  "cites-real": { points: 2, note: "The result is not linked to a published study a reader could find.", sources: [page] },
});

const TO_HA = TO("multi-peptide-ha-serum-100613.html", "Multi-Peptide + HA Serum");
const TO_CU = TO("multi-peptide-copper-peptides-1-serum-100625.html", "Multi-Peptide + Copper Peptides 1% Serum");
const TO_ARG = TO("argireline-solution-10-serum-100403.html", "Argireline Solution 10%");
const TO_HAIR = TO("multi-peptide-serum-for-hair-density-hair-scalp-treatment-100434.html", "Multi-Peptide Serum for Hair Density");
const VEGAMOUR = { label: "Vegamour product page", href: "https://vegamour.com/products/gro-hair-serum" };
const NIOD = { label: "NIOD product page", href: "https://niod.com/en-us/copper-amino-isolate-serum-3-11-cais3-serum-100368.html" };
const DE = { label: "Drunk Elephant product page", href: "https://www.drunkelephant.com/collections/moisturizers/protini-polypeptide-firming-refillable-moisturizer-999DE00000103.html" };
const OLAY = { label: "Olay product page", href: "https://www.olay.com/products/regenerist-micro-sculpting-cream-moisturizer" };

export const TOPICAL_GRADES: ProductGrade[] = [
  topical({
    id: "the-ordinary-argireline",
    brand: "The Ordinary",
    product: "Argireline Solution 10%",
    form: "Water-based serum with acetyl hexapeptide-8 (Argireline)",
    page: TO_ARG,
    claimAreas: ["skin"],
    summary: "Short, clear ingredient list and modest claims, but no lot report, and the 10% refers to the supplier's solution, not the peptide.",
    scores: {
      amount: {
        points: 4,
        note: "“10%” is the share of Argireline, the supplier's branded solution, not the concentration of the peptide itself, which is not stated.",
        sources: [TO_ARG],
      },
      "claims-match": { points: 13, note: "Claims to target fine lines and wrinkles (topical cosmetic peptides for skin: limited, −2).", sources: [TO_ARG, TOPIC3.skin] },
      identity: { points: 3, note: "DECIEM Beauty Group Inc. is named, with an online contact form; we found no postal address in the terms.", sources: [DECIEM_TERMS] },
    },
  }),
  topical({
    id: "the-ordinary-multi-peptide-copper",
    brand: "The Ordinary",
    product: "Multi-Peptide + Copper Peptides 1% Serum",
    form: "Serum with copper tripeptide-1 (GHK-Cu) and six other peptides",
    page: TO_CU,
    claimAreas: ["skin"],
    summary: "Full ingredient list and the copper-peptide share stated, but no lot report and an unnamed appeal to “well-studied” peptides.",
    scores: {
      amount: { points: 4, note: "Copper peptides are given as 1%; the other six peptides have no stated concentration.", sources: [TO_CU] },
      "claims-match": {
        points: 13,
        note: "Claims the look of fine lines, elasticity, smoothness and firmness (topical cosmetic peptides and topical GHK-Cu for skin: limited, −2).",
        sources: [TO_CU, TOPIC3.skin],
      },
      ...UNNAMED_TEST(TO_CU, "The page calls its peptides “well-studied”."),
      identity: { points: 3, note: "DECIEM Beauty Group Inc. is named, with an online contact form; we found no postal address in the terms.", sources: [DECIEM_TERMS] },
    },
  }),
  topical({
    id: "the-ordinary-multi-peptide-ha",
    brand: "The Ordinary",
    product: "Multi-Peptide + HA Serum",
    form: "Serum with seven peptides and hyaluronic acid (formerly “Buffet”)",
    page: TO_HA,
    claimAreas: ["skin"],
    summary: "Full ingredient list, but no concentrations, no lot report and an unnamed appeal to “well-studied” peptides.",
    scores: {
      amount: { points: 0, note: "No concentration is given for any of the peptides.", sources: [TO_HA] },
      "claims-match": {
        points: 13,
        note: "Claims fewer visible crow's feet and better elasticity and firmness (topical cosmetic peptides for skin: limited, −2).",
        sources: [TO_HA, TOPIC3.skin],
      },
      ...UNNAMED_TEST(TO_HA, "The page calls its five peptide technologies “well-studied”."),
      identity: { points: 3, note: "DECIEM Beauty Group Inc. is named, with an online contact form; we found no postal address in the terms.", sources: [DECIEM_TERMS] },
    },
  }),
  topical({
    id: "the-ordinary-hair-density",
    brand: "The Ordinary",
    product: "Multi-Peptide Serum for Hair Density",
    form: "Scalp serum with biotinoyl tripeptide-1, acetyl tetrapeptide-3, caffeine and plant extracts",
    page: TO_HAIR,
    claimAreas: ["hair"],
    summary: "Full ingredient list, but no concentrations or lot report, an unsourced “+111%” figure and a circulation claim.",
    scores: {
      amount: { points: 0, note: "No concentration is given for any active (the branded complexes are named without percentages).", sources: [TO_HAIR] },
      allergen: {
        points: 5,
        note: "The full ingredient list is published; it names wheat germ (Triticum vulgare) and soy germ (Glycine soja) extracts by their Latin names.",
        sources: [TO_HAIR],
      },
      "claims-match": {
        points: 13,
        note: "Claims the look of thicker, denser hair (topical peptide products for hair: limited, −2). The scalp-hydration figure is not rated.",
        sources: [TO_HAIR, TOPIC3.hair],
      },
      ...UNNAMED_TEST(TO_HAIR, "The page says the serum “instantly boosts scalp hydration by +111%”."),
      category: {
        points: 3,
        note: "Sold as a cosmetic, but says it can “help improve microcirculation to the scalp”, a claim about how the body works that US rules treat as a drug claim.",
        sources: [TO_HAIR],
      },
      identity: { points: 3, note: "DECIEM Beauty Group Inc. is named, with an online contact form; we found no postal address in the terms.", sources: [DECIEM_TERMS] },
    },
  }),
  topical({
    id: "niod-cais3",
    brand: "NIOD",
    product: "Copper Amino Isolate Serum 3 1:1",
    form: "Serum with 1% GHK-Cu, 1% GHK and four other peptides",
    page: NIOD,
    claimAreas: ["skin"],
    summary: "States its two main peptide concentrations, but cites only its own unpublished tests and claims to boost collagen.",
    scores: {
      amount: { points: 4, note: "1% GHK-Cu and 1% GHK are stated; the other four peptides have no concentration.", sources: [NIOD] },
      "claims-match": {
        points: 13,
        note: "Claims fewer fine lines and wrinkles, firmer skin and better texture (topical GHK-Cu for skin: limited, −2).",
        sources: [NIOD, TOPIC3.skin],
      },
      ...UNNAMED_TEST(NIOD, "Results are quoted from the company's own tests in 31 and 32 people over 4 to 12 weeks, with no control group described."),
      category: {
        points: 3,
        note: "Sold as a cosmetic, but says it “promotes natural collagen” and boosts the skin's own collagen, claims about how the body works that US rules treat as drug claims.",
        sources: [NIOD],
      },
      identity: { points: 3, note: "NIOD is a DECIEM brand: DECIEM Beauty Group Inc. is named, with an online contact form; we found no postal address.", sources: [DECIEM_TERMS] },
    },
  }),
  topical({
    id: "drunk-elephant-protini",
    brand: "Drunk Elephant",
    product: "Protini Polypeptide Cream",
    form: "Moisturiser with nine peptides and growth-factor peptides (sh-oligopeptides, sh-polypeptides)",
    page: DE,
    claimAreas: ["skin"],
    summary: "Full ingredient list and a clear company address, but no concentrations, contradictory statements about where the peptides come from, and a collagen claim.",
    scores: {
      amount: { points: 0, note: "No concentration is given for any peptide.", sources: [DE] },
      source: {
        points: 2,
        note: "The ingredient list names each peptide, but the page says the formula contains “plant-derived peptides” while the founder's note calls its growth factors synthetic; the “sh-” names in the list denote synthetic human-identical peptides.",
        sources: [DE],
      },
      "claims-match": {
        points: 13,
        note: "Claims fewer lines and wrinkles and firmer skin (topical cosmetic peptides for skin: limited, −2).",
        sources: [DE, TOPIC3.skin],
      },
      ...UNNAMED_TEST(DE, "“Clinically proven” results are quoted from “a clinical study with 31 people after 8 weeks”."),
      category: {
        points: 3,
        note: "Sold as a cosmetic, but says it “supports healthy collagen production”, a claim about how the body works that US rules treat as a drug claim.",
        sources: [DE],
      },
      identity: {
        points: 5,
        note: "Shiseido Americas Corporation, with a New York address, in the terms; the site has a contact page.",
        sources: [{ label: "Drunk Elephant terms and conditions", href: "https://www.drunkelephant.com/terms.html" }],
      },
    },
  }),
  topical({
    id: "olay-micro-sculpting",
    brand: "Olay",
    product: "Regenerist Micro-Sculpting Cream",
    form: "Moisturiser with niacinamide and three peptides (palmitoyl pentapeptide-4 and others)",
    page: OLAY,
    claimAreas: ["skin"],
    summary: "Full ingredient list and appearance-only claims, but no concentrations, no lot report and no postal address on the brand site.",
    scores: {
      amount: { points: 0, note: "No concentration is given for any peptide.", sources: [OLAY] },
      "claims-match": {
        points: 13,
        note: "Claims the look of fine lines, wrinkles, sagging and elasticity (topical cosmetic peptides for skin: limited, −2).",
        sources: [OLAY, TOPIC3.skin],
      },
      identity: {
        points: 3,
        note: "Procter & Gamble is named and the site has a contact route; we found no postal address on the Olay pages we checked.",
        sources: [OLAY],
      },
    },
  }),
  topical({
    id: "vegamour-gro",
    brand: "Vegamour",
    product: "GRO Hair Serum",
    form: "Scalp serum with plant-made peptides (sh-oligopeptide-2, sh-polypeptide-9 and -86), caffeine and plant extracts",
    page: VEGAMOUR,
    claimAreas: ["hair"],
    checkedOn: "2026-11-15",
    summary: "Full ingredient list and company details, but no peptide concentrations or lot report, and a claim to reduce hair shedding.",
    scores: {
      amount: { points: 0, note: "No concentration is given for any peptide or other active.", sources: [VEGAMOUR] },
      "claims-match": {
        points: 13,
        note: "Claims fuller, thicker-looking hair and less shedding (topical peptide products for hair: limited, −2). Less breakage is not rated.",
        sources: [VEGAMOUR, TOPIC3.hair],
      },
      category: {
        points: 3,
        note: "Sold as a cosmetic, but says it “helps reduce hair shedding”, a claim about hair loss that US rules treat as a drug claim (other lines say “visibly”).",
        sources: [VEGAMOUR],
      },
      identity: {
        points: 5,
        note: "Vegamour, LLC, with a Los Angeles postal address and a support email, in the terms of service.",
        sources: [{ label: "Vegamour terms of service", href: "https://vegamour.com/policies/terms-of-service" }],
      },
    },
  }),
];

/** Every graded product. */
export const ALL_GRADES: ProductGrade[] = [...GRADES, ...ORAL_GRADES, ...TOPICAL_GRADES];

/** Counts used in page text, so adding a product never leaves a number stale. */
export const GRADE_COUNTS = {
  collagen: GRADES.length,
  /** Collagen products without a public lot report. */
  collagenNoLot: GRADES.filter((g) => !g.scores["coa-batch"].points).length,
  purblack: ORAL_GRADES.filter(isPurblack).length,
  /** Oral peptide products other than Pürblack's. */
  oralOther: ORAL_GRADES.filter((g) => !isPurblack(g)).length,
  topical: TOPICAL_GRADES.length,
};
/** Title of the collagen grades page (also used in guides, breadcrumbs and social cards). */
export const COLLAGEN_PAGE_TITLE = `Best collagen peptides: ${GRADES.length} brands graded`;
SHEETS_PAGE.collagen.title = COLLAGEN_PAGE_TITLE.charAt(0).toLowerCase() + COLLAGEN_PAGE_TITLE.slice(1);

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
export function ranked(group?: Group, area?: ClaimArea) {
  return ALL_GRADES.filter((g) => (!group || g.group === group) && (!area || g.claimAreas.includes(area))).sort(
    (a, b) => result(b).total - result(a).total || a.brand.localeCompare(b.brand),
  );
}

// ---------- build checks ----------
for (const g of ALL_GRADES) {
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
if (new Set(ALL_GRADES.map((g) => g.id)).size !== ALL_GRADES.length) throw new Error("grades: duplicate ids");
if (TOTAL_POINTS !== 100) throw new Error("grades: rubric total is not 100");
