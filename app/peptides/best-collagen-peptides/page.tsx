import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { JsonLd } from "@/components/json-ld";
import { Callout, CARD, Pill } from "@/components/ui";
import { PageContents } from "@/components/page-contents";
import { PageKindLabel } from "@/components/guide-links";
import {
  CERTIFIED,
  COLLAGEN_CHECKED_ON,
  REPORTED,
  UNVERIFIED,
  type Link as Ref,
} from "@/lib/product-checks";

export const metadata: Metadata = {
  title: "Collagen peptides with published batch test results",
  description:
    "Looking for the best collagen peptides? We checked 15 brands for batch-specific lab reports and NSF listings, read the reports, and show what each one does and does not document. It does not rank effectiveness.",
  alternates: { canonical: "/peptides/best-collagen-peptides" },
};

const NSF_SUPPLEMENT_PAGE = "https://www.nsf.org/consumer-resources/articles/supplement-vitamin-certification";
const NSF_SPORT_PAGE = "https://www.nsfsport.com/our-mark.php";

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is the best collagen peptide supplement?",
    a: "This page does not name one. Human trials of collagen peptides test a collagen preparation, not a brand, and we found no study comparing brands. What we can check is documentation: whether a brand publishes lab reports for the batch you hold. Of 15 brands checked on 11 November 2026, three did.",
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
              name: "Collagen peptides with published batch test results",
              item: absoluteUrl("/peptides/best-collagen-peptides"),
            },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Collagen peptides with published batch test results
      </nav>
      <PageKindLabel path="/peptides/best-collagen-peptides" />
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">
        Collagen peptides with published batch test results
      </h1>
      <p className="mt-2 text-sm text-muted">
        Documents checked {formatDate(COLLAGEN_CHECKED_ON)}. Page last reviewed {formatDate(COLLAGEN_CHECKED_ON)}.
      </p>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          We checked 15 collagen brands for lab reports you can read. <strong>Three publish batch-specific reports</strong>{" "}
          (Momentous, Puori and Transparent Labs), and we opened and read them. <strong>Five more</strong> are listed by NSF
          but do not publish a batch report we could find. For the other seven we could not verify a testing claim. This
          page ranks documentation, not results: it does not say any brand&rsquo;s collagen works better than another&rsquo;s,
          and it is not a product grade.
        </p>
      </Callout>

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
            <strong className="text-fg">Not a grade.</strong> Our{" "}
            <Link href="/grading-rubric" className="link">
              draft grading rubric
            </Link>{" "}
            has not been applied: no points are given here, and no product is graded. Within each group, brands are in
            alphabetical order.
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

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Group 1: publish batch-specific lab reports ({REPORTED.length})</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          For each brand below we opened the reports ourselves. Each has strengths and gaps, shown side by side.
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
        {SITE.disclaimer} Documents checked {formatDate(COLLAGEN_CHECKED_ON)}.
      </p>
    </article>
  );
}
