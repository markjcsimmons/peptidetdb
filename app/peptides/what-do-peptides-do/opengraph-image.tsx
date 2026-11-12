import { OG_SIZE, guideOgImage } from "@/lib/og";

export const alt = "What do peptides do? | PeptideTDB";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return guideOgImage("/peptides/what-do-peptides-do");
}
