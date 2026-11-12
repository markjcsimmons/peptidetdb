import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout } from "@/components/ui";
import { PageContents } from "@/components/page-contents";

export const metadata: Metadata = {
  title: "How to read a peptide COA: what to check",
  description:
    "A certificate of analysis (COA) is a lab report for one batch. What purity, identity, content and contaminant results mean, what 'third-party tested' should tell you, and what a COA cannot prove.",
  alternates: { canonical: "/peptides/how-to-read-a-peptide-coa" },
};

const REVIEWED = "2026-11-10";

const CFR_URL = "https://www.law.cornell.edu/cfr/text/21/111.75";

type Row = { check: string; means: React.ReactNode; flag: string };

const ROWS: Row[] = [
  {
    check: "Batch (lot) number and test date",
    means: "Ties the report to one production run. The number should match the one on the container you actually hold.",
    flag: "No lot number, a number that does not match your container, or a report with no date.",
  },
  {
    check: "Who ran the test",
    means: "A named laboratory with contact details, ideally independent of the seller. ISO/IEC 17025 is the international standard for testing-laboratory competence; accreditation is granted by national accreditation bodies and covers a listed scope of tests.",
    flag: "No lab named, the seller's own logo only, or an accreditation claim you cannot find in the accreditor's directory or that does not list the test performed.",
  },
  {
    check: "Identity (mass spectrometry)",
    means: "Mass spectrometry measures the mass of the molecules in the sample. For a peptide, the measured mass should match the expected mass for that sequence.",
    flag: "No mass result, or measured and expected masses that differ with no explanation.",
  },
  {
    check: "Purity (HPLC)",
    means: "HPLC separates the sample, and the purity figure is usually the share of the detected signal, by peak area, that belongs to the main peak. It describes impurities of a similar kind, not how much of the vial's weight is peptide.",
    flag: "A percentage with no chromatogram, no stated detection method, or a figure presented as the amount of peptide in the vial.",
  },
  {
    check: "Content (net peptide content, water, counterion)",
    means: (
      <>
        Synthetic peptides are often supplied as salts, for example trifluoroacetate (TFA) from the production process,
        and the salt counts toward the weight of the powder, as does any moisture (
        <a
          href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12389442/"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          Erckes 2025
        </a>
        ). Net peptide content says how much of the powder is peptide.
      </>
    ),
    flag: "A purity percentage but no content figure, so the real amount per vial is unknown.",
  },
  {
    check: "Contaminants",
    means: (
      <>
        For injected products, tests such as sterility and endotoxin address contamination. A 2026 review lists
        contamination, impurities and inaccurate dosing among the{" "}
        <PaperLink id="moiz-2026" via="pmc">
          risks of the unregulated injectable market
        </PaperLink>
        . For oral products such as collagen, ask about heavy metals and microbes.
      </>
    ),
    flag: "No contaminant tests at all, or tests reported without limits or results.",
  },
  {
    check: "Methods, limits and actual results",
    means: (
      <>
        A useful report states how each test was done, the limit it must meet and the actual result. US rules for
        dietary-supplement makers say a supplier&rsquo;s certificate can be relied on only if, among other conditions, it describes the{" "}
        <a href={CFR_URL} target="_blank" rel="noopener noreferrer" className="link">
          methods, limits and actual results
        </a>
        .
      </>
    ),
    flag: "“Pass” with no numbers.",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is a certificate of analysis (COA)?",
    a: "A COA is a laboratory report for a specific batch of a product. It lists the tests done, the methods, the limits and the results. It describes that batch only.",
  },
  {
    q: "What does HPLC purity mean on a peptide COA?",
    a: "HPLC purity is usually the share of the detected signal that belongs to the main peptide peak. It does not tell you how much of the powder in the vial is peptide, which is what net peptide content measures.",
  },
  {
    q: "What does 'third-party tested' mean?",
    a: "It should mean an independent laboratory tested that batch. The phrase alone proves nothing: ask which lab, which tests, which batch, and whether the full report is published.",
  },
  {
    q: "Does a COA make a peptide legal or safe?",
    a: "No. A COA describes what was found in a batch. It does not make an unapproved compound approved, and it does not show that a compound works or is safe to take.",
  },
];

export default function PeptideCoaPage() {
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
            { "@type": "ListItem", position: 3, name: "How to read a peptide COA", item: absoluteUrl("/peptides/how-to-read-a-peptide-coa") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / How to read a peptide COA
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">How to read a peptide COA</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          A certificate of analysis (COA) is a lab report for one batch. Check that the lot number matches your container,
          that a named lab ran the tests, and that the report shows numbers, not just &ldquo;pass&rdquo;: identity by mass
          spectrometry, purity by HPLC, how much of the powder is actually peptide, and contaminant tests. A COA cannot
          show that a compound works, is safe, or is legal.
        </p>
      </Callout>

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">A checklist, line by line</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The explanations of HPLC, mass spectrometry and content are standard analytical chemistry rather than findings
          of a study on this site. Where a source is linked, it is linked; the rest is general background that a chemist
          can confirm.
        </p>
        <div className="mt-6 grid gap-4">
          {ROWS.map((r) => (
            <div key={r.check} className="rounded-card border border-line bg-card p-6">
              <h3 className="text-lg font-bold leading-tight">{r.check}</h3>
              <p className="mt-2 max-w-prose text-soft [text-wrap:pretty]">{r.means}</p>
              <p className="mt-3 max-w-prose text-sm text-muted">
                <strong className="text-fg">Be wary of:</strong> {r.flag}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">&ldquo;Third-party tested&rdquo; is a claim, not a result</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Ask four questions of any product that says it: which lab, which tests, which batch, and can I see the whole
          report? If the full report for the batch you hold is not available, the claim cannot be checked. If you doubt a
          report, contact the named lab with the report number to confirm it is genuine.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What a COA cannot tell you</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">Whether the compound works.</strong> That is a question for human trials; see the{" "}
            <Link href="/science" className="link">
              studies hub
            </Link>
            .
          </li>
          <li>
            <strong className="text-fg">Whether it is safe to take.</strong> A 2026 review says rigorous human safety data
            are scarce for many unapproved peptides (
            <PaperLink id="mendias-2026" via="doi">
              Mendias 2026
            </PaperLink>
            ). A clean batch of an unstudied compound is still an unstudied compound.
          </li>
          <li>
            <strong className="text-fg">Whether it is legal.</strong> See the{" "}
            <Link href="/peptides/legal-status" className="link">
              dated legal status page
            </Link>
            .
          </li>
          <li>
            <strong className="text-fg">Any other batch.</strong> A report covers the lot it names.
          </li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Oral supplements such as collagen</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          For collagen and other swallowed products the useful lines are identity, contaminants (heavy metals, microbes)
          and the amount per serving. We found no published study of contaminants in collagen supplements, so a
          batch-level report is the only way to check. We checked which brands publish them in{" "}
          <Link href="/peptides/best-collagen-peptides" className="link">
            collagen peptides with published batch test results
          </Link>
          . See{" "}
          <Link href="/peptides/collagen-peptides-side-effects" className="link">
            collagen peptide side effects
          </Link>{" "}
          and{" "}
          <Link href="/peptides/collagen-peptides-benefits" className="link">
            what the studies show
          </Link>
          .
        </p>
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

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
