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

export const metadata: Metadata = {
  title: "Peptides for anti-aging: ranked by the evidence",
  description:
    "Do peptides slow ageing or extend life? Collagen, growth hormone, elamipretide, cosmetic peptides, MK-677, epitalon, MOTS-c, FOXO4-DRI and CJC-1295, ranked by the strength of the human studies.",
  alternates: { canonical: "/peptides/peptides-for-anti-aging" },
};

const REVIEWED = "2026-11-13";

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
    name: "Oral collagen peptides for skin ageing",
    level: "consistent",
    routes: ["oral"],
    topic: "skin",
    topicSubject: "Oral collagen peptides",
    shows: (
      <>
        Two meta-analyses of randomised trials (
        <PaperLink id="de-miranda-2021" via="doi">
          19 trials, 1,125 people
        </PaperLink>
        ;{" "}
        <PaperLink id="pu-2023" via="pmc">
          26 trials, 1,721 people
        </PaperLink>
        ) found better skin hydration and elasticity than placebo.
      </>
    ),
    notShown: (
      <>
        The trials had biases, so the size of the benefit is uncertain, and they measured skin, not ageing of the body or
        lifespan. See{" "}
        <Link href="/peptides/best-peptides-for-skin" className="link">
          peptides for skin, ranked
        </Link>
        .
      </>
    ),
  },
  {
    name: "Growth hormone injections in older adults",
    level: "mixed",
    routes: ["injected"],
    topic: "muscle",
    topicSubject: "Injected growth hormone itself in healthy adults (context for these peptides)",
    shows: (
      <>
        In healthy older people, growth hormone{" "}
        <PaperLink id="liu-2007" via="doi">
          added about 2 kg of lean body mass
        </PaperLink>
        .
      </>
    ),
    notShown: (
      <>
        It did not clearly improve strength, and it caused more swelling, joint pain and blood-sugar problems. Growth hormone
        is a protein hormone, not the peptides sold to release it, so this does not show what those peptides do.
      </>
    ),
  },
  {
    name: "Elamipretide (SS-31)",
    level: "mixed",
    routes: ["injected"],
    topic: "longevity",
    topicSubject: "Elamipretide (SS-31) in inherited mitochondrial diseases",
    shows: (
      <>
        In 10 people with the rare inherited disease Barth syndrome, an open-label extension reported{" "}
        <PaperLink id="thompson-2024" via="doi">
          better walking distance and heart measures over 168 weeks
        </PaperLink>
        . It is FDA-approved as Forzinity.
      </>
    ),
    notShown: (
      <>
        A placebo-controlled trial in 218 adults with mitochondrial myopathy found{" "}
        <PaperLink id="karaa-2023" via="pmc">
          no improvement in walking or fatigue
        </PaperLink>
        . None of the trials tested ageing in healthy people, and company employees are among the Barth syndrome authors.
      </>
    ),
  },
  {
    name: "Topical cosmetic peptides for wrinkles",
    level: "limited",
    routes: ["topical"],
    topic: "skin",
    topicSubject: "Topical cosmetic peptides (argireline, palmitoyl peptides and similar)",
    shows: (
      <>
        Small, short trials report smoother skin, for example{" "}
        <PaperLink id="wang-2013" via="doi">
          60 people using argireline around the eyes for 4 weeks
        </PaperLink>
        .
      </>
    ),
    notShown: <>The trials are small and short, and a review notes that argireline may not cross the skin well.</>,
  },
  {
    name: "Topical GHK-Cu (copper peptide)",
    level: "limited",
    routes: ["topical"],
    topic: "skin",
    topicSubject: "Topical GHK-Cu (copper peptide)",
    shows: <>Reviews describe effects on collagen and healing, mostly from cell studies.</>,
    notShown: (
      <>
        In the one small randomised trial we found, after laser resurfacing,{" "}
        <PaperLink id="miller-2006" via="doi">
          there was no objective difference
        </PaperLink>
        , only higher patient satisfaction. See{" "}
        <Link href="/peptides/ghk-cu" className="link">
          GHK-Cu: what the studies show
        </Link>
        .
      </>
    ),
  },
  {
    name: "MK-677 (ibutamoren)",
    level: "limited",
    routes: ["oral"],
    topic: "muscle",
    topicSubject: "Oral ghrelin mimetic MK-677 (ibutamoren)",
    shows: (
      <>
        In 65 healthy older adults, a year of MK-677{" "}
        <PaperLink id="nass-2008" via="pmc">
          increased fat-free mass
        </PaperLink>
        .
      </>
    ),
    notShown: (
      <>
        Strength and function did not change, fasting glucose and cortisol rose, and a trial in hip-fracture patients was{" "}
        <PaperLink id="adunsky-2011" via="doi">
          stopped early because of a heart-failure signal
        </PaperLink>
        . It is taken by mouth, not injected.
      </>
    ),
  },
  {
    name: "Epitalon, Epithalamin and Thymalin (Russian 'peptide bioregulators')",
    level: "limited",
    topic: "longevity",
    topicSubject: "Epithalamin, epitalon and Thymalin (Russian 'peptide bioregulators') for ageing and lifespan",
    shows: (
      <>
        Two Russian studies from one research group report{" "}
        <PaperLink id="khavinson-2003" via="pubmed">
          death rates cut by half or more among 266 older people
        </PaperLink>{" "}
        given Thymalin and Epithalamin, and{" "}
        <PaperLink id="korkushko-2006" via="doi">
          28% fewer deaths over 12 years
        </PaperLink>{" "}
        with Epithalamin in people with heart disease.
      </>
    ),
    notShown: (
      <>
        The abstracts give no group sizes, statistics or blinding, so these very large effects cannot be checked. A 2026 review
        finds{" "}
        <PaperLink id="jain-2026" via="pmc">
          no adequately powered randomised trial of epitalon
        </PaperLink>{" "}
        and calls it clinically unproven.
      </>
    ),
  },
  {
    name: "MOTS-c",
    level: "preclinical",
    topic: "longevity",
    topicSubject: "MOTS-c for ageing and physical decline",
    shows: (
      <>
        In mice, MOTS-c{" "}
        <PaperLink id="reynolds-2021" via="pmc">
          improved physical performance at all ages
        </PaperLink>
        , and in people exercise raises the body&rsquo;s own MOTS-c.
      </>
    ),
    notShown: <>Our searches found no trial that gave MOTS-c to people, so its effect and safety in humans are unknown.</>,
  },
  {
    name: "FOXO4-DRI (senolytic peptide)",
    level: "preclinical",
    topic: "longevity",
    topicSubject: "FOXO4-DRI and other senolytic peptides",
    shows: (
      <>
        A peptide designed to make senescent cells die{" "}
        <PaperLink id="krimpenfort-2017" via="doi">
          eased senescence-related tissue decline in mice
        </PaperLink>
        .
      </>
    ),
    notShown: <>Animal work only; we found no human trial.</>,
  },
  {
    name: "Ipamorelin and CJC-1295",
    level: "none",
    routes: ["injected"],
    topic: "muscle",
    topicSubject: "Ipamorelin and CJC-1295",
    shows: (
      <>
        In healthy volunteers, CJC-1295{" "}
        <PaperLink id="teichman-2006" via="doi">
          raised growth hormone and IGF-I for days to weeks
        </PaperLink>
        .
      </>
    ),
    notShown: (
      <>
        A higher hormone level is not a health benefit: we found no controlled trial of either with a body-composition,
        strength or ageing outcome. See{" "}
        <Link href="/peptides/cjc-1295" className="link">
          CJC-1295
        </Link>{" "}
        and{" "}
        <Link href="/peptides/ipamorelin" className="link">
          ipamorelin
        </Link>
        .
      </>
    ),
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is the best peptide for anti-aging?",
    a: "For skin, oral collagen peptides have the most consistent evidence: meta-analyses found better hydration and elasticity than placebo. For ageing of the body or lifespan, no peptide has good evidence; we found no trial showing any peptide slows ageing in healthy people.",
  },
  {
    q: "Does epitalon extend life?",
    a: "Russian studies from one research group report large drops in deaths with the related pineal extract Epithalamin, but the abstracts give no group sizes or statistics, and a 2026 review finds no adequately powered randomised trial of epitalon. Its effect on human lifespan is unproven.",
  },
  {
    q: "Is MOTS-c an anti-aging peptide?",
    a: "It improved physical performance in mice of all ages, and exercise raises the body's own MOTS-c in people. Our searches found no trial that gave MOTS-c to people.",
  },
  {
    q: "Do growth hormone peptides reverse ageing?",
    a: "Growth hormone itself added about 2 kg of lean mass in older adults but not clear strength, with more side effects. Peptides that release growth hormone, such as CJC-1295 and ipamorelin, raise hormone levels, but we found no trial showing a body-composition, strength or ageing benefit, and MK-677 raised blood sugar and was linked to a heart-failure signal in one trial.",
  },
  {
    q: "Are anti-aging peptides legal?",
    a: "It depends on the peptide. Elamipretide is FDA-approved as Forzinity; collagen is sold as a supplement. FDA's compounding page lists epitalon, MOTS-c and CJC-1295 among substances whose nominations were withdrawn and keeps MK-677 (ibutamoren) and ipamorelin in Category 2. See our legal status page.",
  },
];

export default function PeptidesForAntiAgingPage() {
  // The ratings on this page must match the topic pages. A mismatch fails the build instead of publishing a contradiction.
  for (const o of OPTIONS) {
    const r = TOPICS[o.topic].ratings.find((x) => x.subject === o.topicSubject);
    if (!r || r.level !== o.level) {
      throw new Error(`peptides-for-anti-aging: "${o.name}" does not match its rating "${o.topicSubject}" on the ${o.topic} topic page`);
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
            { "@type": "ListItem", position: 3, name: "Peptides for anti-aging", item: absoluteUrl("/peptides/peptides-for-anti-aging") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Peptides for anti-aging
      </nav>
      <PageKindLabel path="/peptides/peptides-for-anti-aging" />
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">Peptides for anti-aging and longevity, ranked by the evidence</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <ShortAnswer className="mt-6">
        <p className="max-w-prose text-lg leading-relaxed sm:text-xl sm:leading-relaxed [text-wrap:pretty]">
          We found no trial showing that any peptide slows ageing or extends life in healthy people. For skin, oral collagen
          peptides have consistent evidence for hydration and elasticity. Longevity peptides such as epitalon, MOTS-c and
          FOXO4-DRI rest on animal work or Russian studies without checkable details, and peptides that release growth hormone
          raise hormone levels without proven benefit.
        </p>
      </ShortAnswer>

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">How this ranking works</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The list is ordered by how strong the human evidence is, using the ratings on our{" "}
          <Link href="/science/topics/longevity" className="link">
            ageing and longevity
          </Link>
          ,{" "}
          <Link href="/science/topics/skin" className="link">
            skin
          </Link>{" "}
          and{" "}
          <Link href="/science/topics/muscle" className="link">
            muscle
          </Link>{" "}
          evidence pages. It does not measure how big a benefit is, how safe something is, or whether one option beats another.
          Options that share a rating are ties, and their order is our judgement. The top-rated option measures skin, not the
          ageing of the body, and several entries were tested only in people with a disease, so read what each one measured. It
          ranks types of peptide, not products. Nobody paid for a place on this page, and there are no affiliate links.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">The ranking</h2>
        <RankedList options={OPTIONS} />
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">If you are choosing</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">Unapproved injectables sold for longevity:</strong> epitalon, MOTS-c, CJC-1295 and
            similar products are not FDA-approved, human safety data are scarce, and the{" "}
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
            <strong className="text-fg">Growth-hormone peptides:</strong> raising growth hormone has side effects of its own,
            including blood-sugar changes, and MK-677 was linked to a heart-failure signal in one trial.
          </li>
          <li>
            <strong className="text-fg">Skin:</strong> collagen trials measured hydration and elasticity over weeks to months;
            they do not show an effect on how long you live.
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
            { href: "/science/topics/longevity", label: "Full ageing and longevity evidence" },
            { href: "/peptides/best-peptides-for-skin", label: "Peptides for skin, ranked" },
            { href: "/peptides/peptides-for-muscle-growth", label: "Peptides for muscle growth" },
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

      <RelatedGoals path="/peptides/peptides-for-anti-aging" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
