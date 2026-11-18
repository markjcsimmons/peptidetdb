"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { WIDE_COLUMNS } from "@/components/product-columns";

export type FinderRow = {
  id: string;
  brand: string;
  total: number;
  /** Type of product (lib/product-finder.ts `Kind`). */
  kind: string;
  madeFrom: string;
  lot: boolean;
  sport: boolean;
  /** Documentation band reached "Documented" or better. */
  documented: boolean;
  /** Evidence step for each benefit the product claims (lower is stronger); absent when it does not claim it. */
  steps: Record<string, number>;
  purblack: boolean;
  node: ReactNode;
};

type Option = { id: string; label: string };
type BenefitOption = Option & { areas: string[]; guide: string; guideTitle: string };

const CHIP =
  "inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-4 text-sm font-medium";
const ON = "border-accent bg-accent text-on-accent";
const OFF = "border-line bg-bg hover:border-accent";
const COUNT = "tabular-nums opacity-75";
const HEAD = "text-caption font-semibold uppercase tracking-[0.06em] text-muted";

type State = { kind: string; benefit: string; from: string; lot: boolean; sport: boolean; documented: boolean };
const EMPTY: State = { kind: "", benefit: "", from: "", lot: false, sport: false, documented: false };

function readUrl(): State {
  try {
    const p = new URLSearchParams(window.location.search);
    return {
      // `form=skin` is the address the old "how you take it" filter wrote.
      kind: p.get("type") ?? (p.get("form") === "skin" ? "topical" : ""),
      benefit: p.get("benefit") ?? "",
      from: p.get("from") ?? "",
      lot: p.get("lot") === "1",
      sport: p.get("sport") === "1",
      documented: p.get("documented") === "1",
    };
  } catch {
    return EMPTY;
  }
}

function writeUrl(s: State) {
  try {
    const p = new URLSearchParams();
    if (s.kind) p.set("type", s.kind);
    if (s.benefit) p.set("benefit", s.benefit);
    if (s.from) p.set("from", s.from);
    if (s.lot) p.set("lot", "1");
    if (s.sport) p.set("sport", "1");
    if (s.documented) p.set("documented", "1");
    const q = p.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${q ? `?${q}` : ""}${window.location.hash}`);
  } catch {
    /* the filters still work without the address bar */
  }
}

/** `scroll`: one sideways-scrolling row on phones instead of several wrapped lines. */
function Group({ label, children, scroll = false }: { label: string; children: ReactNode; scroll?: boolean }) {
  return (
    <div className="mt-5 first:mt-0">
      <p className="text-caption font-semibold uppercase tracking-[0.08em] text-muted" aria-hidden>
        {label}
      </p>
      <div
        role="group"
        aria-label={label}
        className={`mt-2 flex gap-2 ${scroll ? "-mx-5 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" : "flex-wrap"}`}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * The product finder. Every product is rendered on the server, in grade order, so all of them are in the HTML and
 * the markdown; the filters only hide and reorder rows in the browser, and are kept in the address so a view can be
 * shared.
 */
export function ProductFinder({
  rows,
  benefits,
  kinds,
  madeFrom,
}: {
  rows: FinderRow[];
  benefits: BenefitOption[];
  kinds: (Option & { note: string })[];
  madeFrom: (Option & { note: string })[];
}) {
  const [s, setS] = useState<State>(EMPTY);
  const [more, setMore] = useState(false);
  useEffect(() => {
    const fromUrl = readUrl();
    if (fromUrl.benefit && !benefits.some((b) => b.id === fromUrl.benefit)) fromUrl.benefit = "";
    if (fromUrl.kind && !kinds.some((k) => k.id === fromUrl.kind)) fromUrl.kind = "";
    setS(fromUrl);
    // A link that sets the secondary filters (e.g. ?sport=1 from the athletes page) shows them.
    if (fromUrl.from || fromUrl.lot || fromUrl.sport || fromUrl.documented) setMore(true);
  }, [benefits, kinds]);

  // Phones: once the filter panel has scrolled away, a bar pinned to the top shows the count and leads back to it.
  const panel = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => setPinned(!e.isIntersecting && e.boundingClientRect.bottom < 0));
    o.observe(el);
    return () => o.disconnect();
  }, []);
  const set = (patch: Partial<State>) => {
    const next = { ...s, ...patch };
    setS(next);
    writeUrl(next);
  };

  const match = (r: FinderRow, skip?: keyof State) =>
    (skip === "kind" || !s.kind || r.kind === s.kind) &&
    (skip === "benefit" || !s.benefit || s.benefit in r.steps) &&
    (skip === "from" || !s.from || r.madeFrom === s.from) &&
    (skip === "lot" || !s.lot || r.lot) &&
    (skip === "sport" || !s.sport || r.sport) &&
    (skip === "documented" || !s.documented || r.documented);
  /** How many rows a choice would show, given the other filters. */
  const count = (key: keyof State, test: (r: FinderRow) => boolean) =>
    rows.filter((r) => match(r, key) && test(r)).length;

  const shown = rows.filter((r) => match(r));
  const ordered = s.benefit
    ? [...rows].sort(
        (a, b) =>
          (a.steps[s.benefit] ?? 9) - (b.steps[s.benefit] ?? 9) || b.total - a.total || a.brand.localeCompare(b.brand),
      )
    : rows;
  const benefit = benefits.find((b) => b.id === s.benefit);
  const onlyPurblack = shown.length > 0 && shown.every((r) => r.purblack);
  const active = JSON.stringify(s) !== JSON.stringify(EMPTY);
  const kind = kinds.find((k) => k.id === s.kind);
  const secondary = [s.from, s.lot, s.sport, s.documented].filter(Boolean).length;

  const chip = (key: keyof State, value: string | boolean, label: string, n: number) => {
    const pressed = s[key] === value;
    return (
      <button
        key={`${key}-${String(value)}`}
        type="button"
        aria-pressed={pressed}
        disabled={!pressed && n === 0}
        onClick={() => set({ [key]: pressed && typeof value === "boolean" ? false : value } as Partial<State>)}
        className={`${CHIP} ${pressed ? ON : OFF} disabled:cursor-not-allowed disabled:opacity-40`}
      >
        {label} <span className={COUNT}>{n}</span>
      </button>
    );
  };

  return (
    <>
      <div
        ref={panel}
        id="filters"
        data-md-skip
        className="mt-6 scroll-mt-4 rounded-card border border-line bg-card p-5 sm:p-6"
      >
        <Group label="Type of product">
          <button
            type="button"
            aria-pressed={!s.kind}
            onClick={() => set({ kind: "" })}
            className={`${CHIP} ${!s.kind ? ON : OFF}`}
          >
            All types <span className={COUNT}>{count("kind", () => true)}</span>
          </button>
          {kinds.map((o) => (
            <span key={o.id} title={o.note} className="contents">
              {chip(
                "kind",
                o.id,
                o.label,
                count("kind", (r) => r.kind === o.id),
              )}
            </span>
          ))}
        </Group>
        {kind && <p className="mt-2 max-w-prose text-sm text-soft [text-wrap:pretty]">{kind.note}</p>}
        <Group label="Benefit claimed" scroll>
          <button
            type="button"
            aria-pressed={!s.benefit}
            onClick={() => set({ benefit: "" })}
            className={`${CHIP} ${!s.benefit ? ON : OFF}`}
          >
            Any benefit <span className={COUNT}>{count("benefit", () => true)}</span>
          </button>
          {benefits.map((b) =>
            chip(
              "benefit",
              b.id,
              b.label,
              count("benefit", (r) => b.id in r.steps),
            ),
          )}
        </Group>
        <button
          type="button"
          aria-expanded={more}
          aria-controls="finder-more"
          onClick={() => setMore((m) => !m)}
          className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent"
        >
          {more ? "Fewer filters" : "More filters: source, testing"}
          {secondary > 0 && !more && (
            <span className="rounded-full bg-accent px-2 text-caption text-on-accent">{secondary} on</span>
          )}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className={more ? "rotate-180" : ""}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        <div id="finder-more" hidden={!more} className="mt-3">
          <Group label="Made from">
            <button
              type="button"
              aria-pressed={!s.from}
              onClick={() => set({ from: "" })}
              className={`${CHIP} ${!s.from ? ON : OFF}`}
            >
              Any <span className={COUNT}>{count("from", () => true)}</span>
            </button>
            {madeFrom.map((o) => (
              <span key={o.id} title={o.note} className="contents">
                {chip(
                  "from",
                  o.id,
                  o.label,
                  count("from", (r) => r.madeFrom === o.id),
                )}
              </span>
            ))}
          </Group>
          <Group label="Documentation">
            {chip(
              "lot",
              true,
              "Lot reports published",
              count("lot", (r) => r.lot),
            )}
            {chip(
              "sport",
              true,
              "Sport-tested",
              count("sport", (r) => r.sport),
            )}
            {chip(
              "documented",
              true,
              "Graded “Documented” or better",
              count("documented", (r) => r.documented),
            )}
          </Group>
        </div>
        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line pt-4">
          <p className="text-sm text-soft [text-wrap:pretty]" aria-live="polite">
            <strong className="text-fg">
              {shown.length} of {rows.length} products.
            </strong>{" "}
            {benefit ? (
              <>
                Strongest evidence for {benefit.label.toLowerCase()} first, then highest grade.{" "}
                <a href={benefit.guide} className="link">
                  {benefit.guideTitle}
                </a>
              </>
            ) : (
              "Highest grade first."
            )}
          </p>
          {active && (
            <button type="button" onClick={() => set(EMPTY)} className="link-solo text-sm">
              Clear filters
            </button>
          )}
        </div>
        {onlyPurblack && (
          <p className="mt-3 rounded-tile bg-warn-soft px-4 py-3 text-sm text-soft">
            Only Pürblack products match these filters.
          </p>
        )}
        {shown.length === 0 && <p className="mt-3 text-sm text-soft">No product matches all of these filters.</p>}
      </div>

      {pinned && (
        <div
          data-md-skip
          data-noprint
          className="fixed inset-x-0 top-0 z-40 border-b border-line bg-card shadow-sm lg:hidden"
        >
          <div className="mx-auto flex min-h-12 max-w-5xl items-center justify-between gap-3 px-4 text-sm">
            <span className="min-w-0 truncate">
              <strong>
                {shown.length} of {rows.length}
              </strong>{" "}
              {kind ? `· ${kind.label}` : ""}
              {benefit ? ` · ${benefit.label}` : kind ? "" : "products"}
              {secondary > 0 ? ` · ${secondary} more ${secondary === 1 ? "filter" : "filters"}` : ""}
            </span>
            <button
              type="button"
              onClick={() => panel.current?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex min-h-10 shrink-0 items-center rounded-full border border-accent px-4 font-semibold text-accent"
            >
              Filters
            </button>
          </div>
        </div>
      )}

      {benefit && (
        // Put the claims for the chosen benefit first in each row and fade the others.
        <style>{`${benefit.areas.map((a) => `.finder-list [data-area="${a}"]`).join(",")}{order:-1}.finder-list [data-area]:not(${benefit.areas
          .map((a) => `[data-area="${a}"]`)
          .join(",")}){opacity:.5}`}</style>
      )}
      <div className="mt-6 overflow-hidden rounded-card border border-line bg-bg">
        {/* Column names for the wide layout; each row also carries them for screen readers and the markdown. */}
        <div
          aria-hidden
          data-md-skip
          className={`hidden gap-x-6 border-b border-line bg-card px-6 py-3 lg:grid ${WIDE_COLUMNS}`}
        >
          <span className={HEAD}>Product</span>
          <span className={HEAD}>Evidence for its claims</span>
          <span className={`${HEAD} text-right`}>Grade</span>
        </div>
        <ul className="finder-list divide-y divide-line">
          {ordered.map((r) => (
            <li key={r.id} hidden={!shown.includes(r)} className="px-4 py-5 sm:px-6">
              {r.node}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
