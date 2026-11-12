import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout, CARD } from "@/components/ui";
import { RatingBadge } from "@/components/evidence-meter";
import { TOPICS, type Level } from "@/lib/topics";
import type { Topic } from "@/lib/studies";
import { RelatedGoals } from "@/components/guide-links";

export const metadata: Metadata = {
  title: "Peptides for women: ranked by the evidence",
  description:
    "Do peptides work for women? Bremelanotide, GLP-1 drugs in PCOS, collagen for skin, bone and hair, and topical peptides, ranked by the strength of the human studies, with what each does not show.",
  alternates: { canonical: "/peptides/peptides-for-women" },
};

const REVIEWED = "2026-11-12";

type Option = {
  name: string;
  level: Level;
  /** Topic page and rating this entry mirrors (checked at build time below). */
  topic: Topic;
  topicSubject: string;
  shows: React.ReactNode;
  notShown: React.ReactNode;
};

const OPTIONS: Option[] = [
  {
    name: "Bremelanotide (Vyleesi) for low sexual desire, before menopause",
    level: "consistent",
    topic: "womens-health",
    topicSubject: "Bremelanotide (Vyleesi) for low sexual desire in premenopausal women",
    shows: (
      <>
        Two identical 24-week placebo-controlled trials in 1,267 premenopausal women found higher sexual-desire scores (by 0.35
        points) and lower distress about low desire (by 0.33 points) than placebo, and both trials agreed (
        <PaperLink id="kingsberg-2019" via="pmc">
          Kingsberg 2019
        </PaperLink>
        ). A{" "}
        <PaperLink id="toledo-2026" via="doi">
          2026 meta-analysis
        </PaperLink>{" "}
        also found improvements in desire and arousal scores. The drug is injected under the skin as needed and is described as
        FDA-approved for this condition in its{" "}
        <PaperLink id="clayton-2022" via="doi">
          safety review
        </PaperLink>
        , which reports nausea in 40.0% of women against 1.3% on placebo, flushing in 20.3% against 1.3%, and small, temporary
        rises in blood pressure.
      </>
    ),
    notShown: (
      <>
        A 2024 re-analysis argues the questionnaires used are{" "}
        <PaperLink id="spielmans-2024" via="doi">
          poorly validated for this condition
        </PaperLink>
        , that 8 of the 11 outcomes listed on the trial registry were never published, and that those unpublished effects were
        nil to small. The trials enrolled only premenopausal women (mean age 39), 85.6% of them white and 96.6% at US sites, and
        were funded by Palatin Technologies and AMAG Pharmaceuticals. It is a prescription medicine, and this page is not a recommendation to
        use it.
      </>
    ),
  },
  {
    name: "GLP-1 drugs (liraglutide, semaglutide) for weight in PCOS",
    level: "consistent",
    topic: "womens-health",
    topicSubject: "GLP-1 drugs (liraglutide, semaglutide) for weight in women with PCOS",
    shows: (
      <>
        A 2026 meta-analysis of 11 randomised trials in women with polycystic ovary syndrome (PCOS) found a BMI drop of 1.38
        kg/m² more than controls, with low certainty (
        <PaperLink id="forslund-2026" via="doi">
          Forslund 2026
        </PaperLink>
        ). In a 32-week placebo-controlled trial of 82 women, weight fell 5.7% on liraglutide against 1.4% on placebo (
        <PaperLink id="elkind-hirsch-2022" via="doi">
          Elkind-Hirsch 2022
        </PaperLink>
        ), and in a 16-week open-label trial of 100 women, semaglutide plus metformin lost 6.09 kg against 2.25 kg with metformin
        alone (
        <PaperLink id="chen-2025" via="pmc">
          Chen 2025
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        The meta-analysis calls the weight loss modest and short-term, and its certainty low. Gastrointestinal side effects
        affected 58.2% of women on liraglutide against 18.5% on placebo. These are prescription drugs tested in women who were
        overweight or obese; they are not the unapproved &ldquo;research peptides&rdquo; sold online. See{" "}
        <Link href="/peptides/for-weight-loss" className="link">
          peptides for weight loss
        </Link>
        .
      </>
    ),
  },
  {
    name: "Oral collagen peptides for skin",
    level: "consistent",
    topic: "skin",
    topicSubject: "Oral collagen peptides",
    shows: (
      <>
        A meta-analysis of 19 randomised trials (1,125 people, 95% of them women) favoured hydrolysed collagen over placebo for
        skin hydration, elasticity and wrinkles (
        <PaperLink id="de-miranda-2021" via="doi">
          de Miranda 2021
        </PaperLink>
        ). In a six-month trial in menopausal women, skin elasticity rose 12.2% from baseline with fish-derived collagen alone,
        against negligible change on placebo (
        <PaperLink id="duangjai-2025" via="pmc">
          Duangjai 2025
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        A 2026 systematic review rated most of the trials at{" "}
        <PaperLink id="bassila-2026" via="doi">
          high risk of bias
        </PaperLink>
        , so the direction is consistent but the size of the benefit is uncertain. The menopausal-women trial reports skin
        changes against each group&rsquo;s own baseline rather than between groups, and its abstract gives no group sizes.
        Trials on collagen and the skin are covered in{" "}
        <Link href="/peptides/best-peptides-for-skin" className="link">
          best peptides for skin
        </Link>
        .
      </>
    ),
  },
  {
    name: "Oral collagen peptides for bone density after menopause",
    level: "mixed",
    topic: "womens-health",
    topicSubject: "Oral collagen peptides for bone density after menopause",
    shows: (
      <>
        In 131 postmenopausal women with low bone density, 5 g a day of collagen peptides for 12 months was followed by small
        gains over placebo at the spine (T-score +0.1 against −0.03) and the femoral neck (+0.09 against −0.01) (
        <PaperLink id="konig-2018" via="pmc">
          König 2018
        </PaperLink>
        ). An uncontrolled follow-up of 31 of those women over four years also reported rising density (
        <PaperLink id="zdzieblik-2021-bone" via="pmc">
          Zdzieblik 2021
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        The gains are about a tenth of a T-score point, and no study here counts fractures. 29 of the 131 women did not finish,
        and the four-year follow-up was funded by GELITA, a collagen-peptide maker. Two trials of about six months
        found no change in bone-turnover markers compared with placebo (
        <PaperLink id="cuneo-2010" via="doi">
          Cúneo 2010
        </PaperLink>
        ; <PaperLink id="duangjai-2025" via="pmc">Duangjai 2025</PaperLink>), and a 2026 scoping review called the evidence{" "}
        <PaperLink id="kuhlman-2026" via="doi">
          promising but inconsistent
        </PaperLink>
        . Collagen does not replace osteoporosis treatment.
      </>
    ),
  },
  {
    name: "GLP-1 drugs for periods, hormones and fertility in PCOS",
    level: "limited",
    topic: "womens-health",
    topicSubject: "GLP-1 drugs for periods, hormones and fertility in PCOS",
    shows: (
      <>
        Single trials report a lower free androgen index with liraglutide against a slight rise on placebo (
        <PaperLink id="elkind-hirsch-2022" via="doi">
          Elkind-Hirsch 2022
        </PaperLink>
        ) and a higher natural pregnancy rate over the following 24 weeks after semaglutide plus metformin: 35% against 15% (
        <PaperLink id="chen-2025" via="pmc">
          Chen 2025
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        The Chen trial was open-label, 20% of women did not finish, weight was its primary outcome, and the pregnancies were
        counted after semaglutide had stopped. The meta-analysis found{" "}
        <PaperLink id="forslund-2026" via="doi">
          evidence too thin
        </PaperLink>{" "}
        to judge hirsutism or menstrual regularity and no change in LDL cholesterol or triglycerides, and no trial measured quality
        of life or mental health.
      </>
    ),
  },
  {
    name: "Topical cosmetic peptides for skin",
    level: "limited",
    topic: "skin",
    topicSubject: "Topical cosmetic peptides (argireline, palmitoyl peptides and similar)",
    shows: (
      <>
        Small, short trials report better wrinkle and roughness measures, including 60 people over 4 weeks with argireline (
        <PaperLink id="wang-2013" via="doi">
          Wang 2013
        </PaperLink>
        ) and Korean women using a palmitoyl-RGD cream for 12 weeks (
        <PaperLink id="bae-2017" via="doi">
          Bae 2017
        </PaperLink>
        ). A 2026 meta-analysis of oral and topical peptides found a modest wrinkle effect (
        <PaperLink id="nukaly-2026" via="pmc">
          Nukaly 2026
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        That meta-analysis says the benefit was largely driven by oral peptides and does not separate topical products. The Bae
        abstract gives no sample size, and a review of argireline notes it may not cross the skin well. These are cosmetic
        products, not medicines, and we did not compare them with retinoids or sunscreen.
      </>
    ),
  },
  {
    name: "Oral collagen peptides for hair",
    level: "limited",
    topic: "hair",
    topicSubject: "Oral collagen peptides for hair",
    shows: (
      <>
        In 114 women with thigh cellulite and self-reported hair thinning, fish-derived collagen peptides for 24 weeks were followed by
        higher hair diameter, and cellulite and skin measures improved more than with placebo (
        <PaperLink id="hwang-2026" via="doi">
          Hwang 2026
        </PaperLink>
        ). In menopausal women, groups taking collagen, calcium and vitamin D, or both shed less hair than placebo (
        <PaperLink id="duangjai-2025" via="pmc">
          Duangjai 2025
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        Each is a single trial; the abstracts do not say how shedding was measured, and calcium and vitamin D alone also reduced
        shedding in the second, so that result cannot be credited to collagen. Neither tested women diagnosed with female-pattern
        hair loss. See{" "}
        <Link href="/peptides/peptides-for-hair-growth" className="link">
          peptides for hair growth
        </Link>
        .
      </>
    ),
  },
  {
    name: "Peptides or collagen for menopausal symptoms",
    level: "none",
    topic: "womens-health",
    topicSubject: "Peptides or collagen for menopausal symptoms (hot flushes, mood, sleep)",
    shows: (
      <>
        Our PubMed search on 12 November 2026 for peptide or collagen trials with hot-flush or other menopause-symptom outcomes
        found none.
      </>
    ),
    notShown: (
      <>
        That is not proof that no trial exists, and it is not a finding that these products do not work. The menopausal-women
        trial above looked at skin, hair, body composition and bone markers, not hot flushes or mood. Sleep peptides are covered
        in{" "}
        <Link href="/peptides/peptides-for-sleep" className="link">
          peptides for sleep
        </Link>
        .
      </>
    ),
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Are there peptides made specifically for women?",
    a: "The best-tested one is bremelanotide (Vyleesi), an injected drug for low sexual desire in premenopausal women. Two 24-week placebo-controlled trials in 1,267 women found small improvements on questionnaires, and a 2024 re-analysis questions how well those questionnaires measure the condition. Most other peptide research does not split results by sex.",
  },
  {
    q: "Do collagen peptides help women's skin?",
    a: "Probably a little. Meta-analyses of randomised trials, in which about 95% of participants were women, found better skin hydration and elasticity than placebo. A 2026 review rated most of the trials at high risk of bias, so how big the benefit is remains uncertain.",
  },
  {
    q: "Do collagen peptides help bone density after menopause?",
    a: "The results are mixed. A 12-month trial in 131 postmenopausal women found small gains in spine and femoral-neck density over placebo, while two trials of about six months found no change in bone-turnover markers. No study we summarise counts fractures, and collagen is not a substitute for osteoporosis treatment.",
  },
  {
    q: "Do peptides help with menopause symptoms?",
    a: "We found no trial of a peptide or collagen product for hot flushes, mood or other menopause symptoms. A six-month trial in menopausal women found better skin hydration and elasticity with collagen, but did not measure those symptoms.",
  },
  {
    q: "Can GLP-1 drugs help with PCOS?",
    a: "They produce modest, short-term weight loss in women with PCOS who are overweight or obese; a 2026 meta-analysis of 11 trials rated its certainty low. Evidence for periods, hormones and fertility is too thin to judge. They are prescription drugs, not supplements.",
  },
  {
    q: "Are research peptides safe in pregnancy or while breastfeeding?",
    a: "We have not summarised any study on this, so we do not rate it. It is a gap in our coverage, not a finding that they are safe. Ask a clinician before taking any peptide product while pregnant or breastfeeding.",
  },
];

export default function PeptidesForWomenPage() {
  // The ratings on this page must match the topic pages. A mismatch fails the build instead of publishing a contradiction.
  for (const o of OPTIONS) {
    const r = TOPICS[o.topic].ratings.find((x) => x.subject === o.topicSubject);
    if (!r || r.level !== o.level) {
      throw new Error(`peptides-for-women: "${o.name}" does not match its rating "${o.topicSubject}" on the ${o.topic} topic page`);
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
            { "@type": "ListItem", position: 3, name: "Peptides for women", item: absoluteUrl("/peptides/peptides-for-women") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Peptides for women
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">Peptides for women, ranked by the evidence</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          The best-tested peptides for women are prescription drugs: bremelanotide for low sexual desire before menopause, and
          GLP-1 drugs for weight in polycystic ovary syndrome (PCOS). Collagen peptides have consistent but small and uncertain
          benefits for skin, mixed results for bone density after menopause, and limited evidence for hair. We found no trial of
          any peptide for menopause symptoms.
        </p>
      </Callout>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">How this ranking works</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Most peptide studies report men and women together, so this page covers only outcomes women search for where the
          studies enrolled women or the condition is specific to them. The list is ordered by how strong the human evidence is,
          using the ratings on our{" "}
          <Link href="/science/topics/womens-health" className="link">
            women&rsquo;s health evidence page
          </Link>
          , our{" "}
          <Link href="/science/topics/skin" className="link">
            skin
          </Link>{" "}
          page and our{" "}
          <Link href="/science/topics/hair" className="link">
            hair
          </Link>{" "}
          page. It does not measure how big a benefit is, how safe something is, or whether one option beats another, because the
          studies do not compare them. Several options share a rating, so their order inside a group is our judgement: read them
          as ties. It ranks types of peptide, not products, and a prescription drug is not interchangeable with a supplement.
          Nobody paid for a place on this page, and there are no affiliate links.
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
          Not rated: unapproved injectable peptides in pregnancy and breastfeeding (we have not summarised any study; see the{" "}
          <Link href="/science/topics/womens-health" className="link">
            women&rsquo;s health page
          </Link>
          ). Not covered: hormone therapy, fertility treatments and non-peptide supplements for menopause, which are outside this
          site&rsquo;s scope.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">If you are choosing</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">Prescription peptides (bremelanotide, GLP-1 drugs):</strong> these are medicines with
            side effects listed above, and a clinician decides whether they suit you. Do not buy them from unregulated sources;
            see the{" "}
            <Link href="/peptides/legal-status" className="link">
              legal status page
            </Link>{" "}
            for why compounded and unapproved products differ.
          </li>
          <li>
            <strong className="text-fg">A collagen supplement:</strong> the trials tested specific products, and we do not
            recommend a dose. If a test report is offered, our{" "}
            <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
              COA guide
            </Link>{" "}
            explains how to read it, and we checked{" "}
            <Link href="/peptides/best-collagen-peptides" className="link">
              which collagen brands publish batch test results
            </Link>
            .
          </li>
          <li>
            <strong className="text-fg">Fish allergy:</strong> be careful with fish-derived products; a case report describes{" "}
            <PaperLink id="ueno-2020" via="pmc">
              anaphylaxis in a child with fish allergy
            </PaperLink>{" "}
            after fish collagen tablets.
          </li>
          <li>
            <strong className="text-fg">Osteoporosis, PCOS and menopause symptoms:</strong> these are medical conditions with
            established treatments, and none of the studies here compares a peptide with them.
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
            { href: "/science/topics/womens-health", label: "Full women's health evidence" },
            { href: "/peptides/best-peptides-for-skin", label: "Best peptides for skin, ranked" },
            { href: "/peptides/for-weight-loss", label: "Peptides for weight loss" },
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

      <RelatedGoals path="/peptides/peptides-for-women" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
