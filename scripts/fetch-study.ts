/**
 * Prints the PubMed record for one or more PMIDs, ready to turn into a lib/studies.ts entry.
 *
 *   npm run study:fetch -- 26353786 30368550
 *
 * Identifiers are read from the record's own PubmedData block, not from anywhere in the article
 * body: a record's reference list carries other papers' DOIs and PMC IDs, and taking those is how a
 * wrong identifier ends up on a page. The abstract is printed for you to read and summarise in your
 * own words; do not paste it into the registry.
 */
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_", textNodeName: "#text" });

const arr = <T,>(v: T | T[] | undefined): T[] => (v === undefined ? [] : Array.isArray(v) ? v : [v]);
const text = (v: unknown): string => {
  if (v == null) return "";
  if (typeof v === "string" || typeof v === "number") return String(v);
  if (Array.isArray(v)) return v.map(text).join("");
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    return Object.entries(o)
      .filter(([k]) => !k.startsWith("@_"))
      .map(([, x]) => text(x))
      .join("");
  }
  return "";
};

async function main() {
  const pmids = process.argv.slice(2).filter((a) => /^\d+$/.test(a));
  if (pmids.length === 0) {
    console.error("Usage: npm run study:fetch -- <pmid> [<pmid> ...]");
    process.exit(1);
  }
  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&id=${pmids.join(",")}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`PubMed efetch failed: ${res.status}`);
  const xml = parser.parse(await res.text());

  for (const art of arr<any>(xml?.PubmedArticleSet?.PubmedArticle)) {
    const cit = art.MedlineCitation;
    const a = cit.Article;
    const ji = a.Journal?.JournalIssue ?? {};
    const pubDate = ji.PubDate ?? {};
    const year = text(pubDate.Year) || text(pubDate.MedlineDate).slice(0, 4);

    // Only the record's own identifiers: PubmedData/ArticleIdList (direct child), then ELocationID for the DOI.
    const ids: Record<string, string> = {};
    for (const x of arr<any>(art.PubmedData?.ArticleIdList?.ArticleId)) ids[x["@_IdType"]] = text(x);
    if (!ids.doi) for (const e of arr<any>(a.ELocationID)) if (e["@_EIdType"] === "doi") ids.doi = text(e);

    const authors = arr<any>(a.AuthorList?.Author).map((x) => `${text(x.LastName) || text(x.CollectiveName)} ${text(x.Initials)}`.trim());
    const pubTypes = arr<any>(a.PublicationTypeList?.PublicationType).map(text);
    const grants = arr<any>(a.GrantList?.Grant).map((g) => text(g.Agency));
    const coi = text(cit.CoiStatement);
    const abstract = arr<any>(a.Abstract?.AbstractText)
      .map((t) => (t["@_Label"] ? `${t["@_Label"]}: ` : "") + text(t))
      .join("\n");
    const vol = text(ji.Volume);
    const iss = text(ji.Issue);
    const pages = text(a.Pagination?.MedlinePgn);

    console.log("=".repeat(88));
    console.log(`pmid:      "${text(cit.PMID)}"`);
    if (ids.pmc) console.log(`pmcid:     "${ids.pmc}"`);
    if (ids.doi) console.log(`doi:       "${ids.doi}"`);
    console.log(`authors:   "${authors.join(", ")}"   (${authors.length} authors)`);
    console.log(`year:      ${year}`);
    console.log(`title:     "${text(a.ArticleTitle)}"`);
    console.log(`journal:   "${text(a.Journal?.ISOAbbreviation) || text(a.Journal?.Title)}"`);
    console.log(`ref:       "${vol}${iss ? `(${iss})` : ""}${pages ? `:${pages}` : ""}"`);
    console.log(`pubtypes:  ${pubTypes.join("; ")}`);
    console.log(`grants:    ${grants.length ? grants.join("; ") : "(none listed)"}`);
    console.log(`coi:       ${coi || "(none in record)"}`);
    console.log(`\nABSTRACT (read it, then write finding/caveat in your own words):\n${abstract || "(no abstract)"}\n`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
