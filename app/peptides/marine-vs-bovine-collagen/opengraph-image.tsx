import { OG_SIZE, guideOgImage } from "@/lib/og";

export const alt = "Marine vs bovine collagen | PeptideTDB";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return guideOgImage("/peptides/marine-vs-bovine-collagen");
}
