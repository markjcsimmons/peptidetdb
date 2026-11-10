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

export type Topic = "skin" | "muscle" | "joints" | "blood-pressure" | "brain" | "immune" | "safety";

export type PeptideId =
  | "collagen"
  | "marine-collagen"
  | "fish-hydrolysate"
  | "valyl-tyrosine"
  | "bpc-157"
  | "tb-500"
  | "ghk-cu"
  | "cjc-1295"
  | "ipamorelin"
  | "mk-677"
  | "sermorelin"
  | "tesamorelin"
  | "mots-c"
  | "thymic-peptides"
  | "thymosin-alpha-1"
  | "thymalin";

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
  "blood-pressure": "Blood pressure & vessels",
  brain: "Sleep, memory & stress",
  immune: "Immune function",
  safety: "Safety & regulation",
};

export const PEPTIDE_LABEL: Record<PeptideId, string> = {
  collagen: "Collagen peptides",
  "marine-collagen": "Marine (fish-derived) collagen peptides",
  "fish-hydrolysate": "Fish protein hydrolysate",
  "valyl-tyrosine": "Valyl-tyrosine (sardine peptide)",
  "bpc-157": "BPC-157",
  "tb-500": "TB-500 / thymosin beta-4",
  "ghk-cu": "GHK-Cu (copper peptide)",
  "cjc-1295": "CJC-1295",
  ipamorelin: "Ipamorelin",
  "mk-677": "MK-677 (ibutamoren)",
  sermorelin: "Sermorelin",
  tesamorelin: "Tesamorelin",
  "mots-c": "MOTS-c",
  "thymic-peptides": "Thymic peptides", // kept short: it feeds the page title (page part must stay ≤52 chars)
  "thymosin-alpha-1": "Thymosin alpha-1",
  thymalin: "Thymalin",
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

  // ── Oral marine (fish-derived) peptides ────────────────────────────────────
  {
    id: "evans-2021",
    authors: "Evans M, Lewis ED, Zakaria N, Pelipyagina T, Guthrie N",
    year: 2021,
    title:
      "A randomized, triple-blind, placebo-controlled, parallel study to evaluate the efficacy of a freshwater marine collagen on skin wrinkles and elasticity.",
    journal: "J Cosmet Dermatol",
    ref: "20(3):825–834",
    pmid: "32799362",
    pmcid: "PMC8176521",
    doi: "10.1111/jocd.13676",
    kind: "human-controlled",
    topics: ["skin"],
    peptides: ["marine-collagen"],
    delivery: ["oral"],
    population: "Women aged 45–60 (number not given in the abstract)",
    design: "Randomised, triple-blind, placebo-controlled, parallel groups",
    dose: "A hydrolysed fish-derived (freshwater) collagen product; dose not given in the abstract",
    duration: "12 weeks",
    finding:
      "After 12 weeks the collagen group's wrinkle score fell 35% from baseline (P = .035) and fell 24% more than placebo on the right side of the face. In a planned subgroup of women aged 45–54, cheek elasticity improved 20% at week 6 and 10% at week 12 from baseline. At week 12 the collagen group also rated overall skin, wrinkles, elasticity, hydration, radiance and firmness higher than the placebo group did.",
    caveat:
      "Several results are changes from baseline or self-rated scores, which placebo can also move; only one facial wrinkle result is described as a difference from placebo. The abstract gives no sample size or dose, and the elasticity benefit comes from an age subgroup.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "hwang-2026",
    authors: "Hwang S, Won J, Kim S, Kang W, Park M",
    year: 2026,
    title:
      "Low-Molecular-Weight Collagen Peptide Supplementation Improves Cellulite Severity, Skin Elasticity, and Hair Shaft Diameter: A Clinical Study with Pharmacokinetic Evaluation.",
    journal: "J Med Food",
    ref: "29(4):187–195",
    pmid: "41788055",
    doi: "10.1177/1096620X261428336",
    kind: "human-controlled",
    topics: ["skin"],
    peptides: ["marine-collagen"],
    delivery: ["oral"],
    population: "114 women aged 20–50 with thigh cellulite and self-reported hair thinning",
    design: "Randomised, placebo-controlled trial, preceded by a preliminary pharmacokinetic study",
    dose: "1,000 mg/day of low-molecular-weight collagen peptides made from fish-skin gelatin",
    duration: "24 weeks",
    finding:
      "At weeks 12 and 24 the collagen peptide group improved more than placebo on cellulite severity, dermal–subcutaneous border length, skin roughness and skin elasticity, and hair diameter rose significantly at week 24. In the separate pharmacokinetic part, blood exposure to the tripeptide Gly-Pro-Hyp (area under the curve over two hours) was about 54 times higher after the peptide than after a general collagen product.",
    caveat:
      "Cellulite and hair results are single-trial findings, and the abstract does not say who funded the study. The pharmacokinetic comparison is a blood-level measurement from a preliminary study; it does not by itself show a clinical benefit.",
    funding: "The authors declare no competing financial or nonfinancial interests.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "kawasaki-2000",
    authors: "Kawasaki T, Seki E, Osajima K, Yoshida M, Asada K, Matsui T, Osajima Y",
    year: 2000,
    title:
      "Antihypertensive effect of valyl-tyrosine, a short chain peptide derived from sardine muscle hydrolyzate, on mild hypertensive subjects.",
    journal: "J Hum Hypertens",
    ref: "14(8):519–523",
    pmid: "10962520",
    doi: "10.1038/sj.jhh.1001065",
    kind: "human-controlled",
    topics: ["blood-pressure"],
    peptides: ["valyl-tyrosine"],
    delivery: ["oral"],
    population: "29 adults with high-normal blood pressure or mild hypertension",
    design: "Randomised, double-blind, placebo-controlled: 3-week run-in, 4 weeks of treatment, 4-week recovery",
    dose: "3 mg of valyl-tyrosine in a 100 ml drink, twice a day",
    duration: "4 weeks of treatment",
    finding:
      "On the sardine peptide, systolic and diastolic blood pressure fell by 9.7 and 5.3 mm Hg after one week and by 9.3 and 5.2 mm Hg after four weeks (P < 0.001), with no change on placebo. Pressure crept back up during the recovery period. Blood markers fitted ACE inhibition (angiotensin II and aldosterone fell), and no adverse effects were detected.",
    caveat:
      "A single small, short trial in people with mild hypertension, and nothing else in this hub replicates it. It tested one defined peptide (valyl-tyrosine) in a drink, not marine collagen or fish hydrolysate products in general.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "zhu-2010",
    authors: "Zhu CF, Li GZ, Peng HB, Zhang F, Chen Y, Li Y",
    year: 2010,
    title:
      "Therapeutic effects of marine collagen peptides on Chinese patients with type 2 diabetes mellitus and primary hypertension.",
    journal: "Am J Med Sci",
    ref: "340(5):360–366",
    pmid: "20739874",
    doi: "10.1097/MAJ.0b013e3181edfcf2",
    kind: "human-controlled",
    topics: ["blood-pressure"],
    peptides: ["marine-collagen"],
    delivery: ["oral"],
    population: "100 patients with type 2 diabetes and primary hypertension (50 per group) plus 50 healthy comparison subjects, in China",
    design: "Randomised, double-blind; patients also kept taking their regular diabetes and blood-pressure medicines",
    dose: "Marine collagen peptides from deep-sea fish, twice daily; dose not given in the abstract",
    duration: "3 months",
    finding:
      "Compared with patient controls, the marine collagen peptide group had lower fasting blood glucose, HbA1c, diastolic blood pressure, mean arterial pressure, triglycerides, total and LDL cholesterol and creatinine, and higher HDL cholesterol and insulin sensitivity.",
    caveat:
      "Patients stayed on their regular medicines, so this is an add-on effect in people with diabetes and hypertension, not in healthy people. The abstract reports lower diastolic and mean arterial pressure but does not list systolic pressure among the significant results, and it gives no dose.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "oliveira-2020",
    authors: "Oliveira GV, Volino-Souza M, Cordeiro EM, Conte-Junior CA, Alvares TS",
    year: 2020,
    title: "Effects of fish protein hydrolysate ingestion on endothelial function compared to whey protein hydrolysate in humans.",
    journal: "Int J Food Sci Nutr",
    ref: "71(2):242–248",
    pmid: "31271072",
    doi: "10.1080/09637486.2019.1635090",
    kind: "human-controlled",
    topics: ["blood-pressure"],
    peptides: ["fish-hydrolysate"],
    delivery: ["oral"],
    population: "9 healthy adults",
    design: "Single-dose comparison of fish protein hydrolysate, whey protein hydrolysate and placebo",
    dose: "20 g, one dose",
    duration: "Measured up to 120 minutes after the dose",
    finding:
      "Whey protein hydrolysate increased endothelium-dependent dilation of a blood vessel 30 minutes after the dose compared with placebo. Fish protein hydrolysate did not. In a lab assay the fish product had higher total antioxidant capacity than the whey product.",
    caveat:
      "Nine people and a single dose, so it says nothing about longer-term use or blood pressure. It tested a general fish hydrolysate, not a defined peptide.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "eckert-2024",
    authors: "Eckert F, Meyer N, Monzel E, Bouvret E, Chataigner M, Hellhammer J",
    year: 2024,
    title:
      "Efficacy of a fish hydrolysate supplement on sleep quality: A randomized, double-blind, placebo-controlled, crossover clinical trial.",
    journal: "Clin Nutr ESPEN",
    ref: "60:48–58",
    pmid: "38479939",
    doi: "10.1016/j.clnesp.2024.01.002",
    kind: "human-controlled",
    topics: ["brain"],
    peptides: ["fish-hydrolysate"],
    delivery: ["oral"],
    population: "Healthy German adults reporting poor sleep quality (number not given in the abstract)",
    design: "Randomised, double-blind, placebo-controlled crossover",
    dose: "A fish hydrolysate of low-molecular-weight peptides; dose not given in the abstract",
    duration: "4 weeks",
    finding:
      "Sleep quality on the Pittsburgh Sleep Quality Index improved from baseline during the four weeks on fish hydrolysate (p = .002), with better sleep efficacy, fewer sleep disturbances and less daytime sleepiness. But there were no significant differences between fish hydrolysate and placebo.",
    caveat:
      "The head-to-head comparison was negative: fish hydrolysate did not beat placebo, so the improvement from baseline cannot be credited to the supplement. The authors' conclusion that it supports people with sleep problems goes further than that result.",
    funding:
      "Fully sponsored by Abyss Ingredients, which took part in discussing the design and writing the paper; two authors disclose a commercial interest.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "chataigner-2026",
    authors: "Chataigner M, Peltier A, Bouvret E, Dinel AL, Joffre C, Pallet V",
    year: 2026,
    title:
      "Dietary fish hydrolysate improves episodic memory in healthy elderly with lower level of memory performance: a double-blind, randomized, placebo-controlled clinical study.",
    journal: "Am J Clin Nutr",
    ref: "124(1):101360",
    pmid: "42162916",
    doi: "10.1016/j.ajcnut.2026.101360",
    kind: "human-controlled",
    topics: ["brain"],
    peptides: ["fish-hydrolysate"],
    delivery: ["oral"],
    population: "53 healthy adults aged 60–73 whose memory scores were lower than average for their age",
    design: "Randomised, double-blind, placebo-controlled, registered trial",
    dose: "1 g/day of low-molecular-weight peptides plus 30 mg omega-3 long-chain fatty acids",
    duration: "3 months",
    finding:
      "On the primary episodic-memory score the fish hydrolysate group did better than placebo (P = 0.003), with partial improvement in spatial working memory; verbal recognition did not differ. Red-blood-cell omega-3 levels rose and C-reactive protein, a marker of inflammation, fell.",
    caveat:
      "A small trial in a selected group of healthy older adults. The supplement also contained omega-3 fatty acids, so the benefit cannot be attributed to the peptides alone.",
    funding:
      "Two authors are funded by Abyss Ingredients. One author reports financial support from Public Investment Bank France and Région Bretagne. The other authors report no conflicts.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "mjos-2019",
    authors: "Mjøs I, Thorsen E, Hausken T, Lied E, Nilsen RM, Brønstad I, Edvardsen E, Frisk B",
    year: 2019,
    title:
      "The effect of low dose marine protein hydrolysates on short-term recovery after high intensity performance cycling: a double-blinded crossover study.",
    journal: "J Int Soc Sports Nutr",
    ref: "16(1):48",
    pmid: "31665070",
    pmcid: "PMC6819466",
    doi: "10.1186/s12970-019-0318-3",
    kind: "human-controlled",
    topics: ["muscle"],
    peptides: ["fish-hydrolysate"],
    delivery: ["oral"],
    population: "14 healthy male cyclists, mean age 45.6",
    design: "Double-blind crossover",
    dose: "Low-dose marine protein hydrolysate added to a whey protein and carbohydrate recovery drink; exact dose not given in the abstract",
    duration: "Four hours of recovery between two high-intensity cycling sessions",
    finding:
      "Time to exhaustion in the second session did not differ significantly between the drink with marine protein hydrolysate and the same drink without it (mean difference 0.85 min, p = 0.156), and heart rate, respiratory exchange ratio, blood lactate and glucose did not differ either.",
    caveat:
      "A small study at a low dose, in trained middle-aged men and short-term recovery only. It cannot rule out an effect at other doses or over longer training.",
    funding:
      "Funded by Firmenich Bjørge Biomarine A/S, whose representative was a co-author and composed the diets. The authors say the study was double-blinded and the statisticians did not know the diet order until the analyses were complete.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "cordeiro-2020",
    authors: "Cordeiro EM, de Oliveira GV, Volino-Souza M, Velozo ODC, Alvares TS",
    year: 2020,
    title:
      "Effects of fish protein hydrolysate ingestion on postexercise aminoacidemia compared with whey protein hydrolysate in young individuals.",
    journal: "J Food Sci",
    ref: "85(1):21–27",
    pmid: "31846088",
    doi: "10.1111/1750-3841.14970",
    kind: "human-controlled",
    topics: ["muscle"],
    peptides: ["fish-hydrolysate"],
    delivery: ["oral"],
    population: "9 physically active adults (6 men, 3 women)",
    design: "Randomised, double-blind crossover",
    dose: "0.25 g/kg of fish protein hydrolysate, whey protein hydrolysate or placebo, taken straight after a resistance-exercise session",
    duration: "Blood sampled for 180 minutes",
    finding:
      "Both fish and whey protein hydrolysates raised blood levels of total amino acids, essential amino acids, branched-chain amino acids and leucine after exercise, compared with placebo. There were no significant differences between fish and whey at any time point.",
    caveat:
      "It measured amino acids in the blood, not muscle growth or strength, and it shows only that fish hydrolysate is digested quickly, like whey. It says nothing about effects from specific bioactive peptides. Nine people.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "oddoux-2022",
    authors: "Oddoux S, Violette P, Cornet J, Akkoyun-Farinez J, Besnier M, Noël A, Rouillon F",
    year: 2022,
    title:
      "Effect of a Dietary Supplement Combining Bioactive Peptides and Magnesium on Adjustment Disorder with Anxiety: A Clinical Trial in General Practice.",
    journal: "Nutrients",
    ref: "14(12):2425",
    pmid: "35745154",
    pmcid: "PMC9228954",
    doi: "10.3390/nu14122425",
    kind: "human-uncontrolled",
    topics: ["brain"],
    peptides: ["fish-hydrolysate"],
    delivery: ["oral"],
    population: "Patients diagnosed with adjustment disorder with anxiety (Hamilton Anxiety score of 20 or more) seen by general practitioners; number not given in the abstract",
    design: "Observational, multicentre, single-arm study with no comparison group",
    dose: "A supplement combining fish-protein-hydrolysate peptides (Gabolysat), magnesium and vitamin B6",
    duration: "28 days",
    finding:
      "Average Hamilton anxiety scores fell by 12.1 points (from 25.6 to 13.6, p < 0.001), 41.9% of patients had a 50% reduction in score, and clinicians rated 75.3% as improved.",
    caveat:
      "No control group, so it cannot separate the supplement from placebo, natural recovery or other care. The product also contained magnesium and vitamin B6, so any change cannot be attributed to the peptides.",
    funding: "Three of the authors work for Laboratoire Dielen.",
    verifiedOn: "2026-11-09",
  },

  // ── Thymic peptides and thymus extracts ────────────────────────────────────
  {
    id: "wolf-2011",
    authors: "Wolf E, Milazzo S, Boehm K, Zwahlen M, Horneber M",
    year: 2011,
    title: "Thymic peptides for treatment of cancer patients.",
    journal: "Cochrane Database Syst Rev",
    ref: "2011(2):CD003993",
    pmid: "21328265",
    pmcid: "PMC6481824",
    doi: "10.1002/14651858.CD003993.pub3",
    kind: "meta-analysis",
    topics: ["immune"],
    peptides: ["thymic-peptides", "thymosin-alpha-1"],
    delivery: [],
    population: "26 randomised trials; 2,736 adults with cancer receiving chemotherapy, radiotherapy or both",
    design: "Cochrane systematic review and meta-analysis (random-effects model); searches ran to February 2010",
    finding:
      "Purified thymus extracts (20 trials) did not improve overall survival (risk ratio 1.00; 95% CI 0.79 to 1.25), disease-free survival (0.97; 0.82 to 1.16) or tumour response (1.07; 0.92 to 1.25). For thymosin alpha-1 the pooled survival ratio was 1.21 (95% CI 0.94 to 1.56, P = 0.14), a trend that did not reach statistical significance. The extracts did lower the risk of severe infections during chemotherapy or radiotherapy (0.54; 0.38 to 0.78). Both kinds of product were well tolerated.",
    caveat:
      "Most included trials had at least a moderate risk of bias, and the extract results varied moderately to highly between trials. The authors call the infection result preliminary. Only six trials tested synthetic peptides (thymopentin or thymosin alpha-1), so the thymosin alpha-1 estimate rests on a handful of trials at most. The review covers adults with cancer on standard treatment, so it says nothing about immune support in healthy people or other illnesses, and it does not include trials after February 2010.",
    funding:
      "The authors certify no affiliation with, or involvement in, any organisation with a direct financial interest in the subject of the review.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "cordero-1999",
    authors: "Cordero OJ, Piñeiro A, Nogueira M",
    year: 1999,
    title: "Thymic peptides and preparations: an update.",
    journal: "Arch Immunol Ther Exp (Warsz)",
    ref: "47(2):77–82",
    pmid: "10202559",
    kind: "review",
    topics: ["immune"],
    peptides: ["thymic-peptides"],
    delivery: [],
    population: "Literature on thymic peptides and thymus preparations up to 1999",
    design: "Narrative review",
    finding:
      "A 1999 overview of thymic peptides and preparations. Its abstract says only that the possible human uses were still being worked out, and that the paper covers the peptides' general characteristics and recent advances.",
    caveat:
      "The abstract reports no results, so nothing here shows that any thymic peptide works in people. It is a narrative review from 1999 and cannot reflect later trials.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "zhukova-2018",
    authors: "Zhukova GV, Schikhlyarova AI, Barteneva TA, Shevchenko AN, Zakharyuta FM",
    year: 2018,
    title: "Effect of Thymalin on the Tumor and Thymus under Conditions of Activation Therapy In Vivo.",
    journal: "Bull Exp Biol Med",
    ref: "165(1):80–83",
    pmid: "29797130",
    doi: "10.1007/s10517-018-4104-z",
    kind: "animal",
    topics: ["immune"],
    peptides: ["thymalin"],
    delivery: [],
    population: "Outbred male albino rats with transplanted sarcoma 45; number of animals not given in the abstract",
    design: "Animal experiment with tissue analysis of the thymus",
    dose: "Thymalin at doses below the therapeutic dose, varied during the course",
    finding:
      "In rats with a transplanted tumour, low-dose Thymalin stopped tumour growth and caused regression in more than half of the animals, and suppressed growth by 78% in the rest. Thymus tissue showed more lymphocyte proliferation and more tissue basophils and plasma cells. The authors credit the low doses, adjusted during the course under their 'activation therapy' regimen.",
    caveat:
      "A study in rats with a transplanted tumour, so it does not show an effect in people. The abstract does not describe a comparison group or give the number of animals, and the explanation offered for the result is the authors' interpretation.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "wang-2018",
    authors: "Wang F, Yu T, Zheng H, Lao X",
    year: 2018,
    title:
      "Thymosin Alpha1-Fc Modulates the Immune System and Down-regulates the Progression of Melanoma and Breast Cancer with a Prolonged Half-life.",
    journal: "Sci Rep",
    ref: "8(1):12351",
    pmid: "30120362",
    pmcid: "PMC6097990",
    doi: "10.1038/s41598-018-30956-y",
    kind: "animal",
    topics: ["immune"],
    peptides: ["thymosin-alpha-1"],
    delivery: [],
    population: "Mice, including mouse breast cancer (4T1) and melanoma (B16F10) tumour models; numbers not given in the abstract",
    design: "Laboratory engineering of a thymosin alpha-1 fusion protein (joined to the Fc part of human IgG4), then mouse experiments",
    finding:
      "The authors made a longer-lasting form of thymosin alpha-1 by attaching an antibody fragment. In mice its serum half-life was 25 hours, about 13 times that of thymosin alpha-1. They report it restored lymphocyte counts after immune injury and slowed tumour growth in the two mouse models, with more CD86, interferon-gamma and interleukin-2 and more tumour-infiltrating CD4+ and CD8+ T cells.",
    caveat:
      "A mouse study of a new engineered molecule, not of thymosin alpha-1 itself, so it is not evidence about the peptide that people are given. The abstract gives no animal numbers, and the authors present it as information for developing new cancer immunotherapy, not as a clinical result.",
    funding:
      "The record lists non-U.S. government research support. The authors declare no competing interests.",
    verifiedOn: "2026-11-09",
  },
  {
    id: "wu-2025",
    authors:
      "Wu J, Pei F, Zhou L, Li W, Sun R, Li Y, Wang Z, He Z, Zhang X, Jin X, Long Y, Cui W, Wang C, Chen E, Zeng J, Yan J, Lin Q, Zhou F, Huang L, Shang Y, Duan M, Zheng W, Zhu D, Kou Q, Zhang S, Liu Y, Yao C, Shang M, Peng S, Zhou Q, Cheng KK, Guan X, TESTS study collaborator group",
    year: 2025,
    title: "The efficacy and safety of thymosin α1 for sepsis (TESTS): multicentre, double blinded, randomised, placebo controlled, phase 3 trial.",
    journal: "BMJ",
    ref: "388:e082583",
    pmid: "39814420",
    pmcid: "PMC11780596",
    doi: "10.1136/bmj-2024-082583",
    kind: "human-controlled",
    topics: ["immune"],
    peptides: ["thymosin-alpha-1"],
    delivery: ["injectable"],
    population: "1,106 adults with sepsis at 22 centres in China (1,089 analysed)",
    design: "Randomised, double-blind, placebo-controlled phase 3 trial",
    dose: "Subcutaneous injection every 12 hours (dose not given in the abstract)",
    duration: "Up to 7 days of treatment; outcome counted at 28 days",
    finding:
      "Thymosin alpha-1 did not lower deaths from sepsis. Within 28 days, 23.4% of the treated group and 24.1% of the placebo group had died (hazard ratio 0.99; 95% CI 0.77 to 1.27). No secondary or safety outcome differed between groups. Two planned subgroup comparisons hinted at different effects by age and by diabetes, and the authors conclude there is no clear evidence that the peptide reduces 28-day mortality in adults with sepsis.",
    caveat:
      "A large, well-controlled trial, but it tested hospital-grade injections in critically ill adults, so it says nothing about the oral or over-the-counter products sold for immune support. The subgroup differences (younger versus older patients, with versus without diabetes) are exploratory and should not be read as a finding that it works in either group. It was run in China only.",
    funding:
      "The authors declare support from Sun Yat-sen University and Guangdong research programmes and from SciClone Pharmaceuticals; several authors report grants or consultancy fees from SciClone.",
    verifiedOn: "2026-11-10",
  },
  {
    id: "wu-2013",
    authors: "Wu J, Zhou L, Liu J, Ma G, Kou Q, He Z, Chen J, Ou-Yang B, Chen M, Li Y, Wu X, Gu B, Chen L, Zou Z, Qiang X, Chen Y, Lin A, Zhang G, Guan X",
    year: 2013,
    title: "The efficacy of thymosin alpha 1 for severe sepsis (ETASS): a multicenter, single-blind, randomized and controlled trial.",
    journal: "Crit Care",
    ref: "17(1):R8",
    pmid: "23327199",
    pmcid: "PMC4056079",
    doi: "10.1186/cc11932",
    kind: "human-controlled",
    topics: ["immune"],
    peptides: ["thymosin-alpha-1"],
    delivery: [],
    population: "361 ICU patients with severe sepsis at six teaching hospitals in China",
    design: "Randomised, single-blind, controlled multicentre trial (thymosin alpha-1 plus usual care versus usual care)",
    duration: "Deaths counted at 28 days",
    finding:
      "Fewer patients died within 28 days on thymosin alpha-1 (26.0%) than in the control group (35.0%), but the result was borderline: the relative risk was 0.74 (95% CI 0.54 to 1.02), and the two statistical tests gave P = 0.062 and 0.049. A blood marker of immune function (monocyte HLA-DR) improved more on days 3 and 7 in the treated group. No serious drug-related adverse events were recorded.",
    caveat:
      "The confidence interval includes no effect, so this trial alone does not show a survival benefit. Single-blind, and the abstract does not say whether controls received a placebo, so knowledge of the treatment could have shaped care. The later and much larger placebo-controlled TESTS trial (Wu 2025) found no mortality difference. The authors' conclusion is hedged to a 'targeted population' of severe sepsis.",
    funding: "The record lists non-U.S. government research support; no competing interests are in the record.",
    verifiedOn: "2026-11-10",
  },
  {
    id: "ke-2022",
    authors:
      "Ke L, Zhou J, Mao W, Chen T, Zhu Y, Pan X, Mei H, Singh V, Buxbaum J, Doig G, He C, Gu W, Lu W, Tu S, Ni H, Zhang G, Zhao X, Sun J, Chen W, Song J, Shao M, Tu J, Xia L, He W, Zhu Q, Li K, Yao H, Wu J, Fu L, Jiang W, Zhang H, Lin J, Li B, Tong Z, Windsor J, Liu Y, Li W, Chinese Acute Pancreatitis Clinical Trials Group (CAPCTG)",
    year: 2022,
    title: "Immune enhancement in patients with predicted severe acute necrotising pancreatitis: a multicentre double-blind randomised controlled trial.",
    journal: "Intensive Care Med",
    ref: "48(7):899-909",
    pmid: "35713670",
    pmcid: "PMC9205279",
    doi: "10.1007/s00134-022-06745-7",
    kind: "human-controlled",
    topics: ["immune"],
    peptides: ["thymosin-alpha-1"],
    delivery: ["injectable"],
    population: "508 adults with predicted severe acute necrotising pancreatitis (94% needed intensive care)",
    design: "Multicentre, double-blind, randomised, placebo-controlled trial",
    dose: "1.6 mg subcutaneously every 12 hours for 7 days, then once daily for 7 days",
    duration: "14 days of treatment; outcome counted during the hospital stay",
    finding:
      "Thymosin alpha-1 did not reduce infected pancreatic necrosis, the main outcome: 15.7% of the treated group developed it against 18.1% on placebo (difference -2.4 points; P = 0.48). Results were similar across four planned subgroups, and other major complications did not differ clearly between groups.",
    caveat:
      "A hospital trial in severely ill patients that used injections, so it says nothing about supplements or healthy people. It tested one outcome (infected necrosis); the authors do not claim other benefits. A negative result in this population does not rule out effects elsewhere, and does not show harm.",
    funding:
      "A provincial science and technology project in Jiangsu is listed. Several authors declare consultancy fees, speaker fees or grants from SciClone Pharmaceuticals.",
    verifiedOn: "2026-11-10",
  },
  {
    id: "soeroto-2023",
    authors: "Soeroto AY, Suryadinata H, Yanto TA, Hariyanto TI",
    year: 2023,
    title: "The efficacy of thymosin alpha-1 therapy in moderate to critical COVID-19 patients: a systematic review, meta-analysis, and meta-regression.",
    journal: "Inflammopharmacology",
    ref: "31(6):3317-3325",
    pmid: "37845598",
    doi: "10.1007/s10787-023-01354-2",
    kind: "meta-analysis",
    topics: ["immune"],
    peptides: ["thymosin-alpha-1"],
    delivery: [],
    population: "Eight studies of people with moderate to critical COVID-19",
    design: "Systematic review and meta-analysis; Scopus, Europe PMC, Medline, ClinicalTrials.gov and Cochrane searched to 25 March 2023",
    finding:
      "Pooled across eight studies, patients given thymosin alpha-1 had a lower risk of dying (risk ratio 0.59; 95% CI 0.37 to 0.93), but no clear difference in needing a ventilator or in length of hospital stay. Results varied a great deal between studies, and the mortality effect was related to study size and to sex.",
    caveat:
      "The abstract does not say how many of the eight studies were randomised, and it reports very high between-study variation (I² 84% for mortality), so the pooled number is fragile. The authors themselves say randomised trials are still needed to verify it. It covers hospitalised COVID-19 patients, not prevention or healthy adults.",
    verifiedOn: "2026-11-10",
  },
  {
    id: "dinetz-2024",
    authors: "Dinetz E, Lee E",
    year: 2024,
    title: "Comprehensive Review of the Safety and Efficacy of Thymosin Alpha 1 in Human Clinical Trials.",
    journal: "Altern Ther Health Med",
    ref: "30(1):6-12",
    pmid: "38308608",
    kind: "review",
    topics: ["immune"],
    peptides: ["thymosin-alpha-1"],
    delivery: [],
    population: "Over 30 trials with more than 11,000 people, per the abstract",
    design: "Narrative review of trials in COVID-19, infections, cancer and autoimmune disease",
    finding:
      "The authors describe thymosin alpha-1 as well tolerated and effective across COVID-19, autoimmune disease and cancer, and argue that the FDA's 2023 restriction on compounding it is unfounded and should be reversed.",
    caveat:
      "The abstract reports no pooled numbers, trial-level results or assessment of bias, so its sweeping conclusion cannot be checked from the record. Lumping together trials of different diseases, doses and quality into one 'safety and efficacy' verdict hides results like the null sepsis and pancreatitis trials on this page. The paper ends with a regulatory recommendation, which is advocacy rather than a study result. PubMed tags it a systematic review, but the abstract calls it a narrative review.",
    unverified:
      "That thymosin alpha-1 has 'consistent' efficacy across conditions, and that the FDA's restriction is 'unfounded'. The abstract gives no data behind either claim.",
    verifiedOn: "2026-11-10",
  },
  {
    id: "cao-2024",
    authors: "Cao A, Feng F, Zhou X",
    year: 2024,
    title: "Thymosin Alpha 1 Plus Routine Treatment for the Acute Exacerbation of Chronic Obstructive Pulmonary Disease: A Systematic Review and Meta-Analysis.",
    journal: "J Coll Physicians Surg Pak",
    ref: "34(12):1497-1507",
    pmid: "39648386",
    doi: "10.29271/jcpsp.2024.12.1497",
    kind: "meta-analysis",
    topics: ["immune"],
    peptides: ["thymosin-alpha-1"],
    delivery: [],
    population: "39 randomised controlled trials; 3,329 patients with an acute exacerbation (flare-up) of COPD",
    design: "Systematic review and meta-analysis; six English- and Chinese-language databases searched",
    finding:
      "Adding thymosin alpha-1 to routine treatment was followed by better lung function (FEV1 and the FEV1/FVC ratio), higher blood oxygen, lower blood carbon dioxide, a shorter hospital stay (about 5 days less on average) and higher CD4 T-cell counts, with lower CD8 counts, than routine treatment alone.",
    caveat:
      "The outcomes are lung-function tests, blood gases, T-cell counts and length of stay, not survival or fewer flare-ups. The abstract does not describe the quality of the included trials or how much they differed from each other, and three of the six databases searched are Chinese, so the trials may come largely from one country. The authors say more high-quality randomised trials are needed. It covers hospital treatment of flare-ups, not prevention or use in healthy people.",
    verifiedOn: "2026-11-10",
  },
  {
    id: "tian-2025",
    authors: "Tian Y, Yao J, Ma Y, Zhang P, Zhou X, Xie W, Tang W",
    year: 2025,
    title: "Thymosin alpha 1 alleviates inflammation and prevents infection in patients with severe acute pancreatitis through immune regulation: a systematic review and meta-analysis.",
    journal: "Front Immunol",
    ref: "16:1571456",
    pmid: "40599771",
    pmcid: "PMC12208829",
    doi: "10.3389/fimmu.2025.1571456",
    kind: "meta-analysis",
    topics: ["immune"],
    peptides: ["thymosin-alpha-1"],
    delivery: [],
    population: "Five randomised controlled trials; 706 patients with severe acute pancreatitis",
    design: "Systematic review and meta-analysis; five databases searched to 1 February 2025; registered in PROSPERO",
    finding:
      "Pooled across five trials, thymosin alpha-1 raised the share of CD4 T cells and the CD4/CD8 ratio and lowered the overall rate of infections outside the pancreas (risk ratio 0.56; 95% CI 0.40 to 0.78), mainly blood and abdominal infections. It did not clearly cut lung infections or the length of hospital stay. A lower dose lowered C-reactive protein; a higher dose did not.",
    caveat:
      "Only five trials, and the abstract does not describe their quality. The much larger double-blind trial of 508 patients summarised here (Ke 2022) found no reduction in infected pancreatic necrosis, so the two do not clearly agree. The authors say more research is needed.",
    verifiedOn: "2026-11-10",
  },
  {
    id: "chen-2022",
    authors: "Chen JF, Chen SR, Lei ZY, Cao HJ, Zhang SQ, Weng WZ, Xiong J, Lin DN, Zhang J, Zheng YB, Gao ZL, Lin BL",
    year: 2022,
    title: "Safety and efficacy of Thymosin α1 in the treatment of hepatitis B virus-related acute-on-chronic liver failure: a randomized controlled trial.",
    journal: "Hepatol Int",
    ref: "16(4):775-788",
    pmid: "35616850",
    doi: "10.1007/s12072-022-10335-6",
    kind: "human-controlled",
    topics: ["immune"],
    peptides: ["thymosin-alpha-1"],
    delivery: ["injectable"],
    population: "120 patients with hepatitis B-related acute-on-chronic liver failure enrolled in China",
    design: "Open-label randomised controlled trial: standard medical therapy with or without thymosin alpha-1",
    dose: "1.6 mg subcutaneously once a day for week 1, then twice a week from week 2 to week 12",
    duration: "12 weeks of treatment; survival counted at 90 days",
    finding:
      "Survival without needing a liver transplant at 90 days was 75.0% with thymosin alpha-1 against 53.4% on standard therapy alone (P = 0.030). New infections and hepatic encephalopathy were less common in the treated group, and deaths from severe infection were lower (8.9% against 24.1%). A separate analysis that accounted for competing outcomes found no significant survival difference.",
    caveat:
      "Open-label with no placebo, so clinicians and patients knew who was treated. The headline result disappeared in the competing-risk analysis, and the groups were small (120 enrolled; groups of 58 and 56 are reported). The authors suggest only a subgroup may benefit. It is a hospital trial of an injected drug in very sick patients.",
    funding:
      "Several Chinese national, provincial and city research grants are listed. No competing interests are in the record.",
    verifiedOn: "2026-11-10",
  },
  {
    id: "peng-2020",
    authors: "Peng D, Xing HY, Li C, Wang XF, Hou M, Li B, Chen JH",
    year: 2020,
    title: "The clinical efficacy and adverse effects of Entecavir plus Thymosin alpha-1 combination therapy versus Entecavir Monotherapy in HBV-related cirrhosis: a systematic review and meta-analysis.",
    journal: "BMC Gastroenterol",
    ref: "20(1):348",
    pmid: "33076834",
    pmcid: "PMC7574490",
    doi: "10.1186/s12876-020-01477-8",
    kind: "meta-analysis",
    topics: ["immune"],
    peptides: ["thymosin-alpha-1"],
    delivery: [],
    population: "Seven randomised trials; 1,144 people with hepatitis B-related cirrhosis, all from mainland China",
    design: "Systematic review and meta-analysis of entecavir plus thymosin alpha-1 versus entecavir alone",
    finding:
      "Adding thymosin alpha-1 to the antiviral entecavir gave a higher complete response (risk ratio 1.18; 95% CI 1.07 to 1.30), and more people had undetectable virus and lost the HBeAg marker at 24 weeks. By 48 and 52 weeks there was no clear difference, and loss of the HBsAg marker did not differ. Some liver measures improved, with a lot of variation between trials, and adverse events were fewer with the combination (risk ratio 0.48; 95% CI 0.24 to 0.95).",
    caveat:
      "The early advantage faded by 48 to 52 weeks, and the authors note that every patient was from mainland China, so wider trials are needed. The abstract does not describe the quality of the trials. The comparison is a drug added to a standard antiviral, so it says nothing about thymosin alpha-1 on its own.",
    funding:
      "Third Military Medical University and Army research funds are listed. The authors declare no conflicts of interest.",
    verifiedOn: "2026-11-10",
  },
  {
    id: "kim-2012",
    authors: "Kim BH, Lee YJ, Kim W, Yoon JH, Jung EU, Park SJ, Kim YJ, Lee HS",
    year: 2012,
    title: "Efficacy of thymosin α-1 plus peginterferon α-2a combination therapy compared with peginterferon α-2a monotherapy in HBeAg-positive chronic hepatitis B: a prospective, multicenter, randomized, open-label study.",
    journal: "Scand J Gastroenterol",
    ref: "47(8-9):1048-55",
    pmid: "22726105",
    doi: "10.3109/00365521.2012.694902",
    kind: "human-controlled",
    topics: ["immune"],
    peptides: ["thymosin-alpha-1"],
    delivery: ["injectable"],
    population: "51 patients with HBeAg-positive chronic hepatitis B",
    design: "Prospective, multicentre, randomised, open-label study: peginterferon with or without thymosin alpha-1",
    dose: "1.6 mg of thymosin alpha-1 twice a week for the first 12 weeks, with 48 weeks of peginterferon in both groups",
    duration: "48 weeks of peginterferon, then follow-up",
    finding:
      "Adding thymosin alpha-1 did not beat peginterferon alone. The combined response (HBeAg seroconversion, viral suppression and normal ALT) was 15.4% with the combination against 12.0% with peginterferon alone at the end of treatment, and 23.1% against 20.0% at the end of follow-up, neither difference significant. Adverse events did not differ significantly.",
    caveat:
      "A small, open-label trial, too small to rule out a modest benefit or harm. It tested a 12-week add-on in one kind of hepatitis B and is not evidence on thymosin alpha-1 alone or in healthy people. Together with the pooled analysis of entecavir trials, it shows the results in hepatitis B are not uniform.",
    verifiedOn: "2026-11-10",
  },
  {
    id: "bassila-2026",
    authors: "Bassila C, Bassila JC, Slim M",
    year: 2026,
    title: "Efficacy and safety of hydrolyzed collagen supplementation on skin health outcomes: a systematic literature review of randomized controlled trials.",
    journal: "Eur J Clin Nutr",
    ref: "80(9):867-885",
    pmid: "42342959",
    doi: "10.1038/s41430-026-01778-3",
    kind: "systematic-review",
    topics: ["skin", "safety"],
    peptides: ["collagen"],
    delivery: ["oral"],
    population: "25 randomised controlled trials (13 to 236 participants each), mostly in healthy volunteers; seven enrolled people with chronic disease",
    design: "Systematic literature review of oral hydrolysed collagen versus placebo or active comparators, searched to April 2023, with risk-of-bias assessment; results described, not pooled",
    finding:
      "Hydrolysed collagen beat placebo on skin hydration in 10 of 15 trials, on elasticity in 10 of 13 and on wrinkle depth or volume in 9 of 10; results for water loss through the skin were less consistent. It was generally well tolerated, with a low rate of adverse events. Quality-of-life results, mostly in people with arthritis, varied.",
    caveat:
      "The authors rate most of the included trials at high risk of bias and call for larger, longer, standardised trials, so the benefit is likely overstated. The safety statement is a summary of adverse events reported in efficacy trials, not a dedicated long-term safety study. Results were counted trial by trial, not pooled, and the search stopped in April 2023.",
    funding: "One author is an employee of Lumanity; the record says he has no conflicts specific to this review.",
    verifiedOn: "2026-11-10",
  },
  {
    id: "ueno-2020",
    authors: "Ueno R, Takaoka Y, Shimojo N, Ohno F, Yamaguchi T, Matsunaga K, Kameda M",
    year: 2020,
    title: "A case of pediatric anaphylaxis caused by gummy tablets containing fish collagen.",
    journal: "Asia Pac Allergy",
    ref: "10(4):e35",
    pmid: "33178560",
    pmcid: "PMC7610083",
    doi: "10.5415/apallergy.2020.10.e35",
    kind: "human-uncontrolled",
    topics: ["safety"],
    peptides: ["marine-collagen"],
    delivery: ["oral"],
    population: "One 9-year-old girl with fish allergy",
    design: "Case report with an oral challenge test and laboratory tests",
    finding:
      "After eating two fruit-flavoured gummy tablets the girl had anaphylaxis. The tablets contained fish-derived collagen, and a supervised oral fish-collagen challenge confirmed that the collagen caused the reaction. Lab tests identified fish collagen as the allergen. The authors warn that processed foods can contain fish collagen.",
    caveat:
      "A single case, so it cannot say how often this happens. The patient already had fish allergy, and it concerns a gummy tablet, not a collagen peptide powder. It does not show risk for people without fish allergy.",
    funding: "The authors declare no financial conflicts of interest.",
    verifiedOn: "2026-11-10",
  },
  {
    id: "kobayashi-2016",
    authors: "Kobayashi Y, Kuriyama T, Nakagawara R, Aihara M, Hamada-Sato N",
    year: 2016,
    title: "Allergy to fish collagen: Thermostability of collagen and IgE reactivity of patients' sera with extracts of 11 species of bony and cartilaginous fish.",
    journal: "Allergol Int",
    ref: "65(4):450-458",
    pmid: "27236375",
    doi: "10.1016/j.alit.2016.04.012",
    kind: "in-vitro",
    topics: ["safety"],
    peptides: ["marine-collagen"],
    delivery: [],
    population: "Extracts of 11 species of fish tested against sera from allergic patients; skin-prick tests in one patient",
    design: "Laboratory study of heated fish extracts (protein gels, IgE-ELISA and skin-prick tests)",
    finding:
      "Heating broke down fish collagen, but the IgE reactivity of patients' sera to the extracts did not fall, even after prolonged heating at 100 °C. Reactivity was lower to extracts of cartilaginous fish than to bony fish. In the one patient skin-tested, all of the extracts caused reactions.",
    caveat:
      "A laboratory study with few patients, so it shows that the allergen stays reactive after cooking, not how often fish collagen causes reactions. It tested fish meat extracts, not collagen supplements. It does not say whether a given supplement is safe for a person with fish allergy.",
    verifiedOn: "2026-11-10",
  },
  {
    id: "moiz-2026",
    authors: "Moiz A, O'Keefe EL, O'Keefe JH",
    year: 2026,
    title: "Dangers of Injectable Peptides and Other Unregulated \"Biohacking\" Drugs.",
    journal: "Mo Med",
    ref: "123(4):337-343",
    pmid: "42757290",
    pmcid: "PMC13585006",
    kind: "review",
    topics: ["safety"],
    peptides: ["bpc-157", "tb-500"],
    delivery: ["injectable"],
    design: "Narrative review for clinicians of approved and unapproved injectable peptides and related drugs",
    finding:
      "The authors contrast FDA-approved peptides such as semaglutide and tirzepatide with an illicit market of unapproved experimental drugs, including BPC-157 and TB-500, which lack established human safety profiles. They list possible risks, among them product contamination, manufacturing impurities, inaccurate dosing, abnormal blood-vessel growth, cancer, cardiovascular stress and disrupted hormone signalling, and urge clinicians to counsel patients.",
    caveat:
      "A narrative review, so it does not pool data or show how often any of these harms occur. Several of the listed risks are mechanisms or possibilities, not outcomes measured in people. It supports caution about product quality; it does not test any certificate of analysis or say how to judge one.",
    funding: "The record reports no financial disclosures.",
    verifiedOn: "2026-11-10",
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
