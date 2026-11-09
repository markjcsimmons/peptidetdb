import type { StudyKind } from "@/lib/studies";

/** The same five rungs as the ladder on /peptides/how-peptides-work, weakest to strongest. */
const RUNGS = ["Cells in a dish", "Animals", "Small human report", "Controlled human trial", "Pooled analysis"];

const RUNG_OF: Record<StudyKind, number | null> = {
  "in-vitro": 0,
  animal: 1,
  "human-uncontrolled": 2,
  "human-controlled": 3,
  "meta-analysis": 4,
  "systematic-review": 4,
  review: null,
};

/** Shows where a study design sits on the ladder of evidence. A review is not on it: it generates no data. */
export function EvidenceRung({ kind }: { kind: StudyKind }) {
  const at = RUNG_OF[kind];
  return (
    <div className="rounded-tile border border-line bg-card p-5" data-noprint>
      <p className="text-caption font-semibold uppercase tracking-[0.06em] text-muted">Where this design sits</p>
      <ol
        className="mt-3 grid grid-cols-5 items-end gap-1.5"
        aria-label={at === null ? "Not on the ladder: a review summarises other studies" : `Rung ${at + 1} of 5: ${RUNGS[at]}`}
      >
        {RUNGS.map((r, i) => {
          const on = i === at;
          return (
            <li key={r} className="flex flex-col gap-1.5">
              <span
                aria-hidden="true"
                className="block rounded-t-md"
                style={{
                  height: 12 + i * 8,
                  background: on ? "var(--accent)" : "var(--track)",
                  opacity: at === null ? 0.5 : 1,
                }}
              />
              <span className={`text-caption leading-tight ${on ? "font-semibold text-accent" : "text-muted"}`}>
                {r}
                {on && <span className="sr-only"> (this study)</span>}
              </span>
            </li>
          );
        })}
      </ol>
      {at === null && (
        <p className="mt-3 text-sm text-soft">
          This is a review: it summarises other people&apos;s work and generates no new data, so it is not placed on the
          ladder.
        </p>
      )}
    </div>
  );
}
