import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout } from "@/components/ui";
import { TopicCard } from "@/components/topic-card";
import { RelatedGoals } from "@/components/guide-links";
import { PageContents } from "@/components/page-contents";

export const metadata: Metadata = {
  title: "Peptides for weight loss: what studies show",
  description:
    "GLP-1 drugs like semaglutide and tirzepatide are peptides with large trials behind them. What those trials show, what happens after stopping, and why unapproved and compounded products are a different matter.",
  alternates: { canonical: "/peptides/for-weight-loss" },
};

const REVIEWED = "2026-11-10";
const FDA_URL = "https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Do peptides help you lose weight?",
    a: "Some do. The GLP-1-based peptide drugs semaglutide and tirzepatide produced average weight loss of 14.9% and up to 20.9% in large placebo-controlled trials, against 2.4% and 3.1% on placebo. We have not summarised any trial showing weight loss from non-prescription peptide supplements or unapproved injectables.",
  },
  {
    q: "Are peptides the same as Ozempic?",
    a: "Ozempic and Wegovy are brand names of semaglutide, a peptide drug that acts like the hormone GLP-1. Most products sold online as peptides are different compounds with different evidence, and semaglutide's trial results do not carry over to them.",
  },
  {
    q: "What happens when you stop a GLP-1 drug?",
    a: "Most of the weight returns. In an extension of the semaglutide STEP 1 trial, people regained about two-thirds of their lost weight within a year of stopping, and a 2026 meta-analysis found significant rebound that varied by drug.",
  },
  {
    q: "Do GLP-1 drugs cause muscle loss?",
    a: "They reduce lean mass along with fat. A meta-analysis of seven trials found absolute lean mass fell by 1.74 kg even though the share of lean mass rose, and a network meta-analysis found tirzepatide cut lean mass by 8.3%. The studies we summarise do not show how to prevent it.",
  },
  {
    q: "Is compounded semaglutide safe?",
    a: "FDA says compounded drugs are not FDA approved and are not reviewed for safety, effectiveness or quality before they are marketed. As of 31 May 2026 it had received more than 990 adverse event reports for compounded semaglutide and more than 730 for compounded tirzepatide, and says these are likely underreported.",
  },
];

export default function ForWeightLossPage() {
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
            { "@type": "ListItem", position: 3, name: "Peptides for weight loss", item: absoluteUrl("/peptides/for-weight-loss") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Peptides for weight loss
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">Peptides for weight loss: what the studies show</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          Yes, for one kind of peptide. The GLP-1-based drugs semaglutide and tirzepatide are peptides, and large
          placebo-controlled trials found average weight loss of about 15% to 21% over 68 to 72 weeks. They are
          prescription medicines with side effects, most of the weight returns after stopping, and they also reduce lean
          mass. We have not summarised any trial showing weight loss from non-prescription peptide supplements or
          unapproved injectables, and FDA warns against unapproved and compounded versions of these drugs.
        </p>
      </Callout>

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Two different things sold as &ldquo;peptides for weight loss&rdquo;</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">Prescription GLP-1-based drugs.</strong> Semaglutide acts like the hormone
            GLP-1, and tirzepatide acts on both GLP-1 and GIP receptors. They have been tested in trials of thousands of
            people.
          </li>
          <li>
            <strong className="text-fg">Supplements, unapproved injectables and &ldquo;research&rdquo; peptides.</strong>{" "}
            Different compounds with different (often no) human evidence. This page treats them separately because the
            trial results above do not apply to them.
          </li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What the GLP-1 drug trials show</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-3 pl-6 text-soft">
          <li>
            <strong className="text-fg">Semaglutide, 2.4 mg weekly.</strong> In{" "}
            <PaperLink id="wilding-2021" via="doi">
              1,961 adults without diabetes
            </PaperLink>
            , weight fell 14.9% over 68 weeks versus 2.4% on placebo, and half lost at least 15%.
          </li>
          <li>
            <strong className="text-fg">Tirzepatide.</strong> In{" "}
            <PaperLink id="jastreboff-2022" via="doi">
              2,539 adults without diabetes
            </PaperLink>
            , weight fell 15.0%, 19.5% and 20.9% at the three doses over 72 weeks versus 3.1% on placebo.
          </li>
          <li>
            <strong className="text-fg">Across 19 drugs.</strong> A 2026 network meta-analysis of{" "}
            <PaperLink id="nong-2026" via="doi">
              262 trials with 99,791 people
            </PaperLink>{" "}
            found, at one year, moderate-to-high-certainty weight loss of 14.9% with tirzepatide and 9.8% with
            subcutaneous semaglutide compared with lifestyle change alone. It concludes that larger benefits generally
            came with greater harms.
          </li>
          <li>
            <strong className="text-fg">Heart events.</strong> In{" "}
            <PaperLink id="lincoff-2023" via="doi">
              17,604 adults with heart disease
            </PaperLink>
            , semaglutide cut heart attacks, strokes and cardiovascular deaths from 8.0% to 6.5% over about 40 months. It
            does not show the same benefit for people without heart disease.
          </li>
        </ul>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The three large trials above were funded by the drug makers, and several authors of the network meta-analysis
          report fees from drug companies. That does not make the results wrong, but it is why we report it on each study page.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">The trade-offs</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-3 pl-6 text-soft">
          <li>
            <strong className="text-fg">Side effects.</strong> Nausea and diarrhoea were the most common problems with
            semaglutide, usually mild to moderate and transient, and 4.5% versus 0.8% stopped because of gastrointestinal
            events. In the heart-disease trial, 16.6% on semaglutide versus 8.2% on placebo stopped because of adverse
            events.
          </li>
          <li>
            <strong className="text-fg">Stopping.</strong> After treatment and lifestyle support ended, participants{" "}
            <PaperLink id="wilding-2022" via="pmc">
              regained about two-thirds of their lost weight
            </PaperLink>{" "}
            within a year, and the improvements in cardiometabolic measures mostly reverted. A 2026 meta-analysis found{" "}
            <PaperLink id="qi-2026" via="pmc">
              significant rebound
            </PaperLink>{" "}
            that varied by drug.
          </li>
          <li>
            <strong className="text-fg">Muscle.</strong> A meta-analysis found the share of lean mass rose, but{" "}
            <PaperLink id="laverde-2026" via="pmc">
              absolute lean mass fell by 1.74 kg
            </PaperLink>
            , with very high variation between studies. The authors say nutrition and exercise are essential to preserve
            muscle; the studies we summarise do not test whether they prevent the loss.
          </li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Unapproved, compounded and &ldquo;research&rdquo; products</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          FDA&rsquo;s page on unapproved GLP-1 drugs says compounded drugs are not FDA approved and are not reviewed for
          safety, effectiveness or quality before they are marketed. It reports adverse events, some leading to
          hospitalisation, linked to dosing errors, and warns against products sold for &ldquo;research purposes&rdquo; but
          marketed for human use, because their quality is unknown. It says retatrutide and cagrilintide cannot be used
          in compounding. FDA advises getting a prescription from a doctor and filling it at a state-licensed pharmacy (
          <a href={FDA_URL} target="_blank" rel="noopener noreferrer" className="link">
            FDA, content current as of 1 October 2026
          </a>
          ).
        </p>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          For other peptides sold for weight loss, such as MOTS-c (considered for obesity by FDA&rsquo;s advisory
          committee in July 2026, see{" "}
          <Link href="/peptides/legal-status" className="link">
            the legal status page
          </Link>
          ), we have not summarised any human trial, so we do not rate them. That is a gap in our coverage.
        </p>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The oral collagen and marine peptide studies on this site were not weight-loss trials. In the muscle trials,
          people were also doing resistance training and fat mass was a secondary measure; see{" "}
          <Link href="/peptides/peptides-for-muscle-growth" className="link">
            peptides for muscle growth
          </Link>
          . To judge any product&rsquo;s paperwork, see{" "}
          <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
            how to read a peptide COA
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">How this topic is rated here</h2>
        <div className="mt-6 max-w-sm">
          <TopicCard slug="weight" compact />
        </div>
        <p className="mt-5 max-w-prose text-sm text-muted">
          Open the card for each rating and the studies behind it. Talk to a clinician before starting or stopping any
          weight-loss medicine.
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

      <RelatedGoals path="/peptides/for-weight-loss" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
