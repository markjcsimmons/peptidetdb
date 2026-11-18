/**
 * Data for the product finder (/products): which benefits a reader can pick, and the facts each filter uses.
 * Every fact here is derived from lib/grades.ts and lib/product-match.ts; nothing new is asserted.
 *
 * Rules:
 * - A benefit is offered only when products from more than one maker claim it; a benefit claimed only by Pürblack
 *   products would make a Pürblack-only list (the same rule as the goal-page panels). Those benefits are named on
 *   the page instead.
 * - "Lab report for the lot" means the batch-report criterion scored above 0; "sport-tested" means the
 *   certification criterion scored 8 (a sport-testing programme's directory lists it).
 * - There is no "natural", "targeted" or "safety" filter: none is something the grades or the evidence measure
 *   ("natural" and "targeted" are one seller's marketing words). The product types are plain descriptions of form
 *   and ingredient.
 */
import { ALL_GRADES, isPurblack, type ClaimArea, type ProductGrade } from "@/lib/grades";
import { PRODUCT_FACTS, type ProductFacts } from "@/lib/product-match";

export type Benefit = {
  id: string;
  label: string;
  areas: ClaimArea[];
  /** The ranked evidence list for this goal. */
  guide: string;
};

const ALL_BENEFITS: Benefit[] = [
  { id: "joints", label: "Joints & tendons", areas: ["joints", "tendons"], guide: "/peptides/peptides-for-joint-pain" },
  { id: "skin", label: "Skin", areas: ["skin"], guide: "/peptides/best-peptides-for-skin" },
  { id: "hair", label: "Hair", areas: ["hair"], guide: "/peptides/peptides-for-hair-growth" },
  { id: "bone", label: "Bone", areas: ["bone"], guide: "/peptides/peptides-for-women" },
  { id: "muscle", label: "Muscle", areas: ["muscle"], guide: "/peptides/peptides-for-muscle-growth" },
  { id: "sleep", label: "Sleep", areas: ["sleep"], guide: "/peptides/peptides-for-sleep" },
  { id: "brain", label: "Memory, focus & stress", areas: ["brain", "stress"], guide: "/peptides/nootropic-peptides" },
  { id: "blood-pressure", label: "Blood pressure", areas: ["blood-pressure"], guide: "/peptides/peptides-for-blood-pressure" },
  { id: "gut", label: "Gut health", areas: ["gut"], guide: "/peptides/peptides-for-gut-health" },
  { id: "eye", label: "Eyes", areas: ["eye"], guide: "/peptides/peptides-for-eye-health" },
  { id: "immune", label: "Immune function", areas: ["immune"], guide: "/peptides/peptides-for-immune-system" },
];

const claims = (g: ProductGrade, b: Benefit) => b.areas.some((a) => g.claimAreas.includes(a));
const offered = (b: Benefit) => ALL_GRADES.some((g) => claims(g, b) && !isPurblack(g));

/** Benefits a reader can filter by. */
export const BENEFITS = ALL_BENEFITS.filter((b) => ALL_GRADES.some((g) => claims(g, b)) && offered(b));
/** Benefits claimed only by Pürblack products so far: named on the page, not offered as a filter. */
export const SINGLE_MAKER_BENEFITS = ALL_BENEFITS.filter((b) => ALL_GRADES.some((g) => claims(g, b)) && !offered(b));

export const benefitFor = (area: ClaimArea) => BENEFITS.find((b) => b.areas.includes(area));

/**
 * Type of product, from the ingredient and format in lib/product-match.ts. It also says how you take it (collagen
 * and capsules by mouth, creams and serums on the skin), so it replaces a separate "how you take it" filter.
 */
export type Kind = "collagen" | "capsules" | "topical";
export const KIND_ORDER: Kind[] = ["collagen", "capsules", "topical"];
export const KIND_LABEL: Record<Kind, string> = {
  collagen: "Collagen powders",
  capsules: "Peptide capsules & tablets",
  topical: "Creams & serums",
};
export const KIND_NOTE: Record<Kind, string> = {
  collagen: "Collagen peptide powders, mixed into food or drink.",
  capsules:
    "Capsules or tablets of protein fragments other than collagen, taken by mouth: milk peptides (Lactium), fish (bonito) peptides, fava bean peptides and Pürblack’s peptide complexes (from marine protein, the seller says).",
  topical: "Peptides in a serum or cream, put on the skin or scalp.",
};

export function kindOf(f: ProductFacts): Kind {
  if (f.format === "Serum" || f.format === "Cream") return "topical";
  if (f.ingredient === "collagen" || f.ingredient === "multi-collagen") {
    if (f.format !== "Powder") throw new Error(`product-finder: collagen product as ${f.format}; "Collagen powders" no longer fits`);
    return "collagen";
  }
  if (f.format !== "Capsules" && f.format !== "Tablets")
    throw new Error(`product-finder: ${f.ingredient} as ${f.format}; "Peptide capsules & tablets" no longer fits`);
  return "capsules";
}

/** What the peptides are made from, grouped for a reader with an allergy or a diet. From the source criterion. */
export type MadeFrom =
  | "Beef (bovine)"
  | "Several animals"
  | "Animal not named"
  | "Fish"
  | "Marine, species not named"
  | "Milk"
  | "Plant"
  | "Cosmetic peptides"
  | "Not stated";
export const MADE_FROM_ORDER: MadeFrom[] = [
  "Beef (bovine)",
  "Fish",
  "Marine, species not named",
  "Milk",
  "Plant",
  "Several animals",
  "Animal not named",
  "Cosmetic peptides",
  "Not stated",
];
export const MADE_FROM_NOTE: Record<MadeFrom, string> = {
  "Beef (bovine)": "Collagen from cattle (hide or unspecified tissue).",
  Fish: "Peptides from fish protein.",
  "Marine, species not named":
    "The seller says marine protein but names no species, and the label does not say; it may be fish. Its FAQ says people who eat fish or algae can take them.",
  Milk: "Peptides from milk protein (casein).",
  Plant: "Peptides from plant protein (for example fava bean).",
  "Several animals": "Collagen from more than one animal; may include fish, chicken or egg.",
  "Animal not named": "The seller says “grass-fed” but does not name the animal.",
  "Cosmetic peptides": "Peptides named by their cosmetic ingredient names on a cream or serum.",
  "Not stated": "The label does not say what the peptides are made from.",
};

export function madeFromOf(f: ProductFacts): MadeFrom {
  if (f.ingredient === "multi-collagen") return "Several animals";
  if (f.ingredient === "fish-protein") return "Fish";
  if (f.ingredient === "casein-hydrolysate") return "Milk";
  if (f.ingredient === "fava-bean-peptides") return "Plant";
  if (f.ingredient === "purblack-iph") return "Marine, species not named";
  if (f.ingredient === "topical-peptides" || f.ingredient === "topical-ghk-cu") {
    return f.source.startsWith("Unclear") ? "Not stated" : "Cosmetic peptides";
  }
  if (f.source.startsWith("Bovine")) return "Beef (bovine)";
  if (f.source.startsWith("Animal not named")) return "Animal not named";
  throw new Error(`product-finder: no "made from" group for source "${f.source}"`);
}

export const hasLotReport = (g: ProductGrade) => (g.scores["coa-batch"].points ?? 0) > 0;
export const isSportTested = (g: ProductGrade) => g.scores.certification.points === 8;

// ---------- build checks ----------
for (const g of ALL_GRADES) madeFromOf(PRODUCT_FACTS[g.id]);
// Same rule as the benefits: a type is offered only when products from more than one maker have it.
for (const k of KIND_ORDER) {
  const of = ALL_GRADES.filter((g) => kindOf(PRODUCT_FACTS[g.id]) === k);
  if (!of.some((g) => !isPurblack(g))) throw new Error(`product-finder: type "${k}" would list only Pürblack products`);
}
if (BENEFITS.length === 0) throw new Error("product-finder: no benefits to offer");
