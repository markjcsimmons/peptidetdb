import Link from "next/link";
import { FOOTER_LINKS, NAV, SITE } from "@/lib/site";
import { formatDate } from "@/lib/format";

function LogoMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
      <path d="M7 20 L15 10 L23 20" stroke="var(--bead-a)" strokeWidth="2" fill="none" />
      <circle cx="7" cy="20" r="5" style={{ fill: "var(--bead-a)" }} />
      <circle cx="15" cy="10" r="5" style={{ fill: "var(--bead-b)" }} />
      <circle cx="23" cy="20" r="5" style={{ fill: "var(--bead-c)" }} />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-heading text-xl font-bold tracking-tight">
          <LogoMark />
          <span>{SITE.name}</span>
        </Link>
        <nav aria-label="Main" className="flex flex-wrap gap-x-7 gap-y-1 text-[15px] font-medium text-muted">
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
    <footer className="mt-24 bg-ink text-ink-fg">
      <div className="mx-auto max-w-[1120px] space-y-3 px-4 py-12 text-[15px] sm:px-8">
        <p className="font-heading text-xl font-bold text-white">
          {SITE.name} <span className="font-medium opacity-80">is the {SITE.fullName}.</span>
        </p>
        <p className="max-w-3xl pt-2">
          <strong className="text-white">Disclosure.</strong> {SITE.disclosure}
        </p>
        <p className="max-w-3xl">{SITE.disclaimer}</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 pt-3">
          {FOOTER_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-ink-link underline underline-offset-4 hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="pt-2 text-sm opacity-80">Studies last checked {formatDate(SITE.lastReviewed)}.</p>
      </div>
    </footer>
  );
}
