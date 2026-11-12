import type { Metadata } from "next";
import Link from "next/link";
import { KIND_LABEL, STUDIES, type StudyKind } from "@/lib/studies";
import { TOPIC_SLUGS } from "@/lib/topics";
import { TopicCard } from "@/components/topic-card";
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

      <section className="mt-8" aria-labelledby="by-topic">
        <h2 id="by-topic" className="text-2xl font-bold">
          Evidence by topic
        </h2>
        <div className="-mx-4 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-3">
          {TOPIC_SLUGS.map((slug) => (
            <div key={slug} className="min-w-[260px] snap-start md:min-w-0 [&>a]:h-full">
              <TopicCard slug={slug} compact />
            </div>
          ))}
        </div>
      </section>

      <div id="explore" className="mt-8 scroll-mt-6">
        <StudyExplorer studies={STUDIES} />
      </div>
    </div>
  );
}
