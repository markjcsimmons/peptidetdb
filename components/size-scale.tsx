import type { ReactNode } from "react";
import { PaperLink } from "@/components/paper-link";
import { BeadRow } from "@/components/beads";

function Cell({ beads, name, note }: { beads: ReactNode; name: string; note: ReactNode }) {
  return (
    <div>
      <div className="flex min-h-9 items-center">{beads}</div>
      <p className="mt-3 font-semibold">{name}</p>
      <p className="mt-0.5 text-sm text-muted">{note}</p>
    </div>
  );
}

/** Amino acid, GHK (3), BPC-157 (15), protein. Lengths come from the cited reviews; bead colours are decoration. */
export function SizeScale() {
  return (
    <div className="grid gap-8 rounded-card border border-line bg-card p-8 sm:grid-cols-2 lg:grid-cols-4">
      <Cell beads={<BeadRow n={1} />} name="Amino acid" note="The building block" />
      <Cell
        beads={<BeadRow n={3} />}
        name="GHK"
        note={
          <>
            3 amino acids, studied for skin repair (
            <PaperLink id="pickart-2015" via="pmc">
              review
            </PaperLink>
            )
          </>
        }
      />
      <Cell
        beads={<BeadRow n={15} size={11} gap={3} />}
        name="BPC-157"
        note={
          <>
            15 amino acids, much discussed for injury recovery (
            <PaperLink id="mcguire-2025" via="pmc">
              review
            </PaperLink>
            )
          </>
        }
      />
      <Cell
        beads={
          <span aria-hidden="true" className="flex max-w-[150px] flex-wrap gap-[3px]">
            {Array.from({ length: 28 }, (_, i) => (
              <span key={i} className="h-[9px] w-[9px] rounded-full bg-muted" />
            ))}
          </span>
        }
        name="Protein"
        note="A long, folded chain, such as collagen"
      />
    </div>
  );
}
