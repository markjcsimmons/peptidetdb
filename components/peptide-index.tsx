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
};

/**
 * A–Z list of every peptide with summarised studies. Everything is rendered on the server (so it is in the
 * HTML and the markdown); the topic chips only hide items in the browser.
 */
export function PeptideIndex({ items, topics }: { items: IndexItem[]; topics: { slug: string; label: string }[] }) {
  const [topic, setTopic] = useState("");
  const shown = topic ? items.filter((i) => i.topics.some((t) => t.slug === topic)) : items;
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
                    <p className="mt-1 text-sm text-muted">
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
