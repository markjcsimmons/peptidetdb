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
