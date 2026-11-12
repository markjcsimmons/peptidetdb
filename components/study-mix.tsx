import type { Study } from "@/lib/studies";
import { MIX_GROUPS, mixCounts, mixSentence } from "@/lib/study-mix";
export { MIX_GROUPS, mixCounts, mixSentence };
import { Term } from "@/components/term";

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
      {/* Legend: the bar's text version already carries the counts, so the markdown skips this. */}
      <ul data-md-skip className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-soft">
        {counts.map((g) => (
          <li key={g.key} className={`flex items-center gap-2 ${g.n === 0 ? "text-muted" : ""}`}>
            <span aria-hidden className="inline-block h-3 w-3 shrink-0 rounded-sm border border-line" style={{ background: g.fill }} />
            <Term id={g.term}>{g.label}</Term> <span className="font-semibold text-fg">{g.n}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
