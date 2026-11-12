/**
 * Site-wide settings. Domain: peptidetdb.com (set NEXT_PUBLIC_SITE_URL in production).
 *
 * `disclosure` states the operator's actual relationship (as told to us 2026-11-09): the operator
 * works for Pürblack, pays for the site personally, and receives no funding or support from it.
 * Keep it true: if that changes (Pürblack funds, hosts or reviews anything), update this text first.
 * The full text appears in the footer of every page and on the home, About, methodology and editorial
 * policy pages. A page whose own text names, links or grades a Pürblack product also carries the one-line
 * `disclosureShort` through <DisclosureNote> (rule agreed with the operator 2026-11-12). Pages that never
 * mention Pürblack rely on the footer.
 */
export const SITE = {
  /** Short brand, used in titles and structured data. Spell out `fullName` once per page. */
  name: "PeptideTDB",
  fullName: "Peptide Transparency Database",
  tagline: "What the studies on peptides actually show",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  description:
    "Plain-language summaries of the scientific studies on peptides: what was tested, what it found, what it cannot show, and who paid for it.",
  disclosure:
    "This site is run by an employee of Pürblack, a peptide supplement brand, in a personal capacity. Pürblack does not fund, review or direct the site, and its costs are paid by its operator.",
  disclaimer:
    "Educational information only. It is not medical or legal advice, and nothing here is a recommendation to use any peptide. Talk to a clinician before starting a supplement or treatment.",
  /** One line for pages whose own text mentions Pürblack. Must say the same thing as `disclosure`. */
  disclosureShort: "Run by a Pürblack employee. Pürblack does not fund or direct this site.",
  lastReviewed: "2026-11-09",
  /** Set when a monitored address exists. Pages that mention contact details show them only when set. */
  contactEmail: "info@peptidetdb.com" as string | null,
};

export const NAV = [
  { href: "/peptides", label: "Peptides" },
  { href: "/science", label: "Studies" },
  { href: "/peptides/legal-status", label: "Legal status" },
  { href: "/science/methodology", label: "Methodology" },
];

export const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/editorial-policy", label: "Editorial policy" },
  { href: "/corrections", label: "Corrections" },
  { href: "/grading-rubric", label: "Grading rubric" },
  { href: "/data", label: "Data" },
  { href: "/glossary", label: "Glossary" },
  { href: "/science/methodology", label: "Methodology" },
];
