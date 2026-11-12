import { SITE } from "@/lib/site";
import { KIND_LABEL, PEPTIDE_LABEL, STUDIES, shortCite } from "@/lib/studies";
import { LEVEL_LABEL, TOPICS, TOPIC_SLUGS } from "@/lib/topics";
import { LEGAL_REVIEWED } from "@/lib/legal-status";
import { COLLAGEN_CHECKED_ON } from "@/lib/product-checks";

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];
  lines.push(`# ${SITE.name} (${SITE.fullName})`, "", `> ${SITE.description}`, "");
  lines.push(
    "Every page on this site has a markdown version: add .md to the page's URL (the home page is /index.md), or request the normal URL with the header `Accept: text/markdown`. The links below point to the markdown versions.",
    `All pages in one file: ${SITE.url}/llms-full.txt`,
    "",
  );
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
    `- [What do peptides do?](${SITE.url}/peptides/what-do-peptides-do): what human studies show for skin, hair, muscle, joints, blood pressure, brain, immune function, weight, women's health, men's health and gut health, with the best and least-supported rating for each.`,
    `- [Are peptides steroids?](${SITE.url}/peptides/are-peptides-steroids): why peptides and anabolic steroids are different substances, what the muscle studies show, and why that does not make a peptide safe.`,
    `- [Collagen peptides: what the evidence shows](${SITE.url}/peptides/collagen-peptides): what collagen peptides are, what trials show for skin, muscle and joints, safety, and how to check a product.`,
    `- [Collagen peptides with published batch test results](${SITE.url}/peptides/best-collagen-peptides): which of 15 collagen brands publish batch-specific lab reports (three do), which are listed by NSF without a batch report, and which testing claims could not be verified. Documents checked ${COLLAGEN_CHECKED_ON}; not a product grade.`,
    `- [Best peptides for skin, ranked by the evidence](${SITE.url}/peptides/best-peptides-for-skin): oral collagen, fish-derived collagen, topical cosmetic peptides, GHK-Cu and KPV ordered by the strength of the human studies, with what each does not show. Not a product ranking.`,
    `- [Peptides for hair growth, ranked by the evidence](${SITE.url}/peptides/peptides-for-hair-growth): topical peptide products, oral collagen, scalp injections, thymosin beta-4 and BPC-157 ordered by the strength of the human studies, plus GLP-1 drugs and hair loss. Not a product ranking.`,
    `- [Peptides for joint pain, ranked by the evidence](${SITE.url}/peptides/peptides-for-joint-pain): collagen for osteoarthritis, sports-related knee pain and tendons, UC-II, BPC-157, TB-500 and marine collagen ordered by the strength of the human studies. Not a product ranking.`,
    `- [Peptides for sleep, ranked by the evidence](${SITE.url}/peptides/peptides-for-sleep): casein hydrolysate, collagen before bed, fish hydrolysate, DSIP and epitalon ordered by the strength of the human studies. Not a product ranking.`,
    `- [Peptides for women, ranked by the evidence](${SITE.url}/peptides/peptides-for-women): bremelanotide, GLP-1 drugs in PCOS, collagen for skin, bone and hair, topical peptides and menopause symptoms ordered by the strength of the human studies. Not a product ranking.`,
    `- [Peptides for gut health, ranked by the evidence](${SITE.url}/peptides/peptides-for-gut-health): linaclotide and plecanatide, GLP-2 drugs, larazotide, protein hydrolysates, BPC-157, KPV and collagen ordered by the strength of the human studies, with what each does not show.`,
    `- [Peptides for men, ranked by the evidence](${SITE.url}/peptides/peptides-for-men): collagen for muscle, GLP-1 drugs, testosterone, erectile dysfunction, kisspeptin, hair loss, BPC-157 and growth-hormone peptides ordered by the strength of the human studies, with what each does not show.`,
    `- [Oral peptides: do they work? Ranked by the evidence](${SITE.url}/peptides/oral-peptides): oral semaglutide, linaclotide, collagen, fish and milk hydrolysates, Pürblack capsules and BPC-157 ordered by the strength of the human studies, with what each does not show.`,
    `- [Peptides for muscle growth](${SITE.url}/peptides/peptides-for-muscle-growth): collagen with resistance training, collagen vs whey, MK-677, and what reviews say about ipamorelin, CJC-1295 and BPC-157.`,
    `- [BPC-157: what the studies show](${SITE.url}/peptides/bpc-157): mostly animal evidence, three small uncontrolled human studies (30 people), no randomised trial found, oral use, safety, product quality and 2026 legal status.`,
    `- [KPV peptide: what the studies show](${SITE.url}/peptides/kpv): laboratory and mouse studies, no human trial found, and its July 2026 FDA advisory committee review.`,
    `- [GHK-Cu copper peptide: what the studies show](${SITE.url}/peptides/ghk-cu): cell and animal work, a few small human trials with mixed results, no injected-use trial found, and FDA's view of injectable GHK-Cu.`,
    `- [Selank: what the studies show](${SITE.url}/peptides/selank): three small Russian-language trials against benzodiazepines with no placebo group, safety and legal status.`,
    `- [Ipamorelin: what the studies show](${SITE.url}/peptides/ipamorelin): the human studies, why none tests muscle, safety and product-quality concerns, and legal status.`,
    `- [CJC-1295: what the studies show](${SITE.url}/peptides/cjc-1295): two 2006 hormone-level trials, no trial for muscle, safety and legal status.`,
    `- [Peptides for weight loss](${SITE.url}/peptides/for-weight-loss): what trials of GLP-1 drugs (semaglutide, tirzepatide) show, what happens after stopping, and why compounded and unapproved products differ.`,
    `- [Collagen peptide benefits](${SITE.url}/peptides/collagen-peptides-benefits): what meta-analyses and trials show for skin, muscle and joints, and what they cannot show.`,
    `- [Collagen peptide side effects](${SITE.url}/peptides/collagen-peptides-side-effects): tolerability in trials, the documented fish-allergy risk, and what has not been studied.`,
    `- [Marine vs bovine collagen](${SITE.url}/peptides/marine-vs-bovine-collagen): why no head-to-head human trial was found, and what the fish-derived collagen trials show.`,
    `- [How to read a peptide COA](${SITE.url}/peptides/how-to-read-a-peptide-coa): a line-by-line checklist for a certificate of analysis: batch, lab, identity, purity, content and contaminants.`,
    `- [Are peptides legal in the US?](${SITE.url}/peptides/legal-status): dated, source-linked timeline of the 2026 FDA and HHS changes for peptide compounding, including the October 2026 HHS enforcement-discretion policy. Last reviewed ${LEGAL_REVIEWED}.`,
    `- [Do oral marine peptides work?](${SITE.url}/peptides/oral-marine-peptides): human studies of fish-derived collagen peptides and fish hydrolysates, by body system, including where no trial was found.`,
    `- [Glossary](${SITE.url}/glossary)`,
    "",
  );
  lines.push(
    "## Trust and data",
    "",
    `- [Study hub](${SITE.url}/science): all ${STUDIES.length} study summaries, filterable by topic, peptide and design.`,
    `- [Methodology](${SITE.url}/science/methodology)`,
    `- [Editorial policy](${SITE.url}/editorial-policy)`,
    `- [Corrections log](${SITE.url}/corrections)`,
    `- [About and disclosure](${SITE.url}/about)`,
    `- [Draft product-grading rubric](${SITE.url}/grading-rubric): the rules for grading product documentation, published before any product is graded.`,
    `- [Study registry as CSV](${SITE.url}/data/studies.csv) and [JSON](${SITE.url}/data/studies.json)`,
    "",
  );
  // Point page links at their markdown versions (page paths have no dot; /data/studies.csv and the like keep theirs).
  const text = lines.join("\n").replace(new RegExp(`${SITE.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(/[^\\s)./]+(?:/[^\\s)./]+)*)(?=[)\\s])`, "g"), `${SITE.url}$1.md`);
  return new Response(text, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
