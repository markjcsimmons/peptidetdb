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

export function StudyChips({ study }: { study: Study }) {
  return (
    <div className="flex flex-wrap gap-2">
      <KindBadge kind={study.kind} />
      {study.topics.map((t) => (
        <Link key={t} href={`/science/topics/${t}`} className="chip hover:text-fg">
          {TOPIC_LABEL[t]}
        </Link>
      ))}
      {study.peptides.map((p) => (
        <span key={p} className="chip">
          {PEPTIDE_LABEL[p]}
        </span>
      ))}
      {study.delivery.map((d) => (
        <span key={d} className="chip">
          {DELIVERY_LABEL[d]}
        </span>
      ))}
    </div>
  );
}

export function StudyCard({ study }: { study: Study }) {
  return (
    <article className="rounded-xl border border-line bg-card p-5">
      <StudyChips study={study} />
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
      <p className="mt-3 text-sm">
        <Link href={`/science/${study.id}`} className="link">
          What it found and what it doesn&apos;t show
        </Link>
      </p>
    </article>
  );
}
