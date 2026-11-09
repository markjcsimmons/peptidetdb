import { LEVEL_LABEL, type Level } from "@/lib/topics";

/** Strongest first. Used to pick a topic's best-supported rating and to order the legend. */
export const LEVEL_ORDER: Level[] = ["consistent", "mixed", "limited", "preclinical", "none", "unassessed"];

/** Segments filled out of 5. Mirrors LEVEL_ORDER; the label always sits beside the meter. */
export const LEVEL_FILL: Record<Level, number> = {
  consistent: 5,
  mixed: 4,
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
  const w = size === "sm" ? 28 : 32;
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
          style={{ width: w, height: h, background: i < fill ? color : "var(--track)" }}
        />
      ))}
    </span>
  );
}
