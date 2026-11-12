import Link from "next/link";
import { TOPICS } from "@/lib/topics";
import { STUDIES, TOPIC_LABEL } from "@/lib/studies";
import { PROFILE_FACTS } from "@/lib/profiles";
import { formatDate } from "@/lib/format";
import { RatingBadge } from "@/components/evidence-meter";
import { StudyMix } from "@/components/study-mix";
import { StudyTimeline } from "@/components/study-timeline";
import { FundingMix } from "@/components/evidence-charts";
import { PEPTIDE_STATUS, STATUS_LABEL } from "@/lib/peptide-status";
import { Term } from "@/components/term";
import { ROUTE_LABEL } from "@/components/ranked-list";
import { RouteIcon } from "@/components/route-icon";

function rating(topic: keyof typeof TOPICS, subject: string) {
  const r = TOPICS[topic].ratings.find((x) => x.subject === subject);
  if (!r) throw new Error(`lib/profiles.ts: "${subject}" is not a rating on the ${topic} topic page`);
  return r;
}

/** Wrap regulatory terms in a status line with their glossary pop-ups. */
const TERMS: [RegExp, string][] = [
  [/503A/, "503a"],
  [/503B/, "503b"],
  [/Category 2/, "category-2"],
];
function withTerms(text: string) {
  const re = new RegExp(`(${TERMS.map(([r]) => r.source).join("|")})`);
  return text.split(re).map((part, i) => {
    const hit = TERMS.find(([r]) => r.test(part) && part.match(r)?.[0] === part);
    return hit ? (
      <Term key={i} id={hit[1]}>
        {part}
      </Term>
    ) : (
      part
    );
  });
}

const DT = "text-caption font-semibold uppercase tracking-[0.06em] text-muted";

/** Short status label with its source, from lib/peptide-status.ts. */
export function StatusChip({ peptide }: { peptide: keyof typeof PEPTIDE_STATUS }) {
  const st = PEPTIDE_STATUS[peptide];
  const tone = st.kind === "approved" ? "bg-accent-soft text-accent" : st.kind === "fda-risk-list" ? "bg-warn-soft text-warn" : "bg-line text-fg";
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-caption font-semibold ${tone}`}>{STATUS_LABEL[st.kind]}</span>
  );
}

/** Quick-facts panel at the top of a peptide profile. Data in lib/profiles.ts; counts and ratings are computed. */
export function ProfileFactsPanel({ path, reviewed }: { path: string; reviewed: string }) {
  const f = PROFILE_FACTS[path];
  if (!f) throw new Error(`lib/profiles.ts: no facts for ${path}`);
  const studies = STUDIES.filter((s) => s.peptides.includes(f.peptide));
  const safety = f.safety ? rating("safety", f.safety) : undefined;

  return (
    <section aria-labelledby="facts" className="mt-8 rounded-card border border-line bg-card p-6 sm:p-7">
      <h2 id="facts" className="text-xl font-bold">
        Quick facts
      </h2>
      <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className={DT}>What it is</dt>
          <dd className="mt-1">{f.what}</dd>
        </div>
        {f.routes?.length ? (
          <div>
            <dt className={DT}>Forms discussed here</dt>
            <dd className="mt-2 flex flex-wrap gap-3">
              {f.routes.map((r) => (
                <span key={r} className="inline-flex items-center gap-1.5 text-sm font-medium">
                  <RouteIcon route={r} />
                  {ROUTE_LABEL[r]}
                </span>
              ))}
            </dd>
          </div>
        ) : null}
        <div className={f.routes?.length ? "" : "sm:col-span-2"}>
          <dt className={DT}>US status (as of {formatDate(reviewed)})</dt>
          <dd className="mt-1 text-sm text-soft">
            <span className="mb-1.5 block">
              <StatusChip peptide={f.peptide} />
              <span className="sr-only">. </span>
            </span>
            {withTerms(f.status)}{" "}
            <Link href="/peptides/legal-status" className="link">
              Dated sources
            </Link>
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className={DT}>Evidence ratings</dt>
          <dd className="mt-2">
            <ul className="grid gap-4 sm:grid-cols-2">
              {f.ratings.map(([topic, subject]) => {
                const r = rating(topic, subject);
                return (
                  <li key={`${topic}-${subject}`}>
                    <p className="text-caption font-semibold text-muted">{TOPIC_LABEL[topic]}</p>
                    <Link href={`/science/topics/${topic}`} className="link text-sm">
                      {subject}
                    </Link>
                    <div className="mt-1.5">
                      <RatingBadge level={r.level} measures="benefit" />
                    </div>
                  </li>
                );
              })}
            </ul>
          </dd>
        </div>
        {safety && (
          <div className="sm:col-span-2">
            <dt className={DT}>Safety data</dt>
            <dd className="mt-2 flex flex-wrap items-center gap-3 text-sm">
              <RatingBadge level={safety.level} measures="safety" />
              <Link href="/science/topics/safety" className="link">
                Safety evidence
              </Link>
            </dd>
          </div>
        )}
        <div className="sm:col-span-2">
          <dt className="sr-only">Studies summarised</dt>
          <dd>
            <StudyMix studies={studies} title={`The ${studies.length} studies we summarised`} />
            <div className="mt-6">
              <StudyTimeline studies={studies} />
            </div>
            <div className="mt-6">
              <FundingMix studies={studies} />
            </div>
          </dd>
        </div>
      </dl>
    </section>
  );
}
