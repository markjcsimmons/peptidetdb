import type { ReactNode } from "react";
import { STUDY_BY_ID } from "@/lib/studies";

type Props = {
  /** A `STUDIES` id from lib/studies.ts, e.g. "zdzieblik-2015". An unknown id fails the build. */
  id: string;
  /** Which identifier to link to. Defaults to PubMed. */
  via?: "pubmed" | "pmc" | "doi";
  className?: string;
  /** Link text. Defaults to the identifier itself, e.g. "PubMed 26353786". */
  children?: ReactNode;
};

/**
 * Every citation link on the site goes through this, so the identifier comes from the one
 * registry (checked against PubMed by scripts/audit-studies.ts) instead of being pasted by hand.
 */
export function PaperLink({ id, via = "pubmed", className = "link", children }: Props) {
  const s = STUDY_BY_ID.get(id);
  if (!s) throw new Error(`PaperLink: no study "${id}" in lib/studies.ts`);

  let href: string;
  let label: string;
  if (via === "pubmed") {
    href = `https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/`;
    label = `PubMed ${s.pmid}`;
  } else if (via === "pmc" && s.pmcid) {
    href = `https://pmc.ncbi.nlm.nih.gov/articles/${s.pmcid}/`;
    label = s.pmcid;
  } else if (via === "doi" && s.doi) {
    href = `https://doi.org/${s.doi}`;
    label = `doi:${s.doi}`;
  } else {
    throw new Error(`PaperLink: study "${id}" has no ${via} identifier`);
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children ?? label}
    </a>
  );
}
