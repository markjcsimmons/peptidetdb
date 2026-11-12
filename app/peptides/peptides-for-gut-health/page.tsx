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
  title: "Peptides for gut health: ranked by the evidence",
  description:
    "Do peptides help your gut? Linaclotide and plecanatide, GLP-2 drugs, larazotide, protein hydrolysates, BPC-157, KPV and collagen, ranked by the strength of the human studies, with what each does not show.",
  alternates: { canonical: "/peptides/peptides-for-gut-health" },
};

const REVIEWED = "2026-11-12";

type Option = {
  name: string;
  level: Level;
  /** Rating on the gut topic page this entry mirrors (checked at build time below). */
  topicSubject: string;
  shows: React.ReactNode;
  notShown: React.ReactNode;
};

const OPTIONS: Option[] = [
  {
    name: "Linaclotide and plecanatide (prescription) for IBS with constipation and chronic constipation",
    level: "consistent",
    topicSubject: "Linaclotide and plecanatide (prescription) for IBS with constipation and chronic constipation",
    shows: (
      <>
        Both are prescription drugs taken by mouth. A meta-analysis of three placebo-controlled trials in 1,773 people with
        irritable bowel syndrome with constipation (IBS-C) found fewer non-responders on linaclotide than on placebo by the FDA
        endpoint (risk ratio 0.80) and by adequate symptom relief (0.73) (
        <PaperLink id="atluri-2014" via="doi">
          Atluri 2014
        </PaperLink>
        ). A 2026 meta-analysis of seven trials in 6,319 people found plecanatide gave about 1.4 more spontaneous bowel movements a
        week in chronic constipation, and better stool consistency in both conditions (
        <PaperLink id="akram-2026" via="doi">
          Akram 2026
        </PaperLink>
        ). Pooled trial data also found less bloating and abdominal pain than placebo in people with IBS-C and moderate-to-severe bloating (
        <PaperLink id="brenner-2024" via="pmc">
          Brenner 2024
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        Diarrhoea is the main side effect: it was about four times as likely with plecanatide, and diarrhoea severe enough to stop
        linaclotide was far more common than on placebo. A network meta-analysis of 33 trials in 17,214 people with chronic
        constipation found that{" "}
        <PaperLink id="luthra-2019" via="doi">
          other drugs, such as stimulant laxatives and prucalopride, ranked first
        </PaperLink>
        , so the peptide drugs are one option among several, not the strongest. The bloating analysis was done after the trials
        ended and was paid for by Salix Pharmaceuticals, whose employees are among its authors. These are prescription medicines for
        diagnosed conditions; this page is not a recommendation to use them.
      </>
    ),
  },
  {
    name: "GLP-2 drugs (teduglutide and others) for short bowel syndrome",
    level: "consistent",
    topicSubject: "GLP-2 drugs (teduglutide and others) for short bowel syndrome",
    shows: (
      <>
        A 2024 network meta-analysis of 23 trials in 843 patients found teduglutide raised blood citrulline, a marker of working
        gut lining, at all three doses against controls, with no significant extra safety problems (
        <PaperLink id="sabra-2024" via="doi">
          Sabra 2024
        </PaperLink>
        ). A 2022 meta-analysis of ten studies in adults who depended on intravenous nutrition found 64% had cut it by at least 20%
        at 6 months and 82% at 2 years or more (
        <PaperLink id="bioletto-2022" via="pmc">
          Bioletto 2022
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        Short bowel syndrome is a rare condition in which much of the gut has been removed, managed by specialists. Few people came
        off intravenous nutrition altogether (11% at 6 months, 21% at 2 years or more), the trials are small, and the pooled rates
        come from treated patients, so they do not show how many would have improved without the drug. A bloodstream infection
        linked to the intravenous line was the most common adverse event. These findings do not apply to ordinary digestive
        complaints.
      </>
    ),
  },
  {
    name: "Larazotide acetate (investigational) for coeliac disease",
    level: "mixed",
    topicSubject: "Larazotide acetate (investigational) for coeliac disease",
    shows: (
      <>
        A meta-analysis of four trials in 626 people with coeliac disease found larazotide did not change a lab test of gut
        leakiness. In people eating gluten as a challenge, symptom scores improved more than with placebo and gluten-related
        diarrhoea was reduced (
        <PaperLink id="hoilat-2022" via="doi">
          Hoilat 2022
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        People who followed a gluten-free diet saw no symptom difference, and eating gluten on purpose is an artificial setting. The
        authors say more trials are needed. Patient-group and trade press reported that a phase 3 trial was discontinued after an
        interim analysis; we found no regulatory approval. It is not a supplement, and it is not the same as
        the &ldquo;gut barrier&rdquo; products sold online.
      </>
    ),
  },
  {
    name: "Fish and milk protein hydrolysates for IBS symptoms",
    level: "limited",
    topicSubject: "Fish and milk protein hydrolysates for IBS symptoms",
    shows: (
      <>
        In a 10-day crossover trial of about 41 people with functional gut disorders, a partly hydrolysed milk protein drink lowered
        IBS severity and daily symptom scores more than an ordinary drink; flatulence and heartburn fell only on the hydrolysed one (
        <PaperLink id="laatikainen-2020" via="pmc">
          Laatikainen 2020
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        That drink contained 50 g of protein, so it is not a peptide supplement. No blood or urine marker of inflammation or gut
        permeability differed, and employees of a dairy company are among the authors. The other trial went the other way: 2.5 g a
        day of cod protein hydrolysate for six weeks in 28 people with IBS did no better than placebo, and the placebo group improved
        more (
        <PaperLink id="dale-2019" via="pmc">
          Dale 2019
        </PaperLink>
        ). Both trials are small. Fish hydrolysates in general are covered in{" "}
        <Link href="/peptides/oral-marine-peptides" className="link">
          oral marine peptides
        </Link>
        .
      </>
    ),
  },
  {
    name: "BPC-157 for gut conditions (ulcers, colitis, fistulas)",
    level: "preclinical",
    topicSubject: "BPC-157 for gut conditions (ulcers, colitis, fistulas)",
    shows: (
      <>
        A 2024 review describes rat experiments in which BPC-157 was followed by healing of surgical joins in the gut and of
        fistulas (
        <PaperLink id="bajramagic-2024" via="pmc">
          Bajramagic 2024
        </PaperLink>
        ), and a 2012 review argues it may help in inflammatory bowel disease and mentions a drug candidate that reached clinical
        phase II (
        <PaperLink id="sikiric-2012" via="doi">
          Sikiric 2012
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        The two reviews share authors (Sikiric, Seiwerth and Sever), and neither gives numbers. The 2012
        abstract reports no phase II results and no participant count, and we found no controlled human trial of BPC-157 for a gut
        condition. A 2026 review of human evidence for BPC-157 overall found{" "}
        <PaperLink id="poolton-2026" via="doi">
          three uncontrolled studies in 30 people
        </PaperLink>
        . See the{" "}
        <Link href="/peptides/bpc-157" className="link">
          BPC-157 page
        </Link>
        .
      </>
    ),
  },
  {
    name: "KPV for colitis",
    level: "preclinical",
    topicSubject: "KPV for colitis",
    shows: (
      <>
        In human gut-cell lines and mice with chemically induced colitis, KPV lowered inflammation signals and, given in drinking
        water, reduced how often colitis developed (
        <PaperLink id="dalmasso-2008" via="pmc">
          Dalmasso 2008
        </PaperLink>
        ). A later mouse study found KPV prevented colitis-associated cancer in normal mice, but not in mice lacking the PepT1 transporter it uses (
        <PaperLink id="viennois-2016" via="doi">
          Viennois 2016
        </PaperLink>
        ).
      </>
    ),
    notShown: (
      <>
        Cells and mice only, with colitis induced by chemicals, so nothing here shows an effect in people. We found no human trial,
        although our searches are noisy because KPV also abbreviates other terms. See the{" "}
        <Link href="/peptides/kpv" className="link">
          KPV page
        </Link>
        .
      </>
    ),
  },
  {
    name: "Oral collagen peptides for gut health, bloating or gut barrier",
    level: "none",
    topicSubject: "Oral collagen peptides for gut health, bloating or gut barrier",
    shows: (
      <>
        Our PubMed searches on 12 November 2026 for human trials of collagen peptides with gut-health outcomes found none.
      </>
    ),
    notShown: (
      <>
        The searches returned mostly unrelated records, so a trial could be hiding in the noise, and not finding one is not a
        finding that collagen does nothing for the gut. Collagen&rsquo;s better-studied uses are in{" "}
        <Link href="/peptides/collagen-peptides" className="link">
          collagen peptides
        </Link>
        .
      </>
    ),
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Do peptides help with gut health?",
    a: "Some prescription peptide drugs do, for specific diagnoses: linaclotide and plecanatide for constipation with irritable bowel syndrome, and teduglutide for short bowel syndrome. For the peptides sold as gut-healing supplements or research chemicals, such as BPC-157 and KPV, we found only animal and cell studies and no controlled human trial.",
  },
  {
    q: "Does BPC-157 heal the gut?",
    a: "In rats, reviews describe healing of gut joins and fistulas. In people, we found no controlled trial for a gut condition. A 2012 review mentions a phase II programme but gives no results. BPC-157 is not an approved medicine.",
  },
  {
    q: "Do collagen peptides help the gut or gut lining?",
    a: "We found no human trial of collagen peptides for gut-health outcomes, though our searches were noisy and this is not proof that none exists.",
  },
  {
    q: "Do GLP-1 weight-loss drugs affect the gut?",
    a: "Yes. A 2025 meta-analysis of 55 placebo-controlled trials found GLP-1 drugs raised the risk of gallstones (about 2 more cases per 1,000 people) and probably of reflux (about 4 more per 1,000), and found little or no effect on other serious gut events such as pancreatitis. It did not report common side effects such as nausea.",
  },
  {
    q: "Are protein hydrolysates good for irritable bowel syndrome?",
    a: "The two small trials we found disagree. A partly hydrolysed milk protein drink lowered symptom scores in a 10-day crossover of about 41 people, while a low dose of cod protein hydrolysate did no better than placebo over six weeks in 28 people.",
  },
  {
    q: "Is larazotide available as a supplement?",
    a: "No. It is an investigational drug for coeliac disease that has been tested in trials. We found no regulatory approval, and it is not the same as the gut-barrier supplements sold online.",
  },
];

export default function PeptidesForGutHealthPage() {
  // The ratings on this page must match the gut topic page. A mismatch fails the build instead of publishing a contradiction.
  for (const o of OPTIONS) {
    const r = TOPICS.gut.ratings.find((x) => x.subject === o.topicSubject);
    if (!r || r.level !== o.level) {
      throw new Error(`peptides-for-gut-health: "${o.name}" does not match its rating "${o.topicSubject}" on the gut topic page`);
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
            { "@type": "ListItem", position: 3, name: "Peptides for gut health", item: absoluteUrl("/peptides/peptides-for-gut-health") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / Peptides for gut health
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">Peptides for gut health, ranked by the evidence</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          The peptides with the best human evidence for the gut are prescription drugs for specific diagnoses: linaclotide and
          plecanatide for constipation with irritable bowel syndrome, and teduglutide for short bowel syndrome. The peptides
          sold for &ldquo;gut healing&rdquo;, BPC-157 and KPV, have only animal and cell studies. Protein hydrolysates have two
          small trials that disagree, and we found no human trial of collagen peptides for the gut.
        </p>
      </Callout>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">How this ranking works</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          &ldquo;Gut health&rdquo; covers very different problems, so each entry names the condition it was tested for. The list is
          ordered by how strong the human evidence is, using the ratings on our{" "}
          <Link href="/science/topics/gut" className="link">
            gut health evidence page
          </Link>
          . It does not measure how big a benefit is, how safe something is, or whether one option beats another, because most
          studies do not compare them. Entries that share a rating are in an order that is our judgement: read them as ties. It
          ranks types of peptide, not products, and a prescription drug is not interchangeable with a supplement. Nobody paid for a
          place on this page, and there are no affiliate links.
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
          Not rated: GLP-1 weight-loss drugs, which affect the gut as a side effect. A 2025 meta-analysis of 55 placebo-controlled
          trials found they raised the risk of{" "}
          <PaperLink id="chiang-2025" via="doi">
            gallstones and reflux
          </PaperLink>{" "}
          and found little or no effect on other serious gut events, but it did not report nausea or vomiting; see{" "}
          <Link href="/peptides/for-weight-loss" className="link">
            peptides for weight loss
          </Link>
          . Not searched: other approved peptide drugs for the gut, inflammatory bowel disease trials, and probiotics, glutamine and
          colostrum, which are not peptides in the sense used here.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">If you are choosing</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-soft">
          <li>
            <strong className="text-fg">Ongoing digestive symptoms:</strong> constipation, bloating, blood in the stool and
            weight loss can have causes that need a clinician. None of the studies here compares a peptide with a doctor-led
            work-up.
          </li>
          <li>
            <strong className="text-fg">Prescription peptides:</strong> linaclotide, plecanatide and teduglutide are medicines
            with listed side effects, and a clinician decides whether they suit you.
          </li>
          <li>
            <strong className="text-fg">BPC-157 and KPV:</strong> these are not approved medicines, and the human evidence is
            absent for the gut. See the{" "}
            <Link href="/peptides/legal-status" className="link">
              legal status page
            </Link>{" "}
            and the safety rating on our{" "}
            <Link href="/science/topics/safety" className="link">
              safety page
            </Link>
            .
          </li>
          <li>
            <strong className="text-fg">A hydrolysate or collagen supplement:</strong> the trials tested specific products, and
            we do not recommend a dose. If a test report is offered, our{" "}
            <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
              COA guide
            </Link>{" "}
            explains how to read it.
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
            { href: "/science/topics/gut", label: "Full gut health evidence" },
            { href: "/peptides/bpc-157", label: "What the evidence says about BPC-157" },
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

      <RelatedGoals path="/peptides/peptides-for-gut-health" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
