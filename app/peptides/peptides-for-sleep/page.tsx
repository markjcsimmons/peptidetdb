import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout, CARD } from "@/components/ui";
import { RatingBadge } from "@/components/evidence-meter";
import { DisclosureNote } from "@/components/disclosure-note";
import { TOPICS, type Level } from "@/lib/topics";

export const metadata: Metadata = {
  title: "Peptides for sleep: ranked by the evidence",
  description:
    "Do peptides help you sleep? Casein hydrolysate, collagen before bed, fish hydrolysate, DSIP and epitalon, ranked by the strength of the human studies, with what each does not show.",
  alternates: { canonical: "/peptides/peptides-for-sleep" },
};

const REVIEWED = "2026-11-11";

type Option = {
  name: string;
  level: Level;
  /** Rating on the brain topic page this entry mirrors (checked at build time below). */
  topicSubject: string;
  shows: React.ReactNode;
  notShown: React.ReactNode;
};

const OPTIONS: Option[] = [
  {
    name: "Casein hydrolysate (Lactium)",
    level: "limited",
    topicSubject: "Casein hydrolysate (Lactium) for sleep",
    shows: (
      <>
        In 36 people with chronic insomnia, 4 weeks of casein hydrolysate was followed by a larger fall in a sleep-disorder
        score than placebo, and by a shorter time to fall asleep on sleep-laboratory recordings (7.7 minutes shorter against
        6.1 minutes longer on placebo;{" "}
        <PaperLink id="chang-2024" via="doi">
          Chang 2024
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        Most of the improvements in that trial were changes from baseline, which placebo may share. A 40-person, 8-week trial
        of Lactium combined with L-theanine found{" "}
        <PaperLink id="lim-2024" via="pmc">
          no difference on the main sleep questionnaires
        </PaperLink>
        , only on some diary measures, and the L-theanine means the peptide&rsquo;s own effect is unknown. Both trials are small.
      </>
    ),
  },
  {
    name: "Collagen peptides before bed",
    level: "limited",
    topicSubject: "Collagen peptides before bed for sleep",
    shows: (
      <>
        In 13 active men with sleep complaints, 15 g of collagen peptides an hour before bed for 7 nights was followed by
        fewer awakenings than placebo on sleep recordings (21.3 against 29.3;{" "}
        <PaperLink id="thomas-2024" via="pmc">
          Thomas 2024
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        Sleep length, time to fall asleep and sleep efficiency did not change, many outcomes were tested, the funders supplied
        the supplement, and two authors are employees of Rousselot BV. A 2026 scoping review found only a handful of collagen trials with sleep outcomes, and
        trials against alpha-lactalbumin did not show collagen to be{" "}
        <PaperLink id="fan-2026" via="doi">
          better
        </PaperLink>
        . The idea that its glycine content helps is plausible but untested.
      </>
    ),
  },
  {
    name: "Fish hydrolysate",
    level: "limited",
    topicSubject: "Fish hydrolysate for sleep quality",
    shows: (
      <>
        In a four-week crossover trial, sleep scores improved from baseline on fish hydrolysate (
        <PaperLink id="eckert-2024" via="doi">
          Eckert 2024
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        There was no significant difference between fish hydrolysate and placebo, so the improvement cannot be credited to the
        supplement. The trial was fully sponsored by the ingredient&rsquo;s maker. See{" "}
        <Link href="/peptides/oral-marine-peptides" className="link">
          do oral marine peptides work?
        </Link>
      </>
    ),
  },
  {
    name: "DSIP (delta sleep-inducing peptide)",
    level: "limited",
    topicSubject: "DSIP (delta sleep-inducing peptide) for insomnia",
    shows: (
      <>
        In 14 patients with severe chronic insomnia, injected DSIP for 7 nights was followed by{" "}
        <PaperLink id="schneider-helmert-1987" via="doi">
          substantial improvement in night sleep
        </PaperLink>{" "}
        and daytime alertness, according to its author.
      </>
    ),
    notShown: (
      <>
        Two other trials from the same period found little: a 16-patient trial concluded DSIP is{" "}
        <PaperLink id="bes-1992" via="doi">
          not likely to be of major therapeutic benefit
        </PaperLink>
        , and a crossover trial found the improvement{" "}
        <PaperLink id="monti-1987" via="pubmed">
          of little clinical significance
        </PaperLink>
        . All used injected DSIP, two of them into a vein, in the 1980s and early 1990s, our searches found no modern trial, and a 2006 review
        calls the case for DSIP as a sleep factor{" "}
        <PaperLink id="kovalzon-2006" via="doi">
          extremely poorly documented
        </PaperLink>
        . Results from a sleep laboratory cannot be applied to unapproved products sold online, whose identity and purity vary;
        see the{" "}
        <Link href="/peptides/legal-status" className="link">
          legal status page
        </Link>
        .
      </>
    ),
  },
  {
    name: "Epitalon",
    level: "none",
    topicSubject: "Epitalon for sleep",
    shows: <>Our PubMed searches found no human trial of epitalon with a sleep outcome.</>,
    notShown: (
      <>
        A 2026 review says its human evidence is limited to small physiological or biomarker studies and calls it{" "}
        <PaperLink id="jain-2026" via="pmc">
          biologically active but clinically unproven
        </PaperLink>
        . That is not proof that no sleep study exists, and it is not a finding that epitalon does not work.
      </>
    ),
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Do peptides help you sleep?",
    a: "No peptide has strong human evidence for sleep. The oral options, casein hydrolysate and collagen taken before bed, each have one or two small trials with mixed results. DSIP, the best-known sleep peptide, has a few small injected trials from 1987 to 1992 that disagree, and we found no human sleep trial of epitalon.",
  },
  {
    q: "Does DSIP work for sleep?",
    a: "The evidence is old and conflicting. One trial in 14 patients reported substantial improvement, while a 16-patient trial concluded DSIP is not likely to be of major therapeutic benefit and a crossover trial found the improvement of little clinical significance. All used injected DSIP, and we found no modern trial.",
  },
  {
    q: "Does collagen help you sleep?",
    a: "Possibly a little. A crossover trial in 13 active men found fewer awakenings after 15 g of collagen peptides before bed, but no change in how long they slept or how fast they fell asleep. A 2026 scoping review found few collagen sleep trials and none showing it beat alpha-lactalbumin.",
  },
  {
    q: "Does selank help sleep?",
    a: "The selank trials we summarise were in anxiety disorders, and none is a sleep trial in our summary. See the selank page for what they show.",
  },
  {
    q: "Is epitalon good for sleep?",
    a: "We found no human trial of epitalon with a sleep outcome. A 2026 review calls it biologically active but clinically unproven.",
  },
];

export default function PeptidesForSleepPage() {
  const brain = TOPICS.brain;
  // The ratings on this page must match the topic page. A mismatch fails the build instead of publishing a contradiction.
  for (const o of OPTIONS) {
    const r = brain.ratings.find((x) => x.subject === o.topicSubject);
    if (!r || r.level !== o.level) {
      throw new Error(`peptides-for-sleep: "${o.name}" does not match its rating "${o.topicSubject}" on the brain topic page`);
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
            { "@type": "ListItem", position: 3, name: "Peptides for sleep", item: absoluteUrl("/peptides/peptides-for-sleep") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Peptides for sleep
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">Peptides for sleep, ranked by the evidence</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <DisclosureNote>
        This page covers a product category that includes products Pürblack sells, so read it with that in mind. The ranking
        follows the studies, every claim links to the study, and no product is named.
      </DisclosureNote>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          No peptide has strong human evidence for sleep. Casein hydrolysate and collagen taken before bed each have one or two
          small trials with mixed results, and fish hydrolysate did not beat placebo. DSIP, the best-known sleep peptide, has a
          few small injected trials from 1987 to 1992 that disagree with each other, and we found no human sleep trial of
          epitalon.
        </p>
      </Callout>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">How this ranking works</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The list is ordered by how strong the human evidence is, using the ratings on our{" "}
          <Link href="/science/topics/brain" className="link">
            sleep, memory and stress evidence page
          </Link>
          . It does not measure how big a benefit is, how safe something is, or whether one option beats another, because the
          studies do not compare them. Four of the five options share the same rating, so their order is our judgement, based
          on how recent and how large the trials are: read them as ties. It ranks types of peptide, not products. The trials
          tested people with insomnia, people with sleep complaints and healthy adults, and a result in one group does not
          carry over to another. Nobody paid for a place on this page, and there are no affiliate links.
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
          Not covered: melatonin, the amino acid glycine, magnesium, herbal sleep aids and sleep medicines, which are not
          peptides, and anxiety peptides such as selank (see{" "}
          <Link href="/peptides/selank" className="link">
            selank: what the studies show
          </Link>
          ).
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">If you are choosing</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">An oral supplement:</strong> the trials tested specific products, and one combined the
            peptide with L-theanine. We do not recommend a dose. If a test report is offered, our{" "}
            <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
              COA guide
            </Link>{" "}
            explains how to read it, and we checked{" "}
            <Link href="/peptides/best-collagen-peptides" className="link">
              which collagen brands publish batch test results
            </Link>
            .
          </li>
          <li>
            <strong className="text-fg">Fish allergy:</strong> be careful with fish-derived products; a case
            report describes{" "}
            <PaperLink id="ueno-2020" via="pmc">
              anaphylaxis in a child with fish allergy
            </PaperLink>{" "}
            after fish collagen tablets.
          </li>
          <li>
            <strong className="text-fg">DSIP and epitalon sold online:</strong> they are unapproved compounds, the human
            evidence is thin, and the{" "}
            <Link href="/peptides/legal-status" className="link">
              legal picture
            </Link>{" "}
            is changing.
          </li>
        </ul>
        <p className="mt-5 max-w-prose text-sm text-muted">
          We did not search for trials comparing these with melatonin, sleep hygiene or cognitive behavioural therapy for
          insomnia, so this page cannot tell you how they compare. Trouble sleeping that lasts for weeks has many possible
          causes, and a clinician can tell you which one you have.
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
            { href: "/science/topics/brain", label: "Full sleep, memory and stress evidence" },
            { href: "/peptides/peptides-for-joint-pain", label: "Peptides for joint pain, ranked" },
            { href: "/peptides/oral-marine-peptides", label: "Do oral marine peptides work?" },
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

      <p className="mt-10 text-sm text-muted">
        {SITE.disclosure} {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
