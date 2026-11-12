import { LEVEL_LABEL, type Level, type TopicPage } from "@/lib/topics";
import { EvidenceMeter, RatingBadge, levelTone } from "@/components/evidence-meter";

/**
 * Compact "at a glance" table of a topic page's ratings, each linking to its full card. Benefit ratings get a small
 * meter plus words; safety ratings are words only (see RatingBadge). On phones the rating sits under the subject.
 */
export function RatingsTable({ rows, measures }: { rows: { subject: string; level: Level; href: string }[]; measures: TopicPage["measures"] }) {
  const words = (level: Level) =>
    measures === "safety" ? (
      <RatingBadge level={level} measures="safety" />
    ) : (
      <>
        <EvidenceMeter level={level} size="sm" labelled={false} />
        <span className={`mt-1.5 block text-sm font-semibold leading-snug ${levelTone(level) === "warn" ? "text-warn" : "text-accent"}`}>
          {LEVEL_LABEL[level]}
        </span>
      </>
    );
  return (
    <div className="mt-6 overflow-hidden rounded-card border border-line bg-card">
      <table className="w-full text-left text-sm">
        <caption className="px-5 pb-1 pt-5 text-left text-caption font-semibold uppercase tracking-[0.06em] text-muted sm:px-6">
          At a glance
        </caption>
        <thead className="text-muted">
          <tr>
            <th scope="col" className="px-3 py-2 pl-5 pr-5 font-medium sm:pl-6 sm:pr-3">
              Use
            </th>
            <th scope="col" className="hidden w-[38%] px-3 py-2 pr-5 font-medium sm:table-cell sm:pr-6">
              {measures === "safety" ? "Safety data" : "Evidence"}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.subject} className="border-t border-line">
              <td className="px-3 py-3 pl-5 pr-5 align-top sm:pl-6 sm:pr-3">
                <a href={r.href} className="link font-medium">
                  {r.subject}
                </a>{" "}
                <span className="mt-2 block sm:hidden" data-md-skip>
                  {words(r.level)}
                </span>
              </td>
              <td className="hidden px-3 py-3 pr-5 align-top sm:table-cell sm:pr-6">{words(r.level)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
