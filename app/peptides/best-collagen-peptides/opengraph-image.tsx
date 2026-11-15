import { OG_SIZE, guideOgImage } from "@/lib/og";

import { COLLAGEN_PAGE_TITLE } from "@/lib/grades";

export const alt = `${COLLAGEN_PAGE_TITLE} | PeptideTDB`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return guideOgImage("/peptides/best-collagen-peptides");
}
