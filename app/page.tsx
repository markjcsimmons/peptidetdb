import Link from "next/link";
import { SITE } from "@/lib/site";
import { STUDIES } from "@/lib/studies";
import { LEVEL_LABEL, TOPICS, TOPIC_SLUGS, type TopicRating } from "@/lib/topics";
import { COMMITTEE, LEGAL_REVIEWED } from "@/lib/legal-status";
import { formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { BeadChainHero, BeadRow } from "@/components/beads";
import { DigestionDiagramCompact, SignalDiagramCompact } from "@/components/diagrams";
import { EvidenceMeter, LEVEL_ORDER, levelTone } from "@/components/evidence-meter";

/** The strongest rating in a topic, so each card shows the best-supported claim, not the whole list. */
function strongest(ratings: TopicRating[]): TopicRating {
  return [...ratings].sort((a, b) => LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level))[0];
}

type Tone = "accent" | "warn" | "neutral";
const TONE: Record<Tone, string> = {
  accent: "bg-accent-soft text-accent",
  warn: "bg-warn-soft text-warn",
  neutral: "bg-line text-fg",
};

function Pill({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-[13px] font-semibold leading-[22px] ${TONE[tone]}`}>
      {children}
    </span>
  );
}

function SectionHead({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: React.ReactNode }) {
  return (
    <>
      {eyebrow && <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent">{eyebrow}</p>}
      <h2 className="text-[32px] font-bold leading-[1.12] sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 max-w-[640px] text-soft [text-wrap:pretty]">{intro}</p>}
    </>
  );
}

const JUMP = [
  { href: "#what", label: "What are they?" },
  { href: "#how", label: "How do they work?" },
  { href: "#types", label: "Types" },
  { href: "#safety", label: "Are they safe?" },
  { href: "#evidence", label: "Do they work?" },
  { href: "#legal", label: "Are they legal?" },
];

const TYPES: { n: number; title: string; status: string; tone: Tone; body: React.ReactNode }[] = [
  {
    n: 1,
    title: "Approved prescription drugs",
    status: "Went through FDA approval",
    tone: "accent",
    body: (
      <>
        Insulin and the GLP-1 medicines are peptide drugs. A 2026 review contrasts them with a parallel &ldquo;gray
        market&rdquo; of unapproved compounds (<PaperLink id="mendias-2026" via="doi">Mendias &amp; Awan</PaperLink>).
        Prescribed by a clinician.
      </>
    ),
  },
  {
    n: 2,
    title: "Collagen and marine peptide supplements",
    status: "Best-studied in people",
    tone: "accent",
    body: (
      <>
        Fragments of collagen or fish protein, swallowed as powders and capsules. Skin has the most trials; other uses
        are small or mixed.{" "}
        <Link href="/peptides/oral-marine-peptides" className="link">
          Do oral marine peptides work?
        </Link>
      </>
    ),
  },
  {
    n: 3,
    title: "Skin-care peptides",
    status: "No controlled trial summarised here yet",
    tone: "warn",
    body: (
      <>
        Peptides such as GHK-copper are applied to the skin. This hub holds a review of GHK but no controlled trial of
        a product yet.
      </>
    ),
  },
  {
    n: 4,
    title: "Unapproved wellness and research peptides",
    status: "Mostly animal evidence",
    tone: "warn",
    body: (
      <>
        BPC-157 and similar compounds are not FDA-approved for any use (
        <PaperLink id="vasireddi-2025" via="pmc">systematic review</PaperLink>), and their compounding status changed
        through 2026.{" "}
        <Link href="/peptides/legal-status" className="link">
          Legal status
        </Link>
      </>
    ),
  },
];

const SAFETY: { type: string; tag: string; tone: Tone; flag?: boolean; known: React.ReactNode }[] = [
  {
    type: "Approved prescription drugs",
    tag: "Safety reviewed at approval",
    tone: "accent",
    known: (
      <>
        Approval includes a review of safety, and they are used under a clinician. They still have side effects; this
        site has not summarised the trial evidence for any approved peptide drug.
      </>
    ),
  },
  {
    type: "Collagen and marine supplements",
    tag: "Not assessed here yet",
    tone: "neutral",
    known: (
      <>
        One small trial reported no adverse effects over four weeks in 29 people (
        <PaperLink id="kawasaki-2000" via="doi">Kawasaki 2000</PaperLink>), which is too few to establish safety.
      </>
    ),
  },
  {
    type: "Skin-care peptides",
    tag: "Not assessed here yet",
    tone: "neutral",
    known: <>No safety evidence is summarised on this site for topical peptides.</>,
  },
  {
    type: "Unapproved wellness and research peptides",
    tag: "Human data scarce",
    tone: "warn",
    flag: true,
    known: (
      <>
        Reviews say{" "}
        <PaperLink id="mendias-2026" via="doi">
          rigorous human safety data are scarce and serious harm is possible
        </PaperLink>
        , and warn of risks from unregulated manufacturing and contamination.
      </>
    ),
  },
];

const FAQ: { q: string; text: string; a: React.ReactNode }[] = [
  {
    q: "Do peptides work?",
    text: "It depends on the peptide and the claim. Oral collagen peptides have consistent but caveated human evidence for skin hydration and elasticity. Most injectable wellness peptides, such as BPC-157, have mostly animal evidence and no controlled human trials found for their popular uses.",
    a: (
      <>
        It depends on the peptide and the claim. Oral collagen peptides have consistent but caveated human evidence for
        skin hydration and elasticity. Most injectable wellness peptides, such as BPC-157, have mostly animal evidence
        (<PaperLink id="tewari-2026" via="doi">Tewari 2026</PaperLink>). See the evidence grid above.
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
    q: "Who runs this site, and is it neutral?",
    text: SITE.disclosure + " Every study summary states what it cannot show and who paid for it.",
    a: (
      <>
        {SITE.disclosure} Every study summary states what it cannot show and who paid for it.{" "}
        <Link href="/about" className="link">
          About this site
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

const CARD = "rounded-[20px] border border-line bg-card p-7";

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

      {/* Hero */}
      <section className="grid items-center gap-14 pt-8 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent">The {SITE.fullName}</p>
          <h1 className="text-[40px] font-bold leading-[1.04] sm:text-6xl [text-wrap:balance]">
            Peptides, explained by the evidence
          </h1>
          <p className="mt-6 max-w-[540px] text-[19px] leading-[1.55] text-soft [text-wrap:pretty]">
            Peptides are short chains of amino acids. The word covers everything from insulin to collagen powder to
            unapproved injectables, and what the studies show is very different for each. Start here for the basics,
            then go as deep as you like.
          </p>
          <p className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/peptides"
              className="inline-flex min-h-12 items-center rounded-xl bg-accent px-6 font-semibold text-on-accent hover:opacity-90"
            >
              What are peptides?
            </Link>
            <Link
              href="/science"
              className="inline-flex min-h-12 items-center rounded-xl border border-line bg-card px-6 font-semibold hover:border-accent"
            >
              Browse {STUDIES.length} study summaries
            </Link>
          </p>
          <p className="mt-6 max-w-[540px] text-sm leading-relaxed text-muted">{SITE.disclosure}</p>
        </div>
        <figure className="m-0 rounded-[28px] bg-accent-soft p-7">
          <BeadChainHero />
          <figcaption className="mt-4 text-sm leading-snug text-soft">
            One bead per amino acid. This chain has 15, the length reported for BPC-157. Colours are decoration only.
          </figcaption>
        </figure>
      </section>

      {/* Jump nav */}
      <nav aria-label="On this page" className="mt-12 flex flex-wrap gap-2.5">
        {JUMP.map((j) => (
          <a
            key={j.href}
            href={j.href}
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-card px-[18px] text-[15px] font-medium hover:border-accent"
          >
            {j.label}
          </a>
        ))}
      </nav>

      {/* What are peptides */}
      <section id="what" className="mt-24 scroll-mt-8">
        <SectionHead
          eyebrow="The basics"
          title="What are peptides?"
          intro="Amino acids link into chains. Long, folded chains are proteins; short ones are peptides. There is no sharp line between the two, and the cut-off varies by source."
        />
        <div className="mt-9 grid gap-8 rounded-[20px] border border-line bg-card p-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex h-9 items-center">
              <BeadRow n={1} />
            </div>
            <p className="mt-3 font-semibold">Amino acid</p>
            <p className="mt-0.5 text-[15px] text-muted">The building block</p>
          </div>
          <div>
            <div className="flex h-9 items-center">
              <BeadRow n={3} />
            </div>
            <p className="mt-3 font-semibold">GHK</p>
            <p className="mt-0.5 text-[15px] text-muted">
              3 amino acids, studied for skin repair (
              <PaperLink id="pickart-2015" via="pmc">
                review
              </PaperLink>
              )
            </p>
          </div>
          <div>
            <div className="flex h-9 items-center">
              <BeadRow n={15} size={11} gap={3} />
            </div>
            <p className="mt-3 font-semibold">BPC-157</p>
            <p className="mt-0.5 text-[15px] text-muted">
              15 amino acids, much discussed for injury recovery (
              <PaperLink id="mcguire-2025" via="pmc">
                review
              </PaperLink>
              )
            </p>
          </div>
          <div>
            <div className="flex min-h-9 max-w-[150px] items-center">
              <span aria-hidden="true" className="flex flex-wrap gap-[3px]">
                {Array.from({ length: 28 }, (_, i) => (
                  <span key={i} className="h-[9px] w-[9px] rounded-full bg-muted" />
                ))}
              </span>
            </div>
            <p className="mt-3 font-semibold">Protein</p>
            <p className="mt-0.5 text-[15px] text-muted">A long, folded chain, such as collagen</p>
          </div>
        </div>
        <p className="mt-5">
          <Link href="/peptides" className="link">
            Read the full explainer
          </Link>{" "}
          or see the{" "}
          <Link href="/glossary" className="link">
            glossary
          </Link>
          .
        </p>
      </section>

      {/* How do they work */}
      <section id="how" className="mt-24 scroll-mt-8">
        <SectionHead eyebrow="The mechanism" title="How do they work?" intro="Three ideas cover most of it." />
        <div className="mt-9 grid gap-6 md:grid-cols-3">
          <div className={`${CARD} flex flex-col gap-4`}>
            <SignalDiagramCompact />
            <h3 className="text-[22px] font-bold leading-tight">Some are signals</h3>
            <p className="text-base text-soft">
              They attach to a receptor on a cell and change what it does. That is how peptide drugs such as insulin are
              designed to act.
            </p>
          </div>
          <div className={`${CARD} flex flex-col gap-4`}>
            <DigestionDiagramCompact />
            <h3 className="text-[22px] font-bold leading-tight">Swallowed ones meet digestion</h3>
            <p className="text-base text-soft">
              Whether anything active gets through, and does anything, is a question for trials, not for the label.
            </p>
          </div>
          <div className={`${CARD} flex flex-col gap-4`}>
            <div className="flex min-h-[130px] flex-col justify-center gap-2.5">
              <div
                className="flex h-[34px] overflow-hidden rounded-lg"
                role="img"
                aria-label="Bar chart: 67% of publications on six popular injectable peptides used animal models"
              >
                <div className="flex items-center bg-warn pl-3 text-sm font-semibold text-bg" style={{ width: "67%" }}>
                  67% animal models
                </div>
                <div className="flex items-center bg-line pl-3 text-sm font-medium text-fg" style={{ width: "33%" }}>
                  Other
                </div>
              </div>
              <p className="text-[13px] leading-snug text-muted">
                Publications found by a 2026 scoping review of six popular injectable peptides (
                <PaperLink id="tewari-2026" via="doi">
                  Tewari 2026
                </PaperLink>
                )
              </p>
            </div>
            <h3 className="text-[22px] font-bold leading-tight">A mechanism is not proof</h3>
            <p className="text-base text-soft">
              &ldquo;It blocks an enzyme&rdquo; is a reason to run a trial, not a result.
            </p>
          </div>
        </div>
        <p className="mt-6">
          <Link href="/peptides/how-peptides-work" className="link">
            How peptides work, with the evidence
          </Link>
        </p>
      </section>

      {/* Types */}
      <section id="types" className="mt-24 scroll-mt-8">
        <SectionHead
          eyebrow="The landscape"
          title="What are the different types?"
          intro="We sort them by what matters to a reader: whether they are approved, and how much human evidence exists."
        />
        <div className="mt-9 grid gap-6 md:grid-cols-2">
          {TYPES.map((t) => (
            <div key={t.title} className={CARD}>
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">Type {t.n}</span>
                <Pill tone={t.tone}>{t.status}</Pill>
              </div>
              <h3 className="mt-3 text-2xl font-bold leading-tight">{t.title}</h3>
              <p className="mt-3 text-base text-soft">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety */}
      <section id="safety" className="mt-24 scroll-mt-8">
        <SectionHead
          eyebrow="What we know"
          title="Are peptides safe?"
          intro={<>There is no single answer, because &ldquo;peptides&rdquo; is not a single thing. Here is what we know, by type.</>}
        />
        <div className="mt-9 overflow-hidden rounded-[20px] border border-line bg-card">
          {SAFETY.map((r, i) => (
            <div
              key={r.type}
              className={`flex flex-wrap gap-x-8 gap-y-3 px-7 py-6 ${i > 0 ? "border-t border-line" : ""} ${r.flag ? "bg-warn-soft" : ""}`}
            >
              <div className="min-w-0 flex-[1_1_240px]">
                <p className="font-semibold">{r.type}</p>
                <p className="mt-2">
                  <Pill tone={r.tone}>{r.tag}</Pill>
                </p>
              </div>
              <p className="min-w-0 flex-[3_1_380px] text-base text-soft">{r.known}</p>
            </div>
          ))}
        </div>
        <p className="mt-5">
          <Link href="/science/topics/safety" className="link">
            Safety evidence in detail
          </Link>
        </p>
      </section>

      {/* Evidence at a glance */}
      <section id="evidence" className="mt-24 scroll-mt-8">
        <SectionHead
          eyebrow="The evidence"
          title="Do they work? The evidence at a glance"
          intro="For each topic, the best-supported claim we have summarised. Open a topic for every rating."
        />
        <div className="mt-8 rounded-2xl border border-line bg-card px-6 py-5">
          <p className="mb-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">How to read the meters</p>
          <div className="grid grid-cols-2 gap-x-5 gap-y-4 md:grid-cols-3 lg:grid-cols-6">
            {[...LEVEL_ORDER].reverse().map((level) => (
              <div key={level}>
                <EvidenceMeter level={level} size="sm" labelled={false} />
                <p className="mt-2 text-sm leading-snug text-soft">{LEVEL_LABEL[level]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TOPIC_SLUGS.map((slug) => {
            const t = TOPICS[slug];
            const top = strongest(t.ratings);
            return (
              <Link key={slug} href={`/science/topics/${slug}`} className={`${CARD} block hover:border-accent`}>
                <h3 className="text-[22px] font-bold leading-tight">{t.title}</h3>
                <p className="mt-3.5 text-base">{top.subject}</p>
                <div className="mt-3.5">
                  <EvidenceMeter level={top.level} />
                </div>
                <p className={`mt-2.5 text-sm font-semibold ${levelTone(top.level) === "warn" ? "text-warn" : "text-accent"}`}>
                  {LEVEL_LABEL[top.level]}
                </p>
                <p className="mt-3.5 text-sm text-muted">
                  {t.ratings.length} {t.ratings.length === 1 ? "rating" : "ratings"}, reviewed {formatDate(t.reviewedOn)}
                </p>
              </Link>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-muted">
          Ratings reflect only the studies summarised here.{" "}
          <Link href="/science/methodology" className="link">
            How ratings are set
          </Link>
          .
        </p>
      </section>

      {/* Legal */}
      <section id="legal" className="mt-24 scroll-mt-8">
        <div className="rounded-3xl border border-line bg-card p-8 sm:p-10">
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
          <ol className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { d: "29 Sep 2023", t: "FDA adds several peptides to Category 2 of its interim compounding policies.", now: false },
              { d: "16 Apr 2026", t: "FDA announces a public advisory committee meeting on the 503A bulks list.", now: false },
              {
                d: "23–24 Jul 2026",
                t: `The committee considers seven peptides. News reports say it recommended ${recommended}.`,
                now: false,
              },
              { d: formatDate(LEGAL_REVIEWED), t: "Last checked. We found no final FDA action.", now: true },
            ].map((e) => (
              <li key={e.d} className={`relative border-t-2 pt-5 ${e.now ? "border-accent" : "border-track"}`}>
                <span
                  aria-hidden="true"
                  className={`absolute -top-2 left-0 h-3.5 w-3.5 rounded-full ${e.now ? "bg-accent" : "bg-muted"}`}
                />
                <p className={`text-sm font-semibold ${e.now ? "text-accent" : "text-muted"}`}>{e.d}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-soft">{e.t}</p>
              </li>
            ))}
          </ol>
          <p className="mt-7">
            <Link href="/peptides/legal-status" className="link">
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
        <ol className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CHECKLIST.map((c, i) => (
            <li key={c.q} className="rounded-2xl border border-line bg-card p-[22px]">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft font-heading font-bold text-accent">
                {i + 1}
              </span>
              <p className="mt-3.5 font-semibold leading-snug">{c.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.why}</p>
            </li>
          ))}
        </ol>
        <p className="mt-5">
          <Link href="/science/methodology" className="link">
            Read the methodology
          </Link>
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-24">
        <h2 className="text-[32px] font-bold leading-[1.12] sm:text-4xl">Common questions</h2>
        <div className="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-2">
          {FAQ.map((f) => (
            <div key={f.q} className="border-t border-track pt-5">
              <h3 className="text-lg font-semibold leading-snug">{f.q}</h3>
              <p className="mt-2 text-base text-soft">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-7">
          <Link href="/peptides" className="link">
            More questions, answered
          </Link>
        </p>
      </section>

      {/* Trust */}
      <section className="mt-24 rounded-3xl bg-accent-soft p-8 sm:p-10">
        <h2 className="text-[28px] font-bold leading-tight">Why trust this site</h2>
        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-[40px] font-bold leading-none text-accent">{STUDIES.length}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-soft">
              studies summarised from their abstracts, each with what it cannot show
            </p>
          </div>
          <div>
            <p className="font-heading text-[40px] font-bold leading-none text-accent">{TOPIC_SLUGS.length}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-soft">evidence topics, each with a dated verdict</p>
          </div>
          <div>
            <p className="font-heading text-[40px] font-bold leading-none text-accent">Open</p>
            <p className="mt-2 text-[15px] leading-relaxed text-soft">
              dataset, free to download as{" "}
              <Link href="/data" className="link">
                CSV and JSON
              </Link>
            </p>
          </div>
          <div>
            <p className="font-heading text-[40px] font-bold leading-none text-accent">Public</p>
            <p className="mt-2 text-[15px] leading-relaxed text-soft">
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
          {SITE.disclosure}{" "}
          <Link href="/about" className="link">
            About this site
          </Link>
          . {SITE.disclaimer} Last reviewed {formatDate(SITE.lastReviewed)}.
        </p>
      </section>
    </div>
  );
}
