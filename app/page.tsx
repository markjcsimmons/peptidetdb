import Link from "next/link";
import { SITE } from "@/lib/site";
import { STUDIES } from "@/lib/studies";
import { TOPICS, TOPIC_SLUGS } from "@/lib/topics";
import { JsonLd } from "@/components/json-ld";

export default function HomePage() {
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          alternateName: SITE.fullName,
          url: SITE.url,
          description: SITE.description,
        }}
      />
      <section className="max-w-prose">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-accent">The {SITE.fullName}</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{SITE.tagline}</h1>
        <p className="mt-4 text-lg text-muted">{SITE.description}</p>
        <p className="mt-6">
          <Link
            href="/science"
            className="inline-block rounded-lg bg-accent px-5 py-2.5 font-medium text-bg hover:opacity-90"
          >
            Browse {STUDIES.length} studies
          </Link>
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold">Start with a topic</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {TOPIC_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={`/science/topics/${slug}`}
              className="rounded-xl border border-line bg-card p-5 hover:border-accent"
            >
              <h3 className="font-semibold">{TOPICS[slug].title}</h3>
              <p className="mt-2 text-sm text-muted">{TOPICS[slug].intro}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 max-w-prose">
        <h2 className="text-xl font-semibold">How to read a peptide study</h2>
        <p className="mt-3 text-muted">
          Not all studies are equal. A trial that compares people who took a peptide with people who did not tells
          you far more than a report with no comparison group, and a result in animals often does not carry over to
          people. Every summary here says what was tested, what was found, what the study cannot show, and who paid
          for it.{" "}
          <Link href="/science/methodology" className="link">
            Read the methodology
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
