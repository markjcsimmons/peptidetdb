import type { Metadata } from "next";
import Link from "next/link";
import { COMMITTEE, LEGAL_REVIEWED, SOURCES, TIMELINE, type Source } from "@/lib/legal-status";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout } from "@/components/ui";
import { VerticalTimeline } from "@/components/timeline";

export const metadata: Metadata = {
  title: "Are peptides legal in the US? Status Nov 2026",
  description:
    "Which peptides are FDA-approved, which are unapproved, and what changed for pharmacy compounding in 2026, with dated sources and what is still undecided.",
  alternates: { canonical: "/peptides/legal-status" },
};

function SourceList({ sources }: { sources: Source[] }) {
  return (
    <span className="text-sm text-muted">
      {sources.map((s, i) => (
        <span key={s.url}>
          {i > 0 && "; "}
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="link">
            {s.kind === "primary" ? "FDA / federal source" : "News report"}
          </a>
        </span>
      ))}
    </span>
  );
}

export default function LegalStatusPage() {
  const allSources = Object.values(SOURCES) as Source[];
  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Are peptides legal in the US?",
          url: absoluteUrl("/peptides/legal-status"),
          dateModified: LEGAL_REVIEWED,
          publisher: { "@type": "Organization", name: SITE.name },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Peptides", item: absoluteUrl("/peptides") },
            { "@type": "ListItem", position: 2, name: "Legal status", item: absoluteUrl("/peptides/legal-status") },
          ],
        }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          Peptides
        </Link>{" "}
        / Legal status
      </nav>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Are peptides legal in the US?</h1>
      <p className="mt-2 text-sm text-muted">
        Last reviewed {formatDate(LEGAL_REVIEWED)}. This area is changing quickly, so check the linked FDA pages
        for anything newer.
      </p>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          It depends on the peptide and on how it is made and sold. Some peptides are FDA-approved prescription
          drugs. Many popular &ldquo;wellness&rdquo; peptides, such as BPC-157, are not approved for any use. Their
          status for pharmacy compounding changed through 2026: in July an FDA advisory committee recommended six
          of seven peptides it reviewed for FDA&apos;s 503A bulks list, but the vote is not binding, and we found no
          final FDA decision as of {formatDate(LEGAL_REVIEWED)}.
        </p>
      </Callout>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Why there is no single answer</h2>
        <ul className="mt-3 max-w-prose list-disc space-y-2 pl-5">
          <li>
            <strong>Approved drugs.</strong> Numerous peptide drugs have been through FDA approval, which evaluates
            safety and efficacy, while a parallel &ldquo;gray market&rdquo; of unapproved compounds has grown up
            alongside (<PaperLink id="mendias-2026" via="doi">Mendias &amp; Awan, 2026</PaperLink>).
          </li>
          <li>
            <strong>Unapproved compounds.</strong> BPC-157 lacks FDA approval, and its use is banned in professional
            sport (<PaperLink id="vasireddi-2025" via="pmc">Vasireddi et al., 2025</PaperLink>).
          </li>
          <li>
            <strong>Pharmacy compounding.</strong> A licensed pharmacy may compound a drug for an individual patient
            only under conditions set by FDA. One of them is that the bulk substance is on, or covered by FDA&apos;s
            policy for, its bulks lists. This is where most 2026 changes happened.
          </li>
          <li>
            <strong>Supplements, cosmetics and &ldquo;research use only&rdquo; products.</strong> These follow
            different rules and are not covered on this page.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">What happened, in order</h2>
        <div className="mt-6">
          <VerticalTimeline
            items={TIMELINE.map((e) => ({
              key: e.date,
              date: e.label,
              body: (
                <>
                  <p>{e.text}</p>
                  <p className="mt-2">
                    Sources: <SourceList sources={e.sources} />
                  </p>
                </>
              ),
            }))}
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">The July 2026 committee meeting</h2>
        <p className="mt-3 max-w-prose">
          FDA&apos;s Pharmacy Compounding Advisory Committee reviewed seven peptides nominated for the 503A bulks
          list. The uses listed are the ones FDA&apos;s meeting page says were evaluated; the results are as reported
          by news outlets.
        </p>
        <div className="mt-4 overflow-x-auto rounded-tile border border-line">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-card text-muted">
              <tr>
                <th className="px-3 py-2 font-medium">Peptide</th>
                <th className="px-3 py-2 font-medium">Day</th>
                <th className="px-3 py-2 font-medium">Use evaluated</th>
                <th className="px-3 py-2 font-medium">Committee</th>
              </tr>
            </thead>
            <tbody>
              {COMMITTEE.map((r) => (
                <tr key={r.peptide} className="border-t border-line align-top">
                  <td className="px-3 py-2 font-medium">{r.peptide}</td>
                  <td className="px-3 py-2">{r.day}</td>
                  <td className="px-3 py-2">{r.use}</td>
                  <td className="px-3 py-2">{r.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-5">
          <li>
            The BPC-157 vote was reported as 8 in favour, 6 against and 1 abstention. TIME gives the full count only
            for BPC-157.
          </li>
          <li>
            The recommendation is not binding. FDA decides, and adding a substance to the list would require a public
            rulemaking process, which ABC News reports can take up to a year.
          </li>
          <li>
            FDA staff had recommended against listing. TIME reports that staff said the criteria weighed against
            BPC-157 and KPV, citing limited evidence of effectiveness and, for KPV, no human studies; ABC News reports
            that staff opposed all seven.
          </li>
        </ul>
        <p className="mt-3 text-sm text-muted">
          Sources: <SourceList sources={[SOURCES.fdaMeeting, SOURCES.abc, SOURCES.time]} />
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">What this does and does not mean</h2>
        <ul className="mt-3 max-w-prose list-disc space-y-2 pl-5">
          <li>
            A committee vote is advice, not a decision. In our searches we found no later FDA proposed rule or final
            decision on these peptides.
          </li>
          <li>
            Being allowed to be compounded is not the same as being approved, and it is not evidence that a peptide
            works. FDA&apos;s own Category 2 page cites concerns for several of these peptides, including the risk of
            an immune reaction and difficulty characterising the peptide and its impurities. For what the studies
            show, see the{" "}
            <Link href="/science/topics/safety" className="link">
              safety evidence
            </Link>{" "}
            and the{" "}
            <Link href="/science/topics/joints" className="link">
              joints and tendons evidence
            </Link>
            .
          </li>
          <li>Nothing on this page tells you what is lawful in your own situation. It is not legal advice.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Not covered here yet</h2>
        <ul className="mt-3 max-w-prose list-disc space-y-2 pl-5">
          <li>
            HHS has published an interim enforcement-discretion policy for certain peptides under Section 503A (
            <a href={SOURCES.hhsPolicy.url} target="_blank" rel="noopener noreferrer" className="link">
              Appendix B
            </a>
            ). We could not open the document directly when this page was written, so we have not summarised its
            conditions. Read it before relying on this page for anything HHS-related.
          </li>
          <li>Rules for dietary supplements, cosmetics and products sold as &ldquo;research use only&rdquo;.</li>
          <li>Rules outside the United States.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Sources</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {allSources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="link">
                {s.label}
              </a>{" "}
              <span className="chip">{s.kind === "primary" ? "FDA / federal" : "News"}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-sm text-muted">
        {SITE.disclosure} {SITE.disclaimer}
      </p>
    </article>
  );
}
