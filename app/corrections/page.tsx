import type { Metadata } from "next";
import Link from "next/link";
import { CORRECTIONS } from "@/lib/corrections";
import { SITE } from "@/lib/site";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Corrections log",
  description: "A dated public record of every correction made to PeptideTDB pages.",
  alternates: { canonical: "/corrections" },
};

export default function CorrectionsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">Corrections log</h1>
      <p className="mt-3 max-w-prose text-lg text-muted">
        Every time a published claim, summary, identifier, verdict or date turns out to be wrong, it is fixed and
        recorded here with the date and what the page said before. See the{" "}
        <Link href="/editorial-policy" className="link">
          editorial policy
        </Link>
        .
      </p>

      {CORRECTIONS.length === 0 ? (
        <p className="mt-8 rounded-card border border-line bg-card p-6">
          No corrections have been logged since the site launched. Last reviewed {formatDate(SITE.lastReviewed)}.
        </p>
      ) : (
        <ol className="mt-8 space-y-5">
          {[...CORRECTIONS]
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((c) => (
              <li key={`${c.date}-${c.page}`} className="rounded-card border border-line bg-card p-6">
                <p className="text-sm text-muted">
                  {formatDate(c.date)} ·{" "}
                  <Link href={c.page} className="link">
                    {c.page}
                  </Link>
                </p>
                <p className="mt-2">
                  <strong>Was:</strong> {c.was}
                </p>
                <p className="mt-2">
                  <strong>Now:</strong> {c.now}
                </p>
              </li>
            ))}
        </ol>
      )}

      {SITE.contactEmail && (
        <p className="mt-8 text-sm text-muted">
          Found an error? Email{" "}
          <a href={`mailto:${SITE.contactEmail}`} className="link">
            {SITE.contactEmail}
          </a>
          .
        </p>
      )}
    </div>
  );
}
