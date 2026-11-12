import { SITE } from "@/lib/site";

/**
 * One-line disclosure for a page whose own text names or discusses Pürblack (see lib/site.ts).
 * Pages that never mention Pürblack do not need it: the footer carries the full statement.
 */
export function DisclosureNote({ children }: { children?: React.ReactNode }) {
  return (
    <p className="mt-4 text-caption text-muted">
      <strong>Disclosure:</strong> {SITE.disclosureShort} {children}
    </p>
  );
}
