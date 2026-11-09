import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "What are peptides? Types, evidence and safety",
  description:
    "Peptides are short chains of amino acids. The word covers prescription drugs, collagen supplements, skin-care ingredients and unapproved compounds. What the studies show for each.",
  alternates: { canonical: "/peptides" },
};

const FAQ: { q: string; a: React.ReactNode; text: string }[] = [
  {
    q: "Are peptides steroids?",
    text: "No. Peptides are chains of amino acids; anabolic steroids are a different chemical class of hormones. People mix them up because both come up in sport, and some peptides, BPC-157 for example, are banned in professional sport.",
    a: (
      <>
        No. Peptides are chains of amino acids; anabolic steroids are a different chemical class of hormones. People
        mix them up because both come up in sport, and some peptides, BPC-157 for example, are banned in professional
        sport (<PaperLink id="vasireddi-2025" via="pmc">noted in a 2025 systematic review</PaperLink>).
      </>
    ),
  },
  {
    q: "Are peptides the same as Ozempic?",
    text: "Ozempic (semaglutide) is a peptide drug: a prescription GLP-1 medicine. Most peptides sold as supplements or research compounds are different substances, and evidence for GLP-1 drugs does not transfer to them.",
    a: (
      <>
        Ozempic (semaglutide) is a peptide drug: a prescription GLP-1 medicine. Most peptides sold as supplements or
        research compounds are different substances, and evidence for GLP-1 drugs does not transfer to them.
      </>
    ),
  },
  {
    q: "Are peptides legal?",
    text: "It depends on the peptide and on how it is made and sold. Some are FDA-approved prescription drugs; many popular wellness peptides are not approved for any use, and their compounding status has been changing in 2026. See the dated legal status page.",
    a: (
      <>
        It depends on the peptide and on how it is made and sold. Some are FDA-approved prescription drugs; many
        popular wellness peptides are not approved for any use, and their compounding status has been changing in
        2026. See the{" "}
        <Link href="/peptides/legal-status" className="link">
          dated legal status page
        </Link>
        .
      </>
    ),
  },
  {
    q: "Are peptides safe?",
    text: "It depends on the peptide, the route and how it was made. Reviews of unapproved peptides say rigorous human safety data are scarce and serious harm is possible; collagen supplements are a different case.",
    a: (
      <>
        It depends on the peptide, the route and how it was made. A 2026 review of approved and unapproved peptides
        concludes that for many unapproved ones{" "}
        <PaperLink id="mendias-2026" via="doi">
          rigorous human safety data are scarce and serious harm is possible
        </PaperLink>
        . Collagen supplements are a different case; see{" "}
        <Link href="/science/topics/safety" className="link">
          the safety evidence
        </Link>
        .
      </>
    ),
  },
];

export default function PeptidesPillarPage() {
  return (
    <article className="max-w-3xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.text },
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
          ],
        }}
      />

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">What are peptides?</h1>

      <section className="mt-6 rounded-xl border-l-4 border-accent bg-card p-5">
        <h2 className="sr-only">Short answer</h2>
        <p className="max-w-prose text-lg">
          Peptides are short chains of amino acids, the same building blocks that make up proteins. The word covers
          very different things: prescription drugs such as insulin and GLP-1 medicines, collagen supplements,
          skin-care ingredients, and unapproved compounds sold for injury recovery. What the evidence shows depends
          on which one you mean.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">What a peptide is</h2>
        <p className="mt-3 max-w-prose">
          Amino acids link together in chains. Long, folded chains are proteins; short ones are peptides. There is
          no sharp dividing line, and the cut-off varies by source. At the small end, GHK, studied for skin repair,
          is a chain of three amino acids (<PaperLink id="pickart-2015" via="pmc">review</PaperLink>). BPC-157, a
          compound much discussed for injury recovery, is a 15-amino-acid chain, which is why reviews call it a{" "}
          <PaperLink id="mcguire-2025" via="pmc">pentadecapeptide</PaperLink>.
        </p>
        <p className="mt-3 max-w-prose">
          Some peptides act as signals between cells, which is why researchers study them. That is a reason to study
          a peptide, not evidence that a particular product works in people. See our{" "}
          <Link href="/glossary" className="link">
            glossary
          </Link>{" "}
          for the terms used here.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Four things people mean by &ldquo;peptides&rdquo;</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-card p-5">
            <h3 className="font-semibold">Approved prescription drugs</h3>
            <p className="mt-2 text-sm text-muted">
              Insulin and the GLP-1 medicines are peptide drugs that went through approval. A 2026 review notes that
              numerous peptide drugs have undergone a rigorous approval process, alongside a parallel &ldquo;gray
              market&rdquo; of unapproved compounds (<PaperLink id="mendias-2026" via="doi">Mendias &amp; Awan</PaperLink>).
            </p>
          </div>
          <div className="rounded-xl border border-line bg-card p-5">
            <h3 className="font-semibold">Collagen and other oral supplements</h3>
            <p className="mt-2 text-sm text-muted">
              Collagen peptides are fragments of collagen sold as powders and capsules. This is the best-studied
              group in humans. See the evidence for{" "}
              <Link href="/science/topics/skin" className="link">
                skin
              </Link>
              ,{" "}
              <Link href="/science/topics/muscle" className="link">
                muscle
              </Link>{" "}
              and{" "}
              <Link href="/science/topics/joints" className="link">
                joints
              </Link>
              . For fish-derived peptides specifically, see{" "}
              <Link href="/peptides/oral-marine-peptides" className="link">
                Do oral marine peptides work?
              </Link>
            </p>
          </div>
          <div className="rounded-xl border border-line bg-card p-5">
            <h3 className="font-semibold">Skin-care peptides</h3>
            <p className="mt-2 text-sm text-muted">
              Peptides such as GHK-copper are applied to the skin. The hub holds a review of GHK but no controlled
              trial of a product yet. See{" "}
              <Link href="/science/topics/skin" className="link">
                the skin evidence
              </Link>
              .
            </p>
          </div>
          <div className="rounded-xl border border-line bg-card p-5">
            <h3 className="font-semibold">Unapproved &ldquo;wellness&rdquo; and research peptides</h3>
            <p className="mt-2 text-sm text-muted">
              Compounds such as BPC-157 are not FDA-approved for any use (
              <PaperLink id="vasireddi-2025" via="pmc">systematic review</PaperLink>), and their pharmacy-compounding
              status changed through 2026. See the{" "}
              <Link href="/peptides/legal-status" className="link">
                legal status page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">How you take it matters</h2>
        <p className="mt-3 max-w-prose">
          The same peptide behaves differently depending on whether it is swallowed, injected or applied to the
          skin, and each route carries different risks and different rules. Peptides taken by mouth meet digestion,
          so whether a given oral peptide has any effect is a question for trials, such as the collagen trials
          summarised on this site, not an assumption. Injected products skip digestion but carry the risks of
          injection and of how the product was made.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">What the studies show so far</h2>
        <ul className="mt-4 space-y-3">
          <li className="max-w-prose">
            <strong>Skin.</strong> Two meta-analyses of randomised trials (
            <PaperLink id="de-miranda-2021" via="doi">19 trials</PaperLink> and{" "}
            <PaperLink id="pu-2023" via="pmc">26 trials</PaperLink>) found better skin hydration and elasticity from
            oral collagen peptides than placebo. The later one found biases in the included trials.
          </li>
          <li className="max-w-prose">
            <strong>Muscle.</strong> One randomised trial in older men with sarcopenia found larger strength and
            muscle gains with collagen peptides on top of resistance training (
            <PaperLink id="zdzieblik-2015" via="pmc">Zdzieblik 2015</PaperLink>).
          </li>
          <li className="max-w-prose">
            <strong>Joints.</strong> A meta-analysis found lower osteoarthritis scores overall, but not on the pain
            and function subscores (<PaperLink id="garcia-coronado-2019" via="doi">García-Coronado 2019</PaperLink>).
          </li>
          <li className="max-w-prose">
            <strong>BPC-157 and other injectable peptides.</strong> Mostly animal evidence. A systematic review found
            35 preclinical studies and one clinical report (<PaperLink id="vasireddi-2025" via="pmc">Vasireddi 2025</PaperLink>),
            and a 2026 scoping review concluded the claimed benefits{" "}
            <PaperLink id="tewari-2026" via="doi">remain unsubstantiated by human trials</PaperLink>.
          </li>
        </ul>
        <p className="mt-4">
          <Link href="/science" className="link">
            Browse all studies
          </Link>
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="mt-4 space-y-6">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-1 max-w-prose text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-10 text-sm text-muted">
        {SITE.disclosure} {SITE.disclaimer} Last reviewed {formatDate(SITE.lastReviewed)}.
      </p>
    </article>
  );
}
