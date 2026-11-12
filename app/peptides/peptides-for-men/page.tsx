import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout } from "@/components/ui";
import { TOPICS, type Level } from "@/lib/topics";
import type { Topic } from "@/lib/studies";
import { RelatedGoals } from "@/components/guide-links";
import { RankedList, type Route } from "@/components/ranked-list";

export const metadata: Metadata = {
  title: "Peptides for men: ranked by the evidence",
  description:
    "Do peptides work for men? Collagen for muscle, GLP-1 drugs, testosterone, erectile dysfunction, kisspeptin, hair loss, BPC-157 and growth-hormone peptides, ranked by the strength of the human studies, with what each does not show.",
  alternates: { canonical: "/peptides/peptides-for-men" },
};

const REVIEWED = "2026-11-12";

type Option = {
  name: string;
  level: Level;
  /** How it is taken, only where the entry makes it plain. */
  routes?: Route[];
  /** Topic page and rating this entry mirrors (checked at build time below). */
  topic: Topic;
  topicSubject: string;
  shows: React.ReactNode;
  notShown: React.ReactNode;
};

const OPTIONS: Option[] = [
  {
    name: "Collagen peptides with resistance training, for muscle",
    level: "consistent",
    routes: ["oral"],
    topic: "muscle",
    topicSubject: "Oral collagen peptides with resistance training: fat-free mass",
    shows: (
      <>
        A 2024 meta-analysis of 19 trials in 768 healthy adults favoured collagen peptides over control for fat-free mass, with
        moderate certainty (
        <PaperLink id="bischof-2024" via="pmc">
          Bischof 2024
        </PaperLink>
        ). In 53 men averaging 72 with age-related muscle loss, fat-free mass rose 4.2 kg with collagen against 2.9 kg on placebo,
        and quadriceps strength rose 16.5 Nm against 7.3 Nm (
        <PaperLink id="zdzieblik-2015" via="pmc">
          Zdzieblik 2015
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        Everyone trained, so it shows collagen as an add-on to exercise, not on its own. The meta-analysis pooled healthy adults, not men alone, found
        only a small effect on strength, and rated most outcomes low in certainty. The older-men trial is a single trial and its
        abstract states no funder. See{" "}
        <Link href="/peptides/peptides-for-muscle-growth" className="link">
          peptides for muscle growth
        </Link>
        .
      </>
    ),
  },
  {
    name: "Prescription GLP-1 drugs (semaglutide, tirzepatide) for weight loss",
    level: "consistent",
    topic: "weight",
    topicSubject: "Prescription semaglutide and tirzepatide for weight loss",
    shows: (
      <>
        In 1,961 adults with obesity and no diabetes, weight fell 14.9% on semaglutide against 2.4% on placebo over 68 weeks (
        <PaperLink id="wilding-2021" via="doi">
          Wilding 2021
        </PaperLink>
        ), and by up to 20.9% on tirzepatide against 3.1% over 72 weeks in 2,539 adults (
        <PaperLink id="jastreboff-2022" via="doi">
          Jastreboff 2022
        </PaperLink>
        ). A 2026 network meta-analysis of 262 trials agreed on moderate-to-high-certainty weight loss at one year (
        <PaperLink id="nong-2026" via="doi">
          Nong 2026
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        The trials enrolled men and women together, and the abstracts do not give results for men alone. The two large trials were
        funded by Novo Nordisk and Eli Lilly. Gastrointestinal side effects were the most common, and these are prescription drugs,
        not supplements. See{" "}
        <Link href="/peptides/for-weight-loss" className="link">
          peptides for weight loss
        </Link>
        .
      </>
    ),
  },
  {
    name: "GLP-1 drugs for testosterone in men with obesity-related low testosterone",
    level: "limited",
    topic: "mens-health",
    topicSubject: "GLP-1 drugs (semaglutide, liraglutide, tirzepatide) for testosterone in men with obesity-related low testosterone",
    shows: (
      <>
        A systematic review of ten studies in 639 men found these drugs were consistently linked to higher total testosterone,
        especially in men with obesity, type 2 diabetes or functional hypogonadism (
        <PaperLink id="deameh-2026" via="doi">
          Deameh 2026
        </PaperLink>
        ), and another found a mean rise of 2.5 to 5.2 nmol/L (
        <PaperLink id="la-vignera-2026" via="pmc">
          La Vignera 2026
        </PaperLink>
        ). In 25 men with type 2 diabetes and low testosterone, semaglutide left more normally shaped sperm than testosterone
        injections, which lowered sperm concentration (
        <PaperLink id="gregoric-2025" via="pmc">
          Gregorič 2025
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        The randomised trials were small (12 to 42 men) and short (12 to 24 weeks), and the second review says the rise is largely
        a result of weight loss and better insulin resistance, not a direct hormonal effect. The 25-man trial was open-label, normal
        sperm rose only from 2% to 4%, and the erectile-function score improved only on testosterone. Three of its authors report
        honoraria from drug companies. The first review found no change in semen quality in healthy men. These are prescription drugs
        for men with a weight or diabetes diagnosis.
      </>
    ),
  },
  {
    name: "Bremelanotide (PT-141) for erectile dysfunction",
    level: "limited",
    routes: ["injected", "nasal"],
    topic: "mens-health",
    topicSubject: "Bremelanotide (PT-141) for erectile dysfunction in men",
    shows: (
      <>
        In 342 men with erectile dysfunction who had not responded to sildenafil, a positive clinical result was seen in 51 men
        (33.5%) on an intranasal bremelanotide spray against 13 (8.5%) on placebo (p = 0.03) (
        <PaperLink id="safarinejad-2008" via="doi">
          Safarinejad 2008
        </PaperLink>
        ). A{" "}
        <PaperLink id="molinoff-2003" via="doi">
          2003 summary
        </PaperLink>{" "}
        reported a dose-dependent rise in erectile activity in normal men and men with the condition.
      </>
    ),
    notShown: (
      <>
        The percentages imply only about 150 men per group were counted, not the 172 and 170 randomised, and the abstract does not
        say what counted as a positive result. Side effects were more frequent on the drug. It is one trial, and the 2003 abstract
        gives no numbers. We found no more recent trial in men, and the nasal spray is a different route from the{" "}
        <Link href="/peptides/peptides-for-women" className="link">
          injected form studied in women
        </Link>
        .
      </>
    ),
  },
  {
    name: "Kisspeptin-10 for raising testosterone",
    level: "limited",
    topic: "mens-health",
    topicSubject: "Kisspeptin-10 for raising testosterone",
    shows: (
      <>
        In 15 healthy men, timed kisspeptin-10 infusions under the skin raised luteinising hormone, follicle-stimulating hormone and
        testosterone, and daily 8-hour infusions kept gonadotropins raised for 12 days (
        <PaperLink id="yeung-2026" via="doi">
          Yeung 2026
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        It measured hormone levels only, in men without a hormone problem, and used timed pump infusions. No symptoms, muscle,
        sexual function or fertility were tested, and a higher testosterone level in men with normal levels is not shown to help
        them. The authors describe it as groundwork for treating reproductive disorders. It is not a self-administered product.
      </>
    ),
  },
  {
    name: "Topical peptides for male-pattern hair loss",
    level: "limited",
    routes: ["topical"],
    topic: "hair",
    topicSubject: "Topical peptide products for hair loss (GPIGS, acetyl tetrapeptide-3 and similar)",
    shows: (
      <>
        In 22 Japanese men with androgenetic alopecia, a lotion with the penta-peptide GPIGS used for 4 months raised the proportion
        of thick hair compared with a placebo lotion (p = 0.006) (
        <PaperLink id="iwabuchi-2016" via="doi">
          Iwabuchi 2016
        </PaperLink>
        ). A 2026 systematic review of 14 trials gave grade B to several peptide formulations (
        <PaperLink id="joerg-2026" via="doi">
          Joerg 2026
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        The lotion trial gives no group sizes and compared against placebo, not minoxidil or finasteride. The review&rsquo;s
        abstract gives no sample sizes and calls peptides &ldquo;established&rdquo; and &ldquo;safe&rdquo; without showing
        evidence. A 112-man trial of an injected formulation tested an add-on to{" "}
        <PaperLink id="gold-2025" via="doi">
          hair transplant surgery
        </PaperLink>
        , single-blind and with no placebo injection. See{" "}
        <Link href="/peptides/peptides-for-hair-growth" className="link">
          peptides for hair growth
        </Link>
        .
      </>
    ),
  },
  {
    name: "BPC-157 for tendon and joint injuries",
    level: "preclinical",
    topic: "joints",
    topicSubject: "BPC-157 for tendon, ligament and joint problems",
    shows: (
      <>
        In 32 rats with a repaired Achilles tendon, BPC-157 gave numerically better but non-significant results (
        <PaperLink id="bicer-2026" via="doi">
          Biçer 2026
        </PaperLink>
        ). A 2026 review says human musculoskeletal evidence is limited to one small retrospective case series (
        <PaperLink id="tham-2026" via="doi">
          Tham 2026
        </PaperLink>
        ), and a systematic review found three small uncontrolled human studies in 30 people with very low certainty (
        <PaperLink id="poolton-2026" via="doi">
          Poolton 2026
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        Eight rats per group at one 4-week time point do not translate to people, and no controlled human trial has tested it. It is
        not an approved medicine; see the{" "}
        <Link href="/peptides/bpc-157" className="link">
          BPC-157 page
        </Link>{" "}
        and the{" "}
        <Link href="/peptides/legal-status" className="link">
          legal status page
        </Link>
        .
      </>
    ),
  },
  {
    name: "Ipamorelin and CJC-1295, for muscle",
    level: "none",
    routes: ["injected"],
    topic: "muscle",
    topicSubject: "Ipamorelin and CJC-1295",
    shows: (
      <>
        Our PubMed searches found no controlled trial of either with a muscle, strength or body-composition outcome. CJC-1295 raised
        growth hormone and IGF-I for days to weeks in healthy adults (
        <PaperLink id="teichman-2006" via="doi">
          Teichman 2006
        </PaperLink>
        ;{" "}
        <PaperLink id="ionescu-2006" via="doi">
          Ionescu 2006
        </PaperLink>
        ), and ipamorelin was tested for bowel recovery after surgery with no significant difference on its efficacy measures (
        <PaperLink id="beck-2014" via="doi">
          Beck 2014
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        A higher hormone level is not evidence of more muscle. The oral drug MK-677 raised fat-free mass by 1.1 kg in 65 healthy
        older adults but also raised fasting glucose and lowered insulin sensitivity (
        <PaperLink id="nass-2008" via="pmc">
          Nass 2008
        </PaperLink>
        ), and it is a different drug. &ldquo;No trial found&rdquo; means our search found none, not that none exists. See the{" "}
        <Link href="/peptides/ipamorelin" className="link">
          ipamorelin
        </Link>{" "}
        and{" "}
        <Link href="/peptides/cjc-1295" className="link">
          CJC-1295
        </Link>{" "}
        pages.
      </>
    ),
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Are there peptides made specifically for men?",
    a: "We found small trials of bremelanotide for erectile dysfunction in men and of kisspeptin-10 for raising hormone levels in healthy men, but both are limited: one trial of 342 men in the first case, and 15 healthy men in the second. Most peptide studies report men and women together.",
  },
  {
    q: "Do peptides raise testosterone?",
    a: "In 15 healthy men, kisspeptin-10 raised testosterone during infusions lasting up to 12 days, but only hormone levels were measured. GLP-1 weight-loss drugs raised testosterone in men with obesity-related low testosterone, which a 2026 review says is largely a result of weight loss. This page does not cover non-peptide treatments such as testosterone therapy.",
  },
  {
    q: "Do peptides help men build muscle?",
    a: "Collagen peptides taken with resistance training were followed by a small gain in fat-free mass compared with placebo in a 2024 meta-analysis of 19 trials, with moderate certainty. We found no controlled trial of ipamorelin or CJC-1295 with a muscle outcome.",
  },
  {
    q: "Do GLP-1 weight-loss drugs affect erections?",
    a: "The evidence is conflicting and comes from records studies, not trials. Obese men without diabetes who were prescribed semaglutide had more erectile dysfunction diagnoses than matched men (1.47% against 0.32%), while men with type 2 diabetes on tirzepatide had fewer than men on other diabetes drugs. These are associations, and neither shows cause.",
  },
  {
    q: "Do peptides help with hair loss in men?",
    a: "Evidence is limited. A 22-man trial of a peptide lotion found more thick hair than placebo after 4 months, and a 2026 review grades some peptide formulations B, but its abstract gives no sample sizes. None of the studies we read compared peptides with minoxidil or finasteride.",
  },
  {
    q: "Is BPC-157 proven for tendon injuries?",
    a: "No. The evidence is mostly from animals. A 2026 systematic review found three small uncontrolled human studies in 30 people and rated the certainty very low, and we found no controlled human trial.",
  },
];

export default function PeptidesForMenPage() {
  // The ratings on this page must match the topic pages. A mismatch fails the build instead of publishing a contradiction.
  for (const o of OPTIONS) {
    const r = TOPICS[o.topic].ratings.find((x) => x.subject === o.topicSubject);
    if (!r || r.level !== o.level) {
      throw new Error(`peptides-for-men: "${o.name}" does not match its rating "${o.topicSubject}" on the ${o.topic} topic page`);
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
            { "@type": "ListItem", position: 3, name: "Peptides for men", item: absoluteUrl("/peptides/peptides-for-men") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Peptides for men
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">Peptides for men, ranked by the evidence</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          The best-supported uses are collagen peptides added to resistance training for muscle and prescription GLP-1 drugs for
          weight loss. For men-specific outcomes (testosterone, erections) the human evidence is limited to a few small or short
          studies, BPC-157 has only animal evidence, and we found no controlled trial of ipamorelin or CJC-1295 for muscle.
        </p>
      </Callout>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">How this ranking works</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          Most peptide studies report men and women together, so this page mixes outcomes men search for, rated on our{" "}
          <Link href="/science/topics/muscle" className="link">
            muscle
          </Link>
          ,{" "}
          <Link href="/science/topics/weight" className="link">
            weight
          </Link>
          ,{" "}
          <Link href="/science/topics/hair" className="link">
            hair
          </Link>{" "}
          and{" "}
          <Link href="/science/topics/joints" className="link">
            joints
          </Link>{" "}
          pages, with outcomes specific to men, rated on our{" "}
          <Link href="/science/topics/mens-health" className="link">
            men&rsquo;s health evidence page
          </Link>
          . The list is ordered by how strong the human evidence is. It does not measure how big a benefit is, how safe something
          is, or whether one option beats another, because the studies do not compare them. Entries that share a rating are in an
          order that is our judgement: read them as ties. It ranks types of peptide, not products, and a prescription drug is not
          interchangeable with a supplement. Nobody paid for a place on this page, and there are no affiliate links.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">The ranking</h2>
        <RankedList options={OPTIONS} />
        <p className="mt-5 max-w-prose text-sm text-muted">
          Not rated: GLP-1 drugs and erectile function. Two records-based studies point in opposite directions: obese men without
          diabetes prescribed semaglutide had more erectile dysfunction diagnoses than matched men (
          <PaperLink id="able-2025" via="doi">
            Able 2025
          </PaperLink>
          ), while men with type 2 diabetes on tirzepatide had fewer than on other diabetes drugs (
          <PaperLink id="cowart-2025" via="doi">
            Cowart 2025
          </PaperLink>
          ). They show associations, not cause, and no trial has tested it. Not searched: hCG and other gonadotropins, prostate
          health, and longevity or &ldquo;anti-aging&rdquo; claims. Non-peptide treatments such as testosterone therapy and
          enclomiphene are outside this site&rsquo;s scope.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">If you are choosing</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">Tiredness, low drive or erection problems:</strong> these have many causes, including
            low testosterone, diabetes, heart disease and medication, and need a clinician&rsquo;s work-up. None of the studies
            here compares a peptide with that.
          </li>
          <li>
            <strong className="text-fg">Prescription peptides (GLP-1 drugs):</strong> these are medicines with side effects, and a
            clinician decides whether they suit you. Do not buy them from unregulated sources; see the{" "}
            <Link href="/peptides/legal-status" className="link">
              legal status page
            </Link>
            .
          </li>
          <li>
            <strong className="text-fg">Research peptides sold online (BPC-157, ipamorelin, CJC-1295, kisspeptin):</strong> not
            approved medicines, with the human evidence described above and the safety limits on our{" "}
            <Link href="/science/topics/safety" className="link">
              safety page
            </Link>
            .
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
            { href: "/science/topics/mens-health", label: "Full men's health evidence" },
            { href: "/peptides/peptides-for-muscle-growth", label: "Peptides for muscle growth" },
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

      <RelatedGoals path="/peptides/peptides-for-men" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
