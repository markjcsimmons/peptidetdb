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
    <div ref={ref} data-md-skip data-noprint>
      {/* Wide screens: sticky in the right margin, beside the article. */}
      <div className="absolute left-full top-0 ml-8 hidden h-full w-48 xl:block">
        <nav aria-label="On this page" className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <p className="mb-2 text-caption font-semibold uppercase tracking-[0.06em] text-muted">On this page</p>
          {links()}
        </nav>
      </div>
      {/* Elsewhere: a collapsible box in the flow. */}
      <details className="mt-8 rounded-tile border border-line bg-card xl:hidden">
        <summary className="flex min-h-11 cursor-pointer items-center px-4 text-sm font-medium">On this page</summary>
        <nav aria-label="On this page" className="px-4 pb-3">
          {links()}
        </nav>
      </details>
    </div>
  );
}
