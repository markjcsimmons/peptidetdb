import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout } from "@/components/ui";
import { TopicCard } from "@/components/topic-card";
import { STUDIES } from "@/lib/studies";
import { PageContents } from "@/components/page-contents";
import { PageKindLabel } from "@/components/guide-links";

export const metadata: Metadata = {
  title: "Collagen peptides: what the evidence shows",
  description:
    "What collagen peptides are, what randomised trials show for skin, muscle and joints, how safe they are, and how to check a product. Every claim links to the study.",
  alternates: { canonical: "/peptides/collagen-peptides" },
};

const REVIEWED = "2026-11-10";

const FAQ: { q: string; a: string }[] = [
  {
    q: "What are collagen peptides?",
    a: "Collagen peptides are short fragments made by breaking collagen, the main structural protein in skin, bone and connective tissue, into smaller pieces. They are sold as powders, capsules and drinks. The trials call them collagen peptides or hydrolysed collagen.",
  },
  {
    q: "Do collagen peptides work?",
    a: "For skin, meta-analyses of randomised trials found better hydration and elasticity than placebo, though the trials have biases. For muscle, a 2024 meta-analysis found a larger gain in fat-free mass when collagen was combined with resistance training. For joints the results are mixed. The size of any benefit is uncertain.",
  },
  {
    q: "How much collagen peptide should I take?",
    a: "We do not recommend a dose. The three placebo-controlled muscle trials we summarise used 15 g a day with resistance training for 12 weeks. For skin, the abstracts we summarise give no consistent dose.",
  },
  {
    q: "Are collagen peptides safe?",
    a: "A 2026 systematic review of 25 randomised trials reports they were generally well tolerated with few adverse events, but the trials were built to measure benefit and most were rated at high risk of bias. People with fish allergy should be careful with fish-derived collagen.",
  },
  {
    q: "Is it the same as taking whey or other protein?",
    a: "Not exactly. In one small trial whey protein increased muscle thickness more than leucine-matched collagen peptides. We found no trial that shows collagen is as good as whey for building muscle.",
  },
];

export default function CollagenPeptidesPage() {
  const collagenStudies = STUDIES.filter((s) => s.peptides.includes("collagen") || s.peptides.includes("marine-collagen"));
  const nHumanTrials = collagenStudies.filter((s) => s.kind === "human-controlled").length;
  const nReviews = collagenStudies.filter((s) => s.kind === "meta-analysis" || s.kind === "systematic-review").length;

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
            { "@type": "ListItem", position: 3, name: "Collagen peptides", item: absoluteUrl("/peptides/collagen-peptides") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Collagen peptides
      </nav>
      <PageKindLabel path="/peptides/collagen-peptides" />
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">Collagen peptides: what the evidence shows</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          Collagen peptides are collagen broken into short fragments. They are among the best-studied peptide supplements. The
          human evidence is strongest for skin hydration and elasticity, weaker for muscle (they add to the effect of
          resistance training) and mixed for joints. The trials have biases, so how large any benefit is remains
          uncertain. They were generally well tolerated in trials, with fish allergy the documented risk. Nothing here
          shows they work for hair, nails or gut health, because we have not summarised those.
        </p>
      </Callout>

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What collagen peptides are</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Collagen is the main structural protein in skin, bone and connective tissue. Collagen peptides, also called
          hydrolysed collagen, are collagen that has been broken into much smaller pieces. They are sold as powders,
          capsules and drinks, made from animal sources such as cattle (bovine) and fish (marine).
          The word &ldquo;peptide&rdquo; here means a short chain of amino acids, the same word used for prescription
          drugs and unapproved injectables, which have very different evidence; see{" "}
          <Link href="/peptides/how-peptides-work" className="link">
            how peptides work
          </Link>
          .
        </p>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          We have summarised {collagenStudies.length} studies of collagen peptides: {nReviews} meta-analyses or
          systematic reviews and {nHumanTrials} controlled trials in people. The rest are smaller or non-trial studies, including a case report and a laboratory study.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What the studies show, use by use</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <TopicCard slug="skin" compact />
          <TopicCard slug="muscle" compact />
          <TopicCard slug="joints" compact />
        </div>

        <h3 className="mt-8 text-xl font-bold">Skin</h3>
        <p className="mt-2 max-w-prose text-soft [text-wrap:pretty]">
          Two meta-analyses favoured collagen over placebo:{" "}
          <PaperLink id="de-miranda-2021" via="doi">
            19 trials with 1,125 people
          </PaperLink>{" "}
          and{" "}
          <PaperLink id="pu-2023" via="pmc">
            26 trials with 1,721 people
          </PaperLink>
          . The later one found biases in the trials. A 2026 review rated most of its 25 trials at{" "}
          <PaperLink id="bassila-2026" via="doi">
            high risk of bias
          </PaperLink>
          . Details are in{" "}
          <Link href="/peptides/collagen-peptides-benefits" className="link">
            collagen peptide benefits
          </Link>
          .
        </p>

        <h3 className="mt-8 text-xl font-bold">Muscle</h3>
        <p className="mt-2 max-w-prose text-soft [text-wrap:pretty]">
          A 2024 meta-analysis of{" "}
          <PaperLink id="bischof-2024" via="pmc">
            19 trials with 768 healthy adults
          </PaperLink>{" "}
          found a larger gain in fat-free mass with collagen than control (moderate certainty) and a small strength
          effect. Participants were also training, so collagen is an add-on to exercise. In one small trial, whey
          increased{" "}
          <PaperLink id="jacinto-2022" via="doi">
            muscle thickness more than collagen
          </PaperLink>
          . See{" "}
          <Link href="/peptides/peptides-for-muscle-growth" className="link">
            peptides for muscle growth
          </Link>
          .
        </p>

        <h3 className="mt-8 text-xl font-bold">Joints</h3>
        <p className="mt-2 max-w-prose text-soft [text-wrap:pretty]">
          A meta-analysis in osteoarthritis found an improvement in overall scores but not in the pain and function
          subscores (
          <PaperLink id="garcia-coronado-2019" via="doi">
            García-Coronado 2019
          </PaperLink>
          ). A systematic review of collagen with exercise found the{" "}
          <PaperLink id="khatri-2021" via="pmc">
            clearest benefit for joint function and pain
          </PaperLink>
          . We rate the evidence mixed.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Marine, bovine and other sources</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Several placebo-controlled trials used fish-derived collagen, but we found no trial that compares marine and
          bovine collagen head to head, so no one can say from the studies which is better. Read{" "}
          <Link href="/peptides/marine-vs-bovine-collagen" className="link">
            marine vs bovine collagen
          </Link>{" "}
          and{" "}
          <Link href="/peptides/oral-marine-peptides" className="link">
            do oral marine peptides work?
          </Link>
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Safety</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          A 2026 systematic review of 25 randomised trials reports collagen peptides{" "}
          <PaperLink id="bassila-2026" via="doi">
            generally well tolerated, with few adverse events
          </PaperLink>
          . That is thinner evidence than it sounds, because the trials were built to measure benefit. The documented
          risk is allergy: a case report describes{" "}
          <PaperLink id="ueno-2020" via="pmc">
            anaphylaxis in a child with fish allergy
          </PaperLink>{" "}
          after fish-collagen gummy tablets. See{" "}
          <Link href="/peptides/collagen-peptides-side-effects" className="link">
            collagen peptide side effects
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Checking a product</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          We found no published study of contaminants in collagen supplements, so a batch-level lab report is the only
          way to check one. Look for a lot number that matches your container, a named lab, and results with numbers
          rather than &ldquo;pass&rdquo;. Our guide,{" "}
          <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
            how to read a peptide COA
          </Link>
          , goes line by line, and we checked which collagen brands publish batch reports in{" "}
          <Link href="/peptides/best-collagen-peptides" className="link">
            collagen peptides with published batch test results
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What we have not covered</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>Hair, nails, gut health, bone density and sleep. That is a gap in our coverage, not a finding.</li>
          <li>Differences between collagen types and between brands.</li>
          <li>A recommended dose. The studies used different products and amounts, and we do not recommend one.</li>
        </ul>
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
