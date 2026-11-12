import { OG_SIZE, guideOgImage } from "@/lib/og";

export const alt = "Selank | PeptideTDB";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return guideOgImage("/peptides/selank");
}
