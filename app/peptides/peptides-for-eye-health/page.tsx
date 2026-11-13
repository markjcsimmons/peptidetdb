import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { ShortAnswer } from "@/components/ui";
import { TOPICS, type Level } from "@/lib/topics";
import { RelatedGoals, PageKindLabel } from "@/components/guide-links";
import { RankedList, type Route } from "@/components/ranked-list";
import { PageContents } from "@/components/page-contents";
import { GradedProducts } from "@/components/product-grades";

export const metadata: Metadata = {
  title: "Peptides for eye health: ranked by the evidence",
  description:
    "Do peptides help dry eye, corneal healing or glaucoma? Cyclosporine and insulin eye drops, thymosin beta-4 drops, Retinalamin, semax and oral marine peptides, ranked by the strength of the human studies.",
  alternates: { canonical: "/peptides/peptides-for-eye-health" },
};

const REVIEWED = "2026-11-13";

type Option = {
  name: string;
  level: Level;
  /** How it is taken, only where the entry makes it plain. */
  routes?: Route[];
  /** Rating on the eye topic page this entry mirrors (checked at build time below). */
  topicSubject: string;
  shows: React.ReactNode;
  notShown: React.ReactNode;
};

const OPTIONS: Option[] = [
  {
    name: "Cyclosporine eye drops (prescription) for dry eye",
    level: "mixed",
    routes: ["eye"],
    topicSubject: "Cyclosporine eye drops (prescription) for dry eye",
    shows: (
      <>
        A 2026 Cochrane review of 58 randomised trials (10,225 people) found the drops{" "}
        <PaperLink id="priyadarshini-2026" via="pmc">
          may improve symptoms and probably improve staining of the eye surface
        </PaperLink>{" "}
        at 3 months compared with vehicle or artificial tears.
      </>
    ),
    notShown: (
      <>
        Symptom and tear results were inconsistent between trials and mostly low certainty, follow-up was usually 3 months,
        and people on cyclosporine were about twice as likely to stop because of side effects. It is a prescription medicine,
        not a supplement.
      </>
    ),
  },
  {
    name: "Insulin eye drops for slow-healing corneal wounds",
    level: "limited",
    routes: ["eye"],
    topicSubject: "Insulin eye drops for slow-healing corneal wounds",
    shows: (
      <>
        A meta-analysis of 13 studies (390 eyes) reports{" "}
        <PaperLink id="amaral-2025" via="doi">
          complete healing in 94% of treated eyes
        </PaperLink>
        , and a double-blind trial in 38 people with diabetes found corneal defects after eye surgery{" "}
        <PaperLink id="dasrilsyah-2023" via="doi">
          closed faster than with artificial tears
        </PaperLink>
        .
      </>
    ),
    notShown: (
      <>
        The meta-analysis does not say how many of its studies had a control group, and results varied a lot. Insulin is
        approved for diabetes, not as an eye drop, and these studies treated specific wounds under medical care.
      </>
    ),
  },
  {
    name: "Thymosin beta-4 eye drops (RGN-259)",
    level: "limited",
    routes: ["eye"],
    topicSubject: "Thymosin beta-4 eye drops (RGN-259) for dry eye and corneal healing",
    shows: (
      <>
        In 9 patients with severe dry eye, treated eyes had{" "}
        <PaperLink id="sosne-2015" via="doi">
          less discomfort and corneal staining
        </PaperLink>{" "}
        than vehicle. In 18 patients with a non-healing cornea, full healing at 4 weeks was 6 of 10 against 1 of 8 on placebo.
      </>
    ),
    notShown: (
      <>
        That difference was{" "}
        <PaperLink id="sosne-2022" via="pmc">
          not statistically significant
        </PaperLink>
        , the trial was partly designed by the company developing the drops, and a Cochrane review rated the evidence{" "}
        <PaperLink id="kruoch-2025" via="pmc">
          low certainty
        </PaperLink>
        . See{" "}
        <Link href="/peptides/tb-500" className="link">
          TB-500 and thymosin beta-4
        </Link>
        .
      </>
    ),
  },
  {
    name: "Retinalamin injections for glaucoma and diabetic retinopathy",
    level: "limited",
    routes: ["injected"],
    topicSubject: "Retinalamin injections for glaucoma and diabetic retinopathy",
    shows: (
      <>
        A non-randomised study of 56 people with advanced glaucoma reports{" "}
        <PaperLink id="dorofeev-2025" via="doi">
          slower visual-field loss
        </PaperLink>{" "}
        over 2 years than in untreated patients.
      </>
    ),
    notShown: (
      <>
        In the one randomised trial (147 people with early glaucoma), the groups{" "}
        <PaperLink id="strakhov-2020" via="doi">
          did not differ on any measure at 24 months
        </PaperLink>
        , and a study in diabetic retinopathy{" "}
        <PaperLink id="malakhova-2024" via="doi">
          gives no numbers
        </PaperLink>{" "}
        for its claimed benefits. All are Russian-language studies, and Retinalamin was given alongside eye-pressure
        treatment, not instead of it.
      </>
    ),
  },
  {
    name: "Semax nasal drops for optic nerve disease",
    level: "limited",
    routes: ["nasal"],
    topicSubject: "Semax nasal drops for optic nerve disease",
    shows: (
      <>
        A Russian controlled study from 2000 reports{" "}
        <PaperLink id="polunin-2000" via="pubmed">
          better vision, visual fields and colour vision
        </PaperLink>{" "}
        when semax was added to standard treatment.
      </>
    ),
    notShown: <>The abstract gives no patient numbers or results and does not say the groups were randomised.</>,
  },
  {
    name: "Oral marine (fish-derived) peptides for eyesight",
    level: "none",
    routes: ["oral"],
    topicSubject: "Oral marine (fish-derived) peptides for eyesight",
    shows: <>Nothing in people that we found: our searches turned up no controlled human trial with an eye or vision outcome.</>,
    notShown: (
      <>
        Supplements sold for eye health may cite laboratory or animal work. See{" "}
        <Link href="/peptides/oral-marine-peptides" className="link">
          do oral marine peptides work?
        </Link>
      </>
    ),
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Which peptide is best for dry eye?",
    a: "Judged by the amount of human evidence, cyclosporine eye drops, a prescription medicine: a Cochrane review of 58 trials found they may improve symptoms and probably improve the eye surface, though results were inconsistent and more people stopped because of side effects. Thymosin beta-4 drops have only two small trials.",
  },
  {
    q: "Is cyclosporine a peptide?",
    a: "Yes. Cyclosporine is a ring-shaped peptide drug. As an eye drop it is an FDA-approved prescription treatment for dry eye, sold for example as Cequa and Vevye.",
  },
  {
    q: "Can peptides treat glaucoma?",
    a: "Not on the evidence we found. In the one randomised trial of the Russian drug Retinalamin, treated and untreated patients did not differ on any measure at 24 months, and the more positive studies were not randomised. These peptides were tested alongside treatment that controls eye pressure, not instead of it.",
  },
  {
    q: "Do eye supplements with peptides improve vision?",
    a: "We found no controlled human trial of peptides taken by mouth with an eye or vision outcome. The peptides with human eye evidence here are given as eye drops or injections, mostly as medical treatment.",
  },
];

export default function PeptidesForEyeHealthPage() {
  const eye = TOPICS.eye;
  // The ratings on this page must match the topic page. A mismatch fails the build instead of publishing a contradiction.
  for (const o of OPTIONS) {
    const r = eye.ratings.find((x) => x.subject === o.topicSubject);
    if (!r || r.level !== o.level) {
      throw new Error(`peptides-for-eye-health: "${o.name}" does not match its rating "${o.topicSubject}" on the eye topic page`);
    }
  }

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
            { "@type": "ListItem", position: 3, name: "Peptides for eye health", item: absoluteUrl("/peptides/peptides-for-eye-health") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Peptides for eye health
      </nav>
      <PageKindLabel path="/peptides/peptides-for-eye-health" />
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">Peptides for eye health, ranked by the evidence</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <ShortAnswer className="mt-6">
        <p className="max-w-prose text-lg leading-relaxed sm:text-xl sm:leading-relaxed [text-wrap:pretty]">
          The best-studied peptide for the eyes is cyclosporine, a prescription eye drop for dry eye with many trials and mixed
          results. Insulin and thymosin beta-4 eye drops have small studies for corneal healing and dry eye. Russian peptide
          drugs for glaucoma and optic nerve disease rest on weak studies, and we found no human trial of peptides taken by mouth
          for eyesight.
        </p>
      </ShortAnswer>

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">How this ranking works</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The list is ordered by how strong the human evidence is, using the ratings on our{" "}
          <Link href="/science/topics/eye" className="link">
            eye health evidence page
          </Link>
          . It does not measure how big a benefit is, how safe something is, or whether one option beats another, because the
          studies do not compare them. Options that share a rating are ties, and their order is our judgement. Most of these are
          medical treatments for specific eye diseases, not supplements, and a result in one disease does not carry over to
          another. It ranks types of peptide, not products. Nobody paid for a place on this page, and there are no affiliate
          links.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">The ranking</h2>
        <RankedList options={OPTIONS} />
        <p className="mt-5 max-w-prose text-sm text-muted">
          Not covered: nerve growth factor drops and anti-VEGF injections, which are proteins rather than peptides, and lacritin,
          a tear-film peptide that appeared only in animal work in our search.
        </p>
      </section>

      <GradedProducts
        area="eye"
        ratingNote={<>We found no human trial of oral peptides for eyesight, so an eye claim for a peptide costs 4 points under the claims criterion.</>}
      />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">If you are choosing</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">Dry eye:</strong> cyclosporine drops are a prescription medicine; an eye doctor can say
            whether they suit your type of dry eye.
          </li>
          <li>
            <strong className="text-fg">Glaucoma:</strong> nothing here replaces treatment that lowers eye pressure. Do not stop
            or change prescribed drops without talking to your eye doctor.
          </li>
          <li>
            <strong className="text-fg">Sudden or worsening vision changes</strong> need prompt medical attention rather than a
            supplement.
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
            { href: "/science/topics/eye", label: "Full eye health evidence" },
            { href: "/peptides/tb-500", label: "TB-500 and thymosin beta-4" },
            { href: "/peptides/nootropic-peptides", label: "Nootropic peptides, ranked" },
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

      <RelatedGoals path="/peptides/peptides-for-eye-health" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
