import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout } from "@/components/ui";
import { TopicCard } from "@/components/topic-card";
import { DisclosureNote } from "@/components/disclosure-note";

export const metadata: Metadata = {
  title: "Collagen peptide benefits: what studies show",
  description:
    "What human studies show for oral collagen peptides: skin hydration and elasticity, muscle with training, and joints. Which results are consistent, which are mixed, and what the trials cannot show.",
  alternates: { canonical: "/peptides/collagen-peptides-benefits" },
};

const REVIEWED = "2026-11-10";

const FAQ: { q: string; a: string }[] = [
  {
    q: "What do collagen peptides do?",
    a: "Collagen peptides are fragments of collagen sold as powders and capsules. In randomised trials, taking them by mouth has been followed by better skin hydration and elasticity than placebo. Evidence for muscle and joints is smaller or mixed.",
  },
  {
    q: "How long do collagen peptides take to work?",
    a: "A 2021 meta-analysis of 19 randomised trials concluded that taking hydrolysed collagen for about 90 days was effective at reducing signs of skin ageing. One trial reports changes in skin hydration after 8 weeks. Timing depends on the product and the outcome.",
  },
  {
    q: "Is collagen the same as peptides?",
    a: "Collagen peptides are one kind of peptide: short fragments made by breaking collagen down. The word peptide also covers prescription drugs, skin-care ingredients and unapproved compounds, which have very different evidence.",
  },
  {
    q: "Are the benefits proven?",
    a: "Not firmly. Two meta-analyses favour collagen over placebo for skin, but one found biases in the included trials and a 2026 systematic review rated most of its 25 trials at high risk of bias. The direction is consistent; the size of the benefit is uncertain.",
  },
];

export default function CollagenBenefitsPage() {
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
            { "@type": "ListItem", position: 3, name: "Collagen peptide benefits", item: absoluteUrl("/peptides/collagen-peptides-benefits") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Collagen peptide benefits
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">Collagen peptide benefits: what the studies show</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <DisclosureNote>
        This page covers a product category that includes products Pürblack sells, so read it with that in mind; the
        studies are linked so you can check them yourself.
      </DisclosureNote>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          The best-supported benefit is for skin. Meta-analyses of randomised trials found better skin hydration and
          elasticity from oral collagen peptides than from placebo, though the trials have biases and the size of the
          effect is uncertain. For muscle the evidence is one trial in older men who were also exercising, and for
          joints it is mixed: an overall improvement in osteoarthritis scores, but not on the pain and function
          subscores.
        </p>
      </Callout>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Skin</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Two meta-analyses of randomised trials point the same way: one pooled{" "}
          <PaperLink id="de-miranda-2021" via="doi">
            19 trials with 1,125 people
          </PaperLink>{" "}
          and favoured hydrolysed collagen for hydration, elasticity and wrinkles, and one pooled{" "}
          <PaperLink id="pu-2023" via="pmc">
            26 trials with 1,721 people
          </PaperLink>{" "}
          and found better hydration and elasticity than placebo. The later analysis found several biases in the
          trials and says larger confirmatory trials are needed. A 2026 systematic review counted the results trial by
          trial (hydration improved in 10 of 15, elasticity in 10 of 13, wrinkles in 9 of 10) and rated most of the 25
          trials at{" "}
          <PaperLink id="bassila-2026" via="doi">
            high risk of bias
          </PaperLink>
          .
        </p>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          What this does not show: nearly all participants in the first analysis were women, the abstracts give no
          consistent dose or funding information, and most trials were rated at high risk of bias. See the{" "}
          <Link href="/science/topics/skin" className="link">
            full skin evidence
          </Link>
          , and for fish-derived products,{" "}
          <Link href="/peptides/oral-marine-peptides" className="link">
            Do oral marine peptides work?
          </Link>
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Muscle</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          In a randomised, double-blind trial of 53 older men with sarcopenia, everyone did resistance training, and the
          group taking 15 g a day of collagen peptides gained more fat-free mass and quadriceps strength than the placebo
          group (<PaperLink id="zdzieblik-2015" via="pmc">Zdzieblik 2015</PaperLink>). Because everyone trained, it
          cannot say what collagen does without exercise, and it is a single trial in one group. See the{" "}
          <Link href="/science/topics/muscle" className="link">
            muscle evidence
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Joints</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          A meta-analysis of randomised placebo-controlled trials in osteoarthritis found a lower overall WOMAC score
          and lower pain on a visual scale with collagen, and better stiffness, but the WOMAC pain and physical-function
          subscores did not differ from placebo (<PaperLink id="garcia-coronado-2019" via="doi">García-Coronado 2019</PaperLink>
          ). That is a mixed result. See the{" "}
          <Link href="/science/topics/joints" className="link">
            joint evidence
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">How each use is rated</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <TopicCard slug="skin" compact />
          <TopicCard slug="muscle" compact />
          <TopicCard slug="joints" compact />
        </div>
        <p className="mt-5 max-w-prose text-sm text-muted">
          Hair, nails, gut health and other uses are not summarised here yet. That is a gap in our coverage, not a
          finding that nothing exists.
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
            { href: "/peptides/collagen-peptides", label: "Collagen peptides: the full picture" },
            { href: "/peptides/collagen-peptides-side-effects", label: "Collagen peptide side effects" },
            { href: "/peptides/marine-vs-bovine-collagen", label: "Marine vs bovine collagen" },
            { href: "/peptides/how-to-read-a-peptide-coa", label: "How to read a peptide COA" },
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
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
