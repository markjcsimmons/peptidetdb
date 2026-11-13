/**
 * Documentation checks for collagen peptide products, shown on /peptides/best-collagen-peptides.
 *
 * This is NOT the grading rubric (/grading-rubric). Nothing here is scored. Each entry records what
 * we could verify from public documents on `COLLAGEN_CHECKED_ON`, with a link for every fact. A
 * product "not verified" here means we did not find the document, never that the product is poor.
 * The working spreadsheet is research/collagen-coa-survey-2026-11-11.xlsx.
 *
 * Rules: state only what a linked document shows; give numbers as printed; say who ran each test;
 * if a fact is uncertain, put it in `unverified`, not in `found`.
 */
export const COLLAGEN_CHECKED_ON = "2026-11-11";

export type Link = { label: string; href: string };

export type ReportedProduct = {
  id: string;
  brand: string;
  product: string;
  /** What the product is, as stated by the seller or printed on the reports. */
  what: string;
  /** How a reader reaches a batch report. */
  reports: string;
  /** Reports we opened ourselves. */
  read: string;
  lab: string;
  results: string[];
  certification?: string;
  /** Things that are missing or odd in what we read. */
  gaps: string[];
  /** Health claims on the seller's page, for comparison with the evidence. */
  claims: string;
  links: Link[];
};

export type CertifiedProduct = {
  id: string;
  brand: string;
  product: string;
  what: string;
  /** What the registry check showed. */
  registry: string;
  /** Whether a batch report is available. */
  batchReport: string;
  claims: string;
  links: Link[];
};

export type UnverifiedProduct = {
  id: string;
  brand: string;
  product: string;
  note: string;
  links: Link[];
};

const NSF_SPORT_LIST = "https://www.nsfsport.com/certified-products/search-results.php?search=collagen";
const nsf173 = (company: string) =>
  `https://info.nsf.org/Certified/Dietary/Listings.asp?CompanyName=${encodeURIComponent(company)}&Standard=173`;

export const REPORTED: ReportedProduct[] = [
  {
    id: "momentous",
    brand: "Momentous",
    product: "Collagen Peptides",
    what: "Bovine collagen peptides plus a second collagen hydrolysate and vitamin C in the lots we read (16.9 g scoop; 15 g protein on the label).",
    reports:
      "A public library with one PDF per lot; about 90 collagen lot reports were listed when we looked. No search box: browse the list and match your lot code.",
    read: "Two lots, made January and February 2026.",
    lab: "SGS is named for the heavy-metal test. The reports do not state any accreditation, and we have not looked up SGS's. Protein and vitamin C were measured by the company's own methods.",
    results: [
      "Arsenic, lead and cadmium: below 0.169 µg per day in both lots. Mercury: 0.178 µg in one lot, below 0.169 µg in the other.",
      "The reports label the metal limits “Report Only”, so there is no pass or fail line to compare against.",
      "Microbes (plate count, yeast and mould, Salmonella, E. coli, S. aureus): within the specifications printed on the reports.",
      "Protein: 16.1 g and 17.6 g against a 15 g label claim.",
    ],
    certification:
      "Listed in NSF's Certified for Sport list and as an NSF/ANSI 173 dietary-supplement listing (both checked in NSF's public registries).",
    gaps: [
      "The PDFs filed as “Collagen Peptides” are titled “Performance Collagen”. On 13 November 2026 the product page listed the same formula as the reports (11.6 g collagen peptides, 5.2 g FORTIGEL, vitamin C), so we treat them as the same product.",
      "Metal limits are not stated, so the numbers cannot be judged against a threshold from the report alone.",
    ],
    claims: "Read 13 November 2026: joints and mobility, tendons and ligaments, skin elasticity, and lean muscle and recovery. The page cites five papers by title.",
    links: [
      { label: "Momentous certificate library", href: "https://www.livemomentous.com/pages/coa-page" },
      { label: "Report, lot 0277B6B", href: "https://www.livemomentous.com/cdn/shop/files/Collagen_Peptides_0277B6B.pdf" },
      { label: "Report, lot 0088A6A", href: "https://www.livemomentous.com/cdn/shop/files/Collagen_Peptide_0088A6A.pdf" },
      { label: "NSF Certified for Sport list", href: NSF_SPORT_LIST },
      { label: "NSF/ANSI 173 listing", href: nsf173("Momentous") },
    ],
  },
  {
    id: "puori",
    brand: "Puori",
    product: "CP1 Pure Collagen Peptides",
    what: "Single ingredient: hydrolysed grass-fed bovine collagen peptides, types I and III. 10 g of collagen peptides (9 g protein) per serving, per the product page.",
    reports:
      "Clean Label Project publishes a report for each batch, found by scanning the QR code or entering the batch number on Puori's page.",
    read: "Four batch reports: two from April 2023, one from August 2023 and one from March 2026.",
    lab: "Ellipse Analytics, which holds ISO/IEC 17025:2017 accreditation from ANAB (certificate L2441, active, valid to 8 February 2027; we checked ANAB's public directory). The accredited scope we read covers heavy metals by ICP-MS, pesticides and bisphenols in dietary supplements.",
    results: [
      "Arsenic: 0.15 µg per serving in the March 2026 batch; not detected in August 2023; 0.19 and 0.26 µg in April 2023. Cadmium and mercury not detected in all four; lead not detected or below the quantification limit.",
      "Results are compared with California Proposition 65 limits (for example arsenic 10, cadmium 4.1, mercury 0.3, lead 0.5 µg per serving), which are not collagen-specific limits.",
      "Also tested: bisphenols, glyphosate and a pesticide panel. In the March 2026 report, bisphenols and glyphosate were not detected, and the summaries of all four reports show the pesticide panel as a pass.",
      "August 2023 batch: protein 10.30 g against a 9 g label claim.",
    ],
    certification: "Clean Label Project describes its programme as certification; we have not separately checked CLP's own listing.",
    gaps: [
      "In the March 2026 report the label-claim (protein) test, residual solvents and antibiotics are marked “Pending”.",
      "The two April 2023 reports show protein or glyphosate as “Not Run” or “ND” next to a “Pass”.",
      "Glyphosate and protein do not appear in the accredited scope we read (glyphosate is listed for finished foods only).",
      "We did not see a microbial test in the results summaries.",
    ],
    claims: "The page says the product supports skin elasticity, joints and tendons, bones, hair and nails, with the standard FDA disclaimer.",
    links: [
      { label: "Puori CP1 product page", href: "https://puori.com/products/cp1-pure-collagen-peptides" },
      { label: "Report, batch B2512111 (March 2026)", href: "https://cleanlabelproject.org/wp-content/uploads/CP1-Pure-Collagen-Peptides-Batch-Number-B2512111-1.pdf" },
      { label: "Report, batch 104804 (August 2023)", href: "https://cleanlabelproject.org/wp-content/uploads/securepdfs/CP1-Pure-Collagen-Peptides-Batch-Number-104804.pdf" },
      { label: "ANAB directory (search “Ellipse”)", href: "https://search.anab.org/" },
      {
        label: "Ellipse accreditation scope (ANAB, version 014)",
        href: "https://search.anab.org/public/organization_files/Third-Party-Validation-and-Verification-LLC-dba-Ellipse-Analytics-Cert-and-Scope-File-02-25-2026_1772035074.pdf",
      },
    ],
  },
  {
    id: "transparent-labs",
    brand: "Transparent Labs",
    product: "Grass-Fed Collagen",
    what: "Bovine hide collagen peptides (the reports cover 22.2 g and 23.6 g servings, unflavoured and vanilla).",
    reports:
      "A “Third-Party Tests” page you can search by product name; each entry gives the lot number, test date and a PDF. It listed 12 collagen entries when we looked, so not every lot has a report there.",
    read: "Two lots: unflavoured lot 26032527 (completed 15 April 2026) and vanilla lot 26041533 (completed 11 May 2026).",
    lab: "Advanced Laboratories is named on the reports. The reports state no accreditation; the brand says it uses ISO/IEC 17025 laboratories, which we have not verified.",
    results: [
      "Per serving, with the limit printed beside it (unflavoured / vanilla): arsenic 0.31 / 0.26 µg (limit 10); cadmium 0.02 / below 0.02 µg (4.1); mercury below 0.02 / 0.05 µg (0.3); lead 0.11 / 0.45 µg (0.5).",
      "Microbes (aerobic count, yeast and mould, coliform, E. coli, S. aureus, Salmonella): within the printed specifications in both lots.",
    ],
    certification:
      "The Informed Choice public registry lists the product (certified 31 July 2023) with batch numbers and test dates; the vanilla lot we read appears there too. The registry shows certification and test dates, not test results.",
    gaps: [
      "The two reports do not include protein or collagen content. The page also lists an “ingredient verification” document for unflavoured, which we did not read.",
      "In the vanilla lot, lead was 0.45 µg against a limit of 0.5 µg: within the limit, but close to it. Flavoured lots may differ from unflavoured ones.",
      "The Informed Choice registry lists more batches than the brand's page has reports for.",
    ],
    claims: "We did not read the product page in full; a search excerpt mentions support for skin and joints.",
    links: [
      { label: "Transparent Labs third-party tests page", href: "https://www.transparentlabs.com/pages/third-party-tests" },
      {
        label: "Report, unflavoured lot 26032527",
        href: "https://cdn.shopify.com/s/files/1/0866/7664/files/Nutricost_Manufacturing_293607-08_20260415_1244_01.pdf?v=1778980474",
      },
      {
        label: "Report, vanilla lot 26041533",
        href: "https://cdn.shopify.com/s/files/1/0866/7664/files/TPL_Collagen_WS_Vanilla_30_SERV_-_26041533_-_Heavy_Metals_Micro.pdf?v=1779717453",
      },
      { label: "Informed Choice registry entry", href: "https://choice.wetestyoutrust.com/ja/node/413514" },
    ],
  },
];

export const CERTIFIED: CertifiedProduct[] = [
  {
    id: "bubs",
    brand: "Bubs Naturals",
    product: "Collagen Peptides",
    what: "Grass-fed bovine collagen peptides; 10 g packets or tubs.",
    registry: "Listed in NSF's Certified for Sport list and as an NSF/ANSI 173 listing.",
    batchReport: "None found. The brand's blog says to contact the company for a certificate.",
    claims: "Not read.",
    links: [
      { label: "Product page", href: "https://www.bubsnaturals.com/products/collagen-peptides" },
      { label: "NSF Certified for Sport list", href: NSF_SPORT_LIST },
      { label: "NSF/ANSI 173 listing", href: nsf173("Bubs") },
    ],
  },
  {
    id: "bulksupplements",
    brand: "BulkSupplements",
    product: "Hydrolyzed Bovine Collagen",
    what: "Bovine skin collagen; the page gives an assay of at least 90% protein.",
    registry: "“Bovine Collagen” is in NSF's Certified for Sport list, and BulkSupplements.com has NSF/ANSI 173 listings (we did not confirm which collagen product the 173 listing covers).",
    batchReport: "On request: a support article says a certificate of analysis is available for each product through a request form (the article is old; we did not test the request).",
    claims: "Not read.",
    links: [
      { label: "Product page", href: "https://www.bulksupplements.com/products/hydrolyzed-bovine-collagen-powder" },
      { label: "Support article on certificates", href: "https://support.bulksupplements.com/hc/en-us/articles/360003612254-Do-you-a-provide-COA-for-your-products" },
      { label: "NSF Certified for Sport list", href: NSF_SPORT_LIST },
    ],
  },
  {
    id: "codeage",
    brand: "Codeage",
    product: "Multi Collagen and Wild-Caught Marine Collagen Peptides",
    what: "Multi-source collagen (five types) and a fish-derived (marine) collagen; both are listed.",
    registry: "NSF/ANSI 173 listings for Multi Collagen, Multi Collagen Peptides and Wild-Caught Marine Collagen Peptides. Not in NSF's Certified for Sport list for collagen.",
    batchReport: "None found.",
    claims: "Not read. The marine product is fish-derived: see the fish-allergy note below.",
    links: [
      { label: "Multi collagen product page", href: "https://www.codeage.com/products/multi-collagen-protein-powder" },
      { label: "NSF/ANSI 173 listing", href: nsf173("Codeage") },
    ],
  },
  {
    id: "thorne",
    brand: "Thorne",
    product: "Collagen Fit",
    what: "Bovine collagen peptides, 15 g per scoop (the NSF listing gives a 16.85 g serving).",
    registry: "Listed in NSF's Certified for Sport list and as an NSF/ANSI 173 listing (Collagen Fit and Collagen Plus).",
    batchReport: "None found; the product page does not mention one.",
    claims: "The page says it supports joint and muscle health, and the strength and health of joints, tendons, bones and ligaments, with the FDA disclaimer.",
    links: [
      { label: "Product page", href: "https://thorne.com/products/dp/collagen-fit" },
      { label: "NSF Certified for Sport list", href: NSF_SPORT_LIST },
      { label: "NSF/ANSI 173 listing", href: nsf173("Thorne") },
    ],
  },
  {
    id: "vital-proteins",
    brand: "Vital Proteins",
    product: "Collagen Peptides",
    what: "Bovine hide collagen peptides, single ingredient. (Its old page address now shows a version with hyaluronic acid and vitamin C; the link below is the plain product.)",
    registry:
      "Several Vital Proteins collagen products are in NSF's Certified for Sport list, and the company (Nestlé Healthcare Nutrition, Inc. DBA Vital Proteins) has NSF/ANSI 173 listings for Collagen Peptides and its variants. The product page itself does not mention certification.",
    batchReport: "None found; the page we read has no testing information.",
    claims: "The page says it supports hair, nails, skin, bones and joints, with the FDA disclaimer.",
    links: [
      { label: "Product page", href: "https://www.vitalproteins.com/products/vp-collagen-peptides" },
      { label: "NSF Certified for Sport list", href: NSF_SPORT_LIST },
      { label: "NSF/ANSI 173 listing", href: nsf173("Nestle Healthcare") },
    ],
  },
];

export const UNVERIFIED: UnverifiedProduct[] = [
  {
    id: "ancient-nutrition",
    brand: "Ancient Nutrition",
    product: "Multi Collagen Protein",
    note: "A multi-source product (its page lists fermented eggshell membrane and its cross-contact warning mentions fish and egg). It shows a “third-party testing” badge, and the page has a “Can I see your Certificate of Analysis?” question that we did not read the answer to. We found no batch report and no NSF listing.",
    links: [{ label: "Product page", href: "https://ancientnutrition.com/pages/multi-collagen-100serv2" }],
  },
  {
    id: "further-food",
    brand: "Further Food",
    product: "Collagen Peptides",
    note: "The brand says it uses third-party testing. We found no named lab, no batch report and no NSF listing.",
    links: [{ label: "FAQ page", href: "https://www.furtherfood.com/pages/faqs" }],
  },
  {
    id: "garden-of-life",
    brand: "Garden of Life",
    product: "Grass Fed Collagen Peptides",
    note: "The product page cites non-GMO and gluten-free marks. NSF's dietary-supplement listings for Garden of Life (checked 13 November 2026) include two other collagen products, a turmeric multi-sourced collagen and a collagen with hyaluronic acid, but not Grass Fed Collagen Peptides. We found no batch report.",
    links: [
      { label: "Product page", href: "https://www.gardenoflife.com/collagen-peptides" },
      { label: "NSF/ANSI 173 search", href: nsf173("Garden of Life") },
    ],
  },
  {
    id: "great-lakes",
    brand: "Great Lakes Wellness",
    product: "Collagen Peptides",
    note: "The FAQ says each batch goes to an outside laboratory. We found no named lab, no batch report and no NSF listing.",
    links: [{ label: "FAQ page", href: "https://greatlakeswellness.com/pages/faqs" }],
  },
  {
    id: "naked-nutrition",
    brand: "Naked Nutrition",
    product: "Collagen Peptides",
    note: "The product page says the contents are NSF certified, with testing for heavy metals and pesticides. When we searched NSF's public dietary-supplement registry on 11 and 13 November 2026 under the company name (Naked Whey, Inc.) and under “collagen”, we could not match a Naked collagen listing (it showed seven energy and creatine products); it may be listed under another name. We found no public batch report.",
    links: [
      { label: "Product page", href: "https://nakednutrition.com/products/collagen-peptides-powder" },
      { label: "NSF/ANSI 173 search for “Naked”", href: nsf173("Naked") },
    ],
  },
  {
    id: "orgain",
    brand: "Orgain",
    product: "Collagen Peptides",
    note: "The certification we found for its collagen line is a non-GMO programme (2022). We found no batch report and no NSF listing.",
    links: [],
  },
  {
    id: "sports-research",
    brand: "Sports Research",
    product: "Collagen Peptides",
    note: "The product page shows an Informed Choice badge, “third party tested” and a non-GMO tested badge. On 13 November 2026 Informed Choice's registry search listed “Collagen Peptides Powder” under Sports Research; the listing page itself was behind a bot check, so we could not read its dates. We found no Sports Research collagen in NSF's lists and no batch report.",
    links: [{ label: "Product page", href: "https://www.sportsresearch.com/products/collagen-peptides-hydrolyzed-gelatin-2" }],
  },
];
