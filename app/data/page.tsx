import type { Metadata } from "next";
import { EXPORT_COLUMNS } from "@/lib/studies-export";
import { STUDIES } from "@/lib/studies";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data: download the study registry",
  description:
    "Download the PeptideTDB study registry as CSV or JSON: identifiers, design, finding, caveat and funding for every study.",
  alternates: { canonical: "/data" },
};

export default function DataPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">Data</h1>
      <p className="mt-3 max-w-prose text-lg text-muted">
        The full registry behind this site, {STUDIES.length} studies, as a download. It updates whenever a study is
        added or changed.
      </p>

      <p className="mt-6 flex flex-wrap gap-3">
        <a
          href="/data/studies.csv"
          className="rounded-lg bg-accent px-5 py-2.5 font-medium text-bg hover:opacity-90"
          download
        >
          Download CSV
        </a>
        <a href="/data/studies.json" className="rounded-lg border border-line bg-card px-5 py-2.5 font-medium hover:border-accent">
          View JSON
        </a>
      </p>

      <p className="mt-6 max-w-prose text-sm text-muted">
        No licence has been chosen yet. If you use the data, please cite {SITE.name} and link to {SITE.url}. The
        summaries are ours; the papers they describe belong to their authors and publishers.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Fields</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[30rem] text-left text-sm">
          <thead className="bg-card text-muted">
            <tr>
              <th className="px-3 py-2 font-medium">Field</th>
              <th className="px-3 py-2 font-medium">What it holds</th>
            </tr>
          </thead>
          <tbody>
            {EXPORT_COLUMNS.map((c) => (
              <tr key={c.key} className="border-t border-line align-top">
                <td className="px-3 py-2 font-mono text-xs">{c.key}</td>
                <td className="px-3 py-2">{c.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
