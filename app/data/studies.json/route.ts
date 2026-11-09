import { EXPORT_ROWS } from "@/lib/studies-export";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    source: SITE.name,
    url: SITE.url,
    generated: SITE.lastReviewed,
    count: EXPORT_ROWS.length,
    studies: EXPORT_ROWS,
  });
}
