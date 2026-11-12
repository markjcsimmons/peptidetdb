import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout } from "@/components/ui";
import { StudyCard } from "@/components/study-parts";
import { STUDIES } from "@/lib/studies";
import { PeptideInGuides } from "@/components/guide-links";

export const metadata: Metadata = {
  title: "Selank: what the studies show",
  description:
    "What human studies show for selank, a peptide promoted for anxiety: three small Russian-language trials against benzodiazepines with no placebo group, and why that is not strong evidence. Safety and legal status.",
  alternates: { canonical: "/peptides/selank" },
};

const REVIEWED = "2026-11-10";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Does selank work for anxiety?",
    a: "Possibly, but the evidence is weak. We found three small Russian-language trials in 60 to 70 patients that compared selank with benzodiazepines or added it to one. None used a placebo, and the abstracts give no scores or doses. The authors report an anxiolytic effect similar to medazepam.",
  },
  {
    q: "Is selank safe?",
    a: "We found no standalone safety data. In one trial, adding selank to phenazepam was reported to reduce phenazepam's side effects, but the abstract gives no numbers. Long-term safety is unstudied in what we found.",
  },
  {
    q: "Is selank the same as a benzodiazepine?",
    a: "No. The trials we summarise compared selank with benzodiazepines such as medazepam and phenazepam, which are different drugs. Selank is a peptide, and the trials do not show it works the same way or is safer.",
  },
  {
    q: "Is selank legal?",
    a: "It is not an approved drug in the sources we reviewed. FDA's compounding page lists selank among substances whose nominations were withdrawn, and it was not among the seven peptides the advisory committee reviewed in July 2026. See our legal status page.",
  },
];

export default function SelankPage() {
  const studies = STUDIES.filter((s) => s.peptides.includes("selank")).sort((a, b) => b.year - a.year);
  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: SITE.name, item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "What are peptides?", item: absoluteUrl("/peptides") },
            { "@type": "ListItem", position: 3, name: "Selank", item: absoluteUrl("/peptides/selank") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Selank
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">Selank: what the studies show</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          Selank is a peptide promoted for anxiety. The human evidence we found is three small Russian-language trials in
          60 to 70 patients, published 2008 to 2015, comparing it with benzodiazepines or adding it to one. None had a
          placebo group and the abstracts give no scores or doses, so they cannot show that selank works better than no
          treatment. Much of the rest of the literature we found is in rodents. It is not an approved drug.
        </p>
      </Callout>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What the human studies show</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-3 pl-6 text-soft">
          <li>
            <strong className="text-fg">Versus medazepam (2008).</strong> In{" "}
            <PaperLink id="zozulia-2008" via="pubmed">
              62 patients with generalized anxiety disorder and neurasthenia
            </PaperLink>
            , the authors report similar anxiolytic effects to medazepam, plus antiasthenic and psychostimulant effects.
          </li>
          <li>
            <strong className="text-fg">Versus phenazepam (2014).</strong> In{" "}
            <PaperLink id="medvedev-2014" via="pubmed">
              60 patients with phobic-anxiety and somatoform disorders
            </PaperLink>
            , the authors report a pronounced anxiolytic effect that lasted a week after the last dose.
          </li>
          <li>
            <strong className="text-fg">Added to phenazepam (2015).</strong> In{" "}
            <PaperLink id="medvedev-2015" via="doi">
              70 patients
            </PaperLink>
            , the combination was reported to bring phenazepam&rsquo;s benefit earlier and to reduce its side effects.
          </li>
        </ul>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          <strong className="text-fg">What this does not show.</strong> A comparison with an active drug cannot show that
          selank beats no treatment, and the abstracts report no numbers, doses or treatment lengths. The trials are older,
          small, in a Russian-language journal, and we found no independent replication. See the{" "}
          <Link href="/science/topics/brain" className="link">
            sleep, memory and stress evidence
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Safety, legal status and product quality</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          We found no standalone safety data for selank. It is not an approved drug in the sources we reviewed. FDA&rsquo;s
          compounding page lists it among substances whose nominations were withdrawn, and it was not one of the seven
          peptides FDA&rsquo;s advisory committee reviewed in July 2026; see the{" "}
          <Link href="/peptides/legal-status" className="link">
            legal status page
          </Link>
          . Product quality is a documented concern for unapproved peptides (
          <PaperLink id="moiz-2026" via="pmc">
            Moiz 2026
          </PaperLink>
          ); see{" "}
          <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
            how to read a peptide COA
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Studies behind this page</h2>
        <div className="mt-6 grid gap-5">
          {studies.map((s) => (
            <StudyCard key={s.id} study={s} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Common questions</h2>
        <div className="mt-5 space-y-6">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-1 max-w-prose text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <PeptideInGuides peptide="selank" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
