import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout, ShortAnswer } from "@/components/ui";
import { TOPICS, type Level } from "@/lib/topics";
import { RelatedGoals, PageKindLabel } from "@/components/guide-links";
import { RankedList, type Route } from "@/components/ranked-list";
import { PageContents } from "@/components/page-contents";

export const metadata: Metadata = {
  title: "Peptides for the immune system: ranked by evidence",
  description:
    "Do peptides boost the immune system? Thymosin alpha-1, thymus extracts, Thymalin, KPV and oral marine peptides, ranked by the strength of the human studies, with what each does not show.",
  alternates: { canonical: "/peptides/peptides-for-immune-system" },
};

const REVIEWED = "2026-11-13";

type Option = {
  name: string;
  level: Level;
  /** How it is taken, only where the entry makes it plain. */
  routes?: Route[];
  /** Rating on the immune topic page this entry mirrors (checked at build time below). */
  topicSubject: string;
  shows: React.ReactNode;
  notShown: React.ReactNode;
};

const OPTIONS: Option[] = [
  {
    name: "Thymosin alpha-1 injections added to hospital care for COPD flare-ups",
    level: "consistent",
    routes: ["injected"],
    topicSubject: "Injected thymosin alpha-1 added to usual care in COPD flare-ups",
    shows: (
      <>
        A meta-analysis of 39 randomised trials (3,329 patients) found{" "}
        <PaperLink id="cao-2024" via="doi">
          better lung function and blood oxygen, a hospital stay about 5 days shorter and higher CD4 T-cell counts
        </PaperLink>{" "}
        than routine treatment alone. An 84-patient placebo-controlled trial found{" "}
        <PaperLink id="jia-2015" via="doi">
          better oxygen levels and lung function after 4 weeks
        </PaperLink>
        .
      </>
    ),
    notShown: (
      <>
        The outcomes are lung tests, blood gases and cell counts, not survival or fewer flare-ups. The meta-analysis abstract
        does not describe trial quality, and the trials may come largely from China. It is hospital treatment of a
        flare-up, not prevention or immune support in healthy people.
      </>
    ),
  },
  {
    name: "Thymus extracts added to cancer treatment",
    level: "mixed",
    topicSubject: "Thymus extracts added to cancer treatment",
    shows: (
      <>
        A Cochrane review of 20 trials found purified thymus extracts{" "}
        <PaperLink id="wolf-2011" via="pmc">
          lowered the risk of severe infections during chemotherapy or radiotherapy
        </PaperLink>{" "}
        (risk ratio 0.54).
      </>
    ),
    notShown: (
      <>
        The same review found no benefit for survival or tumour response, the authors call the infection result preliminary,
        and most trials had at least a moderate risk of bias. Its searches ended in 2010.
      </>
    ),
  },
  {
    name: "Thymosin alpha-1 injections for sepsis",
    level: "mixed",
    routes: ["injected"],
    topicSubject: "Injected thymosin alpha-1 for sepsis",
    shows: (
      <>
        A 361-patient trial found{" "}
        <PaperLink id="wu-2013" via="pmc">
          fewer deaths at 28 days (26% against 35%)
        </PaperLink>
        , a borderline result.
      </>
    ),
    notShown: (
      <>
        A later placebo-controlled trial of 1,106 adults found{" "}
        <PaperLink id="wu-2025" via="pmc">
          no difference in deaths (23.4% against 24.1%)
        </PaperLink>
        . Both trials were in Chinese hospitals, and several authors of the larger one report grants or fees from
        SciClone Pharmaceuticals.
      </>
    ),
  },
  {
    name: "Thymosin alpha-1 injections for severe acute pancreatitis",
    level: "mixed",
    routes: ["injected"],
    topicSubject: "Injected thymosin alpha-1 for severe acute pancreatitis",
    shows: (
      <>
        A meta-analysis of five trials (706 patients) found{" "}
        <PaperLink id="tian-2025" via="pmc">
          fewer infections outside the pancreas
        </PaperLink>{" "}
        and better T-cell measures.
      </>
    ),
    notShown: (
      <>
        A larger placebo-controlled trial of 508 patients found{" "}
        <PaperLink id="ke-2022" via="pmc">
          no reduction in infected pancreatic necrosis
        </PaperLink>
        , its main outcome, so the two do not clearly agree.
      </>
    ),
  },
  {
    name: "Thymosin alpha-1 for hepatitis B",
    level: "mixed",
    routes: ["injected"],
    topicSubject: "Injected thymosin alpha-1 for hepatitis B",
    shows: (
      <>
        In 120 patients with hepatitis B-related liver failure,{" "}
        <PaperLink id="chen-2022" via="doi">
          more survived without a transplant at 90 days (75% against 53%)
        </PaperLink>{" "}
        in an open-label trial. In cirrhosis, adding it to entecavir gave{" "}
        <PaperLink id="peng-2020" via="pmc">
          an early advantage
        </PaperLink>{" "}
        across seven trials.
      </>
    ),
    notShown: (
      <>
        The early advantage in cirrhosis was gone by 48 to 52 weeks, a 690-patient trial found{" "}
        <PaperLink id="wu-2018" via="doi">
          no difference in liver decompensation, liver cancer or death
        </PaperLink>
        , and a 51-patient trial found{" "}
        <PaperLink id="kim-2012" via="doi">
          no benefit from adding it to peginterferon
        </PaperLink>
        .
      </>
    ),
  },
  {
    name: "Thymosin alpha-1 added to cancer treatment",
    level: "limited",
    topicSubject: "Thymosin alpha-1 added to cancer treatment",
    shows: (
      <>
        The Cochrane review found{" "}
        <PaperLink id="wolf-2011" via="pmc">
          a trend toward longer survival
        </PaperLink>{" "}
        with synthetic thymic peptides such as thymosin alpha-1 (risk ratio 1.21).
      </>
    ),
    notShown: (
      <>
        The trend was not statistically significant (95% CI 0.94 to 1.56) and rests on a handful of trials, with no
        trials after 2010 included.
      </>
    ),
  },
  {
    name: "Thymosin alpha-1 for COVID-19",
    level: "limited",
    routes: ["injected"],
    topicSubject: "Injected thymosin alpha-1 for COVID-19",
    shows: (
      <>
        A meta-analysis of eight studies in hospitalised patients reports{" "}
        <PaperLink id="soeroto-2023" via="doi">
          a lower risk of death (risk ratio 0.59)
        </PaperLink>
        .
      </>
    ),
    notShown: (
      <>
        Results varied a great deal between studies, there was no clear difference in needing a ventilator, and the authors
        say randomised trials are still needed.
      </>
    ),
  },
  {
    name: "Thymosin alpha-1 to improve flu-vaccine response in older adults",
    level: "limited",
    topicSubject: "Thymosin alpha-1 as an adjunct to influenza vaccine in older adults",
    shows: (
      <>
        A 2007 article by researchers in the field says trials in animals and people{" "}
        <PaperLink id="ershler-2007" via="doi">
          showed enhanced vaccine responses
        </PaperLink>
        .
      </>
    ),
    notShown: (
      <>
        The abstract gives no trial sizes or numbers and no outcome such as fewer infections, and we did not read the
        underlying trials.
      </>
    ),
  },
  {
    name: "Thymalin and engineered thymosin alpha-1, in animals",
    level: "preclinical",
    topicSubject: "Thymalin and engineered thymosin alpha-1 in animals",
    shows: (
      <>
        In rats with a transplanted tumour, low-dose Thymalin{" "}
        <PaperLink id="zhukova-2018" via="doi">
          stopped tumour growth in more than half
        </PaperLink>
        . In mice, a long-acting engineered thymosin alpha-1{" "}
        <PaperLink id="wang-2018" via="pmc">
          slowed two tumour models
        </PaperLink>
        .
      </>
    ),
    notShown: (
      <>
        Neither was tested in people, and the engineered form is a different molecule from thymosin alpha-1.
      </>
    ),
  },
  {
    name: "KPV for inflammation",
    level: "preclinical",
    topicSubject: "KPV (anti-inflammatory tripeptide) for gut and skin inflammation",
    shows: (
      <>
        KPV{" "}
        <PaperLink id="dalmasso-2008" via="pmc">
          reduced inflammatory signalling in human cell lines and colitis in mice
        </PaperLink>
        , and a later mouse study found it prevented colitis-associated cancer (
        <PaperLink id="viennois-2016" via="pmc">
          Viennois 2016
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        Our PubMed searches found no human trial of KPV. See{" "}
        <Link href="/peptides/kpv" className="link">
          KPV: what the studies show
        </Link>
        .
      </>
    ),
  },
  {
    name: "Oral marine (fish-derived) peptides for immune function",
    level: "none",
    routes: ["oral"],
    topicSubject: "Oral marine (fish-derived) peptides for immune function",
    shows: <>Nothing in people that we found: our searches turned up no controlled human trial with an immune outcome.</>,
    notShown: (
      <>
        Supplements sold for immune support may still cite laboratory or animal work. See{" "}
        <Link href="/peptides/oral-marine-peptides" className="link">
          do oral marine peptides work?
        </Link>
      </>
    ),
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Which peptide is best for the immune system?",
    a: "Judged by the strength of human evidence, thymosin alpha-1 injections added to hospital treatment of COPD flare-ups rank first: 39 trials found better lung function and shorter hospital stays. But every human result here comes from treating people who are ill, mostly in hospital. We found no trial of any peptide that strengthens immunity in healthy people.",
  },
  {
    q: "Does thymosin alpha-1 boost immunity?",
    a: "It raises T-cell measures in several trials, but the clinical results are mixed: the largest sepsis trial (1,106 adults) and the largest pancreatitis trial (508 patients) found no benefit on their main outcomes, while a COPD meta-analysis and some hepatitis B trials were positive. None tested healthy people.",
  },
  {
    q: "Do thymus supplements work?",
    a: "The trials we found used purified thymus extracts or thymosin alpha-1 given as medical treatment, not over-the-counter thymus supplements. A Cochrane review found extracts lowered severe infections during cancer treatment, a preliminary result, with no survival benefit. We have not assessed oral or over-the-counter thymus products for infection prevention, allergies or healthy adults.",
  },
  {
    q: "Is KPV good for inflammation?",
    a: "It reduced inflammation in cell and mouse studies, but our PubMed searches found no human trial, so its effect in people is unknown.",
  },
  {
    q: "Is thymosin alpha-1 legal in the US?",
    a: "FDA's compounding page (current as of 22 April 2026) lists thymosin-alpha 1 among substances whose nominations were withdrawn, and we found no FDA approval for it. See our legal status page for the dated picture.",
  },
];

export default function PeptidesForImmuneSystemPage() {
  const immune = TOPICS.immune;
  // The ratings on this page must match the topic page. A mismatch fails the build instead of publishing a contradiction.
  for (const o of OPTIONS) {
    const r = immune.ratings.find((x) => x.subject === o.topicSubject);
    if (!r || r.level !== o.level) {
      throw new Error(`peptides-for-immune-system: "${o.name}" does not match its rating "${o.topicSubject}" on the immune topic page`);
    }
  }
  const unassessed = immune.ratings.find((r) => r.level === "unassessed");

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
            {
              "@type": "ListItem",
              position: 3,
              name: "Peptides for the immune system",
              item: absoluteUrl("/peptides/peptides-for-immune-system"),
            },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Peptides for the immune system
      </nav>
      <PageKindLabel path="/peptides/peptides-for-immune-system" />
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">Peptides for the immune system, ranked by the evidence</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <ShortAnswer className="mt-6">
        <p className="max-w-prose text-lg leading-relaxed sm:text-xl sm:leading-relaxed [text-wrap:pretty]">
          We found no trial showing that any peptide boosts immunity in healthy people. The human evidence is for thymosin
          alpha-1 and thymus extracts given as medical treatment to people who are ill: consistent results for COPD flare-ups,
          mixed results for sepsis, pancreatitis, hepatitis B and cancer care. KPV has only cell and mouse studies, and we found
          no human immune trial of oral marine peptides.
        </p>
      </ShortAnswer>

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">How this ranking works</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The list is ordered by how strong the human evidence is, using the ratings on our{" "}
          <Link href="/science/topics/immune" className="link">
            immune function and inflammation evidence page
          </Link>
          . It does not measure how big a benefit is, how safe something is, or whether one option beats another, because the
          studies do not compare them. Options that share a rating are ties, and their order is our judgement. Most entries are
          the same peptide, thymosin alpha-1, tested for different illnesses, because that is where the trials are. A result in
          hospital patients does not carry over to healthy people. It ranks types of peptide, not products. Nobody paid for a
          place on this page, and there are no affiliate links.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">The ranking</h2>
        <RankedList options={OPTIONS} />
        {unassessed && (
          <Callout tone="warn" label="Not yet assessed" as="h3" className="mt-8">
            <p className="max-w-prose text-soft [text-wrap:pretty]">
              <strong className="text-fg">{unassessed.subject}.</strong> {unassessed.why} So this page cannot tell you whether
              any peptide prevents infections in healthy people.
            </p>
          </Callout>
        )}
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">If you are choosing</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">Thymosin alpha-1 sold online or compounded:</strong> the trials used it as medical
            treatment under supervision. It is not FDA-approved, and the{" "}
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
            <strong className="text-fg">Oral &ldquo;immune&rdquo; supplements:</strong> we found no human immune trial of oral
            marine peptides and have not assessed oral thymus products, so a label claim is not backed by the trials on this
            page.
          </li>
          <li>
            <strong className="text-fg">Frequent infections:</strong> repeated or severe infections can have treatable causes,
            and a clinician can check for them.
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
            { href: "/science/topics/immune", label: "Full immune evidence" },
            { href: "/peptides/kpv", label: "KPV: what the studies show" },
            { href: "/peptides/peptides-for-gut-health", label: "Peptides for gut health, ranked" },
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

      <RelatedGoals path="/peptides/peptides-for-immune-system" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
