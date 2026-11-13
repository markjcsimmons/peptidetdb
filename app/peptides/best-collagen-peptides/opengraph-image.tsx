import { OG_SIZE, guideOgImage } from "@/lib/og";

export const alt = "Best collagen peptides: 15 brands graded | PeptideTDB";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return guideOgImage("/peptides/best-collagen-peptides");
}
