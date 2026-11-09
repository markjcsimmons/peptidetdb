/**
 * Every study the site cites, in one place. The /science hub, topic pages and study pages all
 * render from this list, and scripts/audit-studies.ts checks each entry's identifiers against
 * PubMed.
 *
 * Rules for an entry (see /science/methodology):
 *  - `finding` and `caveat` are written from the paper's own abstract, in our words, never
 *    pasted. When an entry changes, read the abstract again.
 *  - Identifiers come from `npm run study:fetch -- <pmid>`, never from memory or a reference list.
 *  - Anything an article asserts that the abstract does not support goes in `unverified`.
 *  - `funding` is what the record or abstract states. If nothing is stated, leave it out; the page
 *    then says so.
 */

export type StudyKind =
  | "meta-analysis" // pooled analysis of trials
  | "systematic-review"
  | "human-controlled" // randomised or otherwise with a comparison group
  | "human-uncontrolled" // pilot, case series or chart review: no comparison group
  | "review" // narrative or scoping review: summarises others' work, generates no data
  | "animal"
  | "in-vitro";

export type Topic = "skin" | "muscle" | "joints" | "safety";

export type PeptideId =
  | "collagen"
  | "bpc-157"
  | "tb-500"
  | "ghk-cu"
  | "cjc-1295"
  | "ipamorelin"
  | "mk-677"
  | "sermorelin"
  | "tesamorelin"
  | "mots-c";

export type Delivery = "oral" | "injectable" | "topical";

export type Study = {
  /** Stable id, first-author-year; used in URLs and <PaperLink>. */
  id: string;
  authors: string;
  year: number;
  title: string;
  journal: string;
  /** Volume(issue):pages as printed in reference lists. */
  ref: string;
  pmid: string;
  pmcid?: string;
  doi?: string;
  kind: StudyKind;
  topics: Topic[];
  peptides: PeptideId[];
  /** Route studied. Leave empty for reviews that span several routes. */
  delivery: Delivery[];
  /** Who was studied and how many. */
  population?: string;
  design?: string;
  dose?: string;
  duration?: string;
  /** What the paper found, in our words, from its abstract. */
  finding: string;
  /** What the finding does not show: design limits, subgroup restrictions, context. */
  caveat: string;
  /** Funding and conflict-of-interest statements as stated by the record. Omit if none. */
  funding?: string;
  /** Claims we have seen made about this paper that its abstract does not support. */
  unverified?: string;
  /** Date the entry was last checked against the abstract. */
  verifiedOn: string;
};

export const KIND_LABEL: Record<StudyKind, string> = {
  "meta-analysis": "Meta-analysis",
  "systematic-review": "Systematic review",
  "human-controlled": "Human trial (controlled)",
  "human-uncontrolled": "Human study (no control group)",
  review: "Review",
  animal: "Animal study",
  "in-vitro": "Cell / lab study",
};

/** One-line plain-language reading of each design, shown beside the badge. */
export const KIND_HINT: Record<StudyKind, string> = {
  "meta-analysis": "Pools the results of several trials. Only as reliable as the trials it includes.",
  "systematic-review": "Searches for and appraises all the studies on a question. Does not itself test anything.",
  "human-controlled": "Compares people who got the treatment with people who did not.",
  "human-uncontrolled": "No comparison group, so it cannot separate the treatment from placebo or natural recovery.",
  review: "Summarises other people's work. Generates no new data.",
  animal: "Done in animals. Results often do not carry over to people.",
  "in-vitro": "Done on cells or tissue in a lab. A mechanism hint, not a clinical result.",
};

export const TOPIC_LABEL: Record<Topic, string> = {
  skin: "Skin & anti-aging",
  muscle: "Muscle & strength",
  joints: "Joints & tendons",
  safety: "Safety & regulation",
};

export const PEPTIDE_LABEL: Record<PeptideId, string> = {
  collagen: "Collagen peptides",
  "bpc-157": "BPC-157",
  "tb-500": "TB-500 / thymosin beta-4",
  "ghk-cu": "GHK-Cu (copper peptide)",
  "cjc-1295": "CJC-1295",
  ipamorelin: "Ipamorelin",
  "mk-677": "MK-677 (ibutamoren)",
  sermorelin: "Sermorelin",
  tesamorelin: "Tesamorelin",
  "mots-c": "MOTS-c",
};

export const DELIVERY_LABEL: Record<Delivery, string> = {
  oral: "Oral",
  injectable: "Injectable",
  topical: "Topical",
};

const NO_STATEMENT = undefined;

export const STUDIES: Study[] = [
  // ── Oral collagen peptides ─────────────────────────────────────────────────
  {
    id: "zdzieblik-2015",
    authors: "Zdzieblik D, Oesser S, Baumstark MW, Gollhofer A, König D",
    year: 2015,
    title:
      "Collagen peptide supplementation in combination with resistance training improves body composition and increases muscle strength in elderly sarcopenic men: a randomised controlled trial.",
    journal: "Br J Nutr",
    ref: "114(8):1237–1245",
    pmid: "26353786",
    pmcid: "PMC4594048",
    doi: "10.1017/S0007114515002810",
    kind: "human-controlled",
    topics: ["muscle"],
    peptides: ["collagen"],
    delivery: ["oral"],
    population: "53 men, average age 72, with sarcopenia (age-related muscle loss)",
    design: "Randomised, double-blind, placebo-controlled",
    dose: "15 g/day collagen peptides (placebo: silica)",
    duration: "12 weeks, with supervised resistance training three times a week",
    finding:
      "Everyone gained muscle and strength from the training. The collagen group gained more: fat-free mass rose 4.2 kg versus 2.9 kg on placebo, quadriceps strength rose 16.5 Nm versus 7.3 Nm, and fat mass fell 5.4 kg versus 3.5 kg (all P < 0.05).",
    caveat:
      "Everyone trained, so the trial cannot say what collagen peptides do without exercise. It is a single trial in older men with sarcopenia, so it does not show the same effect in other groups. The abstract does not state a funder.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "asserin-2015",
    authors: "Asserin J, Lati E, Shioya T, Prawitt J",
    year: 2015,
    title:
      "The effect of oral collagen peptide supplementation on skin moisture and the dermal collagen network: evidence from an ex vivo model and randomized, placebo-controlled clinical trials.",
    journal: "J Cosmet Dermatol",
    ref: "14(4):291–301",
    pmid: "26362110",
    doi: "10.1111/jocd.12174",
    kind: "human-controlled",
    topics: ["skin"],
    peptides: ["collagen"],
    delivery: ["oral"],
    population: "Two placebo-controlled trials plus a lab experiment on human skin samples",
    design: "Two randomised, placebo-controlled trials and an ex vivo skin-explant model",
    finding:
      "Daily oral collagen peptides raised skin hydration after 8 weeks. Collagen density in the dermis rose and fragmentation of the collagen network fell from week 4, and both effects were still present at 12 weeks. In skin samples in the lab, collagen peptides increased production of collagen and glycosaminoglycans.",
    caveat:
      "The abstract gives no participant numbers, doses or funder, so the trials cannot be weighed on size. The skin-sample result suggests a mechanism; it is not a clinical outcome.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "de-miranda-2021",
    authors: "de Miranda RB, Weimer P, Rossi RC",
    year: 2021,
    title: "Effects of hydrolyzed collagen supplementation on skin aging: a systematic review and meta-analysis.",
    journal: "Int J Dermatol",
    ref: "60(12):1449–1461",
    pmid: "33742704",
    doi: "10.1111/ijd.15518",
    kind: "meta-analysis",
    topics: ["skin"],
    peptides: ["collagen"],
    delivery: ["oral"],
    population: "19 randomised, double-blind, controlled trials; 1,125 participants aged 20–70 (95% women)",
    design: "Systematic review and meta-analysis of randomised trials",
    finding:
      "Pooled results favoured hydrolysed collagen over placebo for skin hydration, elasticity and wrinkles. The authors conclude that taking it for about 90 days is effective at reducing signs of skin aging.",
    caveat:
      "Nearly all participants were women. The abstract reports no effect sizes and says nothing about the quality of the included trials, so it does not show how large or how reliable the benefit is.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "pu-2023",
    authors: "Pu SY, Huang YL, Pu CM, Kang YN, Hoang KD, Chen KH, Chen C",
    year: 2023,
    title: "Effects of Oral Collagen for Skin Anti-Aging: A Systematic Review and Meta-Analysis.",
    journal: "Nutrients",
    ref: "15(9):2080",
    pmid: "37432180",
    pmcid: "PMC10180699",
    doi: "10.3390/nu15092080",
    kind: "meta-analysis",
    topics: ["skin"],
    peptides: ["collagen"],
    delivery: ["oral"],
    population: "26 randomised controlled trials; 1,721 participants",
    design: "Systematic review and meta-analysis of randomised trials",
    finding:
      "Hydrolysed collagen improved skin hydration and elasticity compared with placebo (both p < 0.00001). The size of the hydration effect varied with the source of the collagen and how long it was taken; elasticity did not differ by source.",
    caveat:
      "The authors found several biases in the trials they included and say larger confirmatory trials are needed, so the direction is consistent but the size of the effect is uncertain.",
    funding:
      "Wan Fang Hospital is listed as a funder. The authors declare no conflict of interest and say the funders had no role in the design, analysis or publication.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "garcia-coronado-2019",
    authors: "García-Coronado JM, Martínez-Olvera L, Elizondo-Omaña RE, Acosta-Olivo CA, Vilchez-Cavazos F, Simental-Mendía LE, Simental-Mendía M",
    year: 2019,
    title: "Effect of collagen supplementation on osteoarthritis symptoms: a meta-analysis of randomized placebo-controlled trials.",
    journal: "Int Orthop",
    ref: "43(3):531–538",
    pmid: "30368550",
    doi: "10.1007/s00264-018-4211-5",
    kind: "meta-analysis",
    topics: ["joints"],
    peptides: ["collagen"],
    delivery: ["oral"],
    population: "Randomised placebo-controlled trials of oral collagen in osteoarthritis (number of trials not given in the abstract)",
    design: "Meta-analysis, random-effects model",
    finding:
      "Collagen lowered the total WOMAC osteoarthritis score (weighted mean difference −8.00; 95% CI −13.04 to −2.95) and the pain visual analogue scale (−16.57; 95% CI −26.24 to −6.89) compared with placebo. Within WOMAC, the stiffness subscore improved.",
    caveat:
      "The WOMAC pain and physical-function subscores did not differ significantly from placebo, so the overall result is mixed. The abstract does not say how many trials were pooled or which collagen products were used.",
    verifiedOn: "2026-11-09",
  },

  // ── BPC-157 and other injectable / research peptides ───────────────────────
  {
    id: "vasireddi-2025",
    authors: "Vasireddi N, Hahamyan H, Salata MJ, Karns M, Calcei JG, Voos JE, Apostolakos JM",
    year: 2025,
    title: "Emerging Use of BPC-157 in Orthopaedic Sports Medicine: A Systematic Review.",
    journal: "HSS J",
    ref: "21(4):485–495",
    pmid: "40756949",
    pmcid: "PMC12313605",
    doi: "10.1177/15563316251355551",
    kind: "systematic-review",
    topics: ["joints", "safety"],
    peptides: ["bpc-157"],
    delivery: [],
    population: "36 studies: 35 preclinical (animal) and 1 clinical, from 1993 to June 2024",
    design: "Systematic review (PubMed, Cochrane, Embase)",
    finding:
      "Nearly all the evidence on BPC-157 is from animals. Those studies suggest faster healing of muscle, tendon, ligament and bone injuries. The one clinical report was a retrospective study of knee injections in which 7 of 12 patients reported relief lasting more than 6 months. No clinical safety data were found.",
    caveat:
      "Everything reviewed was low-level evidence (level IV and V: case series, expert opinion and preclinical work), so the review cannot show that BPC-157 works in people. The authors warn that adverse effects are possible because of unregulated manufacturing, contamination and unknown clinical safety.",
    funding:
      "Some authors disclose relationships with orthopaedic device companies (Stryker, Smith & Nephew, Arthrex, Mitek). The other authors declare none.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "mcguire-2025",
    authors: "McGuire FP, Martinez R, Lenz A, Skinner L, Cushman DM",
    year: 2025,
    title: "Regeneration or Risk? A Narrative Review of BPC-157 for Musculoskeletal Healing.",
    journal: "Curr Rev Musculoskelet Med",
    ref: "18(12):611–619",
    pmid: "40789979",
    pmcid: "PMC12446177",
    doi: "10.1007/s12178-025-09990-7",
    kind: "review",
    topics: ["joints", "safety"],
    peptides: ["bpc-157"],
    delivery: [],
    population: "Preclinical and clinical literature on BPC-157 in musculoskeletal healing",
    design: "Scoping / narrative review",
    finding:
      "BPC-157 shows broad regenerative effects in animal models, acting on blood-vessel growth, fibroblast activity and inflammation signalling. Only three small human pilot studies exist (knee pain, interstitial cystitis, and intravenous safety), with no adverse effects reported and no large trials. The authors say BPC-157 should be treated as investigational and used with caution until well-designed trials are done.",
    caveat:
      "A review generates no data of its own. 'No adverse effects' comes from very small pilot studies and cannot establish safety.",
    funding: "The authors declare no competing interests.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "lee-padgett-2021",
    authors: "Lee E, Padgett B",
    year: 2021,
    title: "Intra-Articular Injection of BPC 157 for Multiple Types of Knee Pain.",
    journal: "Altern Ther Health Med",
    ref: "27(4):8–13",
    pmid: "34324435",
    kind: "human-uncontrolled",
    topics: ["joints"],
    peptides: ["bpc-157", "tb-500"],
    delivery: ["injectable"],
    population: "17 patients with knee pain at one Florida clinic; 16 reached by phone",
    design: "Retrospective chart review with a follow-up phone survey",
    finding:
      "Of 16 patients contacted, 14 (87.5%) said their knee pain eased after an injection into the knee of BPC-157 alone (12 patients) or BPC-157 with thymosin beta-4 (4 patients).",
    caveat:
      "No control group, no validated outcome measures, patients rated their own pain by phone, follow-up ranged from 6 to 12 months, and it comes from a single clinic. It cannot separate the peptide from placebo, natural recovery or other treatment, so it cannot support a recommendation.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "lee-burgess-2025",
    authors: "Lee E, Burgess K",
    year: 2025,
    title: "Safety of Intravenous Infusion of BPC157 in Humans: A Pilot Study.",
    journal: "Altern Ther Health Med",
    ref: "31(5):20–24",
    pmid: "40131143",
    kind: "human-uncontrolled",
    topics: ["safety"],
    peptides: ["bpc-157"],
    delivery: ["injectable"],
    population: "2 adults (a 58-year-old man and a 68-year-old woman) at a private clinic in Florida, both of whom had received intravenous BPC-157 before",
    design: "Small open pilot study, IRB-approved",
    dose: "10 mg on day 1 and 20 mg on day 2, each infused over one hour",
    duration: "3 days",
    finding:
      "Blood tests of heart, liver, kidney, thyroid and blood-glucose markers showed no measurable change after the infusions, and no side effects were reported.",
    caveat:
      "Two people over three days cannot establish that BPC-157 is safe, a limit the authors acknowledge by calling for further studies. Both participants had used the peptide before.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "tewari-2026",
    authors: "Tewari K, Liu TP, Im C, Hamad C, Petrigliano F, Cheung EC, Kremen TJ",
    year: 2026,
    title: "Peptide Supplements and Their Therapeutic Applications in Sports Medicine.",
    journal: "Am J Sports Med",
    ref: "online ahead of print",
    pmid: "42578445",
    doi: "10.1177/03635465261464420",
    kind: "review",
    topics: ["joints", "muscle", "safety"],
    peptides: ["bpc-157", "tb-500", "cjc-1295", "ipamorelin", "mk-677", "ghk-cu"],
    delivery: [],
    population: "Published animal and human studies of six peptides for musculoskeletal recovery",
    design: "Scoping review following PRISMA guidance (PubMed search)",
    finding:
      "Of the publications found, 67% used animal models. Human studies were a handful, mostly without robust controls, and showed modest improvements at best for metabolic bone health and degenerative knee pain. The authors conclude that the claimed benefits for recovery and performance remain unsubstantiated by human trials, document cardiovascular and metabolic risks, and say these peptides should not be recommended in place of, or alongside, standard orthopaedic care.",
    caveat:
      "A scoping review searched one database (PubMed). The risks it names, such as congestive heart failure, were tied to specific peptides (MK-677 is the example given), not to all six.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "mendias-2026",
    authors: "Mendias CL, Awan TM",
    year: 2026,
    title: "Safety and Efficacy of Approved and Unapproved Peptide Therapies for Musculoskeletal Injuries and Athletic Performance.",
    journal: "Sports Med",
    ref: "56(8):1921–1935",
    pmid: "41966639",
    doi: "10.1007/s40279-026-02437-0",
    kind: "review",
    topics: ["safety", "joints", "muscle"],
    peptides: ["bpc-157", "tb-500", "cjc-1295", "ipamorelin", "ghk-cu", "sermorelin", "tesamorelin", "mots-c"],
    delivery: [],
    population: "Narrative review of approved and unapproved peptides marketed directly to patients",
    design: "Narrative review",
    finding:
      "Reviews the mechanisms, safety and regulatory status of peptides sold for injury recovery and performance, including BPC-157, CJC-1295, GHK-Cu, ipamorelin, MOTS-c, sermorelin, tesamorelin and TB-500. Many unapproved peptides show favourable tissue-repair or metabolic results in animals, but rigorous human safety data are scarce and serious harm is possible. The authors also discuss how the placebo effect and social media amplify perceived benefit.",
    caveat: "A narrative review: it summarises and interprets published work rather than pooling it, and it generates no new data.",
    funding:
      "One author receives consulting fees from Arthrex on unrelated topics; the other reports no relevant conflicts.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "pickart-2015",
    authors: "Pickart L, Vasquez-Soltero JM, Margolina A",
    year: 2015,
    title: "GHK Peptide as a Natural Modulator of Multiple Cellular Pathways in Skin Regeneration.",
    journal: "Biomed Res Int",
    ref: "2015:648108",
    pmid: "26236730",
    pmcid: "PMC4508379",
    doi: "10.1155/2015/648108",
    kind: "review",
    topics: ["skin"],
    peptides: ["ghk-cu"],
    delivery: ["topical"],
    population: "Review of research on GHK, a peptide found in human plasma that declines with age",
    design: "Narrative review",
    finding:
      "Describes GHK, bound to copper, as supporting wound healing and skin repair, mainly from animal and cell work, and reports that cosmetic products containing it were found to improve skin firmness, elasticity and fine lines. It also reports that GHK can raise or lower the activity of thousands of genes.",
    caveat:
      "A review, not a trial: the abstract gives no sample sizes for the cosmetic findings, and a gene-expression result is not a clinical outcome. Read the paper's own disclosures for any commercial ties.",
    verifiedOn: "2026-11-09",
  },
];

export const STUDY_BY_ID = new Map(STUDIES.map((s) => [s.id, s]));

export function studiesForTopic(topic: Topic): Study[] {
  return STUDIES.filter((s) => s.topics.includes(topic)).sort((a, b) => b.year - a.year);
}

export function relatedStudies(study: Study, limit = 4): Study[] {
  return STUDIES.filter((s) => s.id !== study.id && s.topics.some((t) => study.topics.includes(t)))
    .sort((a, b) => {
      const shared = (x: Study) => x.peptides.filter((p) => study.peptides.includes(p)).length;
      return shared(b) - shared(a) || b.year - a.year;
    })
    .slice(0, limit);
}

/** Short first-author citation: "Zdzieblik et al., 2015". */
export function shortCite(s: Study): string {
  const authors = s.authors.split(",");
  const first = authors[0].trim().replace(/\s+[A-Z]{1,3}$/, "");
  return authors.length > 1 ? `${first} et al., ${s.year}` : `${first}, ${s.year}`;
}

export { NO_STATEMENT };
