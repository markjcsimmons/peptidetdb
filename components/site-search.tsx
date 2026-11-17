"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchEntry, SearchGroup } from "@/lib/search-index";

/**
 * Site search: one dialog for the whole site, opened by any <SearchTrigger>, by "/" or by Cmd/Ctrl+K. The index
 * (/search-index.json, built from the data files) is fetched the first time the dialog opens, and matching runs in the
 * browser. Without scripts the triggers are plain links to the A–Z index.
 */

const OPEN_EVENT = "site-search:open";

const GROUP_LABEL: Record<SearchGroup, string> = {
  page: "Pages",
  peptide: "Peptides",
  product: "Products",
  study: "Studies",
  term: "Glossary",
};
const GROUP_LIMIT: Record<SearchGroup, number> = {
  page: 6,
  peptide: 5,
  product: 5,
  study: 6,
  term: 3,
};
const GROUP_WEIGHT: Record<SearchGroup, number> = {
  page: 2,
  peptide: 2,
  product: 0.5,
  study: 0,
  term: 0.5,
};

/** Shown before anything is typed. Paths only; titles come from the index so they stay current. */
const SUGGESTED = [
  "/peptides/bpc-157",
  "/peptides/peptides-for-joint-pain",
  "/peptides/best-peptides-for-skin",
  "/peptides/for-weight-loss",
  "/peptides/ghk-cu",
  "/peptides/legal-status",
  "/products",
];

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const compact = (s: string) => norm(s).replace(/[^a-z0-9]/g, "");

type Prepared = SearchEntry & {
  title: string;
  titleC: string;
  hay: string;
  hayC: string;
};

function prepare(entries: SearchEntry[]): Prepared[] {
  return entries.map((e) => {
    const hay = norm(`${e.t} ${e.k} ${e.d ?? ""} ${e.s ?? ""}`);
    return {
      ...e,
      title: norm(e.t),
      titleC: compact(e.t),
      hay,
      hayC: hay.replace(/[^a-z0-9]/g, ""),
    };
  });
}

/** Question words dropped from a query ("is bpc 157 legal" searches "bpc 157 legal"), unless nothing else is left. */
// "peptide(s)" is in almost every entry, so it only narrows a query when nothing else is typed.
const STOP = new Set(
  (
    "a an and are best can do does for good help helps how i in is it me my of on or should take the to use vs what " +
    "which with work works peptide peptides"
  ).split(" "),
);

/** `strict`: every word must match. Otherwise (the fallback when nothing matches strictly) any word counts. */
function score(e: Prepared, tokens: string[], qC: string, strict = true): number {
  let total = 0;
  for (const tok of tokens) {
    const tokC = tok.replace(/[^a-z0-9]/g, "");
    if (new RegExp(`(^|[^a-z0-9])${tok.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(e.title)) total += 3;
    else if (e.title.includes(tok)) total += 2;
    else if (e.hay.includes(tok) || (tokC && e.hayC.includes(tokC))) total += 1;
    else if (strict) return 0; // every word must match somewhere
  }
  if (!strict) return total;
  if (e.titleC === qC) total += 10;
  else if (e.titleC.startsWith(qC)) total += 6;
  else if (e.titleC.includes(qC)) total += 3;
  return total + GROUP_WEIGHT[e.g];
}

type Section = { group: SearchGroup; items: Prepared[]; best: number };

function search(index: Prepared[], q: string): { sections: Section[]; closest: boolean } {
  const query = norm(q).trim();
  if (!query) return { sections: [], closest: false };
  const words = query.split(/\s+/).filter(Boolean);
  const kept = words.filter((w) => !STOP.has(w));
  const tokens = kept.length ? kept : words;
  const qC = compact(tokens.join(" "));
  let sections = rank(index, tokens, qC, true);
  if (sections.length || tokens.length < 2) return { sections, closest: false };
  // Nothing has every word: show what matches the most words, labelled as closest matches.
  sections = rank(index, tokens, qC, false);
  return { sections, closest: sections.length > 0 };
}

function rank(index: Prepared[], tokens: string[], qC: string, strict: boolean): Section[] {
  const byGroup = new Map<SearchGroup, { e: Prepared; s: number }[]>();
  for (const e of index) {
    const s = score(e, tokens, qC, strict);
    if (s > 0) byGroup.set(e.g, [...(byGroup.get(e.g) ?? []), { e, s }]);
  }
  return [...byGroup.entries()]
    .map(([group, hits]) => {
      hits.sort((a, b) => b.s - a.s || a.e.t.localeCompare(b.e.t));
      return {
        group,
        items: hits.slice(0, GROUP_LIMIT[group]).map((h) => h.e),
        best: hits[0].s,
      };
    })
    .sort((a, b) => b.best - a.best);
}

function SearchIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

/** A button that opens the search dialog; a plain link to the A–Z index without scripts. */
export function SearchTrigger({ variant }: { variant: "header" | "hero" }) {
  const open = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event(OPEN_EVENT));
  };
  if (variant === "hero") {
    return (
      <a
        href="/peptides/a-z"
        onClick={open}
        role="button"
        aria-haspopup="dialog"
        data-md-skip
        className="flex min-h-14 w-full max-w-[34rem] items-center gap-3 rounded-tile border border-line bg-card px-4 text-left text-soft shadow-sm hover:border-accent"
      >
        <SearchIcon size={20} />
        <span className="min-w-0 flex-1 truncate">Search a peptide, goal, product or study</span>
        <kbd className="hidden rounded border border-line px-1.5 text-caption text-muted sm:inline">/</kbd>
      </a>
    );
  }
  return (
    <a
      href="/peptides/a-z"
      onClick={open}
      role="button"
      aria-haspopup="dialog"
      aria-label="Search the site"
      className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-tile text-sm font-medium text-muted hover:text-fg lg:min-w-0 lg:border lg:border-line lg:px-3"
    >
      <SearchIcon />
      <span className="hidden lg:inline">Search</span>
      <kbd className="hidden rounded border border-line px-1 text-caption lg:inline">⌘K</kbd>
    </a>
  );
}

/** The dialog itself. Render once, in the site header. */
export function SiteSearch() {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [index, setIndex] = useState<Prepared[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);

  const load = useCallback(() => {
    if (index || failed) return;
    fetch("/search-index.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: SearchEntry[]) => setIndex(prepare(d)))
      .catch(() => setFailed(true));
  }, [index, failed]);

  const open = useCallback(() => {
    const d = dialog.current;
    if (!d || d.open) return;
    load();
    d.showModal();
    input.current?.select();
  }, [load]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        open();
      } else if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, open);
    };
  }, [open]);

  const { sections, closest } = useMemo(
    () => (index ? search(index, q) : { sections: [], closest: false }),
    [index, q],
  );
  const suggested = useMemo(
    () => (index ? SUGGESTED.map((u) => index.find((e) => e.u === u)).filter((e): e is Prepared => !!e) : []),
    [index],
  );
  const flat = q.trim() ? sections.flatMap((s) => s.items) : suggested;

  useEffect(() => setActive(0), [q]);

  const close = () => dialog.current?.close();
  const go = (e: SearchEntry) => {
    close();
    // Links to an anchor (a product's scoring sheet, a glossary term) load normally so <OpenOnHash> can open it.
    if (e.u.includes("#")) window.location.assign(e.u);
    else router.push(e.u);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Escape") {
      // A search field's own Esc only clears the text; one press should close the dialog.
      e.preventDefault();
      close();
    } else if (e.key === "Enter" && flat[active]) {
      e.preventDefault();
      go(flat[active]);
    }
  };

  useEffect(() => {
    document.getElementById(`search-opt-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  let n = -1;
  const row = (e: Prepared) => {
    n += 1;
    const i = n;
    return (
      <li key={e.u} role="presentation">
        <a
          id={`search-opt-${i}`}
          role="option"
          aria-selected={i === active}
          href={e.u}
          onClick={(ev) => {
            ev.preventDefault();
            go(e);
          }}
          onMouseMove={() => setActive(i)}
          className={`block rounded-tile px-3 py-2.5 ${i === active ? "bg-accent-soft" : ""}`}
        >
          <span className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
            <span className="line-clamp-2 min-w-0 font-medium leading-snug text-fg">{e.t}</span>
            <span className="order-first shrink-0 text-caption text-muted sm:order-none">{e.k}</span>
          </span>
          {e.d && <span className="mt-0.5 block truncate text-sm text-soft">{e.d}</span>}
        </a>
      </li>
    );
  };

  return (
    <dialog
      ref={dialog}
      aria-label="Search the site"
      onClick={(e) => e.target === dialog.current && close()}
      onClose={() => setQ("")}
      data-md-skip
      data-noprint
      className="m-0 mx-auto mt-[8vh] w-[calc(100%-2rem)] max-w-2xl rounded-card border border-line bg-card p-0 text-fg shadow-xl backdrop:bg-black/50 max-sm:mt-4"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <span className="text-muted">
          <SearchIcon size={20} />
        </span>
        <input
          ref={input}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onInputKey}
          placeholder="Search peptides, goals, products, studies"
          aria-label="Search"
          role="combobox"
          aria-expanded={flat.length > 0}
          aria-controls="search-results"
          aria-activedescendant={flat.length ? `search-opt-${active}` : undefined}
          autoComplete="off"
          spellCheck={false}
          className="min-h-14 min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-muted"
        />
        <button
          type="button"
          onClick={close}
          className="inline-flex min-h-11 items-center rounded-tile px-2 text-sm text-muted hover:text-fg"
        >
          Esc
        </button>
      </div>
      <div
        id="search-results"
        role="listbox"
        aria-label="Results"
        className="max-h-[min(60vh,32rem)] overflow-y-auto p-2"
      >
        {failed ? (
          <p className="px-3 py-6 text-sm text-soft">
            Search could not load. Try the{" "}
            <a href="/peptides/a-z" className="link">
              A–Z index
            </a>
            .
          </p>
        ) : !index ? (
          <p className="px-3 py-6 text-sm text-muted">Loading…</p>
        ) : !q.trim() ? (
          <>
            <p className="px-3 pb-1 pt-2 text-caption font-semibold uppercase tracking-[0.06em] text-muted">Popular</p>
            <ul role="presentation">{suggested.map(row)}</ul>
          </>
        ) : sections.length === 0 ? (
          <p className="px-3 py-6 text-sm text-soft">
            Nothing matches &ldquo;{q.trim()}&rdquo;. Try another spelling, or browse{" "}
            <a href="/peptides/a-z" className="link">
              Peptides A–Z
            </a>{" "}
            or{" "}
            <a href="/peptides/by-goal" className="link">
              goals
            </a>
            .
          </p>
        ) : (
          <>
            {closest && (
              <p className="px-3 pb-1 pt-2 text-sm text-soft">No page matches every word; these are the closest.</p>
            )}
            {sections.map((s) => (
              <div key={s.group} role="group" aria-label={GROUP_LABEL[s.group]}>
                <p className="px-3 pb-1 pt-3 text-caption font-semibold uppercase tracking-[0.06em] text-muted">
                  {GROUP_LABEL[s.group]}
                </p>
                <ul role="presentation">{s.items.map(row)}</ul>
              </div>
            ))}
          </>
        )}
      </div>
      <p className="hidden border-t border-line px-4 py-2 text-caption text-muted sm:block">
        ↑ ↓ to move · Enter to open · Esc to close
      </p>
    </dialog>
  );
}
