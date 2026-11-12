import { OG_SIZE, guideOgImage } from "@/lib/og";

export const alt = "Best peptides for skin | PeptideTDB";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return guideOgImage("/peptides/best-peptides-for-skin");
}
