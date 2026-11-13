import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { JsonLd } from "@/components/json-ld";
import { Callout } from "@/components/ui";
import { DisclosureNote } from "@/components/disclosure-note";
import { BANDS, CAPS, DEDUCTIONS, RUBRIC, RUBRIC_DATE, RUBRIC_FIRST_PUBLISHED, RUBRIC_VERSION, TOTAL_POINTS, VERSIONS } from "@/lib/rubric";

export const metadata: Metadata = {
  title: "How we will grade products (draft rubric)",
  description:
    "The draft rubric PeptideTDB will use to grade peptide products, published before any product is graded. It scores how well a product's documentation can be checked, not whether it works.",
  alternates: { canonical: "/grading-rubric" },
};

const COMMITMENTS = [
  "The rubric is published before any product is graded, so the rules cannot be fitted to a result.",
  "Every product is graded by the same rules, including products sold by Pürblack. A Pürblack grade, if there is one, will carry the disclosure above and the full scoring sheet.",
  "The site takes no payment, sponsorship, free product or affiliate commission from any company it grades.",
  "Every point awarded or withheld is backed by a dated link or document, shown in the scoring sheet, so a reader can check it.",
  "Companies can send documents or point out errors; accepted changes are dated and logged on the corrections page.",
  "Changes to this rubric are dated and listed on this page, and each grade names the version it used.",
];

export default function GradingRubricPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: SITE.name, item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Grading rubric", item: absoluteUrl("/grading-rubric") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/about" className="link">
          About
        </Link>{" "}
        / Grading rubric
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">How we will grade products</h1>
      <p className="mt-2 text-sm text-muted">
        Draft version {RUBRIC_VERSION}, updated {formatDate(RUBRIC_DATE)} (first published {formatDate(RUBRIC_FIRST_PUBLISHED)}).
        No product has been graded yet.
      </p>

      <DisclosureNote>
        Pürblack sells peptide supplements. The operator of this site works for Pürblack, so we are publishing the rules
        first and will apply them to every product the same way, including Pürblack&rsquo;s.
      </DisclosureNote>

      <Callout label="What a grade means" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          A grade mainly says how well a product&rsquo;s public documentation can be checked: lab reports, certification,
          label, claims and company details. Points are also taken off for two safety concerns: banned or undeclared drug
          substances, and unapproved injectables. A grade does not say the product works, is safe, or is legal. We do not test products ourselves, so
          a grade describes documents as they were on the date we looked.
        </p>
      </Callout>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Why this comes first</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The studies section of this site summarises what research shows. Products are a different question: a study of
          one collagen peptide says nothing about the powder in a particular tub. The checks below are the ones our
          guide to{" "}
          <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
            reading a peptide COA
          </Link>{" "}
          tells readers to make themselves. This draft is open to comment; email{" "}
          {SITE.contactEmail ? (
            <a href={`mailto:${SITE.contactEmail}`} className="link">
              {SITE.contactEmail}
            </a>
          ) : (
            "us"
          )}
          . The point values are proposals, and we expect to change them after feedback.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">The criteria ({TOTAL_POINTS} points)</h2>
        <div className="mt-6 grid gap-5">
          {RUBRIC.map((c) => {
            const pts = c.criteria.reduce((n, k) => n + k.points, 0);
            return (
              <div key={c.id} className="rounded-card border border-line bg-card p-6">
                <h3 className="text-xl font-bold">
                  {c.name} <span className="text-base font-medium text-muted">({pts} points)</span>
                </h3>
                <p className="mt-1 max-w-prose text-sm text-muted">{c.why}</p>
                <ul className="mt-4 space-y-4">
                  {c.criteria.map((k) => (
                    <li key={k.id}>
                      <p className="font-semibold">
                        {k.name} <span className="font-normal text-muted">({k.points})</span>
                      </p>
                      <p className="mt-1 max-w-prose text-soft [text-wrap:pretty]">{k.asks}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Deductions</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Taken off after the points above are added up; a total cannot go below zero. Each deduction needs a dated source in
          the scoring sheet.
        </p>
        <ul className="mt-4 grid gap-4">
          {DEDUCTIONS.map((d) => (
            <li key={d.id} className="rounded-card border border-line bg-card p-6">
              <p className="font-semibold">
                {d.name} <span className="font-normal text-warn">({d.points} points)</span>
              </p>
              <p className="mt-1 max-w-prose text-soft [text-wrap:pretty]">{d.asks}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Grade bands and caps</h2>
        <div className="mt-4 overflow-x-auto rounded-tile border border-line">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <thead className="bg-card text-muted">
              <tr>
                <th className="px-3 py-2 font-medium">Grade</th>
                <th className="px-3 py-2 font-medium">Points</th>
                <th className="px-3 py-2 font-medium">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {BANDS.map((b) => (
                <tr key={b.label} className="border-t border-line align-top">
                  <td className="px-3 py-2 font-medium">{b.label}</td>
                  <td className="px-3 py-2">{b.range}</td>
                  <td className="px-3 py-2">{b.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          {CAPS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What a grade cannot tell you</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">Whether the product works.</strong> That is a question for human trials; see the{" "}
            <Link href="/science" className="link">
              studies hub
            </Link>
            .
          </li>
          <li>
            <strong className="text-fg">Whether it is safe for you.</strong> A well-documented product can still be a bad
            idea for a particular person.
          </li>
          <li>
            <strong className="text-fg">Whether the report is genuine.</strong> We can check a lab&rsquo;s details and
            ask the lab, but we cannot catch every forgery.
          </li>
          <li>
            <strong className="text-fg">Any other batch.</strong> A grade covers the documents we saw on the date we saw
            them.
          </li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Our commitments</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          {COMMITMENTS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Version history</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          {VERSIONS.map((v) => (
            <li key={v.version}>
              <strong className="text-fg">
                {formatDate(v.date)}, version {v.version}.
              </strong>{" "}
              {v.text}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-sm text-muted">{SITE.disclaimer}</p>
    </article>
  );
}
