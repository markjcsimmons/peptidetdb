import type { ReactNode } from "react";
import { LEVEL_LABEL, type Level } from "@/lib/topics";
import { CARD, Pill } from "@/components/ui";
import { EvidenceMeter, RatingBadge, levelTone } from "@/components/evidence-meter";
import { RouteIcon } from "@/components/route-icon";

/** How an option is taken. Set only where the page itself makes the route plain; omit it otherwise. */
export type Route = "oral" | "topical" | "eye" | "injected" | "nasal";

export const ROUTE_LABEL: Record<Route, string> = {
  oral: "By mouth",
  topical: "On the skin",
  eye: "Eye drops",
  injected: "Injected",
  nasal: "Nasal",
};

export type RankedOption = {
  name: string;
  level: Level;
  routes?: Route[];
  shows: ReactNode;
  notShown: ReactNode;
  /** An optional extra paragraph, e.g. safety and product testing on the oral peptides page. */
  extra?: { label: string; body: ReactNode };
};

/** Runs of the same level, in page order. A run of two or more is a tie: same rating, order is our judgement. */
function groups(options: RankedOption[]) {
  const out: { level: Level; items: { o: RankedOption; rank: number }[] }[] = [];
  options.forEach((o, i) => {
    const last = out[out.length - 1];
    if (last && last.level === o.level) last.items.push({ o, rank: i + 1 });
    else out.push({ level: o.level, items: [{ o, rank: i + 1 }] });
  });
  return out;
}

const ICON = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

function CheckIcon() {
  return (
    <svg {...ICON}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.8 2.8L16.5 9.5" />
    </svg>
  );
}

function GapIcon() {
  return (
    <svg {...ICON}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.3" />
      <path d="M12 16.8h.01" />
    </svg>
  );
}

function RoutePills({ routes }: { routes?: Route[] }) {
  if (!routes?.length) return null;
  return (
    <span className="flex flex-wrap gap-1.5">
      {routes.map((r) => (
        <Pill key={r} tone="neutral">
          <span className="flex items-center gap-1.5">
            <RouteIcon route={r} size={15} />
            {ROUTE_LABEL[r]}
          </span>
        </Pill>
      ))}
    </span>
  );
}

/**
 * The ranking on an evidence-ranked list page: a summary table first (most readers only need that),
 * then one card per option. Options must already be in ranked order; the page checks each level against
 * its topic page, so this component only draws them.
 */
export function RankedList({ options }: { options: RankedOption[] }) {
  // Ranks must never go up the scale as the list goes down (a mis-ordered list would contradict its ratings).
  const order: Level[] = ["consistent", "mixed", "limited", "preclinical", "none", "unassessed"];
  const step = (l: Level) => (l === "mixed" ? order.indexOf("limited") : order.indexOf(l));
  options.forEach((o, i) => {
    if (i > 0 && step(o.level) < step(options[i - 1].level)) {
      throw new Error(`RankedList: "${o.name}" is rated higher than the option ranked above it`);
    }
  });
  const runs = groups(options);
  const hasTies = runs.some((g) => g.items.length > 1);

  return (
    <>
      <div className="mt-6 overflow-hidden rounded-card border border-line bg-card">
        <table className="w-full text-left text-sm">
          <caption className="px-5 pb-1 pt-5 text-left text-caption font-semibold uppercase tracking-[0.06em] text-muted sm:px-6">
            At a glance
          </caption>
          <thead className="text-muted">
            <tr>
              <th scope="col" className="w-12 px-3 py-2 pl-5 font-medium sm:pl-6">
                Rank
              </th>
              <th scope="col" className="px-3 py-2 pr-5 font-medium sm:pr-3">
                Option
              </th>
              <th scope="col" className="hidden w-[36%] px-3 py-2 pr-5 font-medium sm:table-cell sm:pr-6">
                Evidence
              </th>
            </tr>
          </thead>
          {runs.map((g) => {
            const tied = g.items.length > 1;
            return (
              <tbody key={g.items[0].rank} className={`border-t-2 border-line ${tied ? "bg-bg" : ""}`}>
                {g.items.map(({ o, rank }, j) => (
                  <tr key={o.name} className={j > 0 ? "border-t border-line" : ""}>
                    <td className="px-3 py-3 pl-5 align-top font-bold sm:pl-6">
                      {rank}
                      {tied && <span className="block text-caption font-medium text-muted"> (tied)</span>}
                    </td>
                    <td className="px-3 py-3 pr-5 align-top sm:pr-3">
                      <a href={`#rank-${rank}`} className="link font-medium">
                        {o.name}
                      </a>{" "}
                      {/* Small screens: the evidence column is hidden, so the rating sits under the name. Skipped in markdown (the column has it). */}
                      <span className="mt-2 block sm:hidden" data-md-skip>
                        <EvidenceMeter level={o.level} size="sm" labelled={false} />
                        <span
                          className={`mt-1 block text-sm font-semibold ${levelTone(o.level) === "warn" ? "text-warn" : "text-accent"}`}
                        >
                          {LEVEL_LABEL[o.level]}
                        </span>
                      </span>
                      {o.routes?.length ? (
                        <span className="mt-1.5 block">
                          <span className="sr-only">Taken: </span>
                          <RoutePills routes={o.routes} />
                        </span>
                      ) : null}
                    </td>
                    <td className="hidden px-3 py-3 pr-5 align-top sm:table-cell sm:pr-6">
                      <EvidenceMeter level={o.level} size="sm" labelled={false} />
                      <span
                        className={`mt-1.5 block text-sm font-semibold leading-snug ${levelTone(o.level) === "warn" ? "text-warn" : "text-accent"}`}
                      >
                        {LEVEL_LABEL[o.level]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            );
          })}
        </table>
        {hasTies && (
          <p className="border-t border-line px-5 py-3 text-sm text-muted sm:px-6">
            Options marked &ldquo;(tied)&rdquo; share the same rating; their order within the group is our judgement.
          </p>
        )}
      </div>

      <ol className="mt-8 grid gap-5">
        {options.map((o, i) => (
          <li key={o.name} id={`rank-${i + 1}`} className={`${CARD} scroll-mt-6`}>
            <div className="flex items-start gap-4">
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-bg text-lg font-bold"
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="text-xl font-bold leading-tight">
                  <span className="sr-only">Rank {i + 1}: </span>
                  {o.name}
                </h3>
                <div className="mt-3 flex flex-wrap items-end gap-x-5 gap-y-3">
                  <RatingBadge level={o.level} measures="benefit" />
                  {o.routes?.length ? (
                    <span className="flex items-center gap-2">
                      <span className="sr-only">Taken: </span>
                      <RoutePills routes={o.routes} />
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-tile border border-line bg-bg p-4">
                <p className="flex items-center gap-2 font-semibold text-accent">
                  <CheckIcon />
                  What the studies show
                </p>
                <p className="mt-2 text-soft [text-wrap:pretty]">{o.shows}</p>
              </div>
              <div className="rounded-tile border border-line bg-bg p-4">
                <p className="flex items-center gap-2 font-semibold text-warn">
                  <GapIcon />
                  What they do not show
                </p>
                <p className="mt-2 text-soft [text-wrap:pretty]">{o.notShown}</p>
              </div>
            </div>
            {o.extra && (
              <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
                <strong className="text-fg">{o.extra.label}</strong> {o.extra.body}
              </p>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}
