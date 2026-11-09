/** Plain-language definitions used across the site. Keep each one short and uncontroversial. */
export type Term = { id: string; term: string; definition: string };

export const GLOSSARY: Term[] = [
  { id: "amino-acid", term: "Amino acid", definition: "A small molecule that links with others in chains to make peptides and proteins." },
  {
    id: "peptide",
    term: "Peptide",
    definition:
      "A short chain of amino acids. There is no sharp line between a peptide and a protein: chains of a few to a few dozen amino acids are usually called peptides, and the exact cut-off varies by source.",
  },
  { id: "protein", term: "Protein", definition: "A long chain of amino acids folded into a particular shape. Collagen is a protein." },
  {
    id: "collagen-peptides",
    term: "Collagen peptides",
    definition:
      "Short fragments made by breaking collagen down (hydrolysis) and sold as powders and capsules. Also called hydrolysed collagen or collagen hydrolysate.",
  },
  {
    id: "bioactive-peptide",
    term: "Bioactive peptide",
    definition:
      "A peptide reported to have an effect in the body beyond supplying amino acids. The word describes a claim; it does not mean the effect has been shown in people.",
  },
  {
    id: "rct",
    term: "Randomised controlled trial (RCT)",
    definition:
      "A study in which people are assigned by chance to receive a treatment or a comparison, often a placebo, so that differences in outcome are more likely to be due to the treatment.",
  },
  {
    id: "placebo",
    term: "Placebo",
    definition: "An inactive look-alike treatment used as a comparison. People often improve on a placebo, which is why trials include one.",
  },
  {
    id: "double-blind",
    term: "Double-blind",
    definition: "A design in which neither the participants nor the researchers know who received the real treatment until the study ends.",
  },
  { id: "meta-analysis", term: "Meta-analysis", definition: "A statistical pooling of the results of several studies of the same question." },
  {
    id: "systematic-review",
    term: "Systematic review",
    definition: "A review that searches for and appraises the studies on a question using a stated method. It tests nothing itself.",
  },
  {
    id: "narrative-review",
    term: "Narrative or scoping review",
    definition: "A review that summarises or maps the literature without pooling results. It generates no new data.",
  },
  { id: "preclinical", term: "Preclinical", definition: "Research in animals or cells, before testing in people. Results often do not carry over to people." },
  { id: "sarcopenia", term: "Sarcopenia", definition: "Age-related loss of muscle mass and strength." },
  {
    id: "womac",
    term: "WOMAC",
    definition: "A questionnaire that scores osteoarthritis pain, stiffness and physical function (Western Ontario and McMaster Universities Osteoarthritis Index).",
  },
  {
    id: "coa",
    term: "Certificate of Analysis (COA)",
    definition:
      "A laboratory report on a specific batch of a product. A useful one names the batch and the lab and reports identity, purity and contaminant results.",
  },
  {
    id: "hplc",
    term: "HPLC",
    definition: "High-performance liquid chromatography, a laboratory method that separates a sample's components and is used to estimate how pure a peptide is.",
  },
  {
    id: "compounded-drug",
    term: "Compounded drug",
    definition: "A medication prepared by a licensed pharmacy or facility for an individual patient, rather than manufactured and approved as a finished product.",
  },
  {
    id: "503a",
    term: "Section 503A",
    definition:
      "The part of the US Federal Food, Drug, and Cosmetic Act that sets conditions for drugs compounded by licensed pharmacists and physicians for individual patients. FDA's '503A bulks list' names the bulk substances that may be used.",
  },
  {
    id: "503b",
    term: "Section 503B",
    definition: "The part of the same Act covering outsourcing facilities, which compound larger batches under additional requirements.",
  },
  {
    id: "category-2",
    term: "Category 2 (FDA interim policy)",
    definition:
      "On FDA's interim compounding policies, the category for bulk substances FDA has flagged as possibly presenting significant safety risks.",
  },
  {
    id: "enforcement-discretion",
    term: "Enforcement discretion",
    definition: "A regulator's decision not to take enforcement action over certain conduct for a period. It does not change the underlying law.",
  },
  {
    id: "immunogenicity",
    term: "Immunogenicity",
    definition: "The ability of a substance to provoke an immune response. FDA cites it as a concern for some compounded peptides.",
  },
];
