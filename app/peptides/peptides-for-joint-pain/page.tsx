import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout, CARD } from "@/components/ui";
import { RatingBadge } from "@/components/evidence-meter";
import { TOPICS, type Level } from "@/lib/topics";
import { RelatedGoals } from "@/components/guide-links";

export const metadata: Metadata = {
  title: "Peptides for joint pain: ranked by the evidence",
  description:
    "Do collagen peptides help joint pain? Collagen for osteoarthritis, sports-related knee pain and tendons, UC-II, BPC-157, TB-500 and marine collagen, ranked by the strength of the human studies, with what each does not show.",
  alternates: { canonical: "/peptides/peptides-for-joint-pain" },
};

const REVIEWED = "2026-11-11";

type Option = {
  name: string;
  level: Level;
  /** Rating(s) on the joints topic page this entry mirrors (every one is checked at build time below). */
  topicSubjects: string[];
  shows: React.ReactNode;
  notShown: React.ReactNode;
};

const OPTIONS: Option[] = [
  {
    name: "Oral collagen for osteoarthritis",
    level: "mixed",
    topicSubjects: ["Oral collagen for osteoarthritis symptoms"],
    shows: (
      <>
        A 2019 meta-analysis of placebo-controlled trials found lower total WOMAC scores and lower pain with collagen, but
        no difference on the WOMAC pain and function subscores (
        <PaperLink id="garcia-coronado-2019" via="doi">
          García-Coronado 2019
        </PaperLink>
        ). A 2025 update pooled{" "}
        <PaperLink id="simental-mendia-2025" via="doi">
          11 trials with 870 people
        </PaperLink>{" "}
        and favoured collagen for both pain and function.
      </>
    ),
    notShown: (
      <>
        The 2025 trials disagreed widely (I² of 75% for function and 88% for pain), so the pooled figure hides a large spread.
        A 68-patient trial of a hydrolysed-plus-UC-II tablet found{" "}
        <PaperLink id="yuenyongviwat-2025" via="pmc">
          no difference from placebo
        </PaperLink>{" "}
        at 12 weeks, with pain falling in both groups. The abstracts do not say which collagen products, doses or trial lengths
        were pooled. More:{" "}
        <Link href="/peptides/collagen-peptides-benefits" className="link">
          collagen peptide benefits
        </Link>
        .
      </>
    ),
  },
  {
    name: "Oral collagen for exercise-related knee and joint pain",
    level: "mixed",
    topicSubjects: ["Oral collagen peptides for exercise-related knee and joint pain (no arthritis)"],
    shows: (
      <>
        In 180 active 18 to 30-year-olds, 5 g a day of collagen peptides for 12 weeks was followed by a bigger fall in
        exercise-related knee pain than placebo (21.9 mm against 15.6 mm;{" "}
        <PaperLink id="zdzieblik-2021-knee" via="pmc">
          Zdzieblik 2021
        </PaperLink>
        ). In 182 adults with knee or hip pain during daily activities, 5 g a day reduced pain at rest, walking, climbing
        stairs and kneeling (
        <PaperLink id="schulze-2024" via="pmc">
          Schulze 2024
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
        Pain also fell by 15.6 mm on placebo in the first trial, so most of the improvement happened without collagen. In 167
        people with a median age of 63 and knee pain, 10 g a day made{" "}
        <PaperLink id="bongers-2020" via="doi">
          no difference from placebo
        </PaperLink>
        . A third of the athletes in the 24-week trial could not be evaluated, and many outcomes were tested. One author of
        each of the first two trials has ties to a collagen-peptide maker. None of these had diagnosed joint disease.
      </>
    ),
  },
  {
    name: "Undenatured type II collagen (UC-II)",
    level: "mixed",
    topicSubjects: ["Undenatured type II collagen (UC-II, not a peptide) for knee osteoarthritis"],
    shows: (
      <>
        In 191 people with knee osteoarthritis, 40 mg a day of UC-II for 180 days lowered the total WOMAC score more than
        placebo and more than glucosamine plus chondroitin (
        <PaperLink id="lugo-2016" via="pmc">
          Lugo 2016
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        UC-II is a whole protein from chicken breastbone cartilage in a small dose, not a collagen peptide, so these results
        do not apply to collagen peptide powders. A later trial combining it with hydrolysed collagen found no benefit over
        placebo (see above), and the abstract of the 2016 trial gives no funding statement.
      </>
    ),
  },
  {
    name: "Oral collagen for tendon problems",
    level: "limited",
    topicSubjects: ["Oral collagen for tendon problems (tendinopathy)"],
    shows: (
      <>
        In a 20-patient pilot crossover trial of Achilles tendinopathy, symptom scores rose more while patients were on
        collagen peptides alongside calf-strengthening exercise (
        <PaperLink id="praet-2019" via="pmc">
          Praet 2019
        </PaperLink>
        ). A 2022 systematic review calls the supplement studies{" "}
        <PaperLink id="hijlkema-2022" via="pmc">
          promising
        </PaperLink>
        , particularly those with collagen peptides.
      </>
    ),
    notShown: (
      <>
        Twenty patients is very small, everyone also did the exercise programme, and the trial was funded by Gelita AG. The
        review says high-quality studies are scarce and varied, and declines to make dietary recommendations.
      </>
    ),
  },
  {
    name: "Injectable research peptides (BPC-157 and TB-500)",
    level: "preclinical",
    topicSubjects: ["BPC-157 for tendon, ligament and joint problems", "TB-500 for tendon and ligament injury"],
    shows: (
      <>
        A 2026 rat study of a cut Achilles tendon found{" "}
        <PaperLink id="bicer-2026" via="doi">
          stronger tendons with TB-500
        </PaperLink>{" "}
        and numerically better, non-significant results with BPC-157. A systematic review found 35 of 36 studies were{" "}
        <PaperLink id="vasireddi-2025" via="pmc">
          preclinical
        </PaperLink>
        , and the human evidence on BPC-157 is{" "}
        <PaperLink id="poolton-2026" via="doi">
          three small uncontrolled studies with 30 people
        </PaperLink>
        , one of them 16 people with knee pain.
      </>
    ),
    notShown: (
      <>
        No randomised human trial was found. TB-500 is described by a{" "}
        <PaperLink id="tham-2026" via="doi">
          2026 orthopaedic review
        </PaperLink>{" "}
        as a distinct fragment that is not validated as equivalent to thymosin beta-4, which the rat study calls it, and that
        review raises concerns about the identity, purity and sterility of products and concludes routine use cannot be
        recommended. Rat doses do not translate to people. See{" "}
        <Link href="/peptides/bpc-157" className="link">
          BPC-157: what the studies show
        </Link>{" "}
        and the{" "}
        <Link href="/peptides/legal-status" className="link">
          legal status page
        </Link>
        .
      </>
    ),
  },
  {
    name: "Oral marine (fish-derived) collagen peptides",
    level: "none",
    topicSubjects: ["Oral marine (fish-derived) collagen peptides for joints and tendons"],
    shows: (
      <>
        Our PubMed searches on 9 November 2026 found laboratory and biomaterial studies of fish collagen for cartilage and
        bone, but no controlled human trial of swallowing marine collagen peptides for joint or tendon problems.
      </>
    ),
    notShown: (
      <>
        That is not proof none exists, and it is not a finding that marine collagen is worse: the trials above used other
        collagen products, and no trial compares marine with bovine collagen. See{" "}
        <Link href="/peptides/marine-vs-bovine-collagen" className="link">
          marine vs bovine collagen
        </Link>
        .
      </>
    ),
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Do collagen peptides help joint pain?",
    a: "Results are mixed. Two meta-analyses of osteoarthritis trials favoured collagen for some measures, though one found no difference on the WOMAC pain and function subscores and the other found large differences between trials. For exercise-related knee pain, two 12-week trials of about 180 people each found less pain than placebo, and a trial in 167 older adults found no difference.",
  },
  {
    q: "How much collagen was used in the joint trials?",
    a: "We do not recommend a dose. The trials we summarise used 5 g a day of collagen peptides in two 12-week trials and 10 g a day in two others, and 40 mg a day for UC-II, which is a different product.",
  },
  {
    q: "Does BPC-157 heal tendons or joints?",
    a: "In animals it has been reported to help, and in a 2026 rat study of Achilles tendon repair its results were numerically better but not significant. The human evidence is three small uncontrolled studies with 30 people in total, and we found no randomised trial.",
  },
  {
    q: "Is UC-II better than collagen peptides?",
    a: "No trial we found compares them. UC-II is a whole protein taken in a small dose, not a collagen peptide, and the one trial of UC-II combined with hydrolysed collagen found no difference from placebo.",
  },
  {
    q: "Can collagen help tendon pain?",
    a: "A 20-patient pilot trial in Achilles tendinopathy reported larger symptom-score gains on collagen peptides alongside calf-strengthening exercise, and a 2022 systematic review called such studies promising but said high-quality evidence is scarce. It is too early to say.",
  },
  {
    q: "Does marine collagen help joints?",
    a: "We found no controlled human trial of marine collagen peptides for joint or tendon problems, so we cannot say. That is a gap in the evidence, not a finding that it does not work.",
  },
];

export default function PeptidesForJointPainPage() {
  const joints = TOPICS.joints;
  // The ratings on this page must match the topic page. A mismatch fails the build instead of publishing a contradiction.
  for (const o of OPTIONS) {
    for (const subject of o.topicSubjects) {
      const r = joints.ratings.find((x) => x.subject === subject);
      if (!r || r.level !== o.level) {
        throw new Error(`peptides-for-joint-pain: "${o.name}" does not match its rating "${subject}" on the joints topic page`);
      }
    }
  }

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
            { "@type": "ListItem", position: 3, name: "Peptides for joint pain", item: absoluteUrl("/peptides/peptides-for-joint-pain") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Peptides for joint pain
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">Peptides for joint pain, ranked by the evidence</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          Collagen has the most human evidence of the peptide-type supplements sold for joints, but the results are mixed:
          meta-analyses in osteoarthritis disagree with each other on some measures, trials in people with sports-related knee
          pain split between benefit and no difference, and the placebo groups often improved too. Collagen for tendon
          problems rests on one 20-patient pilot. BPC-157 and TB-500 have animal data and no randomised human trial, and we
          found no human trial of marine collagen for joints.
        </p>
      </Callout>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">How this ranking works</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The list is ordered by how strong the human evidence is, using the ratings on our{" "}
          <Link href="/science/topics/joints" className="link">
            joints evidence page
          </Link>
          . It does not measure how big a benefit is, how safe something is, or whether one option beats another, because the
          studies barely compare them. Options with the same rating are ordered by our judgement, so read the ties as ties.
          It ranks types of supplement, not products. The trials cover different problems: diagnosed knee osteoarthritis,
          knee or hip pain in people without arthritis, and tendon pain, and a result in one does not carry over to another.
          Nobody paid for a place on this page, and there are no affiliate links.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">The ranking</h2>
        <ol className="mt-6 grid gap-5">
          {OPTIONS.map((o, i) => (
            <li key={o.name} className={CARD}>
              <div className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-bg text-lg font-bold"
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold leading-tight">
                    <span className="sr-only">Rank {i + 1}: </span>
                    {o.name}
                  </h3>
                  <div className="mt-3">
                    <RatingBadge level={o.level} measures="benefit" />
                  </div>
                </div>
              </div>
              <p className="mt-5 max-w-prose text-soft [text-wrap:pretty]">
                <strong className="text-fg">What the studies show.</strong> {o.shows}
              </p>
              <p className="mt-3 max-w-prose text-soft [text-wrap:pretty]">
                <strong className="text-fg">What they do not show.</strong> {o.notShown}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-5 max-w-prose text-sm text-muted">
          Not covered: glucosamine, chondroitin, hyaluronic acid and other non-peptide supplements, collagen in joints other
          than the knee and hip, and bone density. That is a gap in our coverage, not a finding.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">If you are choosing</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">A collagen supplement:</strong> the trials tested specific products, and the abstracts
            rarely say which. Look for a lot-specific lab report; our{" "}
            <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
              COA guide
            </Link>{" "}
            explains how to read one, and we checked{" "}
            <Link href="/peptides/best-collagen-peptides" className="link">
              which collagen brands publish batch test results
            </Link>
            .
          </li>
          <li>
            <strong className="text-fg">Fish allergy:</strong> be careful with fish-derived collagen; a case report describes{" "}
            <PaperLink id="ueno-2020" via="pmc">
              anaphylaxis in a child with fish allergy
            </PaperLink>
            .
          </li>
          <li>
            <strong className="text-fg">Injected &ldquo;research&rdquo; peptides:</strong> we found no randomised human trial for
            tendons or joints, and the{" "}
            <Link href="/peptides/legal-status" className="link">
              legal picture
            </Link>{" "}
            for unapproved compounds is changing.
          </li>
        </ul>
        <p className="mt-5 max-w-prose text-sm text-muted">
          We did not search for trials comparing collagen with exercise, physiotherapy or anti-inflammatory drugs, so this page
          cannot tell you how a supplement compares with them. Joint pain has many causes, and a clinician can tell you which
          one you have.
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
            { href: "/science/topics/joints", label: "Full joints evidence and studies" },
            { href: "/peptides/best-peptides-for-skin", label: "Best peptides for skin, ranked" },
            { href: "/peptides/peptides-for-hair-growth", label: "Peptides for hair growth, ranked" },
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

      <RelatedGoals path="/peptides/peptides-for-joint-pain" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
