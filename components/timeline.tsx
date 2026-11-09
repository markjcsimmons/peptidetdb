import type { ReactNode } from "react";

export type TimelineItem = { key: string; date: string; body: ReactNode; now?: boolean };

/** Short dated steps in a row (homepage). Collapses to a grid on small screens. */
export function HorizontalTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((e) => (
        <li key={e.key} className={`relative border-t-2 pt-5 ${e.now ? "border-accent" : "border-track"}`}>
          <span
            aria-hidden="true"
            className={`absolute -top-2 left-0 h-3.5 w-3.5 rounded-full ${e.now ? "bg-accent" : "bg-muted"}`}
          />
          <p className={`text-sm font-semibold ${e.now ? "text-accent" : "text-muted"}`}>{e.date}</p>
          <div className="mt-1.5 text-sm leading-relaxed text-soft">{e.body}</div>
        </li>
      ))}
    </ol>
  );
}

/** Longer dated entries down a rail (legal page). */
export function VerticalTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative ml-2 border-l-2 border-track">
      {items.map((e) => (
        <li key={e.key} className="relative pb-8 pl-8 last:pb-0">
          <span
            aria-hidden="true"
            className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-bg ${e.now ? "bg-accent" : "bg-muted"}`}
          />
          <p className={`text-sm font-semibold ${e.now ? "text-accent" : "text-muted"}`}>{e.date}</p>
          <div className="mt-1.5 max-w-prose">{e.body}</div>
        </li>
      ))}
    </ol>
  );
}
