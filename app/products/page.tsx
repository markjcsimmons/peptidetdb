import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { JsonLd } from "@/components/json-ld";
import { CARD } from "@/components/ui";
import { DisclosureNote } from "@/components/disclosure-note";
import { EvidenceMeter } from "@/components/evidence-meter";
import { BandPill } from "@/components/product-grades";
import { ProductRow, STEP, claimsFor } from "@/components/product-row";
import { ProductFinder, type FinderRow } from "@/components/product-finder";
import { ALL_GRADES, SHEETS_PAGE, isPurblack, result, type BandLabel, type Group } from "@/lib/grades";
import { PRODUCT_FACTS } from "@/lib/product-match";
import { BANDS } from "@/lib/rubric";
import type { Level } from "@/lib/topics";
import { guideFor } from "@/lib/guides";
import {
  BENEFITS,
  MADE_FROM_NOTE,
  MADE_FROM_ORDER,
  ROUTE_LABEL,
  SINGLE_MAKER_BENEFITS,
  hasLotReport,
  isSportTested,
  madeFromOf,
  routeOf,
  type Route,
} from "@/lib/product-finder";

export const metadata: Metadata = {
  title: "Peptide products graded: filter by benefit",
  description: `Compare ${ALL_GRADES.length} peptide and collagen products, each graded out of 100 for lab reports, certification, labelling and claims. Filter by benefit, form, source and testing.`,
  alternates: { canonical: "/products" },
};

const GRADED = [...ALL_GRADES].sort((a, b) => result(b).total - result(a).total || a.brand.localeCompare(b.brand));
const DATES = [...new Set(GRADED.map((g) => g.checkedOn))].sort();
const LOT = GRADED.filter(hasLotReport);
const SPORT = GRADED.filter(isSportTested);
const names = (list: typeof GRADED) => list.map((g) => `${g.brand} ${g.product}`).join("; ");

const FAQ: { q: string; a: string }[] = [
  {
    q: "Which peptide supplements publish a lab report for the lot you buy?",
    a: `Of the ${GRADED.length} products we graded, ${LOT.length} publish a lab report for each lot: ${names(LOT)}. The reports vary. Some state how much of the active ingredient is present and the range it should fall in; others cover only microbes and heavy metals, and do not confirm what the ingredient is or how much there is. Each scoring sheet says what we found.`,
  },
  {
    q: "Which peptide supplements are tested for substances banned in sport?",
    a: `Of the products we graded, ${SPORT.length} appear in a sport-testing programme's own directory (NSF Certified for Sport or Informed Choice): ${names(SPORT)}. A listing lowers the risk that a product contains a banned substance. It does not show that the product works.`,
  },
  {
    q: "Which peptide product works best?",
    a: "No trial has compared these products with each other. Trials test an ingredient, such as collagen peptides, not a brand. For each product we show how strong the human evidence is for its ingredient and the benefit claimed, and how well the maker documents what it sells.",
  },
];

/** Key for the evidence card: one example per step of the meter, in the words the rows use. */
const EVIDENCE_KEY: { level: Level; label: string }[] = [
  { level: "consistent", label: "Consistent" },
  { level: "limited", label: "Mixed or limited" },
  { level: "preclinical", label: "Mostly animal" },
  { level: "none", label: "No human trials" },
];

export default function ProductsPage() {
  const rows: FinderRow[] = GRADED.map((g) => {
    const f = PRODUCT_FACTS[g.id];
    const band = result(g).band;
    const steps: Record<string, number> = {};
    for (const b of BENEFITS) {
      const c = claimsFor(g, b.areas);
      if (c.length) steps[b.id] = Math.min(...c.map((x) => STEP[x.level]));
    }
    return {
      id: g.id,
      brand: g.brand,
      total: result(g).total,
      route: routeOf(f),
      madeFrom: madeFromOf(f),
      lot: hasLotReport(g),
      sport: isSportTested(g),
      documented: band === "Documented" || band === "Well documented",
      steps,
      purblack: isPurblack(g),
      node: <ProductRow g={g} areas={g.claimAreas} wide />,
    };
  });
  const usedFrom = MADE_FROM_ORDER.filter((m) => rows.some((r) => r.madeFrom === m));
  const groups = [...new Set(GRADED.map((g) => g.group))] as Group[];

  return (
    <article className="mx-auto max-w-5xl">
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
            { "@type": "ListItem", position: 2, name: "Products", item: absoluteUrl("/products") },
          ],
        }}
      />
      <p className="text-caption font-semibold uppercase tracking-[0.08em] text-accent">Product finder</p>
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl [text-wrap:balance]">
        Peptide products, graded and matched to the evidence
      </h1>
      <p className="mt-2 text-sm text-muted">
        Graded {formatDate(DATES[0])} to {formatDate(DATES[DATES.length - 1])}. Each scoring sheet shows its own date.
      </p>
      <p className="mt-5 max-w-prose text-lg text-soft [text-wrap:pretty]">
        All {GRADED.length} graded peptide and collagen products, with the evidence behind each claim and how well the maker
        documents it.{" "}
        <a href="#how-to-read" className="link">
          What the two ratings mean
        </a>
      </p>
      <DisclosureNote graded />

      <ProductFinder
        rows={rows}
        benefits={BENEFITS.map((b) => ({
          id: b.id,
          label: b.label,
          areas: b.areas,
          guide: b.guide,
          guideTitle: `See ${guideFor(b.guide).title.toLowerCase()}`,
        }))}
        routes={(["mouth", "skin"] as Route[]).map((id) => ({ id, label: ROUTE_LABEL[id] }))}
        madeFrom={usedFrom.map((m) => ({ id: m, label: m, note: MADE_FROM_NOTE[m] }))}
      />

      <section id="how-to-read" className="mt-14 scroll-mt-6">
        <h2 className="text-3xl font-bold leading-[1.15]">How to read the list</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">Each product has two separate ratings:</p>
        <ul className="mt-5 grid max-w-4xl gap-3 sm:grid-cols-2">
          <li className={`${CARD} !p-5`}>
            <strong className="block">Evidence behind the claim</strong>{" "}
            <span className="mt-1 block text-sm text-soft [text-wrap:pretty]">
              How strong the human research is for the product&rsquo;s <em>ingredient</em>, for each benefit the maker
              claims. The ratings come from our evidence pages; no trial has compared these brands with each other.
            </span>{" "}
            {/* A key to the meters; it means nothing without them, so the markdown skips it. */}
            <span
              data-md-skip
              className="mt-4 grid gap-x-4 gap-y-2 border-t border-line pt-4 text-caption text-soft lg:grid-cols-2"
            >
              {EVIDENCE_KEY.map((k) => (
                <span key={k.level} className="flex items-center gap-2">
                  <EvidenceMeter level={k.level} size="xs" labelled={false} />{" "}
                  <span className="whitespace-nowrap">{k.label}</span>
                </span>
              ))}
            </span>
          </li>
          <li className={`${CARD} !p-5`}>
            <strong className="block">Documentation grade</strong>{" "}
            <span className="mt-1 block text-sm text-soft [text-wrap:pretty]">
              A score out of 100 for how well the maker backs up what it sells: lab reports, certification, the label,
              its claims and company details, scored with our{" "}
              <Link href="/grading-rubric" className="link">
                published rubric
              </Link>
              . It does not tell you whether the product works.
            </span>{" "}
            <ul
              aria-label="Grade bands"
              className="mt-4 grid gap-x-4 gap-y-2 border-t border-line pt-4 text-caption text-soft lg:grid-cols-2"
            >
              {BANDS.map((b) => (
                <li key={b.label} className="flex items-center gap-2">
                  <span className="w-12 shrink-0 whitespace-nowrap tabular-nums text-muted">
                    {b.range.replace(" to ", "–")}
                    <span className="sr-only">:</span>
                  </span>{" "}
                  <BandPill band={b.label as BandLabel} />
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <p className="mt-5 max-w-prose text-sm text-muted [text-wrap:pretty]">
          Everything here is sold over the counter as a dietary supplement or a cosmetic. Prescription drugs and
          unapproved injectable peptides are not included; for those, see{" "}
          <Link href="/peptides/legal-status" className="link">
            legal status
          </Link>{" "}
          and{" "}
          <Link href="/peptides/for-weight-loss" className="link">
            weight-loss peptides
          </Link>
          . Being listed is not a recommendation, and the site takes no payment or affiliate commission from any brand.
        </p>

        <div className="max-w-prose">
          <ul className="mt-4 list-disc space-y-2 pl-6 text-soft [text-wrap:pretty]">
            <li>
              <strong className="text-fg">Pick a benefit and the evidence comes first.</strong> Products are sorted by
              the best rating among their claims for that benefit, then by grade. &ldquo;Mixed&rdquo; and
              &ldquo;limited&rdquo; count as the same step on our scale. &ldquo;Not assessed&rdquo; means we have not
              read any study of that ingredient for that benefit, so those products go to the bottom.
            </li>
            <li>
              <strong className="text-fg">
                Without a lot report, the best a product can score is &ldquo;Partly documented&rdquo;.
              </strong>{" "}
              Only a lab report for the batch you buy shows what is actually in your container. We check every
              certification in the certifier&rsquo;s own directory.
            </li>
            <li>
              <strong className="text-fg">Check &ldquo;Made from&rdquo; if you have a food allergy.</strong> Fish and
              milk are common allergens, and multi-source collagens may include fish or egg. &ldquo;Not stated&rdquo;
              means the label does not say.
            </li>
            {SINGLE_MAKER_BENEFITS.length > 0 && (
              <li>
                <strong className="text-fg">
                  Why there is no filter for {SINGLE_MAKER_BENEFITS.map((b) => b.label.toLowerCase()).join(" or ")}.
                </strong>{" "}
                The only graded products that claim these come from one maker, Pürblack, so the filter would show a
                single company&rsquo;s products. They are still in the full list, and the filter will be added once we
                grade products from other makers.
              </li>
            )}
          </ul>
          <p className="mt-4 text-soft [text-wrap:pretty]">
            Full scoring sheets for every product:{" "}
            {groups.map((gr, i) => (
              <span key={gr}>
                {i > 0 && "; "}
                <Link href={`${SHEETS_PAGE[gr].path}#grades`} className="link">
                  {SHEETS_PAGE[gr].title}
                </Link>
              </span>
            ))}
            .
          </p>
        </div>
      </section>

      <section className="mt-14 max-w-prose">
        <h2 className="text-3xl font-bold leading-[1.15]">Common questions</h2>
        <div className="mt-5 space-y-6">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-1 text-muted [text-wrap:pretty]">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-10 max-w-prose text-sm text-muted">{SITE.disclaimer}</p>
    </article>
  );
}
