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
  title: "Ipamorelin: what the studies show",
  description:
    "What human studies show for ipamorelin: one controlled trial after bowel surgery that found no significant benefit, a 1999 hormone study, no trial for muscle, and what reviews say about safety and legal status.",
  alternates: { canonical: "/peptides/ipamorelin" },
};

const REVIEWED = "2026-11-10";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Does ipamorelin build muscle?",
    a: "We found no controlled human trial of ipamorelin with a muscle, strength or body-composition outcome. The human studies we found are a 1999 hormone-level study in healthy men and a phase 2 trial after bowel surgery that found no significant benefit on its main endpoint.",
  },
  {
    q: "Is ipamorelin safe?",
    a: "In the surgical trial, 0.03 mg/kg given by vein twice daily for up to 7 days was well tolerated. That says little about the injections people self-administer for months. Recent reviews say rigorous human safety data are scarce for peptides sold as research compounds, and that product quality is a concern.",
  },
  {
    q: "Is ipamorelin legal?",
    a: "It is not an FDA-approved drug. FDA's compounding page lists ipamorelin acetate in Category 2 for outsourcing facilities (503B), dated 29 September 2023, and it was not among the seven peptides the advisory committee reviewed in July 2026. See our dated legal status page.",
  },
  {
    q: "What is the difference between ipamorelin and CJC-1295?",
    a: "Both are described as raising growth hormone, but by different routes: ipamorelin is a ghrelin-receptor agonist, and CJC-1295 is a growth-hormone-releasing-hormone analogue. We found no controlled trial of the two together.",
  },
];

export default function IpamorelinPage() {
  const studies = STUDIES.filter((s) => s.peptides.includes("ipamorelin")).sort((a, b) => b.year - a.year);
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
            { "@type": "ListItem", position: 3, name: "Ipamorelin", item: absoluteUrl("/peptides/ipamorelin") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Ipamorelin
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">Ipamorelin: what the studies show</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          Ipamorelin is an injectable peptide that stimulates the release of growth hormone. It is promoted for muscle,
          fat loss and recovery, but we found no controlled human trial that tested it for any of those. The human
          studies we found are a 1999 hormone-level study and a phase 2 trial after bowel surgery that found no
          significant benefit. It is not FDA-approved, and recent reviews call this class of peptides experimental.
        </p>
      </Callout>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What it is</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The studies describe ipamorelin as a growth hormone releasing peptide (
          <PaperLink id="gobburu-1999" via="doi">
            1999 study in volunteers
          </PaperLink>
          ) and a ghrelin mimetic, an agent that acts on the ghrelin receptor (
          <PaperLink id="beck-2014" via="doi">
            2014 trial
          </PaperLink>
          ). It belongs to the group of growth hormone secretagogues sold online as &ldquo;research compounds&rdquo;
          (<PaperLink id="dominikowski-2026" via="pmc">Dominikowski 2026</PaperLink>).
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What the human studies show</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-3 pl-6 text-soft">
          <li>
            <strong className="text-fg">Hormone levels (1999).</strong> In healthy men, each dose triggered a single
            episode of growth hormone release that fell back to negligible levels, and the drug&rsquo;s half-life was
            about 2 hours. It tested no muscle, strength or health outcome.
          </li>
          <li>
            <strong className="text-fg">Bowel surgery (2014).</strong> In a placebo-controlled phase 2 trial of 117
            patients, ipamorelin by vein for up to 7 days was well tolerated, but time to a first tolerated meal (25.3
            versus 32.6 hours) was not significantly different (P = 0.15).
          </li>
          <li>
            <strong className="text-fg">Muscle.</strong> Our PubMed search for ipamorelin with muscle, strength or lean
            mass in the title or abstract found reviews and rat studies, not a human trial. That is a result of our
            search, not proof none exists.
          </li>
        </ul>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          A higher growth hormone level is not the same as more muscle. When growth hormone itself was injected into
          healthy adults, a systematic review found about 2 kg more lean mass but{" "}
          <PaperLink id="liu-2008" via="doi">
            no clear gain in strength and more swelling and fatigue
          </PaperLink>
          , and that does not show what a peptide that stimulates its release would do.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Safety and product quality</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          For this group of peptides, a 2026 endocrinology review lists raised prolactin and cortisol, appetite changes,
          blood-sugar disturbance, fluid retention, muscle and joint pain and injection-site reactions among reported
          effects, and notes uncertainty about the composition and dose of products in unregulated supply chains. A 2026
          critical review adds{" "}
          <PaperLink id="coutinho-2026" via="doi">
            cardiovascular strain, insulin resistance and mislabelled or contaminated products
          </PaperLink>{" "}
          as concerns and calls use in sport high-risk. These describe the class; they are not measured rates for
          ipamorelin. To check a batch, see{" "}
          <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
            how to read a peptide COA
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Legal status and sport</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Ipamorelin is not an approved drug. FDA lists ipamorelin acetate in Category 2 for 503B outsourcing facilities
          (added 29 September 2023). It was not one of the seven peptides FDA&rsquo;s advisory committee reviewed in
          July 2026. A 2026 sports-medicine review notes{" "}
          <PaperLink id="villegas-meza-2026" via="doi">
            widespread anti-doping restrictions
          </PaperLink>{" "}
          on growth hormone secretagogues. The details and sources are on the{" "}
          <Link href="/peptides/legal-status" className="link">
            legal status page
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
        <p className="mt-5 max-w-prose text-sm text-muted">
          More context: <Link href="/peptides/cjc-1295" className="link">CJC-1295</Link>,{" "}
          <Link href="/peptides/bpc-157" className="link">BPC-157</Link>,{" "}
          <Link href="/peptides/peptides-for-muscle-growth" className="link">peptides for muscle growth</Link> and the{" "}
          <Link href="/science/topics/muscle" className="link">muscle evidence</Link>.
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

      <PeptideInGuides peptide="ipamorelin" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
