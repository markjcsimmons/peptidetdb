import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout } from "@/components/ui";
import { DisclosureNote } from "@/components/disclosure-note";

export const metadata: Metadata = {
  title: "Collagen peptide side effects: what is known",
  description:
    "What studies say about the safety of oral collagen peptides: generally well tolerated in trials, a documented risk for people with fish allergy, and what has not been studied.",
  alternates: { canonical: "/peptides/collagen-peptides-side-effects" },
};

const REVIEWED = "2026-11-10";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Are collagen peptides safe?",
    a: "In randomised trials, oral hydrolysed collagen was generally well tolerated with a low rate of adverse events, according to a 2026 systematic review. Those trials were mostly designed to measure benefit, not long-term safety, and most were rated at high risk of bias.",
  },
  {
    q: "Can collagen peptides cause an allergic reaction?",
    a: "Yes, for some people with fish allergy. Fish collagen is a recognised fish allergen, and a case report describes anaphylaxis in a child with fish allergy after fish-collagen gummy tablets. A laboratory study found that heating fish collagen does not remove its reactivity with allergic patients' antibodies.",
  },
  {
    q: "What are the side effects of collagen peptides?",
    a: "The review of 25 trials summarised here reports only that adverse events were rare. We have not found a trial that tracked specific side effects as its main outcome, so we do not list individual ones.",
  },
  {
    q: "Are collagen supplements tested for contaminants?",
    a: "A label does not tell you, and we found no study of contaminants in collagen products. A certificate of analysis from a third-party lab is how to check; see our guide to reading one.",
  },
];

export default function CollagenSideEffectsPage() {
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
            { "@type": "ListItem", position: 3, name: "Collagen peptide side effects", item: absoluteUrl("/peptides/collagen-peptides-side-effects") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Collagen peptide side effects
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">Collagen peptide side effects: what is known</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <DisclosureNote>
        This page covers a product category that includes products Pürblack sells, so read it with that in mind; the
        studies are linked so you can check them yourself.
      </DisclosureNote>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          In randomised trials, oral collagen peptides were generally well tolerated, with few adverse events reported.
          The main documented risk is allergy: fish collagen can trigger reactions, including anaphylaxis, in people with
          fish allergy. The evidence for safety is thinner than it sounds, because the trials were built to measure
          benefit, and most are rated at high risk of bias.
        </p>
      </Callout>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What the trials report</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          A 2026 systematic review of 25 randomised trials of oral hydrolysed collagen, mostly in healthy volunteers,
          found it{" "}
          <PaperLink id="bassila-2026" via="doi">
            generally well tolerated, with a low incidence of adverse events
          </PaperLink>
          . That is a summary of what efficacy trials happened to record. The authors rate most of the included trials at
          high risk of bias and ask for longer, larger, standardised trials to confirm safety.
        </p>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          We have not summarised a trial whose main aim was to track side effects, or any long-term safety data, so this
          page does not list individual side effects. Not finding them here is not proof there are none.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Fish allergy</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          A case report describes a 9-year-old with fish allergy who had anaphylaxis after eating two gummy tablets, and a
          supervised challenge test showed the{" "}
          <PaperLink id="ueno-2020" via="pmc">
            fish collagen in the tablets was the cause
          </PaperLink>
          . The authors point out that processed foods can contain fish collagen without the person realising. In a
          laboratory study, heating fish extracts broke down collagen but{" "}
          <PaperLink id="kobayashi-2016" via="doi">
            did not reduce the reactivity of allergic patients&rsquo; serum antibodies
          </PaperLink>
          , and cartilaginous fish extracts reacted less than bony fish.
        </p>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          What this means: if you have a fish allergy, check whether a collagen product is marine-sourced and ask a
          clinician first. What it does not show: how often it happens, or any risk for people without fish allergy. Both
          papers concern fish collagen, and we have not summarised evidence on other sources.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What is not covered</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>Contaminants such as heavy metals. We found no study of them in collagen products, which is why checking a lab report matters (see below).</li>
          <li>Interactions with medicines, pregnancy and breastfeeding, and use in children or people with kidney or liver disease.</li>
          <li>Long-term use over years.</li>
        </ul>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Talk to a clinician before starting a supplement, especially with a medical condition or medicines. To check a
          specific product, see{" "}
          <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
            how to read a certificate of analysis
          </Link>
          . For benefits, see{" "}
          <Link href="/peptides/collagen-peptides-benefits" className="link">
            what the studies show
          </Link>
          . For the wider safety picture, including unapproved peptides, see the{" "}
          <Link href="/science/topics/safety" className="link">
            safety evidence
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
