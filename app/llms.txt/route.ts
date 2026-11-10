import { SITE } from "@/lib/site";
import { KIND_LABEL, PEPTIDE_LABEL, STUDIES, shortCite } from "@/lib/studies";
import { LEVEL_LABEL, TOPICS, TOPIC_SLUGS } from "@/lib/topics";
import { LEGAL_REVIEWED } from "@/lib/legal-status";

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
  lines.push(
    "## Guides",
    "",
    `- [What are peptides?](${SITE.url}/peptides): definition, the four things the word covers, and what the studies show so far.`,
    `- [How do peptides work?](${SITE.url}/peptides/how-peptides-work): peptides as cell signals, what digestion does to swallowed ones, and why a lab mechanism is not proof of a human effect.`,
    `- [What do peptides do?](${SITE.url}/peptides/what-do-peptides-do): what human studies show for skin, muscle, joints, blood pressure, brain and immune function, with the best and least-supported rating for each.`,
    `- [Are peptides steroids?](${SITE.url}/peptides/are-peptides-steroids): why peptides and anabolic steroids are different substances, what the muscle studies show, and why that does not make a peptide safe.`,
    `- [Are peptides legal in the US?](${SITE.url}/peptides/legal-status): dated, source-linked timeline of the 2026 FDA changes for peptide compounding. Last reviewed ${LEGAL_REVIEWED}.`,
    `- [Do oral marine peptides work?](${SITE.url}/peptides/oral-marine-peptides): human studies of fish-derived collagen peptides and fish hydrolysates, by body system, including where no trial was found.`,
    `- [Glossary](${SITE.url}/glossary)`,
    "",
  );
  lines.push(
    "## Trust and data",
    "",
    `- [Methodology](${SITE.url}/science/methodology)`,
    `- [Editorial policy](${SITE.url}/editorial-policy)`,
    `- [Corrections log](${SITE.url}/corrections)`,
    `- [About and disclosure](${SITE.url}/about)`,
    `- [Study registry as CSV](${SITE.url}/data/studies.csv) and [JSON](${SITE.url}/data/studies.json)`,
    "",
  );
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
