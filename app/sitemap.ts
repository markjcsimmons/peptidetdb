import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { STUDIES } from "@/lib/studies";
import { TOPICS, TOPIC_SLUGS } from "@/lib/topics";
import { LEGAL_REVIEWED } from "@/lib/legal-status";

export default function sitemap(): MetadataRoute.Sitemap {
  const stat = (path: string, lastModified: string): MetadataRoute.Sitemap[number] => ({
    url: `${SITE.url}${path}`,
    lastModified,
  });
  return [
    stat("/", SITE.lastReviewed),
    stat("/peptides", SITE.lastReviewed),
    stat("/peptides/how-peptides-work", SITE.lastReviewed),
    stat("/peptides/legal-status", LEGAL_REVIEWED),
    stat("/peptides/oral-marine-peptides", SITE.lastReviewed),
    stat("/science", SITE.lastReviewed),
    stat("/science/methodology", SITE.lastReviewed),
    stat("/about", SITE.lastReviewed),
    stat("/editorial-policy", SITE.lastReviewed),
    stat("/corrections", SITE.lastReviewed),
    stat("/data", SITE.lastReviewed),
    stat("/glossary", SITE.lastReviewed),
    ...TOPIC_SLUGS.map((t) => stat(`/science/topics/${t}`, TOPICS[t].reviewedOn)),
    ...STUDIES.map((s) => stat(`/science/${s.id}`, s.verifiedOn)),
  ];
}
