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

export const metadata: Metadata = {
  title: "Peptides for blood pressure: ranked by evidence",
  description:
    "Do peptides lower blood pressure? GLP-1 drugs, milk lactotripeptides (IPP and VPP), sardine and fish peptides, ranked by the strength of the human studies, with how big the effect is and what each does not show.",
  alternates: { canonical: "/peptides/peptides-for-blood-pressure" },
};

const REVIEWED = "2026-11-13";

type Option = {
  name: string;
  level: Level;
  /** How it is taken, only where the entry makes it plain. */
  routes?: Route[];
  /** Rating on the blood-pressure topic page this entry mirrors (checked at build time below). */
  topicSubject: string;
  shows: React.ReactNode;
  notShown: React.ReactNode;
};

const OPTIONS: Option[] = [
  {
    name: "Prescription GLP-1 drugs (semaglutide, tirzepatide)",
    level: "consistent",
    topicSubject: "Prescription GLP-1 drugs (semaglutide, tirzepatide) and blood pressure",
    shows: (
      <>
        Across three 68-week semaglutide trials (3,136 people), systolic blood pressure fell{" "}
        <PaperLink id="kennedy-2024" via="pmc">
          about 5 mm Hg more than on placebo
        </PaperLink>
        , including in people with hypertension, who also needed less blood-pressure medicine. In seven tirzepatide trials it
        fell{" "}
        <PaperLink id="kanbay-2023" via="doi">
          by about 4 to 6 mm Hg depending on dose
        </PaperLink>
        .
      </>
    ),
    notShown: (
      <>
        Much of the fall comes with weight loss, and the trials were designed to test weight or diabetes, not blood pressure.
        These are prescription drugs for obesity or diabetes, not blood-pressure supplements. See{" "}
        <Link href="/peptides/for-weight-loss" className="link">
          peptides for weight loss
        </Link>
        .
      </>
    ),
  },
  {
    name: "Milk lactotripeptides (IPP and VPP)",
    level: "consistent",
    routes: ["oral"],
    topicSubject: "Milk lactotripeptides (IPP and VPP) for blood pressure",
    shows: (
      <>
        Three meta-analyses of randomised trials agree on the direction: systolic pressure fell{" "}
        <PaperLink id="qin-2013" via="doi">
          about 1.7 mm Hg across 28 trials
        </PaperLink>
        ,{" "}
        <PaperLink id="cicero-2013" via="pmc">
          about 1.3 mm Hg in 14 European trials
        </PaperLink>{" "}
        and{" "}
        <PaperLink id="chanson-rolle-2015" via="pmc">
          5.6 mm Hg in 18 Japanese trials
        </PaperLink>
        , more in people with hypertension.
      </>
    ),
    notShown: (
      <>
        Outside Japan the effect is small, about 1 to 2 mm Hg, and the larger Japanese
        result comes from a review paid for by a company with a research agreement on these peptides. None of the analyses
        measured heart attacks or strokes.
      </>
    ),
  },
  {
    name: "Valyl-tyrosine (a sardine-derived peptide)",
    level: "limited",
    routes: ["oral"],
    topicSubject: "Valyl-tyrosine, a defined sardine-derived peptide",
    shows: (
      <>
        In 29 adults with high-normal blood pressure or mild hypertension, 4 weeks of the peptide lowered pressure by{" "}
        <PaperLink id="kawasaki-2000" via="doi">
          roughly 9 mm Hg systolic and 5 mm Hg diastolic
        </PaperLink>
        , with no change on placebo.
      </>
    ),
    notShown: <>One small, short trial from 2000; nothing else we summarise replicates it.</>,
  },
  {
    name: "Marine collagen peptides in type 2 diabetes with hypertension",
    level: "limited",
    routes: ["oral"],
    topicSubject: "Marine collagen peptides added to usual care in type 2 diabetes with hypertension",
    shows: (
      <>
        In 100 patients who stayed on their usual medicines, 3 months of marine collagen peptides{" "}
        <PaperLink id="zhu-2010" via="doi">
          lowered diastolic and mean arterial pressure
        </PaperLink>{" "}
        and improved blood sugar and cholesterol.
      </>
    ),
    notShown: <>One trial, in a specific group of patients, and the abstract gives no dose.</>,
  },
  {
    name: "Fish protein hydrolysate and blood-vessel function",
    level: "limited",
    routes: ["oral"],
    topicSubject: "Fish protein hydrolysate and blood-vessel function in healthy adults",
    shows: (
      <>
        In nine healthy adults, a single 20 g dose{" "}
        <PaperLink id="oliveira-2020" via="doi">
          did not improve blood-vessel dilation
        </PaperLink>
        , while a whey hydrolysate did.
      </>
    ),
    notShown: <>A one-dose study in nine people that did not measure blood pressure.</>,
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Do peptides lower blood pressure?",
    a: "Some do in trials. Prescription GLP-1 drugs lowered systolic pressure by about 4 to 6 mm Hg, largely with weight loss. Milk lactotripeptides (IPP and VPP) lowered it by about 1 to 2 mm Hg in two analyses and by about 5.6 mm Hg in an analysis of Japanese trials. Fish-derived peptides have only a few small trials.",
  },
  {
    q: "What are lactotripeptides?",
    a: "Two three-amino-acid peptides from milk protein, isoleucine-proline-proline (IPP) and valine-proline-proline (VPP), which are reported to block the enzyme ACE that tightens blood vessels. They have been tested as a food or supplement ingredient.",
  },
  {
    q: "Can a peptide supplement replace blood-pressure medicine?",
    a: "Nothing on this page shows that. The food-derived peptides lowered pressure by a few mm Hg at most in trials, we did not search for trials comparing them with standard medicines, and none measured heart attacks or strokes. Do not stop or change prescribed medicine without talking to your clinician.",
  },
  {
    q: "Are fish peptides good for blood pressure?",
    a: "The evidence is thin: one 29-person trial of a sardine peptide found a fall of about 9 mm Hg systolic, one trial in 100 patients with diabetes found lower diastolic pressure with marine collagen, and a one-dose study found no effect on blood-vessel function. They tested different products.",
  },
];

export default function PeptidesForBloodPressurePage() {
  const bp = TOPICS["blood-pressure"];
  // The ratings on this page must match the topic page. A mismatch fails the build instead of publishing a contradiction.
  for (const o of OPTIONS) {
    const r = bp.ratings.find((x) => x.subject === o.topicSubject);
    if (!r || r.level !== o.level) {
      throw new Error(`peptides-for-blood-pressure: "${o.name}" does not match its rating "${o.topicSubject}" on the blood-pressure topic page`);
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
            {
              "@type": "ListItem",
              position: 3,
              name: "Peptides for blood pressure",
              item: absoluteUrl("/peptides/peptides-for-blood-pressure"),
            },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Peptides for blood pressure
      </nav>
      <PageKindLabel path="/peptides/peptides-for-blood-pressure" />
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">Peptides for blood pressure, ranked by the evidence</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <ShortAnswer className="mt-6">
        <p className="max-w-prose text-lg leading-relaxed sm:text-xl sm:leading-relaxed [text-wrap:pretty]">
          Two kinds of peptide have consistent evidence. Prescription GLP-1 drugs lower systolic blood pressure by about 4 to 6
          mm Hg, largely through weight loss. Milk lactotripeptides (IPP and VPP) lower it too, but outside Japan by only about 1
          to 2 mm Hg. Fish-derived peptides have a few small trials of different products. None of these trials measured heart
          attacks or strokes.
        </p>
      </ShortAnswer>

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">How this ranking works</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          The list is ordered by how strong the human evidence is, using the ratings on our{" "}
          <Link href="/science/topics/blood-pressure" className="link">
            blood pressure evidence page
          </Link>
          . Two options share the top rating but differ a lot in size of effect, so each entry gives the numbers. The ranking
          does not measure safety or compare the options with each other or with blood-pressure medicines, because the studies
          do not. Options that share a rating are ties, and their order is our judgement. It ranks types of peptide, not
          products. Nobody paid for a place on this page, and there are no affiliate links.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">The ranking</h2>
        <RankedList options={OPTIONS} />
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">If you are choosing</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">If you take blood-pressure medicine:</strong> nothing here shows a peptide can replace
            it. Talk to your clinician before changing anything, and before adding a supplement that may lower pressure further.
          </li>
          <li>
            <strong className="text-fg">Milk peptides:</strong> the expected effect is a few mm Hg at most outside Japan. The
            larger Japanese figure has not been matched in European trials.
          </li>
          <li>
            <strong className="text-fg">Fish-derived products:</strong> take care with a fish allergy; a case report describes{" "}
            <PaperLink id="ueno-2020" via="pmc">
              anaphylaxis in a child with fish allergy
            </PaperLink>{" "}
            after fish collagen tablets.
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
            { href: "/science/topics/blood-pressure", label: "Full blood pressure evidence" },
            { href: "/peptides/oral-marine-peptides", label: "Do oral marine peptides work?" },
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

      <RelatedGoals path="/peptides/peptides-for-blood-pressure" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
