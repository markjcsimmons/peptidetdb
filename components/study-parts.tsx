import Link from "next/link";
import {
  DELIVERY_LABEL,
  KIND_HINT,
  KIND_LABEL,
  PEPTIDE_LABEL,
  TOPIC_LABEL,
  shortCite,
  type Study,
} from "@/lib/studies";
import { trimText } from "@/lib/format";

export function KindBadge({ kind }: { kind: Study["kind"] }) {
  return (
    <span className="chip border-accent text-accent" title={KIND_HINT[kind]}>
      {KIND_LABEL[kind]}
    </span>
  );
}

/**
 * Chips for a study. `compact` (used on list cards) keeps the design badge, up to two topics and up to two
 * peptides, and folds the rest into "+N more"; the study's own page shows everything.
 */
export function StudyChips({ study, compact = false }: { study: Study; compact?: boolean }) {
  const topics = compact ? study.topics.slice(0, 2) : study.topics;
  const peptides = compact ? study.peptides.slice(0, 2) : study.peptides;
  const hidden = compact
    ? study.topics.length - topics.length + (study.peptides.length - peptides.length) + study.delivery.length
    : 0;
  return (
    <div className="flex flex-wrap gap-2">
      <KindBadge kind={study.kind} />
      {topics.map((t) => (
        <Link key={t} href={`/science/topics/${t}`} className="chip hover:text-fg">
          {TOPIC_LABEL[t]}
        </Link>
      ))}
      {peptides.map((p) => (
        <span key={p} className="chip">
          {PEPTIDE_LABEL[p]}
        </span>
      ))}
      {!compact &&
        study.delivery.map((d) => (
          <span key={d} className="chip">
            {DELIVERY_LABEL[d]}
          </span>
        ))}
      {hidden > 0 && <span className="chip">+{hidden} more</span>}
    </div>
  );
}

export function StudyCard({ study }: { study: Study }) {
  return (
    <article className="rounded-card border border-line bg-card p-6">
      <StudyChips study={study} compact />
      <h3 className="mt-3 text-lg font-semibold leading-snug">
        <Link href={`/science/${study.id}`} className="hover:underline">
          {study.title.replace(/\.$/, "")}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-muted">
        {shortCite(study)} · <em>{study.journal}</em>
        {study.population ? ` · ${study.population}` : ""}
      </p>
      <p className="mt-3 text-sm">{trimText(study.finding, 260)}</p>
      <p className="mt-1 text-sm">
        <Link href={`/science/${study.id}`} className="link-solo">
          What it found and what it doesn&apos;t show
        </Link>
      </p>
    </article>
  );
}
