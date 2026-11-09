import { LEVEL_HINT, LEVEL_LABEL, type Level, type TopicPage } from "@/lib/topics";
import { Pill, type Tone } from "@/components/ui";

/** Strongest first. Used to pick a topic's best-supported rating and to order the legend. */
export const LEVEL_ORDER: Level[] = ["consistent", "mixed", "limited", "preclinical", "none", "unassessed"];

/**
 * Segments filled out of 5. Deliberately never 5: the top step is reserved for large, independent,
 * replicated human trials that agree, and no rating on this site is that strong. "Mixed" and "Limited"
 * share a step because they differ in kind (disagreement vs. smallness), not in depth.
 */
export const LEVEL_FILL: Record<Level, number> = {
  consistent: 4,
  mixed: 3,
  limited: 3,
  preclinical: 2,
  none: 1,
  unassessed: 0,
};

/** Amber for "mostly animal" and below, green for human evidence. Never the only signal: text follows. */
export const levelTone = (level: Level): "accent" | "warn" =>
  level === "preclinical" || level === "none" || level === "unassessed" ? "warn" : "accent";

export function EvidenceMeter({ level, size = "md", labelled = true }: { level: Level; size?: "sm" | "md"; labelled?: boolean }) {
  const fill = LEVEL_FILL[level];
  const color = levelTone(level) === "warn" ? "var(--warn)" : "var(--accent)";
  const w = size === "sm" ? 26 : 32;
  const h = size === "sm" ? 8 : 10;
  return (
    <span
      className="flex gap-1"
      role={labelled ? "img" : undefined}
      aria-label={labelled ? `Evidence level ${fill} of 5: ${LEVEL_LABEL[level]}` : undefined}
      aria-hidden={labelled ? undefined : true}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className="rounded-full"
          style={
            i === 4
              ? { width: w, height: h, border: "1.5px dashed var(--track)", boxSizing: "border-box" }
              : { width: w, height: h, background: i < fill ? color : "var(--track)" }
          }
        />
      ))}
    </span>
  );
}

/** Wording for the safety topic, where "evidence level" means evidence about harm, not benefit. */
const SAFETY_LABEL: Record<Level, string> = {
  consistent: "Consistent human safety data",
  mixed: "Mixed human safety data",
  limited: "Limited human safety data",
  preclinical: "Mostly animal safety data",
  none: "No human safety data found",
  unassessed: "Safety not yet assessed here",
};

const SAFETY_TONE: Record<Level, Tone> = {
  consistent: "accent",
  mixed: "warn",
  limited: "warn",
  preclinical: "warn",
  none: "warn",
  unassessed: "neutral",
};

/**
 * One rating, drawn the right way for what it measures. Benefit ratings get the meter plus a label.
 * Safety ratings get a label only: a long green meter next to "limited safety data" would read as "safe".
 */
export function RatingBadge({ level, measures }: { level: Level; measures: TopicPage["measures"] }) {
  if (measures === "safety") {
    return (
      <span title={LEVEL_HINT[level]}>
        <Pill tone={SAFETY_TONE[level]}>{SAFETY_LABEL[level]}</Pill>
      </span>
    );
  }
  return (
    <span className="flex flex-col gap-1.5" title={LEVEL_HINT[level]}>
      <EvidenceMeter level={level} />
      <span className={`text-sm font-semibold ${levelTone(level) === "warn" ? "text-warn" : "text-accent"}`}>
        {LEVEL_LABEL[level]}
      </span>
    </span>
  );
}

export function MeterLegend() {
  return (
    <div className="rounded-tile border border-line bg-card px-6 py-5">
      <p className="mb-3.5 text-caption font-semibold uppercase tracking-[0.06em] text-muted">How to read the meters</p>
      <div className="grid grid-cols-2 gap-x-5 gap-y-4 md:grid-cols-3 lg:grid-cols-6">
        {[...LEVEL_ORDER].reverse().map((level) => (
          <div key={level}>
            <EvidenceMeter level={level} size="sm" labelled={false} />
            <p className="mt-2 text-sm leading-snug text-soft">{LEVEL_LABEL[level]}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 max-w-prose text-sm text-muted">
        The dashed fifth segment is always empty: it is reserved for large, independent, replicated human trials that
        agree, and we have not rated anything that high. &ldquo;Mixed&rdquo; and &ldquo;Limited&rdquo; share a step because
        they differ in kind, not in depth. Safety ratings are shown as words only, because a meter beside &ldquo;limited
        safety data&rdquo; could be misread as &ldquo;safe&rdquo;.
      </p>
    </div>
  );
}
