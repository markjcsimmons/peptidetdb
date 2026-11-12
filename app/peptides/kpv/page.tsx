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
import { PageContents } from "@/components/page-contents";

export const metadata: Metadata = {
  title: "KPV peptide: what the studies show",
  description:
    "What the evidence shows for KPV, a three-amino-acid peptide promoted for inflammation: laboratory and mouse studies, no human trial found, and its 2026 FDA advisory committee review and legal status.",
  alternates: { canonical: "/peptides/kpv" },
};

const REVIEWED = "2026-11-10";

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is KPV?",
    a: "KPV is a tripeptide, three amino acids (lysine, proline, valine), that is a fragment of the hormone alpha-MSH. Reviews describe it as having anti-inflammatory effects without alpha-MSH's pigment-inducing activity.",
  },
  {
    q: "Does KPV work for inflammation or gut problems?",
    a: "It has not been shown in people. In a 2008 study KPV reduced inflammatory signalling in human cell lines and lowered chemically induced colitis in mice. We found no human trial of KPV.",
  },
  {
    q: "Is KPV safe?",
    a: "We found no human safety data. The studies we summarise are in cells and mice, so the effects of KPV in people, including side effects, are unstudied in what we found.",
  },
  {
    q: "Is KPV legal?",
    a: "It is not an approved drug. FDA's advisory committee considered KPV for wound healing and inflammatory conditions in July 2026 and, according to news reports, recommended it for the 503A bulks list, a vote that is not binding. Reports say FDA staff cited the lack of human studies. See our legal status page.",
  },
];

export default function KpvPage() {
  const studies = STUDIES.filter((s) => s.peptides.includes("kpv")).sort((a, b) => b.year - a.year);
  return (
    <article className="relative mx-auto max-w-3xl">
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
            { "@type": "ListItem", position: 3, name: "KPV", item: absoluteUrl("/peptides/kpv") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / KPV
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">KPV peptide: what the studies show</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          KPV is a three-amino-acid peptide promoted for inflammation, gut problems and skin healing. The evidence we found
          is laboratory and mouse studies and a review proposing it for wounds. We found no human trial of KPV. It is not an
          approved drug, and FDA&rsquo;s advisory committee reviewed it in July 2026 without a final FDA decision.
        </p>
      </Callout>

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What it is</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          KPV is the tripeptide Lys-Pro-Val, a truncated piece of the hormone alpha-MSH. A 2019 review notes that such
          fragments have{" "}
          <PaperLink id="bohm-2019" via="doi">
            anti-inflammatory effects without the pigment-inducing activity
          </PaperLink>{" "}
          of the full hormone and proposes them as candidates for treating skin wounds. See{" "}
          <Link href="/peptides/how-peptides-work" className="link">
            how peptides work
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What the studies show</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-3 pl-6 text-soft">
          <li>
            <strong className="text-fg">Cells and colitis in mice (2008).</strong> KPV reduced inflammatory signalling and
            cytokine release in human intestinal and T-cell lines through the PepT1 transporter, and in mice given KPV in
            drinking water,{" "}
            <PaperLink id="dalmasso-2008" via="pmc">
              chemically induced colitis was less frequent
            </PaperLink>
            .
          </li>
          <li>
            <strong className="text-fg">Colitis-associated cancer in mice (2016).</strong> KPV{" "}
            <PaperLink id="viennois-2016" via="pmc">
              prevented tumour development in normal mice
            </PaperLink>{" "}
            but not in mice lacking PepT1, in a study mainly about that transporter.
          </li>
          <li>
            <strong className="text-fg">Humans.</strong> Our PubMed searches did not find a human trial of KPV. The searches
            are noisy because &ldquo;KPV&rdquo; abbreviates other things, so this is a result of our search, not proof none
            exists.
          </li>
        </ul>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          <strong className="text-fg">What this does not show.</strong> Mouse colitis models are induced with chemicals,
          and results in them often fail to carry over to people. Authors&rsquo; statements that KPV &ldquo;might be&rdquo;
          a therapy are hypotheses. See the{" "}
          <Link href="/science/topics/immune" className="link">
            immune and inflammation evidence
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Legal status</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          KPV is not an FDA-approved drug. FDA&rsquo;s Pharmacy Compounding Advisory Committee considered it for wound
          healing and inflammatory conditions in July 2026; news reports say it recommended KPV for the 503A bulks list
          and that FDA staff cited the lack of human studies. The vote is not binding, and the HHS draft policy of 30
          October 2026 is covered on the{" "}
          <Link href="/peptides/legal-status" className="link">
            legal status page
          </Link>
          . To check a product&rsquo;s paperwork, see{" "}
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

      <PeptideInGuides peptide="kpv" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
