/**
 * What a reader needs to match a graded product to their needs: its form, what it is made from, which kind of
 * ingredient it is, and which of this site's evidence ratings apply to each benefit its seller claims.
 *
 * Rules (the same for every brand, Pürblack's included):
 * - A product is listed for a goal when its seller claims that benefit for its peptide or collagen ingredients
 *   (`claimAreas` in lib/grades.ts). Being listed is not a recommendation.
 * - Each listed claim shows the rating of the product's ingredient type for that claim, from lib/topics.ts, or
 *   "not assessed" when we have read no study of that ingredient for that claim. Listing a product under a claim
 *   with no entry here fails the build.
 * - Facts here restate the scoring sheets (the source and certification criteria); do not add new ones.
 */
import type { Topic } from "@/lib/studies";
import { ALL_GRADES, type ClaimArea } from "@/lib/grades";

export type Ingredient =
  | "collagen"
  | "multi-collagen"
  | "purblack-iph"
  | "casein-hydrolysate"
  | "fish-protein"
  | "topical-peptides"
  | "topical-ghk-cu";

export const INGREDIENT_LABEL: Record<Ingredient, string> = {
  collagen: "Collagen peptides",
  "multi-collagen": "Collagen from several sources",
  "purblack-iph": "Pürblack peptide complexes (IPH)",
  "casein-hydrolysate": "Casein hydrolysate (Lactium)",
  "fish-protein": "Fish protein peptides",
  "topical-peptides": "Cosmetic peptides on the skin",
  "topical-ghk-cu": "Copper peptide (GHK-Cu) on the skin",
};

export type Format = "Powder" | "Capsules" | "Tablets" | "Serum" | "Cream";

export type ProductFacts = {
  ingredient: Ingredient;
  format: Format;
  /** What the peptides are made from, as the scoring sheet's source criterion found it. */
  source: string;
};

/**
 * The maker's own product page: the page we graded (it must be one of the scoring sheet's sources; checked below).
 * Plain links: no affiliate codes or tracking, and marked nofollow where shown.
 */
export const PRODUCT_URL: Record<string, string> = {
  "momentous": "https://www.livemomentous.com/products/collagen-peptides",
  "puori": "https://puori.com/products/cp1-pure-collagen-peptides",
  "transparent-labs": "https://www.transparentlabs.com/products/collagen-protein-powder",
  "bubs": "https://www.bubsnaturals.com/products/collagen-peptides",
  "thorne": "https://www.thorne.com/products/dp/collagen-fit",
  "bulksupplements": "https://www.bulksupplements.com/products/hydrolyzed-bovine-collagen-powder",
  "codeage": "https://www.codeage.com/products/multi-collagen-protein-powder",
  "vital-proteins": "https://www.vitalproteins.com/products/vp-collagen-peptides",
  "garden-of-life": "https://www.gardenoflife.com/collagen-peptides",
  "naked-nutrition": "https://nakednutrition.com/products/collagen-peptides-powder",
  "sports-research": "https://www.sportsresearch.com/products/collagen-peptides-hydrolyzed-gelatin-2",
  "great-lakes": "https://greatlakeswellness.com/products/16oz-collagen-peptides",
  "orgain": "https://orgain.com/products/grass-fed-pasture-raised-collagen-peptides",
  "further-food": "https://www.furtherfood.com/products/collagen-peptides-powder",
  "ancient-nutrition": "https://ancientnutrition.com/pages/multi-collagen-100serv2",
  "purblack-muscle": "https://purblack.com/products/muscle-peptide",
  "purblack-joint": "https://purblack.com/products/joint-peptide",
  "purblack-vascular": "https://purblack.com/products/vascular-peptide-1",
  "purblack-vision": "https://purblack.com/products/vision-peptide",
  "purblack-brain-am": "https://purblack.com/products/brain-am",
  "purblack-brain-pm": "https://purblack.com/products/brain-pm",
  "purblack-multivitamin": "https://purblack.com/products/multi-vitamin-peptide-capsules-60-count-30-servings",
  "purblack-immune": "https://purblack.com/products/immune-peptide",
  "life-extension-milk-peptides": "https://www.lifeextension.com/vitamins-supplements/item01512/bioactive-milk-peptides",
  "metagenics-vasotensin": "https://www.metagenics.com/en-us/product/vasotensin",
  "natural-factors-peptace": "https://naturalfactors.com/products/peptace-fish-peptides",
  "biotics-de-stress": "https://shop.bioticsresearch.com/collections/all-products-a-z/products/de-stress",
  "pure-sereniten-plus": "https://www.pureencapsulationspro.com/sereniten-plus-45.html",
  "the-ordinary-argireline": "https://theordinary.com/en-us/argireline-solution-10-serum-100403.html",
  "the-ordinary-multi-peptide-copper": "https://theordinary.com/en-us/multi-peptide-copper-peptides-1-serum-100625.html",
  "the-ordinary-multi-peptide-ha": "https://theordinary.com/en-us/multi-peptide-ha-serum-100613.html",
  "the-ordinary-hair-density": "https://theordinary.com/en-us/multi-peptide-serum-for-hair-density-hair-scalp-treatment-100434.html",
  "niod-cais3": "https://niod.com/en-us/copper-amino-isolate-serum-3-11-cais3-serum-100368.html",
  "drunk-elephant-protini": "https://www.drunkelephant.com/collections/moisturizers/protini-polypeptide-firming-refillable-moisturizer-999DE00000103.html",
  "olay-micro-sculpting": "https://www.olay.com/products/regenerist-micro-sculpting-cream-moisturizer",
};

const GRASS_FED = "Animal not named (“grass-fed”)";
const INCI = "Named peptides (ingredient list)";
const PB: ProductFacts = { ingredient: "purblack-iph", format: "Capsules", source: "Not stated on the label" };

/** One entry per graded product id (checked against lib/grades.ts at the bottom). */
export const PRODUCT_FACTS: Record<string, ProductFacts> = {
  momentous: { ingredient: "collagen", format: "Powder", source: "Bovine" },
  puori: { ingredient: "collagen", format: "Powder", source: "Bovine" },
  "transparent-labs": { ingredient: "collagen", format: "Powder", source: "Bovine (hide)" },
  bubs: { ingredient: "collagen", format: "Powder", source: "Bovine" },
  thorne: { ingredient: "collagen", format: "Powder", source: "Bovine" },
  bulksupplements: { ingredient: "collagen", format: "Powder", source: "Bovine" },
  codeage: { ingredient: "multi-collagen", format: "Powder", source: "Bovine, chicken, fish (cod, snapper) and egg" },
  "vital-proteins": { ingredient: "collagen", format: "Powder", source: "Bovine (hide)" },
  "garden-of-life": { ingredient: "collagen", format: "Powder", source: GRASS_FED },
  "naked-nutrition": { ingredient: "collagen", format: "Powder", source: "Bovine (hide)" },
  "sports-research": { ingredient: "collagen", format: "Powder", source: "Bovine" },
  "great-lakes": { ingredient: "collagen", format: "Powder", source: "Bovine" },
  orgain: { ingredient: "collagen", format: "Powder", source: GRASS_FED },
  "further-food": { ingredient: "collagen", format: "Powder", source: GRASS_FED },
  "ancient-nutrition": { ingredient: "multi-collagen", format: "Powder", source: "Several sources, not all named" },
  "purblack-muscle": PB,
  "purblack-joint": PB,
  "purblack-vascular": PB,
  "purblack-vision": PB,
  "purblack-brain-am": PB,
  "purblack-brain-pm": PB,
  "purblack-multivitamin": PB,
  "purblack-immune": PB,
  "life-extension-milk-peptides": { ingredient: "casein-hydrolysate", format: "Capsules", source: "Milk (casein)" },
  "metagenics-vasotensin": { ingredient: "fish-protein", format: "Tablets", source: "Fish (bonito, mackerel)" },
  "natural-factors-peptace": { ingredient: "fish-protein", format: "Capsules", source: "Fish (bonito)" },
  "biotics-de-stress": { ingredient: "casein-hydrolysate", format: "Capsules", source: "Milk (casein)" },
  "pure-sereniten-plus": { ingredient: "casein-hydrolysate", format: "Capsules", source: "Milk (casein, cows in France)" },
  "the-ordinary-argireline": { ingredient: "topical-peptides", format: "Serum", source: INCI },
  "the-ordinary-multi-peptide-copper": { ingredient: "topical-ghk-cu", format: "Serum", source: INCI },
  "the-ordinary-multi-peptide-ha": { ingredient: "topical-peptides", format: "Serum", source: INCI },
  "the-ordinary-hair-density": { ingredient: "topical-peptides", format: "Serum", source: INCI },
  "niod-cais3": { ingredient: "topical-ghk-cu", format: "Serum", source: INCI },
  "drunk-elephant-protini": { ingredient: "topical-peptides", format: "Cream", source: "Unclear (“plant-derived” or synthetic)" },
  "olay-micro-sculpting": { ingredient: "topical-peptides", format: "Cream", source: INCI },
};

/** A rating on a topic page, or an explicit statement that we have not assessed this ingredient for this claim. */
export type ClaimEvidence = { ratings: [Topic, string][] } | { unassessed: string };

const COLLAGEN: Partial<Record<ClaimArea, ClaimEvidence>> = {
  joints: {
    ratings: [
      ["joints", "Oral collagen for osteoarthritis symptoms"],
      ["joints", "Oral collagen peptides for exercise-related knee and joint pain (no arthritis)"],
    ],
  },
  tendons: { ratings: [["joints", "Oral collagen for tendon problems (tendinopathy)"]] },
  skin: { ratings: [["skin", "Oral collagen peptides"]] },
  hair: { ratings: [["hair", "Oral collagen peptides for hair"]] },
  bone: { ratings: [["womens-health", "Oral collagen peptides for bone density after menopause"]] },
  muscle: {
    ratings: [
      ["muscle", "Oral collagen peptides with resistance training: fat-free mass"],
      ["muscle", "Oral collagen peptides with resistance training: strength"],
    ],
  },
  gut: { ratings: [["gut", "Oral collagen peptides for gut health, bloating or gut barrier"]] },
  sleep: { ratings: [["brain", "Collagen peptides before bed for sleep"]] },
};

/** The one rating of Pürblack's capsules, written from the muscle and joint papers we read (see lib/topics.ts). */
const PURBLACK_RATING: ClaimEvidence = {
  ratings: [["oral-peptides", "Pürblack's oral targeted peptide capsules (Muscle+, Joint+, Vascular+ and related products)"]],
};

/**
 * Evidence for each claim by ingredient type. Multi-source collagen uses the collagen ratings: the trials tested
 * collagen peptides, not the other ingredients in the blend. Claims for which we have read no study of the ingredient
 * say so, rather than borrowing a rating written for another use.
 */
export const CLAIM_EVIDENCE: Record<Ingredient, Partial<Record<ClaimArea, ClaimEvidence>>> = {
  collagen: COLLAGEN,
  "multi-collagen": COLLAGEN,
  "purblack-iph": {
    joints: PURBLACK_RATING,
    muscle: PURBLACK_RATING,
    bone: { unassessed: "Pürblack's joint paper, which we read, is about joints; we have read no study of these peptides for bone." },
    "blood-pressure": {
      unassessed: "Pürblack cites a 2019 paper for this peptide; it is not in PubMed and we have not read it.",
    },
    sleep: { unassessed: "We have read no study of these peptide complexes for sleep." },
    brain: { unassessed: "We have read no study of these peptide complexes for memory or focus." },
    stress: { unassessed: "We have read no study of these peptide complexes for stress." },
  },
  "casein-hydrolysate": {
    sleep: { ratings: [["brain", "Casein hydrolysate (Lactium) for sleep"]] },
    stress: { unassessed: "Our casein hydrolysate rating covers sleep; we have not summarised its stress trials." },
    brain: { unassessed: "We have summarised no trial of casein hydrolysate for memory or thinking." },
  },
  "fish-protein": {
    "blood-pressure": {
      unassessed: "The fish-peptide trials we summarised used sardine or other fish hydrolysates, not bonito peptides.",
    },
  },
  "topical-peptides": {
    skin: { ratings: [["skin", "Topical cosmetic peptides (argireline, palmitoyl peptides and similar)"]] },
    hair: { ratings: [["hair", "Topical peptide products for hair loss (GPIGS, acetyl tetrapeptide-3 and similar)"]] },
  },
  "topical-ghk-cu": { skin: { ratings: [["skin", "Topical GHK-Cu (copper peptide)"]] } },
};

// ---------- build checks ----------
for (const g of ALL_GRADES) {
  if (!PRODUCT_FACTS[g.id]) throw new Error(`product-match: no PRODUCT_FACTS entry for graded product ${g.id}`);
  const url = PRODUCT_URL[g.id];
  if (!url) throw new Error(`product-match: no PRODUCT_URL for graded product ${g.id}`);
  if (!Object.values(g.scores).some((sc) => sc.sources.some((src) => src.href === url))) {
    throw new Error(`product-match: PRODUCT_URL for ${g.id} is not a page its scoring sheet cites`);
  }
}
for (const id of Object.keys(PRODUCT_FACTS)) {
  if (!ALL_GRADES.some((g) => g.id === id)) throw new Error(`product-match: PRODUCT_FACTS has ${id}, which is not a graded product`);
}
