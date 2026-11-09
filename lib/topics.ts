import type { Topic } from "./studies";

/**
 * Topic-level verdicts are hand-written from the studies in lib/studies.ts. When a study is added
 * or changes, re-read this file: a verdict is only as current as `reviewedOn`.
 */
export type Level = "consistent" | "mixed" | "limited" | "preclinical" | "unassessed";

export const LEVEL_LABEL: Record<Level, string> = {
  consistent: "Consistent in human trials (with caveats)",
  mixed: "Mixed human results",
  limited: "Limited human evidence",
  preclinical: "Mostly animal evidence",
  unassessed: "Not yet assessed here",
};

export const LEVEL_HINT: Record<Level, string> = {
  consistent: "Several human trials or pooled analyses point the same way, though the trials have limits.",
  mixed: "Human trials exist but disagree across outcomes.",
  limited: "A small number of human studies, or only small or uncontrolled ones.",
  preclinical: "Promising results in animals or cells; little or no controlled human data.",
  unassessed: "This hub has not yet summarised the controlled human evidence.",
};

export type TopicRating = { subject: string; level: Level; why: string };

export type TopicPage = {
  slug: Topic;
  title: string;
  intro: string;
  ratings: TopicRating[];
  gaps: string[];
  reviewedOn: string;
};

export const TOPICS: Record<Topic, TopicPage> = {
  skin: {
    slug: "skin",
    title: "Peptides for skin & anti-aging",
    intro:
      "Two kinds of peptide are marketed for skin: collagen peptides you swallow, and peptides such as GHK-Cu you apply to the skin. The evidence is very different for each.",
    ratings: [
      {
        subject: "Oral collagen peptides",
        level: "consistent",
        why: "Two large meta-analyses of randomised trials (19 trials with 1,125 people; 26 trials with 1,721 people) report better skin hydration and elasticity than placebo. The 2023 analysis found biases in the included trials, so the direction is consistent but the size of the effect is uncertain.",
      },
      {
        subject: "Topical GHK-Cu (copper peptide)",
        level: "unassessed",
        why: "The hub holds one review of GHK and no controlled human trial of a GHK-Cu product yet. A review's summary of cosmetic benefits is not the same as a trial result.",
      },
    ],
    gaps: [
      "No controlled trial of a topical GHK-Cu product is summarised here yet.",
      "Source-specific comparisons (marine versus bovine collagen) are not summarised here yet.",
    ],
    reviewedOn: "2026-11-09",
  },
  muscle: {
    slug: "muscle",
    title: "Peptides for muscle & strength",
    intro:
      "Muscle claims cover a wide range, from collagen powder to injectable growth-hormone-releasing compounds. The studies in this hub only support a narrow claim for one of them.",
    ratings: [
      {
        subject: "Oral collagen peptides with resistance training",
        level: "limited",
        why: "One randomised trial in older men with sarcopenia found larger gains in fat-free mass and strength than placebo when both groups trained. It does not show an effect without exercise, or in other groups.",
      },
      {
        subject: "Injectable and research peptides (BPC-157, CJC-1295, ipamorelin and others)",
        level: "preclinical",
        why: "Two recent reviews conclude the claimed muscle and recovery benefits are not substantiated by human trials. Most evidence is from animals.",
      },
    ],
    gaps: [
      "Controlled trials of collagen peptides outside older, sarcopenic men are not summarised here yet.",
      "Studies of oral marine peptides for muscle are not summarised here yet.",
    ],
    reviewedOn: "2026-11-09",
  },
  joints: {
    slug: "joints",
    title: "Peptides for joints & tendons",
    intro:
      "Joint and tendon claims range from collagen supplements for osteoarthritis to injected BPC-157 for injuries. The human evidence is stronger for the first than the second, but neither is clear-cut.",
    ratings: [
      {
        subject: "Oral collagen for osteoarthritis symptoms",
        level: "mixed",
        why: "A meta-analysis of randomised trials found lower total WOMAC scores and pain scores than placebo, but no significant difference in the WOMAC pain and function subscores.",
      },
      {
        subject: "BPC-157 for tendon, ligament and joint problems",
        level: "preclinical",
        why: "A systematic review found 35 animal studies and 1 clinical report. The human data amount to small pilots and a retrospective chart review of 16 patients with no control group.",
      },
    ],
    gaps: [
      "Individual randomised trials of collagen for tendon problems are not summarised here yet.",
    ],
    reviewedOn: "2026-11-09",
  },
  safety: {
    slug: "safety",
    title: "Peptide safety & regulation",
    intro:
      "Peptides range from approved prescription drugs to unapproved compounds sold with little oversight. Safety evidence follows the same split.",
    ratings: [
      {
        subject: "BPC-157 (unapproved)",
        level: "limited",
        why: "Human safety data amount to a two-person intravenous pilot and small case series. Reviews call it investigational and warn of risks from unregulated manufacturing and contamination.",
      },
      {
        subject: "Other unapproved research peptides (CJC-1295, ipamorelin, MK-677, TB-500 and others)",
        level: "limited",
        why: "Two recent reviews say rigorous human safety data are scarce. One documents cardiovascular and metabolic risks, naming MK-677 and congestive heart failure.",
      },
    ],
    gaps: [
      "Legal and regulatory status changes quickly and is not summarised here yet; check FDA and HHS sources directly.",
      "Safety of oral collagen and marine peptide supplements is not summarised here yet.",
    ],
    reviewedOn: "2026-11-09",
  },
};

export const TOPIC_SLUGS = Object.keys(TOPICS) as Topic[];
