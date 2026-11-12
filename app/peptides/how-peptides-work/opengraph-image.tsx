import { OG_SIZE, guideOgImage } from "@/lib/og";

export const alt = "How do peptides work? | PeptideTDB";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return guideOgImage("/peptides/how-peptides-work");
}
