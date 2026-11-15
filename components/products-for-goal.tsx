import type { ReactNode } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import { LEVEL_LABEL, TOPICS, type Level } from "@/lib/topics";
import { TOPIC_LABEL } from "@/lib/studies";
import { ALL_GRADES, SHEETS_PAGE, isPurblack, result, type ClaimArea, type ProductGrade } from "@/lib/grades";
import { CLAIM_EVIDENCE, INGREDIENT_LABEL, PRODUCT_FACTS, PRODUCT_URL } from "@/lib/product-match";
import { EvidenceMeter, levelTone } from "@/components/evidence-meter";
import { BandPill } from "@/components/product-grades";
import { DisclosureNote } from "@/components/disclosure-note";
import { ProductFilter } from "@/components/product-filter";
import { benefitFor } from "@/lib/product-finder";

export const AREA_LABEL: Record<ClaimArea, string> = {
  skin: "Skin",
  joints: "Joints",
  tendons: "Tendons",
  bone: "Bone",
  hair: "Hair",
  muscle: "Muscle",
  gut: "Gut",
  sleep: "Sleep",
  brain: "Memory and focus",
  stress: "Stress",
  "blood-pressure": "Blood pressure",
  eye: "Eyes",
  immune: "Immune function",
};

/** Mixed and limited share a step on this site's scale (see the evidence meter); "not assessed" sorts last. */
export const STEP: Record<Level, number> = { consistent: 0, mixed: 1, limited: 1, preclinical: 2, none: 3, unassessed: 4 };

export type Claim =
  | { area: ClaimArea; level: Level; href: string; page: string; count: number }
  | { area: ClaimArea; level: "unassessed"; note: string };

export function claimsFor(g: ProductGrade, areas: ClaimArea[]): Claim[] {
  const facts = PRODUCT_FACTS[g.id];
  return areas
    .filter((a) => g.claimAreas.includes(a))
    .map((area): Claim => {
      const ev = CLAIM_EVIDENCE[facts.ingredient][area];
      if (!ev) {
        throw new Error(
          `products-for-goal: ${g.id} (${facts.ingredient}) claims ${area} but lib/product-match.ts has no rating or "unassessed" entry for it`,
        );
      }
      if ("unassessed" in ev) return { area, level: "unassessed", note: ev.unassessed };
      const found = ev.ratings.map(([topic, subject]) => {
        const i = TOPICS[topic].ratings.findIndex((r) => r.subject === subject);
        if (i < 0) throw new Error(`products-for-goal: "${subject}" is not a rating on the ${topic} topic page`);
        return { topic, level: TOPICS[topic].ratings[i].level, href: `/science/topics/${topic}#rating-${i + 1}` };
      });
      const best = [...found].sort((a, b) => STEP[a.level] - STEP[b.level])[0];
      return { area, level: best.level, href: best.href, page: TOPIC_LABEL[best.topic], count: found.length };
    });
}

export function sportProgramme(g: ProductGrade) {
  if (g.scores.certification.points !== 8) return undefined;
  return /Informed Choice/.test(g.scores.certification.note) ? "Informed Choice" : "NSF Certified for Sport";
}

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
    dates.length > 1 ? `${formatDate(dates[0])} to ${formatDate(dates[dates.length - 1])} (each sheet gives its date)` : formatDate(dates[0]);

  return (
    <section className="mt-14 rounded-panel border border-line bg-card p-6 sm:p-8" aria-labelledby="products-heading">
      <p className="text-caption font-semibold uppercase tracking-[0.08em] text-accent">Products · separate from the ranking</p>
      <h2 id="products-heading" className="mt-2 text-3xl font-bold leading-[1.15]">
        {title}
      </h2>
      {hasPurblack && <DisclosureNote>Pürblack products are listed and graded by the same published rules as every other product.</DisclosureNote>}
      <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
        Every product we have graded whose maker claims a benefit for {label}
        {sportOnly ? " and that a sport-testing programme lists" : ""}. Listing is not a recommendation. Each shows
        the evidence for its ingredient for that claim (from the ratings above and on our evidence pages), how well the
        maker documents the product, scored out of 100 with our{" "}
        <Link href="/grading-rubric" className="link">
          published rubric
        </Link>
        , and whether a sport-testing programme lists it. They are ordered by evidence first; &ldquo;mixed&rdquo; and
        &ldquo;limited&rdquo; share a step on our scale, so within a step they are in order of grade. No trial has compared
        these products with each other.
      </p>
      {note && <p className="mt-3 max-w-prose text-soft [text-wrap:pretty]">{note}</p>}

      <ProductFilter
        label={title.toLowerCase()}
        rows={rows.map(({ g, r, claims, sport }) => {
          const f = PRODUCT_FACTS[g.id];
          return {
            id: g.id,
            format: f.format,
            sport: Boolean(sport),
            node: (
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_12rem_9rem] sm:gap-5">
                <div className="min-w-0">
                  <a href={`${SHEETS_PAGE[g.group].path}#grade-${g.id}`} className="link font-semibold">
                    {g.brand} {g.product}
                  </a>
                  <span className="sr-only">: </span>
                  <span className="mt-1 block text-sm text-muted">
                    {f.format} · {INGREDIENT_LABEL[f.ingredient]} · Source: {f.source}
                  </span>{" "}
                  <a
                    href={PRODUCT_URL[g.id]}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="link mt-1.5 inline-block text-sm"
                  >
                    {g.brand}
                    {g.brand.endsWith("s") ? "’" : "’s"} product page<span aria-hidden> ↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>{" "}
                  {sport && (
                    <span className="mt-2 flex w-fit items-center rounded-full bg-accent-soft px-3 py-0.5 text-caption font-semibold text-accent">
                      Sport-tested: {sport}
                    </span>
                  )}
                </div>
                <div>
                  <span className="sr-only">Evidence for its claims: </span>
                  <ul className="space-y-2.5">
                    {claims.map((c) => (
                      <li key={c.area}>
                        <span className="block text-caption font-semibold uppercase tracking-[0.06em] text-muted">
                          {AREA_LABEL[c.area]}
                          <span className="sr-only">:</span>
                        </span>{" "}
                        {c.level === "unassessed" && "note" in c ? (
                          <span className="text-sm text-muted">Not assessed. {c.note}</span>
                        ) : (
                          "href" in c && (
                            <a href={c.href} className="mt-1 block hover:underline" title={`Rating on our ${c.page} page`}>
                              <EvidenceMeter level={c.level} size="sm" labelled={false} />
                              <span className={`mt-1 block text-sm font-semibold leading-snug ${levelTone(c.level) === "warn" ? "text-warn" : "text-accent"}`}>
                                {LEVEL_LABEL[c.level]}
                              </span>
                            </a>
                          )
                        )}
                      </li>
                    ))}
                  </ul>
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
            ),
          };
        })}
      />

      <p className="mt-4 text-sm text-muted [text-wrap:pretty]">
        Grades checked {checkedRange}. Select a product for its full scoring sheet, with the points, what we
        found and a source for every criterion; select a rating for the studies behind it. Product page links go to each
        maker&rsquo;s own site, with no affiliate codes. Full sheets:{" "}
        {groups.map((gr, i) => (
          <span key={gr}>
            {i > 0 && "; "}
            <Link href={`${SHEETS_PAGE[gr].path}#grades`} className="link">
              {SHEETS_PAGE[gr].title}
            </Link>
          </span>
        ))}
        . We take no payment or affiliate commission from any brand.
      </p>
      <p className="mt-3">
        <Link href={finderHref} className="link-solo">
          Compare every graded product in the product finder
        </Link>
      </p>
    </section>
  );
}
