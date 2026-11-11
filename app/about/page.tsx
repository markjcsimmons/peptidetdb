import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { STUDIES } from "@/lib/studies";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "About PeptideTDB",
  description:
    "What PeptideTDB is, who runs it, how it is funded, and what it does and does not do.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">About {SITE.name}</h1>
        <p className="mt-3 max-w-prose text-lg text-muted">
          {SITE.name} is the {SITE.fullName}. {SITE.description}
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold">Who runs it, and who pays</h2>
        <p className="mt-3 max-w-prose">{SITE.disclosure}</p>
        <p className="mt-3 max-w-prose">
          That connection matters when you read anything here that touches a supplement brand, so it is stated
          openly, on every page footer and wherever a Pürblack product is named.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">What this site does</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>
            Summarises peer-reviewed studies on peptides ({STUDIES.length} so far), saying what each found, what it
            cannot show, and who funded it.
          </li>
          <li>Rates the evidence for each use on a topic page, with the date the rating was last reviewed.</li>
          <li>Explains peptide terms and the legal and regulatory picture, with sources and dates.</li>
          <li>Publishes its study registry as a free download.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">What it does not do</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>It does not give medical or legal advice or recommend that you use any peptide.</li>
          <li>It does not sell products.</li>
          <li>
            It does not grade or score any products. A draft grading rubric is published first, at{" "}
            <Link href="/grading-rubric" className="link">
              /grading-rubric
            </Link>
            . One page,{" "}
            <Link href="/peptides/best-collagen-peptides" className="link">
              collagen peptides with published batch test results
            </Link>
            , records which collagen brands publish lab reports; it lists documents we found and is not a grade.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to judge it</h2>
        <p className="mt-3 max-w-prose">
          Read the{" "}
          <Link href="/editorial-policy" className="link">
            editorial policy
          </Link>
          , the{" "}
          <Link href="/science/methodology" className="link">
            methodology
          </Link>{" "}
          and the{" "}
          <Link href="/corrections" className="link">
            corrections log
          </Link>
          , and check any summary against the linked paper. The{" "}
          <Link href="/data" className="link">
            full registry
          </Link>{" "}
          is downloadable.
        </p>
      </section>

      {SITE.contactEmail && (
        <section>
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="mt-3">
            To report an error or send a study for consideration, email{" "}
            <a href={`mailto:${SITE.contactEmail}`} className="link">
              {SITE.contactEmail}
            </a>
            .
          </p>
        </section>
      )}

      <p className="text-sm text-muted">{SITE.disclaimer} Last reviewed {formatDate(SITE.lastReviewed)}.</p>
    </div>
  );
}
