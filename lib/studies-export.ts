import { SITE } from "./site";
import { STUDIES, type Study } from "./studies";

/** One flat row per study. Adding a column here adds it to both /data/studies.csv and /data/studies.json. */
export const EXPORT_COLUMNS = [
  { key: "id", note: "Stable id used in URLs" },
  { key: "authors", note: "As listed in PubMed" },
  { key: "year", note: "Year of publication" },
  { key: "title", note: "Title of the paper" },
  { key: "journal", note: "Journal (ISO abbreviation)" },
  { key: "ref", note: "Volume(issue):pages" },
  { key: "pmid", note: "PubMed ID" },
  { key: "pmcid", note: "PubMed Central ID, if free full text exists" },
  { key: "doi", note: "Digital object identifier" },
  { key: "design", note: "Study design category on this site" },
  { key: "topics", note: "Topics, semicolon-separated" },
  { key: "peptides", note: "Peptides studied, semicolon-separated" },
  { key: "delivery", note: "Route studied, semicolon-separated (blank for multi-route reviews)" },
  { key: "population", note: "Who or what was studied" },
  { key: "methods", note: "Design details as described in the abstract" },
  { key: "dose", note: "Dose, if stated" },
  { key: "duration", note: "Duration, if stated" },
  { key: "finding", note: "What it found (our summary)" },
  { key: "caveat", note: "What it does not show (our summary)" },
  { key: "funding", note: "Funding and conflicts as stated by the record; blank if none stated" },
  { key: "verified_on", note: "Date checked against the abstract and PubMed" },
  { key: "page", note: "URL of the study page on this site" },
] as const;

export type ExportRow = Record<(typeof EXPORT_COLUMNS)[number]["key"], string | number>;

function row(s: Study): ExportRow {
  return {
    id: s.id,
    authors: s.authors,
    year: s.year,
    title: s.title,
    journal: s.journal,
    ref: s.ref,
    pmid: s.pmid,
    pmcid: s.pmcid ?? "",
    doi: s.doi ?? "",
    design: s.kind,
    topics: s.topics.join("; "),
    peptides: s.peptides.join("; "),
    delivery: s.delivery.join("; "),
    population: s.population ?? "",
    methods: s.design ?? "",
    dose: s.dose ?? "",
    duration: s.duration ?? "",
    finding: s.finding,
    caveat: s.caveat,
    funding: s.funding ?? "",
    verified_on: s.verifiedOn,
    page: `${SITE.url}/science/${s.id}`,
  };
}

export const EXPORT_ROWS: ExportRow[] = STUDIES.map(row);

const csvCell = (v: string | number) => {
  const s = String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export function toCsv(): string {
  const keys = EXPORT_COLUMNS.map((c) => c.key);
  return [keys.join(","), ...EXPORT_ROWS.map((r) => keys.map((k) => csvCell(r[k])).join(","))].join("\n") + "\n";
}
