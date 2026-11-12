"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { GLOSSARY } from "@/lib/glossary";

/**
 * A glossary term with its definition on hover, focus or tap. The definition comes from lib/glossary.ts and links
 * to the glossary page. The pop-up is UI only and is skipped in the markdown versions.
 */
export function Term({ id, children }: { id: string; children: ReactNode }) {
  const entry = GLOSSARY.find((t) => t.id === id);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const tipId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  if (!entry) throw new Error(`Term: no glossary entry "${id}"`);
  return (
    <span ref={ref} className="relative inline" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-describedby={open ? tipId : undefined}
        onClick={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        onBlur={(e) => {
          if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
        }}
        className="cursor-help text-left underline decoration-dotted decoration-1 underline-offset-4"
      >
        {children}
      </button>
      {open && (
        <span
          id={tipId}
          role="tooltip"
          data-md-skip
          className="absolute left-0 top-full z-40 mt-2 block w-64 max-w-[80vw] rounded-tile border border-line bg-card p-3 text-left text-sm font-normal normal-case leading-snug tracking-normal text-soft shadow-lg"
        >
          <span className="block font-semibold text-fg">{entry.term}</span>
          <span className="mt-1 block">{entry.definition}</span>
          <a href={`/glossary#${entry.id}`} className="link mt-2 inline-block">
            Glossary
          </a>
        </span>
      )}
    </span>
  );
}
