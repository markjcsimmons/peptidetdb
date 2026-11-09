import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Editorial policy",
  description:
    "How PeptideTDB chooses, summarises and rates studies, reports funding, handles conflicts of interest and logs corrections.",
  alternates: { canonical: "/editorial-policy" },
};

const sections: { h: string; body: React.ReactNode }[] = [
  {
    h: "Scope",
    body: (
      <p>
        Peptides and the scientific evidence about them: collagen and other oral peptides, skin-care peptides, and
        unapproved compounds sold for injury recovery or performance, plus the regulatory picture for the latter.
        Products are not graded or ranked.
      </p>
    ),
  },
  {
    h: "Choosing studies",
    body: (
      <p>
        We look for peer-reviewed research in PubMed on the peptides and topics covered. The aim is to include
        studies whatever they found, positive, negative or null, and to describe each design honestly. Reviews are
        labelled as reviews, and animal and cell studies are labelled as such, so a reader can see how much of the
        evidence comes from people.
      </p>
    ),
  },
  {
    h: "Writing summaries",
    body: (
      <p>
        Each summary is written from the study&apos;s abstract, in our own words, and says what was found, what the
        study cannot show, and who paid for it. A summary only claims what the abstract supports. Anything an
        article or a brand claims about a paper that the abstract does not support is recorded on the study page as
        unverified. Because we work from abstracts, a summary can miss detail that appears only in the full text.
      </p>
    ),
  },
  {
    h: "Checking identifiers",
    body: (
      <p>
        PubMed IDs, DOIs and PMC IDs come from PubMed. A script compares every study with PubMed&apos;s record
        (first author, year, DOI and PMC ID) so that a link cannot silently point at the wrong paper. This checks
        identifiers; it does not check whether a summary matches the paper, which takes a person reading it.
      </p>
    ),
  },
  {
    h: "Funding and conflicts of interest",
    body: (
      <p>
        We report the funding and conflict-of-interest statements as the PubMed record states them. If a record says
        nothing, the study page says so and points to the full text. Industry funding is noted, not treated as
        disqualifying.
      </p>
    ),
  },
  {
    h: "Evidence verdicts",
    body: (
      <p>
        Topic pages rate the evidence for each peptide or use with a hand-written verdict and a review date. A verdict
        reflects only the studies summarised on this site. The levels are explained on the{" "}
        <Link href="/science/methodology" className="link">
          methodology page
        </Link>
        .
      </p>
    ),
  },
  {
    h: "Corrections",
    body: (
      <p>
        When a published claim, summary, identifier, verdict or date is found to be wrong, we fix it and record the
        change, with the date and what the page said before, in the{" "}
        <Link href="/corrections" className="link">
          corrections log
        </Link>
        .
      </p>
    ),
  },
  {
    h: "Independence",
    body: (
      <>
        <p>{SITE.disclosure}</p>
        <p className="mt-3">
          No product is currently graded or ranked on this site. Any page that names, links or grades a Pürblack
          product will carry this disclosure beside it.
        </p>
      </>
    ),
  },
  {
    h: "Legal and regulatory pages",
    body: (
      <p>
        Regulatory pages are written from FDA, HHS and Federal Register documents wherever they exist, show the date
        they were last reviewed, and label news reports as news. They are not legal advice.
      </p>
    ),
  },
];

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">Editorial policy</h1>
      <p className="mt-3 max-w-prose text-lg text-muted">
        How {SITE.name} chooses, summarises and rates studies, and what we do when we get something wrong.
      </p>
      <div className="mt-8 space-y-8">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-xl font-semibold">{s.h}</h2>
            <div className="mt-3 max-w-prose space-y-3">{s.body}</div>
          </section>
        ))}
      </div>
      <p className="mt-10 text-sm text-muted">Last reviewed {formatDate(SITE.lastReviewed)}.</p>
    </div>
  );
}
