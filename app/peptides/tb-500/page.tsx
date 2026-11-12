import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { ShortAnswer } from "@/components/ui";
import { StudyCard } from "@/components/study-parts";
import { STUDIES } from "@/lib/studies";
import { PeptideInGuides, PageKindLabel } from "@/components/guide-links";
import { PageContents } from "@/components/page-contents";
import { ProfileFactsPanel } from "@/components/profile-facts";
import { StudyMix } from "@/components/study-mix";

export const metadata: Metadata = {
  title: "TB-500: what the studies show",
  description:
    "What the evidence shows for TB-500, the thymosin beta-4 fragment sold for injury recovery: one rat study and lab work, no human trial found, why thymosin beta-4 trials do not apply, safety, product quality and 2026 legal status.",
  alternates: { canonical: "/peptides/tb-500" },
};

const REVIEWED = "2026-11-12";

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is TB-500?",
    a: "Anti-doping laboratories that analysed it describe TB-500's key ingredient as Ac-LKKTETQ: a copy of seven amino acids (positions 17 to 23) of the protein thymosin beta-4, with an acetyl group added. It is sold online, often for injury recovery, and is not an approved medicine.",
  },
  {
    q: "Is TB-500 the same as thymosin beta-4?",
    a: "No. Thymosin beta-4 is a 43-amino-acid protein; TB-500 copies seven of them. A 2026 orthopaedic review says the two are often conflated but there is no validated equivalence, and a 2024 lab study suggests healing effects reported for TB-500 may come from one of its breakdown products. Results for the full protein should not be assumed for TB-500.",
  },
  {
    q: "Does TB-500 help injuries heal?",
    a: "We found no human trial. The direct evidence is one rat study, in which tendons treated with TB-500 were stronger after 4 weeks, plus cell work. A 2026 scoping review of peptides for sports injuries concludes that the claimed benefits are not supported by human trials.",
  },
  {
    q: "Is TB-500 safe?",
    a: "Nobody has published a human safety study of TB-500 that we found. The one safety trial in our registry gave the full thymosin beta-4 protein into a vein to 40 healthy people for two weeks, which says nothing about TB-500 products. A 2023 analysis found that products sold online as TB500 and TB1000 did not consistently contain what they were described as.",
  },
  {
    q: "Is TB-500 legal?",
    a: "It is not FDA-approved. FDA's compounding page (current as of 22 April 2026) lists the thymosin beta-4 fragment known as TB-500 among substances whose nominations were withdrawn, and FDA's advisory committee voted in July 2026 to recommend it for the 503A bulks list for wound healing. That vote is not binding, and we found no final FDA decision. See our legal status page.",
  },
  {
    q: "Is TB-500 banned in sport?",
    a: "Anti-doping laboratories have developed tests for it, in horses and in blood and urine samples, and describe it as suspected of being used for doping. We could not open the World Anti-Doping Agency's prohibited list to check its current wording, so check with your sport's governing body.",
  },
];

/** Thymosin beta-4 as 43 beads, with the seven that TB-500 copies (positions 17 to 23) picked out. */
function FragmentDiagram() {
  return (
    <figure className="m-0 mt-6 rounded-card border border-line bg-card p-6 sm:p-7">
      <div
        role="img"
        aria-label="Thymosin beta-4 is a chain of 43 amino acids. TB-500's peptide copies seven of them, positions 17 to 23 (LKKTETQ), with an acetyl group added at the start."
        className="flex flex-wrap gap-1.5"
      >
        {Array.from({ length: 43 }, (_, i) => {
          const pos = i + 1;
          const on = pos >= 17 && pos <= 23;
          return (
            <span
              key={pos}
              className={`block h-4 w-4 rounded-full ${on ? "ring-2 ring-fg ring-offset-2 ring-offset-card" : ""}`}
              style={{ background: on ? "var(--bead-c)" : pos % 2 ? "var(--bead-a)" : "var(--bead-b)", opacity: on ? 1 : 0.45 }}
            />
          );
        })}
      </div>
      <figcaption className="mt-4 text-sm text-soft">
        <span className="font-semibold text-fg">Thymosin beta-4:</span> 43 amino acids.{" "}
        <span className="font-semibold text-fg">TB-500:</span> a copy of the seven highlighted (positions 17 to 23, LKKTETQ), with an
        acetyl group added. One bead per amino acid; colours are decoration only.
      </figcaption>
    </figure>
  );
}

export default function Tb500Page() {
  const tb500 = STUDIES.filter((s) => s.peptides.includes("tb-500")).sort((a, b) => b.year - a.year);
  const tb4 = STUDIES.filter((s) => s.peptides.includes("thymosin-beta-4") && !s.peptides.includes("tb-500")).sort(
    (a, b) => b.year - a.year,
  );
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
            { "@type": "ListItem", position: 3, name: "TB-500", item: absoluteUrl("/peptides/tb-500") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / TB-500
      </nav>
      <PageKindLabel path="/peptides/tb-500" />
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">TB-500: what the studies show</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <ShortAnswer className="mt-6">
        <p className="max-w-prose text-lg leading-relaxed sm:text-xl sm:leading-relaxed [text-wrap:pretty]">
          TB-500 is sold for injury recovery. Laboratories that analysed it describe its key ingredient as a seven-amino-acid
          fragment of the protein thymosin beta-4, and a 2026 orthopaedic review says the two should not be treated as
          equivalent. We found no human trial of TB-500: its evidence is one rat tendon study, laboratory work and doping tests.
          Human trials of the related protein thymosin beta-4 used the full protein, as eye drops, on leg ulcers or given into a
          vein, and do not show what TB-500 does. It is not FDA-approved.
        </p>
      </ShortAnswer>

      <ProfileFactsPanel path="/peptides/tb-500" reviewed={REVIEWED} />

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What it is</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Thymosin beta-4 is a 43-amino-acid protein made in the body (
          <PaperLink id="guarnera-2010" via="doi">
            Guarnera 2010
          </PaperLink>
          ). Doping-control laboratories that analysed TB-500 describe its key ingredient as{" "}
          <PaperLink id="ho-2012" via="doi">
            the peptide LKKTETQ with an acetyl group added
          </PaperLink>
          : a copy of positions 17 to 23 of thymosin beta-4, the region that binds the cell protein actin. A second laboratory{" "}
          <PaperLink id="esposito-2012" via="doi">
            identified the same fragment
          </PaperLink>{" "}
          in a TB-500 product. A 2026 orthopaedic review says TB-500 is often conflated with thymosin beta-4 but{" "}
          <PaperLink id="tham-2026" via="doi">
            has no validated equivalence
          </PaperLink>{" "}
          to it.
        </p>
        <FragmentDiagram />
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What has been studied</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The two are often discussed as one, but the evidence behind them is very different. Each bar counts the studies in our
          registry for that substance.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="rounded-card border border-line bg-card p-5">
            <p className="font-semibold">TB-500</p>
            <div className="mt-3">
              <StudyMix studies={tb500} title={`${tb500.length} studies`} />
            </div>
          </div>
          <div className="rounded-card border border-line bg-card p-5">
            <p className="font-semibold">Thymosin beta-4 (full protein)</p>
            <div className="mt-3">
              <StudyMix studies={tb4} title={`${tb4.length} studies`} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What the studies of TB-500 show</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-3 pl-6 text-soft">
          <li>
            <strong className="text-fg">Tendons in rats (2026).</strong> In 32 rats with a cut and repaired Achilles tendon,
            those injected with TB-500 had{" "}
            <PaperLink id="bicer-2026" via="doi">
              stronger tendons that looked better under the microscope
            </PaperLink>{" "}
            after 4 weeks than untreated rats; adding BPC-157 gave no extra benefit. The authors call it exploratory.
          </li>
          <li>
            <strong className="text-fg">How the body breaks it down (2024).</strong> A laboratory and rat study notes that{" "}
            <PaperLink id="rahaman-2024" via="doi">
              TB-500&rsquo;s own biological effects had not been documented
            </PaperLink>
            . It was broken down quickly, and in cell tests only one breakdown fragment, Ac-LKKTE, helped wounds close, so the
            authors suggest that reported healing effects may come from that fragment rather than TB-500 itself.
          </li>
          <li>
            <strong className="text-fg">Doping tests (2012).</strong> Laboratories developed tests that{" "}
            <PaperLink id="ho-2012" via="doi">
              detect TB-500 in horses given one dose
            </PaperLink>{" "}
            and in{" "}
            <PaperLink id="esposito-2012" via="doi">
              blood and urine samples
            </PaperLink>
            . These show what it is and how to find it, not whether it works.
          </li>
          <li>
            <strong className="text-fg">Reviews (2026).</strong> A scoping review of peptides used in sports medicine found
            that most publications were in animals and concludes that{" "}
            <PaperLink id="tewari-2026" via="doi">
              claimed recovery benefits are not supported by human trials
            </PaperLink>
            . Narrative reviews say human safety data for unapproved peptides including TB-500 are scarce (
            <PaperLink id="mendias-2026" via="doi">
              Mendias 2026
            </PaperLink>
            ) and that routine clinical use cannot be recommended (
            <PaperLink id="tham-2026" via="doi">
              Tham 2026
            </PaperLink>
            ).
          </li>
        </ul>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          <strong className="text-fg">What this does not show.</strong> Our PubMed searches (12 November 2026) found no trial of
          TB-500 in people, for any condition. One rat study at one time point cannot tell you whether it helps a human tendon,
          what dose would matter or what it does over months. A 2026 case report describes three patients with a jaw-nerve
          injury treated with several agents at once, TB-500 among them (
          <a href="https://doi.org/10.3389/froh.2026.1907109" className="link">
            Froum 2026
          </a>
          ); with no control group and several treatments, its authors say it cannot establish cause, and we have not added it to
          our registry. See the{" "}
          <Link href="/science/topics/joints" className="link">
            joints and tendons evidence
          </Link>{" "}
          and our{" "}
          <Link href="/peptides/peptides-for-joint-pain" className="link">
            ranking of peptides for joint pain
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">The thymosin beta-4 trials, and why they do not apply</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The full 43-amino-acid protein has been tested in people. These are real trials, but of a different substance, given
          in different ways:
        </p>
        <ul className="mt-4 max-w-prose list-disc space-y-3 pl-6 text-soft">
          <li>
            <strong className="text-fg">Into a vein, healthy volunteers (2010).</strong> 40 people given doses up to 1,260 mg
            daily for 14 days had{" "}
            <PaperLink id="ruff-2010" via="doi">
              infrequent, mild or moderate side effects and no serious events
            </PaperLink>
            . A safety study, not a test of benefit.
          </li>
          <li>
            <strong className="text-fg">Leg ulcers (2010).</strong> In 73 patients, the protein applied to venous ulcers was{" "}
            <PaperLink id="guarnera-2010" via="doi">
              about as safe as placebo
            </PaperLink>
            ; the authors say one dose may speed healing, but the abstract gives no comparison with placebo.
          </li>
          <li>
            <strong className="text-fg">Eye drops (2015 and 2022).</strong> In 9 patients with severe dry eye, treated eyes had{" "}
            <PaperLink id="sosne-2015" via="doi">
              less discomfort and corneal staining
            </PaperLink>{" "}
            than vehicle. In 18 patients with a non-healing cornea, full healing at 4 weeks was 6 of 10 against 1 of 8 on placebo,{" "}
            <PaperLink id="sosne-2022" via="pmc">
              not a statistically significant difference
            </PaperLink>
            , in a trial partly designed by the company developing the drops. A Cochrane review rated that evidence{" "}
            <PaperLink id="kruoch-2025" via="pmc">
              low certainty
            </PaperLink>
            .
          </li>
          <li>
            <strong className="text-fg">Hair, in animals.</strong> The full protein{" "}
            <PaperLink id="philp-2004" via="doi">
              speeded hair growth in rats and mice
            </PaperLink>
            ; we found no human hair trial.
          </li>
        </ul>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          None of these tested TB-500, none tested an injection under the skin, and none tested tendons or muscle. The 2026 orthopaedic review says the human experience with thymosin beta-4 in eye, skin and heart uses{" "}
          <PaperLink id="tham-2026" via="doi">
            cannot establish musculoskeletal effects
          </PaperLink>
          . See the{" "}
          <Link href="/science/topics/eye" className="link">
            eye evidence
          </Link>{" "}
          and the{" "}
          <Link href="/science/topics/skin" className="link">
            skin evidence
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Safety and product quality</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          We found no human safety study of TB-500. The intravenous safety trial above used the full protein for two weeks, so it
          does not cover products sold as TB-500 or months of use. A laboratory that bought products online found that
          those sold as{" "}
          <PaperLink id="delcourt-2023" via="doi">
            TB500 and TB1000 did not consistently contain what they were described as
          </PaperLink>
          . A 2026 review for clinicians lists possible risks of unapproved injectable peptides including TB-500, among them
          contamination, impurities, inaccurate dosing and abnormal blood-vessel growth; several are possibilities rather than
          harms measured in people (
          <PaperLink id="moiz-2026" via="pmc">
            Moiz 2026
          </PaperLink>
          ). If you are shown a test report, our guide to{" "}
          <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
            reading a peptide COA
          </Link>{" "}
          explains what to look for.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Legal status and sport</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          TB-500 is not FDA-approved. FDA&rsquo;s compounding page (current as of 22 April 2026 when we read it) lists{" "}
          <a
            href="https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks"
            className="link"
          >
            &ldquo;Thymosin beta-4, fragment (LKKTETQ)&rdquo;, also known as TB-500
          </a>
          , among substances whose nominations were withdrawn. FDA&rsquo;s Pharmacy Compounding Advisory Committee voted in July
          2026 to recommend it for the 503A bulks list for wound healing; the vote is not binding, and we found no final FDA
          decision. The dated timeline, including the HHS draft policy of 30 October 2026, is on the{" "}
          <Link href="/peptides/legal-status" className="link">
            legal status page
          </Link>
          . In sport, anti-doping laboratories describe it as suspected of doping use and have built tests for it (
          <PaperLink id="esposito-2012" via="doi">
            Esposito 2012
          </PaperLink>
          ;{" "}
          <PaperLink id="ho-2012" via="doi">
            Ho 2012
          </PaperLink>
          ). We could not open the World Anti-Doping Agency&rsquo;s prohibited list to confirm its current wording.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Studies behind this page</h2>
        <h3 className="mt-6 text-xl font-bold">Studies of TB-500 ({tb500.length})</h3>
        <div className="mt-4 grid gap-5">
          {tb500.map((s) => (
            <StudyCard key={s.id} study={s} />
          ))}
        </div>
        <h3 className="mt-10 text-xl font-bold">Studies of the full thymosin beta-4 protein ({tb4.length})</h3>
        <p className="mt-2 max-w-prose text-sm text-muted">
          Included for context. They tested a different substance and do not show what TB-500 does.
        </p>
        <div className="mt-4 grid gap-5">
          {tb4.map((s) => (
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
        <p className="mt-6 max-w-prose text-soft">
          Often compared with BPC-157: see{" "}
          <Link href="/peptides/bpc-157" className="link">
            BPC-157: what the studies show
          </Link>
          .
        </p>
      </section>

      <PeptideInGuides peptide="tb-500" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
