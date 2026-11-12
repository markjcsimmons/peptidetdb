import { OG_SIZE, guideOgImage } from "@/lib/og";

export const alt = "Collagen peptides with published batch test results | PeptideTDB";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return guideOgImage("/peptides/best-collagen-peptides");
}
