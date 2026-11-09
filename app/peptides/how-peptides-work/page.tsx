import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How do peptides work?",
  description:
    "Some peptides act as signals between cells, some are digested like any protein, and a mechanism in the lab is not proof a product works in people. What the studies say.",
  alternates: { canonical: "/peptides/how-peptides-work" },
};

export default function HowPeptidesWorkPage() {
  return (
    <article className="max-w-3xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: SITE.name, item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "What are peptides?", item: absoluteUrl("/peptides") },
            { "@type": "ListItem", position: 3, name: "How do peptides work?", item: absoluteUrl("/peptides/how-peptides-work") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / How they work
      </nav>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">How do peptides work?</h1>

      <section className="mt-6 rounded-xl border-l-4 border-accent bg-card p-5">
        <h2 className="sr-only">Short answer</h2>
        <p className="max-w-prose text-lg">
          It depends on the peptide and on how it gets into the body. Some peptides act as signals: they attach to a
          receptor on a cell and change what the cell does. Peptides you swallow are mostly handled by digestion, like
          other protein. And for many peptides sold to consumers, the way they are said to work comes from lab and
          animal research, which is not proof they work in people.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">1. Some peptides are signals</h2>
        <p className="mt-3 max-w-prose">
          Cells talk to each other with chemical messengers, and some of those messengers are short chains of amino
          acids. The usual picture is a lock and key: the peptide fits a receptor on or in a target cell, and that
          starts a change in the cell. This is general biology rather than a finding of any one study on this site, but
          it is why researchers pay attention to peptides, and it is how the approved peptide drugs, insulin and the
          GLP-1 medicines among them, are designed to act.
        </p>
        <p className="mt-3 max-w-prose">
          The same idea underlies claims about consumer peptides, with a big difference in how well it is tested. Two
          examples from the studies here:
        </p>
        <ul className="mt-3 max-w-prose list-disc space-y-3 pl-5">
          <li>
            <strong>GHK, a three-amino-acid peptide.</strong> A review describes it as a natural modulator of many
            pathways in skin repair, mainly from animal and cell work, and reports it can raise or lower the activity of
            thousands of genes (<PaperLink id="pickart-2015" via="pmc">Pickart 2015</PaperLink>). Changing gene
            activity in a dish is a mechanism hint, not a clinical result.
          </li>
          <li>
            <strong>Valyl-tyrosine, a two-amino-acid peptide from sardine.</strong> This is the rare case where the
            proposed mechanism was checked in people. In a small randomised trial, blood pressure fell on the peptide
            and not on placebo, and blood markers fitted blockade of ACE, an enzyme that helps tighten blood vessels (
            <PaperLink id="kawasaki-2000" via="doi">Kawasaki 2000</PaperLink>). It was 29 people over four weeks, and
            nothing else here replicates it.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">2. Swallowed peptides meet digestion</h2>
        <p className="mt-3 max-w-prose">
          Food protein is broken into smaller pieces and amino acids by digestion, and a peptide in a powder or
          capsule enters the same system. So for oral products there are two separate questions: does anything active
          get through, and does it do anything if it does. Neither is settled by the label.
        </p>
        <p className="mt-3 max-w-prose">
          A small crossover study shows how easily the first question gets blurred. After exercise, fish protein
          hydrolysate raised blood amino acids about as much as whey hydrolysate did, which shows it is{" "}
          <strong>digested quickly</strong>. It says nothing about effects from specific bioactive peptides (
          <PaperLink id="cordeiro-2020" via="doi">Cordeiro 2020</PaperLink>; nine people). For what the oral trials found
          on outcomes, see{" "}
          <Link href="/peptides/oral-marine-peptides" className="link">
            Do oral marine peptides work?
          </Link>{" "}
          and the evidence for{" "}
          <Link href="/science/topics/skin" className="link">
            skin
          </Link>
          .
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">3. Injecting skips digestion, not risk</h2>
        <p className="mt-3 max-w-prose">
          Injected peptides avoid the gut, which is one reason people use them. They also bring injection risks and
          depend on how the product was made. A 2026 review of approved and unapproved peptides found that many
          unapproved ones look favourable in animals, while{" "}
          <PaperLink id="mendias-2026" via="doi">
            rigorous human safety data are scarce and serious harm is possible
          </PaperLink>
          . Reviews of BPC-157 describe a compound with a lot of animal work behind it and very little in people (
          <PaperLink id="vasireddi-2025" via="pmc">Vasireddi 2025</PaperLink>: 35 preclinical studies and one clinical
          report).
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">4. A mechanism is not the proof</h2>
        <p className="mt-3 max-w-prose">
          &ldquo;It blocks an enzyme&rdquo; or &ldquo;it switches on repair genes&rdquo; sounds like an explanation. It
          is a reason to run a trial. Many things that work in cells or animals do nothing in people, and the people
          who sell a product can quote a mechanism without ever testing it in humans. A 2026 scoping review found that
          67% of the publications it searched on six popular injectable peptides used animal models, and concluded the
          claimed benefits{" "}
          <PaperLink id="tewari-2026" via="doi">
            remain unsubstantiated by human trials
          </PaperLink>
          .
        </p>
        <p className="mt-3 max-w-prose">
          When you read a claim about how a peptide works, ask: was this shown in people, in animals, or in cells? Did
          the study measure a real outcome, or only a marker? Was there a comparison group? We answer those questions
          for each study on the{" "}
          <Link href="/science" className="link">
            studies hub
          </Link>
          , and explain how in the{" "}
          <Link href="/science/methodology" className="link">
            methodology
          </Link>
          .
        </p>
      </section>

      <section className="mt-10 rounded-xl border border-line bg-card p-5">
        <h2 className="font-semibold">Keep going</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>
            <Link href="/peptides" className="link">
              What are peptides? Types, evidence and safety
            </Link>
          </li>
          <li>
            <Link href="/peptides/legal-status" className="link">
              Are peptides legal in the US?
            </Link>
          </li>
          <li>
            <Link href="/glossary" className="link">
              Glossary
            </Link>
          </li>
        </ul>
      </section>

      <p className="mt-10 text-sm text-muted">
        {SITE.disclosure} {SITE.disclaimer} Last reviewed {formatDate(SITE.lastReviewed)}.
      </p>
    </article>
  );
}
