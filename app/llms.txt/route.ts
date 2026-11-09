import { SITE } from "@/lib/site";
import { KIND_LABEL, PEPTIDE_LABEL, STUDIES, shortCite } from "@/lib/studies";
import { LEVEL_LABEL, TOPICS, TOPIC_SLUGS } from "@/lib/topics";

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];
  lines.push(`# ${SITE.name} (${SITE.fullName})`, "", `> ${SITE.description}`, "");
  lines.push("## About", "", SITE.disclosure, "", SITE.disclaimer, "");
  lines.push(
    "## Evidence by topic",
    "",
    ...TOPIC_SLUGS.flatMap((slug) => {
      const t = TOPICS[slug];
      return [
        `### ${t.title} (${SITE.url}/science/topics/${slug})`,
        ...t.ratings.map((r) => `- ${r.subject}: ${LEVEL_LABEL[r.level]}. ${r.why}`),
        "",
      ];
    }),
  );
  lines.push(
    "## Studies",
    "",
    ...STUDIES.map(
      (s) =>
        `- [${shortCite(s)}: ${s.title.replace(/\.$/, "")}](${SITE.url}/science/${s.id}) — ${KIND_LABEL[s.kind]}; ${s.peptides.map((p) => PEPTIDE_LABEL[p]).join(", ")}. ${s.finding}`,
    ),
    "",
  );
  lines.push("## Method", "", `${SITE.url}/science/methodology`, "");
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
