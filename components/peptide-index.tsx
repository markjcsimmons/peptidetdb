"use client";

import Link from "next/link";
import { useState } from "react";

export type IndexItem = {
  id: string;
  label: string;
  studies: number;
  profile?: string;
  lists: { path: string; title: string }[];
  topics: { slug: string; label: string }[];
  status: { kind: string; label: string; note: string; sources: { label: string; url: string }[] };
};

const STATUS_TONE: Record<string, string> = {
  approved: "bg-accent-soft text-accent",
  "fda-risk-list": "bg-warn-soft text-warn",
};

/**
 * A–Z list of every peptide with summarised studies. Everything is rendered on the server (so it is in the
 * HTML and the markdown); the topic chips only hide items in the browser.
 */
export function PeptideIndex({
  items,
  topics,
  statuses,
}: {
  items: IndexItem[];
  topics: { slug: string; label: string }[];
  statuses: { slug: string; label: string }[];
}) {
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState("");
  const shown = items
    .filter((i) => (topic ? i.topics.some((t) => t.slug === topic) : true))
    .filter((i) => (status ? i.status.kind === status : true));
  const letters = [...new Set(shown.map((i) => i.label[0].toUpperCase()))];

  return (
    <>
      <div data-md-skip className="mt-8">
        <p id="az-filter-label" className="text-sm font-medium">
          Show peptides studied for:
        </p>
        <div role="group" aria-labelledby="az-filter-label" className="mt-2 flex flex-wrap gap-2">
          {[{ slug: "", label: "Everything" }, ...topics].map((t) => (
            <button
              key={t.slug || "all"}
              type="button"
              aria-pressed={topic === t.slug}
              onClick={() => setTopic(t.slug)}
              className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium ${
                topic === t.slug ? "border-accent bg-accent text-on-accent" : "border-line bg-card hover:border-accent"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p id="az-status-label" className="mt-5 text-sm font-medium">
          US status:
        </p>
        <div role="group" aria-labelledby="az-status-label" className="mt-2 flex flex-wrap gap-2">
          {[{ slug: "", label: "Any" }, ...statuses].map((t) => (
            <button
              key={t.slug || "any"}
              type="button"
              aria-pressed={status === t.slug}
              onClick={() => setStatus(t.slug)}
              className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium ${
                status === t.slug ? "border-accent bg-accent text-on-accent" : "border-line bg-card hover:border-accent"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted" aria-live="polite">
          {shown.length} of {items.length} peptides
        </p>
        <nav aria-label="Jump to letter" className="mt-4 flex flex-wrap gap-1">
          {letters.map((l) => (
            <a
              key={l}
              href={`#letter-${l}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-tile border border-line bg-card font-semibold hover:border-accent"
            >
              {l}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-8 space-y-10">
        {letters.map((l) => (
          <section key={l} aria-labelledby={`letter-${l}`}>
            <h2 id={`letter-${l}`} className="scroll-mt-6 border-b border-line pb-2 text-2xl font-bold">
              {l}
            </h2>
            <ul className="mt-4 grid gap-4 md:grid-cols-2">
              {shown
                .filter((i) => i.label[0].toUpperCase() === l)
                .map((i) => (
                  <li key={i.id} className="rounded-card border border-line bg-card p-5">
                    <h3 className="text-lg font-bold leading-tight">
                      {i.profile ? (
                        <Link href={i.profile} className="hover:text-accent hover:underline">
                          {i.label}
                        </Link>
                      ) : (
                        i.label
                      )}
                    </h3>
                    <p className="mt-2">
                      <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-caption font-semibold ${STATUS_TONE[i.status.kind] ?? "bg-line text-fg"}`}>
                        {i.status.label}
                      </span>
                    </p>
                    <p className="mt-1.5 text-sm text-soft">
                      {i.status.note}
                      {i.status.sources.map((src) => (
                        <span key={src.url}>
                          {" "}
                          <a href={src.url} className="link" rel="noopener">
                            {src.label.startsWith("FDA:") ? "FDA source" : src.label.replace("Drugs@FDA: ", "")}
                          </a>
                        </span>
                      ))}
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      <Link href={`/science?peptide=${i.id}#explore`} className="link">
                        {i.studies} {i.studies === 1 ? "study" : "studies"} summarised
                      </Link>
                      {i.profile && (
                        <>
                          {" · "}
                          <Link href={i.profile} className="link">
                            full profile
                          </Link>
                        </>
                      )}
                    </p>
                    {i.lists.length > 0 && (
                      <p className="mt-3 text-sm">
                        <span className="font-medium">In our rankings: </span>
                        {i.lists.map((g, n) => (
                          <span key={g.path}>
                            {n > 0 && ", "}
                            <Link href={g.path} className="link">
                              {g.title}
                            </Link>
                          </span>
                        ))}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-soft">
                      <span className="font-medium text-fg">Evidence pages: </span>
                      {i.topics.map((t, n) => (
                        <span key={t.slug}>
                          {n > 0 && ", "}
                          <Link href={`/science/topics/${t.slug}`} className="link">
                            {t.label}
                          </Link>
                        </span>
                      ))}
                    </p>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
