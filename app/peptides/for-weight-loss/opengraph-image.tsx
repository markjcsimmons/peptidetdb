import { OG_SIZE, guideOgImage } from "@/lib/og";

export const alt = "Peptides for weight loss | PeptideTDB";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return guideOgImage("/peptides/for-weight-loss");
}
