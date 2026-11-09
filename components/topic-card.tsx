import Link from "next/link";
import { LEVEL_LABEL, TOPICS, type TopicRating } from "@/lib/topics";
import type { Topic } from "@/lib/studies";
import { formatDate } from "@/lib/format";
import { CARD } from "@/components/ui";
import { LEVEL_ORDER, RatingBadge } from "@/components/evidence-meter";

const rank = (r: TopicRating) => LEVEL_ORDER.indexOf(r.level);

/**
 * A topic summarised without cherry-picking: the best-supported rating AND the least-supported one.
 * "Not yet assessed" is not weak evidence, so it is counted separately and never shown as the weakest.
 */
export function TopicCard({ slug, compact = false }: { slug: Topic; compact?: boolean }) {
  const t = TOPICS[slug];
  const assessed = t.ratings.filter((r) => r.level !== "unassessed");
  const sorted = [...assessed].sort((a, b) => rank(a) - rank(b));
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];
  const unassessed = t.ratings.length - assessed.length;
  const same = best && worst && best.level === worst.level;

  if (compact) {
    // Overview-list version: the title and the best-supported rating only; the topic page has the rest.
    return (
      <Link href={`/science/topics/${slug}`} className="block rounded-card border border-line bg-card p-5 hover:border-accent">
        <h3 className="text-lg font-bold leading-tight">{t.title}</h3>
        {best && (
          <div className="mt-3">
            <RatingBadge level={best.level} measures={t.measures} />
          </div>
        )}
        <p className="mt-3 text-sm text-muted">
          {t.ratings.length} {t.ratings.length === 1 ? "rating" : "ratings"}
          {!same && worst && t.measures === "benefit" ? `; least supported: ${LEVEL_LABEL[worst.level].toLowerCase()}` : ""}
        </p>
      </Link>
    );
  }

  return (
    <Link href={`/science/topics/${slug}`} className={`${CARD} block hover:border-accent`}>
      <h3 className="text-xl font-bold leading-tight">{t.title}</h3>

      {best && (
        <div className="mt-4">
          <p className="text-caption font-semibold uppercase tracking-[0.06em] text-muted">
            {t.measures === "safety" ? "Rating" : "Best supported"}
          </p>
          <p className="mt-1 text-base">{best.subject}</p>
          <div className="mt-2">
            <RatingBadge level={best.level} measures={t.measures} />
          </div>
        </div>
      )}

      {best && worst && !same && worst !== best && (
        <div className="mt-4 border-t border-line pt-4">
          <p className="text-caption font-semibold uppercase tracking-[0.06em] text-muted">
            {t.measures === "safety" ? "Other rating" : "Least supported"}
          </p>
          <p className="mt-1 text-base">{worst.subject}</p>
          <div className="mt-2">
            <RatingBadge level={worst.level} measures={t.measures} />
          </div>
        </div>
      )}

      {same && assessed.length > 1 && (
        <p className="mt-4 border-t border-line pt-4 text-sm text-soft">
          All {assessed.length} assessed ratings sit at this level.
        </p>
      )}

      <p className="mt-4 text-sm text-muted">
        {t.ratings.length} {t.ratings.length === 1 ? "rating" : "ratings"}
        {unassessed > 0 ? ` (${unassessed} not yet assessed)` : ""}, reviewed {formatDate(t.reviewedOn)}
      </p>
    </Link>
  );
}
