import Link from "next/link";
import { shortCite, type Study } from "@/lib/studies";
import { FUNDING_LABEL, SIZE, fundingType, type FundingType } from "@/lib/study-meta";

const nf = new Intl.NumberFormat("en-US");

const FUNDING_ORDER: { key: FundingType; fill: string }[] = [
  { key: "industry", fill: "var(--warn)" },
  { key: "other", fill: "var(--warn-soft)" },
  { key: "public", fill: "var(--accent)" },
  { key: "not-stated", fill: "var(--track)" },
];

/** "Who paid for the research?": studies grouped by what their records say about funding and ties. */
export function FundingMix({ studies }: { studies: Study[] }) {
  if (studies.length === 0) return null;
  const counts = FUNDING_ORDER.map((f) => ({ ...f, n: studies.filter((s) => fundingType(s.id) === f.key).length }));
  const text = `Funding of the ${studies.length} studies: ${counts
    .filter((c) => c.n)
    .map((c) => `${FUNDING_LABEL[c.key].toLowerCase()}: ${c.n}`)
    .join("; ")}.`;
  return (
    <figure className="m-0">
      <figcaption className="text-caption font-semibold uppercase tracking-[0.06em] text-muted">Who paid for the research?</figcaption>
      <div role="img" aria-label={text} data-md-text={text} className="mt-3 flex h-4 w-full overflow-hidden rounded-full border border-line">
        {counts
          .filter((c) => c.n)
          .map((c) => (
            <span key={c.key} title={`${FUNDING_LABEL[c.key]}: ${c.n}`} style={{ width: `${(c.n / studies.length) * 100}%`, background: c.fill }} />
          ))}
      </div>
      <ul data-md-skip className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-soft">
        {counts.map((c) => (
          <li key={c.key} className={`flex items-center gap-2 ${c.n === 0 ? "text-muted" : ""}`}>
            <span aria-hidden className="inline-block h-3 w-3 shrink-0 rounded-sm border border-line" style={{ background: c.fill }} />
            {FUNDING_LABEL[c.key]} <span className="font-semibold text-fg">{c.n}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-sm text-muted">
        Read from each record&rsquo;s funding and conflict-of-interest statements. Industry funding does not make a result
        wrong, but it is worth knowing.
      </p>
    </figure>
  );
}

const SINGLE = ["human-controlled", "human-uncontrolled"];
const POOLED = ["meta-analysis", "systematic-review"];

/** Headline numbers computed from the registry: how many human studies, how big, how many industry-linked. */
export function KeyNumbers({ studies }: { studies: Study[] }) {
  const human = studies.filter((s) => SINGLE.includes(s.kind));
  const controlled = studies.filter((s) => s.kind === "human-controlled");
  const sized = human.filter((s) => SIZE[s.id]);
  const largest = [...sized].sort((a, b) => SIZE[b.id].people - SIZE[a.id].people)[0];
  const pooled = studies.filter((s) => POOLED.includes(s.kind) && SIZE[s.id]?.trials);
  const biggestPool = [...pooled].sort((a, b) => SIZE[b.id].people - SIZE[a.id].people)[0];
  const industry = studies.filter((s) => fundingType(s.id) === "industry").length;
  const tiles: { value: string; label: string; href?: string }[] = [
    { value: String(controlled.length), label: controlled.length === 1 ? "controlled human trial" : "controlled human trials" },
    largest
      ? { value: nf.format(SIZE[largest.id].people), label: `people in the largest single study (${shortCite(largest)})`, href: `/science/${largest.id}` }
      : { value: "–", label: "no human study with a stated size" },
    biggestPool
      ? {
          value: `${SIZE[biggestPool.id].trials} trials`,
          label: `in the largest pooled analysis, ${nf.format(SIZE[biggestPool.id].people)} people (${shortCite(biggestPool)})`,
          href: `/science/${biggestPool.id}`,
        }
      : { value: "0", label: "pooled analyses with a stated size" },
    { value: `${industry} of ${studies.length}`, label: "studies with industry funding or ties to the maker" },
  ];
  return (
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {tiles.map((t) => (
        <div key={t.label} className="rounded-tile border border-line bg-card px-4 py-3">
          <dt className="sr-only">{t.label}</dt>
          <dd className="font-heading text-2xl font-bold leading-tight">{t.value}</dd>
          <dd className="mt-1 text-sm leading-snug text-muted">
            {t.href ? (
              <Link href={t.href} className="hover:text-accent hover:underline">
                {t.label}
              </Link>
            ) : (
              t.label
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * "How many people were studied?": one bar per single human study with a stated size, on a log scale (labelled),
 * because sizes run from one person to tens of thousands. Pooled analyses are listed underneath.
 */
export function StudySizes({ studies }: { studies: Study[] }) {
  const singles = studies.filter((s) => SINGLE.includes(s.kind) && SIZE[s.id]).sort((a, b) => SIZE[b.id].people - SIZE[a.id].people);
  const pooled = studies.filter((s) => POOLED.includes(s.kind) && SIZE[s.id]).sort((a, b) => SIZE[b.id].people - SIZE[a.id].people);
  const unsized = studies.filter((s) => (SINGLE.includes(s.kind) || POOLED.includes(s.kind)) && !SIZE[s.id]).length;
  if (singles.length === 0 && pooled.length === 0) return null;
  const max = Math.max(10, ...singles.map((s) => SIZE[s.id].people));
  const top = 10 ** Math.ceil(Math.log10(max));
  const w = (n: number) => `${Math.max(2, (Math.log10(Math.max(n, 1)) / Math.log10(top)) * 100)}%`;
  const ticks = Array.from({ length: Math.log10(top) + 1 }, (_, i) => 10 ** i);
  return (
    <figure className="m-0">
      <figcaption className="text-caption font-semibold uppercase tracking-[0.06em] text-muted">How many people were studied?</figcaption>
      {singles.length > 0 && (
        <>
          <p className="mt-2 text-sm text-muted">Single human studies. The scale grows by ten at each mark, so bars look closer than they are.</p>
          <ul className="mt-3 space-y-1.5">
            {singles.map((s) => (
              <li key={s.id} className="grid grid-cols-[minmax(0,9rem)_1fr] items-center gap-3 text-sm sm:grid-cols-[minmax(0,12rem)_1fr]">
                <span className="truncate">
                  <Link href={`/science/${s.id}`} className="link">
                    {shortCite(s)}
                  </Link>
                  <span className="sr-only">: </span>
                </span>
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className={`block h-3 rounded-full ${s.kind === "human-controlled" ? "bg-accent" : "bg-mix-uncontrolled"}`}
                    style={{ width: w(SIZE[s.id].people) }}
                  />
                  <span className="whitespace-nowrap font-semibold">{nf.format(SIZE[s.id].people)}</span>
                  <span className="sr-only">{s.kind === "human-controlled" ? " people, controlled" : " people, uncontrolled"}</span>
                </span>
              </li>
            ))}
          </ul>
          <div aria-hidden data-md-skip className="mt-1 grid grid-cols-[minmax(0,9rem)_1fr] gap-3 sm:grid-cols-[minmax(0,12rem)_1fr]">
            <span />
            <span className="relative h-5 border-t border-line">
              {ticks.map((t) => (
                <span key={t} className="absolute top-1 -translate-x-1/2 text-caption text-muted" style={{ left: `${(Math.log10(t) / Math.log10(top)) * 100}%` }}>
                  {nf.format(t)}
                </span>
              ))}
            </span>
          </div>
          <p data-md-skip className="mt-2 flex flex-wrap gap-x-5 text-sm text-soft">
            <span className="flex items-center gap-2">
              <span aria-hidden className="inline-block h-3 w-3 rounded-sm bg-accent" /> Controlled
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden className="inline-block h-3 w-3 rounded-sm bg-mix-uncontrolled" /> No comparison group
            </span>
          </p>
        </>
      )}
      {pooled.length > 0 && (
        <>
          <p className="mt-5 text-sm font-semibold">Pooled analyses</p>
          <ul className="mt-1 space-y-1 text-sm text-soft">
            {pooled.map((s) => (
              <li key={s.id}>
                <Link href={`/science/${s.id}`} className="link">
                  {shortCite(s)}
                </Link>
                : {SIZE[s.id].trials ? `${SIZE[s.id].trials} trials or studies, ` : ""}
                {nf.format(SIZE[s.id].people)} people
              </li>
            ))}
          </ul>
        </>
      )}
      {unsized > 0 && (
        <p className="mt-3 text-sm text-muted">
          {unsized} more human {unsized === 1 ? "study or pooled analysis has" : "studies or pooled analyses have"} no stated number of people, so{" "}
          {unsized === 1 ? "it is" : "they are"} not shown.
        </p>
      )}
    </figure>
  );
}
