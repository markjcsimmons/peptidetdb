import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout } from "@/components/ui";
import { DisclosureNote } from "@/components/disclosure-note";
import { TOPICS, type Level } from "@/lib/topics";
import type { Topic } from "@/lib/studies";
import { RelatedGoals } from "@/components/guide-links";
import { RankedList, type Route } from "@/components/ranked-list";
import { PageContents } from "@/components/page-contents";

export const metadata: Metadata = {
  title: "Oral peptides: do they work? Ranked by evidence",
  description:
    "Can peptides be taken by mouth? Oral semaglutide, linaclotide, collagen, fish and milk hydrolysates, Pürblack's capsules and BPC-157, ranked by the strength of the human studies, with what each does not show.",
  alternates: { canonical: "/peptides/oral-peptides" },
};

const REVIEWED = "2026-11-12";

type Option = {
  name: string;
  level: Level;
  /** How it is taken, only where the entry makes it plain. */
  routes?: Route[];
  /** Topic page and rating this entry mirrors (checked at build time below). */
  topic: Topic;
  topicSubject: string;
  shows: React.ReactNode;
  notShown: React.ReactNode;
};

const OPTIONS: Option[] = [
  {
    name: "Oral semaglutide tablet (a peptide drug with an absorption enhancer) for weight loss",
    level: "consistent",
    routes: ["oral"],
    topic: "oral-peptides",
    topicSubject: "Oral semaglutide tablet (a peptide drug with an absorption enhancer) for weight loss",
    shows: (
      <>
        In 667 adults with obesity and no diabetes, body weight fell 15.1% on a 50 mg daily tablet against 2.4% on placebo over 68
        weeks, and 85% of those on the drug lost at least 5% against 26% on placebo (
        <PaperLink id="knop-2023" via="doi">
          Knop 2023
        </PaperLink>
        ). It is absorbed in the stomach, near the tablet, and only because the tablet contains an absorption enhancer called SNAC
        that protects the peptide from digestive enzymes (
        <PaperLink id="buckley-2018" via="doi">
          Buckley 2018
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        Gut side effects affected 80% of people on the drug against 46% on placebo. The trial ran 68 weeks with a lifestyle
        programme, was funded by Novo Nordisk, and used a dose well above the diabetes dose. The absorption mechanism is specific to
        that drug and enhancer, so it does not show that other peptides can be swallowed. See{" "}
        <Link href="/peptides/for-weight-loss" className="link">
          peptides for weight loss
        </Link>
        .
      </>
    ),
  },
  {
    name: "Linaclotide and plecanatide (prescription capsules) for IBS with constipation and chronic constipation",
    level: "consistent",
    routes: ["oral"],
    topic: "gut",
    topicSubject: "Linaclotide and plecanatide (prescription) for IBS with constipation and chronic constipation",
    shows: (
      <>
        Meta-analyses of placebo-controlled trials found linaclotide beat placebo in 1,773 people with IBS-C (
        <PaperLink id="atluri-2014" via="doi">
          Atluri 2014
        </PaperLink>
        ) and plecanatide gave about 1.4 more bowel movements a week across 6,319 people (
        <PaperLink id="akram-2026" via="doi">
          Akram 2026
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        Both act in the gut and are not described in these abstracts as needing to be absorbed into the blood, so they are not a test
        of whether swallowed peptides reach the body. Diarrhoea is the main side effect. See{" "}
        <Link href="/peptides/peptides-for-gut-health" className="link">
          peptides for gut health
        </Link>
        .
      </>
    ),
  },
  {
    name: "Oral collagen peptides for skin",
    level: "consistent",
    routes: ["oral"],
    topic: "skin",
    topicSubject: "Oral collagen peptides",
    shows: (
      <>
        A meta-analysis of 19 randomised trials (1,125 people, 95% of them women) favoured hydrolysed collagen over placebo for skin
        hydration, elasticity and wrinkles (
        <PaperLink id="de-miranda-2021" via="doi">
          de Miranda 2021
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        The abstract gives no effect sizes and says nothing about the quality of the trials, so the size and reliability of the
        benefit are uncertain. The trials tested specific collagen products. See{" "}
        <Link href="/peptides/collagen-peptides-benefits" className="link">
          collagen peptide benefits
        </Link>
        .
      </>
    ),
  },
  {
    name: "Dietary collagen peptides: do fragments reach the blood after swallowing?",
    level: "limited",
    routes: ["oral"],
    topic: "oral-peptides",
    topicSubject: "Dietary collagen peptides: do fragments reach the blood after swallowing?",
    shows: (
      <>
        After volunteers swallowed gelatin hydrolysate, the peptide form of hydroxyproline rose in their blood and peaked after 1 to 2
        hours, mainly as Pro-Hyp (
        <PaperLink id="iwai-2005" via="doi">
          Iwai 2005
        </PaperLink>
        ). Gly-Pro-Hyp and Pro-Hyp rose in plasma and urine after collagen tripeptide products (
        <PaperLink id="yamamoto-2016" via="doi">
          Yamamoto 2016
        </PaperLink>
        ), and an enzymatically pre-digested collagen was absorbed faster than a standard one in ten men (
        <PaperLink id="skov-2019" via="pmc">
          Skov 2019
        </PaperLink>
        ). In a trial of fish-skin collagen peptides, blood exposure to Gly-Pro-Hyp was about 54 times higher after the peptide than
        after a general collagen product (
        <PaperLink id="hwang-2026" via="doi">
          Hwang 2026
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        These measure blood levels, not benefit. Where doses are stated they were large (9.4 to 23 g in one study and 35 g in another), the studies
        were small, and none says how much of a few-gram supplement dose is absorbed. The 2005 study had no comparison group.
      </>
    ),
  },
  {
    name: "Fish-derived collagen peptides for skin",
    level: "limited",
    routes: ["oral"],
    topic: "skin",
    topicSubject: "Oral marine (fish-derived) collagen peptides",
    shows: (
      <>
        In women aged 45 to 60, a freshwater fish collagen lowered a wrinkle score 35% from baseline over 12 weeks (
        <PaperLink id="evans-2021" via="doi">
          Evans 2021
        </PaperLink>
        ), and in 114 women with cellulite and thinning hair, fish-skin collagen peptides for 24 weeks improved cellulite and skin
        elasticity more than placebo (
        <PaperLink id="hwang-2026" via="doi">
          Hwang 2026
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        The Evans abstract gives no sample size or dose, and most of its results are changes from baseline or self-rated scores, which
        placebo can also move. Each is a single trial, and the Hwang abstract does not say who funded it. See{" "}
        <Link href="/peptides/oral-marine-peptides" className="link">
          oral marine peptides
        </Link>
        .
      </>
    ),
  },
  {
    name: "Casein hydrolysate (Lactium) for sleep",
    level: "limited",
    routes: ["oral"],
    topic: "brain",
    topicSubject: "Casein hydrolysate (Lactium) for sleep",
    shows: (
      <>
        In 36 adults with chronic insomnia, 600 mg a day for 4 weeks produced a larger fall than placebo in one sleep-disorder score
        and a shorter time to fall asleep on a sleep recording (−7.7 minutes against +6.1) (
        <PaperLink id="chang-2024" via="doi">
          Chang 2024
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        Only two measures beat placebo out of many tested, most improvements were changes from baseline, and the authors call for
        larger and longer trials. See{" "}
        <Link href="/peptides/peptides-for-sleep" className="link">
          peptides for sleep
        </Link>
        .
      </>
    ),
  },
  {
    name: "Valyl-tyrosine, a defined sardine-derived peptide, for blood pressure",
    level: "limited",
    routes: ["oral"],
    topic: "blood-pressure",
    topicSubject: "Valyl-tyrosine, a defined sardine-derived peptide",
    shows: (
      <>
        In 29 adults with high-normal or mild high blood pressure, 3 mg twice a day in a drink lowered blood pressure by about 9 mm Hg
        systolic and 5 mm Hg diastolic against no change on placebo (
        <PaperLink id="kawasaki-2000" via="doi">
          Kawasaki 2000
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        A single small, 4-week trial with nothing else in this site replicating it. It tested one defined peptide in a drink, not
        fish hydrolysate products in general.
      </>
    ),
  },
  {
    name: "Pürblack's oral targeted peptide capsules (Muscle+, Joint+, Vascular+ and related products)",
    level: "limited",
    routes: ["oral"],
    topic: "oral-peptides",
    topicSubject: "Pürblack's oral targeted peptide capsules (Muscle+, Joint+, Vascular+ and related products)",
    shows: (
      <>
        Pürblack&rsquo;s product booklet and its guide to choosing peptide supplements describe its peptides as natural, made from
        food proteins, taken as capsules (up to six a day) and absorbed through the PepT1 peptide transporter, and say Muscle+ and
        Joint+ are NSF Certified for Sport. For its muscle, joint and vascular peptides it cites three 2019 papers by Ivko and
        colleagues. In the muscle paper, 77 men aged 30 to 58 took 50, 100 or 150 µg of the peptide a day in 30-day courses over six
        months, and muscle mass, strength and self-rated energy were higher at the 100 and 150 µg doses than at the start. The same
        paper reports rat experiments and tests on cultured human embryonic cells.
      </>
    ),
    notShown: (
      <>
        There was no placebo group: the paper&rsquo;s &ldquo;control&rdquo; is the men&rsquo;s own results before the study, so it
        cannot separate the capsule from training, expectation or time. It gives 77 men in one place and group sizes of 75, 76 and 77
        in another. The 4.5-fold rise in alpha-actinin-3 that the booklet quotes was measured in cultured human cells, not in
        people. The papers are in journals we could not find in PubMed (we searched on 12 November 2026 for the author and the
        product names and found nothing), so they are not in our study list. The joint paper describes the same three-part design
        with 88 patients; we did not review its results or the vascular paper. The materials we read give no measurement of how much
        of these peptides is absorbed, and PepT1 carries only very short peptides: one study found it takes up the tripeptide KPV in
        cells (
        <PaperLink id="dalmasso-2008" via="pmc">
          Dalmasso 2008
        </PaperLink>
        ). NSF certification, as Pürblack describes it, concerns what is in the product, not whether it works. One of the supplied
        papers on the muscle peptide lists Ideal Pharma Peptide GmbH as an author&rsquo;s affiliation; the materials we read do
        not state how that company relates to Pürblack. We hold Pürblack to the same standard as every other entry and will add trials that
        are indexed, controlled or independently replicated.
      </>
    ),
  },
  {
    name: "BPC-157 capsules and other oral research peptides",
    level: "preclinical",
    routes: ["oral"],
    topic: "gut",
    topicSubject: "BPC-157 for gut conditions (ulcers, colitis, fistulas)",
    shows: (
      <>
        A 2024 review describes rat experiments in which BPC-157 was followed by healing of surgical joins in the gut and of fistulas (
        <PaperLink id="bajramagic-2024" via="pmc">
          Bajramagic 2024
        </PaperLink>
        ), and a 2012 review argues it may help in inflammatory bowel disease (
        <PaperLink id="sikiric-2012" via="doi">
          Sikiric 2012
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        Both reviews share authors and give no numbers, and we found no controlled human trial of BPC-157 for a gut condition. We
        also did not find absorption data for oral BPC-157 in people. It is not an approved medicine; see the{" "}
        <Link href="/peptides/bpc-157" className="link">
          BPC-157 page
        </Link>{" "}
        and the{" "}
        <Link href="/peptides/legal-status" className="link">
          legal status page
        </Link>
        .
      </>
    ),
  },
];


/**
 * The same question for every entry: what do we know about safety, and what product testing can we verify?
 * A company's statement that it tests counts only as a statement; a report we opened counts as a fact.
 */
const TESTING: Record<string, React.ReactNode> = {
  "Oral semaglutide tablet (a peptide drug with an absorption enhancer) for weight loss": (
    <>
      The trial reports any adverse event in 92% on the drug against 86% on placebo, with gut events in 80% against 46%, mostly mild
      to moderate (
      <PaperLink id="knop-2023" via="doi">
        Knop 2023
      </PaperLink>
      ). It is a prescription drug, so manufacturing and testing fall under medicines rules; we did not check the approval status of
      the 50 mg tablet or read any batch records.
    </>
  ),
  "Linaclotide and plecanatide (prescription capsules) for IBS with constipation and chronic constipation": (
    <>
      The meta-analyses report diarrhoea as the main side effect: about four times as likely on plecanatide, and severe enough to
      stop linaclotide far more often than placebo. They are prescription drugs; we did not read any batch records.
    </>
  ),
  "Oral collagen peptides for skin": (
    <>
      A 2026 systematic review of 25 randomised trials found hydrolysed collagen generally well tolerated, with few adverse events,
      though most trials were rated at high risk of bias and were built to measure benefit (
      <PaperLink id="bassila-2026" via="doi">
        Bassila 2026
      </PaperLink>
      ). Collagen supplements are not pre-approved, and test reports vary by brand: of 15 brands we checked, we could read batch
      reports for three (see{" "}
      <Link href="/peptides/best-collagen-peptides" className="link">
        which collagen brands publish batch test results
      </Link>
      ).
    </>
  ),
  "Dietary collagen peptides: do fragments reach the blood after swallowing?": (
    <>
      These were short experiments in volunteers, and the abstracts we read report no safety outcomes. We did not review product
      testing for the preparations used.
    </>
  ),
  "Fish-derived collagen peptides for skin": (
    <>
      Fish allergy is the known risk: a case report describes{" "}
      <PaperLink id="ueno-2020" via="pmc">
        anaphylaxis in a child with fish allergy
      </PaperLink>{" "}
      after fish-collagen tablets. The trial abstracts here report no safety findings we could summarise, and we did not review test
      reports for fish-collagen products; see the collagen brand check above for the general picture.
    </>
  ),
  "Casein hydrolysate (Lactium) for sleep": (
    <>
      We did not summarise adverse-event results from this trial and did not review test reports for products that contain it.
    </>
  ),
  "Valyl-tyrosine, a defined sardine-derived peptide, for blood pressure": (
    <>
      The trial reports no adverse effects detected over 4 weeks in 29 people, which is too small and short to say much about safety.
      We did not review test reports for any product containing it.
    </>
  ),
  "Pürblack's oral targeted peptide capsules (Muscle+, Joint+, Vascular+ and related products)": (
    <>
      Pürblack&rsquo;s certificate-of-analysis page lists an internal COA and an NSF COA for each of its eight peptide products, and
      says Muscle+ and Joint+ are NSF Certified for Sport. We read the public internal COAs for Muscle+ (batch 00034, reported 2
      December 2025) and Joint+ (batch 00031, reported 12 November 2025). Heavy metals (lead, arsenic, cadmium, mercury) and
      microbiology (plate count, E. coli, Salmonella, S. aureus) are within the stated limits. Four things the COAs do not show: no
      laboratory is named on them; they give no peptide purity or content result and no banned-substance test; the L-valine result
      (24.0% and 23.5%) is below the stated range of 27.0 to 27.5% and the COA does not explain it, which may be a typing error in
      the range; and the peptide complex itself is listed at its 5.0% limit. We could not read the NSF COAs, which sit on NSF&rsquo;s
      platform. NSF&rsquo;s Certified for Sport listing shows two Pürblack products, &ldquo;Pepts ReJoint&rdquo; and &ldquo;Pepts
      ReMuscle&rdquo;, which Pürblack confirms are the same products as Joint+ and Muscle+ (we did not check this against the
      formulas). As we
      understand it, that certification covers what is in the product, not whether it works or its long-term safety. We found no
      human safety data on these peptides beyond the uncontrolled studies described above.
    </>
  ),
  "BPC-157 capsules and other oral research peptides": (
    <>
      Not an approved medicine. Human safety data amount to three small uncontrolled studies totalling 30 people, which a 2026
      systematic review judged poor quality with very low certainty, and reviews warn of risks from unregulated manufacturing and
      contamination (
      <PaperLink id="poolton-2026" via="doi">
        Poolton 2026
      </PaperLink>
      ; see our{" "}
      <Link href="/science/topics/safety" className="link">
        safety page
      </Link>
      ). We know of no testing standard that applies to these products.
    </>
  ),
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "Can peptides be taken by mouth?",
    a: "Some can, if they are engineered for it. Oral semaglutide works because its tablet contains an absorption enhancer, and two reviews say oral peptide delivery still faces low-to-single-digit oral bioavailability. Peptides that are not engineered for swallowing are mostly broken down in the gut, though small fragments of collagen do reach the blood.",
  },
  {
    q: "Do oral peptide supplements work?",
    a: "It depends on the peptide and the outcome. Oral collagen has consistent trial evidence for skin, and a few small trials of fish and milk hydrolysates exist for sleep, blood pressure and gut symptoms. For capsules of specific 'targeted' peptides sold as supplements, we found no controlled human trial indexed in PubMed.",
  },
  {
    q: "Are oral peptides absorbed through PepT1?",
    a: "PepT1 is a gut transporter that carries very short peptides. One cell and mouse study found it takes up the tripeptide KPV. We found no measurement of how much of a longer peptide complex sold as a supplement is absorbed this way.",
  },
  {
    q: "Are oral peptides safer than injected ones?",
    a: "We have not compared them. Safety depends on the specific product and how it is made and tested. Oral products still have side effects, such as gut effects with oral semaglutide, and the unapproved injectable and oral research peptides lack human safety data.",
  },
  {
    q: "Do Pürblack's peptide capsules have human trials?",
    a: "Pürblack cites three 2019 papers by Ivko and colleagues. In the muscle paper, 77 men took the peptide for six months and improved against their own starting values, but there was no placebo group, and we could not find the papers in PubMed. See the ranking entry for details.",
  },
  {
    q: "Is BPC-157 effective when swallowed?",
    a: "We found no controlled human trial of BPC-157 by any route for a gut condition, and no data on how much is absorbed from capsules. The evidence is from animals.",
  },
];

export default function OralPeptidesPage() {
  // The ratings on this page must match the topic pages. A mismatch fails the build instead of publishing a contradiction.
  for (const o of OPTIONS) {
    if (!TESTING[o.name]) throw new Error(`oral-peptides: no safety and testing text for "${o.name}"`);
    const r = TOPICS[o.topic].ratings.find((x) => x.subject === o.topicSubject);
    if (!r || r.level !== o.level) {
      throw new Error(`oral-peptides: "${o.name}" does not match its rating "${o.topicSubject}" on the ${o.topic} topic page`);
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
            { "@type": "ListItem", position: 3, name: "Oral peptides", item: absoluteUrl("/peptides/oral-peptides") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Oral peptides
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">Oral peptides: do they work? Ranked by the evidence</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>
      <DisclosureNote />

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          Peptides can work by mouth, but mostly when they are engineered for it: oral semaglutide needs an absorption enhancer, and
          the prescription gut drugs act inside the gut. Oral collagen has consistent trial evidence for skin, and small trials of
          fish and milk hydrolysates are limited. For capsules of specific &ldquo;targeted&rdquo; peptides sold as supplements,
          including Pürblack&rsquo;s, the only human data we have seen are uncontrolled before-and-after results in papers we could
          not find in PubMed.
        </p>
      </Callout>

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Why swallowing a peptide is hard</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Digestive enzymes break peptides down and the gut wall blocks most of what is left. A review of oral delivery lists these
          hurdles (
          <PaperLink id="dubey-2021" via="doi">
            Dubey 2021
          </PaperLink>
          ), and another says that despite permeation-enhancer technology in the FDA-approved oral peptide products, oral delivery
          still faces low-to-single-digit bioavailability (
          <PaperLink id="tran-2022" via="doi">
            Tran 2022
          </PaperLink>
          ). Peptides that are made as foods, such as collagen hydrolysate, are broken into smaller pieces and some reach the
          blood, as the studies below show. Whether a fragment reaching the blood does anything is a separate question, and that is
          what the benefit trials are for.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">How this ranking works</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The list is ordered by how strong the human evidence is, using the ratings on our{" "}
          <Link href="/science/topics/oral-peptides" className="link">
            oral peptides evidence page
          </Link>{" "}
          and our{" "}
          <Link href="/science/topics/skin" className="link">
            skin
          </Link>
          ,{" "}
          <Link href="/science/topics/gut" className="link">
            gut
          </Link>
          ,{" "}
          <Link href="/science/topics/brain" className="link">
            sleep and brain
          </Link>{" "}
          and{" "}
          <Link href="/science/topics/blood-pressure" className="link">
            blood pressure
          </Link>{" "}
          pages. It does not measure how big a benefit is, how safe something is, or whether one option beats another, because the
          studies do not compare them. Entries that share a rating are in an order that is our judgement: read them as ties. It
          ranks types of peptide, and one entry covers a brand whose materials we read; every other entry is a peptide type. Every entry also states what we know about safety and what product testing we could verify, using the same question each time. Product
          claims, including a company&rsquo;s statement that it tests, are attributed to the company and are not counted as evidence; a test report we opened is. Nobody paid for a place on this page, and there are
          no affiliate links.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">The ranking</h2>
        <RankedList
          options={OPTIONS.map((o) => ({ ...o, extra: { label: "Safety and product testing.", body: TESTING[o.name] } }))}
        />
        <p className="mt-5 max-w-prose text-sm text-muted">
          Not covered: other approved oral peptide drugs, and absorption studies of research peptides taken by mouth. Pürblack
          products other than those named, such as its vision, brain and immune capsules, were not reviewed beyond the booklet
          description.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">If you are choosing</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">Ask what was tested and in whom.</strong> A trial of one defined peptide, or of a named
            collagen product, does not transfer to a different product with a similar name.
          </li>
          <li>
            <strong className="text-fg">Look for a placebo group.</strong> Before-and-after results without one cannot separate
            the product from expectation, exercise or time.
          </li>
          <li>
            <strong className="text-fg">Ask for a batch test report.</strong> Our{" "}
            <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
              COA guide
            </Link>{" "}
            explains how to read one.
          </li>
          <li>
            <strong className="text-fg">Prescription oral peptides</strong> are medicines with side effects, and a clinician decides
            whether they suit you; see the{" "}
            <Link href="/peptides/legal-status" className="link">
              legal status page
            </Link>
            .
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
            { href: "/science/topics/oral-peptides", label: "Full oral peptides evidence" },
            { href: "/peptides/oral-marine-peptides", label: "Do oral marine peptides work?" },
            { href: "/peptides/how-peptides-work", label: "How peptides work" },
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

      <RelatedGoals path="/peptides/oral-peptides" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
