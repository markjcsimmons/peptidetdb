import type { ReactNode } from "react";

export type Tone = "accent" | "warn" | "neutral";

const PILL: Record<Tone, string> = {
  accent: "bg-accent-soft text-accent",
  warn: "bg-warn-soft text-warn",
  neutral: "bg-line text-fg",
};

/** A short status label. Always carries text, so colour is never the only signal. */
export function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-caption font-semibold ${PILL[tone]}`}>
      {children}
    </span>
  );
}

const CALLOUT: Record<"accent" | "warn", string> = {
  accent: "bg-accent-soft",
  warn: "bg-warn-soft",
};
const CALLOUT_LABEL: Record<"accent" | "warn", string> = {
  accent: "text-accent",
  warn: "text-warn",
};

/**
 * The one callout style: a tinted block with a small label. Replaces the old left-border box.
 * `label` is visible; pass `srOnlyLabel` to keep it for screen readers only.
 */
export function Callout({
  tone = "accent",
  label,
  as: Heading = "h2",
  children,
  className = "",
}: {
  tone?: "accent" | "warn";
  label?: string;
  as?: "h2" | "h3";
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-card px-6 py-6 sm:px-8 ${CALLOUT[tone]} ${className}`}>
      {label && (
        <Heading
          className={`mb-2 text-caption font-semibold uppercase tracking-[0.08em] [font-family:var(--font-body)] ${CALLOUT_LABEL[tone]}`}
        >
          {label}
        </Heading>
      )}
      {children}
    </section>
  );
}

/** Section heading with an optional eyebrow and intro, used on overview pages. */
export function SectionHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
}) {
  return (
    <>
      {eyebrow && <p className="mb-3 text-caption font-semibold uppercase tracking-[0.08em] text-accent">{eyebrow}</p>}
      <h2 className="text-3xl font-bold leading-[1.12] sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">{intro}</p>}
    </>
  );
}

/** Shared card surface. */
export const CARD = "rounded-card border border-line bg-card p-6 sm:p-7";

/**
 * The "Short answer" box at the top of guide pages: the verdict a reader came for, so it is the strongest block on
 * the page. A thin accent outline, a labelled heading with an icon, larger text, and the site's bead motif as a
 * quiet decoration (hidden from screen readers and the markdown versions).
 */
export function ShortAnswer({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section
      aria-labelledby="short-answer"
      className={`relative overflow-hidden rounded-card border border-accent bg-accent-soft px-6 pb-7 pt-6 shadow-sm sm:px-9 sm:pb-8 sm:pt-7 ${className}`}
    >
      <span aria-hidden data-md-skip className="pointer-events-none absolute right-5 top-5 hidden gap-1.5 sm:flex">
        {["var(--bead-a)", "var(--bead-b)", "var(--bead-c)"].map((c) => (
          <span key={c} className="block h-3 w-3 rounded-full" style={{ background: c }} />
        ))}
      </span>
      <h2
        id="short-answer"
        className="flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.1em] text-accent [font-family:var(--font-body)]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12a8.5 8.5 0 0 1-12.4 7.6L3 21l1.4-5.4A8.5 8.5 0 1 1 21 12Z" />
          <path d="m8.5 12 2.3 2.3 4.7-4.6" />
        </svg>
        Short answer
      </h2>
      <div className="mt-3 text-fg">{children}</div>
    </section>
  );
}
