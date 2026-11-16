"use client";

import { useEffect, useState, type ReactNode } from "react";

export type FinderRow = {
  id: string;
  brand: string;
  total: number;
  route: string;
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

const CHIP = "inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-sm font-medium";
const ON = "border-accent bg-accent text-on-accent";
const OFF = "border-line bg-bg hover:border-accent";
const COUNT = "tabular-nums opacity-75";

type State = { benefit: string; route: string; from: string; lot: boolean; sport: boolean; documented: boolean };
const EMPTY: State = { benefit: "", route: "", from: "", lot: false, sport: false, documented: false };

function readUrl(): State {
  try {
    const p = new URLSearchParams(window.location.search);
    return {
      benefit: p.get("benefit") ?? "",
      route: p.get("form") ?? "",
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
    if (s.benefit) p.set("benefit", s.benefit);
    if (s.route) p.set("form", s.route);
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

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-5 first:mt-0">
      <p className="text-caption font-semibold uppercase tracking-[0.08em] text-muted" aria-hidden>
        {label}
      </p>
      <div role="group" aria-label={label} className="mt-2 flex flex-wrap gap-2">
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
  routes,
  madeFrom,
}: {
  rows: FinderRow[];
  benefits: BenefitOption[];
  routes: Option[];
  madeFrom: (Option & { note: string })[];
}) {
  const [s, setS] = useState<State>(EMPTY);
  useEffect(() => {
    const fromUrl = readUrl();
    if (fromUrl.benefit && !benefits.some((b) => b.id === fromUrl.benefit)) fromUrl.benefit = "";
    setS(fromUrl);
  }, [benefits]);
  const set = (patch: Partial<State>) => {
    const next = { ...s, ...patch };
    setS(next);
    writeUrl(next);
  };

  const match = (r: FinderRow, skip?: keyof State) =>
    (skip === "benefit" || !s.benefit || s.benefit in r.steps) &&
    (skip === "route" || !s.route || r.route === s.route) &&
    (skip === "from" || !s.from || r.madeFrom === s.from) &&
    (skip === "lot" || !s.lot || r.lot) &&
    (skip === "sport" || !s.sport || r.sport) &&
    (skip === "documented" || !s.documented || r.documented);
  /** How many rows a choice would show, given the other filters. */
  const count = (key: keyof State, test: (r: FinderRow) => boolean) => rows.filter((r) => match(r, key) && test(r)).length;

  const shown = rows.filter((r) => match(r));
  const ordered = s.benefit
    ? [...rows].sort((a, b) => (a.steps[s.benefit] ?? 9) - (b.steps[s.benefit] ?? 9) || b.total - a.total || a.brand.localeCompare(b.brand))
    : rows;
  const benefit = benefits.find((b) => b.id === s.benefit);
  const onlyPurblack = shown.length > 0 && shown.every((r) => r.purblack);
  const active = JSON.stringify(s) !== JSON.stringify(EMPTY);

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
      <div data-md-skip className="mt-8 rounded-card border border-line bg-card p-5 sm:p-6">
        <Group label="Benefit claimed">
          <button type="button" aria-pressed={!s.benefit} onClick={() => set({ benefit: "" })} className={`${CHIP} ${!s.benefit ? ON : OFF}`}>
            Any benefit <span className={COUNT}>{count("benefit", () => true)}</span>
          </button>
          {benefits.map((b) => chip("benefit", b.id, b.label, count("benefit", (r) => b.id in r.steps)))}
        </Group>
        <Group label="How you take it">
          <button type="button" aria-pressed={!s.route} onClick={() => set({ route: "" })} className={`${CHIP} ${!s.route ? ON : OFF}`}>
            Any <span className={COUNT}>{count("route", () => true)}</span>
          </button>
          {routes.map((o) => chip("route", o.id, o.label, count("route", (r) => r.route === o.id)))}
        </Group>
        <Group label="Made from">
          <button type="button" aria-pressed={!s.from} onClick={() => set({ from: "" })} className={`${CHIP} ${!s.from ? ON : OFF}`}>
            Any <span className={COUNT}>{count("from", () => true)}</span>
          </button>
          {madeFrom.map((o) => (
            <span key={o.id} title={o.note} className="contents">
              {chip("from", o.id, o.label, count("from", (r) => r.madeFrom === o.id))}
            </span>
          ))}
        </Group>
        <Group label="Documentation">
          {chip("lot", true, "Lab report for the lot you buy", count("lot", (r) => r.lot))}
          {chip("sport", true, "Sport-tested", count("sport", (r) => r.sport))}
          {chip("documented", true, "Graded “Documented” or better", count("documented", (r) => r.documented))}
        </Group>
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
              "Highest grade first. Pick a benefit to put the best-supported products first."
            )}
          </p>
          {active && (
            <button type="button" onClick={() => set(EMPTY)} className="link-solo text-sm">
              Clear filters
            </button>
          )}
        </div>
        {onlyPurblack && (
          <p className="mt-3 rounded-tile bg-warn-soft px-4 py-3 text-sm text-soft [text-wrap:pretty]">
            Only Pürblack products match these filters. This site is run by a Pürblack employee; the products are graded by
            the same published rules as every other product.
          </p>
        )}
        {shown.length === 0 && <p className="mt-3 text-sm text-soft">No product matches all of these filters.</p>}
      </div>

      {benefit && (
        // Put the claims for the chosen benefit first in each row and fade the others.
        <style>{`${benefit.areas.map((a) => `.finder-list [data-area="${a}"]`).join(",")}{order:-1}.finder-list [data-area]:not(${benefit.areas
          .map((a) => `[data-area="${a}"]`)
          .join(",")}){opacity:.5}`}</style>
      )}
      <ul className="finder-list mt-6 divide-y divide-line overflow-hidden rounded-card border border-line bg-bg">
        {ordered.map((r) => (
          <li key={r.id} hidden={!shown.includes(r)} className="px-5 py-5 sm:px-6">
            {r.node}
          </li>
        ))}
      </ul>
    </>
  );
}
