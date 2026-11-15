import { OG_SIZE, productsOgImage } from "@/lib/og";
import { ALL_GRADES } from "@/lib/grades";
import { hasLotReport, isSportTested } from "@/lib/product-finder";

export const alt = "Peptide product finder: graded products matched to the evidence | PeptideTDB";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return productsOgImage(ALL_GRADES.length, ALL_GRADES.filter(hasLotReport).length, ALL_GRADES.filter(isSportTested).length);
}
