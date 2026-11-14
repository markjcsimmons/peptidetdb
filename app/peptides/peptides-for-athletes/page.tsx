import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { ShortAnswer } from "@/components/ui";
import { TOPICS, type Level } from "@/lib/topics";
import type { Topic } from "@/lib/studies";
import { RelatedGoals, PageKindLabel } from "@/components/guide-links";
import { RankedList, type Route } from "@/components/ranked-list";
import { PageContents } from "@/components/page-contents";
import { ProductsForGoal } from "@/components/products-for-goal";

export const metadata: Metadata = {
  title: "Peptides for athletes: evidence and doping rules",
  description:
    "Which peptides help athletes, and which are banned? Collagen for muscle and joints, growth hormone, MK-677, BPC-157, TB-500, ipamorelin and CJC-1295, ranked by the human evidence, with each one's status on the 2026 WADA Prohibited List.",
  alternates: { canonical: "/peptides/peptides-for-athletes" },
};

const REVIEWED = "2026-11-13";
/** The date we read the Prohibited List on WADA's own website. */
const WADA_CHECKED = "2026-11-13";
const WADA_LIST = "https://www.wada-ama.org/en/prohibited-list";

type Option = {
  name: string;
  level: Level;
  routes?: Route[];
  /** Topic ratings this entry mirrors (checked at build time below). */
  topic: Topic;
  topicSubjects: string[];
  shows: React.ReactNode;
  notShown: React.ReactNode;
};

const WadaLink = ({ children }: { children: React.ReactNode }) => (
  <a href={WADA_LIST} target="_blank" rel="noopener noreferrer" className="link">
    {children}
  </a>
);

const OPTIONS: Option[] = [
  {
    name: "Collagen peptides with resistance training, for muscle",
    level: "consistent",
    routes: ["oral"],
    topic: "muscle",
    topicSubjects: ["Oral collagen peptides with resistance training: fat-free mass"],
    shows: (
      <>
        A 2024 meta-analysis of 19 trials in 768 healthy adults favoured collagen peptides over control for fat-free mass, with
        moderate certainty (
        <PaperLink id="bischof-2024" via="pmc">
          Bischof 2024
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        Everyone trained, so it shows collagen as an add-on to exercise, not on its own, and the gain was small. Most outcomes
        were rated low in certainty, and the pooled trials were in healthy adults rather than competitive athletes. See{" "}
        <Link href="/peptides/peptides-for-muscle-growth" className="link">
          peptides for muscle growth
        </Link>
        .
      </>
    ),
  },
  {
    name: "Collagen peptides for exercise-related knee and joint pain",
    level: "mixed",
    routes: ["oral"],
    topic: "joints",
    topicSubjects: ["Oral collagen peptides for exercise-related knee and joint pain (no arthritis)"],
    shows: (
      <>
        In 180 active 18 to 30-year-olds, 5 g a day for 12 weeks was followed by a bigger fall in exercise-related knee pain than
        placebo (21.9 mm against 15.6 mm;{" "}
        <PaperLink id="zdzieblik-2021-knee" via="pmc">
          Zdzieblik 2021
        </PaperLink>
        ), and a 24-week trial in{" "}
        <PaperLink id="clark-2008" via="doi">
          student athletes
        </PaperLink>{" "}
        reported less joint pain with 10 g a day.
      </>
    ),
    notShown: (
      <>
        Pain also fell by 15.6 mm on placebo, so most of the improvement happened without collagen. A third of the athletes in
        the 24-week trial could not be evaluated, and many outcomes were tested. In 167 older people with knee pain, 10 g a day
        made{" "}
        <PaperLink id="bongers-2020" via="doi">
          no difference from placebo
        </PaperLink>
        . See{" "}
        <Link href="/peptides/peptides-for-joint-pain" className="link">
          peptides for joint pain
        </Link>
        .
      </>
    ),
  },
  {
    name: "Collagen peptides with resistance training, for strength",
    level: "mixed",
    routes: ["oral"],
    topic: "muscle",
    topicSubjects: ["Oral collagen peptides with resistance training: strength"],
    shows: (
      <>
        The same 2024 meta-analysis found a small effect on strength, with low certainty (
        <PaperLink id="bischof-2024" via="pmc">
          Bischof 2024
        </PaperLink>
        ), and some trials found gains in hand-grip, quadriceps or leg strength.
      </>
    ),
    notShown: (
      <>
        Other trials found no significant difference between groups, and the pooled trials were in healthy adults, not
        competitive athletes. Everyone also trained.
      </>
    ),
  },
  {
    name: "Growth hormone itself",
    level: "mixed",
    routes: ["injected"],
    topic: "muscle",
    topicSubjects: ["Injected growth hormone itself in healthy adults (context for these peptides)"],
    shows: (
      <>
        A systematic review of 27 study samples in young, fit adults found growth hormone raised lean body mass by 2.1 kg (
        <PaperLink id="liu-2008" via="doi">
          Liu 2008
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        Strength and exercise capacity did not seem to improve, and soft-tissue swelling and fatigue were more frequent. The
        authors conclude that claims it enhances physical performance are not supported. It is a prescription medicine, not a
        supplement.
      </>
    ),
  },
  {
    name: "Collagen peptides for tendon problems",
    level: "limited",
    routes: ["oral"],
    topic: "joints",
    topicSubjects: ["Oral collagen for tendon problems (tendinopathy)"],
    shows: (
      <>
        In a 20-patient pilot crossover trial of Achilles tendinopathy, symptom scores rose more while patients took collagen
        peptides alongside calf-strengthening exercise (
        <PaperLink id="praet-2019" via="pmc">
          Praet 2019
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        Twenty patients is very small, everyone also did the exercise programme, and the trial was funded by Gelita AG. A 2022
        review says high-quality studies are{" "}
        <PaperLink id="hijlkema-2022" via="pmc">
          scarce
        </PaperLink>{" "}
        and declines to make dietary recommendations.
      </>
    ),
  },
  {
    name: "Fish protein hydrolysate, for recovery",
    level: "limited",
    routes: ["oral"],
    topic: "muscle",
    topicSubjects: ["Fish protein hydrolysate (oral marine peptides)"],
    shows: (
      <>
        In 9 active adults, fish and whey protein hydrolysates raised blood amino acids after exercise about equally (
        <PaperLink id="cordeiro-2020" via="doi">
          Cordeiro 2020
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        Blood amino acids measure digestion, not muscle gain or performance. In 14 male cyclists, time to exhaustion in a second
        session did not differ with or without a marine protein hydrolysate (
        <PaperLink id="mjos-2019" via="doi">
          Mjøs 2019
        </PaperLink>
        ), and that study was funded by a company with an interest in the product.
      </>
    ),
  },
  {
    name: "MK-677 (ibutamoren)",
    level: "limited",
    routes: ["oral"],
    topic: "muscle",
    topicSubjects: ["Oral ghrelin mimetic MK-677 (ibutamoren)"],
    shows: (
      <>
        In 65 healthy older adults, a year of MK-677 raised fat-free mass by 1.1 kg (
        <PaperLink id="nass-2008" via="pmc">
          Nass 2008
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        Strength and function did not change, and fasting glucose rose while insulin sensitivity fell. A trial in hip-fracture
        patients was{" "}
        <PaperLink id="adunsky-2011" via="doi">
          stopped early
        </PaperLink>{" "}
        because of a heart-failure signal. It is not an approved medicine, and no trial was in athletes.
      </>
    ),
  },
  {
    name: "BPC-157 and TB-500, for tendon and ligament injuries",
    level: "preclinical",
    routes: ["injected"],
    topic: "joints",
    topicSubjects: ["BPC-157 for tendon, ligament and joint problems", "TB-500 for tendon and ligament injury"],
    shows: (
      <>
        A 2026 rat study of a cut Achilles tendon found stronger tendons with TB-500 and numerically better, non-significant
        results with BPC-157 (
        <PaperLink id="bicer-2026" via="doi">
          Biçer 2026
        </PaperLink>
        ). The human evidence on BPC-157 is three small uncontrolled studies with 30 people (
        <PaperLink id="poolton-2026" via="doi">
          Poolton 2026
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        No randomised human trial was found for either. A 2026 orthopaedic review describes TB-500 as a fragment not validated
        as equivalent to thymosin beta-4, raises concerns about the identity, purity and sterility of products, and concludes
        routine use cannot be recommended (
        <PaperLink id="tham-2026" via="doi">
          Tham 2026
        </PaperLink>
        ). See the{" "}
        <Link href="/peptides/bpc-157" className="link">
          BPC-157
        </Link>{" "}
        and{" "}
        <Link href="/peptides/tb-500" className="link">
          TB-500
        </Link>{" "}
        pages.
      </>
    ),
  },
  {
    name: "Ipamorelin and CJC-1295",
    level: "none",
    routes: ["injected"],
    topic: "muscle",
    topicSubjects: ["Ipamorelin and CJC-1295"],
    shows: (
      <>
        Our PubMed searches found no controlled trial of either with a muscle, strength or performance outcome. CJC-1295 raised
        growth hormone and IGF-I for days to weeks in healthy adults (
        <PaperLink id="teichman-2006" via="doi">
          Teichman 2006
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        A higher hormone level is not evidence of more muscle or better performance, and growth hormone itself did not improve
        strength in fit adults (see above). &ldquo;No trial found&rdquo; means our search found none, not that none exists. See
        the{" "}
        <Link href="/peptides/ipamorelin" className="link">
          ipamorelin
        </Link>{" "}
        and{" "}
        <Link href="/peptides/cjc-1295" className="link">
          CJC-1295
        </Link>{" "}
        pages.
      </>
    ),
  },
];

/** Status on the 2026 WADA Prohibited List, as read on WADA's website. Every entry needs one (checked below). */
const WADA: Record<string, React.ReactNode> = {
  "Collagen peptides with resistance training, for muscle": (
    <>
      Not named on the 2026 List. Supplements are a separate risk: WADA <WadaLink>warns</WadaLink> that a supplement can contain an
      undeclared prohibited substance, that a mislabelled product is not a defence, and that quality-assurance schemes reduce but
      do not remove that risk.
    </>
  ),
  "Collagen peptides for exercise-related knee and joint pain": (
    <>Not named on the 2026 List; the supplement warning above applies.</>
  ),
  "Collagen peptides with resistance training, for strength": <>Not named on the 2026 List; the supplement warning above applies.</>,
  "Growth hormone itself": (
    <>
      <strong>Prohibited at all times</strong>: growth hormone, its analogues and fragments are listed under{" "}
      <WadaLink>S2.2.3</WadaLink>. A medical need requires a Therapeutic Use Exemption.
    </>
  ),
  "Collagen peptides for tendon problems": <>Not named on the 2026 List; the supplement warning above applies.</>,
  "Fish protein hydrolysate, for recovery": <>Not named on the 2026 List; the supplement warning above applies.</>,
  "MK-677 (ibutamoren)": (
    <>
      <strong>Prohibited at all times</strong>: ibutamoren (MK-677) is named among the growth hormone secretagogues under{" "}
      <WadaLink>S2.2.4</WadaLink>.
    </>
  ),
  "BPC-157 and TB-500, for tendon and ligament injuries": (
    <>
      <strong>Both prohibited at all times</strong>. BPC-157 is named under <WadaLink>S0</WadaLink> (non-approved substances), and
      thymosin beta-4 and its derivatives, &ldquo;e.g. TB-500&rdquo;, under <WadaLink>S2.3</WadaLink> (growth factors).
    </>
  ),
  "Ipamorelin and CJC-1295": (
    <>
      <strong>Both prohibited at all times</strong>: CJC-1295 is named among growth hormone-releasing hormone analogues and
      ipamorelin among growth hormone secretagogues, both under <WadaLink>S2.2.4</WadaLink>.
    </>
  ),
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "Are peptides banned in sport?",
    a: "Many are. The 2026 WADA Prohibited List bans peptide hormones and growth factors at all times under section S2, naming among others growth hormone, CJC-1295, sermorelin, tesamorelin, ipamorelin, MK-677 and thymosin beta-4 derivatives such as TB-500, and bans BPC-157 under S0 as a non-approved substance. Food-derived peptides such as collagen are not on the list, but any supplement can be contaminated.",
  },
  {
    q: "Is BPC-157 banned by WADA?",
    a: "Yes. The 2026 Prohibited List names BPC-157 under S0, non-approved substances, which are prohibited at all times, in and out of competition.",
  },
  {
    q: "Is collagen allowed for athletes?",
    a: "Collagen peptides are not named on the 2026 WADA Prohibited List. WADA warns that supplements can contain undeclared prohibited substances and that a contaminated product is not an adequate defence, so tested athletes often choose products listed by a sport-testing programme, which WADA says reduces but does not remove the risk.",
  },
  {
    q: "Do peptides help athletes recover faster?",
    a: "The human evidence is thin. Collagen peptides with training are followed by a small gain in fat-free mass, and joint-pain results in active people are mixed. BPC-157 and TB-500, often sold for injury recovery, have only animal evidence and are banned in sport.",
  },
  {
    q: "Does growth hormone improve athletic performance?",
    a: "A systematic review of growth hormone in young, fit adults found more lean body mass but no clear improvement in strength or exercise capacity, with more soft-tissue swelling and fatigue. It is prohibited at all times under the WADA List.",
  },
];

export default function PeptidesForAthletesPage() {
  // The ratings on this page must match the topic pages, and every entry needs its anti-doping line.
  for (const o of OPTIONS) {
    for (const subject of o.topicSubjects) {
      const r = TOPICS[o.topic].ratings.find((x) => x.subject === subject);
      if (!r || r.level !== o.level) {
        throw new Error(`peptides-for-athletes: "${o.name}" does not match its rating "${subject}" on the ${o.topic} topic page`);
      }
    }
    if (!WADA[o.name]) throw new Error(`peptides-for-athletes: no anti-doping status for "${o.name}"`);
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
            { "@type": "ListItem", position: 3, name: "Peptides for athletes", item: absoluteUrl("/peptides/peptides-for-athletes") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Peptides for athletes
      </nav>
      <PageKindLabel path="/peptides/peptides-for-athletes" />
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">Peptides for athletes, ranked by the evidence</h1>
      <p className="mt-2 text-sm text-muted">
        Last reviewed {formatDate(REVIEWED)}. Anti-doping status read on WADA&rsquo;s website {formatDate(WADA_CHECKED)}.
      </p>

      <ShortAnswer className="mt-6">
        <p className="max-w-prose text-lg leading-relaxed sm:text-xl sm:leading-relaxed [text-wrap:pretty]">
          The best-supported option is collagen peptides taken alongside resistance training, which add a little fat-free mass;
          for joint pain and strength the results are mixed. The injectable peptides sold for recovery and muscle (BPC-157,
          TB-500, ipamorelin, CJC-1295) have little or no human evidence, and{" "}
          <strong>all of them are banned at all times</strong> under the 2026 WADA Prohibited List, as are growth hormone and
          MK-677. Collagen is not on the list, but any supplement can be contaminated.
        </p>
      </ShortAnswer>

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">How this ranking works</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The list is ordered by how strong the human evidence is, using the ratings on our{" "}
          <Link href="/science/topics/muscle" className="link">
            muscle
          </Link>{" "}
          and{" "}
          <Link href="/science/topics/joints" className="link">
            joints
          </Link>{" "}
          evidence pages. It does not measure how big a benefit is, and few of the studies were in competitive athletes. Under each
          entry we give its status on the{" "}
          <WadaLink>2026 WADA Prohibited List</WadaLink>, read on WADA&rsquo;s own website on {formatDate(WADA_CHECKED)}. The list
          changes every year; your sport&rsquo;s anti-doping organisation has the final word. Entries that share a rating are in
          an order that is our judgement: read them as ties. Nobody paid for a place on this page, and there are no affiliate
          links.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">The ranking</h2>
        <RankedList options={OPTIONS.map((o) => ({ ...o, extra: { label: "Anti-doping status (WADA 2026).", body: WADA[o.name] } }))} />
        <p className="mt-5 max-w-prose text-sm text-muted">
          Not ranked: tesamorelin and sermorelin (both named under S2.2.4 of the 2026 List; our evidence is in people with HIV for
          tesamorelin and we found no controlled trial of sermorelin), and other substances such as GHRP-2 and GHRP-6, which the
          List also names. Peptides not named on the List are not automatically allowed: WADA bans any substance without
          approval for human therapeutic use under S0, and substances similar in structure or effect to those listed under S2.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">If you are a tested athlete</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">Check every product, every year.</strong> The Prohibited List is updated each year and
            comes into force on 1 January. Your national anti-doping organisation can confirm a substance&rsquo;s status.
          </li>
          <li>
            <strong className="text-fg">Research peptides sold online:</strong> BPC-157, TB-500, ipamorelin and CJC-1295 are all
            prohibited at all times, are not approved medicines, and their products have documented quality problems; see the{" "}
            <Link href="/peptides/legal-status" className="link">
              legal status page
            </Link>{" "}
            and the{" "}
            <Link href="/science/topics/safety" className="link">
              safety page
            </Link>
            .
          </li>
          <li>
            <strong className="text-fg">Supplements:</strong> a listing with a sport-testing programme lowers, but does not
            remove, the risk of contamination. Check the exact product, flavour and lot in the programme&rsquo;s own directory, and
            if a lab report is offered, our{" "}
            <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
              COA guide
            </Link>{" "}
            explains how to read it.
          </li>
          <li>
            <strong className="text-fg">A medical need for a banned peptide</strong>, such as growth hormone deficiency, goes
            through a Therapeutic Use Exemption before use.
          </li>
        </ul>
      </section>

      <ProductsForGoal
        areas={["muscle", "joints", "tendons"]}
        title="Sport-tested products for muscle and joints"
        label="muscle, joints or tendons"
        sportOnly
        note={
          <>
            Sport-testing programmes here are NSF Certified for Sport and Informed Choice. WADA does not test or approve
            supplements, and says such schemes reduce but do not remove the risk of an inadvertent doping finding. Check your
            exact product, flavour and lot in the programme&rsquo;s own directory before use.
          </>
        }
      />

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
            { href: "/peptides/peptides-for-muscle-growth", label: "Peptides for muscle growth" },
            { href: "/peptides/peptides-for-joint-pain", label: "Peptides for joint pain" },
            { href: "/peptides/legal-status", label: "Are peptides legal?" },
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

      <RelatedGoals path="/peptides/peptides-for-athletes" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
