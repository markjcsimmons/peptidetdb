import { STUDIES, PEPTIDE_LABEL } from "@/lib/studies";
import { ALL_GRADES, SHEETS_PAGE, result } from "@/lib/grades";
import { GUIDES } from "@/lib/guides";
import { TOPICS, TOPIC_SLUGS } from "@/lib/topics";
import { CORRECTIONS } from "@/lib/corrections";
import { LEGAL_REVIEWED } from "@/lib/legal-status";

/**
 * What's new: the dated record behind /whats-new, /feed.xml and the home page's "New this week" line.
 *
 * The three maps below hold the date each study, product grade and page first went live. They were filled from the
 * git history on 2026-11-17 (first commit that added each id or page file; a push to main deploys, so commit date =
 * publication date). **When you add a study, grade a product or add a page, add it here with today's date**; the
 * build fails if one is missing or if a key no longer exists. Re-checking something does not change its date.
 */

/** Study id → date its summary was published. */
export const STUDY_ADDED: Record<string, string> = {
  "zdzieblik-2015": "2026-11-09",
  "asserin-2015": "2026-11-09",
  "de-miranda-2021": "2026-11-09",
  "pu-2023": "2026-11-09",
  "garcia-coronado-2019": "2026-11-09",
  "vasireddi-2025": "2026-11-09",
  "mcguire-2025": "2026-11-09",
  "lee-padgett-2021": "2026-11-09",
  "lee-burgess-2025": "2026-11-09",
  "tewari-2026": "2026-11-09",
  "mendias-2026": "2026-11-09",
  "pickart-2015": "2026-11-09",
  "nukaly-2026": "2026-11-11",
  "wang-2013": "2026-11-11",
  "bae-2017": "2026-11-11",
  "raikou-2017": "2026-11-11",
  "miller-2006": "2026-11-11",
  "mortazavi-2025": "2026-11-11",
  "zdrada-nowak-2025": "2026-11-11",
  "chan-2024": "2026-11-11",
  "joerg-2026": "2026-11-11",
  "iwabuchi-2016": "2026-11-11",
  "loing-2013": "2026-11-11",
  "rinaldi-2019": "2026-11-11",
  "gold-2025": "2026-11-11",
  "lueangarun-2020": "2026-11-11",
  "milani-2023": "2026-11-11",
  "kim-2026": "2026-11-11",
  "cheng-2026": "2026-11-11",
  "beer-2026": "2026-11-11",
  "philp-2004": "2026-11-11",
  "dai-2021": "2026-11-11",
  "simental-mendia-2025": "2026-11-11",
  "yuenyongviwat-2025": "2026-11-11",
  "schulze-2024": "2026-11-11",
  "zdzieblik-2021-knee": "2026-11-11",
  "bongers-2020": "2026-11-11",
  "clark-2008": "2026-11-11",
  "praet-2019": "2026-11-11",
  "lugo-2016": "2026-11-11",
  "hijlkema-2022": "2026-11-11",
  "bicer-2026": "2026-11-11",
  "bes-1992": "2026-11-11",
  "monti-1987": "2026-11-11",
  "schneider-helmert-1987": "2026-11-11",
  "kovalzon-2006": "2026-11-11",
  "chang-2024": "2026-11-11",
  "lim-2024": "2026-11-11",
  "thomas-2024": "2026-11-11",
  "fan-2026": "2026-11-11",
  "jain-2026": "2026-11-11",
  "kingsberg-2019": "2026-11-12",
  "clayton-2022": "2026-11-12",
  "spielmans-2024": "2026-11-12",
  "toledo-2026": "2026-11-12",
  "konig-2018": "2026-11-12",
  "zdzieblik-2021-bone": "2026-11-12",
  "cuneo-2010": "2026-11-12",
  "kuhlman-2026": "2026-11-12",
  "duangjai-2025": "2026-11-12",
  "forslund-2026": "2026-11-12",
  "elkind-hirsch-2022": "2026-11-12",
  "chen-2025": "2026-11-12",
  "bishop-1992": "2026-11-12",
  "najafi-2026": "2026-11-12",
  "mokhtar-2026": "2026-11-12",
  "mateescu-2026-ghk": "2026-11-12",
  "pickart-2018": "2026-11-12",
  "wang-2017": "2026-11-12",
  "knop-2023": "2026-11-12",
  "buckley-2018": "2026-11-12",
  "dubey-2021": "2026-11-12",
  "tran-2022": "2026-11-12",
  "iwai-2005": "2026-11-12",
  "yamamoto-2016": "2026-11-12",
  "skov-2019": "2026-11-12",
  "deameh-2026": "2026-11-12",
  "la-vignera-2026": "2026-11-12",
  "gregoric-2025": "2026-11-12",
  "yeung-2026": "2026-11-12",
  "molinoff-2003": "2026-11-12",
  "safarinejad-2008": "2026-11-12",
  "able-2025": "2026-11-12",
  "cowart-2025": "2026-11-12",
  "atluri-2014": "2026-11-12",
  "luthra-2019": "2026-11-12",
  "akram-2026": "2026-11-12",
  "brenner-2024": "2026-11-12",
  "sabra-2024": "2026-11-12",
  "bioletto-2022": "2026-11-12",
  "hoilat-2022": "2026-11-12",
  "chiang-2025": "2026-11-12",
  "dale-2019": "2026-11-12",
  "laatikainen-2020": "2026-11-12",
  "sikiric-2012": "2026-11-12",
  "bajramagic-2024": "2026-11-12",
  "evans-2021": "2026-11-09",
  "hwang-2026": "2026-11-09",
  "kawasaki-2000": "2026-11-09",
  "zhu-2010": "2026-11-09",
  "oliveira-2020": "2026-11-09",
  "eckert-2024": "2026-11-09",
  "chataigner-2026": "2026-11-09",
  "mjos-2019": "2026-11-09",
  "cordeiro-2020": "2026-11-09",
  "oddoux-2022": "2026-11-09",
  "wolf-2011": "2026-11-10",
  "cordero-1999": "2026-11-10",
  "zhukova-2018": "2026-11-10",
  "wang-2018": "2026-11-10",
  "wu-2025": "2026-11-10",
  "wu-2013": "2026-11-10",
  "ke-2022": "2026-11-10",
  "soeroto-2023": "2026-11-10",
  "dinetz-2024": "2026-11-10",
  "cao-2024": "2026-11-10",
  "tian-2025": "2026-11-10",
  "chen-2022": "2026-11-10",
  "peng-2020": "2026-11-10",
  "kim-2012": "2026-11-10",
  "bassila-2026": "2026-11-10",
  "ueno-2020": "2026-11-10",
  "kobayashi-2016": "2026-11-10",
  "moiz-2026": "2026-11-10",
  "bischof-2024": "2026-11-10",
  "khatri-2021": "2026-11-10",
  "jendricke-2019": "2026-11-10",
  "zdzieblik-2021": "2026-11-10",
  "jacinto-2022": "2026-11-10",
  "nass-2008": "2026-11-10",
  "dominikowski-2026": "2026-11-10",
  "villegas-meza-2026": "2026-11-10",
  "li-2026": "2026-11-10",
  "wu-2018": "2026-11-10",
  "jia-2015": "2026-11-10",
  "ershler-2007": "2026-11-10",
  "adrian-2019": "2026-11-10",
  "russo-2024": "2026-11-10",
  "badran-2026": "2026-11-10",
  "beck-2014": "2026-11-10",
  "adunsky-2011": "2026-11-10",
  "liu-2008": "2026-11-10",
  "liu-2007": "2026-11-10",
  "coutinho-2026": "2026-11-10",
  "teichman-2006": "2026-11-10",
  "ionescu-2006": "2026-11-10",
  "gobburu-1999": "2026-11-10",
  "wilding-2021": "2026-11-10",
  "jastreboff-2022": "2026-11-10",
  "lincoff-2023": "2026-11-10",
  "wilding-2022": "2026-11-10",
  "qi-2026": "2026-11-10",
  "laverde-2026": "2026-11-10",
  "nong-2026": "2026-11-10",
  "poolton-2026": "2026-11-10",
  "tham-2026": "2026-11-10",
  "mateescu-2026": "2026-11-10",
  "zozulia-2008": "2026-11-10",
  "medvedev-2014": "2026-11-10",
  "medvedev-2015": "2026-11-10",
  "dalmasso-2008": "2026-11-10",
  "viennois-2016": "2026-11-10",
  "bohm-2019": "2026-11-10",
  "delcourt-2023": "2026-11-12",
  "esposito-2012": "2026-11-12",
  "ho-2012": "2026-11-12",
  "rahaman-2024": "2026-11-12",
  "ruff-2010": "2026-11-12",
  "guarnera-2010": "2026-11-12",
  "sosne-2015": "2026-11-12",
  "sosne-2022": "2026-11-12",
  "kruoch-2025": "2026-11-12",
  "gusev-2018": "2026-11-13",
  "gusev-1997": "2026-11-13",
  "gusev-2005": "2026-11-13",
  "amelin-2011": "2026-11-13",
  "wells-2024": "2026-11-13",
  "ziganshina-2023": "2026-11-13",
  "cui-2019": "2026-11-13",
  "vester-2021": "2026-11-13",
  "qin-2013": "2026-11-13",
  "cicero-2013": "2026-11-13",
  "chanson-rolle-2015": "2026-11-13",
  "kennedy-2024": "2026-11-13",
  "kanbay-2023": "2026-11-13",
  "priyadarshini-2026": "2026-11-13",
  "amaral-2025": "2026-11-13",
  "dasrilsyah-2023": "2026-11-13",
  "strakhov-2020": "2026-11-13",
  "dorofeev-2025": "2026-11-13",
  "malakhova-2024": "2026-11-13",
  "polunin-2000": "2026-11-13",
  "khavinson-2003": "2026-11-13",
  "korkushko-2006": "2026-11-13",
  "reynolds-2021": "2026-11-13",
  "karaa-2023": "2026-11-13",
  "thompson-2024": "2026-11-13",
  "mavrych-2026": "2026-11-13",
  "krimpenfort-2017": "2026-11-13",
  "kerr-2023": "2026-11-15",
  "weijzen-2023": "2026-11-15",
};

/** Product grade id → date the grade was first published. */
export const GRADE_ADDED: Record<string, string> = {
  "momentous": "2026-11-13",
  "puori": "2026-11-13",
  "transparent-labs": "2026-11-13",
  "bubs": "2026-11-13",
  "thorne": "2026-11-13",
  "bulksupplements": "2026-11-13",
  "codeage": "2026-11-13",
  "vital-proteins": "2026-11-13",
  "garden-of-life": "2026-11-13",
  "naked-nutrition": "2026-11-13",
  "sports-research": "2026-11-13",
  "great-lakes": "2026-11-13",
  "orgain": "2026-11-13",
  "further-food": "2026-11-13",
  "ancient-nutrition": "2026-11-13",
  "bpn-collagen": "2026-11-15",
  "gnarly-collagen-pro": "2026-11-15",
  "bulletproof-collagen": "2026-11-15",
  "purblack-muscle": "2026-11-13",
  "purblack-joint": "2026-11-13",
  "purblack-vascular": "2026-11-13",
  "purblack-vision": "2026-11-13",
  "purblack-brain-am": "2026-11-13",
  "purblack-brain-pm": "2026-11-13",
  "purblack-multivitamin": "2026-11-13",
  "purblack-immune": "2026-11-13",
  "life-extension-milk-peptides": "2026-11-13",
  "metagenics-vasotensin": "2026-11-13",
  "natural-factors-peptace": "2026-11-14",
  "biotics-de-stress": "2026-11-14",
  "pure-sereniten-plus": "2026-11-14",
  "dfs-pro-formance-peptides": "2026-11-15",
  "dfh-htn-supreme": "2026-11-15",
  "the-ordinary-argireline": "2026-11-13",
  "the-ordinary-multi-peptide-copper": "2026-11-13",
  "the-ordinary-multi-peptide-ha": "2026-11-13",
  "the-ordinary-hair-density": "2026-11-13",
  "niod-cais3": "2026-11-13",
  "drunk-elephant-protini": "2026-11-13",
  "olay-micro-sculpting": "2026-11-13",
  "vegamour-gro": "2026-11-15",
  "rhode-glazing-fluid": "2026-11-18",
  "medik8-liquid-peptides": "2026-11-18",
  "ptr-peptide-skinjection": "2026-11-18",
  "naturium-multi-peptide": "2026-11-18",
};

/** Page path → date it was first published. Every GUIDES path, plus the pages in EXTRA_PAGES. */
export const PAGE_PUBLISHED: Record<string, string> = {
  "/peptides/best-peptides-for-skin": "2026-11-11",
  "/peptides/peptides-for-hair-growth": "2026-11-11",
  "/peptides/peptides-for-joint-pain": "2026-11-11",
  "/peptides/peptides-for-muscle-growth": "2026-11-10",
  "/peptides/for-weight-loss": "2026-11-10",
  "/peptides/peptides-for-sleep": "2026-11-11",
  "/peptides/nootropic-peptides": "2026-11-13",
  "/peptides/peptides-for-immune-system": "2026-11-13",
  "/peptides/peptides-for-blood-pressure": "2026-11-13",
  "/peptides/peptides-for-eye-health": "2026-11-13",
  "/peptides/peptides-for-anti-aging": "2026-11-13",
  "/peptides/peptides-for-gut-health": "2026-11-12",
  "/peptides/peptides-for-women": "2026-11-12",
  "/peptides/peptides-for-athletes": "2026-11-14",
  "/peptides/peptides-for-men": "2026-11-12",
  "/peptides/oral-peptides": "2026-11-12",
  "/peptides/bpc-157": "2026-11-10",
  "/peptides/ghk-cu": "2026-11-12",
  "/peptides/kpv": "2026-11-10",
  "/peptides/tb-500": "2026-11-12",
  "/peptides/selank": "2026-11-10",
  "/peptides/ipamorelin": "2026-11-10",
  "/peptides/cjc-1295": "2026-11-10",
  "/peptides/most-popular-peptides": "2026-11-14",
  "/peptides/best-collagen-peptides": "2026-11-11",
  "/peptides/what-do-peptides-do": "2026-11-10",
  "/peptides/how-peptides-work": "2026-11-09",
  "/peptides/are-peptides-steroids": "2026-11-10",
  "/peptides/collagen-peptides": "2026-11-10",
  "/peptides/collagen-peptides-benefits": "2026-11-10",
  "/peptides/collagen-peptides-side-effects": "2026-11-10",
  "/peptides/marine-vs-bovine-collagen": "2026-11-10",
  "/peptides/oral-marine-peptides": "2026-11-09",
  "/peptides/how-to-read-a-peptide-coa": "2026-11-10",
  "/peptides/legal-status": "2026-11-09",
  "/products": "2026-11-15",
  "/peptides/by-goal": "2026-11-12",
  "/peptides/a-z": "2026-11-12",
  "/grading-rubric": "2026-11-10",
};

/** Pages outside GUIDES that are listed when they launch. */
export const EXTRA_PAGES: Record<string, string> = {
  "/products": "Product finder",
  "/peptides/by-goal": "Peptides by goal",
  "/peptides/a-z": "Peptides A–Z",
  "/grading-rubric": "Product grading rubric",
};

const ISO = /^\d{4}-\d{2}-\d{2}$/;
function check(name: string, map: Record<string, string>, ids: string[]) {
  const want = new Set(ids);
  for (const id of ids) if (!map[id]) throw new Error(`lib/updates.ts: ${name} has no date for "${id}" (add it with today's date)`);
  for (const [id, date] of Object.entries(map)) {
    if (!want.has(id)) throw new Error(`lib/updates.ts: ${name} lists "${id}", which no longer exists`);
    if (!ISO.test(date)) throw new Error(`lib/updates.ts: ${name}["${id}"] is not a YYYY-MM-DD date`);
  }
}
check("STUDY_ADDED", STUDY_ADDED, STUDIES.map((s) => s.id));
check("GRADE_ADDED", GRADE_ADDED, ALL_GRADES.map((g) => g.id));
check("PAGE_PUBLISHED", PAGE_PUBLISHED, [...GUIDES.map((g) => g.path), ...Object.keys(EXTRA_PAGES)]);

export type UpdateKind = "page" | "study" | "grade" | "review" | "legal" | "correction";

export const KIND_HEADING: Record<UpdateKind, string> = {
  page: "New pages",
  study: "New study summaries",
  grade: "Products graded",
  review: "Evidence pages reviewed",
  legal: "Legal status checked",
  correction: "Corrections",
};

export type Update = { date: string; kind: UpdateKind; title: string; href: string; note?: string };

const firstAuthor = (authors: string) => authors.split(",")[0].trim().split(/\s+/)[0];
const clip = (s: string, n = 180) => (s.length > n ? s.slice(0, s.lastIndexOf(" ", n)) + "…" : s);

function all(): Update[] {
  const out: Update[] = [];
  for (const [path, date] of Object.entries(PAGE_PUBLISHED)) {
    const g = GUIDES.find((x) => x.path === path);
    out.push({ date, kind: "page", title: g ? g.title : EXTRA_PAGES[path], href: path, note: g?.blurb });
  }
  for (const s of STUDIES) {
    out.push({
      date: STUDY_ADDED[s.id],
      kind: "study",
      title: `${firstAuthor(s.authors)} ${s.year}: ${s.title}`,
      href: `/science/${s.id}`,
      note: s.peptides.map((p) => PEPTIDE_LABEL[p]).join(", "),
    });
  }
  for (const g of ALL_GRADES) {
    const r = result(g);
    out.push({
      date: GRADE_ADDED[g.id],
      kind: "grade",
      title: `${g.brand} ${g.product}`,
      href: `${SHEETS_PAGE[g.group].path}#grade-${g.id}`,
      note: `${r.total}/100, ${r.band}`,
    });
  }
  for (const t of TOPIC_SLUGS) {
    out.push({ date: TOPICS[t].reviewedOn, kind: "review", title: TOPICS[t].title, href: `/science/topics/${t}` });
  }
  out.push({ date: LEGAL_REVIEWED, kind: "legal", title: "Legal status of peptides", href: "/peptides/legal-status" });
  for (const c of CORRECTIONS) out.push({ date: c.date, kind: "correction", title: c.page, href: "/corrections", note: clip(c.now) });
  return out;
}

const ORDER: UpdateKind[] = ["page", "grade", "study", "review", "legal", "correction"];

export type UpdateDay = { date: string; groups: { kind: UpdateKind; items: Update[] }[] };

/** Every update, grouped by day (newest first) and by kind within a day. */
export const UPDATE_DAYS: UpdateDay[] = (() => {
  const byDate = new Map<string, Update[]>();
  for (const u of all()) byDate.set(u.date, [...(byDate.get(u.date) ?? []), u]);
  return [...byDate.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, items]) => ({
      date,
      groups: ORDER.map((kind) => ({ kind, items: items.filter((i) => i.kind === kind) })).filter((g) => g.items.length),
    }));
})();

export const LATEST_UPDATE = UPDATE_DAYS[0].date;

/** One-line count for a day or a span, e.g. "2 new pages, 9 studies, 1 correction". */
export function summarise(items: Update[]): string {
  const n = (k: UpdateKind) => items.filter((i) => i.kind === k).length;
  const parts: [number, string, string][] = [
    [n("page"), "new page", "new pages"],
    [n("grade"), "product graded", "products graded"],
    [n("study"), "study summary", "study summaries"],
    [n("review"), "evidence page reviewed", "evidence pages reviewed"],
    [n("legal"), "legal status check", "legal status checks"],
    [n("correction"), "correction", "corrections"],
  ];
  return parts
    .filter(([c]) => c > 0)
    .map(([c, one, many]) => `${c} ${c === 1 ? one : many}`)
    .join(", ");
}

/** Updates in the `days` days up to and including the latest update. */
export function recent(days: number): Update[] {
  const end = new Date(LATEST_UPDATE + "T00:00:00Z").getTime();
  const start = end - (days - 1) * 86400000;
  return UPDATE_DAYS.filter((d) => new Date(d.date + "T00:00:00Z").getTime() >= start).flatMap((d) => d.groups.flatMap((g) => g.items));
}
