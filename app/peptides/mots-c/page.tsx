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
  title: "MOTS-c peptide: what the studies show",
  description:
    "What the evidence shows for MOTS-c, a mitochondrial peptide promoted for weight loss, metabolism and ageing: mouse studies, human studies that only measure the body's own MOTS-c, no treatment trial found, and its 2026 FDA review.",
  alternates: { canonical: "/peptides/mots-c" },
};

const REVIEWED = "2026-11-18";

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is MOTS-c?",
    a: "MOTS-c is a 16-amino-acid peptide encoded in the DNA of mitochondria, the energy-producing parts of cells. It was first described in 2015, and the body makes it naturally; its main target appears to be skeletal muscle.",
  },
  {
    q: "Does MOTS-c help with weight loss?",
    a: "It has not been tested in people. In mice, MOTS-c treatment prevented obesity and insulin resistance caused by a high-fat diet. Human studies have only measured the body's own MOTS-c, and they disagree: a meta-analysis of 602 people found higher levels in obesity but lower levels in type 2 diabetes, and a study of 85 adults found no difference between people with and without obesity. We found no trial that gave MOTS-c to people.",
  },
  {
    q: "Does MOTS-c slow ageing?",
    a: "Only in mice so far. MOTS-c improved physical performance in young, middle-aged and old mice, and treatment started late in life increased 'healthspan'. Exercise raises the body's own MOTS-c in people, but that does not show that injecting it has the same effect.",
  },
  {
    q: "Is MOTS-c safe?",
    a: "We found no human safety data, because we found no study that gave MOTS-c to people. The treatment studies we summarise are in mice and cells.",
  },
  {
    q: "Is MOTS-c legal?",
    a: "It is not an FDA-approved drug. FDA's compounding page lists its nomination among those withdrawn, and FDA's advisory committee reviewed it for obesity and osteoporosis in July 2026; news reports say the committee recommended it for the 503A bulks list, a vote that is not binding. There is no final FDA decision. See our legal status page.",
  },
  {
    q: "Is MOTS-c banned in sport?",
    a: "We have not checked whether WADA's list names MOTS-c. WADA bans any substance without approval for human therapeutic use under section S0, even when the List does not name it, so tested athletes should check with their anti-doping organisation.",
  },
];

export default function MotsCPage() {
  const studies = STUDIES.filter((s) => s.peptides.includes("mots-c")).sort((a, b) => b.year - a.year);
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
            { "@type": "ListItem", position: 3, name: "MOTS-c", item: absoluteUrl("/peptides/mots-c") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / MOTS-c
      </nav>
      <PageKindLabel path="/peptides/mots-c" />
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">MOTS-c peptide: what the studies show</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <ShortAnswer className="mt-6">
        <p className="max-w-prose text-lg leading-relaxed sm:text-xl sm:leading-relaxed [text-wrap:pretty]">
          MOTS-c is a peptide the body makes in its mitochondria, promoted for weight loss, metabolism and ageing. In
          mice, giving it prevented diet-induced obesity and insulin resistance, lessened bone loss and improved
          physical performance in old age. We found no trial that gave MOTS-c to people: human studies only measure the
          body&rsquo;s own MOTS-c, and they disagree. It is not an approved drug, and FDA&rsquo;s advisory committee
          reviewed it in July 2026 without a final FDA decision.
        </p>
      </ShortAnswer>

      <ProfileFactsPanel path="/peptides/mots-c" reviewed={REVIEWED} />

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What it is</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          MOTS-c (short for &ldquo;mitochondrial open reading frame of the 12S rRNA-c&rdquo;) was first described in
          2015 as a{" "}
          <PaperLink id="lee-2015" via="pmc">
            16-amino-acid peptide encoded in mitochondrial DNA
          </PaperLink>{" "}
          that acts mainly on skeletal muscle. Most of the body&rsquo;s proteins are encoded in the cell nucleus, so it
          belongs to a small group of &ldquo;mitochondrial-derived peptides&rdquo; that also includes humanin. The body
          makes it naturally; products sold as MOTS-c are synthetic copies. See{" "}
          <Link href="/peptides/how-peptides-work" className="link">
            how peptides work
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What the studies show</h2>
        <h3 className="mt-6 text-xl font-semibold">Giving MOTS-c to animals</h3>
        <ul className="mt-3 max-w-prose list-disc space-y-3 pl-6 text-soft">
          <li>
            <strong className="text-fg">Obesity and insulin resistance (2015).</strong> In the study that first
            described it, MOTS-c treatment in mice{" "}
            <PaperLink id="lee-2015" via="pmc">
              prevented insulin resistance and diet-induced obesity
            </PaperLink>
            .
          </li>
          <li>
            <strong className="text-fg">Bone loss (2016).</strong> In mice with their ovaries removed, a model of bone
            loss after menopause, daily injections for 12 weeks{" "}
            <PaperLink id="ming-2016" via="doi">
              lessened bone loss
            </PaperLink>
            .
          </li>
          <li>
            <strong className="text-fg">Ageing and physical decline (2021).</strong> MOTS-c{" "}
            <PaperLink id="reynolds-2021" via="pmc">
              improved physical performance in young, middle-aged and old mice
            </PaperLink>
            , and treatment started late in life increased &ldquo;healthspan&rdquo;. Two of the authors were consultants
            to and shareholders of the company CohBar.
          </li>
        </ul>

        <h3 className="mt-8 text-xl font-semibold">The body&rsquo;s own MOTS-c in people</h3>
        <ul className="mt-3 max-w-prose list-disc space-y-3 pl-6 text-soft">
          <li>
            <strong className="text-fg">Exercise.</strong> In a randomised trial of 30 people, 45 minutes of cycling was
            followed by a{" "}
            <PaperLink id="von-walden-2021" via="pmc">
              trend towards higher blood MOTS-c
            </PaperLink>
            , and a leg-press session was not. A 2026 systematic review of nine studies found that most reported a{" "}
            <PaperLink id="ayubi-2026" via="doi">
              trend towards higher levels after exercise
            </PaperLink>
            , and called the human evidence limited.
          </li>
          <li>
            <strong className="text-fg">Obesity and diabetes.</strong> A 2024 meta-analysis of 602 people found blood
            MOTS-c{" "}
            <PaperLink id="zhou-2024" via="pmc">
              lower in type 2 diabetes but higher in obesity
            </PaperLink>
            . A 2025 study of 85 adults found{" "}
            <PaperLink id="ozkaya-2025" via="pmc">
              no difference between people with and without obesity
            </PaperLink>
            , with levels falling with age and rising with insulin resistance.
          </li>
        </ul>

        <h3 className="mt-8 text-xl font-semibold">Giving MOTS-c to people</h3>
        <p className="mt-3 max-w-prose text-soft [text-wrap:pretty]">
          Our PubMed searches on 18 November 2026 found no trial that gave MOTS-c to people. Judging by their titles,
          the five records PubMed tags as trials are about the body&rsquo;s own MOTS-c (during exercise, heat treatment,
          metformin treatment or heart procedures); we found none that gave MOTS-c itself. A 2025 review of MOTS-c in
          diabetes{" "}
          <PaperLink id="fang-2025" via="doi">
            compiles the doses used in animal studies
          </PaperLink>
          , because those are the only treatment data there are.
        </p>

        <p className="mt-6 max-w-prose text-soft [text-wrap:pretty]">
          <strong className="text-fg">What this does not show.</strong> Mice on a high-fat diet are a model, and results
          in them often fail to carry over to people. Higher or lower natural levels in a group of people do not show
          that adding MOTS-c changes anything, and the human studies point in different directions. Nothing here shows
          how much MOTS-c reaches the body from a product, or whether it is safe. See the evidence pages for{" "}
          <Link href="/science/topics/weight" className="link">
            weight
          </Link>
          ,{" "}
          <Link href="/science/topics/longevity" className="link">
            ageing and longevity
          </Link>{" "}
          and{" "}
          <Link href="/science/topics/womens-health" className="link">
            bone after menopause
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Legal status</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          MOTS-c is not an FDA-approved drug. FDA&rsquo;s compounding page lists its nomination among those withdrawn.
          FDA&rsquo;s Pharmacy Compounding Advisory Committee reviewed it for obesity and osteoporosis in July 2026, and
          news reports say it recommended MOTS-c for the 503A bulks list; the vote is not binding and there is no final
          FDA decision. The HHS draft policy of 30 October 2026 and the sources are on the{" "}
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
          <strong className="text-fg">In sport:</strong> we have not checked whether WADA&rsquo;s list names MOTS-c.
          WADA bans any substance without approval for human therapeutic use under section S0, even when the List does
          not name it; see{" "}
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

      <PeptideInGuides peptide="mots-c" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
