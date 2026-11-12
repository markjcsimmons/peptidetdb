import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/format";
import { PaperLink } from "@/components/paper-link";
import { JsonLd } from "@/components/json-ld";
import { Callout } from "@/components/ui";
import { StudyCard } from "@/components/study-parts";
import { STUDIES } from "@/lib/studies";
import { PeptideInGuides, PageKindLabel } from "@/components/guide-links";
import { PageContents } from "@/components/page-contents";
import { ProfileFactsPanel } from "@/components/profile-facts";

export const metadata: Metadata = {
  title: "GHK-Cu copper peptide: what the studies show",
  description:
    "What the evidence shows for GHK-Cu, the copper peptide sold for skin, hair and healing: two small human trials, reviews that say clinical evidence is thin, no injected-use trial found, and FDA's view of injectable GHK-Cu.",
  alternates: { canonical: "/peptides/ghk-cu" },
};

const REVIEWED = "2026-11-12";

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is GHK-Cu?",
    a: "GHK-Cu is the copper-bound form of GHK, a three-amino-acid peptide (glycine, histidine, lysine) that a 2015 review describes as found in human blood plasma and declining with age. It is sold as a cosmetic ingredient and, outside approved medicines, as an injectable.",
  },
  {
    q: "Does GHK-Cu work for wrinkles or skin ageing?",
    a: "Evidence is limited. One small randomised trial after laser resurfacing found no objective difference from standard care and only a higher patient rating, and reviews say most human studies are small and on facial creams. A 2026 review found only two randomised trials in total, one reporting reduced wrinkle volume and depth against controls, and says better-designed trials are needed.",
  },
  {
    q: "Does GHK-Cu help hair growth?",
    a: "We found only limited evidence. A 2026 systematic review of peptides for hair loss graded some GHK-containing products B, but its abstract gives no sample sizes, and a second review describes a small 18-person eyebrow study without saying which form of GHK-Cu was used.",
  },
  {
    q: "Does GHK-Cu heal wounds?",
    a: "It does in mice and cell studies, but the one human trial we found, in leg ulcers, found a tripeptide copper cream no better than placebo. A phase 2 wound study was still recruiting at the time of the 2026 review that mentions it.",
  },
  {
    q: "Is injectable GHK-Cu safe?",
    a: "We found no human safety study of injected GHK-Cu. FDA's compounding page says compounded injectable drugs containing GHK-Cu may pose a risk of immune reactions, cites aggregation and peptide-related impurities, and says human data are limited.",
  },
  {
    q: "Is GHK-Cu legal?",
    a: "Legal status depends on the form. FDA lists GHK-Cu (for injectable routes of administration) in its table of bulk drug substances nominated for compounding but withdrawn, current as of 22 April 2026. See our legal status page for the dated picture. Cosmetic creams are a separate regulatory category we did not review.",
  },
];

export default function GhkCuPage() {
  const studies = STUDIES.filter((s) => s.peptides.includes("ghk-cu")).sort((a, b) => b.year - a.year);
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
            { "@type": "ListItem", position: 3, name: "GHK-Cu", item: absoluteUrl("/peptides/ghk-cu") },
          ],
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / GHK-Cu
      </nav>
      <PageKindLabel path="/peptides/ghk-cu" />
      <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-5xl">GHK-Cu copper peptide: what the studies show</h1>
      <p className="mt-2 text-sm text-muted">Last reviewed {formatDate(REVIEWED)}.</p>

      <Callout label="Short answer" className="mt-6">
        <p className="max-w-prose text-lg [text-wrap:pretty]">
          GHK-Cu is a copper-bound three-amino-acid peptide promoted for skin, hair and healing. Decades of cell and animal work
          support effects on collagen, inflammation and blood vessels, but the human evidence we found is a few small trials with
          mixed results (nothing objective after laser resurfacing, no better than placebo for leg ulcers, and a wrinkle benefit
          reported by one review, whose trial we have not read) plus reviews that call the clinical literature thin. We found no trial of injected GHK-Cu, and FDA&rsquo;s compounding page flags a risk of immune reactions with injectable
          products.
        </p>
      </Callout>

      <ProfileFactsPanel path="/peptides/ghk-cu" reviewed={REVIEWED} />

      <PageContents />

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What it is</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          GHK is the tripeptide glycyl-L-histidyl-L-lysine; GHK-Cu is its copper-bound form. A 2015 review describes GHK as{" "}
          <PaperLink id="pickart-2015" via="pmc">
            found in human plasma and declining with age
          </PaperLink>
          , and a 2026 review explains that copper is a cofactor for the lysyl oxidase family of cross-linking enzymes (
          <PaperLink id="najafi-2026" via="pmc">
            Najafi 2026
          </PaperLink>
          ). It is used in cosmetic creams and serums and is also compounded as an injectable, the use FDA&rsquo;s page addresses. See{" "}
          <Link href="/peptides/how-peptides-work" className="link">
            how peptides work
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">What the studies show</h2>
        <ul className="mt-4 max-w-prose list-disc space-y-3 pl-6 text-soft">
          <li>
            <strong className="text-fg">Skin after laser resurfacing (2006).</strong> In 13 patients who completed a randomised
            trial, GHK-Cu products did not resolve redness sooner, and wrinkles and skin quality improved in all patients with{" "}
            <PaperLink id="miller-2006" via="doi">
              no objective difference between groups
            </PaperLink>
            ; patients using it rated their skin higher on a questionnaire.
          </li>
          <li>
            <strong className="text-fg">Leg ulcers (1992).</strong> In 86 patients with venous leg ulcers, a 0.4% tripeptide
            copper complex cream{" "}
            <PaperLink id="bishop-1992" via="doi">
              did no better than placebo
            </PaperLink>
            , while silver sulfadiazine cream reduced ulcer size.
          </li>
          <li>
            <strong className="text-fg">Aesthetic medicine reviews (2026).</strong> A systematic review found{" "}
            <PaperLink id="mokhtar-2026" via="doi">
              20 studies, 18 of them preclinical and two randomised trials
            </PaperLink>
            , with a reasonable biological basis but few well-designed clinical trials. It reports that one trial found GHK-Cu reduced wrinkle volume and depth compared with controls, and that patient satisfaction improved after laser resurfacing. Another review of{" "}
            <PaperLink id="najafi-2026" via="pmc">
              64 records
            </PaperLink>{" "}
            says human trials are mostly small, on facial creams, and that microneedle delivery has not been tested in an adequately
            powered randomised trial.
          </li>
          <li>
            <strong className="text-fg">Hair.</strong> A 2026 systematic review of peptides for hair loss gave some{" "}
            <PaperLink id="joerg-2026" via="doi">
              GHK-containing formulations a grade B
            </PaperLink>
            , but its abstract gives no sample sizes. A formulation-focused review mentions an 18-person split-face eyebrow study
            that reported positive cosmetic hair outcomes without defining the form of GHK-Cu or how much reached the skin (
            <PaperLink id="mateescu-2026-ghk" via="pmc">
              Mateescu 2026
            </PaperLink>
            ).
          </li>
          <li>
            <strong className="text-fg">Cells and animals.</strong> Liposomes carrying GHK-Cu{" "}
            <PaperLink id="wang-2017" via="doi">
              shortened scald-wound healing in mice
            </PaperLink>
            . A review by the peptide&rsquo;s long-time researchers lists many{" "}
            <PaperLink id="pickart-2018" via="pmc">
              protective and regenerative actions
            </PaperLink>
            , mostly from cell and animal work.
          </li>
        </ul>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          <strong className="text-fg">What this does not show.</strong> We have not read the trial behind the wrinkle-volume finding, so
          we cannot say how large or well controlled it was, and none of the studies we found tested an injection. Reviews say products sold as GHK-Cu differ in how
          the copper is bound and how stable they are, so one product&rsquo;s result may not carry over to another (
          <PaperLink id="mateescu-2026-ghk" via="pmc">
            Mateescu 2026
          </PaperLink>
          ). One review states that about 35% of the GHK-Cu primary papers include the peptide&rsquo;s original isolator as an author,
          which limits how independent the evidence base is, and a registered phase 2 wound trial had no results at the time of the
          same review. See the{" "}
          <Link href="/science/topics/skin" className="link">
            skin evidence
          </Link>{" "}
          and{" "}
          <Link href="/science/topics/hair" className="link">
            hair evidence
          </Link>
          , and our rankings of{" "}
          <Link href="/peptides/best-peptides-for-skin" className="link">
            peptides for skin
          </Link>{" "}
          and{" "}
          <Link href="/peptides/peptides-for-hair-growth" className="link">
            hair growth
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Safety</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          We found no human safety study of injected GHK-Cu. Sports-medicine reviews say rigorous human safety data are scarce
          for the unapproved peptides sold for recovery, a group that includes GHK-Cu (
          <PaperLink id="mendias-2026" via="doi">
            Mendias 2026
          </PaperLink>
          ;{" "}
          <PaperLink id="tewari-2026" via="doi">
            Tewari 2026
          </PaperLink>
          ). Because products differ in how the copper is bound, a purity and identity report matters; see{" "}
          <Link href="/peptides/how-to-read-a-peptide-coa" className="link">
            how to read a peptide COA
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Legal status</h2>
        <p className="mt-4 max-w-prose text-soft [text-wrap:pretty]">
          FDA&rsquo;s compounding page (current as of 22 April 2026 when we read it) lists{" "}
          <a
            href="https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks"
            className="link"
          >
            GHK-Cu &ldquo;for injectable routes of administration&rdquo;
          </a>{" "}
          in its table of bulk drug substances nominated for compounding but withdrawn by the nominators. It says compounded
          injectable drugs containing GHK-Cu may pose a risk of immunogenicity, citing aggregation and peptide-related impurities,
          and that human data are limited. Creams sold as cosmetics are a separate regulatory category that we did not review. The
          dated timeline, including the 2026 advisory committee and the HHS draft policy of 30 October 2026, is on the{" "}
          <Link href="/peptides/legal-status" className="link">
            legal status page
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold leading-[1.15]">Studies behind this page</h2>
        <div className="mt-6 grid gap-5">
          {studies.map((s) => (
            <StudyCard key={s.id} study={s} />
          ))}
        </div>
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

      <PeptideInGuides peptide="ghk-cu" />

      <p className="mt-10 text-sm text-muted">
        {SITE.disclaimer} Last reviewed {formatDate(REVIEWED)}.
      </p>
    </article>
  );
}
