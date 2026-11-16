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
          <span className="text-sm text-muted">Makes no claim for its peptide or collagen ingredients that we rate.</span>
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
        Graded {formatDate(DATES[0])} to {formatDate(DATES[DATES.length - 1])}. Each scoring sheet shows its own date.
      </p>
      <p className="mt-6 max-w-prose text-lg text-soft [text-wrap:pretty]">
        All {GRADED.length} peptide and collagen products we have graded, on one list. Start with what you want a product
        for, then narrow the list by how you take it, what it is made from and how it is tested. Each product has two
        separate ratings:
      </p>
      <ul className="mt-4 grid max-w-4xl gap-3 sm:grid-cols-2">
        <li className={`${CARD} !p-5`}>
          <strong className="block">Evidence behind the claim</strong>{" "}
          <span className="mt-1 block text-sm text-soft [text-wrap:pretty]">
            How strong the human research is for the product&rsquo;s <em>ingredient</em>, for each benefit the maker
            claims. The ratings come from our evidence pages; no trial has compared these brands with each other.
          </span>
        </li>
        <li className={`${CARD} !p-5`}>
          <strong className="block">Documentation grade</strong>{" "}
          <span className="mt-1 block text-sm text-soft [text-wrap:pretty]">
            A score out of 100 for how well the maker backs up what it sells: lab reports, certification, the label, its
            claims and company details, scored with our{" "}
            <Link href="/grading-rubric" className="link">
              published rubric
            </Link>
            . It does not tell you whether the product works.
          </span>
        </li>
      </ul>
      <DisclosureNote>Pürblack products are graded by the same published rules as every other product.</DisclosureNote>
      <p className="mt-3 max-w-prose text-sm text-muted [text-wrap:pretty]">
        Everything here is sold over the counter as a dietary supplement or a cosmetic. Prescription drugs and unapproved
        injectable peptides are not included; for those, see{" "}
        <Link href="/peptides/legal-status" className="link">
          legal status
        </Link>{" "}
        and{" "}
        <Link href="/peptides/for-weight-loss" className="link">
          weight-loss peptides
        </Link>
        . Being listed is not a recommendation, and the site takes no payment or affiliate commission from any brand.
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
            <strong className="text-fg">Pick a benefit and the evidence comes first.</strong> Products are sorted by the
            best rating among their claims for that benefit, then by grade. &ldquo;Mixed&rdquo; and &ldquo;limited&rdquo;
            count as the same step on our scale. &ldquo;Not assessed&rdquo; means we have not read any study of that
            ingredient for that benefit, so those products go to the bottom.
          </li>
          <li>
            <strong className="text-fg">
              Without a lot report, the best a product can score is &ldquo;Partly documented&rdquo;.
            </strong>{" "}
            Only a lab report for the batch you buy shows what is actually in your container. We check every certification
            in the certifier&rsquo;s own directory.
          </li>
          <li>
            <strong className="text-fg">Check &ldquo;Made from&rdquo; if you have a food allergy.</strong> Fish and milk
            are common allergens, and multi-source collagens may include fish or egg. &ldquo;Not stated&rdquo; means the
            label does not say.
          </li>
          {SINGLE_MAKER_BENEFITS.length > 0 && (
            <li>
              <strong className="text-fg">
                Why there is no filter for {SINGLE_MAKER_BENEFITS.map((b) => b.label.toLowerCase()).join(" or ")}.
              </strong>{" "}
              The only graded products that claim these come from one maker, Pürblack, so the filter would show a single
              company&rsquo;s products. They are still in the full list, and the filter will be added once we grade
              products from other makers.
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
