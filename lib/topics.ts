import type { Topic } from "./studies";

/**
 * Topic-level verdicts are hand-written from the studies in lib/studies.ts. When a study is added
 * or changes, re-read this file: a verdict is only as current as `reviewedOn`.
 */
export type Level = "consistent" | "mixed" | "limited" | "preclinical" | "none" | "unassessed";

export const LEVEL_LABEL: Record<Level, string> = {
  consistent: "Consistent in human trials (with caveats)",
  mixed: "Mixed human results",
  limited: "Limited human evidence",
  preclinical: "Mostly animal evidence",
  none: "No human trials found",
  unassessed: "Not yet assessed here",
};

export const LEVEL_HINT: Record<Level, string> = {
  consistent: "Several human trials or pooled analyses point the same way, though the trials have limits.",
  mixed: "Human trials exist but disagree across outcomes.",
  limited: "A small number of human studies, or only small, uncontrolled or single-sponsor ones.",
  preclinical: "Promising results in animals or cells; little or no controlled human data.",
  none: "Our PubMed searches found no controlled human trial of this use. That is not proof none exists.",
  unassessed: "This hub has not yet summarised the controlled human evidence.",
};

export type TopicRating = { subject: string; level: Level; why: string };

export type TopicPage = {
  slug: Topic;
  /** What the ratings measure. "safety" ratings are drawn as words only, never as a benefit meter. */
  measures: "benefit" | "safety";
  title: string;
  intro: string;
  ratings: TopicRating[];
  gaps: string[];
  reviewedOn: string;
};

export const TOPICS: Record<Topic, TopicPage> = {
  skin: {
    slug: "skin",
    measures: "benefit",
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
        subject: "Oral marine (fish-derived) collagen peptides",
        level: "limited",
        why: "Two randomised trials of fish-derived collagen peptides report better wrinkle, elasticity, cellulite and hair results. One gives no sample size or dose, and several of its results are changes from baseline or self-rated scores. The 2023 meta-analysis above found that the size of the hydration effect varied with the collagen source.",
      },
      {
        subject: "Topical GHK-Cu (copper peptide)",
        level: "unassessed",
        why: "The hub holds one review of GHK and no controlled human trial of a GHK-Cu product yet. A review's summary of cosmetic benefits is not the same as a trial result.",
      },
    ],
    gaps: [
      "No controlled trial of a topical GHK-Cu product is summarised here yet.",
      "No head-to-head trial of marine versus bovine collagen is summarised here.",
    ],
    reviewedOn: "2026-11-09",
  },
  muscle: {
    slug: "muscle",
    measures: "benefit",
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
        subject: "Fish protein hydrolysate (oral marine peptides)",
        level: "limited",
        why: "Two small crossover studies. One found fish hydrolysate raised blood amino acids after exercise about as much as whey hydrolysate, which measures digestion rather than muscle gain. The other found no benefit for recovery between two cycling sessions, and was funded by a company with an interest in the product.",
      },
      {
        subject: "Injectable and research peptides (BPC-157, CJC-1295, ipamorelin and others)",
        level: "preclinical",
        why: "Two recent reviews conclude the claimed muscle and recovery benefits are not substantiated by human trials. Most evidence is from animals.",
      },
    ],
    gaps: [
      "Controlled trials of collagen peptides outside older, sarcopenic men are not summarised here yet.",
      "No trial of oral marine peptides for muscle growth or strength over weeks of training was found.",
    ],
    reviewedOn: "2026-11-09",
  },
  joints: {
    slug: "joints",
    measures: "benefit",
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
        subject: "Oral marine (fish-derived) collagen peptides for joints and tendons",
        level: "none",
        why: "Our PubMed searches on 9 November 2026 found laboratory and biomaterial studies of fish collagen for cartilage and bone, but no controlled human trial of swallowing marine collagen peptides for joint or tendon problems.",
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
  "blood-pressure": {
    slug: "blood-pressure",
    measures: "benefit",
    title: "Marine peptides for blood pressure & vessels",
    intro:
      "Some peptides from fish are claimed to lower blood pressure by blocking an enzyme (ACE) that tightens blood vessels. The human trials are few and small, and they tested different products.",
    ratings: [
      {
        subject: "Valyl-tyrosine, a defined sardine-derived peptide",
        level: "limited",
        why: "One small randomised trial (29 people, 4 weeks) found blood pressure fell by roughly 9 mm Hg systolic and 5 mm Hg diastolic against no change on placebo, with blood markers consistent with ACE inhibition. Nothing else in this hub replicates it.",
      },
      {
        subject: "Marine collagen peptides added to usual care in type 2 diabetes with hypertension",
        level: "limited",
        why: "One randomised trial in 100 patients found lower diastolic and mean arterial pressure plus better blood sugar and cholesterol over three months. Patients stayed on their usual medicines, and the abstract gives no dose.",
      },
      {
        subject: "Fish protein hydrolysate and blood-vessel function in healthy adults",
        level: "limited",
        why: "A single 20 g dose in nine people did not improve endothelium-dependent dilation, while whey hydrolysate did. It says nothing about blood pressure or longer use.",
      },
    ],
    gaps: [
      "No large or long randomised trial of a marine peptide supplement for blood pressure is summarised here.",
      "The hub does not yet cover the animal and laboratory work on ACE-inhibitory fish peptides.",
    ],
    reviewedOn: "2026-11-09",
  },
  brain: {
    slug: "brain",
    measures: "benefit",
    title: "Marine peptides for sleep, memory & stress",
    intro:
      "Fish hydrolysate supplements are marketed for sleep, memory and stress. The few human studies are small, all three have ties to a company with an interest in the product, and one found no difference from placebo.",
    ratings: [
      {
        subject: "Fish hydrolysate for sleep quality",
        level: "limited",
        why: "A four-week crossover trial found sleep scores improved from baseline, but there was no significant difference between fish hydrolysate and placebo. The trial was fully sponsored by Abyss Ingredients, and two authors disclose a commercial interest.",
      },
      {
        subject: "Fish hydrolysate for memory in older adults",
        level: "limited",
        why: "One 3-month trial in 53 adults aged 60–73 with lower-than-average memory scores found better episodic memory than placebo. The product also contained omega-3 fatty acids, and two authors are funded by Abyss Ingredients.",
      },
      {
        subject: "Fish-peptide supplement (with magnesium and B6) for anxiety",
        level: "limited",
        why: "A single-arm study with no control group reported lower anxiety scores over 28 days. It cannot separate the supplement from placebo or natural recovery, and three authors work for Laboratoire Dielen.",
      },
    ],
    gaps: [
      "No independently funded randomised trial of a marine peptide supplement for sleep, memory or stress is summarised here.",
    ],
    reviewedOn: "2026-11-09",
  },
  immune: {
    slug: "immune",
    measures: "benefit",
    title: "Thymic peptides for immune function",
    intro:
      "Extracts and peptides from the thymus, the gland where T cells mature, are marketed to support or 'boost' immunity. The studies in this hub are a Cochrane review in cancer patients, trials and a meta-analysis of thymosin alpha-1 given by injection in hospital patients (sepsis, pancreatitis, COVID-19), a 2024 advocacy-style review, a 1999 narrative review and two animal experiments. This page is about thymus-derived products, not oral marine peptides, for which our search found no human immune trials (see the oral marine peptides page).",
    ratings: [
      {
        subject: "Thymus extracts added to cancer treatment",
        level: "mixed",
        why: "A Cochrane review pooled 20 randomised trials of purified thymus extracts. It found no benefit for survival or tumour response, but fewer severe infections during chemotherapy or radiotherapy, a result the authors call preliminary. Most trials had at least a moderate risk of bias.",
      },
      {
        subject: "Thymosin alpha-1 added to cancer treatment",
        level: "limited",
        why: "The same review found a trend toward longer survival with synthetic thymic peptides such as thymosin alpha-1 (risk ratio 1.21; 95% CI 0.94 to 1.56), but it did not reach statistical significance and rests on few trials.",
      },
      {
        subject: "Thymalin and engineered thymosin alpha-1 in animals",
        level: "preclinical",
        why: "In rats, low-dose Thymalin slowed or reversed a transplanted tumour. In mice, a long-acting engineered form of thymosin alpha-1 (joined to an antibody fragment) slowed two tumour models and raised T-cell numbers. Neither was tested in people, and the second is a different molecule from thymosin alpha-1.",
      },
      {
        subject: "Injected thymosin alpha-1 for sepsis",
        level: "mixed",
        why: "An earlier trial of 361 patients with severe sepsis found fewer deaths at 28 days on thymosin alpha-1 (26% vs 35%), but the result was borderline and the interval included no effect. A later placebo-controlled trial of 1,106 adults found no difference (23.4% vs 24.1%). Both were run in China and both gave the peptide as hospital treatment.",
      },
      {
        subject: "Injected thymosin alpha-1 for severe acute pancreatitis and COVID-19",
        level: "limited",
        why: "A 508-patient placebo-controlled trial in severe acute pancreatitis found no reduction in infected necrosis. A meta-analysis of eight COVID-19 studies reports lower mortality (risk ratio 0.59), but with very high variation between studies, and its authors say randomised trials are needed.",
      },
      {
        subject: "Thymus extracts or peptides for infection prevention, allergies, vaccine response and healthy adults",
        level: "unassessed",
        why: "None of the trials summarised here tests these uses, and none tests an oral or over-the-counter thymus product. Our PubMed search also turned up thymosin alpha-1 trials in hepatitis B, COPD flare-ups and other conditions that are not yet summarised. This is a gap in our coverage, not a finding that no trial exists.",
      },
    ],
    gaps: [
      "The Cochrane review's searches ended in February 2010. Later cancer-care trials of thymosin alpha-1 are not summarised here.",
      "Trials of thymosin alpha-1 in hepatitis B, COPD flare-ups, vaccine response in older adults and other conditions turned up in our PubMed search but are not summarised yet.",
      "Every human trial here gave thymosin alpha-1 by injection in a hospital or clinic. None tests an oral or over-the-counter thymus product, and the sepsis and pancreatitis results do not transfer to healthy people.",
      "Several of the trials report grants or fees from SciClone Pharmaceuticals; see each study page for the stated funding.",
      "Legal and regulatory status, including thymosin alpha-1, is not part of these ratings; it has its own dated page (see Legal status).",
    ],
    reviewedOn: "2026-11-10",
  },
  safety: {
    slug: "safety",
    measures: "safety",
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
      "Legal and regulatory status is not part of these ratings; it has its own dated page (see Legal status).",
      "Safety of oral collagen and marine peptide supplements is not summarised here yet.",
    ],
    reviewedOn: "2026-11-09",
  },
};

export const TOPIC_SLUGS = Object.keys(TOPICS) as Topic[];
