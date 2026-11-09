import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { formatDate } from "@/lib/format";

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          {SITE.name}
        </Link>
        <nav aria-label="Main" className="flex gap-5 text-sm text-muted">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-fg">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto max-w-5xl space-y-3 px-4 py-8 text-sm text-muted">
        <p>
          <strong className="text-fg">{SITE.name}</strong> is the {SITE.fullName}.
        </p>
        <p>
          <strong className="text-fg">Disclosure.</strong> {SITE.disclosure}
        </p>
        <p>{SITE.disclaimer}</p>
        <p>
          Studies last checked {formatDate(SITE.lastReviewed)}.{" "}
          <Link href="/science/methodology" className="link">
            How we summarise and check studies
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
