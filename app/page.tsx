import type { Metadata } from "next";
import Link from "next/link";
import { GOALS, GoalBoard } from "@/components/guide-links";
import { SITE } from "@/lib/site";
import { STUDIES } from "@/lib/studies";
import { TOPIC_SLUGS } from "@/lib/topics";
import { COMMITTEE, LEGAL_REVIEWED } from "@/lib/legal-status";
import { formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { ALL_GRADES } from "@/lib/grades";
import { BENEFITS, KIND_LABEL, KIND_ORDER, kindOf } from "@/lib/product-finder";
import { PRODUCT_FACTS } from "@/lib/product-match";
import { HorizontalTimeline } from "@/components/timeline";
import { CARD, SectionHead } from "@/components/ui";
import { SearchTrigger } from "@/components/site-search";
import { LATEST_UPDATE, recent, summarise } from "@/lib/updates";

// Title and description come from the layout defaults; this adds the canonical so ?utm= and other
// variants of the homepage are not treated as separate pages.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** Most-searched entry points (keyword workbook, US search volume); the evidence board below covers every goal. */
const POPULAR = [
  { href: "/peptides/bpc-157", label: "BPC-157" },
  { href: "/peptides/for-weight-loss", label: "Weight loss & GLP-1" },
  { href: "/peptides/ghk-cu", label: "GHK-Cu" },
  { href: "/peptides/tb-500", label: "TB-500" },
  { href: "/peptides/collagen-peptides", label: "Collagen" },
  { href: "/peptides/legal-status", label: "Legal status" },
];

const BASICS: { q: string; a: React.ReactNode; href: string; more: string }[] = [
  {
    q: "What are peptides?",
    a: "Short chains of amino acids. Long, folded chains are proteins; there is no sharp line between the two, and the word covers everything from insulin to collagen powder.",
    href: "/peptides",
    more: "The full explainer",
  },
  {
    q: "How do they work?",
    a: "Some act as signals on cells. Swallowed ones meet digestion, so whether a peptide does anything by mouth is a question for trials, not for the label.",
    href: "/peptides/how-peptides-work",
    more: "How peptides work",
  },
  {
    q: "Are they safe?",
    a: (
      <>
        It depends on the type. For unapproved injectable peptides, reviews say{" "}
        <PaperLink id="mendias-2026" via="doi">
          rigorous human safety data are scarce
        </PaperLink>{" "}
        and warn about unregulated manufacturing.
      </>
    ),
    href: "/science/topics/safety",
    more: "Safety evidence",
  },
  {
    q: "Are they steroids?",
    a: "No. Anabolic steroids are relatives of testosterone, a different chemical class. Some peptides are still banned in sport, and \u2018not a steroid\u2019 does not mean safe.",
    href: "/peptides/are-peptides-steroids",
    more: "Peptides vs steroids",
  },
];

/** Latest date any study or evidence topic was checked: the "Updated" line in the hero. */
/** The latest week of updates, for the "Latest" line under the evidence board. */
const LATEST = recent(7);

const FAQ: { q: string; text: string; a: React.ReactNode }[] = [
  {
    q: "Do peptides work?",
    text: "It depends on the peptide and the claim. Oral collagen peptides have consistent but caveated human evidence for skin hydration and elasticity. Most injectable wellness peptides, such as BPC-157, have mostly animal evidence and no controlled human trials found for their popular uses.",
    a: (
      <>
        It depends on the peptide and the claim. Oral collagen peptides have consistent but caveated human evidence for
        skin hydration and elasticity. Most injectable wellness peptides, such as BPC-157, have mostly animal evidence (
        <PaperLink id="tewari-2026" via="doi">Tewari 2026</PaperLink>). See the evidence board above.
      </>
    ),
  },
  {
    q: "Is swallowing a peptide different from injecting it?",
    text: "Yes. Swallowed peptides meet digestion, so whether an oral peptide has any effect is a question for trials. Injected peptides skip digestion but carry injection risks and depend on how the product was made.",
    a: (
      <>
        Yes. Swallowed peptides meet digestion, so whether an oral peptide has any effect is a question for trials.
        Injected peptides skip digestion but carry injection risks and depend on how the product was made.{" "}
        <Link href="/peptides/how-peptides-work" className="link">
          How peptides work
        </Link>
      </>
    ),
  },
  {
    q: "Where do the study summaries come from?",
    text: "Each summary is written in our own words from the study's abstract, and its identifiers are checked against PubMed. Each one states what the study cannot show and who paid for it, or that funding is not stated.",
    a: (
      <>
        Each summary is written in our own words from the study&apos;s abstract, and its identifiers are checked against
        PubMed. Each one states what the study cannot show and who paid for it, or that funding is not stated.{" "}
        <Link href="/science/methodology" className="link">
          Methodology
        </Link>
      </>
    ),
  },
  {
    q: "How do I tell whether a peptide claim is solid?",
    text: "Ask whether it was shown in people, animals or cells; whether the study had a comparison group; whether it measured a real outcome or only a marker; and who paid for it.",
    a: (
      <>
        Ask whether it was shown in people, animals or cells; whether the study had a comparison group; whether it
        measured a real outcome or only a marker; and who paid for it. See the checklist above.
      </>
    ),
  },
];

const CHECKLIST: { q: string; why: string }[] = [
  { q: "Was it tested in people?", why: "Results in animals or cells often do not carry over." },
  { q: "Was there a comparison group?", why: "A placebo group shows what happens without the treatment." },
  { q: "Did it measure a real outcome?", why: "A blood marker is not the same as feeling or functioning better." },
  { q: "How big was it, and how long?", why: "A few dozen people over a few weeks can only suggest an effect." },
  { q: "Who paid for it?", why: "Company ties do not make a result wrong, but they should be stated." },
];

export default function HomePage() {
  const recommended = COMMITTEE.filter((c) => c.result === "Recommended").length;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          alternateName: SITE.fullName,
          url: SITE.url,
          description: SITE.description,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.text },
          })),
        }}
      />

      {/* Hero: the answer to "what is this and where do I start", with search first */}
      <section className="pt-6">
        <p className="mb-4 text-caption font-semibold uppercase tracking-[0.08em] text-accent">The {SITE.fullName}</p>
        <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] sm:text-6xl [text-wrap:balance]">
          Peptides, explained by the evidence
        </h1>
        <p className="mt-5 max-w-[40rem] text-lg text-soft [text-wrap:pretty]">
          What the studies show for each peptide and each goal, in plain language, with what they do not show and who paid
          for them.
        </p>
        <div className="mt-7 max-w-[40rem]">
          <SearchTrigger variant="hero" />
        </div>
        <div className="mt-4 flex max-w-[48rem] flex-wrap items-center gap-2" data-md-skip>
          <span className="mr-1 text-sm text-muted">Popular:</span>
          {POPULAR.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="inline-flex min-h-10 items-center rounded-full border border-line bg-card px-4 text-sm font-medium hover:border-accent"
            >
              {p.label}
            </Link>
          ))}
        </div>
        <ul className="mt-7 flex max-w-[44rem] flex-wrap gap-x-6 gap-y-1 text-sm text-soft" aria-label="At a glance">
          <li>
            <Link href="/science" className="link">
              <strong className="tabular-nums text-fg">{STUDIES.length}</strong> studies summarised
            </Link>
          </li>
          <li>
            <Link href="/products" className="link">
              <strong className="tabular-nums text-fg">{ALL_GRADES.length}</strong> products graded
            </Link>
          </li>
          <li>
            <Link href="/peptides/by-goal" className="link">
              <strong className="tabular-nums text-fg">{GOALS.length}</strong> goals ranked
            </Link>
          </li>
          <li>
            <Link href="/whats-new" className="link">
              Updated {formatDate(LATEST_UPDATE)}
            </Link>
          </li>
        </ul>
        <p className="mt-5 max-w-[44rem] text-sm leading-relaxed text-muted">{SITE.disclosure}</p>
      </section>

      {/* Evidence board: every goal, best and least-supported option side by side */}
      <section id="evidence" className="mt-14 scroll-mt-24">
        <SectionHead
          eyebrow="The evidence"
          title="Do peptides work? It depends on the goal"
          intro="Each goal links to a page ranking every option by the strength of the human evidence. Here are the best and the least-supported option for each, never only the best."
        />
        <div className="mt-7">
          <GoalBoard />
        </div>
        <p className="mt-4 flex flex-wrap gap-x-6">
          <Link href="/peptides/by-goal" className="link-solo">
            Compare goals in detail
          </Link>
          <Link href="/peptides/a-z" className="link-solo">
            Peptides A–Z
          </Link>
          <Link href="/science/methodology" className="link-solo">
            How ratings are set
          </Link>
        </p>
      </section>

      {/* Latest updates: a reason to come back */}
      <section aria-labelledby="latest" className="mt-10 rounded-card border border-line bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h2 id="latest" className="text-xl font-bold">
            Latest updates
          </h2>
          <p className="text-sm text-muted">Week to {formatDate(LATEST_UPDATE)}</p>
        </div>
        <p className="mt-1 text-sm text-soft">{summarise(LATEST)}.</p>
        <ul className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
          {LATEST.filter((u) => u.kind === "page" || u.kind === "grade" || u.kind === "study")
            .slice(0, 6)
            .map((u) => (
              <li key={`${u.kind}-${u.href}-${u.title}`} className="min-w-0 truncate py-1 text-sm">
                <span className="text-muted">{u.kind === "page" ? "New page" : u.kind === "grade" ? "Graded" : "Study"}:</span>{" "}
                <Link href={u.href} className="link">
                  {u.title}
                </Link>
              </li>
            ))}
        </ul>
        <p className="mt-3 flex flex-wrap gap-x-6">
          <Link href="/whats-new" className="link-solo">
            Everything that&rsquo;s new
          </Link>
          <a href="/feed.xml" className="link-solo">
            RSS feed
          </a>
        </p>
      </section>

      {/* Products: the same benefits, leading to the finder with the benefit picked */}
      <section id="products" className="mt-16 scroll-mt-24 rounded-panel border border-line bg-card p-6 sm:p-8">
        <SectionHead
          eyebrow="Products"
          title="Looking for a product?"
          intro={`We have graded ${ALL_GRADES.length} over-the-counter peptide and collagen products on their lab reports, labels and claims, and matched each claim to the human evidence for its ingredient. Pick what you want help with.`}
        />
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {BENEFITS.map((b) => (
            <li key={b.id}>
              <Link
                href={`/products?benefit=${b.id}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-bg px-[18px] text-sm font-medium hover:border-accent"
              >
                {b.label}{" "}
                <span className="tabular-nums text-muted">{ALL_GRADES.filter((g) => b.areas.some((a) => g.claimAreas.includes(a))).length}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-caption font-semibold uppercase tracking-[0.08em] text-muted">Or browse by type</p>
        <ul className="mt-2 flex flex-wrap gap-2.5">
          {KIND_ORDER.map((k) => (
            <li key={k}>
              <Link
                href={`/products?type=${k}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-bg px-[18px] text-sm font-medium hover:border-accent"
              >
                {KIND_LABEL[k]}{" "}
                <span className="tabular-nums text-muted">
                  {ALL_GRADES.filter((g) => kindOf(PRODUCT_FACTS[g.id]) === k).length}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/products" className="inline-flex min-h-12 items-center rounded-tile bg-accent px-6 font-semibold text-on-accent hover:opacity-90">
            Open the product finder
          </Link>
          <Link href="/grading-rubric" className="link-solo">
            How we grade products
          </Link>
        </p>
        <p className="mt-4 max-w-prose text-sm text-muted [text-wrap:pretty]">
          A listing is not a recommendation, and no trial has compared these brands with each other. We take no payment or
          affiliate commission from any brand. The products include Pürblack&rsquo;s, graded by the same rules.
        </p>
      </section>

      {/* The basics: short answers, each linking to the full page */}
      <section id="basics" className="mt-20 scroll-mt-24">
        <SectionHead eyebrow="New to peptides?" title="The basics, in four answers" />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BASICS.map((b) => (
            <li key={b.href} className={`${CARD} flex flex-col`}>
              <h3 className="text-xl font-bold leading-tight">{b.q}</h3>
              <p className="mt-3 text-soft [text-wrap:pretty]">{b.a}</p>
              <p className="mt-auto pt-4">
                <Link href={b.href} className="link-solo">
                  {b.more}
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Legal */}
      <section id="legal" className="mt-24 scroll-mt-24">
        <div className="rounded-panel border border-line bg-card p-8 sm:p-10">
          <SectionHead
            eyebrow="Regulation"
            title="Are peptides legal?"
            intro={
              <>
                It depends on the peptide and how it is made and sold. Some are FDA-approved drugs; many popular wellness
                peptides are not approved for any use. In July 2026 an FDA advisory committee considered seven of them for
                the compounding bulks list, and according to news reports it recommended {recommended}.
              </>
            }
          />
          <div className="mt-9">
            <HorizontalTimeline
              items={[
                { key: "a", date: "29 Sep 2023", body: "FDA adds several peptides to Category 2 of its interim compounding policies." },
                { key: "b", date: "16 Apr 2026", body: "FDA announces a public advisory committee meeting on the 503A bulks list." },
                {
                  key: "c",
                  date: "23–24 Jul 2026",
                  body: `The committee considers seven peptides. News reports say it recommended ${recommended}.`,
                },
                {
                  key: "d",
                  date: "30 Oct 2026",
                  body: "HHS publishes a draft policy not to enforce against licensed compounders of six of them, reportedly under conditions.",
                },
                { key: "e", date: formatDate(LEGAL_REVIEWED), body: "Last checked. We found no final FDA action.", now: true },
              ]}
            />
          </div>
          <p className="mt-6">
            <Link href="/peptides/legal-status" className="link-solo">
              Legal status, with sources and dates
            </Link>
          </p>
        </div>
      </section>

      {/* Checklist */}
      <section className="mt-24">
        <SectionHead
          eyebrow="A skill to keep"
          title="How to judge a peptide claim"
          intro="Five questions we ask of every study. They work on ads and social media posts too."
        />
        <ol className="-mx-4 mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {CHECKLIST.map((c, i) => (
            <li key={c.q} className="min-w-[240px] snap-start rounded-card border border-line bg-card p-5 sm:min-w-0">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft font-heading font-bold text-accent">
                {i + 1}
              </span>
              <p className="mt-3.5 font-semibold leading-snug">{c.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.why}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4">
          <Link href="/science/methodology" className="link-solo">
            Read the methodology
          </Link>
        </p>
      </section>

      {/* FAQ: collapsed by default, full text stays in the page */}
      <section className="mt-24 max-w-3xl">
        <h2 className="text-3xl font-bold leading-[1.12] sm:text-4xl">Common questions</h2>
        <div className="mt-8 border-b border-track">
          {FAQ.map((f) => (
            <details key={f.q} className="group border-t border-track">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-semibold leading-snug [&::-webkit-details-marker]:hidden">
                <span>{f.q}</span>
                <svg
                  className="shrink-0 text-muted transition-transform group-open:rotate-180"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <p className="max-w-prose pb-5 text-soft">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-5">
          <Link href="/peptides" className="link-solo">
            More questions, answered
          </Link>
        </p>
      </section>

      {/* Trust */}
      <section className="mt-24 rounded-panel bg-accent-soft p-8 sm:p-10">
        <h2 className="text-3xl font-bold leading-tight">Why trust this site</h2>
        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-4xl font-bold leading-none text-accent">{STUDIES.length}</p>
            <p className="mt-2 text-sm leading-relaxed text-soft">
              studies summarised from their abstracts, each with what it cannot show
            </p>
          </div>
          <div>
            <p className="font-heading text-4xl font-bold leading-none text-accent">{TOPIC_SLUGS.length}</p>
            <p className="mt-2 text-sm leading-relaxed text-soft">evidence topics, each with a dated verdict</p>
          </div>
          <div>
            <p className="font-heading text-4xl font-bold leading-none text-accent">Open</p>
            <p className="mt-2 text-sm leading-relaxed text-soft">
              dataset, free to download as{" "}
              <Link href="/data" className="link">
                CSV and JSON
              </Link>
            </p>
          </div>
          <div>
            <p className="font-heading text-4xl font-bold leading-none text-accent">Public</p>
            <p className="mt-2 text-sm leading-relaxed text-soft">
              <Link href="/corrections" className="link">
                corrections log
              </Link>{" "}
              and{" "}
              <Link href="/editorial-policy" className="link">
                editorial policy
              </Link>
            </p>
          </div>
        </div>
        <p className="mt-8 max-w-3xl text-sm text-muted">
          Who runs this site and how it is funded:{" "}
          <Link href="/about" className="link">
            About this site
          </Link>
          . Last reviewed {formatDate(SITE.lastReviewed)}.
        </p>
      </section>
    </div>
  );
}
