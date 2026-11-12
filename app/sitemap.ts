import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { STUDIES } from "@/lib/studies";
import { TOPICS, TOPIC_SLUGS } from "@/lib/topics";
import { LEGAL_REVIEWED } from "@/lib/legal-status";
import { COLLAGEN_CHECKED_ON } from "@/lib/product-checks";

export default function sitemap(): MetadataRoute.Sitemap {
  const stat = (path: string, lastModified: string): MetadataRoute.Sitemap[number] => ({
    url: `${SITE.url}${path}`,
    lastModified,
  });
  return [
    stat("/", SITE.lastReviewed),
    stat("/peptides", SITE.lastReviewed),
    stat("/peptides/how-peptides-work", SITE.lastReviewed),
    stat("/peptides/what-do-peptides-do", "2026-11-10"),
    stat("/peptides/are-peptides-steroids", "2026-11-10"),
    stat("/peptides/collagen-peptides-benefits", "2026-11-10"),
    stat("/peptides/collagen-peptides-side-effects", "2026-11-10"),
    stat("/peptides/marine-vs-bovine-collagen", "2026-11-10"),
    stat("/peptides/how-to-read-a-peptide-coa", "2026-11-10"),
    stat("/peptides/collagen-peptides", "2026-11-10"),
    stat("/peptides/best-collagen-peptides", COLLAGEN_CHECKED_ON),
    stat("/peptides/best-peptides-for-skin", TOPICS.skin.reviewedOn),
    stat("/peptides/peptides-for-hair-growth", TOPICS.hair.reviewedOn),
    stat("/peptides/peptides-for-joint-pain", TOPICS.joints.reviewedOn),
    stat("/peptides/peptides-for-sleep", TOPICS.brain.reviewedOn),
    stat("/peptides/peptides-for-muscle-growth", "2026-11-10"),
    stat("/peptides/bpc-157", "2026-11-10"),
    stat("/peptides/kpv", "2026-11-10"),
    stat("/peptides/selank", "2026-11-10"),
    stat("/peptides/ipamorelin", "2026-11-10"),
    stat("/peptides/cjc-1295", "2026-11-10"),
    stat("/peptides/for-weight-loss", "2026-11-10"),
    stat("/grading-rubric", "2026-11-10"),
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
