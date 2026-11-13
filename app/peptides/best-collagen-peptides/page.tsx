import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { JsonLd } from "@/components/json-ld";
import { CARD, Pill, ShortAnswer } from "@/components/ui";
import { PageContents } from "@/components/page-contents";
import { PageKindLabel } from "@/components/guide-links";
import { GradeTable, ScoringRules, ScoringSheet } from "@/components/product-grades";
import { GRADES_CHECKED_ON, ranked } from "@/lib/grades";
import {
  CERTIFIED,
  COLLAGEN_CHECKED_ON,
  REPORTED,
  UNVERIFIED,
  type Link as Ref,
} from "@/lib/product-checks";

export const metadata: Metadata = {
  title: "Best collagen peptides: 15 brands graded",
  description:
    "Looking for the best collagen peptides? We graded 15 brands out of 100 on batch lab reports, certification listings, labels and claims, with a scoring sheet for each. It does not rank effectiveness.",
  alternates: { canonical: "/peptides/best-collagen-peptides" },
};

const NSF_SUPPLEMENT_PAGE = "https://www.nsf.org/consumer-resources/articles/supplement-vitamin-certification";
const NSF_SPORT_PAGE = "https://www.nsfsport.com/our-mark.php";

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is the best collagen peptide supplement?",
    a: "No study has compared brands, so no one can say which works best. Human trials of collagen peptides test a collagen preparation, not a brand. What we can check is documentation. Of 15 brands graded on 13 November 2026, Momentous (86 of 100), Puori (81) and Transparent Labs (80) scored highest, and they were the only three that publish lab reports for the lot you buy.",
  },
  {
    q: "Do collagen peptide supplements contain heavy metals?",
    a: "We found no published study of contaminants in collagen supplements, so we cannot give a general answer. Batch reports show results for individual lots: the reports we read gave arsenic, cadmium, mercury and lead results, with the limits and units printed on each report. Results describe one lot and do not carry over to others.",
  },
  {
    q: "Is an NSF certification the same as a lab report?",
    a: "No. NSF describes its dietary-supplement certification as a label review, a toxicology review and a contaminant review, with annual audits and periodic retesting, and its Certified for Sport mark as adding a screen for banned substances. A certification tells you a product met a programme's requirements. It does not give you the numbers for the container you are holding.",
  },
  {
    q: "Do I need a sport-certified collagen?",
    a: "Only if you are subject to anti-doping testing. The Certified for Sport mark adds a banned-substance screen. It is not evidence that collagen works better.",
  },
  {
    q: "Does a clean lab report mean the collagen will work?",
    a: "No. A report describes what was in a batch. Whether collagen peptides help skin, joints or muscle is a question for human trials, summarised on this site.",
  },
];

function Links({ links }: { links: Ref[] }) {
  if (links.length === 0) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
      {links.map((l) => (
        <li key={l.href}>
          <a href={l.href} target="_blank" rel="noopener noreferrer" className="link">
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function BestCollagenPeptidesPage() {
  return (
    <article className="relative mx-auto max-w-3xl">
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
            {
              "@type": "ListItem",
              position: 3,
              name: "Best collagen peptides: 15 brands graded",
              item: absoluteUrl("/peptides/best-collagen-peptides"),
            },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Best collagen peptides: 15 brands graded
      </nav>
      <PageKindLabel path="/peptides/best-collagen-peptides" />
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">
        Best collagen peptides: 15 brands graded
      </h1>
      <p className="mt-2 text-sm text-muted">
        Grades checked {formatDate(GRADES_CHECKED_ON)}; lab reports and registries first read {formatDate(COLLAGEN_CHECKED_ON)}.
        Page last reviewed {formatDate(GRADES_CHECKED_ON)}.
      </p>

      <ShortAnswer className="mt-6">
        <p className="max-w-prose text-lg leading-relaxed sm:text-xl sm:leading-relaxed [text-wrap:pretty]">
          We graded 15 collagen brands out of 100 with our published rubric. <strong>Momentous scored highest (86)</strong>,
          followed by Puori (81) and Transparent Labs (80): the only three that publish lab reports for the lot you buy.
          Without such a report a product cannot rate above &ldquo;Partly documented&rdquo;, and the other twelve scored 32
          to 64. The grades measure what can be checked, not results: they do not say any brand&rsquo;s collagen works better
          than another&rsquo;s.
        </p>
      </ShortAnswer>

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">How we checked, and what this page is not</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft [text-wrap:pretty]">
          <li>
            <strong className="text-fg">What counts as a batch report.</strong> A lab report for a particular lot, with the
            lot number, a named lab, the test methods, and numbers rather than &ldquo;pass&rdquo;. See{" "}
            <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
              how to read a peptide COA
            </Link>
            .
          </li>
          <li>
            <strong className="text-fg">What counts as a certification.</strong> We looked each claim up in the
            certifier&rsquo;s public registry (NSF&rsquo;s lists; Informed Choice for one brand) instead of trusting the
            brand&rsquo;s page.
          </li>
          <li>
            <strong className="text-fg">We did not test any product.</strong> Everything below comes from documents the
            companies, labs and certifiers publish, as they stood on {formatDate(COLLAGEN_CHECKED_ON)}. Reports describe
            one lot, and a company can change them.
          </li>
          <li>
            <strong className="text-fg">How the grades work.</strong> Each product is scored with our{" "}
            <Link href="/grading-rubric" className="link">
              grading rubric
            </Link>{" "}
            (version 1.1; version 1.0 was confirmed before any product was graded): 42 points for batch testing and certification, 23 for
            the label, 25 for claims against the human evidence and 10 for regulatory status and company identity. Every
            point has a note and a source in the product&rsquo;s scoring sheet.
          </li>
          <li>
            <strong className="text-fg">No money changes hands.</strong> We take no payment, free product or affiliate
            commission from any brand on this page, and there are no affiliate links. The brands did not see this page
            before publication. {SITE.disclosureShort} Pürblack does not sell collagen peptides, so none of the products below
            competes with its products.
          </li>
          <li>
            <strong className="text-fg">Not listed means not verified.</strong> A brand that is in the last group, or not
            on this page, may still make a good product. If we got something wrong or you can show us a document, email{" "}
            {SITE.contactEmail ? (
              <a href={`mailto:${SITE.contactEmail}`} className="link">
                {SITE.contactEmail}
              </a>
            ) : (
              "us"
            )}
            ; accepted changes are dated on the{" "}
            <Link href="/corrections" className="link">
              corrections page
            </Link>
            .
          </li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What the science says, and what it cannot say about a brand</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Human trials of swallowed collagen peptides point the same way for skin hydration and elasticity, though most
          trials have limits and the size of the effect is uncertain (
          <Link href="/science/topics/skin" className="link">
            skin evidence
          </Link>
          ). For joint pain in osteoarthritis the results are mixed (
          <Link href="/science/topics/joints" className="link">
            joint evidence
          </Link>
          ), and for muscle the evidence is of collagen as an add-on to resistance training (
          <Link href="/science/topics/muscle" className="link">
            muscle evidence
          </Link>
          ). Those trials tested particular collagen preparations at particular doses; none tells you about the powder in
          a given tub. We also found no published study of contaminants in collagen supplements, which is why a batch
          report is the only way to check a specific lot. The full picture is on{" "}
          <Link href="/peptides/collagen-peptides" className="link">
            collagen peptides: what the evidence shows
          </Link>
          .
        </p>
      </section>

      <section id="grades" className="mt-14 scroll-mt-6">
        <h2 className="text-3xl font-bold leading-[1.15]">The grades</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Highest first. Select a product, or open its sheet below, for every criterion with its points, what we found and
          a link to the document. &ldquo;Could not check&rdquo; counts as 0; if a brand sends us the missing document, we will
          regrade it and date the change.
        </p>
        <GradeTable grades={ranked("collagen")} />
        <ScoringRules />
        <h3 className="mt-10 text-2xl font-bold leading-tight">Scoring sheets</h3>
        <div className="mt-4 grid gap-4">
          {ranked("collagen").map((g) => (
            <ScoringSheet key={g.id} g={g} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Group 1: publish batch-specific lab reports ({REPORTED.length})</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The sections below are the documentation record behind the grades, grouped by what we found. For each brand in
          this group we opened the reports ourselves. Each has strengths and gaps, shown side by side.
        </p>
        <div className="mt-6 grid gap-6">
          {REPORTED.map((p) => (
            <section key={p.id} id={p.id} className={CARD}>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-2xl font-bold leading-tight">
                  {p.brand} <span className="text-lg font-medium text-muted">{p.product}</span>
                </h3>
                <Pill tone="accent">Batch reports published</Pill>
              </div>
              <dl className="mt-4 space-y-3 text-soft">
                <div>
                  <dt className="font-semibold text-fg">What it is</dt>
                  <dd className="max-w-prose [text-wrap:pretty]">{p.what}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-fg">Where the reports are</dt>
                  <dd className="max-w-prose [text-wrap:pretty]">{p.reports}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-fg">What we read</dt>
                  <dd className="max-w-prose [text-wrap:pretty]">{p.read}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-fg">Who ran the tests</dt>
                  <dd className="max-w-prose [text-wrap:pretty]">{p.lab}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-fg">What the reports show</dt>
                  <dd>
                    <ul className="mt-1 max-w-prose list-disc space-y-1 pl-5">
                      {p.results.map((r) => (
                        <li key={r} className="[text-wrap:pretty]">
                          {r}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                {p.certification && (
                  <div>
                    <dt className="font-semibold text-fg">Certification</dt>
                    <dd className="max-w-prose [text-wrap:pretty]">{p.certification}</dd>
                  </div>
                )}
                <div>
                  <dt className="font-semibold text-fg">Gaps and things to check</dt>
                  <dd>
                    <ul className="mt-1 max-w-prose list-disc space-y-1 pl-5">
                      {p.gaps.map((g) => (
                        <li key={g} className="[text-wrap:pretty]">
                          {g}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-fg">Health claims on the seller&rsquo;s page</dt>
                  <dd className="max-w-prose [text-wrap:pretty]">{p.claims}</dd>
                </div>
              </dl>
              <Links links={p.links} />
            </section>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Group 2: listed by NSF, no batch report found ({CERTIFIED.length})</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          NSF describes its{" "}
          <a href={NSF_SUPPLEMENT_PAGE} target="_blank" rel="noopener noreferrer" className="link">
            dietary-supplement certification
          </a>{" "}
          as a label review, a toxicology review and a contaminant review, with annual audits and retesting, and its{" "}
          <a href={NSF_SPORT_PAGE} target="_blank" rel="noopener noreferrer" className="link">
            Certified for Sport
          </a>{" "}
          mark as adding a screen for banned substances. These are NSF&rsquo;s own descriptions. A listing is real
          third-party oversight, but it is not a report for the lot you hold, so these brands cannot show you numbers for
          your container the way Group 1 can.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {CERTIFIED.map((p) => (
            <section key={p.id} id={p.id} className={CARD}>
              <h3 className="text-xl font-bold leading-tight">{p.brand}</h3>
              <p className="text-sm text-muted">{p.product}</p>
              <dl className="mt-3 space-y-2 text-sm text-soft">
                <div>
                  <dt className="font-semibold text-fg">What it is</dt>
                  <dd className="[text-wrap:pretty]">{p.what}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-fg">What the registry shows</dt>
                  <dd className="[text-wrap:pretty]">{p.registry}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-fg">Batch report</dt>
                  <dd className="[text-wrap:pretty]">{p.batchReport}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-fg">Claims on the page</dt>
                  <dd className="[text-wrap:pretty]">{p.claims}</dd>
                </div>
              </dl>
              <Links links={p.links} />
            </section>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Group 3: we could not verify the testing claim ({UNVERIFIED.length})</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          For these brands we did not find a batch report or a matching registry listing, or we could not check the
          certification the brand cites. That is a statement about what we found on {formatDate(COLLAGEN_CHECKED_ON)}, not
          a finding about the product. If a brand has a report we missed, we will add it.
        </p>
        <div className="mt-6 grid gap-4">
          {UNVERIFIED.map((p) => (
            <section key={p.id} id={p.id} className="rounded-card border border-line bg-card p-5">
              <h3 className="text-lg font-bold leading-tight">
                {p.brand} <span className="font-medium text-muted">{p.product}</span>
              </h3>
              <p className="mt-2 max-w-prose text-soft [text-wrap:pretty]">{p.note}</p>
              <Links links={p.links} />
            </section>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Check the tub you are holding</h2>
        <ol className="mt-4 max-w-prose list-decimal space-y-2 pl-6 text-soft [text-wrap:pretty]">
          <li>Find the lot (batch) number printed on the container.</li>
          <li>
            Find that exact lot on the brand&rsquo;s test page, or ask the company for the report for that lot. A report for a
            different lot or flavour does not describe yours.
          </li>
          <li>
            Check the lab is named, the limits and results are numbers, and the metals and microbes you care about are
            included. Our{" "}
            <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
              COA checklist
            </Link>{" "}
            goes line by line.
          </li>
          <li>
            If the product is fish-derived (marine) and anyone in the household has a fish allergy, read{" "}
            <Link href="/peptides/collagen-peptides-side-effects" className="link">
              the side-effects page
            </Link>
            : fish collagen has caused anaphylaxis in a child with fish allergy.
          </li>
        </ol>
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

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Lab reports first read {formatDate(COLLAGEN_CHECKED_ON)}; grades checked {formatDate(GRADES_CHECKED_ON)}.
      </p>
    </article>
  );
}
