import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl } from "@/lib/format";
import { JsonLd } from "@/components/json-ld";
import { PeptideIndex, type IndexItem } from "@/components/peptide-index";
import { GUIDES, listsCovering } from "@/lib/guides";
import { PEPTIDE_LABEL, STUDIES, TOPIC_LABEL, type PeptideId, type Topic } from "@/lib/studies";
import { TOPIC_SLUGS } from "@/lib/topics";
import { PEPTIDE_STATUS, STATUS_CHECKED, STATUS_LABEL, type StatusKind } from "@/lib/peptide-status";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Peptides A–Z: every peptide we cover",
  description:
    "An A–Z of the peptides in our study registry, from BPC-157 to tesamorelin: how many studies we summarised, which rankings include each one, and links to the evidence.",
  alternates: { canonical: "/peptides/a-z" },
};

/** Sort ignoring a leading "The"/punctuation, so "GHK-Cu" files under G. */
const sortKey = (s: string) => s.replace(/^[^A-Za-z0-9]+/, "").toLowerCase();

export default function PeptidesAZPage() {
  const items: IndexItem[] = (Object.keys(PEPTIDE_LABEL) as PeptideId[])
    .map((id) => {
      const studies = STUDIES.filter((s) => s.peptides.includes(id));
      const topics = TOPIC_SLUGS.filter((t) => studies.some((s) => s.topics.includes(t)));
      const profile = GUIDES.find((g) => g.kind === "profile" && g.peptides[0] === id)?.path;
      return {
        id,
        label: PEPTIDE_LABEL[id],
        studies: studies.length,
        profile,
        lists: listsCovering(id).map((g) => ({ path: g.path, title: g.title })),
        topics: topics.map((t) => ({ slug: t, label: TOPIC_LABEL[t] })),
        status: { kind: PEPTIDE_STATUS[id].kind, label: STATUS_LABEL[PEPTIDE_STATUS[id].kind], note: PEPTIDE_STATUS[id].note, sources: PEPTIDE_STATUS[id].sources },
      };
    })
    .filter((i) => i.studies > 0)
    .sort((a, b) => sortKey(a.label).localeCompare(sortKey(b.label)));

  const usedTopics = TOPIC_SLUGS.filter((t: Topic) => items.some((i) => i.topics.some((x) => x.slug === t))).map((t) => ({
    slug: t,
    label: TOPIC_LABEL[t],
  }));

  return (
    <div className="mx-auto max-w-5xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: SITE.name, item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "What are peptides?", item: absoluteUrl("/peptides") },
            { "@type": "ListItem", position: 3, name: "A–Z", item: absoluteUrl("/peptides/a-z") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / A–Z
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">Peptides A–Z</h1>
      <p className="mt-4 max-w-prose text-lg text-soft [text-wrap:pretty]">
        Every peptide, peptide drug and peptide product type in our study registry: {items.length} entries from{" "}
        {STUDIES.length} study summaries. Each entry links to its studies, the rankings that include it and the evidence
        pages that rate it. A long list of studies is not the same as strong evidence: see the ratings on the{" "}
        <Link href="/peptides/by-goal" className="link">
          goal pages
        </Link>
        .
      </p>

      <PeptideIndex
        items={items}
        topics={usedTopics}
        statuses={(Object.keys(STATUS_LABEL) as StatusKind[])
          .filter((k) => items.some((i) => i.status.kind === k))
          .map((k) => ({ slug: k, label: STATUS_LABEL[k] }))}
      />
      <p className="mt-6 max-w-prose text-sm text-muted">
        US status checked {formatDate(STATUS_CHECKED)} against FDA&rsquo;s approval records and its compounding
        safety-risk page; each entry links its source. &ldquo;Sold as a supplement&rdquo; and &ldquo;cosmetic
        ingredient&rdquo; describe how products are sold, not an FDA decision. Nothing here is legal advice: see the{" "}
        <Link href="/peptides/legal-status" className="link">
          legal status page
        </Link>
        .
      </p>

      <p className="mt-14 max-w-prose text-sm text-muted">
        Not listed: peptides we have not yet summarised any study for, such as semax. That is a gap in our coverage, not a
        finding about the peptide. {SITE.disclaimer}
      </p>
    </div>
  );
}
