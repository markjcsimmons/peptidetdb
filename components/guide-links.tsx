import Link from "next/link";
import { LEVEL_LABEL, TOPICS } from "@/lib/topics";
import { PEPTIDE_LABEL, STUDIES, TOPIC_LABEL, type PeptideId, type Topic } from "@/lib/studies";
import {
  GOALS,
  KIND_LABEL,
  goalRatings,
  goalsForTopic,
  guideFor,
  listsCovering,
  profilesForTopic,
  relatedGoals,
  type Goal,
} from "@/lib/guides";
import { CARD } from "@/components/ui";
import { LEVEL_ORDER, RatingBadge } from "@/components/evidence-meter";

const TILE_LINK =
  "flex h-full min-h-14 flex-col justify-center rounded-tile border border-line bg-bg px-[18px] py-3 hover:border-accent";

/**
 * Best- and least-supported rating a goal guide covers. Like TopicCard: never only the best one,
 * and "not yet assessed" is not counted as the weakest. Stable order keeps the guide's own ranking for ties.
 */
function bestAndWorst(goal: Goal) {
  const ratings = goalRatings(goal);
  const assessed = ratings.filter((r) => r.level !== "unassessed");
  const sorted = [...assessed].sort((a, b) => LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level));
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];
  for (const r of [best, worst]) {
    // A subject naming Pürblack would need the disclosure note on every page that shows the tile.
    if (r && /p[uü]rblack/i.test(r.subject)) throw new Error(`Goal tile "${goal.id}" would show a Pürblack rating`);
  }
  return { ratings, assessed, best, worst, unassessed: ratings.length - assessed.length };
}

/** Full goal tile for the hub: guide link, best and least-supported rating, link to the evidence page. */
export function GoalTile({ goal, headingLevel = "h3" }: { goal: Goal; headingLevel?: "h2" | "h3" }) {
  const guide = guideFor(goal.guide);
  const { ratings, best, worst, unassessed } = bestAndWorst(goal);
  const same = best && worst && best.level === worst.level;
  const H = headingLevel;
  return (
    <li className={`${CARD} flex flex-col`}>
      <p className="text-caption font-semibold uppercase tracking-[0.08em] text-accent">{goal.label}</p>
      <H className="mt-2 text-xl font-bold leading-tight">
        <Link href={guide.path} className="hover:text-accent hover:underline">
          {guide.title}
        </Link>
      </H>
      <p className="mt-2 text-sm text-soft">{guide.blurb}</p>

      {best && (
        <div className="mt-5 border-t border-line pt-4">
          <p className="text-caption font-semibold uppercase tracking-[0.06em] text-muted">Best supported</p>
          <p className="mt-1 text-sm">{best.subject}</p>
          <div className="mt-2">
            <RatingBadge level={best.level} measures="benefit" />
          </div>
        </div>
      )}
      {worst && !same && (
        <div className="mt-4 border-t border-line pt-4">
          <p className="text-caption font-semibold uppercase tracking-[0.06em] text-muted">Least supported</p>
          <p className="mt-1 text-sm">{worst.subject}</p>
          <div className="mt-2">
            <RatingBadge level={worst.level} measures="benefit" />
          </div>
        </div>
      )}
      {same && (
        <p className="mt-4 border-t border-line pt-4 text-sm text-soft">
          Every option on this page is rated {LEVEL_LABEL[best.level].toLowerCase()}.
        </p>
      )}

      <p className="mt-auto pt-5 text-sm text-muted">
        {ratings.length} options rated{unassessed > 0 ? ` (${unassessed} not yet assessed)` : ""}.{" "}
        <Link href={`/science/topics/${goal.topic}`} className="link">
          Full evidence: {TOPICS[goal.topic].title}
        </Link>
      </p>
    </li>
  );
}

/** Compact goal links without ratings (a lone "best" rating would cherry-pick). */
export function GoalLinkGrid({ goals, className = "" }: { goals: Goal[]; className?: string }) {
  return (
    <ul className={`grid grid-cols-2 gap-3 lg:grid-cols-3 ${className}`}>
      {goals.map((g) => {
        const guide = guideFor(g.guide);
        return (
          <li key={g.id}>
            <Link href={guide.path} className={TILE_LINK}>
              <span className="text-caption font-semibold uppercase tracking-[0.08em] text-accent">{g.label}</span>
              <span className="sr-only">: </span>
              <span className="font-medium">{guide.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** End-of-page block on list and goal pages: every other goal, most related first. */
export function RelatedGoals({ path }: { path: string }) {
  return (
    <section className="mt-14">
      <h2 className="text-xl font-bold">Other goals</h2>
      <p className="mt-2 max-w-prose text-sm text-muted">
        The same rating scale on every page, so the levels can be compared. See{" "}
        <Link href="/peptides/by-goal" className="link">
          all goals side by side
        </Link>
        .
      </p>
      <GoalLinkGrid goals={relatedGoals(path)} className="mt-4" />
    </section>
  );
}

/** On a peptide profile: the ranked lists that include it, and the evidence pages its studies feed. */
export function PeptideInGuides({ peptide }: { peptide: PeptideId }) {
  const lists = listsCovering(peptide);
  const topics = [...new Set(STUDIES.filter((s) => s.peptides.includes(peptide)).flatMap((s) => s.topics))] as Topic[];
  const name = PEPTIDE_LABEL[peptide];
  return (
    <section className="mt-14">
      <h2 className="text-xl font-bold">Where {name} appears on this site</h2>
      {lists.length > 0 && (
        <>
          <h3 className="mt-4 text-caption font-semibold uppercase tracking-[0.06em] text-muted">Ranked lists</h3>
          <ul className="mt-2 grid gap-3 sm:grid-cols-2">
            {lists.map((g) => (
              <li key={g.path}>
                <Link href={g.path} className={TILE_LINK}>
                  <span className="font-medium">{g.title}</span>
                  <span className="sr-only"> — </span>
                  <span className="text-sm text-muted">{g.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {topics.length > 0 && (
        <>
          <h3 className="mt-6 text-caption font-semibold uppercase tracking-[0.06em] text-muted">Evidence pages</h3>
          <ul className="mt-2 flex flex-wrap gap-x-6">
            {topics.map((t) => (
              <li key={t}>
                <Link href={`/science/topics/${t}`} className="link-solo">
                  {TOPICS[t].title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

/** On a topic evidence page: the guides that rank or explain these ratings. */
export function TopicGuides({ topic }: { topic: Topic }) {
  const goals = goalsForTopic(topic);
  const profiles = profilesForTopic(topic);
  if (goals.length === 0 && profiles.length === 0) return null;
  return (
    <nav aria-label={`Guides that use the ${TOPIC_LABEL[topic].toLowerCase()} ratings`} className="mt-6 rounded-tile border border-line bg-card px-5 py-4">
      <p className="text-caption font-semibold uppercase tracking-[0.06em] text-muted">Guides built on these ratings</p>
      <ul className="mt-1 flex flex-wrap gap-x-6">
        {goals.map((g) => (
          <li key={g.id}>
            <Link href={g.guide} className="link-solo">
              {guideFor(g.guide).title}
            </Link>
          </li>
        ))}
        {profiles.map((p) => (
          <li key={p.path}>
            <Link href={p.path} className="link-solo">
              {p.title} ({KIND_LABEL[p.kind].toLowerCase()})
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { GOALS };

/** Small label above a guide page's title saying what kind of page it is. */
export function PageKindLabel({ path }: { path: string }) {
  return (
    <p className="mt-5 text-caption font-semibold uppercase tracking-[0.08em] text-accent">{KIND_LABEL[guideFor(path).kind]}</p>
  );
}
