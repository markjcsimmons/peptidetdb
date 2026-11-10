# PeptideTDB — Claude context

Handoff file. Read this first in a new session. Last updated 2026-11-10 (stage 1 push: thymosin studies, collagen cluster and COA guide; commit only when asked).

## What this is
**PeptideTDB** ("Peptide Transparency Database") at **https://peptidetdb.com**: a neutral, evidence-first knowledge base about peptides. Stage 1 (live): plain-language summaries of scientific studies, topic evidence verdicts, a legal-status page, trust pages. Stage 2 (NOT started): a product/brand grading section.

**Why it exists:** SEO + GEO (getting cited by AI engines) and, ultimately, qualified traffic to Pürblack (oral, marine-derived peptide supplements; see purblack.com/pages/peptides-quality-guide).

## Disclosure (non-negotiable)
The operator **works for Pürblack, pays for the site personally, and gets no funding or support from Pürblack.** The site is neutral and says so. Wording lives in `lib/site.ts` (`SITE.disclosure`); it appears in the footer, About, methodology, and must sit **next to any page that names, links or grades a Pürblack product**. Never build or write anything that hides the connection. If the relationship changes (Pürblack funds/hosts/reviews anything), update `SITE.disclosure` first. Recommended for stage 2 (not yet confirmed as policy): publish the grading rubric before grading any product, and grade Pürblack by the same rules as everyone.

## Hard rules from the user
- **Do not touch ShilajitDB** (`/Users/mark/Desktop/CURSOR:CLAUDE/ShilajitDB/`, a sibling site by the same operator). Read-only reference for patterns only. Its Bing/other accounts: don't change anything on them.
- Commit only when asked, but **always push to `main` right after committing** (standing rule from the user, 2026-11-09). A push to `main` deploys to production automatically.
- Never enter credentials. The user is signed in to Namecheap, Google Search Console, Bing and Vercel in Chrome (Bing's session lapsed once on 2026-11-09 and needed a re-sign-in); use Claude in Chrome for those. Don't try to solve Bing/Google bot challenges.

## Stack and deploy
- Next.js 15 (App Router) + TypeScript + Tailwind 3, fully static (no DB). `params` in dynamic routes is a Promise.
- GitHub: `github.com/markjcsimmons/peptidetdb` (branch `main`). Vercel project `peptidetdb` (scope `marks-projects-f563f86e`), connected to the repo: **push = deploy**. `NEXT_PUBLIC_SITE_URL=https://peptidetdb.com` is set in Vercel production.
- `www.peptidetdb.com` 308-redirects to the apex (`next.config.mjs`).
- Local preview: `.claude/launch.json` (gitignored) config `science-hub` on port 3123.
- **Do not run `next build` while `next dev` is running** (shared `.next`; causes "no direct app page entry found for /_not-found"). Stop the dev server first. Builds/tsc can be very slow when the Mac is overloaded.

## DNS (Namecheap, Advanced DNS) — do not delete these
A `@` → 76.76.21.21 · CNAME `www` → cname.vercel-dns.com · TXT `@` `google-site-verification=…` (GSC) · CNAME `a890d7c5…dae` → verify.bing.com (Bing). The locked SPF TXT belongs to Namecheap email forwarding.

## Search setup (done 2026-11-09)
- Google Search Console: **domain property** `sc-domain:peptidetdb.com`, verified; sitemap submitted (read OK 2026-11-09). Indexing requested for `/`, `/science`, `/peptides/legal-status`, `/peptides` (succeeded on retry), `/peptides/how-peptides-work`, `/peptides/oral-marine-peptides`; `/science/methodology` was already indexed. Reports said "processing, check in a day or so" on 2026-11-09. The inspect box in the GSC header is the way to request indexing (the `/inspect?id=` deep link 404s). **Not yet requested (2026-11-10):** `/science/topics/immune` (new topic; deployed 2026-11-10), and optionally the four new study pages (`/science/wolf-2011`, `cordero-1999`, `zhukova-2018`, `wang-2018`).
- Bing Webmaster Tools: `https://peptidetdb.com/` added and verified (CNAME). The first sitemap read errored ("page not accessible") although the file was fine; **re-submitting fixed it: Success, 40 URLs, 0 errors** (2026-11-09). Same Bing account holds other sites; leave them alone.
- IndexNow: key file `public/5b2ad43dfaab38cdd4731aa79c07e54a.txt`; run `npm run indexnow -- --all` (or `--url=/a,/b`) **after a deploy is live**. Last run 2026-11-10 (after the thymic-peptides deploy, commit 150237c): 45 URLs, 200 OK. Bing's IndexNow page shows no history, so judge by Site Explorer/URL Inspection instead. Google doesn't use IndexNow.
- Vercel Web Analytics: enabled on the Vercel project 2026-11-09 (the plan-included tier; overage is $30 per extra 1M events; not the $10/mo "Plus"). `<Analytics />` from `@vercel/analytics/next` is in `app/layout.tsx`. It is cookie-free and only reports from Vercel deployments, so check the Analytics tab after deploy.

## Architecture (everything renders from `lib/`)
| Path | Role |
|---|---|
| `lib/studies.ts` | **Study registry** (40 studies). Types, labels, `STUDIES`. |
| `lib/topics.ts` | Hand-written evidence verdicts per topic (skin, muscle, joints, blood-pressure, brain, immune, safety) with `reviewedOn`. Levels incl. `none` = "No human trials found". |
| `lib/legal-status.ts` | Timeline/table/sources for the legal page. Update `LEGAL_REVIEWED` with it. |
| `lib/site.ts` | Name, disclosure, disclaimer, nav, footer links, `contactEmail` (null = unset; hides contact sections). |
| `lib/corrections.ts`, `lib/glossary.ts`, `lib/studies-export.ts` | Corrections log (empty), glossary, CSV/JSON export. |
| `app/` | `/` · `/peptides` (pillar) · `/peptides/how-peptides-work` · `/peptides/legal-status` · `/peptides/oral-marine-peptides` · `/peptides/what-do-peptides-do` · `/peptides/are-peptides-steroids` · `/peptides/collagen-peptides-benefits` · `/peptides/collagen-peptides-side-effects` · `/peptides/marine-vs-bovine-collagen` · `/peptides/how-to-read-a-peptide-coa` · `/science` (hub) · `/science/[id]` · `/science/topics/[topic]` · `/science/methodology` · `/about` `/editorial-policy` `/corrections` `/glossary` `/data` (+`studies.csv`, `studies.json`) · `/llms.txt` · sitemap/robots |
| `scripts/` | `study:fetch -- <pmid>` (PubMed record + abstract), `study:audit` (checks every study vs PubMed), `indexnow` |

## UI conventions (redesigned 2026-11-09)
- Fonts via `next/font` (Inter body, Space Grotesk headings). Colour tokens are CSS variables in `app/globals.css` with light, system-dark and a manual toggle (`html[data-theme]`, set before paint in `app/layout.tsx`). **Dark values are written twice (media query + attribute): change both.** Use the Tailwind tokens (`bg-card`, `text-soft`, `accent`, `warn`…), never raw hex in pages.
- Scales (in `tailwind.config.js`): Tailwind default type sizes plus `text-caption`; radii `rounded-tile` 12 / `rounded-card` 20 / `rounded-panel` 28. No arbitrary `text-[..px]` or `rounded-[..]`.
- Shared pieces in `components/`: `ui.tsx` (`Pill`, `Callout`, `SectionHead`, `CARD`), `topic-card.tsx`, `evidence-meter.tsx`, `timeline.tsx`, `size-scale.tsx`, `evidence-rung.tsx`, `beads.tsx`, `diagrams.tsx`. Don't reintroduce the left-border callout; use `Callout`.
- **Evidence meter rules (trust-critical):** the 5th segment is always empty (reserved for large, independent, replicated trials; nothing is rated that high); "Mixed" and "Limited" share a step; topic cards show best AND least-supported ratings; "Not yet assessed" is never shown as weakest; the **safety** topic (`measures: "safety"`) is words only, never a meter.
- Accessibility baseline: skip link + `<main id="main">`, one visible `:focus-visible` ring, standalone links use `.link-solo` (44px target), no colour-only meaning. Print stylesheet and SVG favicon/OG image (`app/icon.svg`, `app/opengraph-image.tsx`, `app/favicon.ico/route.tsx`) exist.
- The disclosure shows on the homepage hero and footer only (not repeated in the FAQ/trust strip); it must still sit next to any page that names a Pürblack product (e.g. `/peptides/oral-marine-peptides`).

## Rules for adding or editing a study
1. `npm run study:fetch -- <pmid>`; **read the abstract**; write `finding` and `caveat` **in your own words, from the abstract only** (never paste).
2. Identifiers (PMID/PMCID/DOI) from that script, **never from memory or a record's reference list** (a past bug mixed in other papers' IDs). Authors must be the full PubMed list.
3. `funding` = what the record states (COI/grants). If the record says nothing, omit it (page says "not stated"). Don't say "maker"/"supplier" unless the record does.
4. Anything claimed about a paper that the abstract doesn't support → `unverified`.
5. Update the relevant topic verdict in `lib/topics.ts`, run `npm run study:audit` (must be clean), then build.
6. Cite papers in pages with `<PaperLink id="…" via="pmc|doi|pubmed" />` (unknown id fails the build).
- Metadata titles: keep the page's own part ≤52 chars (Bing limit incl. " | PeptideTDB").
- Legal/regulatory content: primary sources (FDA, HHS, Federal Register), dated, news labelled as news; never call something legal/illegal without a source that says so.
- "No human trials found" means *our PubMed search found none*; say so, never "none exists".

## Content status (2026-11-10)
40 studies across 7 topics (added 2026-11-10: Bassila 2026 collagen skin SR with tolerability, Ueno 2020 fish-collagen anaphylaxis case, Kobayashi 2016 fish-collagen allergen heat stability, Moiz 2026 injectable-peptide dangers review; new safety ratings for oral collagen and fish allergy): thymic peptides (14: also hepatitis B Chen 2022 / Peng 2020 / Kim 2012, COPD Cao 2024, pancreatitis meta-analysis Tian 2025; injected thymosin alpha-1 in hospital patients added 2026-11-10: Wu 2025 TESTS sepsis phase 3, null; Wu 2013 ETASS, borderline; Ke 2022 pancreatitis, null; Soeroto 2023 COVID meta-analysis; Dinetz 2024 advocacy-style review; earlier four: Wolf 2011 Cochrane review in cancer patients = the only human evidence; Cordero 1999 review; Zhukova 2018 Thymalin in rats; Wang 2018 Tα1-Fc in mice; written 2026-11-09, live since 2026-11-10 with the new `immune` topic), oral collagen (5), BPC-157/injectable reviews and pilots (7), oral marine peptides (10: Evans 2021, Hwang 2026, Kawasaki 2000, Zhu 2010, Oliveira 2020, Eckert 2024, Chataigner 2026, Mjøs 2019, Cordeiro 2020, Oddoux 2022). Key finding: oral marine peptides have limited human evidence (skin best; BP, sleep/memory, muscle small/mixed; 4 of 10 have industry ties) and **no human trials found for joints/tendons, immune function or vision**. Legal page reflects the 2026 FDA picture: Category 2 page (as of 22 Apr 2026), PCAC meeting 23–24 Jul 2026 recommended 6 of 7 peptides for the 503A bulks list (non-binding; FDA staff opposed); no final FDA action found as of 9 Nov.

## Keyword plan
`peptide_keyword_workbook.xlsx` (repo root): 144 keywords (Semrush rounds 1–2, US), 63 proposed pages, waves by KD, priority scores (editable Inputs sheet). Built 2026-11-10: `what do peptides do`, `are peptides steroids`, collagen benefits, side effects, marine vs bovine, and the peptide COA guide. Not built: `/peptides/collagen-peptides` (135k, KD 55, wave 3 pillar), `peptides-vs-collagen` (390, folded into benefits FAQ), `collagen-peptides-heavy-metals` (needs data), `third-party-testing` (folded into COA guide), `peptides for muscle growth` (40k, KD 40), injectable profile pages (start with selank, KPV).

## Open items / decisions
- **HHS enforcement-discretion policy not summarised**: `hhs.gov/…/hhs-503a-peptide-enforcement-discretion-policy-appendix-b.pdf` returns 403 to bots. User can save the PDF; then read and add to the legal page.
- Legal page goes stale: recheck FDA's Category 2 page, the PCAC meeting page and the Federal Register for any final action.
- Decide whether to disclose **AI-assisted drafting** (pages say summaries are written from abstracts, not by whom).
- **Editorial policy commitments are drafts** (include studies whatever they found; public corrections; no products graded). Confirm with the user.
- No contact email yet (Namecheap email forwarding could provide `hello@peptidetdb.com`); set `SITE.contactEmail`.
- **Operator-supplied files not added (reviewed 2026-11-09, folders under `~/Desktop/PURBLACK/Peptides/`):** the "IPH" cartilage/vascular/muscle set (IPH-AEN, -AVN, -AGAA: Danish Scientific Journal 2019, Scientific Discussion #33, Österreichisches Multiscience Journal #19, a Science-SD paper whose authors include Ideal Pharma Peptide GmbH staff, plus Pages drafts). No PMIDs, nothing in PubMed under the journals or product names, clinical sections use patients' own baseline as "control" with no placebo/blinding stated, so they fail the PubMed-verification rule. Ask whether IPH is linked to Pürblack before writing about them (disclosure). Also not added: the "Retina and Peptides" analytical review (unsigned; head of group "Andrei Ilnitski" looks like an author on the IPH-AGAA paper), and consumer/clinic pages on thymus extracts (WebMD, Kaiser, Port Moody, German Society for Thymus Therapy, NAVC proceeding). Candidate for a future vision topic: Cervia 2019, J Clin Med (PMID 31374938), a review the retina document relies on.
- Immune topic gaps (mostly done 2026-11-10): thymosin alpha-1 sepsis, pancreatitis, COVID, COPD and hepatitis B are summarised. Still unsummarised: other hepatitis B trials (41887933, 30063860), other COPD trials (26250523), vaccine response in the elderly (17600281), plus the 2023 ANP post-hoc and HCV/melanoma trials. The rating for infection prevention, allergies, vaccine response and healthy adults stays `unassessed`.
- COA guide: the HPLC/MS/net-peptide-content explanations are standard analytical chemistry with no primary source on the page (it says so). Primary sources fetched: 21 CFR 111.75 (Cornell LII) and Erckes 2025 (TFA counterions). ISO/IEC 17025 pages (iso.org, ANAB) returned 403 to bots; the accreditation sentence is unsourced. If the user can save a pharmacopeia/ISO page, add it. No study of contaminants in collagen supplements was found by PubMed (searched 2026-11-10).
- Marine vs bovine page states no head-to-head human trial was found in PubMed (searched 2026-11-10); recheck periodically. Marine pages carry the Pürblack disclosure via `components/disclosure-note.tsx`.
- Stage 2 product grading: rubric first (see Disclosure).
- Ideas: claim-checker tool, COA checklist, dose comparer, weekly PubMed study monitor (human review before publishing), regulatory tracker, a weight-loss/GLP-1 topic page (big search interest; needs studies fetched first), dark-mode and print polish checks.

## Environment notes
- Default `python3` (3.8) lacks openpyxl; `pip install --user openpyxl` was done; `/usr/bin/python3` is 3.9.
- macOS has no `timeout` command. Foreground `sleep` is blocked; use bounded loops.
- Commit trailer: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.
