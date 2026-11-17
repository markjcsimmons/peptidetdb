import { LEVEL_LABEL, TOPICS, type Level } from "@/lib/topics";
import { TOPIC_LABEL } from "@/lib/studies";
import { SHEETS_PAGE, result, type ClaimArea, type ProductGrade } from "@/lib/grades";
import { CLAIM_EVIDENCE, INGREDIENT_LABEL, PRODUCT_FACTS, PRODUCT_URL } from "@/lib/product-match";
import { EvidenceMeter, levelTone } from "@/components/evidence-meter";
import { BandPill } from "@/components/product-grades";
import { hasLotReport } from "@/lib/product-finder";
import { WIDE_COLUMNS } from "@/components/product-columns";

export const AREA_LABEL: Record<ClaimArea, string> = {
  skin: "Skin",
  joints: "Joints",
  tendons: "Tendons",
  bone: "Bone",
  hair: "Hair",
  muscle: "Muscle",
  gut: "Gut",
  sleep: "Sleep",
  brain: "Memory & focus",
  stress: "Stress",
  "blood-pressure": "Blood pressure",
  eye: "Eyes",
  immune: "Immune function",
};

/** Mixed and limited share a step on this site's scale (see the evidence meter); "not assessed" sorts last. */
export const STEP: Record<Level, number> = { consistent: 0, mixed: 1, limited: 1, preclinical: 2, none: 3, unassessed: 4 };

/** Short level names for the evidence lines; the full name is in the link title and for screen readers. */
const SHORT: Record<Level, string> = {
  consistent: "Consistent",
  mixed: "Mixed",
  limited: "Limited",
  preclinical: "Mostly animal",
  none: "No human trials",
  unassessed: "Not assessed",
};

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
          `product-row: ${g.id} (${facts.ingredient}) claims ${area} but lib/product-match.ts has no rating or "unassessed" entry for it`,
        );
      }
      if ("unassessed" in ev) return { area, level: "unassessed", note: ev.unassessed };
      const found = ev.ratings.map(([topic, subject]) => {
        const i = TOPICS[topic].ratings.findIndex((r) => r.subject === subject);
        if (i < 0) throw new Error(`product-row: "${subject}" is not a rating on the ${topic} topic page`);
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

const BADGE = "inline-flex items-center whitespace-nowrap rounded-full bg-accent-soft px-3 py-0.5 text-caption font-semibold text-accent";
const CAPTION = "text-caption font-semibold uppercase tracking-[0.06em] text-muted";

/** One evidence line: area, meter, short level name. Unassessed claims say so in words, with the reason. */
function ClaimLine({ c }: { c: Claim }) {
  return (
    <li data-area={c.area} className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-start gap-x-3 text-sm sm:grid-cols-[7rem_minmax(0,1fr)]">
      <span className="py-px text-muted">
        {AREA_LABEL[c.area]}
        <span className="sr-only">:</span>
      </span>{" "}
      {"href" in c ? (
        <a
          href={c.href}
          className="group flex min-h-6 items-center gap-x-3 gap-y-0.5"
          // Wrap set inline: the markdown converter reads any "flex-wrap" class as a comma-separated list.
          style={{ flexWrap: "wrap" }}
          title={`${LEVEL_LABEL[c.level]}: rating on our ${c.page} evidence page`}
        >
          <EvidenceMeter level={c.level} size="xs" labelled={false} />
          <span
            className={`whitespace-nowrap font-semibold group-hover:underline ${levelTone(c.level) === "warn" ? "text-warn" : "text-accent"}`}
          >
            <span aria-hidden data-md-skip>
              {SHORT[c.level]}
            </span>
            <span className="sr-only">{LEVEL_LABEL[c.level]}</span>
          </span>
        </a>
      ) : (
        <span className="min-w-0 py-px">
          <span className="font-semibold text-soft">Not assessed.</span>{" "}
          <span className="text-muted [text-wrap:pretty]">{"note" in c ? c.note : ""}</span>
        </span>
      )}
    </li>
  );
}

/**
 * One graded product: what it is, the evidence for each claim, and its documentation grade. Shared by the product
 * finder and the goal-page panels so both read the same way.
 *
 * Layouts: on phones everything stacks (name, grade, evidence). From `sm` the grade sits to the right of the name
 * and the evidence runs underneath. `wide` adds a third column from `lg`, so the evidence lines up down the list.
 */
export function ProductRow({ g, areas, wide = false }: { g: ProductGrade; areas: ClaimArea[]; wide?: boolean }) {
  const f = PRODUCT_FACTS[g.id];
  const r = result(g);
  const claims = claimsFor(g, areas);
  const sport = sportProgramme(g);
  const lot = hasLotReport(g);

  return (
    <div className={`grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-[minmax(0,1fr)_auto] ${wide ? WIDE_COLUMNS : ""}`}>
      <div className="min-w-0 sm:col-start-1 sm:row-start-1">
        <a href={`${SHEETS_PAGE[g.group].path}#grade-${g.id}`} className="link font-semibold [text-wrap:pretty]">
          {g.brand} {g.product}
        </a>
        <span className="sr-only">: </span>
        <span className="mt-1 block text-sm text-muted">
          {f.format} · {INGREDIENT_LABEL[f.ingredient]} · Source: {f.source}
          <span className="sr-only">.</span>
        </span>{" "}
        {(lot || sport) && (
          <>
            <span className="mt-2.5 flex flex-wrap gap-2">
              {lot && <span className={BADGE}>Lot reports published</span>}
              {sport && <span className={BADGE}>Sport-tested: {sport}</span>}
            </span>
            <span className="sr-only">.</span>
          </>
        )}{" "}
        <a href={PRODUCT_URL[g.id]} target="_blank" rel="nofollow noopener noreferrer" className="link mt-2.5 inline-block text-sm">
          Maker&rsquo;s product page<span className="sr-only"> for {g.brand} {g.product} (opens in a new tab)</span>
          <span aria-hidden> ↗</span>
        </a>
      </div>

      <div
        className={`order-3 min-w-0 sm:order-none sm:col-span-2 sm:row-start-2 ${
          wide ? "lg:col-span-1 lg:col-start-2 lg:row-start-1" : ""
        }`}
      >
        <p className={`${CAPTION} mb-2 ${wide ? "lg:sr-only" : ""}`}>Evidence for its claims</p>
        {claims.length === 0 ? (
          <p className="text-sm text-muted [text-wrap:pretty]">No claim for its peptide or collagen ingredients that we rate.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {claims.map((c) => (
              <ClaimLine key={c.area} c={c} />
            ))}
          </ul>
        )}
      </div>

      <div
        className={`order-2 flex items-center gap-3 sm:order-none sm:col-start-2 sm:row-start-1 sm:flex-col sm:items-end sm:gap-1.5 ${
          wide ? "lg:col-start-3" : ""
        }`}
      >
        <span className="sr-only">Documentation grade: </span>
        <span className="whitespace-nowrap text-2xl font-bold leading-none tabular-nums">
          {r.total}
          <span className="text-sm font-medium text-muted">/100</span>
        </span>{" "}
        <BandPill band={r.band} />
      </div>
    </div>
  );
}
