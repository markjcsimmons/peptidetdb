import type { Metadata } from "next";
import Link from "next/link";
import type { Level } from "@/lib/topics";
import { RatingBadge } from "@/components/evidence-meter";
import { ShortAnswer } from "@/components/ui";
import { STUDY_BY_ID, shortCite } from "@/lib/studies";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { JsonLd } from "@/components/json-ld";
import { PageContents } from "@/components/page-contents";
import { PageKindLabel } from "@/components/guide-links";

export const metadata: Metadata = {
  title: "Do oral marine peptides work? What studies show",
  description:
    "What the human studies show for oral marine (fish-derived) peptides, system by system: skin, blood pressure, sleep and memory, muscle, joints, immunity and vision. Including where no trial exists.",
  alternates: { canonical: "/peptides/oral-marine-peptides" },
};

const REVIEWED = "2026-11-09";

type Row = { system: string; level: Level; studies: string[]; note: string; topic?: string };

const ROWS: Row[] = [
  {
    system: "Skin and hair",
    level: "limited",
    studies: ["evans-2021", "hwang-2026"],
    note: "Two randomised trials of fish-derived collagen peptides report better wrinkle, elasticity, cellulite and hair results. One gives no sample size or dose, and several of its results are changes from baseline or self-rated.",
    topic: "skin",
  },
  {
    system: "Blood pressure and blood vessels",
    level: "limited",
    studies: ["kawasaki-2000", "zhu-2010", "oliveira-2020"],
    note: "A 29-person trial of one sardine peptide and a 100-patient trial of marine collagen peptides added to usual care found lower blood pressure. A single dose of fish hydrolysate did not improve blood-vessel dilation. All are small.",
    topic: "blood-pressure",
  },
  {
    system: "Sleep, memory and stress",
    level: "limited",
    studies: ["eckert-2024", "chataigner-2026", "oddoux-2022"],
    note: "The sleep trial found no difference from placebo. The memory trial was positive but the product also contained omega-3s. The anxiety study had no control group. All three report ties to a company with an interest in the product.",
    topic: "brain",
  },
  {
    system: "Muscle and recovery",
    level: "limited",
    studies: ["mjos-2019", "cordeiro-2020"],
    note: "Fish hydrolysate raised blood amino acids like whey does, but it did not improve recovery between two cycling sessions. Neither study measured muscle growth over weeks of training.",
    topic: "muscle",
  },
  {
    system: "Joints and tendons",
    level: "none",
    studies: [],
    note: "Laboratory and biomaterial work on fish collagen and cartilage exists. We found no controlled human trial of swallowing marine collagen peptides for joint or tendon problems.",
    topic: "joints",
  },
  {
    system: "Immune function",
    level: "none",
    studies: [],
    note: "We found no controlled human trial of oral marine peptides on immune outcomes.",
  },
  {
    system: "Vision and eye health",
    level: "none",
    studies: [],
    note: "We found no controlled human trial of oral marine peptides on eye or vision outcomes.",
  },
];

export default function OralMarinePeptidesPage() {
  return (
    <article className="relative mx-auto max-w-3xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Do oral marine peptides work? What the studies show",
          url: absoluteUrl("/peptides/oral-marine-peptides"),
          dateModified: REVIEWED,
          publisher: { "@type": "Organization", name: SITE.name },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Peptides", item: absoluteUrl("/peptides") },
            {
              "@type": "ListItem",
              position: 2,
              name: "Oral marine peptides",
              item: absoluteUrl("/peptides/oral-marine-peptides"),
            },
          ],
        }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          Peptides
        </Link>{" "}
        / Oral marine peptides
      </nav>
      <PageKindLabel path="/peptides/oral-marine-peptides" />
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">Do oral marine peptides work?</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <ShortAnswer className="mt-6">
        <p className="max-w-prose text-lg leading-relaxed sm:text-xl sm:leading-relaxed [text-wrap:pretty]">
          Partly. Fish-derived collagen peptides have randomised trials for skin, and a few small human studies
          exist for blood pressure, sleep, memory and recovery. Most are small, several report funding ties to a
          company with an interest in the product, and some found no benefit over placebo. For joints and tendons, immune function and
          vision, we found no human trials.
        </p>
      </ShortAnswer>

      <PageContents />

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">What the studies show, system by system</h2>
        <p className="mt-3 max-w-prose text-muted">
          &ldquo;Marine peptides&rdquo; here means peptides swallowed in a supplement that come from fish or other
          marine sources: marine (fish-derived) collagen peptides, fish protein hydrolysate, and defined peptides such
          as the sardine peptide valyl-tyrosine. We counted ten human studies.
        </p>
        <div className="mt-4 space-y-4">
          {ROWS.map((r) => (
            <div key={r.system} className="rounded-card border border-line bg-card p-6">
              <h3 className="font-semibold">{r.system}</h3>
              <div className="mt-2">
                <RatingBadge level={r.level} measures="benefit" />
              </div>
              <p className="mt-3 max-w-prose text-sm">{r.note}</p>
              {r.studies.length > 0 && (
                <p className="mt-3 text-sm text-muted">
                  Studies:{" "}
                  {r.studies.map((id, i) => {
                    const s = STUDY_BY_ID.get(id);
                    if (!s) throw new Error(`oral-marine-peptides: no study "${id}"`);
                    return (
                      <span key={id}>
                        {i > 0 && "; "}
                        <Link href={`/science/${id}`} className="link">
                          {shortCite(s)}
                        </Link>
                      </span>
                    );
                  })}
                  {r.topic && (
                    <>
                      {" · "}
                      <Link href={`/science/topics/${r.topic}`} className="link">
                        Full evidence page
                      </Link>
                    </>
                  )}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">What this evidence does not show</h2>
        <ul className="mt-3 max-w-prose list-disc space-y-2 pl-5">
          <li>
            <strong>Most studies are small.</strong> Several enrolled 9 to 53 people, and some abstracts give no
            sample size or dose.
          </li>
          <li>
            <strong>Products differ.</strong> A sardine dipeptide, a collagen peptide and a general fish hydrolysate
            are different substances, so one result does not carry over to another. Some tested products also
            contained omega-3 fatty acids, magnesium or vitamins.
          </li>
          <li>
            <strong>Funding.</strong> Four of the ten studies report funding or authorship ties to a company with a
            commercial interest in the product tested. For the others, the PubMed record states none, which is not the same as none.
          </li>
          <li>
            <strong>Negative results.</strong> One sleep trial found no difference from placebo and one recovery
            trial found no benefit, though the sleep authors still described the supplement as helpful.
          </li>
          <li>
            <strong>The mechanism is not the proof.</strong> Showing a peptide can block an enzyme or raise a blood
            marker is not the same as showing it helps people.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">How we searched</h2>
        <p className="mt-3 max-w-prose">
          On {formatDate(REVIEWED)} we searched PubMed for human trials and meta-analyses using terms for marine and
          fish collagen, fish protein hydrolysate, marine peptides and sardine or bonito peptides, combined with skin,
          blood pressure, joints, muscle, sleep, memory, stress, immune and eye outcomes. We read each abstract and
          kept human studies of products taken by mouth. We did not search other databases or trial registries, so a
          &ldquo;no human trials found&rdquo; verdict means we did not find one, not that none exists. Read the{" "}
          <Link href="/science/methodology" className="link">
            methodology
          </Link>{" "}
          for how studies are summarised.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Related</h2>
        <ul className="mt-3 space-y-2">
          <li>
            <Link href="/peptides" className="link">
              What are peptides?
            </Link>
          </li>
          <li>
            <Link href="/science" className="link">
              All studies
            </Link>
          </li>
          <li>
            <Link href="/peptides/legal-status" className="link">
              Are peptides legal in the US?
            </Link>
          </li>
        </ul>
      </section>

      <p className="mt-10 text-sm text-muted">{SITE.disclaimer}</p>
    </article>
  );
}
