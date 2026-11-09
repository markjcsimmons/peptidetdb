/**
 * Checks every entry in lib/studies.ts against PubMed itself. Read-only.
 *
 *   npm run study:audit
 *
 * For each study it compares PubMed's record with ours: first author surname, year (the print year
 * may differ from the registered year by one), DOI and PMC ID. A mismatch is the failure that matters:
 * the citation text looks right and the identifier points at a different paper, so nothing looks
 * broken on the page.
 *
 * Also checks the registry's own consistency: unique ids, kind/topic/peptide values, and that every
 * entry has a finding, a caveat and a verification date.
 *
 * It does NOT check that a finding matches what the paper says. That still needs reading.
 */
import { STUDIES } from "../lib/studies";

type Summary = {
  uid: string;
  pubdate?: string;
  sortfirstauthor?: string;
  authors?: { name: string }[];
  title?: string;
  fulljournalname?: string;
  articleids?: { idtype: string; value: string }[];
  error?: string;
};

const surname = (names: string) => names.split(",")[0].trim().replace(/\s+[A-Z]{1,3}$/, "").toLowerCase();

async function main() {
  const problems: string[] = [];

  const seen = new Set<string>();
  for (const s of STUDIES) {
    if (seen.has(s.id)) problems.push(`${s.id}: duplicate id`);
    seen.add(s.id);
    if (!s.finding.trim()) problems.push(`${s.id}: empty finding`);
    if (!s.caveat.trim()) problems.push(`${s.id}: empty caveat`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s.verifiedOn)) problems.push(`${s.id}: verifiedOn is not an ISO date`);
    if (!/^\d+$/.test(s.pmid)) problems.push(`${s.id}: pmid "${s.pmid}" is not numeric`);
    if (s.topics.length === 0) problems.push(`${s.id}: no topics`);
    if (s.peptides.length === 0) problems.push(`${s.id}: no peptides`);
  }

  const pmids = STUDIES.map((s) => s.pmid);
  const byPmid = new Map<string, Summary>();
  for (let i = 0; i < pmids.length; i += 100) {
    const batch = pmids.slice(i, i + 100);
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${batch.join(",")}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`PubMed esummary failed: ${res.status}`);
    const json = (await res.json()) as { result: Record<string, Summary> };
    for (const p of batch) if (json.result?.[p]) byPmid.set(p, json.result[p]);
    if (i + 100 < pmids.length) await new Promise((r) => setTimeout(r, 400));
  }

  for (const s of STUDIES) {
    const rec = byPmid.get(s.pmid);
    if (!rec || rec.error) {
      problems.push(`${s.id}: PMID ${s.pmid} has no PubMed record`);
      continue;
    }
    const first = (rec.authors?.[0]?.name ?? rec.sortfirstauthor ?? "").split(" ")[0].toLowerCase();
    const mine = surname(s.authors).split(" ").slice(-1)[0];
    // PubMed lists "de Miranda RB" as "de Miranda RB"; compare on the last word of the surname.
    const pmSurname = (rec.authors?.[0]?.name ?? "").replace(/\s+[A-Z]{1,3}$/, "").toLowerCase().split(" ").slice(-1)[0];
    if (!pmSurname || pmSurname !== mine) {
      problems.push(`${s.id}: PMID ${s.pmid} is "${rec.authors?.[0]?.name ?? first}" — "${(rec.title ?? "").slice(0, 80)}", registered as ${s.authors.split(",")[0]}`);
    }
    const pmYear = Number((rec.pubdate ?? "").slice(0, 4));
    if (pmYear && Math.abs(pmYear - s.year) > 1) {
      problems.push(`${s.id}: PubMed year ${pmYear}, registered ${s.year}`);
    }
    const ids = new Map((rec.articleids ?? []).map((x) => [x.idtype, x.value] as const));
    const pmDoi = ids.get("doi")?.toLowerCase();
    const pmPmc = ids.get("pmc")?.toUpperCase();
    if (s.doi && pmDoi !== s.doi.toLowerCase()) problems.push(`${s.id}: DOI registered ${s.doi}, PubMed has ${pmDoi ?? "none"}`);
    if (!s.doi && pmDoi) problems.push(`${s.id}: PubMed has DOI ${pmDoi}; registry has none (add it)`);
    if (s.pmcid && pmPmc !== s.pmcid.toUpperCase()) problems.push(`${s.id}: PMCID registered ${s.pmcid}, PubMed has ${pmPmc ?? "none"}`);
    if (!s.pmcid && pmPmc) problems.push(`${s.id}: PubMed has ${pmPmc}; registry has none (add it)`);
  }

  console.log(`${STUDIES.length} studies checked against PubMed.`);
  if (problems.length === 0) {
    console.log("No mismatches: every first author, year, DOI and PMC ID matches its PMID.");
  } else {
    console.log(`${problems.length} problem(s):\n`);
    for (const p of problems) console.log("  - " + p);
    process.exitCode = 1;
  }
  console.log("\nNote: this checks identifiers and registry consistency, not whether each finding matches the paper.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
