import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { STUDIES } from "@/lib/studies";
import { TOPICS, TOPIC_SLUGS } from "@/lib/topics";

export default function sitemap(): MetadataRoute.Sitemap {
  const stat = (path: string, lastModified: string): MetadataRoute.Sitemap[number] => ({
    url: `${SITE.url}${path}`,
    lastModified,
  });
  return [
    stat("/", SITE.lastReviewed),
    stat("/science", SITE.lastReviewed),
    stat("/science/methodology", SITE.lastReviewed),
    ...TOPIC_SLUGS.map((t) => stat(`/science/topics/${t}`, TOPICS[t].reviewedOn)),
    ...STUDIES.map((s) => stat(`/science/${s.id}`, s.verifiedOn)),
  ];
}
