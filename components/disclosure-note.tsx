import { SITE } from "@/lib/site";

/**
 * One-line disclosure for a page whose own text names or discusses Pürblack (see lib/site.ts).
 * Pages that never mention Pürblack do not need it: the footer carries the full statement.
 * `graded` adds that Pürblack products are graded by the same rules, for pages and sections that grade them.
 */
export function DisclosureNote({ graded = false }: { graded?: boolean }) {
  return (
    <p className="mt-4 text-caption text-muted">
      <strong>Disclosure:</strong> {graded ? SITE.disclosureGraded : SITE.disclosureShort}
    </p>
  );
}
