import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KIND_LABEL, PEPTIDE_LABEL, TOPIC_LABEL, studiesForTopic, shortCite, type Topic } from "@/lib/studies";
import { TOPICS, TOPIC_SLUGS } from "@/lib/topics";
import { MeterLegend, RatingBadge } from "@/components/evidence-meter";
import { absoluteUrl, formatDate, trimText } from "@/lib/format";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { StudyCard } from "@/components/study-parts";
import { TopicGuides } from "@/components/guide-links";
import { StudyMix } from "@/components/study-mix";
import { RatingsTable } from "@/components/ratings-table";
import { PageContents } from "@/components/page-contents";
import { CARD } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return TOPIC_SLUGS.map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const t = TOPICS[topic as Topic];
  if (!t) return {};
  return {
    title: t.title,
    description: trimText(t.intro, 155),
    alternates: { canonical: `/science/topics/${t.slug}` },
  };
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const t = TOPICS[topic as Topic];
  if (!t) notFound();
  const studies = studiesForTopic(t.slug);

  return (
    <article className="relative mx-auto max-w-3xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Studies", item: absoluteUrl("/science") },
            { "@type": "ListItem", position: 2, name: TOPIC_LABEL[t.slug], item: absoluteUrl(`/science/topics/${t.slug}`) },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/science" className="link">
          Studies
        </Link>{" "}
        / {TOPIC_LABEL[t.slug]}
      </nav>
      <p className="mt-5 text-caption font-semibold uppercase tracking-[0.08em] text-accent">
        {t.measures === "safety" ? "Safety evidence" : "Evidence page"}
      </p>
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">{t.title}</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(t.reviewedOn)}.</p>
      <p className="mt-5 max-w-prose text-lg text-soft [text-wrap:pretty]">{t.intro}</p>

      <RatingsTable
        measures={t.measures}
        rows={t.ratings.map((r, i) => ({ subject: r.subject, level: r.level, href: `#rating-${i + 1}` }))}
      />
      <div className="mt-5 rounded-tile border border-line bg-card px-5 py-4">
        <StudyMix studies={studies} title={`The ${studies.length} studies behind these ratings`} />
      </div>
      <TopicGuides topic={t.slug} />

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What the evidence shows</h2>
        <ol className="mt-6 grid gap-5">
          {t.ratings.map((r, i) => (
            <li key={r.subject} id={`rating-${i + 1}`} className={`${CARD} scroll-mt-6`}>
              <h3 className="text-xl font-bold leading-tight">{r.subject}</h3>
              <div className="mt-3">
                <RatingBadge level={r.level} measures={t.measures} />
              </div>
              <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">{r.why}</p>
            </li>
          ))}
        </ol>
        <details className="mt-4 rounded-tile border border-line bg-card">
          <summary className="flex min-h-11 cursor-pointer items-center px-4 text-sm font-medium">
            How to read these ratings
          </summary>
          <div className="px-4 pb-4">
            <MeterLegend />
          </div>
        </details>
        <p className="mt-3 text-sm text-muted">
          Verdicts reflect only the studies summarised on this site, last reviewed {formatDate(t.reviewedOn)}. See{" "}
          <Link href="/science/methodology" className="link">
            how verdicts are set
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Studies ({studies.length})</h2>
        <div className="mt-4 overflow-x-auto rounded-tile border border-line">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-card text-muted">
              <tr>
                <th className="px-3 py-2 font-medium">Study</th>
                <th className="px-3 py-2 font-medium">Design</th>
                <th className="px-3 py-2 font-medium">Peptide</th>
              </tr>
            </thead>
            <tbody>
              {studies.map((s) => (
                <tr key={s.id} className="border-t border-line align-top">
                  <td className="px-3 py-2">
                    <Link href={`/science/${s.id}`} className="link">
                      {shortCite(s)}
                    </Link>
                  </td>
                  <td className="px-3 py-2">{KIND_LABEL[s.kind]}</td>
                  <td className="px-3 py-2">{s.peptides.map((p) => PEPTIDE_LABEL[p]).join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 space-y-4">
          {studies.map((s) => (
            <StudyCard key={s.id} study={s} />
          ))}
        </div>
      </section>

      {t.gaps.length > 0 && (
        <section className="mt-14 rounded-card border border-line bg-card p-6 sm:p-7">
          <h2 className="text-xl font-bold">Not covered yet</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {t.gaps.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </section>
      )}

      {t.slug === "safety" && (
        <p className="mt-6">
          See also:{" "}
          <Link href="/peptides/legal-status" className="link">
            Are peptides legal in the US? (dated status page)
          </Link>
        </p>
      )}

      <p className="mt-8 text-sm text-muted">{SITE.disclaimer}</p>
    </article>
  );
}
