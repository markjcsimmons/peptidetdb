import { GUIDES, KIND_LABEL as GUIDE_KIND } from "@/lib/guides";
import { TOPICS, TOPIC_SLUGS } from "@/lib/topics";
import { STUDIES, PEPTIDE_LABEL, TOPIC_LABEL, KIND_LABEL as STUDY_KIND, type PeptideId } from "@/lib/studies";
import { ALL_GRADES, SHEETS_PAGE, result } from "@/lib/grades";
import { PEPTIDE_STATUS, STATUS_LABEL } from "@/lib/peptide-status";
import { GLOSSARY } from "@/lib/glossary";
import { FOOTER_LINKS } from "@/lib/site";

/**
 * The site-search index, served as static JSON at /search-index.json and fetched by the search dialog the first
 * time it opens (components/site-search.tsx). Everything is built from the same data files as the pages, so it never
 * says anything a page does not. Groups: page, peptide, product, study, term.
 */
export type SearchGroup = "page" | "peptide" | "product" | "study" | "term";

export type SearchEntry = {
  /** Group. */
  g: SearchGroup;
  /** Title shown. */
  t: string;
  /** URL path (with hash or query where needed). */
  u: string;
  /** Short label shown next to the title, e.g. "Peptide profile". */
  k: string;
  /** One line shown under the title. */
  d?: string;
  /** Extra text matched but not shown (aliases, peptide names, rating subjects). */
  s?: string;
};

const clip = (s: string, n = 140) => (s.length > n ? s.slice(0, s.lastIndexOf(" ", n)) + "…" : s);

const SITE_PAGES: SearchEntry[] = [
  { g: "page", t: "Home", u: "/", k: "Page", d: "Peptides, explained by the evidence." },
  { g: "page", t: "What are peptides?", u: "/peptides", k: "Pillar guide", s: "basics introduction amino acids" },
  {
    g: "page",
    t: "Peptides by goal",
    u: "/peptides/by-goal",
    k: "Hub",
    d: "Every goal with its best and least-supported rating.",
    s: "goals benefits",
  },
  {
    g: "page",
    t: "Peptides A–Z",
    u: "/peptides/a-z",
    k: "Hub",
    d: "Every peptide we have studies for, with US status.",
    s: "a-z az index list all",
  },
  {
    g: "page",
    t: "Product finder",
    u: "/products",
    k: "Products",
    d: "Every graded product, filtered by benefit, form and testing.",
    s: "products buy brands supplements graded grades shop",
  },
  {
    g: "page",
    t: "Peptide capsules & tablets",
    u: "/products?type=capsules",
    k: "Products",
    d: "Graded capsules and tablets of peptides other than collagen: milk, fish, fava bean and others.",
    s: "pills oral peptide supplements bioactive lactium bonito non-collagen",
  },
  {
    g: "page",
    t: "Study summaries",
    u: "/science",
    k: "Studies",
    d: "Plain-language summaries of every study we have read.",
    s: "studies research papers trials explorer",
  },
  {
    g: "page",
    t: "Legal status of peptides",
    u: "/peptides/legal-status",
    k: "Legal",
    d: "FDA, compounding and the 2026 changes, with dated sources.",
    s: "legal law fda illegal banned compounding 503a category 2 hhs",
  },
  ...FOOTER_LINKS.map((l): SearchEntry => ({ g: "page", t: l.label, u: l.href, k: "About this site" })),
];

/**
 * Words people search with that a page's title and blurb do not contain. Each must be a subject the page itself
 * covers (checked by reading the page when added); the build fails if a path is not a guide.
 */
const ALIASES: Record<string, string> = {
  "/peptides/best-peptides-for-skin": "wrinkles acne anti-wrinkle face serum cream",
  "/peptides/peptides-for-hair-growth": "hair loss alopecia balding scalp",
  "/peptides/peptides-for-joint-pain": "arthritis osteoarthritis knee tendon tendons ligament",
  "/peptides/peptides-for-muscle-growth": "bodybuilding strength gains lean mass",
  "/peptides/for-weight-loss": "ozempic wegovy obesity fat loss glp1 glp-1",
  "/peptides/peptides-for-sleep": "insomnia",
  "/peptides/nootropic-peptides": "memory focus brain anxiety stress cognition",
  "/peptides/peptides-for-blood-pressure": "hypertension heart",
  "/peptides/peptides-for-eye-health": "eyes vision dry eye glaucoma",
  "/peptides/peptides-for-anti-aging": "longevity ageing aging lifespan",
  "/peptides/peptides-for-gut-health": "digestion bloating ibs constipation",
  "/peptides/peptides-for-women": "menopause libido pcos bone",
  "/peptides/peptides-for-athletes": "wada anti-doping drug test sport tested",
  "/peptides/peptides-for-men": "testosterone erectile fertility",
  "/peptides/most-popular-peptides": "popular top trending mounjaro zepbound",
  "/peptides/are-peptides-steroids": "steroids anabolic",
  "/peptides/mots-c": "motsc mitochondrial peptide mitochondria insulin resistance",
  "/peptides/how-to-read-a-peptide-coa": "coa certificate of analysis lab test purity",
};

function guides(): SearchEntry[] {
  for (const path of Object.keys(ALIASES)) {
    if (!GUIDES.some((g) => g.path === path))
      throw new Error(`search-index: alias for ${path}, which is not in GUIDES`);
  }
  return GUIDES.map((g) => ({
    g: "page",
    t: g.title,
    u: g.path,
    k: GUIDE_KIND[g.kind],
    d: g.blurb,
    s: `${g.peptides.map((p) => PEPTIDE_LABEL[p]).join(" ")} ${ALIASES[g.path] ?? ""}`.trim(),
  }));
}

function topics(): SearchEntry[] {
  return TOPIC_SLUGS.map((slug) => {
    const t = TOPICS[slug];
    return {
      g: "page",
      t: t.title,
      u: `/science/topics/${slug}`,
      k: "Evidence page",
      d: `${t.ratings.length} ${t.ratings.length === 1 ? "rating" : "ratings"}, with the studies behind each.`,
      s: `${TOPIC_LABEL[slug]} ${t.ratings.map((r) => r.subject).join(" ")}`,
    };
  });
}

function peptides(): SearchEntry[] {
  const counts = new Map<PeptideId, number>();
  for (const s of STUDIES) for (const p of s.peptides) counts.set(p, (counts.get(p) ?? 0) + 1);
  return [...counts.entries()].map(([id, n]) => {
    const profile = GUIDES.find((g) => g.kind === "profile" && g.peptides.length === 1 && g.peptides[0] === id);
    const status = PEPTIDE_STATUS[id];
    return {
      g: "peptide",
      t: PEPTIDE_LABEL[id],
      u: profile ? profile.path : `/science?peptide=${id}#explore`,
      k: profile ? "Peptide profile" : "Peptide",
      d: `${n} ${n === 1 ? "study" : "studies"} · US: ${STATUS_LABEL[status.kind]}`,
      s: id,
    };
  });
}

function products(): SearchEntry[] {
  return ALL_GRADES.map((g) => {
    const r = result(g);
    return {
      g: "product",
      t: `${g.brand} ${g.product}`,
      u: `${SHEETS_PAGE[g.group].path}#grade-${g.id}`,
      k: "Graded product",
      d: `${g.form} · ${r.total}/100, ${r.band}`,
    };
  });
}

function studies(): SearchEntry[] {
  return STUDIES.map((s) => {
    const first = s.authors.split(",")[0].trim().split(/\s+/)[0];
    return {
      g: "study",
      t: `${first} ${s.year}: ${s.title}`,
      u: `/science/${s.id}`,
      k: STUDY_KIND[s.kind],
      d: clip(s.finding),
      s: `${s.authors} ${s.journal} ${s.peptides.map((p) => PEPTIDE_LABEL[p]).join(" ")} ${s.topics.map((t) => TOPIC_LABEL[t]).join(" ")} ${s.pmid}`,
    };
  });
}

function terms(): SearchEntry[] {
  return GLOSSARY.map((t) => ({ g: "term", t: t.term, u: `/glossary#${t.id}`, k: "Glossary", d: clip(t.definition) }));
}

export function buildSearchIndex(): SearchEntry[] {
  const all = [...SITE_PAGES, ...guides(), ...topics(), ...peptides(), ...products(), ...studies(), ...terms()];
  // One entry per URL (a hub can appear both as a site page and a guide); the first, hand-written one wins.
  const seen = new Set<string>();
  return all.filter((e) => (seen.has(e.u) ? false : (seen.add(e.u), true)));
}
