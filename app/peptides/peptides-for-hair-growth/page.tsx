import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout } from "@/components/ui";
import { TOPICS, type Level } from "@/lib/topics";
import { RelatedGoals, PageKindLabel } from "@/components/guide-links";
import { RankedList, type Route } from "@/components/ranked-list";
import { PageContents } from "@/components/page-contents";

export const metadata: Metadata = {
  title: "Peptides for hair growth: ranked by the evidence",
  description:
    "Do peptides regrow hair? Topical peptide products, oral collagen, scalp injections, thymosin beta-4 and BPC-157, ranked by the strength of the human studies, with what each does not show.",
  alternates: { canonical: "/peptides/peptides-for-hair-growth" },
};

const REVIEWED = "2026-11-11";

type Option = {
  name: string;
  level: Level;
  /** How it is taken, only where the entry makes it plain. */
  routes?: Route[];
  /** Rating text on the hair topic page that this entry mirrors (checked at build time below). */
  topicSubject: string;
  shows: React.ReactNode;
  notShown: React.ReactNode;
};

const OPTIONS: Option[] = [
  {
    name: "Topical peptide products (scalp lotions and serums)",
    level: "limited",
    routes: ["topical"],
    topicSubject: "Topical peptide products for hair loss (GPIGS, acetyl tetrapeptide-3 and similar)",
    shows: (
      <>
        In 22 Japanese men with male-pattern hair loss, a lotion with the penta-peptide Gly-Pro-Ile-Gly-Ser raised the
        proportion of thick hair over 4 months compared with a{" "}
        <PaperLink id="iwabuchi-2016" via="doi">
          placebo lotion
        </PaperLink>
        . A 30-person trial of a plant extract plus a peptide reported{" "}
        <PaperLink id="loing-2013" via="pubmed">
          more growing-phase hair than placebo
        </PaperLink>
        , and in 32 people a herbal-and-peptide mix gave{" "}
        <PaperLink id="lueangarun-2020" via="pmc">
          about the same gain in terminal hair count as 3% minoxidil
        </PaperLink>
        . A 2026 systematic review of 14 trials{" "}
        <PaperLink id="joerg-2026" via="doi">
          graded the recommendation B
        </PaperLink>{" "}
        for formulations with acetyl tetrapeptide-3, biotinoyl tripeptide-1, GHK and the penta-peptide.
      </>
    ),
    notShown: (
      <>
        The trials are small and short, and the abstracts give no peptide concentrations, so a shop product cannot be matched
        to a trial. Two of the three combine the peptide with plant extracts, so the peptide&rsquo;s own effect is unknown.
        The minoxidil comparison had no placebo group and is too small to show the two are equal. The review&rsquo;s abstract
        gives no sample sizes or effect sizes. In alopecia areata, a peptide cosmetic improved{" "}
        <PaperLink id="rinaldi-2019" via="doi">
          SALT scores from baseline
        </PaperLink>
        , but the abstract does not show it beat the comparison.
      </>
    ),
  },
  {
    name: "Oral collagen peptides",
    level: "limited",
    routes: ["oral"],
    topicSubject: "Oral collagen peptides for hair",
    shows: (
      <>
        In{" "}
        <PaperLink id="hwang-2026" via="doi">
          114 women over 24 weeks
        </PaperLink>
        , with thigh cellulite and self-reported hair thinning, taking fish-derived collagen peptides was followed by a
        significant rise in hair shaft diameter. A 24-week trial in people with
        damaged hair but no hair loss reported{" "}
        <PaperLink id="kim-2026" via="doi">
          better gloss and elasticity
        </PaperLink>
        , and an 83-person trial found a collagen-and-amino-acid tablet added to drug treatment{" "}
        <PaperLink id="milani-2023" via="pmc">
          beat drugs alone
        </PaperLink>
        .
      </>
    ),
    notShown: (
      <>
        Hair diameter in women with thinning concerns, and the gloss of damaged hair, are not the same as regrowth. The tablet
        trial had no placebo, mixed collagen with amino acids, iron and selenium, and was written by employees of its maker.
        No trial of collagen alone in hair loss is summarised here. More on the skin evidence for collagen:{" "}
        <Link href="/peptides/collagen-peptides-benefits" className="link">
          collagen peptide benefits
        </Link>
        .
      </>
    ),
  },
  {
    name: "Injected peptide formulations in the scalp",
    level: "limited",
    routes: ["injected"],
    topicSubject: "Injected peptide formulations in the scalp (QR678 and similar)",
    shows: (
      <>
        In 112 men having a hair transplant, adding QR678 Neo, injected before and after surgery and used to store the grafts,
        was followed by{" "}
        <PaperLink id="gold-2025" via="doi">
          better regrowth, density and shaft diameter
        </PaperLink>{" "}
        than a conventional transplant.
      </>
    ),
    notShown: (
      <>
        It tests an add-on to surgery, was single-blind, and the comparison group had no placebo injection. A 2026
        systematic review of injected treatments found multivitamin and peptide mixtures were the agents studied most, but
        says the evidence is{" "}
        <PaperLink id="beer-2026" via="doi">
          limited by small studies, varied methods and short follow-up
        </PaperLink>
        , and lists paradoxical alopecia, scarring and dermatitis among the side effects.
      </>
    ),
  },
  {
    name: "Thymosin beta-4 (not the same as TB-500)",
    level: "preclinical",
    topicSubject: "Thymosin beta-4 (TB-500 is a related, distinct fragment)",
    shows: (
      <>
        Thymosin beta-4 sped hair growth in{" "}
        <PaperLink id="philp-2004" via="doi">
          rats and mice
        </PaperLink>
        , and a review of animal work reports the same in mice and more cashmere in{" "}
        <PaperLink id="dai-2021" via="pmc">
          goats
        </PaperLink>
        .
      </>
    ),
    notShown: (
      <>
        We summarise no human hair trial of it. The animal papers study thymosin beta-4 itself. TB-500, the name used for
        products sold online, is described by a 2026 orthopaedic review as a distinct seven-amino-acid fragment that is not
        validated as equivalent, and we found no hair study of it, so these papers cannot be used to judge those products.
      </>
    ),
  },
  {
    name: "BPC-157",
    level: "none",
    topicSubject: "BPC-157",
    shows: <>Our PubMed search for BPC-157 together with hair-loss terms found no study.</>,
    notShown: (
      <>
        Absence from our search is not proof that nothing exists, and it is not evidence of harm. See{" "}
        <Link href="/peptides/bpc-157" className="link">
          BPC-157: what the studies show
        </Link>{" "}
        for what is known.
      </>
    ),
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Do peptides regrow hair?",
    a: "Some small trials of scalp products with cosmetic peptides report more thick hair or higher hair counts than placebo, and a 2026 systematic review graded the recommendation B for some formulations. The trials are small, short and often combine the peptide with other ingredients, so how much regrowth a peptide itself gives is not known.",
  },
  {
    q: "Are peptides better than minoxidil?",
    a: "No study we summarise shows that. One 32-person trial found a herbal-and-peptide mix and 3% minoxidil gave similar gains in hair count after 24 weeks, but it had no placebo group and is too small to show the two are equal.",
  },
  {
    q: "Does collagen help hair growth?",
    a: "Results are limited. One trial in 114 women reported a rise in hair shaft diameter after 24 weeks, and a trial in people with damaged hair reported better gloss and elasticity. We summarise no trial of collagen alone in hair loss.",
  },
  {
    q: "Do GLP-1 weight-loss drugs cause hair loss?",
    a: "A 2026 meta-analysis of 9 studies with 4,114 people found hair loss was reported more often with GLP-1 drugs than with placebo (risk ratio 3.25, 95% CI 1.44 to 7.36), and 3.9% of people given the drugs had hair loss. It shows an association, and the abstract does not say whether hair grew back.",
  },
  {
    q: "Is TB-500 or BPC-157 good for hair?",
    a: "There is no human trial. Thymosin beta-4 sped hair growth in rats and mice, but TB-500 is described as a distinct fragment that is not validated as equivalent, and our search found no hair study of TB-500 or BPC-157.",
  },
];

export default function PeptidesForHairGrowthPage() {
  const hair = TOPICS.hair;
  // The ratings on this page must match the topic page. A mismatch fails the build instead of publishing a contradiction.
  for (const o of OPTIONS) {
    const r = hair.ratings.find((x) => x.subject === o.topicSubject);
    if (!r || r.level !== o.level) {
      throw new Error(`peptides-for-hair-growth: "${o.name}" does not match its rating on the hair topic page`);
    }
  }

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
            { "@type": "ListItem", position: 3, name: "Peptides for hair growth", item: absoluteUrl("/peptides/peptides-for-hair-growth") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Peptides for hair growth
      </nav>
      <PageKindLabel path="/peptides/peptides-for-hair-growth" />
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">Peptides for hair growth, ranked by the evidence</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          No peptide has strong human evidence for hair growth. The best-supported are scalp lotions and serums with cosmetic
          peptides, which have a few small trials and a favourable 2026 systematic review, but most combine the peptide with
          other ingredients. Oral collagen and scalp injections each rest on a few trials. Thymosin beta-4 has only animal
          data, and we found no hair study of TB-500 or BPC-157.
        </p>
      </Callout>

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">How this ranking works</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The list is ordered by how strong the human evidence is, using the ratings on our{" "}
          <Link href="/science/topics/hair" className="link">
            hair evidence page
          </Link>
          . It does not measure how big a benefit is, how safe something is, or whether one option beats another, because the
          studies barely compare them. Options with the same rating are ordered by the number and size of controlled trials,
          which is our judgement, so read the ties as ties. It ranks types of peptide, not products. The trials cover several
          different problems: male-pattern hair loss, hair thinning in women, alopecia areata, chronic shedding and damaged
          hair, and a result in one does not carry over to another. Nobody paid for a place on this page, and there are no
          affiliate links.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">The ranking</h2>
        <RankedList options={OPTIONS} />
        <p className="mt-5 max-w-prose text-sm text-muted">
          Not ranked: copper peptide (GHK-Cu) on its own. We summarise no hair trial of it alone, although the 2026 review
          includes GHK-containing formulations. Biotin and other non-peptide supplements are outside this site&rsquo;s scope.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">A peptide drug linked to hair loss</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The reverse question matters to people using GLP-1 weight-loss drugs such as semaglutide and tirzepatide. A 2026
          meta-analysis of 9 interventional studies with 4,114 people found hair loss was{" "}
          <PaperLink id="cheng-2026" via="doi">
            reported more often with the drugs than with placebo
          </PaperLink>{" "}
          (risk ratio 3.25, 95% CI 1.44 to 7.36), and 3.9% of people given them had hair loss. The abstract does not say which
          drugs or doses were used, whether it was a measured outcome or a reported event, or whether hair grew back after
          stopping. See{" "}
          <Link href="/peptides/for-weight-loss" className="link">
            peptides for weight loss
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">If you are choosing</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">A scalp product:</strong> look for whether the ingredient and dose match what a
            trial tested. The abstracts do not give concentrations, so ask the maker for the trial, and read{" "}
            <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
              how to read a peptide COA
            </Link>{" "}
            if a test report is offered.
          </li>
          <li>
            <strong className="text-fg">A collagen supplement:</strong> the hair trials used from 300 mg a day (in a mixed
            tablet) to 3 g a day of specific peptides, and the abstracts do not name the products. See{" "}
            <Link href="/peptides/best-collagen-peptides" className="link">
              which collagen brands publish batch test results
            </Link>
            .
          </li>
          <li>
            <strong className="text-fg">Injected or &ldquo;research&rdquo; peptides:</strong> we found no human hair trial
            for thymosin beta-4 or BPC-157, and the{" "}
            <Link href="/peptides/legal-status" className="link">
              legal picture
            </Link>{" "}
            for unapproved compounds is changing.
          </li>
        </ul>
        <p className="mt-5 max-w-prose text-sm text-muted">
          We did not search for trials that compare peptides with finasteride, minoxidil or other established hair-loss
          treatments beyond the one trial above, so this page cannot tell you how peptides compare with them. Hair loss has
          several causes, and a clinician can tell you which one you have.
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

      <section className="mt-14 rounded-card border border-line bg-card p-7">
        <h2 className="text-xl font-bold">Keep going</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { href: "/science/topics/hair", label: "Full hair evidence and studies" },
            { href: "/peptides/best-peptides-for-skin", label: "Best peptides for skin, ranked" },
            { href: "/peptides/collagen-peptides", label: "Collagen peptides: the full picture" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex min-h-14 items-center rounded-tile border border-line bg-bg px-[18px] py-3 font-medium hover:border-accent"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      <RelatedGoals path="/peptides/peptides-for-hair-growth" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
