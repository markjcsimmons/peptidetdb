import type { Topic } from "./studies";

/**
 * Topic-level verdicts are hand-written from the studies in lib/studies.ts. When a study is added
 * or changes, re-read this file: a verdict is only as current as `reviewedOn`.
 */
export type Level = "consistent" | "mixed" | "limited" | "preclinical" | "none" | "unassessed";

export const LEVEL_LABEL: Record<Level, string> = {
  consistent: "Consistent in human trials (with caveats)",
  mixed: "Mixed human results",
  limited: "Limited human evidence",
  preclinical: "Mostly animal evidence",
  none: "No human trials found",
  unassessed: "Not yet assessed here",
};

export const LEVEL_HINT: Record<Level, string> = {
  consistent: "Several human trials or pooled analyses point the same way, though the trials have limits.",
  mixed: "Human trials exist but disagree across outcomes.",
  limited: "A small number of human studies, or only small, uncontrolled or single-sponsor ones.",
  preclinical: "Promising results in animals or cells; little or no controlled human data.",
  none: "Our PubMed searches found no controlled human trial of this use. That is not proof none exists.",
  unassessed: "This hub has not yet summarised the controlled human evidence.",
};

export type TopicRating = { subject: string; level: Level; why: string };

export type TopicPage = {
  slug: Topic;
  /** What the ratings measure. "safety" ratings are drawn as words only, never as a benefit meter. */
  measures: "benefit" | "safety";
  title: string;
  intro: string;
  ratings: TopicRating[];
  gaps: string[];
  reviewedOn: string;
};

export const TOPICS: Record<Topic, TopicPage> = {
  skin: {
    slug: "skin",
    measures: "benefit",
    title: "Peptides for skin & anti-aging",
    intro:
      "Two kinds of peptide are marketed for skin: collagen peptides you swallow, and cosmetic peptides such as argireline and GHK-Cu that you apply to the skin. The evidence is very different for each.",
    ratings: [
      {
        subject: "Oral collagen peptides",
        level: "consistent",
        why: "Two large meta-analyses of randomised trials (19 trials with 1,125 people; 26 trials with 1,721 people) report better skin hydration and elasticity than placebo. The 2023 analysis found biases in the included trials, and a 2026 systematic review of 25 trials rated most as high risk of bias (hydration improved in 10 of 15 trials, elasticity in 10 of 13, wrinkles in 9 of 10), so the direction is consistent but the size of the effect is uncertain.",
      },
      {
        subject: "Oral marine (fish-derived) collagen peptides",
        level: "limited",
        why: "Two randomised trials of fish-derived collagen peptides report better wrinkle, elasticity, cellulite and hair results. One gives no sample size or dose, and several of its results are changes from baseline or self-rated scores. The 2023 meta-analysis above found that the size of the hydration effect varied with the collagen source.",
      },
      {
        subject: "Topical cosmetic peptides (argireline, palmitoyl peptides and similar)",
        level: "limited",
        why: "Small, short trials report improvements in wrinkle and roughness measures: 60 people for 4 weeks with argireline, 24 people in four groups with two other peptides, and a 12-week palmitoyl-RGD cream study whose abstract gives no sample size. A 2026 meta-analysis of oral and topical peptides found a modest wrinkle effect, but it says the benefit was largely driven by oral peptides and does not report topical products separately. A review of argireline notes that it may not cross the skin well.",
      },
      {
        subject: "Topical GHK-Cu (copper peptide)",
        level: "limited",
        why: "One small randomised trial (13 patients completing, after laser resurfacing) found no objective difference in redness, wrinkles or skin quality with GHK-Cu products, only higher patient satisfaction. A 2025 review says clinical studies of GHK-Cu and its palmitoyl form are surprisingly absent, and that the case for it rests mostly on cell studies. Whether injected or ingested GHK-Cu does anything for skin is not covered by these studies.",
      },
    ],
    gaps: [
      "No head-to-head trial of marine versus bovine collagen is summarised here.",
      "We did not search for trials comparing a topical peptide with an established treatment such as a retinoid, so none is summarised here.",
      "The 2026 peptide meta-analysis does not separate topical from oral results in its abstract; the full text may.",
      "The PubMed records of four of the topical-peptide trials carry no funding or conflict statement, so who paid for them is unknown from the abstracts.",
    ],
    reviewedOn: "2026-11-11",
  },
  hair: {
    slug: "hair",
    measures: "benefit",
    title: "Peptides for hair growth & hair loss",
    intro:
      "Hair claims cover scalp serums with cosmetic peptides, injections into the scalp, collagen you swallow and research peptides sold online. The human trials are mostly small and short, and many test a peptide mixed with other ingredients.",
    ratings: [
      {
        subject: "Topical peptide products for hair loss (GPIGS, acetyl tetrapeptide-3 and similar)",
        level: "limited",
        why: "Small randomised trials report improvements: 22 men for 4 months with a penta-peptide lotion, 30 volunteers for 4 months with a plant extract plus peptide, and 32 people for 24 weeks with a herbal-and-peptide mix that matched 3% minoxidil with no placebo arm. A 2026 systematic review of 14 trials graded the recommendation B for some peptide formulations, but its abstract gives no sample sizes or effect sizes, and several products combine a peptide with other ingredients.",
      },
      {
        subject: "Injected peptide formulations in the scalp (QR678 and similar)",
        level: "limited",
        why: "One single-blind randomised trial of 112 men found better regrowth and density when QR678 Neo was added to a hair transplant than with a conventional transplant, with no placebo injection. A 2026 systematic review of injected treatments says the evidence is limited by small studies, varied methods and short follow-up, and that randomised trials are needed.",
      },
      {
        subject: "Oral collagen peptides for hair",
        level: "limited",
        why: "A 24-week placebo-controlled trial in 114 women reported a rise in hair shaft diameter, a 24-week trial in people with damaged hair but no hair loss reported better gloss and elasticity, and an 83-person trial found a collagen-and-amino-acid tablet added to drug treatment beat drugs alone. The last had no placebo, used a mixed supplement and was written by employees of its maker. No trial of collagen alone in hair loss is summarised.",
      },
      {
        subject: "Thymosin beta-4 (TB-500 is a related, distinct fragment)",
        level: "preclinical",
        why: "Rat and mouse experiments, and a review of animal work including cashmere goats, report that thymosin beta-4 speeds hair growth. We summarise no human hair trial of it, and no hair study of TB-500, which a 2026 orthopaedic review describes as a distinct seven-amino-acid fragment that is not validated as equivalent to thymosin beta-4.",
      },
      {
        subject: "BPC-157",
        level: "none",
        why: "Our PubMed search for BPC-157 together with hair-loss terms found no study. That is not proof none exists.",
      },
    ],
    gaps: [
      "No head-to-head trial of a peptide against finasteride or minoxidil, apart from one 32-person trial against minoxidil with no placebo.",
      "The abstracts of the topical and injected trials rarely give concentrations or group sizes, so a shop product cannot be matched to a trial.",
      "Hair loss reported with GLP-1 weight-loss drugs is summarised in the weight topic (Cheng 2026), not rated here.",
      "Biotin, minerals and other non-peptide supplements for hair are outside this site's scope.",
    ],
    reviewedOn: "2026-11-11",
  },
  muscle: {
    slug: "muscle",
    measures: "benefit",
    title: "Peptides for muscle & strength",
    intro:
      "Muscle claims cover a wide range, from collagen powder to injectable growth-hormone-releasing compounds. The human evidence is best for collagen peptides taken alongside resistance training, and even there the trials are of mixed quality and nearly all participants were also training.",
    ratings: [
      {
        subject: "Oral collagen peptides with resistance training: fat-free mass",
        level: "consistent",
        why: "A 2024 meta-analysis of 19 trials (768 healthy adults) favoured collagen for fat-free mass, with moderate certainty, and three randomised trials in older men, middle-aged men and premenopausal women each found a larger gain than placebo. Everyone trained, so it shows collagen as an add-on to exercise, and fat-free mass is not the same as muscle.",
      },
      {
        subject: "Oral collagen peptides with resistance training: strength",
        level: "mixed",
        why: "The meta-analysis found a small strength effect (0.19) with low certainty. Gains in hand-grip, quadriceps and leg strength appeared in some trials but were not significant between groups in others.",
      },
      {
        subject: "Collagen peptides compared with whey protein",
        level: "limited",
        why: "One small trial of 22 young adults found whey increased muscle thickness more than leucine-matched collagen, with similar strength gains. An exploratory comparison in a trial of 97 men found no significant difference between whey and collagen. Neither shows collagen is as good as whey.",
      },
      {
        subject: "Fish protein hydrolysate (oral marine peptides)",
        level: "limited",
        why: "Two small crossover studies. One found fish hydrolysate raised blood amino acids after exercise about as much as whey hydrolysate, which measures digestion rather than muscle gain. The other found no benefit for recovery between two cycling sessions, and was funded by a company with an interest in the product.",
      },
      {
        subject: "Oral ghrelin mimetic MK-677 (ibutamoren)",
        level: "limited",
        why: "Two randomised trials in older people. One in 65 healthy adults found a 1-year gain in fat-free mass with no change in strength or function, and higher fasting glucose and cortisol. A trial in 123 hip-fracture patients found mixed results on function and was stopped early because of a congestive-heart-failure signal. It is taken by mouth and is not an injectable peptide.",
      },
      {
        subject: "Tesamorelin (approved for abdominal fat in HIV)",
        level: "limited",
        why: "Randomised trials are in people with HIV and extra abdominal fat. A meta-analysis of 5 trials found lean body mass up 1.42 kg alongside lower visceral and liver fat, and an exploratory analysis found small increases in trunk muscle area and density. It reports no strength measure, and we found no trial in healthy people training for muscle.",
      },
      {
        subject: "Ipamorelin and CJC-1295",
        level: "none",
        why: "Our PubMed searches found no controlled trial of either with a muscle, strength or body-composition outcome. Small studies in healthy volunteers show CJC-1295 raised growth hormone and IGF-I for weeks and ipamorelin triggers a brief growth hormone release, and ipamorelin's one placebo-controlled trial (after bowel surgery) found no significant benefit. A higher hormone level is not evidence of more muscle.",
      },
      {
        subject: "Injected growth hormone itself in healthy adults (context for these peptides)",
        level: "mixed",
        why: "Two systematic reviews found lean body mass up about 2 kg, but no clear strength gain in young fit adults and more swelling, joint pain and blood-sugar problems. This tests growth hormone directly, not the peptides that stimulate its release, so it does not show what they do.",
      },
      {
        subject: "BPC-157 and other research peptides",
        level: "preclinical",
        why: "Reviews conclude the claimed muscle and recovery benefits are not substantiated by human trials, and a 2026 sports-medicine review lists BPC-157 as investigational. Most evidence is from animals.",
      },
    ],
    gaps: [
      "Collagen trials in women and in people who do not train are scarce in what we have summarised.",
      "Most collagen trials came from a small number of research groups, and funding is stated unevenly.",
      "No trial of oral marine peptides for muscle growth or strength over weeks of training was found.",
      "Our searches for sermorelin found no controlled trial, but we did not search as widely as for the others, so it is not rated.",
      "We did not find or summarise trials of growth-hormone secretagogues other than MK-677, ipamorelin and CJC-1295 (for example GHRP-2, GHRP-6 or hexarelin).",
    ],
    reviewedOn: "2026-11-10",
  },
  joints: {
    slug: "joints",
    measures: "benefit",
    title: "Peptides for joints & tendons",
    intro:
      "Joint and tendon claims range from collagen supplements for osteoarthritis, sports-related knee pain and tendon problems to injected BPC-157 and TB-500 for injuries. The human evidence is stronger for collagen than for the injectables, but even for collagen the trials disagree.",
    ratings: [
      {
        subject: "Oral collagen for osteoarthritis symptoms",
        level: "mixed",
        why: "A 2019 meta-analysis of randomised trials found lower total WOMAC and pain scores than placebo but no difference on the WOMAC pain and function subscores. A 2025 update pooled 11 trials (870 people) and favoured collagen for both pain and function, but with large differences between trials (I² of 75% and 88%). A 68-patient trial of a hydrolysed-plus-UC-II tablet found no difference from placebo at 12 weeks.",
      },
      {
        subject: "Oral collagen peptides for exercise-related knee and joint pain (no arthritis)",
        level: "mixed",
        why: "Two 12-week trials of about 180 people each (one in 18 to 30-year-olds, one in adults with knee and hip pain) and a 24-week athletes trial reported less pain than placebo, though in the first the placebo group's pain also fell by about two-thirds as much. A 167-person trial in people with a median age of 63 found no difference. Two of the positive trials have authors with ties to a collagen-peptide maker.",
      },
      {
        subject: "Oral collagen for tendon problems (tendinopathy)",
        level: "limited",
        why: "One 20-patient pilot crossover trial of collagen peptides with calf-strengthening exercise in Achilles tendinopathy reported larger symptom-score gains while on collagen, and was funded by Gelita AG. A 2022 systematic review calls the supplement studies promising but says high-quality studies are scarce and no firm recommendation can be made.",
      },
      {
        subject: "Undenatured type II collagen (UC-II, not a peptide) for knee osteoarthritis",
        level: "mixed",
        why: "A 191-person trial reported lower WOMAC scores than placebo and than glucosamine plus chondroitin after 180 days, while a 68-patient trial of UC-II combined with hydrolysed collagen found no difference from placebo at 12 weeks. UC-II is a whole protein in a small dose, not a collagen peptide.",
      },
      {
        subject: "Oral marine (fish-derived) collagen peptides for joints and tendons",
        level: "none",
        why: "Our PubMed searches on 9 November 2026 found laboratory and biomaterial studies of fish collagen for cartilage and bone, but no controlled human trial of swallowing marine collagen peptides for joint or tendon problems.",
      },
      {
        subject: "BPC-157 for tendon, ligament and joint problems",
        level: "preclinical",
        why: "Reviews describe mostly animal evidence, and a 2026 rat study of Achilles tendon repair found BPC-157 gave numerically better but non-significant results. A 2026 systematic review found only three small uncontrolled human studies (30 people in all, one a retrospective review of 16 knee-pain patients), judged them poor quality with very low certainty, and found no randomised trial; a 2026 orthopaedic review likewise found no controlled human evidence.",
      },
      {
        subject: "TB-500 for tendon and ligament injury",
        level: "preclinical",
        why: "In a 2026 rat model of a cut Achilles tendon, TB-500 gave stronger tendons and better microscopic scores than no treatment. The rat study calls TB-500 synthetic thymosin beta-4, while a 2026 orthopaedic review describes it as a distinct fragment with no validated equivalence, and says human experience with thymosin beta-4 comes from eye, skin and heart uses that cannot establish effects on tendons or joints. We summarise no human trial of TB-500 for tendons or joints.",
      },
    ],
    gaps: [
      "Collagen trials in other joints, bone density and cartilage imaging are not summarised here.",
      "Glucosamine, chondroitin, hyaluronic acid and other non-peptide supplements are outside this site's scope.",
      "We did not search for trials comparing collagen with exercise, physiotherapy or anti-inflammatory drugs.",
      "Several trial abstracts give no funding statement; where they do, two of the positive trials have ties to a collagen-peptide maker.",
    ],
    reviewedOn: "2026-11-11",
  },
  "blood-pressure": {
    slug: "blood-pressure",
    measures: "benefit",
    title: "Marine peptides for blood pressure & vessels",
    intro:
      "Some peptides from fish are claimed to lower blood pressure by blocking an enzyme (ACE) that tightens blood vessels. The human trials are few and small, and they tested different products.",
    ratings: [
      {
        subject: "Valyl-tyrosine, a defined sardine-derived peptide",
        level: "limited",
        why: "One small randomised trial (29 people, 4 weeks) found blood pressure fell by roughly 9 mm Hg systolic and 5 mm Hg diastolic against no change on placebo, with blood markers consistent with ACE inhibition. Nothing else in this hub replicates it.",
      },
      {
        subject: "Marine collagen peptides added to usual care in type 2 diabetes with hypertension",
        level: "limited",
        why: "One randomised trial in 100 patients found lower diastolic and mean arterial pressure plus better blood sugar and cholesterol over three months. Patients stayed on their usual medicines, and the abstract gives no dose.",
      },
      {
        subject: "Fish protein hydrolysate and blood-vessel function in healthy adults",
        level: "limited",
        why: "A single 20 g dose in nine people did not improve endothelium-dependent dilation, while whey hydrolysate did. It says nothing about blood pressure or longer use.",
      },
    ],
    gaps: [
      "No large or long randomised trial of a marine peptide supplement for blood pressure is summarised here.",
      "The hub does not yet cover the animal and laboratory work on ACE-inhibitory fish peptides.",
    ],
    reviewedOn: "2026-11-09",
  },
  brain: {
    slug: "brain",
    measures: "benefit",
    title: "Peptides for sleep, memory & stress",
    intro:
      "Peptides are promoted for sleep (DSIP, casein and fish hydrolysates, collagen taken at bedtime, epitalon), memory and stress (fish hydrolysate, selank). The human studies are small, the oral-product trials often have ties to a company with an interest in the product, and several found no difference from placebo. The DSIP trials are decades old and injected, and the selank trials are older, small and had no placebo group.",
    ratings: [
      {
        subject: "Fish hydrolysate for sleep quality",
        level: "limited",
        why: "A four-week crossover trial found sleep scores improved from baseline, but there was no significant difference between fish hydrolysate and placebo. The trial was fully sponsored by Abyss Ingredients, and two authors disclose a commercial interest.",
      },
      {
        subject: "Casein hydrolysate (Lactium) for sleep",
        level: "limited",
        why: "A 36-person, 4-week trial in chronic insomnia reported a larger fall in one sleep-disorder score and a shorter time to fall asleep on polysomnography than placebo, though most improvements were changes from baseline. A 40-person, 8-week trial of Lactium combined with L-theanine found no difference on the main sleep questionnaires, only on some diary measures, so the peptide's own effect cannot be separated.",
      },
      {
        subject: "Collagen peptides before bed for sleep",
        level: "limited",
        why: "One crossover trial in 13 active men with sleep complaints found fewer awakenings with 15 g of collagen peptides before bed, with no change in sleep length, onset or efficiency. A 2026 scoping review found only a handful of collagen trials with sleep outcomes, and trials against alpha-lactalbumin did not show collagen to be better.",
      },
      {
        subject: "DSIP (delta sleep-inducing peptide) for insomnia",
        level: "limited",
        why: "A few small injected-DSIP trials from 1987 to 1992 disagree: one in 14 patients with severe chronic insomnia reported substantial improvement, while a 16-patient trial and a crossover trial found weak or clinically insignificant effects. A 2006 review calls the case for DSIP as a sleep factor extremely poorly documented. Our searches found no modern trial and none of an oral or nasal product.",
      },
      {
        subject: "Epitalon for sleep",
        level: "none",
        why: "Our PubMed searches found no human trial of epitalon with a sleep outcome. A 2026 review says its human evidence is limited to small physiological or biomarker studies and that it is biologically active but clinically unproven.",
      },
      {
        subject: "Fish hydrolysate for memory in older adults",
        level: "limited",
        why: "One 3-month trial in 53 adults aged 60–73 with lower-than-average memory scores found better episodic memory than placebo. The product also contained omega-3 fatty acids, and two authors are funded by Abyss Ingredients.",
      },
      {
        subject: "Fish-peptide supplement (with magnesium and B6) for anxiety",
        level: "limited",
        why: "A single-arm study with no control group reported lower anxiety scores over 28 days. It cannot separate the supplement from placebo or natural recovery, and three authors work for Laboratoire Dielen.",
      },
      {
        subject: "Selank for anxiety disorders",
        level: "limited",
        why: "Three small Russian-language trials in 60 to 70 patients compared selank with benzodiazepines (medazepam, phenazepam) or added it to one, and none used a placebo. The authors report similar anxiolytic effect to medazepam and fewer side effects when selank was added to phenazepam. The abstracts give no scores or doses.",
      },
    ],
    gaps: [
      "No independently funded randomised trial of a marine peptide supplement for sleep, memory or stress is summarised here.",
      "We found no placebo-controlled human trial of selank. Semax, which has trial-type records in PubMed, is not covered here yet.",
      "We did not search for trials comparing any of these with melatonin, sleep hygiene or cognitive behavioural therapy for insomnia.",
      "Glycine and other amino acids, melatonin and herbal sleep aids are outside this site's scope.",
    ],
    reviewedOn: "2026-11-11",
  },
  immune: {
    slug: "immune",
    measures: "benefit",
    title: "Peptides for immune function & inflammation",
    intro:
      "Extracts and peptides from the thymus, the gland where T cells mature, are marketed to support or 'boost' immunity. The studies in this hub are a Cochrane review in cancer patients, trials and meta-analyses of thymosin alpha-1 given by injection in hospital and clinic patients (sepsis, pancreatitis, COVID-19, COPD flare-ups, hepatitis B), a 2024 advocacy-style review, a 1999 narrative review and two animal experiments. The page also holds KPV, a three-amino-acid fragment promoted for inflammation, for which we found only laboratory, animal and review papers. It is about thymus-derived and similar products, not oral marine peptides, for which our search found no human immune trials (see the oral marine peptides page).",
    ratings: [
      {
        subject: "Thymus extracts added to cancer treatment",
        level: "mixed",
        why: "A Cochrane review pooled 20 randomised trials of purified thymus extracts. It found no benefit for survival or tumour response, but fewer severe infections during chemotherapy or radiotherapy, a result the authors call preliminary. Most trials had at least a moderate risk of bias.",
      },
      {
        subject: "Thymosin alpha-1 added to cancer treatment",
        level: "limited",
        why: "The same review found a trend toward longer survival with synthetic thymic peptides such as thymosin alpha-1 (risk ratio 1.21; 95% CI 0.94 to 1.56), but it did not reach statistical significance and rests on few trials.",
      },
      {
        subject: "Thymalin and engineered thymosin alpha-1 in animals",
        level: "preclinical",
        why: "In rats, low-dose Thymalin slowed or reversed a transplanted tumour. In mice, a long-acting engineered form of thymosin alpha-1 (joined to an antibody fragment) slowed two tumour models and raised T-cell numbers. Neither was tested in people, and the second is a different molecule from thymosin alpha-1.",
      },
      {
        subject: "Injected thymosin alpha-1 for sepsis",
        level: "mixed",
        why: "An earlier trial of 361 patients with severe sepsis found fewer deaths at 28 days on thymosin alpha-1 (26% vs 35%), but the result was borderline and the interval included no effect. A later placebo-controlled trial of 1,106 adults found no difference (23.4% vs 24.1%). Both were run in China and both gave the peptide as hospital treatment.",
      },
      {
        subject: "Injected thymosin alpha-1 for severe acute pancreatitis",
        level: "mixed",
        why: "A 508-patient placebo-controlled trial found no reduction in infected pancreatic necrosis. A meta-analysis of five trials (706 patients) found fewer infections outside the pancreas and better T-cell counts, with the authors asking for more research. The two do not clearly agree.",
      },
      {
        subject: "Injected thymosin alpha-1 for COVID-19",
        level: "limited",
        why: "A meta-analysis of eight studies reports lower mortality (risk ratio 0.59), but with very high variation between studies, and its authors say randomised trials are needed.",
      },
      {
        subject: "Injected thymosin alpha-1 added to usual care in COPD flare-ups",
        level: "consistent",
        why: "A meta-analysis of 39 randomised trials (3,329 patients) found better lung function and blood gases, a shorter hospital stay and higher CD4 T-cell counts than routine treatment alone, and an 84-patient placebo-controlled trial found better oxygen levels and lung function after 4 weeks. The abstracts do not describe trial quality or give survival or flare-up outcomes, the authors ask for more high-quality trials, and the evidence comes from hospital treatment of flare-ups, not prevention.",
      },
      {
        subject: "Injected thymosin alpha-1 for hepatitis B",
        level: "mixed",
        why: "Open-label trials in hepatitis B-related liver failure report better transplant-free survival at 90 days (75% vs 53% in 120 patients; a later 73-patient trial also reports a significant survival gain without giving figures), though a competing-risk analysis of the first found no significant survival difference. In cirrhosis, a meta-analysis of seven trials found an early advantage over entecavir alone that was gone by 48 to 52 weeks, a 690-patient trial found no difference in decompensation, liver cancer or death, and a small trial of 51 patients found no benefit from adding it to peginterferon.",
      },
      {
        subject: "KPV (anti-inflammatory tripeptide) for gut and skin inflammation",
        level: "preclinical",
        why: "A 2008 study found KPV reduced inflammatory signalling in human cell lines and lowered colitis in mice, and a 2016 mouse study found it prevented colitis-associated cancer. A 2019 review proposes it for skin wounds. Our PubMed searches found no human trial of KPV.",
      },
      {
        subject: "Thymosin alpha-1 as an adjunct to influenza vaccine in older adults",
        level: "limited",
        why: "One 2007 article by researchers in the field summarises trials and says vaccine responses were enhanced in animals and people, but its abstract gives no trial sizes or numbers and no clinical outcome such as fewer infections. We did not find or summarise the underlying trials.",
      },
      {
        subject: "Thymus extracts or peptides for infection prevention, allergies and healthy adults",
        level: "unassessed",
        why: "None of the trials summarised here tests these uses, and none tests an oral or over-the-counter thymus product. This is a gap in our coverage, not a finding that no trial exists.",
      },
    ],
    gaps: [
      "The Cochrane review's searches ended in February 2010. Later cancer-care trials of thymosin alpha-1 are not summarised here.",
      "The hepatitis B and COPD entries cover some, not all, of the trials we found. Trials in hepatitis C, melanoma and other conditions are not summarised, and the vaccine-response rating rests on a single summary article, not the trials themselves.",
      "The recent thymosin alpha-1 trials here are of hospital or clinic treatment, mostly by injection. None tests an oral or over-the-counter thymus product, and the sepsis and pancreatitis results do not transfer to healthy people.",
      "Several of the trials report grants or fees from SciClone Pharmaceuticals; see each study page for the stated funding.",
      "Legal and regulatory status, including thymosin alpha-1, is not part of these ratings; it has its own dated page (see Legal status).",
    ],
    reviewedOn: "2026-11-10",
  },
  weight: {
    slug: "weight",
    measures: "benefit",
    title: "Weight loss & GLP-1 drugs",
    intro:
      "GLP-1-based drugs such as semaglutide and tirzepatide are peptides, and they are the best-tested peptides for weight loss by a wide margin. They are prescription medicines tested in large, industry-funded trials, and they are a different category from the supplements and unapproved injectables marketed as peptides for weight loss. Most of the lost weight returns after stopping: in the semaglutide extension participants regained about two-thirds within a year, and a 2026 meta-analysis found significant rebound that varied by drug.",
    ratings: [
      {
        subject: "Prescription semaglutide and tirzepatide for weight loss",
        level: "consistent",
        why: "Large placebo-controlled trials found average weight loss of 14.9% with semaglutide 2.4 mg over 68 weeks and up to 20.9% with tirzepatide over 72 weeks, versus 2.4% and 3.1% on placebo. A 2026 network meta-analysis of 262 trials found moderate-to-high-certainty weight loss at one year. The trials were funded by the manufacturers and stopped treatment more often because of side effects than placebo did.",
      },
      {
        subject: "Semaglutide and cardiovascular events in adults with heart disease and obesity",
        level: "consistent",
        why: "One trial of 17,604 adults with existing cardiovascular disease found fewer heart attacks, strokes and cardiovascular deaths on semaglutide (6.5% vs 8.0%), and the 2026 network meta-analysis found lower all-cause mortality for subcutaneous semaglutide, largely informed by that kind of trial. It does not show the same benefit for people without heart disease.",
      },
      {
        subject: "Muscle (lean mass) during GLP-1 treatment",
        level: "mixed",
        why: "A meta-analysis of seven trials found lean mass rose as a share of body weight but fell by 1.74 kg in absolute terms, with very high variation between studies, and a network meta-analysis found tirzepatide cut lean mass by 8.3% as well as fat. None of the studies summarised here tests whether exercise or diet prevents the loss.",
      },
      {
        subject: "Non-prescription and unapproved peptides sold for weight loss (including MOTS-c and others)",
        level: "unassessed",
        why: "We have not summarised any trial of these, so we do not rate them. FDA's advisory committee considered MOTS-c for obesity in July 2026. This is a gap in our coverage, not a finding that trials exist or do not.",
      },
    ],
    gaps: [
      "We have not summarised the trials of the other prescription weight-loss drugs in the network meta-analysis, or trials in teenagers and in people with diabetes.",
      "We have not searched for or summarised trials of non-prescription peptide supplements or unapproved injectables for weight loss.",
      "Most trials are funded by the drug makers and run for 1 to 3 years, and the long-term safety of staying on these drugs for life is not covered here.",
      "Compounded and unapproved GLP-1 products are a regulatory and safety topic, not a trial topic; see FDA's warning linked on the weight-loss page.",
    ],
    reviewedOn: "2026-11-10",
  },
  "womens-health": {
    slug: "womens-health",
    measures: "benefit",
    title: "Peptides for women: desire, bone, PCOS & menopause",
    intro:
      "Most peptide research does not split results by sex, so this topic covers only outcomes specific to women: low sexual desire, bone loss after menopause, polycystic ovary syndrome (PCOS) and menopausal symptoms. Skin, hair, joints and sleep, which women also search for, are rated on their own topic pages.",
    ratings: [
      {
        subject: "Bremelanotide (Vyleesi) for low sexual desire in premenopausal women",
        level: "consistent",
        why: "Two identical 24-week placebo-controlled trials in 1,267 premenopausal women found higher desire scores (0.35 points) and lower distress (0.33 points) than placebo, and a 2026 meta-analysis agreed. Nausea, flushing and headache were common, and nausea was the usual reason to stop. A 2024 re-analysis argues the scales are poorly validated and the benefit small, so the effect is real in the statistics but modest and debated.",
      },
      {
        subject: "GLP-1 drugs (liraglutide, semaglutide) for weight in women with PCOS",
        level: "consistent",
        why: "A 2026 meta-analysis of 11 randomised trials found a BMI drop of 1.38 kg/m² more than controls (low certainty), a 32-week placebo-controlled trial of 82 women found 5.7% weight loss against 1.4%, and a 16-week open-label trial of 100 women found 6.1 kg lost with semaglutide plus metformin against 2.3 kg with metformin. These are prescription drugs and the gains are modest.",
      },
      {
        subject: "GLP-1 drugs for periods, hormones and fertility in PCOS",
        level: "limited",
        why: "The meta-analysis found evidence too thin to judge hirsutism or menstrual regularity and found no benefit on LDL cholesterol or triglycerides. Single trials report a lower free androgen index with liraglutide and a higher natural pregnancy rate (35% against 15%) after semaglutide plus metformin, but the second was open-label and secondary to weight.",
      },
      {
        subject: "Oral collagen peptides for bone density after menopause",
        level: "mixed",
        why: "A 12-month trial in 131 postmenopausal women found small gains in spine and hip bone density over placebo, and an uncontrolled 4-year follow-up of 31 of them agreed. Two trials of about six months found no change in blood markers of bone turnover versus placebo. A 2026 scoping review of 15 studies called the evidence promising but inconsistent. No study here shows fewer fractures.",
      },
      {
        subject: "Peptides or collagen for menopausal symptoms (hot flushes, mood, sleep)",
        level: "none",
        why: "Our PubMed search on 12 November 2026 for peptide or collagen trials with hot-flush or menopause-symptom outcomes found none. That is not proof none exists.",
      },
      {
        subject: "Unapproved injectable peptides in pregnancy or breastfeeding",
        level: "unassessed",
        why: "We have not summarised any study of these, so we do not rate them. One quick PubMed search found no safety data, but it was narrow. This is a gap in our coverage, not a finding that they are safe.",
      },
    ],
    gaps: [
      "Almost all peptide trials report men and women together without splitting results, so a result may not apply to women. We rate only trials of women or outcomes specific to women.",
      "Bremelanotide trials enrolled premenopausal women only (mean age 39), mostly white and from US sites; we did not search for trials in postmenopausal women.",
      "Fertility, IVF, endometriosis and hormone-therapy outcomes were not searched; a single quick search for kisspeptin trials found nothing relevant to rate.",
      "Collagen bone trials measure bone density or blood markers; none of the studies here counted fractures.",
      "Pregnancy and breastfeeding safety of research peptides was searched only narrowly and is not rated.",
    ],
    reviewedOn: "2026-11-12",
  },
  "mens-health": {
    slug: "mens-health",
    measures: "benefit",
    title: "Peptides for men: testosterone, erections & fertility",
    intro:
      "Most peptide studies report men and women together, so this topic covers only outcomes specific to men: testosterone, erectile function and semen quality. Muscle, hair and weight, which men also search for, are rated on their own topic pages.",
    ratings: [
      {
        subject: "GLP-1 drugs (semaglutide, liraglutide, tirzepatide) for testosterone in men with obesity-related low testosterone",
        level: "limited",
        why: "Two systematic reviews agree that these drugs raise total testosterone in men with obesity, type 2 diabetes or functional hypogonadism (by 2.5 to 5.2 nmol/L in one), and a 25-man trial found better sperm morphology than with testosterone injections. But the randomised trials had only 12 to 42 men and ran 12 to 24 weeks, and the authors say the rise is largely a result of weight loss, not a direct hormonal effect. These are prescription drugs.",
      },
      {
        subject: "Bremelanotide (PT-141) for erectile dysfunction in men",
        level: "limited",
        why: "One randomised trial of 342 men who had not responded to sildenafil found a positive result in 33.5% on an intranasal spray against 8.5% on placebo, with more side effects, and a 2003 summary reported dose-dependent erections in a few men. The trial's counts do not add up to the numbers randomised, and the abstract defines no endpoint. We found no more recent trial in men.",
      },
      {
        subject: "Kisspeptin-10 for raising testosterone",
        level: "limited",
        why: "In 15 healthy men, timed kisspeptin-10 infusions raised luteinising hormone, follicle-stimulating hormone and testosterone, and daily 8-hour infusions kept gonadotropins up for 12 days. It measured hormone levels only, in men without a hormone problem, and used pump infusions; no benefit to symptoms, muscle, sexual function or fertility was tested.",
      },
    ],
    gaps: [
      "GLP-1 drugs and erectile function: two records-based studies point in opposite directions. Obese non-diabetic men prescribed semaglutide had more erectile dysfunction diagnoses than matched men (1.47% against 0.32%), while men with type 2 diabetes on tirzepatide had fewer than on other diabetes drugs. These are database associations, not trials, so we cite them but do not rate them.",
      "Gonadotropins such as hCG, and non-peptide drugs such as enclomiphene or testosterone itself, are used for male low testosterone but were outside this search.",
      "We did not search prostate health, hair loss in men beyond the hair topic, or longevity and 'anti-aging' claims.",
      "Several of the studies are small or short, and the kisspeptin and bremelanotide results come from single groups.",
      "Peptides for muscle, hair and weight are rated on the muscle, hair and weight topic pages.",
    ],
    reviewedOn: "2026-11-12",
  },
  gut: {
    slug: "gut",
    measures: "benefit",
    title: "Peptides for gut health & digestion",
    intro:
      "Gut health covers very different problems, so ratings here are by condition. The best-evidenced peptides are prescription drugs for specific diagnoses (constipation with irritable bowel syndrome, short bowel syndrome). Supplements and research peptides sold for 'gut healing' have far less human evidence.",
    ratings: [
      {
        subject: "Linaclotide and plecanatide (prescription) for IBS with constipation and chronic constipation",
        level: "consistent",
        why: "Meta-analyses of placebo-controlled trials agree: linaclotide beat placebo in 1,773 people with IBS-C (risk ratio for non-response 0.80 on the FDA endpoint), and plecanatide gave about 1.4 more bowel movements a week and better stool consistency across 6,319 people. Diarrhoea is the main side effect, and a network meta-analysis of 33 trials ranked other drugs (laxatives, prucalopride) at or above them.",
      },
      {
        subject: "GLP-2 drugs (teduglutide and others) for short bowel syndrome",
        level: "consistent",
        why: "A 2024 network meta-analysis of 23 trials in 843 patients found teduglutide raised blood citrulline at every dose against controls with no significant extra safety problems, and a 2022 meta-analysis of ten studies found 64% to 82% of intravenous-nutrition-dependent adults cut their parenteral support by at least a fifth. This is a rare, serious condition treated under specialist care; the trials are small and the headline outcomes include blood markers.",
      },
      {
        subject: "Larazotide acetate (investigational) for coeliac disease",
        level: "mixed",
        why: "A 2022 meta-analysis of four trials in 626 people found no change in a lab test of gut leakiness, and symptom gains only in people eating gluten as a challenge, not in those on a gluten-free diet. We found reports that a phase 3 trial was discontinued after an interim analysis. It is not something to buy as a supplement.",
      },
      {
        subject: "Fish and milk protein hydrolysates for IBS symptoms",
        level: "limited",
        why: "Two small trials disagree. In 28 people, 2.5 g of cod protein hydrolysate for six weeks did no better than placebo on IBS severity. In a 10-day crossover of about 41 people, a partly hydrolysed milk protein drink lowered symptom scores more than an ordinary one, but no blood or urine marker differed, and dairy-industry employees are among the authors.",
      },
      {
        subject: "BPC-157 for gut conditions (ulcers, colitis, fistulas)",
        level: "preclinical",
        why: "Rat experiments, summarised in two reviews that share authors, describe healing of gut joins and fistulas. A 2012 review mentions a phase II programme (PL 14736) but gives no results, and we found no controlled human trial of BPC-157 for a gut condition in PubMed.",
      },
      {
        subject: "KPV for colitis",
        level: "preclinical",
        why: "Cell and mouse studies show less inflammation and less colitis in two chemically induced models, and a mouse study found KPV prevented colitis-associated cancer in normal mice. We found no human trial; our searches are noisy because KPV also abbreviates other terms.",
      },
      {
        subject: "Oral collagen peptides for gut health, bloating or gut barrier",
        level: "none",
        why: "Our PubMed searches on 12 November 2026 for human trials of collagen peptides with gut-health outcomes found none (the searches returned mostly unrelated records). That is not proof none exists.",
      },
    ],
    gaps: [
      "GLP-1 drugs for weight and diabetes also act on the gut and cause gallstones and reflux more often than placebo (Chiang 2025). That is a side effect, not a benefit, so it is cited on the page but not rated here.",
      "We did not search other approved peptide drugs for the gut (for example octreotide, secretin or the newer once-weekly GLP-2 analogues beyond what the network meta-analysis covers) or trials in inflammatory bowel disease.",
      "Probiotics, glutamine, colostrum and lactoferrin are sold for gut health but are not peptides in the sense used here, so they were not searched.",
      "Prescription trials are funded by the drug makers in several cases; we report funding for each study on its page.",
      "The collagen and BPC-157 'none' and 'preclinical' ratings rest on narrow PubMed searches.",
    ],
    reviewedOn: "2026-11-12",
  },
  "oral-peptides": {
    slug: "oral-peptides",
    measures: "benefit",
    title: "Oral peptides: do they get absorbed?",
    intro:
      "Most peptides are broken down by digestive enzymes and cross the gut wall poorly, which is why many peptide drugs are injected. This topic covers the two questions behind 'do oral peptides work': does a swallowed peptide reach the blood, and do the oral products that exist have trial evidence. Ratings for individual uses (skin, sleep, blood pressure, gut) are on their own topic pages.",
    ratings: [
      {
        subject: "Oral semaglutide tablet (a peptide drug with an absorption enhancer) for weight loss",
        level: "consistent",
        why: "A 667-adult, 68-week placebo-controlled phase 3 trial found weight fell 15.1% on 50 mg a day against 2.4% on placebo, with gut side effects in 80% against 46%. It works because the tablet contains an absorption enhancer (SNAC) that lets the peptide be absorbed in the stomach; the tablet's mechanism is specific to that drug. The trial was funded by Novo Nordisk, and the dose is much higher than the diabetes dose.",
      },
      {
        subject: "Dietary collagen peptides: do fragments reach the blood after swallowing?",
        level: "limited",
        why: "Three small human studies found collagen-derived peptides (Pro-Hyp, Gly-Pro-Hyp) and collagen-rich amino acids rise in blood or urine after swallowing gelatin or collagen hydrolysates, at doses of 9.4 to 23 g and 35 g where stated, and an enzymatically pre-digested product was absorbed faster in ten men. None measured a health benefit, and none says how much of a few-gram supplement dose is absorbed.",
      },
      {
        subject: "Pürblack's oral targeted peptide capsules (Muscle+, Joint+, Vascular+ and related products)",
        level: "limited",
        why: "Pürblack's materials describe natural food-derived peptides taken as capsules and absorbed through the PepT1 transporter, and cite three 2019 papers (Ivko and colleagues) for its muscle, joint and vascular peptides. In the muscle paper, 77 men aged 30 to 58 took 50, 100 or 150 µg a day in 30-day courses for six months, and muscle mass and strength rose at 100 and 150 µg against their own starting values. There was no placebo group, the group sizes are given inconsistently, and the 4.5-fold rise in alpha-actinin-3 was measured in cultured human embryonic cells, not in men. The papers are in journals we could not find in PubMed, and the materials give no measurement of how much of the peptides is absorbed.",
      },
    ],
    gaps: [
      "Two reviews (2021, 2022) say oral peptide delivery still faces low-to-single-digit oral bioavailability even with the best technologies; they concern peptide drugs, and the abstracts give no figures.",
      "We did not search for absorption studies of BPC-157, thymosin, GH-axis or other research peptides taken by mouth, and found no human trial of them in our earlier searches for those peptides.",
      "We did not search other approved oral peptide drugs beyond oral semaglutide and the gut drugs linaclotide and plecanatide.",
      "Absorption into the blood is not evidence of benefit; the use-specific topic pages rate benefit.",
      "Safety and product testing are described on the oral peptides page for each entry, not rated here.",
    ],
    reviewedOn: "2026-11-12",
  },
  safety: {
    slug: "safety",
    measures: "safety",
    title: "Peptide safety & regulation",
    intro:
      "Peptides range from approved prescription drugs to unapproved compounds sold with little oversight. Safety evidence follows the same split.",
    ratings: [
      {
        subject: "BPC-157 (unapproved)",
        level: "limited",
        why: "Human safety data amount to three small uncontrolled studies totalling 30 people (one a two-person intravenous pilot), which a 2026 systematic review judged poor quality with very low certainty. Reviews call it investigational, say it has no validated dosing or human pharmacokinetics, and warn of risks from unregulated manufacturing and contamination.",
      },
      {
        subject: "Other unapproved research peptides (CJC-1295, ipamorelin, MK-677, TB-500 and others)",
        level: "limited",
        why: "Three recent reviews say rigorous human safety data are scarce. One documents cardiovascular and metabolic risks, naming MK-677 and congestive heart failure; another lists contamination, impurities and inaccurate dosing as risks of the unregulated injectable market. A 2026 endocrinology review of growth-hormone-axis peptides lists raised prolactin and cortisol, dysglycaemia, fluid retention and muscle or joint pain as reported effects. In a 1-year randomised trial in older adults, MK-677 raised fasting glucose and lowered insulin sensitivity.",
      },
      {
        subject: "Oral collagen peptides (general tolerability)",
        level: "limited",
        why: "A 2026 systematic review of 25 randomised trials, mostly in healthy volunteers, reports that hydrolysed collagen was generally well tolerated with a low rate of adverse events. The trials were designed to measure benefit, most were rated at high risk of bias, and no long-term or dedicated safety study is summarised here.",
      },
      {
        subject: "Fish-derived collagen for people with fish allergy",
        level: "limited",
        why: "A case report describes anaphylaxis in a 9-year-old with fish allergy after fish-collagen gummy tablets, confirmed by a challenge test, and a laboratory study found heating does not remove fish collagen's reactivity with allergic patients' antibodies. These show a risk exists for people with fish allergy; they do not say how common it is.",
      },
    ],
    gaps: [
      "Legal and regulatory status is not part of these ratings; it has its own dated page (see Legal status).",
      "Contaminants (heavy metals, microbes) in collagen and marine peptide supplements: we found no study, so the supplements' product quality is not rated here. See the COA guide for how to check a specific batch.",
      "Drug interactions, pregnancy and long-term safety of oral collagen and marine peptide supplements are not summarised here yet.",
    ],
    reviewedOn: "2026-11-10",
  },
};

export const TOPIC_SLUGS = Object.keys(TOPICS) as Topic[];
