import { buildSearchIndex } from "@/lib/search-index";

export const dynamic = "force-static";

/** Static index for the site search dialog. Not a page: kept out of search engines with X-Robots-Tag. */
export function GET() {
  return new Response(JSON.stringify(buildSearchIndex()), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  });
}
