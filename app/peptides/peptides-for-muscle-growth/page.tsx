import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { ShortAnswer } from "@/components/ui";
import { TopicCard } from "@/components/topic-card";
import { RelatedGoals, PageKindLabel } from "@/components/guide-links";
import { PageContents } from "@/components/page-contents";

export const metadata: Metadata = {
  title: "Peptides for muscle growth: what studies show",
  description:
    "Do peptides build muscle? What randomised trials show for collagen peptides with training, how they compare with whey, and what reviews say about MK-677, ipamorelin, CJC-1295 and BPC-157.",
  alternates: { canonical: "/peptides/peptides-for-muscle-growth" },
};

const REVIEWED = "2026-11-10";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Do peptides build muscle?",
    a: "Some evidence supports collagen peptides as an add-on to resistance training: a 2024 meta-analysis of 19 trials found a larger gain in fat-free mass than control, with moderate certainty. For injectable peptides sold online, recent reviews say muscle and performance benefits are unproven or uncertain, and we found no controlled trial of ipamorelin or CJC-1295 with a muscle outcome.",
  },
  {
    q: "Is collagen as good as whey protein for muscle?",
    a: "We found no trial showing that. In one small trial of 22 young adults, whey increased muscle thickness more than leucine-matched collagen, while strength gains were similar. In an exploratory comparison within a larger trial, whey and collagen did not differ significantly.",
  },
  {
    q: "Does MK-677 build muscle?",
    a: "In a 1-year trial of 65 healthy older adults, MK-677 increased fat-free mass but did not change strength or function, and it raised fasting blood glucose. A trial in hip-fracture patients was stopped early because of a heart-failure signal. It is a pill that acts like the hormone ghrelin, not an injectable peptide.",
  },
  {
    q: "Are muscle-building peptides banned in sport?",
    a: "A 2026 sports-medicine review says BPC-157, thymosin derivatives and growth-hormone secretagogues such as CJC-1295, ipamorelin and tesamorelin carry widespread anti-doping restrictions. Check your sport's current prohibited list before using any of them.",
  },
];

export default function PeptidesForMuscleGrowthPage() {
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
            { "@type": "ListItem", position: 3, name: "Peptides for muscle growth", item: absoluteUrl("/peptides/peptides-for-muscle-growth") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Peptides for muscle growth
      </nav>
      <PageKindLabel path="/peptides/peptides-for-muscle-growth" />
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">Peptides for muscle growth: what the studies show</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <ShortAnswer className="mt-6">
        <p className="max-w-prose text-lg leading-relaxed sm:text-xl sm:leading-relaxed [text-wrap:pretty]">
          The best-supported option is also the least exotic: collagen peptides taken while doing resistance training. A
          2024 meta-analysis of 19 trials found a larger gain in fat-free mass than control, though the strength effect
          was small and everyone in these trials was exercising. For the injectable &ldquo;research&rdquo; peptides sold
          for muscle, such as ipamorelin, CJC-1295 and BPC-157, recent reviews say the benefits are unproven or
          uncertain, and we found no controlled trial of ipamorelin or CJC-1295 with a muscle outcome. We did not find
          evidence that any peptide builds muscle without training.
        </p>
      </ShortAnswer>

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Three different things people mean</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">Collagen and protein-derived peptides</strong> are supplements you swallow. They
            have the most human trials.
          </li>
          <li>
            <strong className="text-fg">Growth-hormone-axis peptides</strong> (sermorelin, tesamorelin, CJC-1295,
            ipamorelin) are injected. They are the ones sold as muscle or &ldquo;recomposition&rdquo; aids.
          </li>
          <li>
            <strong className="text-fg">MK-677</strong> is often listed alongside them, but the trial we summarise
            describes it as an oral ghrelin mimetic, taken by mouth.
          </li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Collagen peptides with resistance training</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          A meta-analysis of{" "}
          <PaperLink id="bischof-2024" via="pmc">
            19 trials with 768 healthy adults
          </PaperLink>{" "}
          found collagen peptides beat control for fat-free mass (certainty graded moderate), muscle architecture and
          maximal strength (both low certainty), with a small strength effect. Three placebo-controlled trials point the
          same way:
        </p>
        <ul className="mt-3 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            In{" "}
            <PaperLink id="zdzieblik-2015" via="pmc">
              53 older men with sarcopenia
            </PaperLink>
            , 12 weeks of training plus 15 g a day of collagen gave more fat-free mass and quadriceps strength than
            placebo.
          </li>
          <li>
            In{" "}
            <PaperLink id="zdzieblik-2021" via="pmc">
              97 middle-aged, untrained men
            </PaperLink>
            , the collagen group gained 3.42 kg of fat-free mass versus 1.83 kg on placebo.
          </li>
          <li>
            In{" "}
            <PaperLink id="jendricke-2019" via="pmc">
              77 premenopausal women
            </PaperLink>
            , collagen gave larger gains in fat-free mass and hand-grip strength than placebo.
          </li>
        </ul>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          A{" "}
          <PaperLink id="khatri-2021" via="pmc">
            2021 systematic review
          </PaperLink>{" "}
          reached a similar picture but found collagen did not significantly change muscle protein synthesis compared
          with higher-quality protein sources.
        </p>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          <strong className="text-fg">What this does not show.</strong> Everyone trained, so collagen is an add-on to
          exercise, not a substitute. &ldquo;Fat-free mass&rdquo; is not the same as muscle. The three placebo-controlled
          trials above share authors, and the record for the 2021 trial discloses that one author has given lectures partly
          supported by GELITA AG and is a co-inventor of patents on collagen-peptide use. The meta-analysis called its evidence significant but of low to moderate certainty.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Collagen versus whey protein</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          In a{" "}
          <PaperLink id="jacinto-2022" via="doi">
            10-week trial of 22 untrained young adults
          </PaperLink>
          , 35 g a day of whey increased muscle thickness more than leucine-matched collagen (thigh 8.4% versus 5.6%),
          with similar strength and power gains. In the exploratory arm of the 2021 trial, whey and collagen did not
          differ significantly. The first trial is small and had no placebo group, so neither trial settles which is
          better.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Injectable growth-hormone-axis peptides</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          A 2026 endocrinology review sorts sermorelin, tesamorelin, CJC-1295, ipamorelin and related compounds into
          evidence tiers, from regulatory-grade randomised trial data to no human studies at all, and says the{" "}
          <PaperLink id="dominikowski-2026" via="pmc">
            claimed performance and body-recomposition benefits remain uncertain
          </PaperLink>
          . It lists raised prolactin and cortisol, blood-sugar disturbance, fluid retention, muscle or joint pain and
          injection-site reactions among reported adverse effects, and describes cancer-promoting effects as plausible
          but unproven. A 2026 sports-medicine review calls{" "}
          <PaperLink id="villegas-meza-2026" via="doi">
            these peptides and BPC-157 investigational
          </PaperLink>
          , with uncertain safety, product-quality concerns and anti-doping restrictions.
        </p>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The individual trials are thin. <strong className="text-fg">Tesamorelin</strong> is the one with randomised
          trials, in people with HIV and extra abdominal fat: a meta-analysis of{" "}
          <PaperLink id="badran-2026" via="doi">
            five trials
          </PaperLink>{" "}
          found lean body mass up 1.42 kg alongside less visceral and liver fat, and an exploratory analysis found{" "}
          <PaperLink id="adrian-2019" via="pmc">
            small increases in trunk muscle area
          </PaperLink>
          , with no strength measure. For <Link href="/peptides/ipamorelin" className="link">ipamorelin</Link> and{" "}
          <Link href="/peptides/cjc-1295" className="link">CJC-1295</Link> we found no controlled trial with a muscle,
          strength or body-composition outcome: CJC-1295&rsquo;s trials show it{" "}
          <PaperLink id="teichman-2006" via="doi">
            raised growth hormone and IGF-I for weeks
          </PaperLink>{" "}
          in healthy adults, ipamorelin&rsquo;s one placebo-controlled trial (after bowel surgery) found no significant benefit,
          and a higher hormone level is not the same as more muscle. When growth hormone itself was injected into
          healthy adults, systematic reviews found about 2 kg more lean mass but{" "}
          <PaperLink id="liu-2008" via="doi">
            no clear strength gain
          </PaperLink>{" "}
          and more swelling, joint pain and blood-sugar problems (
          <PaperLink id="liu-2007" via="doi">
            Liu 2007
          </PaperLink>
          ).
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">MK-677</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          In a{" "}
          <PaperLink id="nass-2008" via="pmc">
            1-year trial of 65 healthy adults aged 60 to 81
          </PaperLink>
          , 25 mg a day of MK-677 raised growth hormone and IGF-I to young-adult levels and increased fat-free mass by
          1.1 kg, where the placebo group lost 0.5 kg. The extra mass did not change strength or function. Fasting blood
          glucose rose, insulin sensitivity fell, cortisol rose, and weight gain was larger (2.7 kg versus 0.8 kg). The
          authors say the trial was too small and short to judge function. It tested older adults, not athletes. A
          second trial in{" "}
          <PaperLink id="adunsky-2011" via="doi">
            123 hip-fracture patients
          </PaperLink>{" "}
          found mixed results on function and was stopped early because of a congestive-heart-failure signal.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">BPC-157</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          BPC-157 is promoted for recovery rather than size. Reviews describe mostly animal evidence and say the claimed
          benefits are not substantiated by human trials; see the{" "}
          <Link href="/science/topics/muscle" className="link">
            muscle evidence
          </Link>{" "}
          and the{" "}
          <Link href="/science/topics/joints" className="link">
            joints and tendons evidence
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">How each is rated here</h2>
        <div className="mt-6 max-w-sm">
          <TopicCard slug="muscle" compact />
        </div>
        <p className="mt-5 max-w-prose text-sm text-muted">
          The card shows the best and the least-supported ratings in the muscle topic. Open it for every rating and the
          studies behind it.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Before you buy anything</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            Most injectable muscle peptides are unapproved; see{" "}
            <Link href="/peptides/legal-status" className="link">
              their dated legal status
            </Link>
            .
          </li>
          <li>
            Product quality is a documented risk in the unregulated market. A batch report helps; see{" "}
            <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
              how to read a peptide COA
            </Link>
            .
          </li>
          <li>
            Peptides are not steroids, but that does not make them safe; see{" "}
            <Link href="/peptides/are-peptides-steroids" className="link">
              are peptides steroids?
            </Link>
          </li>
          <li>
            For collagen specifically, see{" "}
            <Link href="/peptides/collagen-peptides" className="link">
              collagen peptides: what the evidence shows
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

      <RelatedGoals path="/peptides/peptides-for-muscle-growth" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
