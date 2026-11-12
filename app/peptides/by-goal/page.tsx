import type { Metadata } from "next";
import Link from "next/link";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { SITE } from "@/lib/site";
import { absoluteUrl } from "@/lib/format";
import { JsonLd } from "@/components/json-ld";
import { GoalTile } from "@/components/guide-links";
import { TopicCard } from "@/components/topic-card";
import { MeterLegend } from "@/components/evidence-meter";
import { GOALS, GUIDES, KIND_LABEL, guideFor, topicsWithoutGoal, type GuideKind } from "@/lib/guides";
import { TOPIC_SLUGS } from "@/lib/topics";

export const metadata: Metadata = {
  title: "Peptides by goal, ranked by the evidence",
  description:
    "Skin, hair, joints, muscle, weight, sleep, gut, women's and men's health: what the human studies show for peptides, goal by goal, with the best and least-supported option for each.",
  alternates: { canonical: "/peptides/by-goal" },
};

/** Fails the build if a page under app/peptides/ is missing from lib/guides.ts, or a registered path has no page. */
function checkRegistry() {
  const dirs = readdirSync(join(process.cwd(), "app/peptides"), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => `/peptides/${d.name}`)
    .filter((p) => p !== "/peptides/by-goal");
  const registered = new Set(GUIDES.map((g) => g.path));
  const missing = dirs.filter((p) => !registered.has(p));
  const extra = [...registered].filter((p) => !dirs.includes(p));
  if (missing.length || extra.length) {
    throw new Error(
      `lib/guides.ts is out of date. Not registered: ${missing.join(", ") || "none"}. Registered without a page: ${extra.join(", ") || "none"}.`,
    );
  }
}

const SECTIONS: { kind: GuideKind; title: string; intro: string }[] = [
  { kind: "profile", title: "Peptide profiles", intro: "One peptide at a time: every study we summarised, safety and legal status." },
  { kind: "check", title: "Checking a product", intro: "What brands publish about their testing. Not a product grade." },
  { kind: "explainer", title: "Background", intro: "What peptides are, how they work and how to read the evidence." },
];

export default function ByGoalPage() {
  checkRegistry();
  const other = topicsWithoutGoal(TOPIC_SLUGS);

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: SITE.name, item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "What are peptides?", item: absoluteUrl("/peptides") },
            { "@type": "ListItem", position: 3, name: "By goal", item: absoluteUrl("/peptides/by-goal") },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Peptides by goal",
          itemListElement: GOALS.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: guideFor(g.guide).title,
            url: absoluteUrl(g.guide),
          })),
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/peptides" className="link">
          What are peptides?
        </Link>{" "}
        / By goal
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">Peptides by goal</h1>
      <p className="mt-4 max-w-prose text-lg text-soft [text-wrap:pretty]">
        Pick what you want to know about. Each page ranks peptide types, not products, by how strong the human evidence
        is, and says what the studies do not show. The ratings are the same on every page and come from our{" "}
        <Link href="/science" className="link">
          study summaries
        </Link>
        . A rating measures the evidence, not the size of a benefit or whether something is safe. Nobody pays for a place on
        these pages, and there are no affiliate links.
      </p>
      <details className="mt-5 max-w-3xl rounded-tile border border-line bg-card">
        <summary className="flex min-h-11 cursor-pointer items-center px-4 text-sm font-medium">How to read the meters</summary>
        <div className="px-4 pb-4">
          <MeterLegend />
        </div>
      </details>

      <section className="mt-12" aria-labelledby="goals">
        <h2 id="goals" className="text-3xl font-bold leading-[1.15]">
          Goals
        </h2>
        <p className="mt-2 max-w-prose text-sm text-muted">
          Each card shows the best and the least-supported option on that page, never only the best.
        </p>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GOALS.map((g) => (
            <GoalTile key={g.id} goal={g} />
          ))}
        </ul>
      </section>

      {other.length > 0 && (
        <section className="mt-16" aria-labelledby="no-list">
          <h2 id="no-list" className="text-2xl font-bold">
            Evidence pages without a ranked list yet
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {other.map((t) => (
              <TopicCard key={t} slug={t} compact />
            ))}
          </div>
        </section>
      )}

      {SECTIONS.map((s) => {
        const guides = GUIDES.filter((g) => g.kind === s.kind);
        return (
          <section key={s.kind} className="mt-16" aria-labelledby={`sec-${s.kind}`}>
            <h2 id={`sec-${s.kind}`} className="text-2xl font-bold">
              {s.title}
            </h2>
            <p className="mt-2 max-w-prose text-sm text-muted">{s.intro}</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((g) => (
                <li key={g.path}>
                  <Link
                    href={g.path}
                    className="flex h-full min-h-14 flex-col rounded-tile border border-line bg-card px-[18px] py-3 hover:border-accent"
                  >
                    <span className="font-medium">{g.title}</span>
                    <span className="sr-only"> — </span>
                    <span className="mt-1 text-sm text-muted">{g.blurb}</span>
                    <span className="sr-only"> ({KIND_LABEL[g.kind]})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <p className="mt-14 max-w-prose text-sm text-muted">{SITE.disclaimer}</p>
    </div>
  );
}
