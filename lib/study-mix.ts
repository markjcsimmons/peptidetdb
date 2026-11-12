import type { Study, StudyKind } from "./studies";

/**
 * Study designs grouped from strongest to weakest kind of evidence. Colours run from solid green (pooled human
 * trials) through paler greens (single human studies) and grey (reviews) to amber (animal and cell work), and every
 * segment is also named and counted in the legend, so colour is never the only signal.
 */
export const MIX_GROUPS: { key: string; label: string; term: string; kinds: StudyKind[]; fill: string }[] = [
  { key: "pooled", term: "meta-analysis", label: "Meta-analyses & systematic reviews", kinds: ["meta-analysis", "systematic-review"], fill: "var(--accent)" },
  {
    key: "controlled",
    term: "rct",
    label: "Controlled human trials",
    kinds: ["human-controlled"],
    fill: "var(--mix-controlled)",
  },
  {
    key: "uncontrolled",
    term: "uncontrolled-study",
    label: "Uncontrolled human studies",
    kinds: ["human-uncontrolled"],
    fill: "var(--mix-uncontrolled)",
  },
  { key: "review", term: "narrative-review", label: "Narrative reviews", kinds: ["review"], fill: "var(--track)" },
  { key: "lab", term: "preclinical", label: "Animal, cell & lab studies", kinds: ["animal", "in-vitro", "lab-analysis"], fill: "var(--warn)" },
];

export function mixCounts(studies: Study[]) {
  return MIX_GROUPS.map((g) => ({ ...g, n: studies.filter((s) => g.kinds.includes(s.kind)).length }));
}

export function mixSentence(studies: Study[]) {
  const parts = mixCounts(studies)
    .filter((g) => g.n > 0)
    .map((g) => `${g.label.toLowerCase()}: ${g.n}`);
  return `${studies.length} ${studies.length === 1 ? "study" : "studies"} summarised (${parts.join("; ")})`;
}

