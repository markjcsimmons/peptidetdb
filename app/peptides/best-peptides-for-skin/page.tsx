import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout, CARD } from "@/components/ui";
import { RatingBadge } from "@/components/evidence-meter";
import { TOPICS, type Level } from "@/lib/topics";
import { RelatedGoals } from "@/components/guide-links";

export const metadata: Metadata = {
  title: "Best peptides for skin: ranked by the evidence",
  description:
    "Which peptides have human evidence for skin? Oral collagen, fish-derived collagen, topical cosmetic peptides, copper peptide (GHK-Cu) and KPV, ranked by the strength of the studies, with what each does not show.",
  alternates: { canonical: "/peptides/best-peptides-for-skin" },
};

const REVIEWED = "2026-11-11";

type Option = {
  name: string;
  level: Level;
  /** Rating text on the skin topic page that this entry mirrors (checked at build time below). */
  topicSubject?: string;
  shows: React.ReactNode;
  notShown: React.ReactNode;
};

const OPTIONS: Option[] = [
  {
    name: "Oral collagen peptides",
    level: "consistent",
    topicSubject: "Oral collagen peptides",
    shows: (
      <>
        Two meta-analyses of randomised trials favoured collagen over placebo for skin hydration and elasticity:{" "}
        <PaperLink id="de-miranda-2021" via="doi">
          19 trials with 1,125 people
        </PaperLink>{" "}
        and{" "}
        <PaperLink id="pu-2023" via="pmc">
          26 trials with 1,721 people
        </PaperLink>
        . A 2026 systematic review counted the results trial by trial: hydration improved in 10 of 15 trials, elasticity
        in 10 of 13 and wrinkles in 9 of 10.
      </>
    ),
    notShown: (
      <>
        The later meta-analysis found biases in the trials, and the 2026 review rated most of its 25 trials at{" "}
        <PaperLink id="bassila-2026" via="doi">
          high risk of bias
        </PaperLink>
        . The direction is consistent; the size of the benefit is not known. Details:{" "}
        <Link href="/peptides/collagen-peptides-benefits" className="link">
          collagen peptide benefits
        </Link>
        .
      </>
    ),
  },
  {
    name: "Oral marine (fish-derived) collagen peptides",
    level: "limited",
    topicSubject: "Oral marine (fish-derived) collagen peptides",
    shows: (
      <>
        Two randomised, placebo-controlled trials of fish-derived collagen report better wrinkles and elasticity (
        <PaperLink id="evans-2021" via="pmc">
          Evans 2021
        </PaperLink>
        ), and better cellulite, elasticity and hair in{" "}
        <PaperLink id="hwang-2026" via="doi">
          114 women over 24 weeks
        </PaperLink>
        .
      </>
    ),
    notShown: (
      <>
        One trial gives no sample size or dose in its abstract, and several results are changes from baseline or
        self-rated. No trial compares marine with bovine collagen, so neither can be called better. People with fish
        allergy should read the{" "}
        <Link href="/peptides/collagen-peptides-side-effects" className="link">
          side-effects page
        </Link>
        . More: <Link href="/peptides/marine-vs-bovine-collagen" className="link">marine vs bovine collagen</Link>.
      </>
    ),
  },
  {
    name: "Topical cosmetic peptides (argireline, palmitoyl peptides and similar)",
    level: "limited",
    topicSubject: "Topical cosmetic peptides (argireline, palmitoyl peptides and similar)",
    shows: (
      <>
        In 60 people, argireline applied around the eyes for 4 weeks was followed by a{" "}
        <PaperLink id="wang-2013" via="doi">
          reduction in roughness measures that placebo did not show
        </PaperLink>
        . A palmitoyl-RGD cream for 12 weeks was followed by lower roughness scores and higher elasticity (
        <PaperLink id="bae-2017" via="doi">
          Bae 2017
        </PaperLink>
        ), and a 24-person trial of two other peptides found{" "}
        <PaperLink id="raikou-2017" via="doi">
          differences between some groups
        </PaperLink>
        . A 2026 meta-analysis of{" "}
        <PaperLink id="nukaly-2026" via="pmc">
          19 trials of oral and topical peptides
        </PaperLink>{" "}
        found a modest wrinkle effect.
      </>
    ),
    notShown: (
      <>
        The trials are small and short, and one gives no sample size. The meta-analysis says its wrinkle benefit was
        largely driven by <em>oral</em> peptides, and its abstract does not report topical products on their own. A
        review notes that argireline is large and water-loving, so{" "}
        <PaperLink id="zdrada-nowak-2025" via="pmc">
          whether it reaches the muscles it targets is uncertain
        </PaperLink>
        . The abstracts do not give the concentration used, so a shop product cannot be matched to a trial.
      </>
    ),
  },
  {
    name: "Topical GHK-Cu (copper peptide)",
    level: "limited",
    topicSubject: "Topical GHK-Cu (copper peptide)",
    shows: (
      <>
        One small randomised trial in 13 patients after laser resurfacing found{" "}
        <PaperLink id="miller-2006" via="doi">
          no objective difference
        </PaperLink>{" "}
        in redness, wrinkles or skin quality, though patients using GHK-Cu rated their skin quality higher.
      </>
    ),
    notShown: (
      <>
        A 2025 review calls the absence of clinical studies of GHK-Cu and its palmitoyl form{" "}
        <PaperLink id="mortazavi-2025" via="pmc">
          surprising
        </PaperLink>
        , given how widely they are sold, and says the case rests mostly on cell studies. Cell results do not show that a
        cream delivers enough peptide to skin cells. A{" "}
        <PaperLink id="pickart-2015" via="pmc">
          2015 review
        </PaperLink>{" "}
        is more positive; it is a review, not a trial. We found no study of GHK-Cu
        injected or swallowed for skin.
      </>
    ),
  },
  {
    name: "KPV (anti-inflammatory tripeptide)",
    level: "preclinical",
    shows: (
      <>
        Laboratory and mouse studies show anti-inflammatory effects, and a 2019 review{" "}
        <PaperLink id="bohm-2019" via="doi">
          proposes
        </PaperLink>{" "}
        it as a candidate for skin wounds.
      </>
    ),
    notShown: (
      <>
        Our PubMed searches found no human trial of KPV. A proposal is not a test. See{" "}
        <Link href="/peptides/kpv" className="link">
          KPV: what the studies show
        </Link>
        .
      </>
    ),
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is the best peptide for skin?",
    a: "Judged by the strength of human evidence, oral collagen peptides rank first: two meta-analyses of randomised trials found better skin hydration and elasticity than placebo. The trials have biases, so how large the benefit is remains uncertain. Topical cosmetic peptides and GHK-Cu have only small trials.",
  },
  {
    q: "Do copper peptides (GHK-Cu) work for skin?",
    a: "The evidence is thin. One small randomised trial of 13 patients after laser resurfacing found no objective difference in redness, wrinkles or skin quality, only higher patient satisfaction. A 2025 review says clinical studies of GHK-Cu are surprisingly absent.",
  },
  {
    q: "Does argireline work like Botox?",
    a: "It is often called a 'botox-like' peptide. A 60-person trial reported less roughness around the eyes after 4 weeks of argireline, but a review says it is uncertain whether the peptide reaches the nerve-muscle junctions it is meant to act on, and that how it might relax muscles when applied to skin is not fully understood.",
  },
  {
    q: "Is a collagen cream the same as swallowing collagen peptides?",
    a: "No. The meta-analyses behind the collagen result tested peptides taken by mouth. A 2026 meta-analysis of oral and topical peptides says the wrinkle benefit was largely driven by oral products and its abstract does not report creams separately.",
  },
  {
    q: "Are there peptides that are better than retinoids or sunscreen?",
    a: "We have not searched for trials that compare peptides with retinoids or sunscreen, so this page cannot say. The rankings here compare peptide options with each other only.",
  },
];

export default function BestPeptidesForSkinPage() {
  const skin = TOPICS.skin;
  // The ratings on this page must match the topic page. A mismatch fails the build instead of publishing a contradiction.
  for (const o of OPTIONS) {
    if (!o.topicSubject) continue;
    const r = skin.ratings.find((x) => x.subject === o.topicSubject);
    if (!r || r.level !== o.level) {
      throw new Error(`best-peptides-for-skin: "${o.name}" does not match its rating on the skin topic page`);
    }
  }

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
            { "@type": "ListItem", position: 3, name: "Best peptides for skin", item: absoluteUrl("/peptides/best-peptides-for-skin") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Best peptides for skin
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">Best peptides for skin, ranked by the evidence</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          Oral collagen peptides have the strongest human evidence of the peptides sold for skin: meta-analyses of
          randomised trials found better hydration and elasticity than placebo, though the trials have biases and the size of
          the benefit is uncertain. Fish-derived collagen, creams with cosmetic peptides such as argireline, and
          copper-peptide (GHK-Cu) products each rest on a handful of trials, most of them small. KPV has only laboratory and animal data.
        </p>
      </Callout>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">How this ranking works</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The list is ordered by how strong the human evidence is, using the same ratings as our{" "}
          <Link href="/science/topics/skin" className="link">
            skin evidence page
          </Link>
          . It does not measure how big a benefit is, how safe something is, or whether one option beats another, because
          the studies do not compare them. Options in the same rating are ordered by the number and size of controlled
          trials, which is our judgement, so read the ties as ties. It ranks types of peptide, not products. For the
          brand side, see{" "}
          <Link href="/peptides/best-collagen-peptides" className="link">
            which collagen brands publish batch test results
          </Link>
          . Nobody paid for a place on this page, and there are no affiliate links.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">The ranking</h2>
        <ol className="mt-6 grid gap-5">
          {OPTIONS.map((o, i) => (
            <li key={o.name} className={CARD}>
              <div className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-bg text-lg font-bold"
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold leading-tight">
                    <span className="sr-only">Rank {i + 1}: </span>
                    {o.name}
                  </h3>
                  <div className="mt-3">
                    <RatingBadge level={o.level} measures="benefit" />
                  </div>
                </div>
              </div>
              <p className="mt-5 max-w-prose text-soft [text-wrap:pretty]">
                <strong className="text-fg">What the studies show.</strong> {o.shows}
              </p>
              <p className="mt-3 max-w-prose text-soft [text-wrap:pretty]">
                <strong className="text-fg">What they do not show.</strong> {o.notShown}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-5 max-w-prose text-sm text-muted">
          Not ranked: injectable peptides such as BPC-157 and TB-500. We have summarised no skin study of them, which is a
          gap in our coverage, not a finding. Hair, nails and acne are not covered either.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">If you are choosing</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">A collagen supplement:</strong> the trials tested peptides by mouth, and the abstracts
            give no consistent dose. We do not recommend one. Look for a lot-specific lab report; our{" "}
            <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
              COA guide
            </Link>{" "}
            explains how to read one.
          </li>
          <li>
            <strong className="text-fg">A cream or serum:</strong> the abstracts do not give the peptide concentration, so a
            product cannot be matched to a trial, and the best evidence for peptides on skin is not for creams.
          </li>
          <li>
            <strong className="text-fg">Fish allergy:</strong> be careful with any fish-derived collagen; a case report
            describes{" "}
            <PaperLink id="ueno-2020" via="pmc">
              anaphylaxis in a child with fish allergy
            </PaperLink>
            .
          </li>
          <li>
            <strong className="text-fg">Injected or &ldquo;research&rdquo; peptides for skin:</strong> we found no
            human skin evidence for them, and the{" "}
            <Link href="/peptides/legal-status" className="link">
              legal picture
            </Link>{" "}
            for unapproved compounds is changing.
          </li>
        </ul>
        <p className="mt-5 max-w-prose text-sm text-muted">
          These studies compare a peptide with a placebo or no peptide. We did not search for trials against sunscreen,
          retinoids or other established skin treatments, so this page cannot tell you how peptides compare with them.
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
            { href: "/science/topics/skin", label: "Full skin evidence and studies" },
            { href: "/peptides/collagen-peptides-benefits", label: "Collagen peptide benefits" },
            { href: "/peptides/best-collagen-peptides", label: "Collagen brands with batch test results" },
            { href: "/peptides/peptides-for-hair-growth", label: "Peptides for hair growth, ranked" },
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

      <RelatedGoals path="/peptides/best-peptides-for-skin" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
