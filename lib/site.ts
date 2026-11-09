/**
 * Site-wide settings. Domain: peptidetdb.com (set NEXT_PUBLIC_SITE_URL in production).
 *
 * `disclosure` states the operator's actual relationship (as told to us 2026-11-09): the operator
 * works for Pürblack, pays for the site personally, and receives no funding or support from it.
 * Keep it true: if that changes (Pürblack funds, hosts or reviews anything), update this text first.
 * The same text appears in the footer, on the methodology page, and should accompany any page that
 * names, links or grades a Pürblack product.
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
    "Educational information only. It is not medical advice, and nothing here is a recommendation to use any peptide. Talk to a clinician before starting a supplement or treatment.",
  lastReviewed: "2026-11-09",
};

export const NAV = [
  { href: "/science", label: "Studies" },
  { href: "/science/topics/skin", label: "Topics" },
  { href: "/science/methodology", label: "Methodology" },
];
