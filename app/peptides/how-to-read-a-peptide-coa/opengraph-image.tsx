import { OG_SIZE, guideOgImage } from "@/lib/og";

export const alt = "How to read a peptide COA | PeptideTDB";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return guideOgImage("/peptides/how-to-read-a-peptide-coa");
}
