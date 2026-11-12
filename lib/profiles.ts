import type { PeptideId, Topic } from "./studies";
import type { Route } from "@/components/ranked-list";

/**
 * Quick facts shown at the top of each peptide profile. Every line restates what the profile page itself says
 * (its short answer and legal section); ratings are looked up in lib/topics.ts by subject so they stay current.
 * When a profile's text changes, change its facts here too.
 */
export type ProfileFacts = {
  peptide: PeptideId;
  /** One line: what it is and what it is promoted for. */
  what: string;
  /** Forms the page discusses. Omit when the page does not make them plain. */
  routes?: Route[];
  /** US regulatory status in one or two sentences, as the page states it on its review date. */
  status: string;
  /** Benefit ratings for this peptide on the topic pages. */
  ratings: [Topic, string][];
  /** Safety rating on the safety topic page, where one names this peptide. */
  safety?: string;
};

export const PROFILE_FACTS: Record<string, ProfileFacts> = {
  "/peptides/bpc-157": {
    peptide: "bpc-157",
    what: "A synthetic 15-amino-acid peptide promoted for injury recovery.",
    routes: ["injected", "oral"],
    status:
      "Not FDA-approved for any use. FDA's advisory committee recommended it for the 503A bulks list in July 2026 (not binding); no final FDA decision.",
    ratings: [
      ["joints", "BPC-157 for tendon, ligament and joint problems"],
      ["gut", "BPC-157 for gut conditions (ulcers, colitis, fistulas)"],
      ["muscle", "BPC-157 and other research peptides"],
      ["hair", "BPC-157"],
    ],
    safety: "BPC-157 (unapproved)",
  },
  "/peptides/kpv": {
    peptide: "kpv",
    what: "A three-amino-acid peptide promoted for inflammation, gut problems and skin healing.",
    status: "Not an FDA-approved drug. FDA's advisory committee reviewed it in July 2026; no final FDA decision.",
    ratings: [
      ["immune", "KPV (anti-inflammatory tripeptide) for gut and skin inflammation"],
      ["gut", "KPV for colitis"],
    ],
  },
  "/peptides/ghk-cu": {
    peptide: "ghk-cu",
    what: "A copper-bound three-amino-acid peptide promoted for skin, hair and healing.",
    routes: ["topical", "injected"],
    status:
      "Sold as a cosmetic ingredient. FDA lists GHK-Cu for injectable routes among compounding nominations that were withdrawn (FDA page current as of 22 April 2026).",
    ratings: [["skin", "Topical GHK-Cu (copper peptide)"]],
  },
  "/peptides/tb-500": {
    peptide: "tb-500",
    what: "A seven-amino-acid fragment of the protein thymosin beta-4 (Ac-LKKTETQ), sold for injury recovery.",
    routes: ["injected"],
    status:
      "Not FDA-approved. FDA's compounding page lists it among withdrawn nominations; FDA's advisory committee recommended it for the 503A bulks list for wound healing in July 2026 (not binding); no final FDA decision.",
    ratings: [["joints", "TB-500 for tendon and ligament injury"]],
    safety: "Other unapproved research peptides (CJC-1295, ipamorelin, MK-677, TB-500 and others)",
  },
  "/peptides/selank": {
    peptide: "selank",
    what: "A peptide promoted for anxiety.",
    status:
      "Not an approved drug in the sources we reviewed. FDA's compounding page lists its nomination as withdrawn.",
    ratings: [["brain", "Selank for anxiety disorders"]],
  },
  "/peptides/ipamorelin": {
    peptide: "ipamorelin",
    what: "An injectable peptide that stimulates the release of growth hormone.",
    routes: ["injected"],
    status:
      "Not an approved drug. FDA lists ipamorelin acetate in Category 2 for 503B outsourcing facilities (added 29 September 2023).",
    ratings: [["muscle", "Ipamorelin and CJC-1295"]],
    safety: "Other unapproved research peptides (CJC-1295, ipamorelin, MK-677, TB-500 and others)",
  },
  "/peptides/cjc-1295": {
    peptide: "cjc-1295",
    what: "A long-acting analogue of growth-hormone-releasing hormone.",
    routes: ["injected"],
    status: "Not an approved drug. It was not one of the seven peptides FDA's advisory committee reviewed in July 2026.",
    ratings: [["muscle", "Ipamorelin and CJC-1295"]],
    safety: "Other unapproved research peptides (CJC-1295, ipamorelin, MK-677, TB-500 and others)",
  },
};
