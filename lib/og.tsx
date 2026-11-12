import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";
import { STUDIES, type Study, type Topic } from "@/lib/studies";
import { TOPICS, type Level, type TopicRating } from "@/lib/topics";
import { GOALS, KIND_LABEL, goalRatings, guideFor } from "@/lib/guides";
import { MIX_GROUPS, mixCounts } from "@/lib/study-mix";

/**
 * Per-page social cards (Open Graph and X). Built at build time from the same data as the pages: ranked lists and
 * topic pages show the spread of their ratings (never only the best one), profiles show the mix of study designs.
 * Colours are the light-theme tokens written out, because the image renderer cannot read CSS variables.
 */
export const OG_SIZE = { width: 1200, height: 630 };

const C = {
  bg: "#f6f7f3",
  fg: "#14181f",
  soft: "#3a4352",
  muted: "#5f6878",
  line: "#e0e3dc",
  track: "#d5dad2",
  accent: "#1f6f5c",
  warn: "#8f5409",
  card: "#ffffff",
};

const FILL: Record<string, string> = {
  pooled: C.accent,
  controlled: "#6aa697",
  uncontrolled: "#b3d2c9",
  review: C.track,
  lab: C.warn,
};

const SPREAD: { level: Level; short: string }[] = [
  { level: "consistent", short: "Consistent" },
  { level: "mixed", short: "Mixed" },
  { level: "limited", short: "Limited" },
  { level: "preclinical", short: "Mostly animal" },
  { level: "none", short: "No human trials found" },
];

function Spread({ ratings }: { ratings: TopicRating[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, color: C.muted, textTransform: "uppercase" }}>
        {`${ratings.length} options rated`}
      </div>
      {SPREAD.map((s) => {
        const n = ratings.filter((r) => r.level === s.level).length;
        return (
          <div key={s.level} style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 300, fontSize: 26, color: C.soft }}>{s.short}</div>
            <div style={{ display: "flex", gap: 8 }}>
              {n === 0 ? (
                <div style={{ fontSize: 26, color: C.muted }}>–</div>
              ) : (
                Array.from({ length: n }, (_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      background: s.level === "preclinical" || s.level === "none" ? C.warn : C.accent,
                    }}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Mix({ studies }: { studies: Study[] }) {
  const counts = mixCounts(studies).filter((g) => g.n > 0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
      <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, color: C.muted, textTransform: "uppercase" }}>
        {`The ${studies.length} studies we summarised`}
      </div>
      <div style={{ display: "flex", width: "100%", height: 34, borderRadius: 17, overflow: "hidden", border: `2px solid ${C.line}` }}>
        {counts.map((g) => (
          <div key={g.key} style={{ width: `${(g.n / studies.length) * 100}%`, height: "100%", background: FILL[g.key] }} />
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 28 }}>
        {counts.map((g) => (
          <div key={g.key} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 24, color: C.soft }}>
            <div style={{ width: 20, height: 20, borderRadius: 4, background: FILL[g.key] }} />
            {`${MIX_GROUPS.find((m) => m.key === g.key)?.label} ${g.n}`}
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: C.bg,
          color: C.fg,
          padding: "56px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 4, color: C.accent, textTransform: "uppercase" }}>{eyebrow}</div>
            <div style={{ fontSize: 34, fontWeight: 700 }}>{SITE.name}</div>
          </div>
          <div style={{ marginTop: 18, fontSize: title.length > 40 ? 60 : 72, fontWeight: 700, lineHeight: 1.05, maxWidth: 1050 }}>{title}</div>
        </div>
        <div style={{ display: "flex", width: "100%" }}>{children}</div>
      </div>
    ),
    OG_SIZE,
  );
}

/** Card for a guide page under /peptides, chosen by its kind in lib/guides.ts. */
export function guideOgImage(path: string) {
  const g = guideFor(path);
  const goal = GOALS.find((x) => x.guide === path);
  if (goal) return Card({ eyebrow: KIND_LABEL[g.kind], title: g.title, children: <Spread ratings={goalRatings(goal)} /> });
  if (g.kind === "profile") {
    const studies = STUDIES.filter((s) => s.peptides.includes(g.peptides[0]));
    return Card({ eyebrow: KIND_LABEL[g.kind], title: `${g.title}: what the studies show`, children: <Mix studies={studies} /> });
  }
  return Card({ eyebrow: KIND_LABEL[g.kind], title: g.title, children: <div style={{ fontSize: 30, color: C.soft, maxWidth: 820 }}>{g.blurb}</div> });
}

/** Card for a topic evidence page. Safety ratings are words only on the site, so the safety card shows its study mix. */
export function topicOgImage(slug: Topic) {
  const t = TOPICS[slug];
  if (t.measures === "safety") {
    return Card({ eyebrow: "Safety evidence", title: t.title, children: <Mix studies={STUDIES.filter((s) => s.topics.includes(slug))} /> });
  }
  return Card({ eyebrow: "Evidence page", title: t.title, children: <Spread ratings={t.ratings.filter((r) => r.level !== "unassessed")} /> });
}

/** Alt text for a guide's card. */
export const guideOgAlt = (path: string) => `${guideFor(path).title}: ${KIND_LABEL[guideFor(path).kind].toLowerCase()} on ${SITE.name}`;
