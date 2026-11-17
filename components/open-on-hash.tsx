"use client";

import { useEffect } from "react";

/**
 * Opens a collapsed <details> when the URL's #fragment points at it (or at something inside it), e.g. a product's
 * scoring sheet linked from site search, then scrolls it into view. Rendered once in the root layout.
 */
export function OpenOnHash() {
  useEffect(() => {
    const run = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      const details = el?.closest("details");
      if (!el || !details) return;
      details.open = true;
      // After load the browser's own jump can land before the sheet is open (or be undone by scroll restoration),
      // so scroll once things have settled.
      window.setTimeout(() => el.scrollIntoView(), 60);
    };
    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
  }, []);
  return null;
}
