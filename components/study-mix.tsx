import type { Study, StudyKind } from "@/lib/studies";

/**
 * Study designs grouped from strongest to weakest kind of evidence. Colours run from solid green (pooled human
 * trials) through paler greens (single human studies) and grey (reviews) to amber (animal and cell work), and every
 * segment is also named and counted in the legend, so colour is never the only signal.
 */
export const MIX_GROUPS: { key: string; label: string; kinds: StudyKind[]; fill: string }[] = [
  { key: "pooled", label: "Meta-analyses & systematic reviews", kinds: ["meta-analysis", "systematic-review"], fill: "var(--accent)" },
  {
    key: "controlled",
    label: "Controlled human trials",
    kinds: ["human-controlled"],
    fill: "color-mix(in srgb, var(--accent) 62%, var(--card))",
  },
  {
    key: "uncontrolled",
    label: "Uncontrolled human studies",
    kinds: ["human-uncontrolled"],
    fill: "color-mix(in srgb, var(--accent) 32%, var(--card))",
  },
  { key: "review", label: "Narrative reviews", kinds: ["review"], fill: "var(--track)" },
  { key: "lab", label: "Animal & cell studies", kinds: ["animal", "in-vitro"], fill: "var(--warn)" },
];

export function mixCounts(studies: Study[]) {
  return MIX_GROUPS.map((g) => ({ ...g, n: studies.filter((s) => g.kinds.includes(s.kind)).length }));
}

export function mixSentence(studies: Study[]) {
  const parts = mixCounts(studies)
    .filter((g) => g.n > 0)
    .map((g) => `${g.label.toLowerCase()}: ${g.n}`);
  return `${studies.length} ${studies.length === 1 ? "study" : "studies"} summarised. ${parts.join("; ")}`;
}

/** "What kind of evidence is this?": one stacked bar of study designs, with a counted legend. */
export function StudyMix({ studies, title = "What kind of evidence is this?", compact = false }: { studies: Study[]; title?: string; compact?: boolean }) {
  if (studies.length === 0) return null;
  const counts = mixCounts(studies);
  const shown = counts.filter((g) => g.n > 0);
  return (
    <figure className="m-0">
      {!compact && (
        <figcaption className="text-caption font-semibold uppercase tracking-[0.06em] text-muted">{title}</figcaption>
      )}
      <div
        role="img"
        aria-label={mixSentence(studies)}
        data-md-text={`${mixSentence(studies)}.`}
        className={`${compact ? "" : "mt-3"} flex h-4 w-full overflow-hidden rounded-full border border-line`}
      >
        {shown.map((g) => (
          <span key={g.key} title={`${g.label}: ${g.n}`} style={{ width: `${(g.n / studies.length) * 100}%`, background: g.fill }} />
        ))}
      </div>
      <ul aria-hidden className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-soft">
        {counts.map((g) => (
          <li key={g.key} className={`flex items-center gap-2 ${g.n === 0 ? "opacity-50" : ""}`}>
            <span className="inline-block h-3 w-3 shrink-0 rounded-sm border border-line" style={{ background: g.fill }} />
            {g.label} <span className="font-semibold text-fg">{g.n}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
