import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STUDIES, STUDY_BY_ID, relatedStudies, shortCite, KIND_HINT, PEPTIDE_LABEL, type Study } from "@/lib/studies";
import { absoluteUrl, formatDate, trimText } from "@/lib/format";
import { SITE } from "@/lib/site";
import { PaperLink } from "@/components/paper-link";
import { StudyChips } from "@/components/study-parts";
import { JsonLd } from "@/components/json-ld";
import { Callout } from "@/components/ui";
import { EvidenceRung } from "@/components/evidence-rung";

export const dynamicParams = false;

export function generateStaticParams() {
  return STUDIES.map((s) => ({ slug: s.id }));
}

function firstAuthorSurname(s: Study) {
  return s.authors.split(",")[0].trim().replace(/\s+[A-Z]{1,3}$/, "");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = STUDY_BY_ID.get(slug);
  if (!s) return {};
  const subject = s.peptides.length > 2 ? "Peptides" : PEPTIDE_LABEL[s.peptides[0]];
  const noun: Record<Study["kind"], string> = {
    "meta-analysis": "meta-analysis",
    "systematic-review": "systematic review",
    "human-controlled": "trial",
    "human-uncontrolled": "human study",
    review: "review",
    animal: "animal study",
    "in-vitro": "lab study",
    "lab-analysis": "lab analysis",
  };
  return {
    title: `${firstAuthorSurname(s)} ${s.year}: ${subject} ${noun[s.kind]}`,
    description: trimText(s.finding, 155),
    alternates: { canonical: `/science/${s.id}` },
  };
}

function Fact({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-0.5 text-sm">{value}</dd>
    </div>
  );
}

export default async function StudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = STUDY_BY_ID.get(slug);
  if (!s) notFound();
  const related = relatedStudies(s);

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: trimText(s.title.replace(/\.$/, ""), 110),
    description: trimText(s.finding, 200),
    url: absoluteUrl(`/science/${s.id}`),
    dateModified: s.verifiedOn,
    publisher: { "@type": "Organization", name: SITE.name },
    about: s.peptides.map((p) => ({ "@type": "Thing", name: PEPTIDE_LABEL[p] })),
    citation: {
      "@type": "ScholarlyArticle",
      name: s.title.replace(/\.$/, ""),
      author: s.authors.split(",").map((a) => ({ "@type": "Person", name: a.trim() })),
      datePublished: String(s.year),
      isPartOf: { "@type": "Periodical", name: s.journal },
      sameAs: `https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/`,
      ...(s.doi ? { identifier: { "@type": "PropertyValue", propertyID: "doi", value: s.doi } } : {}),
    },
  };

  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd data={ld} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Studies", item: absoluteUrl("/science") },
            { "@type": "ListItem", position: 2, name: shortCite(s), item: absoluteUrl(`/science/${s.id}`) },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/science" className="link">
          Studies
        </Link>{" "}
        / {shortCite(s)}
      </nav>

      <h1 className="mt-3 text-2xl font-bold leading-snug tracking-tight sm:text-3xl">{s.title.replace(/\.$/, "")}</h1>
      <p className="mt-2 text-sm text-muted">
        {s.authors.split(",").length > 6 ? `${s.authors.split(",").slice(0, 6).join(",")}, et al.` : s.authors}.{" "}
        <em>{s.journal}</em>. {s.year}
        {s.ref ? `; ${s.ref}` : ""}.
      </p>
      <p className="mt-1 text-sm">
        <PaperLink id={s.id} />
        {s.pmcid && (
          <>
            {" · "}
            <PaperLink id={s.id} via="pmc" />
          </>
        )}
        {s.doi && (
          <>
            {" · "}
            <PaperLink id={s.id} via="doi" />
          </>
        )}
      </p>

      <div className="mt-5">
        <StudyChips study={s} />
        <p className="mt-2 text-sm text-muted">{KIND_HINT[s.kind]}</p>
      </div>

      <div className="mt-5">
        <EvidenceRung kind={s.kind} />
      </div>

      <dl className="mt-6 grid gap-4 rounded-card border border-line bg-card p-6 sm:grid-cols-2">
        <Fact label="Who or what was studied" value={s.population} />
        <Fact label="Design" value={s.design} />
        <Fact label="Dose" value={s.dose} />
        <Fact label="Duration" value={s.duration} />
      </dl>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">What it found</h2>
        <p className="mt-2 max-w-prose">{s.finding}</p>
      </section>

      <Callout tone="warn" label="What it doesn’t show" className="mt-8">
        <p className="max-w-prose">{s.caveat}</p>
      </Callout>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Funding and conflicts of interest</h2>
        <p className="mt-2 max-w-prose">
          {s.funding ?? "No funding or conflict-of-interest statement appears in the PubMed record. Check the full text."}
        </p>
      </section>

      {s.unverified && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Claims we could not verify</h2>
          <p className="mt-2 max-w-prose">{s.unverified}</p>
        </section>
      )}

      <p className="mt-8 text-sm text-muted">
        Summary written from the study&apos;s abstract and checked against PubMed on {formatDate(s.verifiedOn)}.{" "}
        <Link href="/science/methodology" className="link">
          How we check studies
        </Link>
        . Educational information, not medical advice.
      </p>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Related studies</h2>
          <ul className="mt-3 space-y-2">
            {related.map((r) => (
              <li key={r.id}>
                <Link href={`/science/${r.id}`} className="link">
                  {r.title.replace(/\.$/, "")}
                </Link>{" "}
                <span className="text-sm text-muted">({shortCite(r)})</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
