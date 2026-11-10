import { SITE } from "@/lib/site";

/** Boxed disclosure for pages that name or discuss a product category Pürblack sells (see lib/site.ts). */
export function DisclosureNote({ children }: { children?: React.ReactNode }) {
  return (
    <p className="mt-6 rounded-tile border border-line bg-card p-4 text-sm">
      <strong>Disclosure.</strong> {SITE.disclosure} {children}
    </p>
  );
}
