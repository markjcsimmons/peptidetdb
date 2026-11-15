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
 * - There is no "natural" or "safety" filter: neither is something the grades measure.
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

export type Route = "mouth" | "skin";
export const ROUTE_LABEL: Record<Route, string> = { mouth: "By mouth", skin: "On the skin" };
export const routeOf = (f: ProductFacts): Route => (f.format === "Serum" || f.format === "Cream" ? "skin" : "mouth");

/** What the peptides are made from, grouped for a reader with an allergy or a diet. From the source criterion. */
export type MadeFrom = "Beef (bovine)" | "Several animals" | "Animal not named" | "Fish" | "Milk" | "Plant" | "Cosmetic peptides" | "Not stated";
export const MADE_FROM_ORDER: MadeFrom[] = ["Beef (bovine)", "Fish", "Milk", "Plant", "Several animals", "Animal not named", "Cosmetic peptides", "Not stated"];
export const MADE_FROM_NOTE: Record<MadeFrom, string> = {
  "Beef (bovine)": "Collagen from cattle (hide or unspecified tissue).",
  Fish: "Peptides from fish protein.",
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
  if (f.ingredient === "purblack-iph") return "Not stated";
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
if (BENEFITS.length === 0) throw new Error("product-finder: no benefits to offer");
