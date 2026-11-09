import type { Metadata } from "next";
import { KIND_HINT, KIND_LABEL, STUDIES, type StudyKind } from "@/lib/studies";
import { LEVEL_HINT, LEVEL_LABEL, type Level } from "@/lib/topics";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Methodology: how we summarise studies",
  description:
    "How studies are chosen, summarised, rated and checked, how funding is reported, and what this site does not cover yet.",
  alternates: { canonical: "/science/methodology" },
};

export default function MethodologyPage() {
  const kinds = Object.keys(KIND_LABEL) as StudyKind[];
  const levels = Object.keys(LEVEL_LABEL) as Level[];
  return (
    <div className="max-w-3xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Methodology</h1>
        <p className="mt-3 max-w-prose text-lg text-muted">
          How a study gets onto this site, how it is summarised, and how we try not to get it wrong.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold">What every study page contains</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Who or what was studied, the design, dose and duration where the abstract gives them.</li>
          <li>What it found, in our words.</li>
          <li>What it does not show: design limits, who was excluded, what the numbers cannot tell you.</li>
          <li>Funding and conflict-of-interest statements as the record states them. If none appear, the page says so.</li>
          <li>Links to PubMed and, where available, the free full text and DOI.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How summaries are written</h2>
        <p className="mt-3 max-w-prose">
          Each summary is written from the study&apos;s own abstract and is never pasted from it. A summary can only
          say what the abstract supports. When a claim circulates that the abstract does not support, it is recorded
          on the study page as unverified, not repeated. Whenever an entry changes, the abstract is read again.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How identifiers are checked</h2>
        <p className="mt-3 max-w-prose">
          The PubMed ID, DOI and PMC ID for each study come from PubMed itself, and a script compares every entry with
          PubMed&apos;s record (first author, year, DOI and PMC ID). That catches a wrong link. It cannot tell whether
          a summary matches what the paper found, which still takes a person reading it.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Study designs</h2>
        <p className="mt-3 max-w-prose">
          The design label tells you how much weight a result can bear. It says nothing about whether the study was
          well done.
        </p>
        <dl className="mt-4 space-y-3">
          {kinds.map((k) => (
            <div key={k}>
              <dt className="font-medium">{KIND_LABEL[k]}</dt>
              <dd className="text-sm text-muted">{KIND_HINT[k]}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How topic verdicts are set</h2>
        <p className="mt-3 max-w-prose">
          Each topic page rates the evidence for each peptide or use separately, using only the studies summarised
          here. The rating is a judgement written by hand, not a score, and it carries a review date.
        </p>
        <dl className="mt-4 space-y-3">
          {levels.map((l) => (
            <div key={l}>
              <dt className="font-medium">{LEVEL_LABEL[l]}</dt>
              <dd className="text-sm text-muted">{LEVEL_HINT[l]}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="text-xl font-semibold">What is not here yet</h2>
        <p className="mt-3 max-w-prose">
          This hub currently holds {STUDIES.length} studies: oral collagen and marine peptides, and BPC-157 and other
          injectable peptides. We found no human trials of oral marine peptides for joints, immune function or
          vision, and the hub does not cover prescription peptide drugs such as the GLP-1 medicines. Legal and regulatory status has its own dated page, with the limits of what
          it covers stated there. Absence from this site is not evidence of absence.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Independence and disclosure</h2>
        <p className="mt-3 max-w-prose">{SITE.disclosure}</p>
      </section>
    </div>
  );
}
