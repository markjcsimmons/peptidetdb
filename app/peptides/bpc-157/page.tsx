import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout } from "@/components/ui";
import { StudyCard } from "@/components/study-parts";
import { STUDIES } from "@/lib/studies";

export const metadata: Metadata = {
  title: "BPC-157: what the studies show",
  description:
    "What the evidence shows for BPC-157: mostly animal studies, three small uncontrolled human studies with 30 people in all, no randomised trial found, what reviews say about safety, oral use and product quality, and its 2026 legal status.",
  alternates: { canonical: "/peptides/bpc-157" },
};

const REVIEWED = "2026-11-10";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Does BPC-157 work?",
    a: "Not shown in people. Nearly all the evidence is from animals. A 2026 systematic review found only three small uncontrolled human studies, 30 people in all, rated the certainty of evidence very low, and concluded BPC-157 should not be used clinically outside regulated, high-quality trials.",
  },
  {
    q: "Is BPC-157 safe?",
    a: "Unknown. The three small human studies reported no treatment-related adverse events, but 30 people without a control group cannot establish safety. Reviews say there are no validated dosing or long-term safety data, and warn of contamination and inaccurate dosing in unregulated products.",
  },
  {
    q: "Does oral BPC-157 work?",
    a: "We found no human study of oral BPC-157. A 2026 review says it is unusually stable in gastric juice and active by several routes in preclinical work, but that its human pharmacokinetics are poorly characterised and no pharmaceutical-grade formulation has been validated.",
  },
  {
    q: "Is BPC-157 legal?",
    a: "It is not FDA-approved for any use. In July 2026 an FDA advisory committee voted 8 to 6, with one abstention, to recommend it for the 503A bulks list for ulcerative colitis. That vote is not binding, and on 30 October 2026 HHS published a draft enforcement-discretion policy that, as reported by law firms, covers it. See our dated legal status page.",
  },
  {
    q: "What are the side effects of BPC-157?",
    a: "No study has measured side effects well. The human studies report none, and reviews list possible risks such as product contamination, impurities, inaccurate dosing and effects on blood-vessel growth, which are mechanisms or possibilities rather than measured outcomes.",
  },
];

export default function Bpc157Page() {
  const studies = STUDIES.filter((s) => s.peptides.includes("bpc-157")).sort((a, b) => b.year - a.year);
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
            { "@type": "ListItem", position: 3, name: "BPC-157", item: absoluteUrl("/peptides/bpc-157") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / BPC-157
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">BPC-157: what the studies show</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          BPC-157 is a synthetic peptide promoted for injury recovery. Nearly all the evidence is from animals. The human
          evidence is three small uncontrolled studies with 30 people in all, which a 2026 systematic review rated very
          low certainty. We found no randomised trial, and no human study of oral use. It is not FDA-approved, and its
          compounding status is changing in 2026 without a final FDA decision.
        </p>
      </Callout>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What it is</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          BPC-157 (body protection compound 157) is a{" "}
          <PaperLink id="mcguire-2025" via="pmc">
            pentadecapeptide
          </PaperLink>
          , a chain of 15 amino acids, described as derived from a fragment of a gastric protein (
          <PaperLink id="mateescu-2026" via="pmc">
            Mateescu 2026
          </PaperLink>
          ). It is sold online as a research compound or compounded by some pharmacies; it is not a supplement like
          collagen, and the two have very different evidence. See{" "}
          <Link href="/peptides/how-peptides-work" className="link">
            how peptides work
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Animal evidence</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          A systematic review found{" "}
          <PaperLink id="vasireddi-2025" via="pmc">
            35 preclinical studies and one clinical report
          </PaperLink>
          , and the animal studies suggest faster healing of muscle, tendon, ligament and bone injuries. That is a reason to
          study it, not evidence that it works in people. Many treatments that help animals do not help people.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Human evidence</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          A 2026 systematic review that searched to June 2026 found only{" "}
          <PaperLink id="poolton-2026" via="doi">
            three human studies, 30 people in all
          </PaperLink>
          :
        </p>
        <ul className="mt-3 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            A retrospective review of knee injections: of 16 patients reached by phone,{" "}
            <PaperLink id="lee-padgett-2021" via="pubmed">
              14 said their pain eased
            </PaperLink>
            , with no control group and self-rated outcomes.
          </li>
          <li>A retrospective pilot of bladder instillation for interstitial cystitis in 12 people.</li>
          <li>
            A pilot in two people given{" "}
            <PaperLink id="lee-burgess-2025" via="pubmed">
              intravenous BPC-157 over three days
            </PaperLink>
            , with no change in blood markers and no side effects reported.
          </li>
        </ul>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The review judged all three poor quality and the overall certainty very low. We also searched PubMed for BPC-157
          with the publication types randomised controlled trial or clinical trial and found no records, which is a result
          of our search, not proof that none exists. A 2026 drug-development review says there is no approved formulation,
          no validated dosing regimen and no completed phase II trial (
          <PaperLink id="mateescu-2026" via="pmc">
            Mateescu 2026
          </PaperLink>
          ).
        </p>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          <strong className="text-fg">What this does not show.</strong> Improvement reported by patients without a
          control group could be placebo or natural recovery, and 30 people is far too few to establish safety. See the{" "}
          <Link href="/science/topics/joints" className="link">
            joints and tendons evidence
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Oral BPC-157</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The drug-development review notes that BPC-157 is unusually stable in gastric juice and has shown activity by oral,
          injected and topical routes in preclinical work, but that its human pharmacokinetics are critically
          undercharacterised. In preclinical studies in two species the plasma half-life was under 30 minutes, which
          contrasts with effects described as lasting hours to days. We found no human study of oral use.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Safety, dosing and product quality</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          We do not give doses, because none are validated. Reviews list possible risks including product contamination,
          impurities, inaccurate dosing, effects on blood-vessel growth and cancer, which are mechanisms or possibilities,
          not measured outcomes (<PaperLink id="moiz-2026" via="pmc">Moiz 2026</PaperLink>). A 2026 orthopaedic review adds
          concerns about product identity, purity, concentration, sterility and consistency, and cannot recommend routine
          clinical use (<PaperLink id="tham-2026" via="doi">Tham 2026</PaperLink>). To check a specific batch, see{" "}
          <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
            how to read a peptide COA
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Legal status and sport</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          BPC-157 is not FDA-approved for any use. In July 2026 FDA&rsquo;s Pharmacy Compounding Advisory Committee
          recommended it for the 503A bulks list for ulcerative colitis (reported 8 to 6 with one abstention), against FDA
          staff advice. The vote is not binding, and the legal status page covers the HHS draft policy of 30 October 2026.
          Its use is banned in professional sport (
          <PaperLink id="vasireddi-2025" via="pmc">
            Vasireddi 2025
          </PaperLink>
          ). Nothing here is legal advice; see the{" "}
          <Link href="/peptides/legal-status" className="link">
            legal status page
          </Link>{" "}
          for dated sources.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Studies behind this page</h2>
        <div className="mt-6 grid gap-5">
          {studies.map((s) => (
            <StudyCard key={s.id} study={s} />
          ))}
        </div>
        <p className="mt-5 max-w-prose text-sm text-muted">
          More context:{" "}
          <Link href="/science/topics/safety" className="link">
            safety evidence
          </Link>
          ,{" "}
          <Link href="/peptides/peptides-for-muscle-growth" className="link">
            peptides for muscle growth
          </Link>{" "}
          and{" "}
          <Link href="/peptides/are-peptides-steroids" className="link">
            are peptides steroids?
          </Link>
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
