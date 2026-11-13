import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { ShortAnswer } from "@/components/ui";
import { TOPICS, type Level } from "@/lib/topics";
import { RelatedGoals, PageKindLabel } from "@/components/guide-links";
import { RankedList, type Route } from "@/components/ranked-list";
import { PageContents } from "@/components/page-contents";
import { GradedProducts } from "@/components/product-grades";

export const metadata: Metadata = {
  title: "Nootropic peptides: ranked by the evidence",
  description:
    "Do peptides improve memory, focus or brain health? Cerebrolysin, fish hydrolysate, semax, Noopept, selank and dihexa, ranked by the strength of the human studies, with what each does not show.",
  alternates: { canonical: "/peptides/nootropic-peptides" },
};

const REVIEWED = "2026-11-13";

type Option = {
  name: string;
  level: Level;
  /** How it is taken, only where the entry makes it plain. */
  routes?: Route[];
  /** Rating on the brain topic page this entry mirrors (checked at build time below). */
  topicSubject: string;
  shows: React.ReactNode;
  notShown: React.ReactNode;
};

const OPTIONS: Option[] = [
  {
    name: "Cerebrolysin (pig-brain peptide mixture) after stroke, brain injury or with vascular dementia",
    level: "mixed",
    routes: ["injected"],
    topicSubject: "Cerebrolysin (pig-brain peptide mixture) for stroke, brain injury and vascular dementia",
    shows: (
      <>
        In two placebo-controlled trials in 185 people with a serious brain injury, a combined score of recovery and thinking
        tests{" "}
        <PaperLink id="vester-2021" via="doi">
          favoured Cerebrolysin at 30 and 90 days
        </PaperLink>
        , a small-to-medium effect. A Cochrane review in vascular dementia found{" "}
        <PaperLink id="cui-2019" via="pmc">
          small gains in cognition and overall function
        </PaperLink>{" "}
        from courses of intravenous infusions.
      </>
    ),
    notShown: (
      <>
        A Cochrane review of 7 trials after acute stroke found it{" "}
        <PaperLink id="ziganshina-2023" via="pmc">
          probably makes little or no difference to deaths
        </PaperLink>{" "}
        and may increase non-fatal serious adverse events. The dementia evidence is very low quality and industry-supported, and
        its authors say any benefit may be too small to matter. It is a course of infusions for people with brain disease, not
        a supplement, and no trial we found tested it as a memory aid for healthy people.
      </>
    ),
  },
  {
    name: "Fish protein hydrolysate for memory in older adults",
    level: "limited",
    routes: ["oral"],
    topicSubject: "Fish hydrolysate for memory in older adults",
    shows: (
      <>
        In 53 adults aged 60 to 73 whose memory scores were below average for their age, 3 months of a fish hydrolysate
        supplement{" "}
        <PaperLink id="chataigner-2026" via="doi">
          improved episodic memory more than placebo
        </PaperLink>
        .
      </>
    ),
    notShown: (
      <>
        One trial. The product also contained omega-3 fatty acids, so the peptides&rsquo; own effect cannot be separated, and
        two authors are funded by Abyss Ingredients. It does not show an effect in younger people or on focus.
      </>
    ),
  },
  {
    name: "Semax after stroke and for reduced blood flow to the brain",
    level: "limited",
    topicSubject: "Semax after stroke and for reduced blood flow to the brain",
    shows: (
      <>
        Three Russian-language studies from one research group report better recovery when semax was added after a stroke (
        <PaperLink id="gusev-1997" via="pubmed">
          30 patients against 80 on usual care
        </PaperLink>
        ;{" "}
        <PaperLink id="gusev-2018" via="doi">
          110 patients in rehabilitation
        </PaperLink>
        ) and slower progression of cerebrovascular disease in{" "}
        <PaperLink id="gusev-2005" via="pubmed">
          187 patients
        </PaperLink>
        .
      </>
    ),
    notShown: (
      <>
        None of the three is described as randomised or placebo-controlled, one had no comparison group, and the abstracts give
        few or no numbers. We found no trial of semax as a memory or focus aid in healthy people.
      </>
    ),
  },
  {
    name: "Noopept for thinking problems after stroke",
    level: "limited",
    topicSubject: "Noopept for thinking problems after stroke",
    shows: (
      <>
        In an open study of 60 stroke patients with mild cognitive impairment, 2 months of Noopept (20 mg a day) was followed by{" "}
        <PaperLink id="amelin-2011" via="pubmed">
          better memory-test and word-association scores than in controls
        </PaperLink>
        .
      </>
    ),
    notShown: (
      <>
        Everyone knew who was taking it, the study is not described as randomised, and the abstract gives no group sizes or
        scores. One small study from one centre.
      </>
    ),
  },
  {
    name: "Selank for anxiety",
    level: "limited",
    topicSubject: "Selank for anxiety disorders",
    shows: (
      <>
        Three small Russian-language trials report an anxiety-reducing effect similar to the benzodiazepine medazepam (
        <PaperLink id="zozulia-2008" via="pubmed">
          62 patients
        </PaperLink>
        ) and fewer side effects when added to phenazepam (
        <PaperLink id="medvedev-2015" via="doi">
          70 patients
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        None had a placebo group, and the abstracts give no scores or doses. They tested anxiety disorders, not memory or focus.
        See{" "}
        <Link href="/peptides/selank" className="link">
          selank: what the studies show
        </Link>
        .
      </>
    ),
  },
  {
    name: "Fish-peptide supplement (with magnesium and vitamin B6) for anxiety",
    level: "limited",
    routes: ["oral"],
    topicSubject: "Fish-peptide supplement (with magnesium and B6) for anxiety",
    shows: (
      <>
        In people with an adjustment disorder with anxiety, anxiety scores{" "}
        <PaperLink id="oddoux-2022" via="pmc">
          fell over 28 days
        </PaperLink>{" "}
        on the supplement.
      </>
    ),
    notShown: (
      <>
        There was no comparison group, so the fall cannot be separated from placebo or natural recovery, and three authors work
        for Laboratoire Dielen. The magnesium and B6 also mean the peptides&rsquo; own effect is unknown.
      </>
    ),
  },
  {
    name: "Dihexa",
    level: "preclinical",
    topicSubject: "Dihexa for memory and brain disease",
    shows: (
      <>
        Animal studies are reported to show pro-cognitive effects in models of Alzheimer&rsquo;s and Parkinson&rsquo;s
        disease, according to a 2024 rat study that itself found{" "}
        <PaperLink id="wells-2024" via="doi">
          no protection against a Huntington&rsquo;s-like toxin
        </PaperLink>
        .
      </>
    ),
    notShown: (
      <>
        Our PubMed search found no human trial of dihexa for any use. A rat result, positive or negative, does not tell you what
        it does in people or whether it is safe.
      </>
    ),
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What are nootropic peptides?",
    a: "Peptides sold or studied for memory, focus or brain health. The ones with human studies we found are Cerebrolysin, a mixture of peptides from pig brain given by infusion in some countries, fish protein hydrolysates taken by mouth, and the Russian-developed drugs semax, Noopept and selank. Dihexa has only animal studies.",
  },
  {
    q: "Which peptide is best for memory?",
    a: "No peptide has strong evidence as a memory aid for healthy people; we found no trial in healthy adults for any of them. In older adults with below-average memory, one 53-person trial of a fish hydrolysate supplement found better memory than placebo, but the product also contained omega-3s. Cerebrolysin has the most trials, all in people with stroke, brain injury or dementia, and they disagree.",
  },
  {
    q: "Does semax work?",
    a: "The human evidence we found is three Russian-language studies from one research group, after stroke or in people with reduced blood flow to the brain. They report benefits but none is described as randomised or placebo-controlled, and the abstracts give few numbers. We found no trial of semax in healthy people.",
  },
  {
    q: "Is Cerebrolysin a nootropic?",
    a: "It is a prescription drug in some countries, given as a course of intravenous infusions for stroke, brain injury or dementia. A Cochrane review found it probably does not reduce deaths after acute stroke and may increase non-fatal serious adverse events; smaller analyses in brain injury and vascular dementia report modest benefits on weaker evidence. None of the trials tested it as a brain booster for healthy people.",
  },
  {
    q: "Are nootropic peptides legal in the US?",
    a: "We found no FDA approval for Cerebrolysin, semax, Noopept, selank or dihexa in FDA's approval records. FDA's compounding page lists semax and dihexa among substances whose nominations were withdrawn, and its advisory committee voted in July 2026 to recommend semax for the 503A bulks list; that vote is not binding. See our legal status page.",
  },
];

export default function NootropicPeptidesPage() {
  const brain = TOPICS.brain;
  // The ratings on this page must match the topic page. A mismatch fails the build instead of publishing a contradiction.
  for (const o of OPTIONS) {
    const r = brain.ratings.find((x) => x.subject === o.topicSubject);
    if (!r || r.level !== o.level) {
      throw new Error(`nootropic-peptides: "${o.name}" does not match its rating "${o.topicSubject}" on the brain topic page`);
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
            { "@type": "ListItem", position: 3, name: "Nootropic peptides", item: absoluteUrl("/peptides/nootropic-peptides") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Nootropic peptides
      </nav>
      <PageKindLabel path="/peptides/nootropic-peptides" />
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">Nootropic peptides, ranked by the evidence</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <ShortAnswer className="mt-6">
        <p className="max-w-prose text-lg leading-relaxed sm:text-xl sm:leading-relaxed [text-wrap:pretty]">
          No peptide has good evidence as a memory or focus aid for healthy people: we found no trial in healthy adults for any
          of them. Cerebrolysin has the most trials, all in people with stroke, brain injury or dementia, and they disagree. A
          fish hydrolysate helped memory in one small trial in older adults. Semax and Noopept rest on a few Russian studies
          without placebo groups, and dihexa has only animal data.
        </p>
      </ShortAnswer>

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">How this ranking works</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The list is ordered by how strong the human evidence is, using the ratings on our{" "}
          <Link href="/science/topics/brain" className="link">
            brain evidence page
          </Link>
          . It does not measure how big a benefit is, how safe something is, or whether one option beats another, because the
          studies do not compare them. Options that share a rating are ties, and their order is our judgement. Most of these were
          tested in people with a disease, such as stroke or dementia, and a result there does not carry over to healthy people
          who want sharper thinking. It ranks types of peptide, not products. Nobody paid for a place on this page, and there are
          no affiliate links.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">The ranking</h2>
        <RankedList options={OPTIONS} />
        <p className="mt-5 max-w-prose text-sm text-muted">
          Not covered: non-peptide nootropics such as piracetam, caffeine and herbal products, and sleep peptides, which have
          their own ranking (
          <Link href="/peptides/peptides-for-sleep" className="link">
            peptides for sleep
          </Link>
          ).
        </p>
      </section>

      <GradedProducts
        area="brain"
        ratingNote={<>Our rating for food-derived peptides and memory is &ldquo;limited&rdquo;, so a memory or focus claim costs points under the claims criterion.</>}
      />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">If you are choosing</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">Unapproved compounds sold online:</strong> semax, dihexa and similar products are not
            FDA-approved, their human evidence is thin or absent, and the{" "}
            <Link href="/peptides/legal-status" className="link">
              legal picture
            </Link>{" "}
            is changing. If a test report is offered, our{" "}
            <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
              COA guide
            </Link>{" "}
            explains how to read it.
          </li>
          <li>
            <strong className="text-fg">Fish-derived supplements:</strong> take care with a fish allergy; a case report describes{" "}
            <PaperLink id="ueno-2020" via="pmc">
              anaphylaxis in a child with fish allergy
            </PaperLink>{" "}
            after fish collagen tablets.
          </li>
          <li>
            <strong className="text-fg">Memory problems:</strong> new or worsening memory trouble has many possible causes, and a
            clinician can check for treatable ones.
          </li>
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

      <section className="mt-14 rounded-card border border-line bg-card p-7">
        <h2 className="text-xl font-bold">Keep going</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { href: "/science/topics/brain", label: "Full brain evidence" },
            { href: "/peptides/peptides-for-sleep", label: "Peptides for sleep, ranked" },
            { href: "/peptides/selank", label: "Selank: what the studies show" },
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

      <RelatedGoals path="/peptides/nootropic-peptides" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
