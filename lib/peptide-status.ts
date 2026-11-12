import type { PeptideId } from "./studies";

/**
 * US status of each peptide in the registry, with the primary source for every regulatory claim.
 * - Approvals: openFDA drugs@FDA records (api.fda.gov), checked 2026-11-12; links go to the Drugs@FDA overview.
 * - Unapproved: FDA's compounding safety-risk page, "content current as of 04/22/2026", read 2026-11-12.
 * - "Sold as a supplement" and "cosmetic ingredient" describe how products are sold, not an FDA decision.
 * When FDA's page or an approval changes, update this file and STATUS_CHECKED.
 */
export const STATUS_CHECKED = "2026-11-12";

export type StatusKind = "approved" | "fda-risk-list" | "investigational" | "supplement" | "cosmetic" | "unclassified";

export const STATUS_LABEL: Record<StatusKind, string> = {
  approved: "FDA-approved prescription drug",
  "fda-risk-list": "Not approved; on FDA's compounding risk page",
  investigational: "Investigational; not approved",
  supplement: "Sold as a supplement or food",
  cosmetic: "Cosmetic ingredient",
  unclassified: "Not classified here",
};

export type Source = { label: string; url: string };

const DAF = (appl: string) =>
  `https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=${appl.replace(/\D/g, "")}`;
const FDA_RISK: Source = {
  label: "FDA: bulk drug substances that may present significant safety risks (current as of 22 April 2026)",
  url: "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks",
};
const WITHDRAWN = "FDA's compounding page lists it among substances whose nominations were withdrawn.";
const COMMITTEE = " FDA's advisory committee reviewed it in July 2026; no final FDA decision.";

export type PeptideStatus = { kind: StatusKind; note: string; sources: Source[] };

export const PEPTIDE_STATUS: Record<PeptideId, PeptideStatus> = {
  semaglutide: {
    kind: "approved",
    note: "Approved as Ozempic and Rybelsus (and as Wegovy for weight).",
    sources: [
      { label: "Drugs@FDA: NDA 213051 (Ozempic, Rybelsus)", url: DAF("213051") },
      { label: "Drugs@FDA: NDA 215256 (Wegovy)", url: DAF("215256") },
    ],
  },
  tirzepatide: {
    kind: "approved",
    note: "Approved as Mounjaro and Zepbound.",
    sources: [
      { label: "Drugs@FDA: NDA 215866 (Mounjaro)", url: DAF("215866") },
      { label: "Drugs@FDA: NDA 217806 (Zepbound)", url: DAF("217806") },
    ],
  },
  "glp-1-agonists": {
    kind: "approved",
    note: "A drug class: semaglutide, tirzepatide and liraglutide are approved prescription drugs.",
    sources: [{ label: "Drugs@FDA: NDA 213051 (semaglutide)", url: DAF("213051") }],
  },
  bremelanotide: {
    kind: "approved",
    note: "Approved as Vyleesi (autoinjector).",
    sources: [{ label: "Drugs@FDA: NDA 210557 (Vyleesi)", url: DAF("210557") }],
  },
  "gc-c-agonists": {
    kind: "approved",
    note: "Linaclotide (Linzess) and plecanatide (Trulance) are approved.",
    sources: [
      { label: "Drugs@FDA: NDA 202811 (Linzess)", url: DAF("202811") },
      { label: "Drugs@FDA: NDA 208745 (Trulance)", url: DAF("208745") },
    ],
  },
  "glp-2-analogues": {
    kind: "approved",
    note: "Teduglutide is approved as Gattex.",
    sources: [{ label: "Drugs@FDA: NDA 203441 (Gattex)", url: DAF("203441") }],
  },
  tesamorelin: {
    kind: "approved",
    note: "Approved as Egrifta, for abdominal fat in HIV.",
    sources: [{ label: "Drugs@FDA: 022505 (Egrifta)", url: DAF("022505") }],
  },
  "growth-hormone": {
    kind: "approved",
    note: "Somatropin is approved under several brands, e.g. Genotropin.",
    sources: [{ label: "Drugs@FDA: 020280 (Genotropin)", url: DAF("020280") }],
  },
  "bpc-157": { kind: "fda-risk-list", note: WITHDRAWN + COMMITTEE, sources: [FDA_RISK] },
  kpv: { kind: "fda-risk-list", note: WITHDRAWN + COMMITTEE, sources: [FDA_RISK] },
  "tb-500": {
    kind: "fda-risk-list",
    note: "Not FDA-approved. FDA lists thymosin beta-4 fragment (LKKTETQ), known as TB-500, among withdrawn nominations. FDA's advisory committee voted in July 2026 to recommend it for the 503A bulks list for wound healing (not binding); no final FDA decision.",
    sources: [FDA_RISK],
  },
  "cjc-1295": { kind: "fda-risk-list", note: WITHDRAWN, sources: [FDA_RISK] },
  ipamorelin: {
    kind: "fda-risk-list",
    note: "FDA lists ipamorelin acetate in Category 2 for 503B outsourcing facilities, and among withdrawn nominations.",
    sources: [FDA_RISK],
  },
  dsip: { kind: "fda-risk-list", note: "Listed by FDA as emideltide (DSIP) among withdrawn nominations." + COMMITTEE, sources: [FDA_RISK] },
  epitalon: { kind: "fda-risk-list", note: WITHDRAWN + COMMITTEE, sources: [FDA_RISK] },
  "mots-c": { kind: "fda-risk-list", note: WITHDRAWN + COMMITTEE, sources: [FDA_RISK] },
  "mk-677": {
    kind: "fda-risk-list",
    note: "FDA lists ibutamoren mesylate (MK-677) in Category 2 for both 503A and 503B compounding.",
    sources: [FDA_RISK],
  },
  selank: { kind: "fda-risk-list", note: "Listed by FDA as selank acetate (TP-7) among withdrawn nominations.", sources: [FDA_RISK] },
  kisspeptin: { kind: "fda-risk-list", note: "FDA lists kisspeptin-10 in Category 2 for 503A compounding.", sources: [FDA_RISK] },
  "thymosin-alpha-1": {
    kind: "fda-risk-list",
    note: "Not approved in the US. Listed by FDA as thymosin-alpha 1 (Ta1) among withdrawn nominations.",
    sources: [FDA_RISK],
  },
  "ghk-cu": {
    kind: "cosmetic",
    note: "Sold as a cosmetic ingredient. FDA lists GHK-Cu for injectable routes among withdrawn nominations.",
    sources: [FDA_RISK],
  },
  "cosmetic-peptides": { kind: "cosmetic", note: "Ingredients in creams, serums and scalp lotions.", sources: [] },
  larazotide: {
    kind: "investigational",
    note: "Tested in coeliac disease trials; not an approved drug. See the gut evidence page for the trial history.",
    sources: [],
  },
  collagen: { kind: "supplement", note: "Sold as powders, capsules and drinks.", sources: [] },
  "marine-collagen": { kind: "supplement", note: "Fish-derived collagen sold as a supplement.", sources: [] },
  "fish-hydrolysate": { kind: "supplement", note: "Fish protein hydrolysates sold as supplements and food ingredients.", sources: [] },
  "casein-hydrolysate": { kind: "supplement", note: "Milk-protein hydrolysate sold as a supplement (e.g. Lactium).", sources: [] },
  "type-ii-collagen": { kind: "supplement", note: "Undenatured type II collagen sold as a supplement (UC-II).", sources: [] },
  "valyl-tyrosine": { kind: "supplement", note: "Tested as a food or drink ingredient.", sources: [] },
  sermorelin: {
    kind: "unclassified",
    note: "No current FDA approval found in openFDA's drugs@FDA records (searched 2026-11-12).",
    sources: [],
  },
  "thymic-peptides": { kind: "unclassified", note: "Thymus extracts; status varies by country and product.", sources: [] },
  thymalin: { kind: "unclassified", note: "A thymus extract used in Russia; not classified here for the US.", sources: [] },
  "thymosin-beta-4": {
    kind: "investigational",
    note: "The full 43-amino-acid protein has been tested as eye drops (RGN-259), on wounds and given into a vein in trials. No FDA approval found in openFDA's drugs@FDA records (searched 2026-11-12).",
    sources: [],
  },
  "oral-peptide-delivery": { kind: "unclassified", note: "A research topic, not a product.", sources: [] },
};
