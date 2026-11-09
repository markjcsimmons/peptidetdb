import Link from "next/link";
import { SITE } from "@/lib/site";
import { STUDIES } from "@/lib/studies";
import { LEVEL_HINT, LEVEL_LABEL, TOPICS, TOPIC_SLUGS, type Level, type TopicRating } from "@/lib/topics";
import { COMMITTEE, LEGAL_REVIEWED } from "@/lib/legal-status";
import { formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";

const LEVEL_ORDER: Level[] = ["consistent", "mixed", "limited", "preclinical", "none", "unassessed"];
const WARN_LEVELS: Level[] = ["preclinical", "none", "unassessed"];

/** The strongest rating in a topic, so each card shows the best-supported claim, not the whole list. */
function strongest(ratings: TopicRating[]): TopicRating {
  return [...ratings].sort((a, b) => LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level))[0];
}

function LevelChip({ level }: { level: Level }) {
  const tone = WARN_LEVELS.includes(level) ? "border-warn text-warn" : "border-accent text-accent";
  return (
    <span className={`chip ${tone}`} title={LEVEL_HINT[level]}>
      {LEVEL_LABEL[level]}
    </span>
  );
}

function Dots({ n, label }: { n: number; label: string }) {
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={label}>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="h-3 w-3 rounded-full bg-accent" />
      ))}
    </span>
  );
}

const TYPES: { title: string; status: string; tone: "accent" | "warn"; body: React.ReactNode }[] = [
  {
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

const SAFETY: { type: string; known: React.ReactNode }[] = [
  {
    type: "Approved prescription drugs",
    known: (
      <>
        Approval includes a review of safety, and they are used under a clinician. They still have side effects; this
        site has not summarised the trial evidence for any approved peptide drug.
      </>
    ),
  },
  {
    type: "Collagen and marine supplements",
    known: (
      <>
        Not assessed on this site yet. One small trial reported no adverse effects over four weeks in 29 people (
        <PaperLink id="kawasaki-2000" via="doi">Kawasaki 2000</PaperLink>), which is too few to establish safety.
      </>
    ),
  },
  {
    type: "Skin-care peptides",
    known: <>Not assessed on this site yet.</>,
  },
  {
    type: "Unapproved wellness and research peptides",
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
        measured a real outcome or only a marker; and who paid for it. See the checklist below.
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

      {/* Hero */}
      <section className="max-w-3xl">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-accent">The {SITE.fullName}</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Peptides, explained by the evidence</h1>
        <p className="mt-4 max-w-prose text-lg">
          Peptides are short chains of amino acids. The word covers everything from insulin to collagen powder to
          unapproved injectables, and what the studies show is very different for each. Start here for the basics, then
          go as deep as you like.
        </p>
        <p className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/peptides"
            className="inline-block rounded-lg bg-accent px-5 py-2.5 font-medium text-bg hover:opacity-90"
          >
            What are peptides?
          </Link>
          <Link
            href="/science"
            className="inline-block rounded-lg border border-line px-5 py-2.5 font-medium hover:border-accent"
          >
            Browse {STUDIES.length} study summaries
          </Link>
        </p>
        <p className="mt-5 max-w-prose text-sm text-muted">{SITE.disclosure}</p>
      </section>

      {/* What are peptides */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold">What are peptides?</h2>
        <p className="mt-3 max-w-prose">
          Amino acids link into chains. Long, folded chains are proteins; short ones are peptides. There is no sharp
          line between the two, and the cut-off varies by source.
        </p>
        <div className="mt-5 grid gap-4 rounded-xl border border-line bg-card p-5 sm:grid-cols-4">
          <div>
            <Dots n={1} label="1 amino acid" />
            <p className="mt-2 text-sm font-medium">Amino acid</p>
            <p className="text-sm text-muted">The building block</p>
          </div>
          <div>
            <Dots n={3} label="3 amino acids" />
            <p className="mt-2 text-sm font-medium">GHK</p>
            <p className="text-sm text-muted">
              3 amino acids (<PaperLink id="pickart-2015" via="pmc">review</PaperLink>)
            </p>
          </div>
          <div>
            <Dots n={15} label="15 amino acids" />
            <p className="mt-2 text-sm font-medium">BPC-157</p>
            <p className="text-sm text-muted">
              15 amino acids (<PaperLink id="mcguire-2025" via="pmc">review</PaperLink>)
            </p>
          </div>
          <div>
            <p className="text-lg leading-none text-accent" aria-hidden="true">
              ●●●●●●●●●●●●●●●●●●●●…
            </p>
            <p className="mt-2 text-sm font-medium">Protein</p>
            <p className="text-sm text-muted">A long, folded chain, such as collagen</p>
          </div>
        </div>
        <p className="mt-4">
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
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold">How do they work?</h2>
        <ul className="mt-3 max-w-prose list-disc space-y-2 pl-5">
          <li>
            <strong>Some are signals.</strong> They attach to a receptor on a cell and change what it does. That is how
            peptide drugs such as insulin are designed to act.
          </li>
          <li>
            <strong>Swallowed peptides meet digestion.</strong> Whether anything active gets through, and does
            anything, is a question for trials.
          </li>
          <li>
            <strong>A mechanism is not proof.</strong> &ldquo;It blocks an enzyme&rdquo; is a reason to run a trial, not
            a result.
          </li>
        </ul>
        <p className="mt-4">
          <Link href="/peptides/how-peptides-work" className="link">
            How peptides work, with the evidence
          </Link>
        </p>
      </section>

      {/* Types */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold">What are the different types?</h2>
        <p className="mt-3 max-w-prose text-muted">
          We sort them by what matters to a reader: whether they are approved, and how much human evidence exists.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {TYPES.map((t) => (
            <div key={t.title} className="rounded-xl border border-line bg-card p-5">
              <h3 className="font-semibold">{t.title}</h3>
              <p className="mt-2">
                <span className={`chip ${t.tone === "warn" ? "border-warn text-warn" : "border-accent text-accent"}`}>
                  {t.status}
                </span>
              </p>
              <p className="mt-3 text-sm text-muted">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Are peptides safe?</h2>
        <p className="mt-3 max-w-prose">
          There is no single answer, because &ldquo;peptides&rdquo; is not a single thing. Here is what we know, by type.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-card text-muted">
              <tr>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">What is known</th>
              </tr>
            </thead>
            <tbody>
              {SAFETY.map((r) => (
                <tr key={r.type} className="border-t border-line align-top">
                  <th scope="row" className="px-3 py-2 font-medium">
                    {r.type}
                  </th>
                  <td className="px-3 py-2">{r.known}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          <Link href="/science/topics/safety" className="link">
            Safety evidence in detail
          </Link>
        </p>
      </section>

      {/* Evidence at a glance */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Do they work? The evidence at a glance</h2>
        <p className="mt-3 max-w-prose text-muted">
          For each topic, the best-supported claim we have summarised. Open a topic for every rating.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {TOPIC_SLUGS.map((slug) => {
            const t = TOPICS[slug];
            const top = strongest(t.ratings);
            return (
              <Link
                key={slug}
                href={`/science/topics/${slug}`}
                className="rounded-xl border border-line bg-card p-5 hover:border-accent"
              >
                <h3 className="font-semibold">{t.title}</h3>
                <p className="mt-3 text-sm">{top.subject}</p>
                <p className="mt-2">
                  <LevelChip level={top.level} />
                </p>
                <p className="mt-3 text-sm text-muted">
                  {t.ratings.length} {t.ratings.length === 1 ? "rating" : "ratings"}, reviewed {formatDate(t.reviewedOn)}
                </p>
              </Link>
            );
          })}
        </div>
        <p className="mt-3 text-sm text-muted">
          Ratings reflect only the studies summarised here.{" "}
          <Link href="/science/methodology" className="link">
            How ratings are set
          </Link>
          .
        </p>
      </section>

      {/* Legal */}
      <section className="mt-16 max-w-3xl rounded-xl border border-line bg-card p-5">
        <h2 className="text-2xl font-semibold">Are peptides legal?</h2>
        <p className="mt-3 max-w-prose">
          It depends on the peptide and how it is made and sold. Some are FDA-approved drugs; many popular wellness
          peptides are not approved for any use. In July 2026 an FDA advisory committee considered seven of them for the
          compounding bulks list, and according to news reports it recommended {recommended}. We found no final FDA
          action as of {formatDate(LEGAL_REVIEWED)}.
        </p>
        <p className="mt-3">
          <Link href="/peptides/legal-status" className="link">
            Legal status, with sources and dates
          </Link>
        </p>
      </section>

      {/* Checklist */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold">How to judge a peptide claim</h2>
        <p className="mt-3 max-w-prose text-muted">
          Five questions we ask of every study. They work on ads and social media posts too.
        </p>
        <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHECKLIST.map((c, i) => (
            <li key={c.q} className="rounded-xl border border-line bg-card p-5">
              <p className="text-sm font-medium text-accent">{i + 1}</p>
              <p className="mt-1 font-semibold">{c.q}</p>
              <p className="mt-2 text-sm text-muted">{c.why}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4">
          <Link href="/science/methodology" className="link">
            Read the methodology
          </Link>
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="mt-4 space-y-6">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-1 max-w-prose text-muted">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-4">
          <Link href="/peptides" className="link">
            More questions, answered
          </Link>
        </p>
      </section>

      {/* Trust */}
      <section className="mt-16 max-w-3xl border-t border-line pt-8">
        <h2 className="text-xl font-semibold">Why trust this site</h2>
        <ul className="mt-3 max-w-prose list-disc space-y-2 pl-5 text-sm">
          <li>
            {STUDIES.length} studies summarised from their abstracts, with who paid for each, and what it cannot show.
          </li>
          <li>
            Public{" "}
            <Link href="/corrections" className="link">
              corrections log
            </Link>{" "}
            and{" "}
            <Link href="/editorial-policy" className="link">
              editorial policy
            </Link>
            ; the full dataset is open as{" "}
            <Link href="/data" className="link">
              CSV and JSON
            </Link>
            .
          </li>
          <li>
            {SITE.disclosure}{" "}
            <Link href="/about" className="link">
              About this site
            </Link>
            .
          </li>
        </ul>
        <p className="mt-4 text-sm text-muted">
          {SITE.disclaimer} Last reviewed {formatDate(SITE.lastReviewed)}.
        </p>
      </section>
    </div>
  );
}
