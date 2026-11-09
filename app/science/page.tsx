import type { Metadata } from "next";
import Link from "next/link";
import { KIND_LABEL, STUDIES, type StudyKind } from "@/lib/studies";
import { TOPICS, TOPIC_SLUGS } from "@/lib/topics";
import { StudyExplorer } from "@/components/study-explorer";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Peptide studies: what the research shows",
  description:
    "Plain-language summaries of the human trials, meta-analyses and reviews on peptides, with what each study cannot show and who funded it.",
  alternates: { canonical: "/science" },
};

export default function SciencePage() {
  const counts = STUDIES.reduce<Partial<Record<StudyKind, number>>>((acc, s) => {
    acc[s.kind] = (acc[s.kind] ?? 0) + 1;
    return acc;
  }, {});
  const kinds = (Object.keys(KIND_LABEL) as StudyKind[]).filter((k) => counts[k]);

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Peptide studies",
          description: SITE.description,
          url: `${SITE.url}/science`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: STUDIES.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE.url}/science/${s.id}`,
              name: s.title.replace(/\.$/, ""),
            })),
          },
        }}
      />
      <h1 className="text-3xl font-bold tracking-tight">Peptide studies</h1>
      <p className="mt-3 max-w-prose text-muted">
        Each summary is written from the study&apos;s own abstract and says what it found, what it cannot show, and
        who funded it. Filter by topic, peptide or study design.
      </p>

      <div className="mt-5 flex flex-wrap gap-2" aria-label="Studies by design">
        {kinds.map((k) => (
          <span key={k} className="chip">
            {counts[k]} × {KIND_LABEL[k]}
          </span>
        ))}
      </div>

      <section className="mt-6 rounded-xl border border-line bg-card p-5">
        <h2 className="font-semibold">Evidence by topic</h2>
        <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
          {TOPIC_SLUGS.map((slug) => (
            <li key={slug}>
              <Link href={`/science/topics/${slug}`} className="link">
                {TOPICS[slug].title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8">
        <StudyExplorer studies={STUDIES} />
      </div>
    </div>
  );
}
