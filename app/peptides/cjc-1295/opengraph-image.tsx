import { OG_SIZE, guideOgImage } from "@/lib/og";

export const alt = "CJC-1295 | PeptideTDB";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return guideOgImage("/peptides/cjc-1295");
}
