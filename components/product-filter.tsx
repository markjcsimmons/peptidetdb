"use client";

import { useState, type ReactNode } from "react";

export type FilterRow = { id: string; format: string; sport: boolean; node: ReactNode };

const CHIP = "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium";
const on = "border-accent bg-accent text-on-accent";
const off = "border-line bg-bg hover:border-accent";

/**
 * Filters for a products section. Every row is rendered on the server (so it is in the HTML and the markdown);
 * the chips only hide rows in the browser.
 */
export function ProductFilter({ rows, label }: { rows: FilterRow[]; label: string }) {
  const formats = [...new Set(rows.map((r) => r.format))];
  const [format, setFormat] = useState("");
  const [sport, setSport] = useState(false);
  const shown = rows.filter((r) => (!format || r.format === format) && (!sport || r.sport));
  const someSport = rows.some((r) => r.sport) && !rows.every((r) => r.sport);
  const showFilters = formats.length > 1 || someSport;

  return (
    <>
      {showFilters && (
        <div data-md-skip className="mt-6">
          <div role="group" aria-label={`Filter ${label}`} className="flex flex-wrap gap-2">
            {formats.length > 1 &&
              ["", ...formats].map((f) => (
                <button key={f || "all"} type="button" aria-pressed={format === f} onClick={() => setFormat(f)} className={`${CHIP} ${format === f ? on : off}`}>
                  {f || "Any form"}
                </button>
              ))}
            {someSport && (
              <button type="button" aria-pressed={sport} onClick={() => setSport(!sport)} className={`${CHIP} ${sport ? on : off}`}>
                Sport-tested only
              </button>
            )}
          </div>
          <p className="mt-2 text-sm text-muted" aria-live="polite">
            Showing {shown.length} of {rows.length}.
          </p>
        </div>
      )}
      <ul className="mt-4 divide-y divide-line overflow-hidden rounded-card border border-line bg-bg">
        {rows.map((r) => (
          <li key={r.id} hidden={!shown.includes(r)} className="px-4 py-5 sm:px-6">
            {r.node}
          </li>
        ))}
      </ul>
    </>
  );
}
