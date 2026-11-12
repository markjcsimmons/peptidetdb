import type { PeptideId, Topic } from "./studies";
import { TOPICS, type TopicRating } from "./topics";

/**
 * Registry of every guide page under /peptides. The goal hub (/peptides/by-goal), the related-guide
 * links on list, profile and topic pages, and the build check in app/peptides/by-goal/page.tsx all read
 * from here, so a new page that is added to this file is linked from the rest of the site automatically.
 * Adding a page under app/peptides/ without an entry here fails the build.
 *
 * Do not write new claims here: ratings are read from lib/topics.ts by subject, and blurbs only describe
 * what a page covers.
 */
export type GuideKind = "list" | "guide" | "profile" | "explainer" | "check";

export const KIND_LABEL: Record<GuideKind, string> = {
  list: "Ranked by the evidence",
  guide: "Guide by goal",
  profile: "Peptide profile",
  explainer: "Explainer",
  check: "Documentation check",
};

export type Guide = {
  path: string;
  /** Short link text. */
  title: string;
  kind: GuideKind;
  /** One line on what the page covers (no findings that are not already on the page). */
  blurb: string;
  /** Evidence topics the page draws its ratings from. */
  topics: Topic[];
  /** Peptides the page discusses. Profiles name exactly one. */
  peptides: PeptideId[];
};

export const GUIDES: Guide[] = [
  // Ranked lists and goal guides
  {
    path: "/peptides/best-peptides-for-skin",
    title: "Best peptides for skin",
    kind: "list",
    blurb: "Oral collagen, fish-derived collagen, topical cosmetic peptides, GHK-Cu and KPV.",
    topics: ["skin", "immune"],
    peptides: ["collagen", "marine-collagen", "cosmetic-peptides", "ghk-cu", "kpv"],
  },
  {
    path: "/peptides/peptides-for-hair-growth",
    title: "Peptides for hair growth",
    kind: "list",
    blurb: "Topical peptide products, oral collagen, scalp injections, thymosin beta-4 and BPC-157.",
    topics: ["hair"],
    peptides: ["cosmetic-peptides", "ghk-cu", "collagen", "thymosin-beta-4", "bpc-157", "glp-1-agonists"],
  },
  {
    path: "/peptides/peptides-for-joint-pain",
    title: "Peptides for joint pain",
    kind: "list",
    blurb: "Collagen for osteoarthritis, knee pain and tendons, UC-II, BPC-157, TB-500 and marine collagen.",
    topics: ["joints"],
    peptides: ["collagen", "type-ii-collagen", "bpc-157", "tb-500", "marine-collagen"],
  },
  {
    path: "/peptides/peptides-for-muscle-growth",
    title: "Peptides for muscle growth",
    kind: "guide",
    blurb: "Collagen with resistance training, collagen vs whey, MK-677, tesamorelin and growth-hormone peptides.",
    topics: ["muscle"],
    peptides: ["collagen", "mk-677", "tesamorelin", "ipamorelin", "cjc-1295", "bpc-157", "growth-hormone"],
  },
  {
    path: "/peptides/for-weight-loss",
    title: "Peptides for weight loss",
    kind: "guide",
    blurb: "GLP-1 drugs (semaglutide, tirzepatide), what happens after stopping, and unapproved products.",
    topics: ["weight"],
    peptides: ["glp-1-agonists", "semaglutide", "tirzepatide", "mots-c"],
  },
  {
    path: "/peptides/peptides-for-sleep",
    title: "Peptides for sleep",
    kind: "list",
    blurb: "Casein hydrolysate, collagen before bed, fish hydrolysate, DSIP and epitalon.",
    topics: ["brain"],
    peptides: ["casein-hydrolysate", "collagen", "fish-hydrolysate", "dsip", "epitalon"],
  },
  {
    path: "/peptides/peptides-for-gut-health",
    title: "Peptides for gut health",
    kind: "list",
    blurb: "Linaclotide and plecanatide, GLP-2 drugs, larazotide, protein hydrolysates, BPC-157, KPV and collagen.",
    topics: ["gut"],
    peptides: ["gc-c-agonists", "glp-2-analogues", "larazotide", "fish-hydrolysate", "bpc-157", "kpv", "collagen"],
  },
  {
    path: "/peptides/peptides-for-women",
    title: "Peptides for women",
    kind: "list",
    blurb: "Bremelanotide, GLP-1 drugs in PCOS, collagen for skin, bone and hair, and menopause symptoms.",
    topics: ["womens-health", "skin", "hair"],
    peptides: ["bremelanotide", "glp-1-agonists", "collagen", "cosmetic-peptides"],
  },
  {
    path: "/peptides/peptides-for-men",
    title: "Peptides for men",
    kind: "list",
    blurb: "Collagen for muscle, GLP-1 drugs and testosterone, erections, kisspeptin, hair loss and BPC-157.",
    topics: ["mens-health", "muscle", "weight", "hair", "joints"],
    peptides: [
      "collagen",
      "glp-1-agonists",
      "semaglutide",
      "tirzepatide",
      "bremelanotide",
      "kisspeptin",
      "cosmetic-peptides",
      "bpc-157",
      "ipamorelin",
      "cjc-1295",
    ],
  },
  {
    path: "/peptides/oral-peptides",
    title: "Oral peptides",
    kind: "list",
    blurb: "Which peptides taken by mouth have human evidence, from oral semaglutide to collagen and hydrolysates.",
    topics: ["oral-peptides", "gut", "skin", "brain", "blood-pressure"],
    peptides: [
      "semaglutide",
      "gc-c-agonists",
      "collagen",
      "marine-collagen",
      "casein-hydrolysate",
      "valyl-tyrosine",
      "bpc-157",
      "oral-peptide-delivery",
    ],
  },

  // Peptide profiles
  {
    path: "/peptides/bpc-157",
    title: "BPC-157",
    kind: "profile",
    blurb: "Mostly animal evidence and three small uncontrolled human studies.",
    topics: ["joints", "gut", "safety"],
    peptides: ["bpc-157"],
  },
  {
    path: "/peptides/ghk-cu",
    title: "GHK-Cu",
    kind: "profile",
    blurb: "Copper peptide: cell and animal work and a few small human trials.",
    topics: ["skin"],
    peptides: ["ghk-cu"],
  },
  {
    path: "/peptides/kpv",
    title: "KPV",
    kind: "profile",
    blurb: "Anti-inflammatory tripeptide: laboratory and mouse studies, no human trial found.",
    topics: ["immune", "gut"],
    peptides: ["kpv"],
  },
  {
    path: "/peptides/tb-500",
    title: "TB-500",
    kind: "profile",
    blurb: "A thymosin beta-4 fragment: one rat study and lab work, no human trial found.",
    topics: ["joints", "safety"],
    peptides: ["tb-500"],
  },
  {
    path: "/peptides/selank",
    title: "Selank",
    kind: "profile",
    blurb: "Three small Russian-language anxiety trials with no placebo group.",
    topics: ["brain"],
    peptides: ["selank"],
  },
  {
    path: "/peptides/ipamorelin",
    title: "Ipamorelin",
    kind: "profile",
    blurb: "Hormone and gut studies in people; no trial tests muscle.",
    topics: ["muscle", "safety"],
    peptides: ["ipamorelin"],
  },
  {
    path: "/peptides/cjc-1295",
    title: "CJC-1295",
    kind: "profile",
    blurb: "Two 2006 hormone-level trials; no trial for muscle.",
    topics: ["muscle", "safety"],
    peptides: ["cjc-1295"],
  },

  // Documentation checks
  {
    path: "/peptides/best-collagen-peptides",
    title: "Collagen peptides with published batch test results",
    kind: "check",
    blurb: "Which of 15 collagen brands publish batch lab reports. A documentation check, not a product grade.",
    topics: [],
    peptides: ["collagen"],
  },

  // Explainers
  {
    path: "/peptides/what-do-peptides-do",
    title: "What do peptides do?",
    kind: "explainer",
    blurb: "What human studies show, area by area, with the best and least-supported rating for each.",
    topics: [],
    peptides: [],
  },
  {
    path: "/peptides/how-peptides-work",
    title: "How do peptides work?",
    kind: "explainer",
    blurb: "Peptides as cell signals, what digestion does to them, and why a lab mechanism is not proof.",
    topics: [],
    peptides: [],
  },
  {
    path: "/peptides/are-peptides-steroids",
    title: "Are peptides steroids?",
    kind: "explainer",
    blurb: "Why peptides and anabolic steroids are different substances.",
    topics: ["muscle"],
    peptides: [],
  },
  {
    path: "/peptides/collagen-peptides",
    title: "Collagen peptides: what the evidence shows",
    kind: "explainer",
    blurb: "What collagen peptides are, what trials show for skin, muscle and joints, and safety.",
    topics: ["skin", "muscle", "joints"],
    peptides: ["collagen"],
  },
  {
    path: "/peptides/collagen-peptides-benefits",
    title: "Collagen peptide benefits",
    kind: "explainer",
    blurb: "What meta-analyses and trials show, and what they cannot show.",
    topics: ["skin", "muscle", "joints"],
    peptides: ["collagen"],
  },
  {
    path: "/peptides/collagen-peptides-side-effects",
    title: "Collagen peptide side effects",
    kind: "explainer",
    blurb: "Tolerability in trials, the fish-allergy risk, and what has not been studied.",
    topics: ["safety"],
    peptides: ["collagen"],
  },
  {
    path: "/peptides/marine-vs-bovine-collagen",
    title: "Marine vs bovine collagen",
    kind: "explainer",
    blurb: "Why no head-to-head human trial was found, and what the fish collagen trials show.",
    topics: ["skin"],
    peptides: ["marine-collagen", "collagen"],
  },
  {
    path: "/peptides/oral-marine-peptides",
    title: "Do oral marine peptides work?",
    kind: "explainer",
    blurb: "Human studies of fish-derived peptides, body system by body system.",
    topics: [],
    peptides: ["marine-collagen", "fish-hydrolysate"],
  },
  {
    path: "/peptides/how-to-read-a-peptide-coa",
    title: "How to read a peptide COA",
    kind: "explainer",
    blurb: "A line-by-line checklist for a certificate of analysis.",
    topics: [],
    peptides: [],
  },
  {
    path: "/peptides/legal-status",
    title: "Are peptides legal in the US?",
    kind: "explainer",
    blurb: "Dated, source-linked timeline of the 2026 FDA and HHS changes.",
    topics: ["safety"],
    peptides: [],
  },
];

/** A goal is what a reader is trying to do; each one points at a guide page and an evidence page. */
export type Goal = {
  id: string;
  label: string;
  /** The list or guide page for this goal. */
  guide: string;
  /** The evidence page with the full ratings. */
  topic: Topic;
  /**
   * The topic ratings the guide covers, in the guide's ranked order. Omitted when the guide covers every
   * rating on `topic`. Each is looked up in lib/topics.ts, so the level shown is always the current one.
   */
  ratings?: [Topic, string][];
};

export const GOALS: Goal[] = [
  {
    id: "skin",
    label: "Skin",
    guide: "/peptides/best-peptides-for-skin",
    topic: "skin",
    ratings: [
      ["skin", "Oral collagen peptides"],
      ["skin", "Oral marine (fish-derived) collagen peptides"],
      ["skin", "Topical cosmetic peptides (argireline, palmitoyl peptides and similar)"],
      ["skin", "Topical GHK-Cu (copper peptide)"],
      ["immune", "KPV (anti-inflammatory tripeptide) for gut and skin inflammation"],
    ],
  },
  { id: "hair", label: "Hair", guide: "/peptides/peptides-for-hair-growth", topic: "hair" },
  { id: "joints", label: "Joints & tendons", guide: "/peptides/peptides-for-joint-pain", topic: "joints" },
  { id: "muscle", label: "Muscle", guide: "/peptides/peptides-for-muscle-growth", topic: "muscle" },
  { id: "weight", label: "Weight loss", guide: "/peptides/for-weight-loss", topic: "weight" },
  {
    id: "sleep",
    label: "Sleep",
    guide: "/peptides/peptides-for-sleep",
    topic: "brain",
    ratings: [
      ["brain", "Casein hydrolysate (Lactium) for sleep"],
      ["brain", "Collagen peptides before bed for sleep"],
      ["brain", "Fish hydrolysate for sleep quality"],
      ["brain", "DSIP (delta sleep-inducing peptide) for insomnia"],
      ["brain", "Epitalon for sleep"],
    ],
  },
  { id: "gut", label: "Gut health", guide: "/peptides/peptides-for-gut-health", topic: "gut" },
  {
    id: "women",
    label: "Women's health",
    guide: "/peptides/peptides-for-women",
    topic: "womens-health",
    ratings: [
      ["womens-health", "Bremelanotide (Vyleesi) for low sexual desire in premenopausal women"],
      ["womens-health", "GLP-1 drugs (liraglutide, semaglutide) for weight in women with PCOS"],
      ["skin", "Oral collagen peptides"],
      ["womens-health", "Oral collagen peptides for bone density after menopause"],
      ["womens-health", "GLP-1 drugs for periods, hormones and fertility in PCOS"],
      ["skin", "Topical cosmetic peptides (argireline, palmitoyl peptides and similar)"],
      ["hair", "Oral collagen peptides for hair"],
      ["womens-health", "Peptides or collagen for menopausal symptoms (hot flushes, mood, sleep)"],
    ],
  },
  {
    id: "men",
    label: "Men's health",
    guide: "/peptides/peptides-for-men",
    topic: "mens-health",
    ratings: [
      ["muscle", "Oral collagen peptides with resistance training: fat-free mass"],
      ["weight", "Prescription semaglutide and tirzepatide for weight loss"],
      [
        "mens-health",
        "GLP-1 drugs (semaglutide, liraglutide, tirzepatide) for testosterone in men with obesity-related low testosterone",
      ],
      ["mens-health", "Bremelanotide (PT-141) for erectile dysfunction in men"],
      ["mens-health", "Kisspeptin-10 for raising testosterone"],
      ["hair", "Topical peptide products for hair loss (GPIGS, acetyl tetrapeptide-3 and similar)"],
      ["joints", "BPC-157 for tendon, ligament and joint problems"],
      ["muscle", "Ipamorelin and CJC-1295"],
    ],
  },
  {
    id: "oral",
    label: "Taken by mouth",
    guide: "/peptides/oral-peptides",
    topic: "oral-peptides",
    ratings: [
      ["oral-peptides", "Oral semaglutide tablet (a peptide drug with an absorption enhancer) for weight loss"],
      ["gut", "Linaclotide and plecanatide (prescription) for IBS with constipation and chronic constipation"],
      ["skin", "Oral collagen peptides"],
      ["oral-peptides", "Dietary collagen peptides: do fragments reach the blood after swallowing?"],
      ["skin", "Oral marine (fish-derived) collagen peptides"],
      ["brain", "Casein hydrolysate (Lactium) for sleep"],
      ["blood-pressure", "Valyl-tyrosine, a defined sardine-derived peptide"],
      ["oral-peptides", "Pürblack's oral targeted peptide capsules (Muscle+, Joint+, Vascular+ and related products)"],
      ["gut", "BPC-157 for gut conditions (ulcers, colitis, fistulas)"],
    ],
  },
];

export function guideFor(path: string): Guide {
  const g = GUIDES.find((x) => x.path === path);
  if (!g) throw new Error(`lib/guides.ts: no guide registered for ${path}`);
  return g;
}

/** The ratings a goal covers, resolved against lib/topics.ts. An unknown subject fails the build. */
export function goalRatings(goal: Goal): TopicRating[] {
  const pairs = goal.ratings ?? TOPICS[goal.topic].ratings.map((r): [Topic, string] => [goal.topic, r.subject]);
  return pairs.map(([topic, subject]) => {
    const r = TOPICS[topic].ratings.find((x) => x.subject === subject);
    if (!r) throw new Error(`lib/guides.ts: goal "${goal.id}" names "${subject}", which is not a rating on the ${topic} topic page`);
    return r;
  });
}

/** Topics that have an evidence page but no goal guide yet (shown on the hub so they are still reachable). */
export function topicsWithoutGoal(all: Topic[]): Topic[] {
  const covered = new Set(GOALS.map((g) => g.topic));
  return all.filter((t) => !covered.has(t));
}

/** Other goals, most related first (shared peptides, then shared topics), keeping hub order for ties. */
export function relatedGoals(path: string): Goal[] {
  const self = guideFor(path);
  const score = (g: Goal) => {
    const other = guideFor(g.guide);
    const peptides = other.peptides.filter((p) => self.peptides.includes(p)).length;
    const topics = other.topics.filter((t) => self.topics.includes(t)).length;
    return peptides * 2 + topics;
  };
  return GOALS.filter((g) => g.guide !== path)
    .map((g, i) => ({ g, i, s: score(g) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .map((x) => x.g);
}

/** Ranked lists and goal guides that discuss a peptide, in hub order. */
export function listsCovering(peptide: PeptideId): Guide[] {
  return GOALS.map((g) => guideFor(g.guide)).filter((g) => g.peptides.includes(peptide));
}

/** Goal guides that draw on a topic's ratings (the goal's own topic first). */
export function goalsForTopic(topic: Topic): Goal[] {
  const own = GOALS.filter((g) => g.topic === topic);
  const others = GOALS.filter((g) => g.topic !== topic && guideFor(g.guide).topics.includes(topic));
  return [...own, ...others];
}

/** Profile pages that draw on a topic's ratings. */
export function profilesForTopic(topic: Topic): Guide[] {
  return GUIDES.filter((g) => g.kind === "profile" && g.topics.includes(topic));
}

// Titles and blurbs are shown on pages that carry no Pürblack note, so they must never name it (see CLAUDE.md, Disclosure).
for (const g of GUIDES) {
  if (/p[uü]rblack/i.test(`${g.title} ${g.blurb}`)) {
    throw new Error(`lib/guides.ts: ${g.path} names Pürblack in its title or blurb, which would need the disclosure note wherever it is shown`);
  }
}
