/**
 * Explanatory diagrams for the homepage and /peptides/how-peptides-work. Bead colours are
 * decoration; the dashed "lock and key" and the amber ripples are schematic, not data.
 * Two sizes of each: `Compact` for cards (320 wide), full for the article (640 wide).
 */
const A = { fill: "var(--bead-a)" };
const B = { fill: "var(--bead-b)" };
const C = { fill: "var(--bead-c)" };
const TEXT_SM = { fill: "var(--muted)", fontFamily: "var(--font-body), sans-serif" } as const;
const TEXT_LG = { fill: "var(--fg)", fontFamily: "var(--font-body), sans-serif" } as const;
const STROKE_MUTED = "var(--muted)";

export function SignalDiagram() {
  return (
    <svg viewBox="0 0 640 150" width="100%" role="img" aria-label="Diagram: a peptide docks into a receptor on a cell, and the cell responds" className="block h-auto">
      <circle cx="86" cy="66" r="14" style={A} />
      <circle cx="116" cy="66" r="14" style={B} />
      <circle cx="146" cy="66" r="14" style={A} />
      <path d="M340 66 L310 45.2 A36 36 0 1 1 310 86.8 Z" style={{ fill: "var(--accent-soft)" }} stroke="var(--accent)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M200 66 L282 66" stroke={STROKE_MUTED} strokeWidth="2.5" strokeDasharray="2 8" strokeLinecap="round" fill="none" />
      <path d="M388 66 L494 66" stroke={STROKE_MUTED} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M484 57 L496 66 L484 75" stroke={STROKE_MUTED} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="568" cy="66" r="10" style={C} />
      <circle cx="568" cy="66" r="24" fill="none" stroke="var(--bead-c)" strokeWidth="2.5" opacity="0.7" />
      <circle cx="568" cy="66" r="38" fill="none" stroke="var(--bead-c)" strokeWidth="2.5" opacity="0.4" />
      <text x="116" y="126" textAnchor="middle" fontSize="14" fontWeight="600" style={TEXT_LG}>
        The peptide
      </text>
      <text x="334" y="126" textAnchor="middle" fontSize="14" fontWeight="600" style={TEXT_LG}>
        Fits a receptor
      </text>
      <text x="568" y="126" textAnchor="middle" fontSize="14" fontWeight="600" style={TEXT_LG}>
        The cell responds
      </text>
    </svg>
  );
}

export function SignalDiagramCompact() {
  return (
    <svg viewBox="0 0 320 130" width="100%" role="img" aria-label="Diagram: a peptide docks into a receptor, and the cell responds" className="block h-auto">
      <circle cx="52" cy="58" r="10" style={A} />
      <circle cx="74" cy="58" r="10" style={B} />
      <circle cx="96" cy="58" r="10" style={A} />
      <path d="M170 58 L148.7 43.1 A26 26 0 1 1 148.7 72.9 Z" style={{ fill: "var(--accent-soft)" }} stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M196 58 L238 58" stroke={STROKE_MUTED} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M232 52 L240 58 L232 64" stroke={STROKE_MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="282" cy="58" r="7" style={C} />
      <circle cx="282" cy="58" r="16" fill="none" stroke="var(--bead-c)" strokeWidth="2" opacity="0.7" />
      <circle cx="282" cy="58" r="25" fill="none" stroke="var(--bead-c)" strokeWidth="2" opacity="0.4" />
      <text x="74" y="104" textAnchor="middle" fontSize="12" style={TEXT_SM}>
        Peptide
      </text>
      <text x="165" y="104" textAnchor="middle" fontSize="12" style={TEXT_SM}>
        Receptor
      </text>
      <text x="282" y="104" textAnchor="middle" fontSize="12" style={TEXT_SM}>
        Cell responds
      </text>
    </svg>
  );
}

export function DigestionDiagram() {
  return (
    <svg viewBox="0 0 640 150" width="100%" role="img" aria-label="Diagram: a long swallowed peptide chain is broken into smaller pieces by digestion" className="block h-auto">
      {[40, 68, 96, 124, 152, 180, 208].map((cx, i) => (
        <circle key={cx} cx={cx} cy="64" r="13" style={i % 2 === 0 ? A : B} />
      ))}
      <path d="M244 64 L350 64" stroke={STROKE_MUTED} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M340 55 L352 64 L340 73" stroke={STROKE_MUTED} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="298" y="50" textAnchor="middle" fontSize="13" style={TEXT_SM}>
        digestion
      </text>
      <circle cx="392" cy="40" r="13" style={A} />
      <circle cx="418" cy="50" r="13" style={B} />
      <circle cx="470" cy="38" r="13" style={A} />
      <circle cx="404" cy="88" r="13" style={B} />
      <circle cx="456" cy="82" r="13" style={A} />
      <circle cx="484" cy="94" r="13" style={B} />
      <circle cx="524" cy="56" r="13" style={A} />
      <circle cx="548" cy="86" r="13" style={B} />
      <circle cx="590" cy="64" r="13" style={A} />
      <text x="124" y="124" textAnchor="middle" fontSize="14" fontWeight="600" style={TEXT_LG}>
        A peptide you swallow
      </text>
      <text x="490" y="130" textAnchor="middle" fontSize="14" fontWeight="600" style={TEXT_LG}>
        Smaller pieces and amino acids
      </text>
    </svg>
  );
}

export function DigestionDiagramCompact() {
  return (
    <svg viewBox="0 0 320 130" width="100%" role="img" aria-label="Diagram: a long swallowed peptide chain is broken into smaller pieces by digestion" className="block h-auto">
      {[22, 42, 62, 82, 102, 122].map((cx, i) => (
        <circle key={cx} cx={cx} cy="58" r="9" style={i % 2 === 0 ? A : B} />
      ))}
      <path d="M146 58 L190 58" stroke={STROKE_MUTED} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M184 52 L192 58 L184 64" stroke={STROKE_MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="214" cy="40" r="9" style={A} />
      <circle cx="233" cy="46" r="9" style={B} />
      <circle cx="266" cy="38" r="9" style={A} />
      <circle cx="224" cy="78" r="9" style={B} />
      <circle cx="258" cy="74" r="9" style={A} />
      <circle cx="278" cy="82" r="9" style={B} />
      <circle cx="296" cy="56" r="9" style={A} />
      <text x="72" y="104" textAnchor="middle" fontSize="12" style={TEXT_SM}>
        Swallowed peptide
      </text>
      <text x="254" y="108" textAnchor="middle" fontSize="12" style={TEXT_SM}>
        Smaller pieces
      </text>
    </svg>
  );
}
