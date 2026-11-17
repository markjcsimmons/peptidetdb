import type { Metadata } from "next";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import { KIND_HEADING, LATEST_UPDATE, UPDATE_DAYS, summarise, type Update } from "@/lib/updates";

export const metadata: Metadata = {
  title: "What's new",
  description:
    "Every page, study summary, product grade, evidence review and correction added to PeptideTDB, newest first, with an RSS feed.",
  alternates: { canonical: "/whats-new" },
};

/** Items shown per group before the rest fold into "N more". */
const SHOW = 6;

function Item({ u }: { u: Update }) {
  return (
    <li className="py-2">
      <Link href={u.href} className="link font-medium">
        {u.title}
      </Link>
      {u.note && (
        <>
          <span className="sr-only"> – </span>
          <span className="mt-0.5 block text-sm text-muted [text-wrap:pretty]">{u.note}</span>
        </>
      )}
    </li>
  );
}

export default function WhatsNewPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-caption font-semibold uppercase tracking-[0.08em] text-accent">Updates</p>
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">What&rsquo;s new</h1>
      <p className="mt-2 text-sm text-muted">Last update {formatDate(LATEST_UPDATE)}.</p>
      <p className="mt-5 max-w-prose text-lg text-soft [text-wrap:pretty]">
        Every page, study summary, product grade and correction added to the site, newest first, with the evidence pages
        whose ratings were reviewed that day. Follow it in a feed reader with the{" "}
        <a href="/feed.xml" className="link">
          RSS feed
        </a>
        .
      </p>

      <ol className="mt-10 space-y-12">
        {UPDATE_DAYS.map((day) => {
          const items = day.groups.flatMap((g) => g.items);
          return (
            <li key={day.date} id={`d-${day.date}`} className="scroll-mt-6">
              <h2 className="text-2xl font-bold leading-tight">{formatDate(day.date)}</h2>
              <p className="mt-1 text-sm text-muted">{summarise(items)}</p>
              <div className="mt-4 space-y-6 border-l-2 border-line pl-5">
                {day.groups.map((g) => (
                  <section key={g.kind} aria-label={`${KIND_HEADING[g.kind]}, ${formatDate(day.date)}`}>
                    <h3 className="text-caption font-semibold uppercase tracking-[0.06em] text-muted">
                      {KIND_HEADING[g.kind]} ({g.items.length})
                    </h3>
                    <ul className="mt-1">
                      {g.items.slice(0, SHOW).map((u) => (
                        <Item key={`${u.kind}-${u.href}-${u.title}`} u={u} />
                      ))}
                    </ul>
                    {g.items.length > SHOW && (
                      <details className="mt-1">
                        <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm font-semibold text-accent">
                          {g.items.length - SHOW} more
                        </summary>
                        <ul>
                          {g.items.slice(SHOW).map((u) => (
                            <Item key={`${u.kind}-${u.href}-${u.title}`} u={u} />
                          ))}
                        </ul>
                      </details>
                    )}
                  </section>
                ))}
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-12 max-w-prose text-sm text-muted [text-wrap:pretty]">
        Dates are when something was first published here. A study re-checked against its abstract, or a product whose
        documents were re-read, keeps its first date; changes to published claims are recorded in the{" "}
        <Link href="/corrections" className="link">
          corrections log
        </Link>
        .
      </p>
    </article>
  );
}
