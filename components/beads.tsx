/**
 * Bead graphics: one bead per amino acid. Colours alternate for decoration only; they do not stand
 * for particular amino acids. Colours come from CSS variables so dark mode follows automatically.
 */
const A = { fill: "var(--bead-a)" };
const B = { fill: "var(--bead-b)" };
const C = { fill: "var(--bead-c)" };

/** Hero illustration: a chain of 15 beads, the length reported for BPC-157. */
const POINTS: [number, number][] = [
  [30, 130],
  [60, 167],
  [90, 192],
  [120, 200],
  [150, 187],
  [180, 157],
  [210, 119],
  [240, 84],
  [270, 63],
  [300, 62],
  [330, 81],
  [360, 114],
  [390, 152],
  [420, 183],
  [450, 199],
];

export function BeadChainHero() {
  return (
    <svg
      viewBox="0 0 480 250"
      width="100%"
      role="img"
      aria-label="Illustration: a chain of 15 beads, one bead per amino acid"
      className="block h-auto"
    >
      <circle cx="400" cy="40" r="70" style={{ fill: "var(--accent)" }} opacity="0.12" />
      <circle cx="60" cy="215" r="48" style={{ fill: "var(--accent)" }} opacity="0.12" />
      <polyline
        points={POINTS.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke="var(--bead-a)"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {POINTS.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="13" style={i === 7 ? C : i % 2 === 0 ? A : B} />
      ))}
    </svg>
  );
}

/** A row of small round beads built from HTML, for size comparisons. */
export function BeadRow({ n, size = 14, gap = 4, muted = false, className = "" }: { n: number; size?: number; gap?: number; muted?: boolean; className?: string }) {
  return (
    <span className={`flex flex-wrap items-center ${className}`} style={{ gap }} role="img" aria-label={`${n} amino ${n === 1 ? "acid" : "acids"}`}>
      {Array.from({ length: n }, (_, i) => (
        <span
          key={i}
          className="rounded-full"
          style={{
            width: size,
            height: size,
            background: muted ? "var(--muted)" : i % 2 === 0 ? "var(--bead-a)" : "var(--bead-b)",
          }}
        />
      ))}
    </span>
  );
}
