import { OG_SIZE, topicOgImage } from "@/lib/og";
import { TOPIC_SLUGS } from "@/lib/topics";
import type { Topic } from "@/lib/studies";

export const alt = "Peptide evidence page | PeptideTDB";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return TOPIC_SLUGS.map((topic) => ({ topic }));
}

export default async function Image({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  return topicOgImage(topic as Topic);
}
