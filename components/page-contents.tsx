"use client";

import { useEffect, useRef, useState } from "react";

type Heading = { id: string; text: string };

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * "On this page" for long articles. Reads the article's own h2 headings in the browser (giving any heading
 * without an id one made from its text), so pages need no extra markup. Use it only on pages with several h2s:
 * the box is rendered before the headings are read, so it never shifts the page. Shown as a sticky sidebar in the
 * right-hand margin on wide screens and as a collapsible box elsewhere. Place it inside an
 * `<article className="relative …">`. UI only: skipped in the markdown versions.
 */
export function PageContents() {
  const ref = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState("");
  const boxRef = useRef<HTMLDetailsElement>(null);
  // Below `xl`: once the in-flow box has scrolled away, a slim bar pinned to the top keeps the contents one tap away.
  const [pinned, setPinned] = useState(false);
  const [barOpen, setBarOpen] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const observer = new IntersectionObserver(([e]) => {
      const past = !e.isIntersecting && e.boundingClientRect.bottom < 0;
      setPinned(past);
      if (!past) setBarOpen(false);
    });
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const article = ref.current?.closest("article");
    if (!article) return;
    const els = [...article.querySelectorAll("h2")].filter((h) => !h.closest("[data-md-skip]") && h.textContent?.trim());
    const used = new Set<string>();
    const list = els.map((h) => {
      if (!h.id) {
        let id = slug(h.textContent ?? "") || "section";
        while (used.has(id) || document.getElementById(id)) id += "-2";
        h.id = id;
      }
      used.add(h.id);
      h.classList.add("scroll-mt-6");
      return { id: h.id, text: (h.textContent ?? "").trim() };
    });
    setHeadings(list);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    els.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  const links = (onClick?: () => void) => (
    <ol className="space-y-1">
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            onClick={onClick}
            aria-current={active === h.id ? "location" : undefined}
            className={`block rounded-tile py-1.5 text-sm leading-snug hover:text-accent ${
              active === h.id ? "font-semibold text-accent" : "text-soft"
            }`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <div ref={ref} data-md-skip data-noprint data-page-contents>
      {/* Wide screens: sticky in the right margin, beside the article. */}
      <div className="absolute left-full top-0 ml-8 hidden h-full w-48 xl:block">
        <nav aria-label="On this page" className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <p className="mb-2 text-caption font-semibold uppercase tracking-[0.06em] text-muted">On this page</p>
          {links()}
        </nav>
      </div>
      {/* Elsewhere: a collapsible box in the flow… */}
      <details ref={boxRef} className="mt-8 rounded-tile border border-line bg-card xl:hidden">
        <summary className="flex min-h-11 cursor-pointer items-center px-4 text-sm font-medium">On this page</summary>
        <nav aria-label="On this page" className="px-4 pb-3">
          {links()}
        </nav>
      </details>
      {/* …and, once that box is off screen, a bar pinned to the top. */}
      {pinned && headings.length > 0 && (
        <div className="fixed inset-x-0 top-0 z-40 border-b border-line bg-card shadow-sm xl:hidden">
          <button
            type="button"
            aria-expanded={barOpen}
            onClick={() => setBarOpen((o) => !o)}
            className="mx-auto flex min-h-12 w-full max-w-3xl items-center gap-2 px-4 text-left text-sm"
          >
            <span className="shrink-0 text-muted">On this page:</span>
            <span className="min-w-0 flex-1 truncate font-semibold">
              {headings.find((h) => h.id === active)?.text ?? headings[0].text}
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className={`shrink-0 transition-transform ${barOpen ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {barOpen && (
            <nav aria-label="On this page" className="mx-auto max-h-[60vh] max-w-3xl overflow-y-auto px-4 pb-3">
              {links(() => setBarOpen(false))}
            </nav>
          )}
        </div>
      )}
    </div>
  );
}
