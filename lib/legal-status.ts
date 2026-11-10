/**
 * Data behind /peptides/legal-status. This is the page most likely to go out of date: update
 * `LEGAL_REVIEWED`, the timeline and the table together, and add an entry to lib/corrections.ts
 * if a published statement turns out to be wrong.
 *
 * Rules: state only what a source says; prefer FDA, HHS and Federal Register documents; label
 * news reports as news; never describe something as "legal" or "illegal" without a source that
 * says so.
 */

export const LEGAL_REVIEWED = "2026-11-10";

export type SourceKind = "primary" | "news" | "commentary";
export type Source = { label: string; url: string; kind: SourceKind };

export const SOURCES = {
  fdaCategory2: {
    label: "FDA: Certain Bulk Drug Substances for Use in Compounding that May Present Significant Safety Risks (Category 2)",
    url: "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks",
    kind: "primary",
  },
  federalRegister: {
    label: "Federal Register notice 2026-07361: Pharmacy Compounding Advisory Committee meeting and docket FDA-2025-N-6895",
    url: "https://www.federalregister.gov/d/2026-07361",
    kind: "primary",
  },
  fdaMeeting: {
    label: "FDA: July 23-24, 2026 meeting of the Pharmacy Compounding Advisory Committee",
    url: "https://www.fda.gov/advisory-committees/advisory-committee-calendar/july-23-24-2026-meeting-pharmacy-compounding-advisory-committee-07232026",
    kind: "primary",
  },
  fdaBriefing: {
    label: "FDA: Briefing document introduction, Pharmacy Compounding Advisory Committee, July 23-24, 2026",
    url: "https://www.fda.gov/media/193342/download",
    kind: "primary",
  },
  hhsNotice: {
    label: "Federal Register, 30 October 2026 (FR Doc. 2026-22192): HHS, Enforcement Discretion Policy Regarding 503A Compounding Using Certain Peptide Bulk Drug Substances (docket HHS-OASH-2026-0496)",
    url: "https://govinfo.gov/content/pkg/FR-2026-10-30/html/2026-22192.htm",
    kind: "primary",
  },
  hhsPolicy: {
    label: "HHS: 503A peptide enforcement discretion policy, Appendix B (PDF; blocks automated readers, so we have not read it directly)",
    url: "https://www.hhs.gov/sites/default/files/hhs-503a-peptide-enforcement-discretion-policy-appendix-b.pdf",
    kind: "primary",
  },
  abc: {
    label: "ABC News: FDA advisers narrowly vote to add 6 peptides to a drug compounding list (24 July 2026)",
    url: "https://abcnews.com/Health/fda-advisers-narrowly-vote-add-6-peptides-drug/story?id=135064915",
    kind: "news",
  },
  hollandKnight: {
    label: "Holland & Knight (law firm), 4 November 2026: HHS issues interim enforcement discretion policy for compounding",
    url: "https://www.hklaw.com/en/insights/publications/2026/11/hhs-issues-interim-enforcement-discretion-policy-for-compounding",
    kind: "commentary",
  },
  time: {
    label: "TIME: An FDA Committee Just Voted in Favor of Peptides—Despite the Agency's Opposition (23 July 2026)",
    url: "https://time.com/article/2026/07/23/fda-committee-peptides/",
    kind: "news",
  },
} satisfies Record<string, Source>;

export type TimelineEvent = { date: string; label: string; text: string; sources: Source[] };

export const TIMELINE: TimelineEvent[] = [
  {
    date: "2023-09-29",
    label: "29 September 2023",
    text: "FDA adds several peptides to Category 2 of its interim compounding policies, its list of bulk substances that may present significant safety risks. FDA's page dates the entries for GHRP-2, GHRP-6, ipamorelin acetate and kisspeptin-10 to this day.",
    sources: [SOURCES.fdaCategory2],
  },
  {
    date: "2026-04-16",
    label: "16 April 2026",
    text: "FDA publishes notice of a public meeting of its Pharmacy Compounding Advisory Committee on 23 and 24 July 2026, to advise on bulk drug substances nominated for the Section 503A bulks list, and opens a public docket (FDA-2025-N-6895).",
    sources: [SOURCES.federalRegister],
  },
  {
    date: "2026-04-22",
    label: "As of 22 April 2026",
    text: "FDA's Category 2 page lists BPC-157, CJC-1295, GHK-Cu (injectable routes), KPV, MOTS-c, selank, semax, thymosin alpha-1, TB-500, epitalon and emideltide (DSIP), among others, as substances that were previously in Category 2 and were withdrawn by the nominators. Ipamorelin acetate appears on that list too, and the page also keeps it in Category 2 for 503B. For several of these, FDA's stated concerns include the risk of an immune reaction and difficulty characterising the peptide and its impurities.",
    sources: [SOURCES.fdaCategory2],
  },
  {
    date: "2026-07-23",
    label: "23 and 24 July 2026",
    text: "The advisory committee meets and considers seven peptides for the 503A bulks list (see the table below). According to news reports, it recommended six and rejected one. FDA's own meeting page, current as of 6 August 2026 when we read it, carried the agenda and briefing materials but not the votes.",
    sources: [SOURCES.fdaMeeting, SOURCES.abc, SOURCES.time],
  },
  {
    date: "2026-10-30",
    label: "30 October 2026",
    text: "HHS publishes in the Federal Register a draft, interim enforcement-discretion policy for compounding under Section 503A with certain peptide bulk drug substances. It says HHS does not intend to take enforcement action against a state-licensed pharmacy, a federal facility or a licensed physician that compounds with a substance listed in the policy's Appendix A, while rulemaking on the 503A bulks list is pending. The notice says it does not add any substance to the bulks list, creates no rights and is not binding. Comments are due two weeks after publication, which is 13 November 2026. Some law-firm alerts date the policy 28 October; the Federal Register publication date is 30 October.",
    sources: [SOURCES.hhsNotice],
  },
];

export type CommitteeRow = { peptide: string; day: string; use: string; result: "Recommended" | "Not recommended" };

/** Uses evaluated come from FDA's meeting page; results come from news reports (ABC News, TIME). */
export const COMMITTEE: CommitteeRow[] = [
  { peptide: "BPC-157", day: "23 July", use: "Ulcerative colitis", result: "Recommended" },
  { peptide: "KPV", day: "23 July", use: "Wound healing and inflammatory conditions", result: "Recommended" },
  { peptide: "TB-500", day: "23 July", use: "Wound healing", result: "Recommended" },
  { peptide: "MOTS-c", day: "23 July", use: "Obesity and osteoporosis", result: "Recommended" },
  { peptide: "Emideltide (DSIP)", day: "24 July", use: "Opioid withdrawal, chronic insomnia and narcolepsy", result: "Not recommended" },
  { peptide: "Semax", day: "24 July", use: "Cerebral ischemia, migraine and trigeminal neuralgia", result: "Recommended" },
  { peptide: "Epitalon", day: "24 July", use: "Insomnia", result: "Recommended" },
];
