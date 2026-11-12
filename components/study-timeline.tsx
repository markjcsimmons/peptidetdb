import Link from "next/link";
import type { Study } from "@/lib/studies";
import { shortCite } from "@/lib/studies";
import { MIX_GROUPS } from "@/lib/study-mix";

/**
 * One dot per study at its publication year, coloured by design (same colours as the study-mix bar) and stacked
 * when several share a year. Each dot links to the study. Shows at a glance whether the evidence is old trials,
 * recent reviews or both. The text version gives the range and the recent share.
 */
export function StudyTimeline({ studies }: { studies: Study[] }) {
  if (studies.length < 2) return null;
  const years = studies.map((s) => s.year);
  const first = Math.min(...years);
  const last = Math.max(...years);
  const lo = Math.floor(first / 5) * 5;
  const hi = Math.max(last, lo + 5);
  const span = hi - lo;
  const step = span > 30 ? 10 : 5;
  const ticks: number[] = [];
  for (let y = Math.ceil(lo / step) * step; y <= hi; y += step) ticks.push(y);
  if (ticks[ticks.length - 1] !== hi) ticks.push(hi);

  const order = (s: Study) => MIX_GROUPS.findIndex((g) => g.kinds.includes(s.kind));
  const byYear = new Map<number, Study[]>();
  for (const s of [...studies].sort((a, b) => order(a) - order(b))) byYear.set(s.year, [...(byYear.get(s.year) ?? []), s]);
  const tallest = Math.max(...[...byYear.values()].map((v) => v.length));
  const DOT = 9;
  const GAP = 3;
  const height = tallest * (DOT + GAP);
  const pct = (y: number) => ((y - lo) / span) * 100;
  const recent = studies.filter((s) => s.year >= last - 5).length;
  const text = `Publication years: ${first} to ${last}; ${recent} of ${studies.length} published in ${last - 5} or later.`;

  return (
    <figure className="m-0">
      <figcaption className="text-caption font-semibold uppercase tracking-[0.06em] text-muted">When they were published</figcaption>
      <div role="img" aria-label={text} data-md-text={text} className="mt-3">
        <div className="relative mx-1" style={{ height }} aria-hidden>
          {[...byYear.entries()].map(([year, list]) =>
            list.map((s, i) => {
              const g = MIX_GROUPS.find((m) => m.kinds.includes(s.kind));
              return (
                <Link
                  key={s.id}
                  href={`/science/${s.id}`}
                  tabIndex={-1}
                  title={`${shortCite(s)}: ${g?.label ?? ""}`}
                  className="absolute block rounded-full ring-1 ring-line hover:ring-2 hover:ring-fg"
                  style={{
                    width: DOT,
                    height: DOT,
                    left: `calc(${pct(year)}% - ${DOT / 2}px)`,
                    bottom: i * (DOT + GAP),
                    background: g?.fill,
                  }}
                />
              );
            }),
          )}
        </div>
        <div className="relative mx-1 mt-1.5 h-5 border-t border-line" aria-hidden>
          {ticks.map((y) => (
            <span
              key={y}
              className="absolute top-1 -translate-x-1/2 text-caption text-muted"
              style={{ left: `${pct(y)}%` }}
            >
              {y}
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}
