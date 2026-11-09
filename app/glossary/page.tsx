import type { Metadata } from "next";
import { GLOSSARY } from "@/lib/glossary";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Peptide glossary",
  description:
    "Plain-language definitions of the terms used when talking about peptides, study designs, lab reports and US compounding rules.",
  alternates: { canonical: "/glossary" },
};

export default function GlossaryPage() {
  const terms = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: `${SITE.name} peptide glossary`,
          url: `${SITE.url}/glossary`,
          hasDefinedTerm: terms.map((t) => ({
            "@type": "DefinedTerm",
            name: t.term,
            description: t.definition,
            url: `${SITE.url}/glossary#${t.id}`,
          })),
        }}
      />
      <h1 className="text-3xl font-bold tracking-tight">Peptide glossary</h1>
      <p className="mt-3 max-w-prose text-lg text-muted">
        The terms used across this site, in plain language.
      </p>
      <dl className="mt-8 space-y-6">
        {terms.map((t) => (
          <div key={t.id} id={t.id} className="scroll-mt-20">
            <dt className="font-semibold">{t.term}</dt>
            <dd className="mt-1 max-w-prose text-muted">{t.definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
