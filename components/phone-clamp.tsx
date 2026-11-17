"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * On phones, shows the first few lines of a long block with a "Read the full answer" button, so what follows (the
 * ranking table on list pages) reaches the first screen. Wider screens always show everything. The clamp is CSS keyed
 * on `html[data-js]` (set before paint in `app/layout.tsx`), so there is no layout shift and nothing is hidden when
 * scripts are off. The full text is always in the HTML and in the markdown versions; the button is skipped there.
 */
export function PhoneClamp({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [fits, setFits] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || open) return;
    const check = () => setFits(el.scrollHeight <= el.clientHeight + 2);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [open]);

  const clamped = !open && !fits;

  return (
    <>
      <div
        ref={ref}
        className={open ? "" : "relative max-sm:[[data-js]_&]:max-h-44 max-sm:[[data-js]_&]:overflow-hidden"}
      >
        {children}
        {clamped && (
          <span
            aria-hidden
            data-md-skip
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-12 bg-gradient-to-t from-accent-soft to-transparent max-sm:[[data-js]_&]:block"
          />
        )}
      </div>
      {clamped && (
        <button
          type="button"
          data-md-skip
          data-noprint
          aria-expanded={false}
          onClick={() => setOpen(true)}
          className="mt-3 hidden min-h-11 items-center font-semibold text-accent underline underline-offset-4 max-sm:[[data-js]_&]:inline-flex"
        >
          Read the full answer
        </button>
      )}
    </>
  );
}
