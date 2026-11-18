import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { ShortAnswer } from "@/components/ui";
import { StudyCard } from "@/components/study-parts";
import { STUDIES } from "@/lib/studies";
import { PeptideInGuides, PageKindLabel } from "@/components/guide-links";
import { PageContents } from "@/components/page-contents";
import { ProfileFactsPanel } from "@/components/profile-facts";

export const metadata: Metadata = {
  title: "Semax peptide: what the studies show",
  description:
    "What the evidence shows for semax, a Russian nasal peptide promoted for memory and focus: small Russian studies after stroke and in eye, ulcer and motor neuron disease, no trial as a memory aid in healthy people, and its 2026 FDA review.",
  alternates: { canonical: "/peptides/semax" },
};

const REVIEWED = "2026-11-18";

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is semax?",
    a: "Semax is a synthetic seven-amino-acid peptide (Met-Glu-His-Phe-Pro-Gly-Pro) built from a fragment of the hormone ACTH. It was developed in Russia, is mostly given as nasal drops in the studies we found, and is promoted as a nootropic for memory and focus.",
  },
  {
    q: "Does semax improve memory or focus?",
    a: "We found no trial of semax as a memory or focus aid in healthy people. One small placebo-controlled study in 24 healthy volunteers found a change in a brain-scan pattern after one dose, but it did not test memory or attention. A 2026 Russian expert council listed semax among add-on drugs for ADHD with a 'limited evidence base' without summarising the studies.",
  },
  {
    q: "Does semax help after a stroke?",
    a: "Three Russian-language studies from one research group, with 110 to 187 patients, report better recovery after stroke or slower progression of reduced blood flow to the brain. None is described as randomised or placebo-controlled, one had no comparison group, and the abstracts give few numbers. We rate this limited evidence.",
  },
  {
    q: "Is semax safe?",
    a: "The studies we found report little about side effects. One 1999 Russian study of 73 patients with brain damage after oxygen loss saw bursts of abnormal EEG activity after some semax injections and advised monitoring brain activity at the first injection. We found no long-term safety study.",
  },
  {
    q: "Is semax legal in the US?",
    a: "It is not an FDA-approved drug. FDA's compounding page lists it among withdrawn nominations, and FDA's advisory committee reviewed it for cerebral ischaemia, migraine and trigeminal neuralgia in July 2026; news reports say it recommended semax for the 503A bulks list, a vote that is not binding. There is no final FDA decision. See our legal status page.",
  },
  {
    q: "Is semax banned in sport?",
    a: "We have not checked whether WADA's list names semax. WADA bans any substance without approval for human therapeutic use under section S0, even when the List does not name it, so tested athletes should check with their anti-doping organisation.",
  },
];

export default function SemaxPage() {
  const studies = STUDIES.filter((s) => s.peptides.includes("semax")).sort((a, b) => b.year - a.year);
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
            { "@type": "ListItem", position: 3, name: "Semax", item: absoluteUrl("/peptides/semax") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Semax
      </nav>
      <PageKindLabel path="/peptides/semax" />
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">Semax peptide: what the studies show</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <ShortAnswer className="mt-6">
        <p className="max-w-prose text-lg leading-relaxed sm:text-xl sm:leading-relaxed [text-wrap:pretty]">
          Semax is a Russian nasal peptide promoted for memory and focus. The human studies we found are small Russian
          studies after stroke and in eye disease, peptic ulcers and motor neuron disease; they report benefits, but
          none with a clinical outcome is described as randomised and placebo-controlled, and most abstracts give few
          numbers. We found no trial of semax as a memory or focus aid in healthy people. It is not approved in the US,
          and FDA&rsquo;s advisory committee reviewed it in July 2026 without a final FDA decision.
        </p>
      </ShortAnswer>

      <ProfileFactsPanel path="/peptides/semax" reviewed={REVIEWED} />

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What it is</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Semax is the synthetic peptide{" "}
          <PaperLink id="ivanikov-2002" via="doi">
            Met-Glu-His-Phe-Pro-Gly-Pro
          </PaperLink>
          , a fragment of the hormone ACTH (adrenocorticotropin) with a short peptide added to the end. It was developed
          and studied in Russia; the studies that say how it was given mostly used 1% nasal drops, and a 2026 Russian
          expert statement describes it among{" "}
          <PaperLink id="lapochkin-2026" via="doi">
            medicines used in Russian practice
          </PaperLink>
          . See{" "}
          <Link href="/peptides/how-peptides-work" className="link">
            how peptides work
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What the studies show</h2>

        <h3 className="mt-6 text-xl font-semibold">Stroke and reduced blood flow to the brain</h3>
        <p className="mt-3 max-w-prose text-soft [text-wrap:pretty]">
          Three Russian-language studies from one research group report benefits when semax was added to usual care:
          some influence on how fast function returned in{" "}
          <PaperLink id="gusev-1997" via="pubmed">
            30 patients after an acute stroke
          </PaperLink>{" "}
          (compared with 80 on conventional treatment), higher blood levels of the nerve growth factor BDNF and faster
          recovery in{" "}
          <PaperLink id="gusev-2018" via="pubmed">
            110 adults in stroke rehabilitation
          </PaperLink>
          , and improvement and a lower risk of stroke in{" "}
          <PaperLink id="gusev-2005" via="pubmed">
            187 patients with chronic poor blood flow to the brain
          </PaperLink>
          , a study with no comparison group. None is described as randomised or placebo-controlled. In rats with a
          blocked brain artery, semax{" "}
          <PaperLink id="filippenkov-2020" via="pmc">
            lowered inflammation-related gene activity
          </PaperLink>{" "}
          a day later.
        </p>

        <h3 className="mt-8 text-xl font-semibold">Memory, focus and the healthy brain</h3>
        <p className="mt-3 max-w-prose text-soft [text-wrap:pretty]">
          We found no trial of semax as a memory or focus aid in healthy people. In 24 healthy volunteers, one dose of
          nasal semax was followed by a{" "}
          <PaperLink id="lebedeva-2018" via="doi">
            change in the brain&rsquo;s resting &ldquo;default mode network&rdquo; on scans
          </PaperLink>{" "}
          compared with placebo; the study did not test memory or attention. A 2026 Russian expert council placed semax
          among add-on drugs for ADHD in children with a{" "}
          <PaperLink id="lapochkin-2026" via="doi">
            &ldquo;limited evidence base&rdquo;
          </PaperLink>
          , without summarising the studies. In 73 patients with brain damage after oxygen loss, the authors report that
          semax{" "}
          <PaperLink id="alekseeva-1999" via="pubmed">
            helped those with memory problems
          </PaperLink>
          , with no comparison group described.
        </p>

        <h3 className="mt-8 text-xl font-semibold">Other uses</h3>
        <ul className="mt-3 max-w-prose list-disc space-y-3 pl-6 text-soft">
          <li>
            <strong className="text-fg">Eye disease.</strong> Two Russian controlled studies report better vision and
            optic-nerve function in{" "}
            <PaperLink id="polunin-2000" via="pubmed">
              optic nerve disease
            </PaperLink>{" "}
            and better electrical eye tests in{" "}
            <PaperLink id="kurysheva-2001" via="pubmed">
              glaucoma
            </PaperLink>
            ; neither abstract gives patient numbers or results.
          </li>
          <li>
            <strong className="text-fg">Peptic ulcers.</strong> In a short 2002 report, ulcers had healed by day 14 in{" "}
            <PaperLink id="ivanikov-2002" via="doi">
              89.5% of patients given semax against 30.8% of controls
            </PaperLink>
            ; the abstract gives no patient numbers.
          </li>
          <li>
            <strong className="text-fg">Motor neuron disease.</strong> In an open-label study of 27 patients, semax{" "}
            <PaperLink id="serdiuk-2007" via="pubmed">
              did not change the course of the disease
            </PaperLink>
            , though quality-of-life scores improved through better mood and motivation.
          </li>
        </ul>

        <p className="mt-6 max-w-prose text-soft [text-wrap:pretty]">
          <strong className="text-fg">What this does not show.</strong> Nearly all of these studies are Russian-language
          articles, and we read only their English abstracts, which often give no patient numbers, statistics or method
          of assigning treatment. Without randomised, placebo-controlled trials, benefits reported on top of usual care
          could reflect who was treated or what they expected. None of these studies tested semax as a nootropic in
          healthy people. See the evidence pages for{" "}
          <Link href="/science/topics/brain" className="link">
            the brain
          </Link>
          ,{" "}
          <Link href="/science/topics/eye" className="link">
            the eye
          </Link>{" "}
          and{" "}
          <Link href="/science/topics/gut" className="link">
            the gut
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Safety</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The abstracts we read say little about side effects. In the 1999 study of patients with brain damage after
          oxygen loss, some had{" "}
          <PaperLink id="alekseeva-1999" via="pubmed">
            bursts of abnormal EEG activity after a semax injection
          </PaperLink>
          , and the authors advise monitoring brain activity at the first injection. We found no long-term safety study,
          and nothing here tells you what is in a product sold online as semax.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Legal status</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Semax is not an FDA-approved drug. FDA&rsquo;s compounding page lists it among withdrawn nominations.
          FDA&rsquo;s Pharmacy Compounding Advisory Committee reviewed it for cerebral ischaemia, migraine and
          trigeminal neuralgia in July 2026, and news reports say it recommended semax for the 503A bulks list; the vote
          is not binding and there is no final FDA decision. The HHS draft policy of 30 October 2026 and the sources are
          on the{" "}
          <Link href="/peptides/legal-status" className="link">
            legal status page
          </Link>
          . To check a product&rsquo;s paperwork, see{" "}
          <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
            how to read a peptide COA
          </Link>
          .
        </p>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          <strong className="text-fg">In sport:</strong> we have not checked whether WADA&rsquo;s list names semax. WADA
          bans any substance without approval for human therapeutic use under section S0, even when the List does not
          name it; see{" "}
          <Link href="/peptides/peptides-for-athletes" className="link">
            peptides for athletes
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Studies behind this page</h2>
        <div className="mt-6 grid gap-5">
          {studies.map((s) => (
            <StudyCard key={s.id} study={s} />
          ))}
        </div>
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

      <PeptideInGuides peptide="semax" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
