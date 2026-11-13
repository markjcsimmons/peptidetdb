import type { ReactNode } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import { RUBRIC, DEDUCTIONS } from "@/lib/rubric";
import {
  GRADES_CHECKED_ON,
  categoryPoints,
  ranked,
  result,
  type BandLabel,
  type ClaimArea,
  type ProductGrade,
  type Source,
} from "@/lib/grades";
import { CARD, Pill, type Tone } from "@/components/ui";

/** Where every scoring sheet lives. List pages link here instead of repeating the sheets. */
export const SHEETS_PATH = "/peptides/best-collagen-peptides";

const bandTone = (b: BandLabel): Tone => (b === "Well documented" || b === "Documented" ? "accent" : b === "Not graded" ? "neutral" : "warn");

export function BandPill({ band }: { band: BandLabel }) {
  return <Pill tone={bandTone(band)}>{band}</Pill>;
}

/** A 0–100 bar. Decorative: the number is always written next to it. */
function ScoreBar({ total }: { total: number }) {
  return (
    <span aria-hidden data-md-skip className="mt-1.5 block h-1.5 w-full max-w-[8rem] overflow-hidden rounded-full bg-line">
      <span className="block h-full rounded-full bg-accent" style={{ width: `${total}%` }} />
    </span>
  );
}

/**
 * Summary table of graded products, best documented first. `sheetHref` points each row at its scoring sheet
 * (on the same page, or on the collagen page from a list page).
 */
export function GradeTable({ grades, sheetHref = "" }: { grades: ProductGrade[]; sheetHref?: string }) {
  return (
    <div className="mt-6 overflow-hidden rounded-card border border-line bg-card">
      <table className="w-full text-left text-sm">
        <caption className="px-5 pb-1 pt-5 text-left text-caption font-semibold uppercase tracking-[0.06em] text-muted sm:px-6">
          Documentation grades, out of 100
        </caption>
        <thead className="text-muted">
          <tr>
            <th scope="col" className="px-3 py-2 pl-5 font-medium sm:pl-6">
              Product
            </th>
            <th scope="col" className="w-24 px-3 py-2 font-medium">
              Points
            </th>
            <th scope="col" className="hidden w-[30%] px-3 py-2 pr-5 font-medium sm:table-cell sm:pr-6">
              Grade
            </th>
          </tr>
        </thead>
        <tbody>
          {grades.map((g) => {
            const r = result(g);
            return (
              <tr key={g.id} className="border-t border-line">
                <td className="px-3 py-3 pl-5 align-top sm:pl-6">
                  <a href={`${sheetHref}#grade-${g.id}`} className="link font-medium">
                    {g.brand} {g.product}
                  </a>
                  <span className="sr-only">: </span>
                  <span className="mt-1 block text-muted [text-wrap:pretty]">{g.summary}</span>
                  {/* Small screens: the grade column is hidden, so the band sits under the name. Skipped in markdown. */}
                  <span className="mt-2 block sm:hidden" data-md-skip>
                    <BandPill band={r.band} />
                  </span>
                </td>
                <td className="px-3 py-3 align-top">
                  <span className="text-lg font-bold">
                    {r.total}
                    <span className="sr-only"> of 100</span>
                  </span>
                  <ScoreBar total={r.total} />
                </td>
                <td className="hidden px-3 py-3 pr-5 align-top sm:table-cell sm:pr-6">
                  <BandPill band={r.band} />
                  {r.uncapped && <span className="mt-1.5 block text-caption text-muted">Capped: points alone would give {r.uncapped}</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Sources({ sources }: { sources: Source[] }) {
  return (
    <span className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-caption">
      {sources.map((s) =>
        s.href.startsWith("/") ? (
          <Link key={s.href + s.label} href={s.href} className="link">
            {s.label}
          </Link>
        ) : (
          <a key={s.href + s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="link">
            {s.label}
          </a>
        ),
      )}
    </span>
  );
}

/** The full scoring sheet for one product: every criterion, its points, what we saw and the source. Collapsed by default. */
export function ScoringSheet({ g }: { g: ProductGrade }) {
  const r = result(g);
  return (
    <details id={`grade-${g.id}`} className={`${CARD} scroll-mt-6 [&[open]>summary_.chev]:rotate-90`}>
      <summary className="flex cursor-pointer list-none items-start gap-3 [&::-webkit-details-marker]:hidden">
        <span aria-hidden className="chev mt-1 text-muted transition-transform" data-md-skip>
          ▸
        </span>
        <span className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-2">
          <span className="min-w-0 flex-1">
            <span className="block text-xl font-bold leading-tight">
              {g.brand} <span className="text-base font-medium text-muted">{g.product}</span>
            </span>
            <span className="sr-only">: </span>
            <span className="block text-sm text-muted">{g.form}</span>
          </span>
          <span className="text-2xl font-bold">
            {r.total}
            <span className="text-sm font-medium text-muted">/100</span>
          </span>
          <span>
            <BandPill band={r.band} />
          </span>
        </span>
      </summary>

      <div className="mt-5">
        <p className="max-w-prose text-soft [text-wrap:pretty]">{g.summary}</p>
        {r.caps.length > 0 && (
          <p className="mt-2 max-w-prose text-sm text-warn [text-wrap:pretty]">
            {r.caps.join(" ")} {r.uncapped && <>(The points alone would give {r.uncapped}.)</>}
          </p>
        )}
        <p className="mt-2 text-caption text-muted">
          Rubric version {g.rubricVersion}. Product page checked {formatDate(g.checkedOn)}; lab reports and registries checked{" "}
          {formatDate(g.documentsCheckedOn)}.
        </p>

        {RUBRIC.map((cat) => {
          const cp = categoryPoints(g, cat.id);
          return (
            <div key={cat.id} className="mt-5 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <caption className="pb-2 text-left font-semibold text-fg">
                  {cat.name}: {cp.got} of {cp.max}
                </caption>
                <thead className="sr-only">
                  <tr>
                    <th scope="col">Criterion</th>
                    <th scope="col">Points</th>
                    <th scope="col">What we found</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.criteria.map((k) => {
                    const s = g.scores[k.id];
                    return (
                      <tr key={k.id} className="border-t border-line">
                        <th scope="row" className="w-[30%] py-2.5 pr-3 align-top font-medium text-fg">
                          {k.name}
                        </th>
                        <td className="w-20 py-2.5 pr-3 align-top font-semibold tabular-nums">
                          {s.points === null ? (
                            <span className="text-warn">0 (could not check)</span>
                          ) : (
                            <>
                              {s.points}/{k.points}
                            </>
                          )}
                        </td>
                        <td className="py-2.5 align-top text-soft">
                          <span className="block [text-wrap:pretty]">{s.note}</span>
                          <span className="sr-only"> Sources: </span>
                          <Sources sources={s.sources} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}

        <p className="mt-5 text-sm text-soft">
          <strong className="text-fg">Deductions:</strong>{" "}
          {g.deductions.length === 0
            ? `none (${DEDUCTIONS.map((d) => d.name.toLowerCase()).join("; ")}: not found).`
            : g.deductions.map((d) => `${DEDUCTIONS.find((x) => x.id === d.id)!.name}: ${d.note}`).join(" ")}
        </p>
      </div>
    </details>
  );
}

const AREA_WORDS: Record<ClaimArea, string> = {
  skin: "skin",
  joints: "joints",
  tendons: "tendons or ligaments",
  bone: "bones",
  hair: "hair",
  muscle: "muscle",
  gut: "gut health",
  sleep: "sleep",
};

/**
 * For a list page: the graded collagen products whose sellers claim this benefit area, with links to their full
 * scoring sheets. Grades score documentation and claims, not whether the product works.
 */
export function GradedCollagenProducts({ area, ratingNote }: { area: ClaimArea; ratingNote: ReactNode }) {
  const grades = ranked("collagen", area);
  const all = ranked("collagen");
  return (
    <section className="mt-14">
      <h2 className="text-3xl font-bold leading-[1.15]">Collagen products that claim {AREA_WORDS[area]}, graded</h2>
      <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
        {grades.length} of the {all.length} collagen products we graded make a claim about {AREA_WORDS[area]} on their
        own pages. Each is scored out of 100 with our{" "}
        <Link href="/grading-rubric" className="link">
          published rubric
        </Link>
        : lab reports for the lot you buy, certification listings we found in the certifier&rsquo;s own directory, the
        label, and whether the claims stay within the human evidence. {ratingNote} A grade is about what can be checked,
        not whether one product works better than another: no trial has compared these brands.
      </p>
      <GradeTable grades={grades} sheetHref={SHEETS_PATH} />
      <p className="mt-3 text-sm text-muted [text-wrap:pretty]">
        Checked {formatDate(GRADES_CHECKED_ON)}. Select a product to see its full scoring sheet, with the points, what we
        found and a link for every criterion, on{" "}
        <Link href={`${SHEETS_PATH}#grades`} className="link">
          best collagen peptides: 15 brands graded
        </Link>
        . We take no payment or affiliate commission from any brand.
      </p>
    </section>
  );
}
