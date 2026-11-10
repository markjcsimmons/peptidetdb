import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout } from "@/components/ui";
import { StudyCard } from "@/components/study-parts";
import { STUDIES } from "@/lib/studies";

export const metadata: Metadata = {
  title: "CJC-1295: what the studies show",
  description:
    "What human studies show for CJC-1295, with and without ipamorelin: two small 2006 trials that raised growth hormone and IGF-I in healthy adults, no trial for muscle, and what reviews say about safety and legal status.",
  alternates: { canonical: "/peptides/cjc-1295" },
};

const REVIEWED = "2026-11-10";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Does CJC-1295 build muscle?",
    a: "We found no controlled human trial of CJC-1295 with a muscle, strength or body-composition outcome. Two small 2006 studies in healthy adults showed it raised growth hormone and IGF-I for days to weeks, and a higher hormone level is not evidence of more muscle.",
  },
  {
    q: "Is CJC-1295 with ipamorelin better than either alone?",
    a: "We found no controlled trial of the two together, so the claim is untested in what we found. The two CJC-1295 trials we summarise did not involve ipamorelin, and ipamorelin's trials did not involve CJC-1295.",
  },
  {
    q: "Is CJC-1295 safe?",
    a: "In the 2006 dose-escalation trials over 28 and 49 days, no serious adverse reactions were reported in healthy adults. That covers weeks, not the months people use it for. Reviews say rigorous human safety data are scarce for this class and that product quality is a concern.",
  },
  {
    q: "What is the difference between CJC-1295 with and without DAC?",
    a: "A 2026 review lists both forms as sold, with and without a Drug Affinity Complex. The 2006 abstracts describe a long-acting analogue with a half-life of days; they do not say how it maps to the versions sold today, so we cannot say what the trial results mean for either.",
  },
];

export default function Cjc1295Page() {
  const studies = STUDIES.filter((s) => s.peptides.includes("cjc-1295")).sort((a, b) => b.year - a.year);
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
            { "@type": "ListItem", position: 3, name: "CJC-1295", item: absoluteUrl("/peptides/cjc-1295") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / CJC-1295
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">CJC-1295: what the studies show</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          CJC-1295 is a long-acting analogue of growth-hormone-releasing hormone. Two small 2006 studies in healthy
          adults showed it raised growth hormone and IGF-I for days to weeks and caused no serious adverse reactions over
          28 to 49 days. We found no controlled human trial of it for muscle, strength or body composition, and none of
          it combined with ipamorelin. It is not FDA-approved.
        </p>
      </Callout>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What it is</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The 2006 trials describe CJC-1295 as{" "}
          <PaperLink id="teichman-2006" via="doi">
            a long-acting analogue of growth-hormone-releasing hormone
          </PaperLink>
          , with an estimated half-life of 5.8 to 8.1 days. A 2026 endocrinology review lists it among the peptides sold
          online as &ldquo;research compounds&rdquo; and notes versions with and without a Drug Affinity Complex (
          <PaperLink id="dominikowski-2026" via="pmc">
            Dominikowski 2026
          </PaperLink>
          ).
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What the human studies show</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-3 pl-6 text-soft">
          <li>
            <strong className="text-fg">Dose-escalation trials (2006).</strong> Two randomised, placebo-controlled
            trials in healthy adults aged 21 to 61: a single injection raised mean growth hormone 2- to 10-fold for six
            days or more and IGF-I 1.5- to 3-fold for 9 to 11 days, and IGF-I stayed above baseline for up to 28 days
            after repeated doses.
          </li>
          <li>
            <strong className="text-fg">Pulse pattern (2006).</strong> In a separate small study of{" "}
            <PaperLink id="ionescu-2006" via="doi">
              healthy young men
            </PaperLink>
            , growth hormone secretion rose 46% on average, mainly because baseline levels rose 7.5-fold, while the pulses
            continued. It had no comparison group.
          </li>
          <li>
            <strong className="text-fg">Muscle.</strong> Our PubMed search for CJC-1295 trials found only these two
            hormone studies. That is a result of our search, not proof none exists.
          </li>
        </ul>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Hormone levels are not outcomes people care about. In healthy older adults, injected growth hormone itself
          gave small body-composition changes with{" "}
          <PaperLink id="liu-2007" via="doi">
            more swelling, joint pain and blood-sugar problems
          </PaperLink>
          , and the authors said it cannot be recommended as an anti-ageing therapy. That is a different drug, but it is
          the closest tested effect of raising the hormone.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Safety and product quality</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The only safety data are the 28- and 49-day trials, which report no serious adverse reactions. For the class,
          the 2026 reviews describe raised prolactin and cortisol, blood-sugar disturbance, fluid retention, joint pain,
          cardiovascular strain and mislabelled or contaminated products (
          <PaperLink id="coutinho-2026" via="doi">
            Coutinho 2026
          </PaperLink>
          ). These describe the class, not measured rates for CJC-1295. To check a batch, see{" "}
          <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
            how to read a peptide COA
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Legal status and sport</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          CJC-1295 is not an approved drug, and it was not one of the seven peptides FDA&rsquo;s advisory committee
          reviewed in July 2026. A 2026 sports-medicine review notes{" "}
          <PaperLink id="villegas-meza-2026" via="doi">
            widespread anti-doping restrictions
          </PaperLink>{" "}
          on growth-hormone-axis peptides. See the{" "}
          <Link href="/peptides/legal-status" className="link">
            legal status page
          </Link>{" "}
          for dated sources.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Studies behind this page</h2>
        <div className="mt-6 grid gap-5">
          {studies.map((s) => (
            <StudyCard key={s.id} study={s} />
          ))}
        </div>
        <p className="mt-5 max-w-prose text-sm text-muted">
          More context: <Link href="/peptides/ipamorelin" className="link">ipamorelin</Link>,{" "}
          <Link href="/peptides/peptides-for-muscle-growth" className="link">peptides for muscle growth</Link> and the{" "}
          <Link href="/science/topics/muscle" className="link">muscle evidence</Link>.
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

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
