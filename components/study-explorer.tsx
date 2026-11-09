"use client";

import { useMemo, useState } from "react";
import {
  KIND_LABEL,
  PEPTIDE_LABEL,
  TOPIC_LABEL,
  type PeptideId,
  type Study,
  type StudyKind,
  type Topic,
} from "@/lib/studies";
import { StudyCard } from "@/components/study-parts";

const selectClass =
  "w-full rounded-tile border border-line bg-card px-3 py-2 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-accent";

export function StudyExplorer({ studies }: { studies: Study[] }) {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState<Topic | "">("");
  const [peptide, setPeptide] = useState<PeptideId | "">("");
  const [kind, setKind] = useState<StudyKind | "">("");

  const peptides = useMemo(
    () => (Object.keys(PEPTIDE_LABEL) as PeptideId[]).filter((p) => studies.some((s) => s.peptides.includes(p))),
    [studies],
  );
  const kinds = useMemo(
    () => (Object.keys(KIND_LABEL) as StudyKind[]).filter((k) => studies.some((s) => s.kind === k)),
    [studies],
  );

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return studies
      .filter((s) => (topic ? s.topics.includes(topic) : true))
      .filter((s) => (peptide ? s.peptides.includes(peptide) : true))
      .filter((s) => (kind ? s.kind === kind : true))
      .filter((s) =>
        needle ? `${s.title} ${s.authors} ${s.journal} ${s.finding}`.toLowerCase().includes(needle) : true,
      )
      .sort((a, b) => b.year - a.year);
  }, [studies, q, topic, peptide, kind]);

  const active = q || topic || peptide || kind;

  return (
    <section aria-label="Study explorer">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block text-sm">
          <span className="mb-1 block text-muted">Search</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Title, author, finding"
            className={selectClass}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">Topic</span>
          <select value={topic} onChange={(e) => setTopic(e.target.value as Topic | "")} className={selectClass}>
            <option value="">All topics</option>
            {(Object.keys(TOPIC_LABEL) as Topic[]).map((t) => (
              <option key={t} value={t}>
                {TOPIC_LABEL[t]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">Peptide</span>
          <select
            value={peptide}
            onChange={(e) => setPeptide(e.target.value as PeptideId | "")}
            className={selectClass}
          >
            <option value="">All peptides</option>
            {peptides.map((p) => (
              <option key={p} value={p}>
                {PEPTIDE_LABEL[p]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">Study design</span>
          <select value={kind} onChange={(e) => setKind(e.target.value as StudyKind | "")} className={selectClass}>
            <option value="">All designs</option>
            {kinds.map((k) => (
              <option key={k} value={k}>
                {KIND_LABEL[k]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        Showing {shown.length} of {studies.length} studies
        {active ? (
          <>
            {" · "}
            <button
              type="button"
              className="link"
              onClick={() => {
                setQ("");
                setTopic("");
                setPeptide("");
                setKind("");
              }}
            >
              Clear filters
            </button>
          </>
        ) : null}
      </p>

      <div className="mt-4 space-y-4">
        {shown.map((s) => (
          <StudyCard key={s.id} study={s} />
        ))}
        {shown.length === 0 && (
          <p className="rounded-card border border-line bg-card p-6 text-sm text-muted">
            No studies match those filters.
          </p>
        )}
      </div>
    </section>
  );
}
