"use client";

import { useState, type ReactNode } from "react";

/**
 * Wraps a long list whose later items carry `max-md:[[data-js]_&]:hidden` and a `max-md:[[data-open]_&]:!…` display
 * class: on phones only the first items show until "Show all" is pressed. Everything is in the HTML (and markdown),
 * nothing is hidden when scripts are off, and wider screens always show the whole list.
 */
export function PhoneMore({ children, label }: { children: ReactNode; label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div data-open={open ? "" : undefined}>
      {children}
      {!open && (
        <button
          type="button"
          data-md-skip
          data-noprint
          onClick={() => setOpen(true)}
          className="mt-3 hidden min-h-12 w-full items-center justify-center rounded-tile border border-line bg-card font-semibold hover:border-accent max-md:[[data-js]_&]:flex"
        >
          {label}
        </button>
      )}
    </div>
  );
}
