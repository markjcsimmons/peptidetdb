import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout } from "@/components/ui";
import { TopicCard } from "@/components/topic-card";
import { TOPIC_SLUGS } from "@/lib/topics";
import { PageContents } from "@/components/page-contents";
import { PageKindLabel } from "@/components/guide-links";

export const metadata: Metadata = {
  title: "What do peptides do?",
  description:
    "Peptides do very different things depending on the type: signalling in the body, prescription drugs, supplements and unapproved compounds. What human studies show for each use, and where there are none.",
  alternates: { canonical: "/peptides/what-do-peptides-do" },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "What do peptides do in the body?",
    a: "Some act as signals between cells, binding a receptor and changing what the cell does; others are digested like any protein. Which one applies depends on the peptide and on how it is taken.",
  },
  {
    q: "What do peptide supplements do?",
    a: "The best-studied are oral collagen peptides: two meta-analyses of randomised trials report better skin hydration and elasticity than placebo. Evidence for muscle, joints and other uses is smaller or mixed.",
  },
  {
    q: "Do injectable peptides like BPC-157 work?",
    a: "Reviews describe mostly animal evidence: one systematic review found 35 preclinical studies and one clinical report. The claimed benefits remain unsubstantiated by human trials, according to a 2026 scoping review.",
  },
  {
    q: "Do peptides boost the immune system?",
    a: "Thymic peptides have been tested in people, but mostly as injections in hospital patients. A large trial in sepsis found no difference in deaths. We found no trial of an over-the-counter product for immune support.",
  },
];

export default function WhatDoPeptidesDoPage() {
  const topics = TOPIC_SLUGS.filter((t) => t !== "safety");
  return (
    <article className="relative mx-auto max-w-3xl">
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
            { "@type": "ListItem", position: 3, name: "What do peptides do?", item: absoluteUrl("/peptides/what-do-peptides-do") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / What they do
      </nav>
      <PageKindLabel path="/peptides/what-do-peptides-do" />
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">What do peptides do?</h1>

      <Callout label="Short answer" className="mt-7">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          It depends on which peptide you mean. In the body, some peptides act as signals between cells. Approved peptide
          drugs such as insulin and the GLP-1 medicines are built on that idea. For consumer products, human studies show
          a modest effect of oral collagen peptides on skin, smaller or mixed results for muscle and joints, and for most
          injectable peptides sold online, mainly animal evidence.
        </p>
      </Callout>

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What the studies show, by use</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Each card gives the best-supported and least-supported rating on that topic, from the studies summarised on
          this site. Open a card for every rating, the studies behind it and what they cannot show.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {topics.map((slug) => (
            <TopicCard key={slug} slug={slug} compact />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Three things to keep in mind</h2>
        <ul className="mt-5 space-y-4">
          <li className="max-w-prose text-soft [text-wrap:pretty]">
            <strong className="text-fg">Mechanism is not proof.</strong> A peptide that switches on genes in a dish may do
            nothing in people. A 2026 scoping review found that most publications on six popular injectable peptides used
            animal models, and concluded the claimed benefits{" "}
            <PaperLink id="tewari-2026" via="doi">
              remain unsubstantiated by human trials
            </PaperLink>
            . See{" "}
            <Link href="/peptides/how-peptides-work" className="link">
              how peptides work
            </Link>
            .
          </li>
          <li className="max-w-prose text-soft [text-wrap:pretty]">
            <strong className="text-fg">Results do not transfer between peptides or routes.</strong> The trials of
            thymosin alpha-1 in sepsis (
            <PaperLink id="wu-2025" via="pmc">
              Wu 2025
            </PaperLink>
            ) used hospital injections and found no difference in deaths. They say nothing about a thymus supplement.
            Results for GLP-1 drugs likewise do not carry over to unapproved compounds.
          </li>
          <li className="max-w-prose text-soft [text-wrap:pretty]">
            <strong className="text-fg">Who paid matters.</strong> Several of the trials here report industry funding or
            fees, and each study page states what the record says. See the{" "}
            <Link href="/science/methodology" className="link">
              methodology
            </Link>
            .
          </li>
        </ul>
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
            { href: "/peptides/are-peptides-steroids", label: "Are peptides steroids?" },
            { href: "/peptides/oral-marine-peptides", label: "Do oral marine peptides work?" },
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
        {SITE.disclaimer} Last reviewed {formatDate("2026-11-10")}.
      </p>
    </article>
  );
}
