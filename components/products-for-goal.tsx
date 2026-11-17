import type { ReactNode } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import { ALL_GRADES, SHEETS_PAGE, isPurblack, result, type ClaimArea } from "@/lib/grades";
import { PRODUCT_FACTS } from "@/lib/product-match";
import { DisclosureNote } from "@/components/disclosure-note";
import { ProductFilter } from "@/components/product-filter";
import { ProductRow, STEP, claimsFor, sportProgramme } from "@/components/product-row";
import { benefitFor } from "@/lib/product-finder";

export { AREA_LABEL, STEP, claimsFor, sportProgramme, type Claim } from "@/components/product-row";

/**
 * Products section for a goal page, kept apart from the evidence ranking. Lists every graded product whose seller
 * claims one of `areas`, with the evidence rating of its ingredient for each claim, its documentation grade and any
 * sport-testing listing. Order: evidence step, then grade, then brand. Rules in lib/product-match.ts.
 */
export function ProductsForGoal({
  areas,
  title,
  label,
  sportOnly = false,
  note,
}: {
  areas: ClaimArea[];
  title: string;
  /** Words for the claims, as in "claims a benefit for …". */
  label: string;
  /** Only products listed by a sport-testing programme (the athletes page). */
  sportOnly?: boolean;
  /** Extra page-specific context, shown after the intro. */
  note?: ReactNode;
}) {
  const rows = ALL_GRADES.filter((g) => areas.some((a) => g.claimAreas.includes(a)) && (!sportOnly || sportProgramme(g))).map((g) => {
    const claims = claimsFor(g, areas);
    return { g, r: result(g), claims, step: Math.min(...claims.map((c) => STEP[c.level])), sport: sportProgramme(g) };
  });
  rows.sort((a, b) => a.step - b.step || b.r.total - a.r.total || a.g.brand.localeCompare(b.g.brand));
  if (rows.length === 0) return null;
  // A section of Pürblack products alone would read as an advert; grade other products for the claim first.
  if (rows.every((x) => isPurblack(x.g))) throw new Error(`products-for-goal: "${title}" would list only Pürblack products`);
  const hasPurblack = rows.some((x) => isPurblack(x.g));
  const groups = [...new Set(rows.map((x) => x.g.group))];
  const dates = [...new Set(rows.map((x) => x.g.checkedOn))].sort();
  // Link to the finder with this panel's benefit picked, unless the panel spans more than one benefit (athletes).
  const panelBenefits = [...new Set(areas.map((a) => benefitFor(a)?.id))];
  const finderBenefit = panelBenefits.length === 1 ? benefitFor(areas[0]) : undefined;
  const finderQuery = [finderBenefit && `benefit=${finderBenefit.id}`, sportOnly && "sport=1"].filter(Boolean).join("&");
  const finderHref = `/products${finderQuery ? `?${finderQuery}` : ""}`;
  const checkedRange =
    dates.length > 1 ? `${formatDate(dates[0])} to ${formatDate(dates[dates.length - 1])} (each sheet shows its date)` : formatDate(dates[0]);

  return (
    <section className="mt-14 rounded-panel border border-line bg-card px-4 py-6 sm:p-8" aria-labelledby="products-heading">
      <p className="text-caption font-semibold uppercase tracking-[0.08em] text-accent">Products · separate from the ranking</p>
      <h2 id="products-heading" className="mt-2 text-3xl font-bold leading-[1.15]">
        {title}
      </h2>
      {hasPurblack && <DisclosureNote graded />}
      <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
        Every product we have graded whose maker claims a benefit for {label}
        {sportOnly ? " and that a sport-testing programme lists" : ""}. Each shows two separate things: the evidence for
        its ingredient (from the ratings above) and how well the maker documents the product, scored out of 100 with our{" "}
        <Link href="/grading-rubric" className="link">
          published rubric
        </Link>
        . Products are sorted by evidence, then by grade; &ldquo;mixed&rdquo; and &ldquo;limited&rdquo; count as the same
        step. Being listed is not a recommendation, and no trial has compared these products with each other.
      </p>
      {note && <p className="mt-3 max-w-prose text-soft [text-wrap:pretty]">{note}</p>}

      <ProductFilter
        label={title.toLowerCase()}
        rows={rows.map(({ g, sport }) => {
          const f = PRODUCT_FACTS[g.id];
          return {
            id: g.id,
            format: f.format,
            sport: Boolean(sport),
            node: <ProductRow g={g} areas={areas} />,
          };
        })}
      />

      <p className="mt-4 text-sm text-muted [text-wrap:pretty]">
        Graded {checkedRange}. Select a product for its full scoring sheet, or a rating for the studies behind it. Maker
        links carry no affiliate codes, and the site takes no payment or commission from any brand. All scoring sheets:{" "}
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
      <p className="mt-3">
        <Link href={finderHref} className="link-solo">
          Compare every graded product in the product finder
        </Link>
      </p>
    </section>
  );
}
