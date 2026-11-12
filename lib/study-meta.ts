import { STUDIES } from "./studies";

/**
 * Extra structured fields for the study registry, kept apart from lib/studies.ts. Both are taken from what we
 * already wrote from each PubMed record: funding type from the study's `funding` text, sizes from its `population`
 * text (both checked against the abstracts). A study missing here has no stated value; never guess one.
 */

export type FundingType = "industry" | "public" | "other" | "not-stated";

export const FUNDING_LABEL: Record<FundingType, string> = {
  industry: "Industry funding, or authors tied to the maker",
  public: "Public or no funding; no industry link stated",
  other: "Other industry ties (not to the maker)",
  "not-stated": "Funding not stated in the record",
};

/**
 * Rules: "industry" = funded or supplied by a company that makes or sells what was studied, or an author employed
 * or paid by one. "other" = disclosed ties to companies that do not make it, or ties stated as unrelated.
 * "public" = public, university or charity funding, or none, with no industry tie in the record.
 * Everything else, including "no grants and no conflict-of-interest statement", is "not-stated".
 */
const FUNDING: Record<string, Exclude<FundingType, "not-stated">> = {
  // industry
  "milani-2023": "industry", "schulze-2024": "industry", "zdzieblik-2021-knee": "industry", "praet-2019": "industry",
  "thomas-2024": "industry", "kingsberg-2019": "industry", "zdzieblik-2021-bone": "industry", "knop-2023": "industry",
  "gregoric-2025": "industry", "brenner-2024": "industry", "bioletto-2022": "industry", "laatikainen-2020": "industry",
  "eckert-2024": "industry", "chataigner-2026": "industry", "mjos-2019": "industry", "oddoux-2022": "industry",
  "wu-2025": "industry", "ke-2022": "industry", "zdzieblik-2021": "industry", "russo-2024": "industry",
  "wilding-2021": "industry", "jastreboff-2022": "industry", "lincoff-2023": "industry", "wilding-2022": "industry",
  "nong-2026": "industry",
  // other ties
  "vasireddi-2025": "other", "mendias-2026": "other", "jain-2026": "other", "yeung-2026": "other", "cowart-2025": "other",
  "bassila-2026": "other", "khatri-2021": "other",
  // public or none, no industry link stated
  "pu-2023": "public", "mcguire-2025": "public", "nukaly-2026": "public", "mortazavi-2025": "public",
  "zdrada-nowak-2025": "public", "chan-2024": "public", "lueangarun-2020": "public", "cheng-2026": "public",
  "dai-2021": "public", "yuenyongviwat-2025": "public", "hijlkema-2022": "public", "chang-2024": "public",
  "lim-2024": "public", "konig-2018": "public", "kuhlman-2026": "public", "duangjai-2025": "public",
  "forslund-2026": "public", "chen-2025": "public", "najafi-2026": "public", "mateescu-2026-ghk": "public",
  "la-vignera-2026": "public", "luthra-2019": "public", "sabra-2024": "public", "dale-2019": "public",
  "bajramagic-2024": "public", "hwang-2026": "public", "wolf-2011": "public", "wang-2018": "public", "wu-2013": "public",
  "chen-2022": "public", "peng-2020": "public", "ueno-2020": "public", "moiz-2026": "public", "bischof-2024": "public",
  "jendricke-2019": "public", "nass-2008": "public", "dominikowski-2026": "public", "villegas-meza-2026": "public",
  "adrian-2019": "public", "badran-2026": "public", "liu-2008": "public", "liu-2007": "public", "ionescu-2006": "public",
  "qi-2026": "public", "laverde-2026": "public", "mateescu-2026": "public", "dalmasso-2008": "public",
  "viennois-2016": "public", "bohm-2019": "public",
};

export const fundingType = (id: string): FundingType => FUNDING[id] ?? "not-stated";

/** People in the study as our population text states it; for pooled analyses also the number of trials or studies. */
export type StudySize = { people: number; trials?: number };

export const SIZE: Record<string, StudySize> = {
  "zdzieblik-2015": { people: 53 }, "de-miranda-2021": { people: 1125, trials: 19 }, "pu-2023": { people: 1721, trials: 26 },
  "lee-padgett-2021": { people: 17 }, "lee-burgess-2025": { people: 2 }, "nukaly-2026": { people: 1341, trials: 19 },
  "wang-2013": { people: 60 }, "raikou-2017": { people: 24 }, "miller-2006": { people: 13 }, "iwabuchi-2016": { people: 22 },
  "loing-2013": { people: 30 }, "gold-2025": { people: 112 }, "lueangarun-2020": { people: 32 }, "milani-2023": { people: 83 },
  "cheng-2026": { people: 4114, trials: 9 }, "simental-mendia-2025": { people: 870, trials: 11 },
  "yuenyongviwat-2025": { people: 68 }, "schulze-2024": { people: 182 }, "zdzieblik-2021-knee": { people: 180 },
  "bongers-2020": { people: 167 }, "clark-2008": { people: 147 }, "praet-2019": { people: 20 }, "lugo-2016": { people: 191 },
  "bes-1992": { people: 16 }, "schneider-helmert-1987": { people: 14 }, "chang-2024": { people: 36 }, "lim-2024": { people: 40 },
  "thomas-2024": { people: 13 }, "kingsberg-2019": { people: 1267 }, "clayton-2022": { people: 1247 },
  "konig-2018": { people: 131 }, "zdzieblik-2021-bone": { people: 31 }, "cuneo-2010": { people: 71 },
  "elkind-hirsch-2022": { people: 82 }, "chen-2025": { people: 100 }, "bishop-1992": { people: 86 }, "knop-2023": { people: 667 },
  "skov-2019": { people: 10 }, "deameh-2026": { people: 639, trials: 10 }, "gregoric-2025": { people: 25 },
  "yeung-2026": { people: 27 }, "safarinejad-2008": { people: 342 }, "able-2025": { people: 6188 },
  "atluri-2014": { people: 1773, trials: 3 }, "luthra-2019": { people: 17214, trials: 33 }, "akram-2026": { people: 6319, trials: 7 },
  "brenner-2024": { people: 1436 }, "sabra-2024": { people: 843, trials: 23 }, "hoilat-2022": { people: 626, trials: 4 },
  "chiang-2025": { people: 106395, trials: 55 }, "dale-2019": { people: 28 }, "hwang-2026": { people: 114 },
  "kawasaki-2000": { people: 29 }, "zhu-2010": { people: 150 }, "oliveira-2020": { people: 9 }, "chataigner-2026": { people: 53 },
  "mjos-2019": { people: 14 }, "cordeiro-2020": { people: 9 }, "wolf-2011": { people: 2736, trials: 26 },
  "wu-2025": { people: 1106 }, "wu-2013": { people: 361 }, "ke-2022": { people: 508 }, "cao-2024": { people: 3329, trials: 39 },
  "tian-2025": { people: 706, trials: 5 }, "chen-2022": { people: 120 }, "peng-2020": { people: 1144, trials: 7 },
  "kim-2012": { people: 51 }, "ueno-2020": { people: 1 }, "bischof-2024": { people: 768, trials: 19 },
  "jendricke-2019": { people: 77 }, "zdzieblik-2021": { people: 97 }, "jacinto-2022": { people: 22 }, "nass-2008": { people: 65 },
  "li-2026": { people: 73 }, "wu-2018": { people: 690 }, "jia-2015": { people: 84 }, "adrian-2019": { people: 341 },
  "russo-2024": { people: 38 }, "beck-2014": { people: 117 }, "adunsky-2011": { people: 123 },
  "liu-2008": { people: 303, trials: 27 }, "liu-2007": { people: 220, trials: 18 }, "gobburu-1999": { people: 40 },
  "wilding-2021": { people: 1961 }, "jastreboff-2022": { people: 2539 }, "lincoff-2023": { people: 17604 },
  "wilding-2022": { people: 327 }, "qi-2026": { people: 8993, trials: 6 }, "laverde-2026": { people: 821, trials: 7 },
  "nong-2026": { people: 99791, trials: 262 }, "poolton-2026": { people: 30, trials: 3 }, "zozulia-2008": { people: 62 },
  "medvedev-2014": { people: 60 }, "medvedev-2015": { people: 70 },
};

// Every id must exist in the registry, so a renamed study cannot leave a stale value behind.
for (const id of [...Object.keys(FUNDING), ...Object.keys(SIZE)]) {
  if (!STUDIES.some((s) => s.id === id)) throw new Error(`lib/study-meta.ts: unknown study id "${id}"`);
}
// Sizes are only recorded for human studies and pooled analyses.
for (const id of Object.keys(SIZE)) {
  const s = STUDIES.find((x) => x.id === id)!;
  if (!["human-controlled", "human-uncontrolled", "meta-analysis", "systematic-review"].includes(s.kind)) {
    throw new Error(`lib/study-meta.ts: size recorded for ${id}, which is not a human study or pooled analysis`);
  }
}
