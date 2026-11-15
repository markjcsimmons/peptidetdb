import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { JsonLd } from "@/components/json-ld";
import { CARD } from "@/components/ui";
import { DisclosureNote } from "@/components/disclosure-note";
import { EvidenceMeter, levelTone } from "@/components/evidence-meter";
import { BandPill } from "@/components/product-grades";
import { AREA_LABEL, STEP, claimsFor, sportProgramme } from "@/components/products-for-goal";
import { ProductFinder, type FinderRow } from "@/components/product-finder";
import { ALL_GRADES, SHEETS_PAGE, isPurblack, result, type Group } from "@/lib/grades";
import { INGREDIENT_LABEL, PRODUCT_FACTS, PRODUCT_URL } from "@/lib/product-match";
import { LEVEL_LABEL, type Level } from "@/lib/topics";
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
  description: `${ALL_GRADES.length} peptide and collagen products graded out of 100 on lab reports, certification, label and claims. Filter by the benefit claimed, how you take it, what it is made from and testing.`,
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
    a: `Of the ${GRADED.length} products we graded, ${LOT.length} publish reports for individual lots: ${names(LOT)}. What the reports cover differs: some give the amount of the active ingredient with limits, others only microbes and heavy metals with no identity or content result. Each scoring sheet says what we found.`,
  },
  {
    q: "Which peptide supplements are tested for substances banned in sport?",
    a: `${SPORT.length} of the products we graded are listed in a sport-testing programme's own directory (NSF Certified for Sport or Informed Choice): ${names(SPORT)}. A listing reduces the risk of a banned substance; it does not show that the product works.`,
  },
  {
    q: "Which peptide product works best?",
    a: "No trial has compared these products with each other. Trials test an ingredient, such as collagen peptides, not a brand. Each product here shows how strong the human evidence is for its ingredient and the benefit claimed, and how well the maker documents the product.",
  },
];

/** Short level names for the narrow evidence column; the full name is in the link title and for screen readers. */
const SHORT: Record<Level, string> = {
  consistent: "Consistent",
  mixed: "Mixed",
  limited: "Limited",
  preclinical: "Mostly animal",
  none: "No human trials",
  unassessed: "Not assessed",
};

function Row({ id }: { id: string }) {
  const g = ALL_GRADES.find((x) => x.id === id)!;
  const f = PRODUCT_FACTS[g.id];
  const r = result(g);
  const claims = claimsFor(g, g.claimAreas);
  const sport = sportProgramme(g);
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_17rem_7rem] md:gap-6">
      <div className="min-w-0">
        <a href={`${SHEETS_PAGE[g.group].path}#grade-${g.id}`} className="link font-semibold">
          {g.brand} {g.product}
        </a>
        <span className="sr-only">: </span>
        <span className="mt-1 block text-sm text-muted">
          {f.format} · {INGREDIENT_LABEL[f.ingredient]} · Source: {f.source}
        </span>{" "}
        <span className="mt-2 flex flex-wrap gap-2">
          {hasLotReport(g) && (
            <span className="rounded-full bg-accent-soft px-3 py-0.5 text-caption font-semibold text-accent">Lot reports published</span>
          )}
          {sport && <span className="rounded-full bg-accent-soft px-3 py-0.5 text-caption font-semibold text-accent">Sport-tested: {sport}</span>}
        </span>{" "}
        <a href={PRODUCT_URL[g.id]} target="_blank" rel="nofollow noopener noreferrer" className="link mt-2 inline-block text-sm">
          {g.brand}
          {g.brand.endsWith("s") ? "’" : "’s"} product page<span aria-hidden> ↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <div>
        <span className="sr-only">Evidence for its claims: </span>
        {claims.length === 0 ? (
          <span className="text-sm text-muted">No claim for its peptide or collagen ingredients in an area we rate.</span>
        ) : (
          <ul className="flex flex-col gap-2">
            {claims.map((c) => (
              <li key={c.area} data-area={c.area} className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-x-3 text-sm">
                <span className="text-muted">
                  {AREA_LABEL[c.area]}
                  <span className="sr-only">:</span>
                </span>{" "}
                {"href" in c ? (
                  <a href={c.href} className="flex items-center gap-2 hover:underline" title={`${LEVEL_LABEL[c.level]}: rating on our ${c.page} page`}>
                    <EvidenceMeter level={c.level} size="sm" labelled={false} />
                    <span className={`font-semibold ${levelTone(c.level) === "warn" ? "text-warn" : "text-accent"}`}>
                      <span data-md-skip>{SHORT[c.level]}</span>
                      <span className="sr-only">
                        {LEVEL_LABEL[c.level]}
                      </span>
                    </span>
                  </a>
                ) : (
                  <span className="text-muted" title={"note" in c ? c.note : undefined}>
                    Not assessed
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <span className="sr-only">Documentation grade: </span>
        <span className="text-2xl font-bold tabular-nums">
          {r.total}
          <span className="text-sm font-medium text-muted">/100</span>
        </span>{" "}
        <span className="mt-1.5 block">
          <BandPill band={r.band} />
        </span>
      </div>
    </div>
  );
}

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
      node: <Row id={g.id} />,
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
          mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
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
        {GRADED.length} products. Grades checked {formatDate(DATES[0])} to {formatDate(DATES[DATES.length - 1])}; each scoring sheet
        gives its date.
      </p>
      <p className="mt-6 max-w-prose text-lg text-soft [text-wrap:pretty]">
        Every over-the-counter peptide or collagen product we have graded, in one place. Pick the benefit you care about,
        then narrow by how you take it, what it is made from and how it is tested. Each product shows two separate things:
      </p>
      <ul className="mt-4 grid max-w-4xl gap-3 sm:grid-cols-2">
        <li className={`${CARD} !p-5`}>
          <strong className="block">Evidence for the claim</strong>{" "}
          <span className="mt-1 block text-sm text-soft [text-wrap:pretty]">
            How strong the human studies are for the product&rsquo;s <em>ingredient</em> and each benefit its maker claims,
            from our evidence pages. No trial has tested these brands against each other.
          </span>
        </li>
        <li className={`${CARD} !p-5`}>
          <strong className="block">Documentation grade</strong>{" "}
          <span className="mt-1 block text-sm text-soft [text-wrap:pretty]">
            How well the maker documents the product, out of 100, with our{" "}
            <Link href="/grading-rubric" className="link">
              published rubric
            </Link>
            : lab reports, certification, label, claims and company details. It is not a measure of whether it works.
          </span>
        </li>
      </ul>
      <DisclosureNote>Pürblack products are listed and graded by the same published rules as every other product.</DisclosureNote>
      <p className="mt-3 max-w-prose text-sm text-muted [text-wrap:pretty]">
        All of these are sold over the counter as dietary supplements or cosmetics. We do not list prescription drugs or
        unapproved injectable peptides; see{" "}
        <Link href="/peptides/legal-status" className="link">
          legal status
        </Link>{" "}
        and{" "}
        <Link href="/peptides/for-weight-loss" className="link">
          weight-loss peptides
        </Link>
        . Listing is not a recommendation, and we take no payment or affiliate commission from any brand.
      </p>

      <ProductFinder
        rows={rows}
        benefits={BENEFITS.map((b) => ({ id: b.id, label: b.label, areas: b.areas, guide: b.guide, guideTitle: `See ${guideFor(b.guide).title.toLowerCase()}` }))}
        routes={(["mouth", "skin"] as Route[]).map((id) => ({ id, label: ROUTE_LABEL[id] }))}
        madeFrom={usedFrom.map((m) => ({ id: m, label: m, note: MADE_FROM_NOTE[m] }))}
      />

      <section className="mt-14 max-w-prose">
        <h2 className="text-3xl font-bold leading-[1.15]">How to read the list</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-soft [text-wrap:pretty]">
          <li>
            <strong className="text-fg">Evidence comes first when you pick a benefit.</strong> Products are ordered by the
            strongest rating among their claims for that benefit, then by grade. &ldquo;Mixed&rdquo; and
            &ldquo;limited&rdquo; share a step on our scale. &ldquo;Not assessed&rdquo; means we have read no study of that
            ingredient for that benefit; it sorts last.
          </li>
          <li>
            <strong className="text-fg">A grade without a lot report stops at &ldquo;Partly documented&rdquo;.</strong>{" "}
            Only a report for the lot you buy shows what is in your container. Certification listings are checked in the
            certifier&rsquo;s own directory.
          </li>
          <li>
            <strong className="text-fg">&ldquo;Made from&rdquo; matters for allergies.</strong> Fish, milk and some mixed
            collagens can matter if you have a food allergy. &ldquo;Not stated&rdquo; means the label does not say.
          </li>
          {SINGLE_MAKER_BENEFITS.length > 0 && (
            <li>
              <strong className="text-fg">Not in the benefit filter:</strong>{" "}
              {SINGLE_MAKER_BENEFITS.map((b) => b.label.toLowerCase()).join(" and ")}. We have graded products from only
              one maker (Pürblack) that claim these, so a filter would list one company&rsquo;s products alone. They are
              still in the full list, and we will add the filter when other makers&rsquo; products are graded.
            </li>
          )}
        </ul>
        <p className="mt-4 text-soft [text-wrap:pretty]">
          Full scoring sheets:{" "}
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
