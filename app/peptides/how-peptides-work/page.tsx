import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { DigestionDiagram, SignalDiagram } from "@/components/diagrams";

export const metadata: Metadata = {
  title: "How do peptides work?",
  description:
    "Some peptides act as signals between cells, some are digested like any protein, and a mechanism in the lab is not proof a product works in people. What the studies say.",
  alternates: { canonical: "/peptides/how-peptides-work" },
};

type Tone = "accent" | "warn" | "neutral";
const PILL: Record<Tone, string> = {
  accent: "bg-accent-soft text-accent",
  warn: "bg-warn-soft text-warn",
  neutral: "bg-line text-fg",
};

function Pill({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-[13px] font-semibold leading-[22px] ${PILL[tone]}`}>
      {children}
    </span>
  );
}

function StepHead({ n, title }: { n: number; title: string }) {
  return (
    <>
      <p className="mb-2 font-heading text-[15px] font-bold text-accent">{n}</p>
      <h2 className="text-[28px] font-bold leading-[1.15] sm:text-[32px]">{title}</h2>
    </>
  );
}

function Chevron() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" className="shrink-0">
      <path d="M7 4 L15 11 L7 18" stroke="var(--muted)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const NODE = "inline-flex min-h-11 items-center rounded-xl border border-track bg-bg px-[18px] font-medium";

/** Five rungs of evidence, weakest to strongest. Shade = share of --accent mixed into the page colour. */
const RUNGS: { label: string; height: number; mix: number }[] = [
  { label: "Cells in a dish", height: 44, mix: 12 },
  { label: "Animals", height: 68, mix: 28 },
  { label: "Small human reports, no comparison group", height: 92, mix: 45 },
  { label: "Controlled human trials", height: 116, mix: 70 },
  { label: "Pooled analyses of trials", height: 140, mix: 100 },
];

const MARKERS: { name: string; note: string; col: string; tone: Tone }[] = [
  { name: "GHK for skin repair", note: "Mainly animal and cell work (review)", col: "1 / span 2", tone: "warn" },
  { name: "BPC-157", note: "35 animal studies, 1 clinical report", col: "2 / span 2", tone: "warn" },
  { name: "Valyl-tyrosine", note: "One randomised trial, 29 people", col: "4 / span 1", tone: "accent" },
  { name: "Oral collagen, skin", note: "Two meta-analyses", col: "5 / span 1", tone: "accent" },
];

export default function HowPeptidesWorkPage() {
  return (
    <article className="mx-auto max-w-[880px]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: SITE.name, item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "What are peptides?", item: absoluteUrl("/peptides") },
            { "@type": "ListItem", position: 3, name: "How do peptides work?", item: absoluteUrl("/peptides/how-peptides-work") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / How they work
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-[52px]">How do peptides work?</h1>

      <section className="mt-7 rounded-[20px] bg-accent-soft px-8 py-7">
        <h2 className="mb-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent [font-family:var(--font-body)]">
          Short answer
        </h2>
        <p className="text-[19px] leading-[1.55] [text-wrap:pretty]">
          It depends on the peptide and on how it gets into the body. Some peptides act as signals: they attach to a
          receptor on a cell and change what the cell does. Peptides you swallow are mostly handled by digestion, like
          other protein. And for many peptides sold to consumers, the way they are said to work comes from lab and
          animal research, which is not proof they work in people.
        </p>
      </section>

      {/* 1. Signals */}
      <section className="mt-20">
        <StepHead n={1} title="Some peptides are signals" />
        <p className="mt-4 text-soft [text-wrap:pretty]">
          Cells talk to each other with chemical messengers, and some of those messengers are short chains of amino
          acids. The usual picture is a lock and key: the peptide fits a receptor on or in a target cell, and that starts
          a change in the cell. This is general biology rather than a finding of any one study on this site, but it is
          why researchers pay attention to peptides, and it is how the approved peptide drugs, insulin and the GLP-1
          medicines among them, are designed to act.
        </p>
        <div className="mt-7 rounded-[20px] border border-line bg-card p-7">
          <SignalDiagram />
        </div>
        <p className="mt-7 text-soft">
          The same idea underlies claims about consumer peptides, with a big difference in how well it is tested. Two
          examples from the studies here:
        </p>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-card p-6">
            <Pill tone="warn">Cell and animal work</Pill>
            <h3 className="mt-3 text-xl font-bold leading-tight">GHK, a three-amino-acid peptide</h3>
            <p className="mt-2.5 text-base text-soft">
              A review describes it as a natural modulator of many pathways in skin repair, mainly from animal and cell
              work, and reports it can raise or lower the activity of thousands of genes (
              <PaperLink id="pickart-2015" via="pmc">
                Pickart 2015
              </PaperLink>
              ). Changing gene activity in a dish is a mechanism hint, not a clinical result.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-card p-6">
            <Pill tone="accent">Checked in people, once</Pill>
            <h3 className="mt-3 text-xl font-bold leading-tight">Valyl-tyrosine, a peptide from sardine</h3>
            <p className="mt-2.5 text-base text-soft">
              The rare case where the proposed mechanism was checked in people. In a small randomised trial, blood
              pressure fell on the peptide and not on placebo, and blood markers fitted blockade of ACE, an enzyme that
              helps tighten blood vessels (
              <PaperLink id="kawasaki-2000" via="doi">
                Kawasaki 2000
              </PaperLink>
              ). It was 29 people over four weeks, and nothing else here replicates it.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Digestion */}
      <section className="mt-20">
        <StepHead n={2} title="Swallowed peptides meet digestion" />
        <p className="mt-4 text-soft [text-wrap:pretty]">
          Food protein is broken into smaller pieces and amino acids by digestion, and a peptide in a powder or capsule
          enters the same system. So for oral products there are two separate questions: does anything active get
          through, and does it do anything if it does. Neither is settled by the label.
        </p>
        <div className="mt-7 rounded-[20px] border border-line bg-card p-7">
          <DigestionDiagram />
        </div>
        <div className="mt-5 rounded-2xl border border-line bg-card p-6">
          <p className="mb-1.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">
            An example of how the first question gets blurred
          </p>
          <p className="text-base text-soft">
            After exercise, fish protein hydrolysate raised blood amino acids about as much as whey hydrolysate did, which
            shows it is <strong className="text-fg">digested quickly</strong>. It says nothing about effects from specific
            bioactive peptides (
            <PaperLink id="cordeiro-2020" via="doi">
              Cordeiro 2020
            </PaperLink>
            ; nine people). For what the oral trials found on outcomes, see{" "}
            <Link href="/peptides/oral-marine-peptides" className="link">
              Do oral marine peptides work?
            </Link>{" "}
            and the evidence for{" "}
            <Link href="/science/topics/skin" className="link">
              skin
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 3. Routes */}
      <section className="mt-20">
        <StepHead n={3} title="Injecting skips digestion, not risk" />
        <p className="mt-4 text-soft [text-wrap:pretty]">
          Injected peptides avoid the gut, which is one reason people use them. They also bring injection risks and depend
          on how the product was made.
        </p>
        <div className="mt-7 flex flex-col gap-5 rounded-[20px] border border-line bg-card p-7">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-3">
            <span className="basis-full text-sm font-semibold text-muted sm:basis-[150px]">Swallowed</span>
            <span className={NODE}>Mouth</span>
            <Chevron />
            <span className="inline-flex min-h-11 items-center rounded-xl border border-warn bg-warn-soft px-[18px] font-semibold text-warn">
              Digestion
            </span>
            <Chevron />
            <span className={NODE}>Bloodstream</span>
          </div>
          <div className="h-px bg-line" />
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-3">
            <span className="basis-full text-sm font-semibold text-muted sm:basis-[150px]">Injected</span>
            <span className={NODE}>Needle</span>
            <Chevron />
            <span className={NODE}>Bloodstream or tissue</span>
            <span className="inline-flex min-h-11 items-center rounded-xl border border-warn bg-warn-soft px-4 text-sm font-semibold text-warn">
              Injection and manufacturing risks
            </span>
          </div>
          <div className="h-px bg-line" />
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-3">
            <span className="basis-full text-sm font-semibold text-muted sm:basis-[150px]">Applied to skin</span>
            <span className={NODE}>Skin surface</span>
            <Chevron />
            <span className={NODE}>Skin</span>
            <span className="inline-flex min-h-11 items-center rounded-xl border border-track bg-line px-4 text-sm font-semibold text-fg">
              No controlled product trial summarised here
            </span>
          </div>
        </div>
        <p className="mt-7 text-soft [text-wrap:pretty]">
          A 2026 review of approved and unapproved peptides found that many unapproved ones look favourable in animals,
          while{" "}
          <PaperLink id="mendias-2026" via="doi">
            rigorous human safety data are scarce and serious harm is possible
          </PaperLink>
          . Reviews of BPC-157 describe a compound with a lot of animal work behind it and very little in people (
          <PaperLink id="vasireddi-2025" via="pmc">
            Vasireddi 2025
          </PaperLink>
          : 35 preclinical studies and one clinical report).
        </p>
      </section>

      {/* 4. Mechanism is not proof */}
      <section className="mt-20">
        <StepHead n={4} title="A mechanism is not the proof" />
        <p className="mt-4 text-soft [text-wrap:pretty]">
          &ldquo;It blocks an enzyme&rdquo; or &ldquo;it switches on repair genes&rdquo; sounds like an explanation. It is a
          reason to run a trial. Many things that work in cells or animals do nothing in people, and the people who sell a
          product can quote a mechanism without ever testing it in humans. A 2026 scoping review found that 67% of the
          publications it searched on six popular injectable peptides used animal models, and concluded the claimed
          benefits{" "}
          <PaperLink id="tewari-2026" via="doi">
            remain unsubstantiated by human trials
          </PaperLink>
          .
        </p>

        <div className="mt-8 overflow-x-auto rounded-[20px] border border-line bg-card p-7">
          <div className="min-w-[720px]">
            <p className="font-heading text-xl font-bold">Where the evidence sits</p>
            <p className="mb-6 mt-1 text-sm text-muted">
              Each column is a stronger kind of evidence. Each bar shows where our summarised studies sit for that claim.
            </p>
            <div className="grid grid-cols-5 items-end gap-2" aria-hidden="true">
              {RUNGS.map((r) => (
                <div
                  key={r.label}
                  className="rounded-t-lg"
                  style={{ height: r.height, background: `color-mix(in srgb, var(--accent) ${r.mix}%, var(--card))` }}
                />
              ))}
            </div>
            <div className="mt-2.5 grid grid-cols-5 gap-2">
              {RUNGS.map((r) => (
                <p key={r.label} className="text-sm font-semibold leading-snug">
                  {r.label}
                </p>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3.5">
              {MARKERS.map((m) => (
                <div key={m.name} className="grid grid-cols-5 gap-2">
                  <div
                    className={`rounded-[10px] border px-3.5 py-2.5 ${
                      m.tone === "warn" ? "border-warn bg-warn-soft text-warn" : "border-accent bg-accent-soft text-accent"
                    }`}
                    style={{ gridColumn: m.col }}
                  >
                    <p className="text-sm font-semibold">{m.name}</p>
                    <p className="mt-0.5 text-[13px] leading-snug">{m.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-soft [text-wrap:pretty]">
          When you read a claim about how a peptide works, ask: was this shown in people, in animals, or in cells? Did the
          study measure a real outcome, or only a marker? Was there a comparison group? We answer those questions for each
          study on the{" "}
          <Link href="/science" className="link">
            studies hub
          </Link>
          , and explain how in the{" "}
          <Link href="/science/methodology" className="link">
            methodology
          </Link>
          .
        </p>
      </section>

      <section className="mt-20 rounded-[20px] border border-line bg-card p-7">
        <h2 className="text-[22px] font-bold">Keep going</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { href: "/peptides", label: "What are peptides? Types, evidence and safety" },
            { href: "/peptides/legal-status", label: "Are peptides legal in the US?" },
            { href: "/glossary", label: "Glossary" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex min-h-14 items-center rounded-xl border border-line bg-bg px-[18px] py-3 font-medium hover:border-accent"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-10 text-sm text-muted">
        {SITE.disclosure} {SITE.disclaimer} Last reviewed {formatDate(SITE.lastReviewed)}.
      </p>
    </article>
  );
}
