import { toCsv } from "@/lib/studies-export";

export const dynamic = "force-static";

export function GET() {
  return new Response(toCsv(), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="peptidetdb-studies.csv"',
    },
  });
}
