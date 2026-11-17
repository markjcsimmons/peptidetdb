import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { CARD, ShortAnswer } from "@/components/ui";
import { LEVEL_LABEL, TOPICS, type Level, type TopicRating } from "@/lib/topics";
import { STUDIES, TOPIC_LABEL, type PeptideId, type Topic } from "@/lib/studies";
import { PEPTIDE_STATUS, STATUS_CHECKED, STATUS_LABEL } from "@/lib/peptide-status";
import { EvidenceMeter, LEVEL_ORDER, RatingBadge, levelTone } from "@/components/evidence-meter";
import { StatusChip } from "@/components/profile-facts";
import { PageKindLabel, RelatedGoals } from "@/components/guide-links";
import { PageContents } from "@/components/page-contents";

export const metadata: Metadata = {
  title: "Most popular peptides, and what the evidence shows",
  description:
    "The 19 most-searched peptides in the US, from tirzepatide, semaglutide and collagen to BPC-157, MOTS-c and TB-500, with the best and least-supported use of each, its US status and how many studies we summarised.",
  alternates: { canonical: "/peptides/most-popular-peptides" },
};

const PATH = "/peptides/most-popular-peptides";
const REVIEWED = "2026-11-14";
/** Date of the Semrush exports in peptide_keyword_workbook.xlsx (US database). */
const SEARCHES_DATED = "2026-11-09";

type Entry = {
  id: PeptideId;
  /** Display name. */
  name: string;
  /** The keyword whose volume we use: the peptide's own name. */
  keyword: string;
  /** Semrush estimate of average monthly US Google searches for `keyword`. */
  searches: number;
  /** Closely related searches, shown for context and not added to `searches`. */
  related?: { keyword: string; searches: number }[];
  /** Benefit ratings on topic pages that are about this peptide (looked up at build time). */
  ratings: [Topic, string][];
  /** One or two sentences restating what the linked pages say. No new findings. */
  note: React.ReactNode;
  /** Where to read more. */
  more: { href: string; label: string };
};

/** Ordered by searches, highest first (checked below). Volumes from peptide_keyword_workbook.xlsx, Keywords sheet. */
const ENTRIES: Entry[] = [
  {
    id: "tirzepatide",
    name: "Tirzepatide",
    keyword: "tirzepatide",
    searches: 823000,
    ratings: [
      ["weight", "Prescription semaglutide and tirzepatide for weight loss"],
      ["blood-pressure", "Prescription GLP-1 drugs (semaglutide, tirzepatide) and blood pressure"],
      ["weight", "Muscle (lean mass) during GLP-1 treatment"],
      ["mens-health", "GLP-1 drugs (semaglutide, liraglutide, tirzepatide) for testosterone in men with obesity-related low testosterone"],
    ],
    note: (
      <>
        A prescription drug (Mounjaro, Zepbound). Large manufacturer-funded trials found average weight loss of up to 20.9%
        over 72 weeks. How much of the weight lost is muscle is the open question.
      </>
    ),
    more: { href: "/peptides/for-weight-loss", label: "Peptides for weight loss" },
  },
  {
    id: "semaglutide",
    name: "Semaglutide",
    keyword: "semaglutide",
    searches: 301000,
    ratings: [
      ["weight", "Prescription semaglutide and tirzepatide for weight loss"],
      ["weight", "Semaglutide and cardiovascular events in adults with heart disease and obesity"],
      ["oral-peptides", "Oral semaglutide tablet (a peptide drug with an absorption enhancer) for weight loss"],
      ["blood-pressure", "Prescription GLP-1 drugs (semaglutide, tirzepatide) and blood pressure"],
      ["womens-health", "GLP-1 drugs (liraglutide, semaglutide) for weight in women with PCOS"],
      ["weight", "Muscle (lean mass) during GLP-1 treatment"],
      ["womens-health", "GLP-1 drugs for periods, hormones and fertility in PCOS"],
      ["mens-health", "GLP-1 drugs (semaglutide, liraglutide, tirzepatide) for testosterone in men with obesity-related low testosterone"],
    ],
    note: (
      <>
        A prescription drug (Ozempic, Wegovy, Rybelsus) with large trials for weight loss and, in people with heart disease
        and obesity, cardiovascular events. The tablet form is absorbed only because it contains an absorption enhancer.
      </>
    ),
    more: { href: "/peptides/for-weight-loss", label: "Peptides for weight loss" },
  },
  {
    id: "collagen",
    name: "Collagen peptides",
    keyword: "collagen peptides",
    searches: 135000,
    related: [{ keyword: "hydrolyzed collagen", searches: 14800 }],
    ratings: [
      ["skin", "Oral collagen peptides"],
      ["muscle", "Oral collagen peptides with resistance training: fat-free mass"],
      ["muscle", "Oral collagen peptides with resistance training: strength"],
      ["joints", "Oral collagen for osteoarthritis symptoms"],
      ["joints", "Oral collagen peptides for exercise-related knee and joint pain (no arthritis)"],
      ["womens-health", "Oral collagen peptides for bone density after menopause"],
      ["joints", "Oral collagen for tendon problems (tendinopathy)"],
      ["hair", "Oral collagen peptides for hair"],
      ["brain", "Collagen peptides before bed for sleep"],
      ["gut", "Oral collagen peptides for gut health, bloating or gut barrier"],
    ],
    note: (
      <>
        The one supplement in the top ten with consistent trial results: for skin hydration and elasticity, and for fat-free
        mass alongside resistance training. The effects are small, and several trials have a high risk of bias or ties to
        collagen makers.
      </>
    ),
    more: { href: "/peptides/collagen-peptides", label: "Collagen peptides: what the evidence shows" },
  },
  {
    id: "tesamorelin",
    name: "Tesamorelin",
    keyword: "tesamorelin",
    searches: 110000,
    ratings: [["muscle", "Tesamorelin (approved for abdominal fat in HIV)"]],
    note: (
      <>
        A prescription drug (Egrifta) approved for extra abdominal fat in people with HIV. Its randomised trials are in that
        group; we found no trial in healthy people training for muscle.
      </>
    ),
    more: { href: "/peptides/peptides-for-muscle-growth", label: "Peptides for muscle growth" },
  },
  {
    id: "sermorelin",
    name: "Sermorelin",
    keyword: "sermorelin",
    searches: 110000,
    ratings: [],
    note: (
      <>
        Not rated. Our searches found no controlled trial, but we did not search as widely as for the others. Reviews we
        summarised group it with the growth-hormone-axis peptides sold as research compounds, whose claimed benefits they call{" "}
        <PaperLink id="dominikowski-2026" via="pmc">
          uncertain
        </PaperLink>
        .
      </>
    ),
    more: { href: "/peptides/peptides-for-muscle-growth", label: "Peptides for muscle growth" },
  },
  {
    id: "ghk-cu",
    name: "GHK-Cu",
    keyword: "GHK-Cu",
    searches: 60500,
    ratings: [["skin", "Topical GHK-Cu (copper peptide)"]],
    note: (
      <>
        A copper peptide used in skin creams. Most of the work is in cells and animals; the one small randomised skin trial we
        read found no objective difference. Injected GHK-Cu has no trial we found.
      </>
    ),
    more: { href: "/peptides/ghk-cu", label: "GHK-Cu profile" },
  },
  {
    id: "bpc-157",
    name: "BPC-157",
    keyword: "BPC-157",
    searches: 49500,
    ratings: [
      ["joints", "BPC-157 for tendon, ligament and joint problems"],
      ["gut", "BPC-157 for gut conditions (ulcers, colitis, fistulas)"],
      ["muscle", "BPC-157 and other research peptides"],
      ["hair", "BPC-157"],
    ],
    note: (
      <>
        Mostly animal evidence. A 2026 systematic review found three small uncontrolled human studies with 30 people in all,
        and no randomised trial (
        <PaperLink id="poolton-2026" via="doi">
          Poolton 2026
        </PaperLink>
        ).
      </>
    ),
    more: { href: "/peptides/bpc-157", label: "BPC-157 profile" },
  },
  {
    id: "ipamorelin",
    name: "Ipamorelin",
    keyword: "ipamorelin",
    searches: 40500,
    related: [{ keyword: "CJC-1295 ipamorelin", searches: 12100 }],
    ratings: [["muscle", "Ipamorelin and CJC-1295"]],
    note: (
      <>
        It triggers a brief release of growth hormone in healthy volunteers, and its one placebo-controlled trial (after bowel
        surgery) found no significant benefit. No trial we found tests muscle.
      </>
    ),
    more: { href: "/peptides/ipamorelin", label: "Ipamorelin profile" },
  },
  {
    id: "kpv",
    name: "KPV",
    keyword: "KPV peptide",
    searches: 33100,
    ratings: [
      ["immune", "KPV (anti-inflammatory tripeptide) for gut and skin inflammation"],
      ["gut", "KPV for colitis"],
    ],
    note: <>An anti-inflammatory tripeptide studied in human cell lines and mice. Our searches found no human trial.</>,
    more: { href: "/peptides/kpv", label: "KPV profile" },
  },
  {
    id: "mots-c",
    name: "MOTS-c",
    keyword: "MOTS-c",
    searches: 27100,
    ratings: [["longevity", "MOTS-c for ageing and physical decline"]],
    note: (
      <>
        In mice it improved physical performance at all ages. Exercise raises the body&rsquo;s own MOTS-c, but our searches
        found no trial that gave MOTS-c to people.
      </>
    ),
    more: { href: "/peptides/peptides-for-anti-aging", label: "Peptides for anti-aging" },
  },
  {
    id: "semax",
    name: "Semax",
    keyword: "semax",
    searches: 22200,
    ratings: [
      ["brain", "Semax after stroke and for reduced blood flow to the brain"],
      ["eye", "Semax nasal drops for optic nerve disease"],
    ],
    note: (
      <>
        Russian studies after stroke and in optic nerve disease, none described as randomised or placebo-controlled. We found no
        trial of semax as a memory or focus aid in healthy people.
      </>
    ),
    more: { href: "/peptides/nootropic-peptides", label: "Nootropic peptides" },
  },
  {
    id: "cjc-1295",
    name: "CJC-1295",
    keyword: "CJC-1295",
    searches: 18100,
    related: [{ keyword: "CJC-1295 ipamorelin", searches: 12100 }],
    ratings: [["muscle", "Ipamorelin and CJC-1295"]],
    note: (
      <>
        Two 2006 trials in healthy adults found it raised growth hormone and IGF-I for days to weeks. A higher hormone level is
        not evidence of more muscle, and no trial we found tests muscle.
      </>
    ),
    more: { href: "/peptides/cjc-1295", label: "CJC-1295 profile" },
  },
  {
    id: "selank",
    name: "Selank",
    keyword: "selank",
    searches: 18100,
    ratings: [["brain", "Selank for anxiety disorders"]],
    note: (
      <>
        Three small Russian-language anxiety trials compared it with, or added it to, a benzodiazepine. None used a placebo.
      </>
    ),
    more: { href: "/peptides/selank", label: "Selank profile" },
  },
  {
    id: "tb-500",
    name: "TB-500",
    keyword: "TB-500",
    searches: 14800,
    ratings: [["joints", "TB-500 for tendon and ligament injury"]],
    note: (
      <>
        A seven-amino-acid fragment of thymosin beta-4, not the full protein. One rat tendon study and lab work; no human trial
        found.
      </>
    ),
    more: { href: "/peptides/tb-500", label: "TB-500 profile" },
  },
  {
    id: "thymosin-alpha-1",
    name: "Thymosin alpha-1",
    keyword: "thymosin alpha 1",
    searches: 9900,
    ratings: [
      ["immune", "Injected thymosin alpha-1 added to usual care in COPD flare-ups"],
      ["immune", "Injected thymosin alpha-1 for sepsis"],
      ["immune", "Injected thymosin alpha-1 for severe acute pancreatitis"],
      ["immune", "Injected thymosin alpha-1 for hepatitis B"],
      ["immune", "Thymosin alpha-1 added to cancer treatment"],
      ["immune", "Injected thymosin alpha-1 for COVID-19"],
      ["immune", "Thymosin alpha-1 as an adjunct to influenza vaccine in older adults"],
    ],
    note: (
      <>
        Injected as hospital treatment in trials of sepsis, pancreatitis, COPD flare-ups, hepatitis B and other conditions. A
        placebo-controlled sepsis trial of 1,106 adults found no difference in deaths.
      </>
    ),
    more: { href: "/peptides/peptides-for-immune-system", label: "Peptides for the immune system" },
  },
  {
    id: "epitalon",
    name: "Epitalon",
    keyword: "epitalon",
    searches: 6600,
    ratings: [
      ["longevity", "Epithalamin, epitalon and Thymalin (Russian 'peptide bioregulators') for ageing and lifespan"],
      ["brain", "Epitalon for sleep"],
    ],
    note: (
      <>
        The reports of fewer deaths in older people come from two Russian studies by one research group, whose abstracts give
        no group sizes or statistics. Our searches found no sleep trial.
      </>
    ),
    more: { href: "/peptides/peptides-for-anti-aging", label: "Peptides for anti-aging" },
  },
  {
    id: "marine-collagen",
    name: "Marine collagen peptides",
    keyword: "marine collagen peptides",
    searches: 5400,
    ratings: [
      ["skin", "Oral marine (fish-derived) collagen peptides"],
      ["blood-pressure", "Marine collagen peptides added to usual care in type 2 diabetes with hypertension"],
      ["joints", "Oral marine (fish-derived) collagen peptides for joints and tendons"],
      ["immune", "Oral marine (fish-derived) peptides for immune function"],
      ["eye", "Oral marine (fish-derived) peptides for eyesight"],
    ],
    note: (
      <>
        Collagen made from fish. Two skin trials report benefits but are weakly reported, and we found no human trial for joints
        and tendons. The fish-allergy risk is on the{" "}
        <Link href="/peptides/collagen-peptides-side-effects" className="link">
          side-effects page
        </Link>
        .
      </>
    ),
    more: { href: "/peptides/marine-vs-bovine-collagen", label: "Marine vs bovine collagen" },
  },
  {
    id: "dsip",
    name: "DSIP (delta sleep-inducing peptide)",
    keyword: "delta sleep inducing peptide",
    searches: 4400,
    ratings: [["brain", "DSIP (delta sleep-inducing peptide) for insomnia"]],
    note: (
      <>
        A few small injected trials from 1987 to 1992 disagree: one reported a large improvement, two found weak or clinically
        insignificant effects. We found no modern trial.
      </>
    ),
    more: { href: "/peptides/peptides-for-sleep", label: "Peptides for sleep" },
  },
  {
    id: "thymosin-beta-4",
    name: "Thymosin beta-4",
    keyword: "thymosin beta 4",
    searches: 2900,
    ratings: [
      ["eye", "Thymosin beta-4 eye drops (RGN-259) for dry eye and corneal healing"],
      ["skin", "Topical thymosin beta-4 for venous leg ulcers"],
      ["hair", "Thymosin beta-4 (TB-500 is a related, distinct fragment)"],
    ],
    note: (
      <>
        The full 43-amino-acid protein, tested in small company-linked trials as eye drops and on leg ulcers. Those results do
        not apply to TB-500.
      </>
    ),
    more: { href: "/peptides/tb-500", label: "TB-500 profile (explains the difference)" },
  },
];

type Resolved = Entry & {
  rank: number;
  tied: boolean;
  resolved: (TopicRating & { topic: Topic; href: string })[];
  best?: TopicRating & { topic: Topic; href: string };
  worst?: TopicRating & { topic: Topic; href: string };
  studies: number;
};

function resolve(): Resolved[] {
  ENTRIES.forEach((e, i) => {
    if (i > 0 && e.searches > ENTRIES[i - 1].searches) {
      throw new Error(`most-popular-peptides: "${e.name}" has more searches than the entry above it`);
    }
  });
  return ENTRIES.map((e) => {
    const resolved = e.ratings.map(([topic, subject]) => {
      if (TOPICS[topic].measures !== "benefit") throw new Error(`most-popular-peptides: ${topic} is not a benefit topic`);
      const i = TOPICS[topic].ratings.findIndex((x) => x.subject === subject);
      if (i < 0) throw new Error(`most-popular-peptides: "${subject}" is not a rating on the ${topic} topic page`);
      return { ...TOPICS[topic].ratings[i], topic, href: `/science/topics/${topic}#rating-${i + 1}` };
    });
    // A subject naming Pürblack would need the disclosure note on this page.
    if (resolved.some((r) => /p[uü]rblack/i.test(r.subject))) throw new Error(`most-popular-peptides: "${e.name}" shows a Pürblack rating`);
    const assessed = resolved
      .filter((r) => r.level !== "unassessed")
      .sort((a, b) => LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level));
    const best = assessed[0];
    const last = assessed[assessed.length - 1];
    const studies = STUDIES.filter((s) => s.peptides.includes(e.id)).length;
    const rank = 1 + ENTRIES.filter((x) => x.searches > e.searches).length;
    const tied = ENTRIES.filter((x) => x.searches === e.searches).length > 1;
    return { ...e, rank, tied, resolved, best, worst: last && best && last.level !== best.level ? last : undefined, studies };
  });
}

const fmt = (n: number) => n.toLocaleString("en-US");
const list = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
const WEAK: Level[] = ["preclinical", "none"];
/** Name as it reads mid-sentence: "Ipamorelin" becomes "ipamorelin", "BPC-157" and "GHK-Cu" stay as they are. */
const lc = (name: string) => (/^[A-Z][a-z]/.test(name) ? name[0].toLowerCase() + name.slice(1) : name);
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const WORDS = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const words = (n: number) => WORDS[n] ?? String(n);
const names = (rs: { name: string }[]) => list(rs.map((r) => lc(r.name)));

function LevelWords({ level }: { level: Level }) {
  return (
    <>
      <EvidenceMeter level={level} size="sm" labelled={false} />
      <span className={`mt-1.5 block text-sm font-semibold leading-snug ${levelTone(level) === "warn" ? "text-warn" : "text-accent"}`}>
        {LEVEL_LABEL[level]}
      </span>
    </>
  );
}

export default function MostPopularPeptidesPage() {
  const rows = resolve();
  const top10 = rows.filter((r) => r.rank <= 10);
  const strong = top10.filter((r) => r.best?.level === "consistent");
  const weak = top10.filter((r) => r.best && WEAK.includes(r.best.level));
  const unrated = top10.filter((r) => !r.best);
  const middle = top10.filter((r) => r.best && !WEAK.includes(r.best.level) && r.best.level !== "consistent");
  const approved = rows.filter((r) => PEPTIDE_STATUS[r.id].kind === "approved");
  const riskList = rows.filter((r) => PEPTIDE_STATUS[r.id].kind === "fda-risk-list");
  // The FAQ names tesamorelin's approved use.
  if (!approved.some((r) => r.id === "tesamorelin")) throw new Error("most-popular-peptides: FAQ assumes tesamorelin is approved");
  // The short answer below says the three most-searched are the best supported; keep that true.
  if (rows.slice(0, 3).map((r) => r.id).join() !== "tirzepatide,semaglutide,collagen" || rows.slice(0, 3).some((r) => r.best?.level !== "consistent")) {
    throw new Error("most-popular-peptides: the short answer assumes the top three are rated consistent");
  }

  const FAQ: { q: string; a: string }[] = [
    {
      q: "What are the most popular peptides?",
      a: `By US Google searches (Semrush estimates, ${formatDate(SEARCHES_DATED)}), the most searched are ${list(
        rows.slice(0, 6).map((r) => `${lc(r.name)} (about ${fmt(r.searches)} a month)`),
      )}. Below them come ${names(rows.slice(6, 10))}.`,
    },
    {
      q: "Are the most popular peptides the ones with the best evidence?",
      a: `Only at the very top. ${cap(names(strong))} have consistent results in human trials for at least one use. Of the rest of the top ten, ${names(
        weak,
      )} have only animal evidence or no human trial we could find${unrated.length ? `, and ${names(unrated)} is not rated` : ""}.`,
    },
    {
      q: "Which popular peptides are FDA-approved?",
      a: `Of the ${rows.length} peptides on this page, ${names(approved)} are FDA-approved prescription drugs, tesamorelin only for abdominal fat in people with HIV. ${cap(words(riskList.length))} others, including ${names(
        riskList.slice(0, 4),
      )}, are not approved and appear on FDA's compounding safety-risk page. Collagen and marine collagen are sold as supplements.`,
    },
    {
      q: "Why are peptides like BPC-157 so popular if the human evidence is thin?",
      a: "We do not measure why people search. A 2026 sports-medicine review we summarised says rigorous human safety data on these peptides are scarce, and discusses how the placebo effect and social media amplify perceived benefit.",
    },
  ];

  return (
    <article className="relative mx-auto max-w-3xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: SITE.name, item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "What are peptides?", item: absoluteUrl("/peptides") },
            { "@type": "ListItem", position: 3, name: "Most popular peptides", item: absoluteUrl(PATH) },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Most popular peptides by US searches",
          itemListElement: rows.map((r, i) => ({ "@type": "ListItem", position: i + 1, name: r.name, url: absoluteUrl(`${PATH}#${r.id}`) })),
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Most popular peptides
      </nav>
      <PageKindLabel path={PATH} />
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">The most popular peptides, and what the evidence shows</h1>
      <p className="mt-2 text-sm text-muted">
        Last reviewed {formatDate(REVIEWED)}. Search figures dated {formatDate(SEARCHES_DATED)}.
      </p>

      <ShortAnswer className="mt-6">
        <p className="max-w-prose text-lg leading-relaxed sm:text-xl sm:leading-relaxed [text-wrap:pretty]">
          The three most-searched peptides in the US, tirzepatide, semaglutide and collagen peptides, are also among the best supported: each has consistent results in human trials for at least one use, and the first two
          are prescription drugs. Below them the picture changes. Of the rest of the top ten, {words(weak.length)} (
          {names(weak)}) have only animal evidence or no human trial we could find, {words(middle.length)} ({names(middle)})
          have limited human evidence{unrated.length ? <>, and {names(unrated)} is not rated</> : null}. <strong>Popular is not the same as proven.</strong>
        </p>
      </ShortAnswer>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">The list</h2>
        <div className="mt-6 overflow-hidden rounded-card border border-line bg-card">
          <table className="w-full text-left text-sm">
            <caption className="px-5 pb-1 pt-5 text-left text-caption font-semibold uppercase tracking-[0.06em] text-muted sm:px-6">
              At a glance: ordered by searches, not by evidence
            </caption>
            <thead className="text-muted">
              <tr>
                <th scope="col" className="w-12 px-3 py-2 pl-5 font-medium sm:pl-6">
                  Rank
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Peptide
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Searches a month
                </th>
                <th scope="col" className="hidden w-[34%] px-3 py-2 pr-5 font-medium sm:table-cell sm:pr-6">
                  Best-supported use
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-line">
                  <td className="px-3 py-3 pl-5 align-top font-bold sm:pl-6">
                    {r.rank}
                    {r.tied && <span className="block text-caption font-medium text-muted">(tied)</span>}
                  </td>
                  <td className="px-3 py-3 align-top">
                    <a href={`#${r.id}`} className="link font-medium">
                      {r.name}
                    </a>
                    <span className="mt-2 block sm:hidden" data-md-skip>
                      {r.best ? <LevelWords level={r.best.level} /> : <span className="text-sm text-muted">Not rated</span>}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right align-top tabular-nums">{fmt(r.searches)}</td>
                  <td className="hidden px-3 py-3 pr-5 align-top sm:table-cell sm:pr-6">
                    {r.best ? <LevelWords level={r.best.level} /> : <span className="text-sm text-muted">Not rated</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-prose text-sm text-muted">
          Ordered by US searches, not by evidence.{" "}
          <a href="#how-we-measured" className="link">
            How we measured popularity
          </a>
        </p>
        <PageContents />

        <ol className="mt-8 space-y-6">
          {rows.map((r) => {
            const st = PEPTIDE_STATUS[r.id];
            return (
              <li key={r.id} id={r.id} className={`${CARD} scroll-mt-6`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-bold leading-tight">
                    <span className="text-muted">
                      {r.rank}
                      {r.tied ? "=" : ""}
                    </span>{" "}
                    {r.name}
                  </h3>
                  <p className="text-sm text-muted">
                    <span className="font-semibold tabular-nums text-fg">{fmt(r.searches)}</span> US searches a month
                    {r.related?.map((x) => (
                      <span key={x.keyword} className="block text-caption">
                        {" "}
                        &ldquo;{x.keyword}&rdquo;: {fmt(x.searches)}
                      </span>
                    ))}
                  </p>
                </div>
                <p className="mt-3">
                  <StatusChip peptide={r.id} />
                </p>
                <p className="mt-3 text-soft [text-wrap:pretty]">{r.note}</p>

                {r.best ? (
                  <div className={`mt-5 grid gap-5 border-t border-line pt-4 ${r.worst ? "sm:grid-cols-2" : ""}`}>
                    <div>
                      <p className="text-caption font-semibold uppercase tracking-[0.06em] text-muted">
                        {r.worst ? "Best supported" : r.resolved.length > 1 ? "Every use we rated" : "Our rating"}
                      </p>
                      <p className="mt-1 text-sm">
                        <Link href={r.best.href} className="link">
                          {r.worst || r.resolved.length === 1 ? r.best.subject : `${r.resolved.length} uses, all at the same level`}
                        </Link>{" "}
                        <span className="block text-caption text-muted">
                          {(() => {
                            const pages = r.worst ? [r.best.topic] : [...new Set(r.resolved.map((x) => x.topic))];
                            return `(evidence ${pages.length > 1 ? "pages" : "page"}: ${pages.map((t) => TOPIC_LABEL[t]).join("; ")})`;
                          })()}
                        </span>
                      </p>
                      <div className="mt-2">
                        <RatingBadge level={r.best.level} measures="benefit" />
                      </div>
                    </div>
                    {r.worst && (
                      <div>
                        <p className="text-caption font-semibold uppercase tracking-[0.06em] text-muted">Least supported</p>
                        <p className="mt-1 text-sm">
                          <Link href={r.worst.href} className="link">
                            {r.worst.subject}
                          </Link>{" "}
                          <span className="block text-caption text-muted">(evidence page: {TOPIC_LABEL[r.worst.topic]})</span>
                        </p>
                        <div className="mt-2">
                          <RatingBadge level={r.worst.level} measures="benefit" />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="mt-5 border-t border-line pt-4 text-sm text-muted">Not rated on our evidence pages.</p>
                )}

                <p className="mt-5 text-sm text-muted">
                  {r.resolved.length > 1 && (
                    <>
                      {r.resolved.length} uses rated.{" "}
                    </>
                  )}
                  <Link href={`/science?peptide=${r.id}#explore`} className="link">
                    {r.studies} {r.studies === 1 ? "study" : "studies"} summarised
                  </Link>{" "}
                  ·{" "}
                  <Link href={r.more.href} className="link">
                    {r.more.label}
                  </Link>
                  .{" "}
                  <span className="mt-1 block text-caption">
                    US status: {st.note}
                    {st.sources.length > 0 && (
                      <>
                        {" "}
                        Source:{" "}
                        {st.sources.map((s, i) => (
                          <span key={s.url}>
                            {i > 0 && "; "}
                            <a href={s.url} target="_blank" rel="noopener noreferrer" className="link">
                              {s.label}
                            </a>
                          </span>
                        ))}
                        .
                      </>
                    )}
                  </span>
                </p>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 max-w-prose text-sm text-muted">
          {STATUS_LABEL.supplement} and {STATUS_LABEL.cosmetic.toLowerCase()} describe how products are sold, not an FDA
          decision. Nothing here is legal advice.
        </p>
      </section>


      <section className="mt-14">
        <h2 id="how-we-measured" className="scroll-mt-6 text-3xl font-bold leading-[1.15]">How we measured popularity</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          &ldquo;Popular&rdquo; here means searched for. The figures are Semrush estimates of average monthly Google searches in
          the US for each peptide&rsquo;s name, from our keyword research of {formatDate(SEARCHES_DATED)}. They are modelled
          estimates, not counts, and they measure interest, not how many people use a peptide or whether it works. Spellings and
          combinations (such as &ldquo;CJC-1295 ipamorelin&rdquo;) are shown separately, not added in. Our research covered{" "}
          144 search terms; a peptide missing from this page may not have been among them, so this is not a census.
        </p>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Beside each peptide we show its best- and least-supported use, taken from the ratings on our evidence pages, so the
          numbers here always match them. A rating measures how strong the human evidence is, not how large a benefit is or
          whether something is safe. US status was checked {formatDate(STATUS_CHECKED)} against FDA&rsquo;s approval records and
          its compounding safety-risk page; see the{" "}
          <Link href="/peptides/legal-status" className="link">
            legal status page
          </Link>
          . Nobody paid for a place on this page, and there are no affiliate links.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Searched for, but not covered here</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">IGF-1 LR3</strong> (about 14,800 searches a month) is not in our study registry: we have
            not summarised any study of it. That is a gap in our coverage, not a finding.
          </li>
          <li>
            <strong className="text-fg">&ldquo;Growth hormone peptides&rdquo;</strong> (about 3,600) is a group, not one peptide;
            tesamorelin, sermorelin, ipamorelin and CJC-1295 above belong to it, and the{" "}
            <Link href="/peptides/peptides-for-muscle-growth" className="link">
              muscle growth page
            </Link>{" "}
            covers them together.
          </li>
          <li>
            Peptides we have studies for but that were not in our keyword research, such as bremelanotide (PT-141), are on the{" "}
            <Link href="/peptides/a-z" className="link">
              A–Z list
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
              <p className="mt-1 max-w-prose text-muted">
                {f.a}
                {f.q.startsWith("Why") && (
                  <>
                    {" "}
                    (
                    <PaperLink id="mendias-2026" via="doi">
                      Mendias 2026
                    </PaperLink>
                    )
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-card border border-line bg-card p-7">
        <h2 className="text-xl font-bold">Keep going</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { href: "/peptides/by-goal", label: "Peptides by goal" },
            { href: "/peptides/a-z", label: "Peptides A–Z" },
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

      <RelatedGoals path={PATH} />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
