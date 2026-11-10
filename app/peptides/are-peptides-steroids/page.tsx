import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout } from "@/components/ui";

export const metadata: Metadata = {
  title: "Are peptides steroids?",
  description:
    "No. Peptides are chains of amino acids; anabolic steroids are synthetic relatives of testosterone. Why the two get mixed up, what the muscle studies show, and why 'not a steroid' does not mean 'safe'.",
  alternates: { canonical: "/peptides/are-peptides-steroids" },
};

const NIDA_URL = "https://nida.nih.gov/publications/drugfacts/anabolic-steroids";

const ROWS: { label: string; peptide: React.ReactNode; steroid: React.ReactNode }[] = [
  {
    label: "What it is",
    peptide: "A short chain of amino acids, the same building blocks as proteins.",
    steroid: (
      <>
        A synthetic substance similar to the male sex hormone testosterone (
        <a href={NIDA_URL} target="_blank" rel="noopener noreferrer" className="link">
          NIDA
        </a>
        ).
      </>
    ),
  },
  {
    label: "Chemical family",
    peptide: "Amino-acid chains. They range from three amino acids (GHK) to the 15 of BPC-157.",
    steroid: "Related to testosterone, a hormone that is not an amino-acid chain: a different chemical class.",
  },
  {
    label: "Examples",
    peptide: "Insulin, GLP-1 medicines, collagen peptides, BPC-157, thymosin alpha-1.",
    steroid: "Testosterone and its synthetic variants.",
  },
  {
    label: "Why they are confused",
    peptide: "Some peptides are sold to athletes and gym-goers for recovery or muscle, and some are banned in sport.",
    steroid: "Also discussed in sport and bodybuilding, so the two come up in the same conversations.",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Are peptides steroids?",
    a: "No. Peptides are chains of amino acids. Anabolic steroids are synthetic substances similar to testosterone, which is a different chemical class.",
  },
  {
    q: "Can peptides build muscle?",
    a: "The best human evidence here is for collagen peptides taken alongside resistance training in older men with sarcopenia, in one randomised trial. Evidence for the injectable peptides sold for muscle or recovery is mostly from animals.",
  },
  {
    q: "Are peptides banned in sport?",
    a: "Some are. A 2025 systematic review notes that BPC-157, for example, is banned in professional sport. Check the current anti-doping list before using any peptide if you compete.",
  },
  {
    q: "If peptides are not steroids, are they safe?",
    a: "Not automatically. A 2026 review says rigorous human safety data are scarce for many unapproved peptides and serious harm is possible.",
  },
];

export default function ArePeptidesSteroidsPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: SITE.name, item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "What are peptides?", item: absoluteUrl("/peptides") },
            { "@type": "ListItem", position: 3, name: "Are peptides steroids?", item: absoluteUrl("/peptides/are-peptides-steroids") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Are peptides steroids?
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">Are peptides steroids?</h1>

      <Callout label="Short answer" className="mt-7">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          No. Peptides are chains of amino acids. Anabolic steroids are synthetic substances similar to the male sex
          hormone testosterone, a different chemical class with different effects. People mix them up because both come
          up in sport and bodybuilding. &ldquo;Not a steroid&rdquo; does not mean &ldquo;safe&rdquo; or &ldquo;proven&rdquo;,
          though.
        </p>
      </Callout>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Two different kinds of substance</h2>
        <div className="mt-6 overflow-x-auto rounded-card border border-line bg-card">
          <table className="w-full min-w-[560px] text-left text-base">
            <caption className="sr-only">Peptides compared with anabolic steroids</caption>
            <thead>
              <tr className="border-b border-line text-sm text-muted">
                <th scope="col" className="px-5 py-3 font-semibold">
                  <span className="sr-only">Feature</span>
                </th>
                <th scope="col" className="px-5 py-3 font-semibold">
                  Peptides
                </th>
                <th scope="col" className="px-5 py-3 font-semibold">
                  Anabolic steroids
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label} className="border-b border-line last:border-0 align-top">
                  <th scope="row" className="px-5 py-4 text-sm font-semibold">
                    {r.label}
                  </th>
                  <td className="px-5 py-4 text-soft">{r.peptide}</td>
                  <td className="px-5 py-4 text-soft">{r.steroid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-prose text-sm text-muted">
          Sizes: GHK is three amino acids (<PaperLink id="pickart-2015" via="pmc">review</PaperLink>); BPC-157 is a
          15-amino-acid chain (<PaperLink id="mcguire-2025" via="pmc">review</PaperLink>).
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Do peptides build muscle?</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The human evidence that exists is modest. In one randomised trial of older men with sarcopenia, collagen
          peptides on top of resistance training were followed by larger strength and muscle gains than training with
          placebo (<PaperLink id="zdzieblik-2015" via="pmc">Zdzieblik 2015</PaperLink>). That is one trial in one
          group, not evidence about young lifters or about other peptides. For the injectable peptides sold for
          recovery, such as BPC-157, reviews describe a lot of animal work and almost no human data (
          <PaperLink id="vasireddi-2025" via="pmc">Vasireddi 2025</PaperLink>). See the full{" "}
          <Link href="/science/topics/muscle" className="link">
            muscle evidence
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Sport and safety</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Not being a steroid does not put a peptide outside the rules of sport: a 2025 systematic review notes that
          BPC-157, for example, is banned in professional sport (
          <PaperLink id="vasireddi-2025" via="pmc">
            Vasireddi 2025
          </PaperLink>
          ). Athletes who are tested should check the current anti-doping list for any peptide.
        </p>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Nor does it make a peptide safe. A 2026 review concludes that for many unapproved peptides{" "}
          <PaperLink id="mendias-2026" via="doi">
            rigorous human safety data are scarce and serious harm is possible
          </PaperLink>
          . Collagen supplements are a different case; see the{" "}
          <Link href="/science/topics/safety" className="link">
            safety evidence
          </Link>{" "}
          and the{" "}
          <Link href="/peptides/legal-status" className="link">
            dated legal status page
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Common questions</h2>
        <div className="mt-5 space-y-6">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-1 max-w-prose text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-card border border-line bg-card p-7">
        <h2 className="text-xl font-bold">Keep going</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { href: "/peptides", label: "What are peptides? Types, evidence and safety" },
            { href: "/peptides/what-do-peptides-do", label: "What do peptides do?" },
            { href: "/peptides/peptides-for-muscle-growth", label: "Peptides for muscle growth" },
            { href: "/peptides/legal-status", label: "Are peptides legal in the US?" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex min-h-14 items-center rounded-tile border border-line bg-bg px-[18px] py-3 font-medium hover:border-accent"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-10 text-sm text-muted">
        The steroid definition is from NIDA&rsquo;s DrugFacts page on anabolic steroids (page dated May 2023). {SITE.disclosure}{" "}
        {SITE.disclaimer} Last reviewed {formatDate("2026-11-10")}.
      </p>
    </article>
  );
}
