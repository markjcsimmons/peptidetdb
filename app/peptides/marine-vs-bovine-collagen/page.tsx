import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout } from "@/components/ui";
import { StudyCard } from "@/components/study-parts";
import { STUDIES } from "@/lib/studies";
import { PageContents } from "@/components/page-contents";
import { PageKindLabel } from "@/components/guide-links";

export const metadata: Metadata = {
  title: "Marine vs bovine collagen: what studies show",
  description:
    "Is marine collagen better than bovine? We found no head-to-head human trial. What the evidence does show for fish-derived collagen peptides, how the source affected results in one meta-analysis, and the allergy difference.",
  alternates: { canonical: "/peptides/marine-vs-bovine-collagen" },
};

const REVIEWED = "2026-11-10";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Is marine collagen better than bovine collagen?",
    a: "We found no randomised trial that compared them head to head, so we cannot say. A 2023 meta-analysis found that the size of the skin hydration effect varied with the source of collagen, but its abstract does not say which source did better.",
  },
  {
    q: "Is marine collagen better absorbed?",
    a: "We found no human study that compared absorption of marine and bovine collagen peptides in our searches, so we treat the claim as unverified.",
  },
  {
    q: "Is marine collagen safe for people with fish allergy?",
    a: "Not necessarily. Fish collagen is a recognised fish allergen, and there is a case report of anaphylaxis in a child with fish allergy after fish-collagen gummy tablets. Talk to a clinician first.",
  },
];

export default function MarineVsBovinePage() {
  const marineStudies = STUDIES.filter(
    (s) => s.peptides.includes("marine-collagen") && s.delivery.includes("oral") && s.kind === "human-controlled",
  ).sort((a, b) => b.year - a.year);

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
            { "@type": "ListItem", position: 3, name: "Marine vs bovine collagen", item: absoluteUrl("/peptides/marine-vs-bovine-collagen") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Marine vs bovine collagen
      </nav>
      <PageKindLabel path="/peptides/marine-vs-bovine-collagen" />
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">Marine vs bovine collagen: what the studies show</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          We found no human trial that compares marine and bovine collagen peptides head to head, so no one can say from
          the studies which is better. Fish-derived collagen peptides have been tested against placebo in several trials
          (below). One meta-analysis found the skin hydration effect varied by collagen source, but its abstract does not
          say which source did better. One real difference is allergy: fish collagen is a recognised allergen for people
          with fish allergy.
        </p>
      </Callout>

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What we looked for</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          We searched PubMed for randomised trials comparing fish or marine collagen with bovine or porcine collagen. The
          title search returned five papers, all laboratory or materials studies (bioinks, membranes, thermal
          properties), and a broader trial search turned up no head-to-head comparison of supplements. That is a result
          of our searches, not proof that none exists.
        </p>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The closest evidence is a 2023 meta-analysis of 26 trials of hydrolysed collagen for skin. It found that the
          hydration effect{" "}
          <PaperLink id="pu-2023" via="pmc">
            varied with the source of the collagen
          </PaperLink>
          , while the elasticity effect did not differ by source. The abstract does not say which source did better, and
          it found biases in the included trials, so it is not a verdict on marine versus bovine.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Claims we could not check</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">&ldquo;Marine collagen is absorbed better.&rdquo;</strong> No human absorption
            comparison turned up in our searches.
          </li>
          <li>
            <strong className="text-fg">&ldquo;Marine collagen is better for skin.&rdquo;</strong> The fish-derived
            trials below beat placebo, but nothing tests them against bovine.
          </li>
          <li>
            <strong className="text-fg">&ldquo;Bovine collagen is better for joints.&rdquo;</strong> The joint
            meta-analysis (
            <PaperLink id="garcia-coronado-2019" via="doi">
              García-Coronado 2019
            </PaperLink>
            ) does not say which sources were tested in its abstract.
          </li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Randomised trials of oral marine collagen</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          These are the placebo-controlled human trials of fish-derived collagen peptides we have summarised. Several are
          small, so check each study&rsquo;s sample size and funding statement. Open each for what it cannot show, and see{" "}
          <Link href="/peptides/oral-marine-peptides" className="link">
            Do oral marine peptides work?
          </Link>{" "}
          for the full picture.
        </p>
        <div className="mt-6 grid gap-5">
          {marineStudies.map((s) => (
            <StudyCard key={s.id} study={s} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">The allergy difference</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Fish collagen is a known fish allergen. A case report describes{" "}
          <PaperLink id="ueno-2020" via="pmc">
            anaphylaxis in a 9-year-old with fish allergy after fish-collagen gummy tablets
          </PaperLink>
          , and laboratory work found that{" "}
          <PaperLink id="kobayashi-2016" via="doi">
            heating did not remove the reactivity
          </PaperLink>
          . If you have a fish allergy, ask a clinician before using any marine-sourced collagen. See{" "}
          <Link href="/peptides/collagen-peptides-side-effects" className="link">
            collagen peptide side effects
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
