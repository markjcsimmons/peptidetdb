# PeptideTDB — Claude context

Handoff file. Read this first in a new session. Last updated 2026-11-09.

## What this is
**PeptideTDB** ("Peptide Transparency Database") at **https://peptidetdb.com**: a neutral, evidence-first knowledge base about peptides. Stage 1 (live): plain-language summaries of scientific studies, topic evidence verdicts, a legal-status page, trust pages. Stage 2 (NOT started): a product/brand grading section.

**Why it exists:** SEO + GEO (getting cited by AI engines) and, ultimately, qualified traffic to Pürblack (oral, marine-derived peptide supplements; see purblack.com/pages/peptides-quality-guide).

## Disclosure (non-negotiable)
The operator **works for Pürblack, pays for the site personally, and gets no funding or support from Pürblack.** The site is neutral and says so. Wording lives in `lib/site.ts` (`SITE.disclosure`); it appears in the footer, About, methodology, and must sit **next to any page that names, links or grades a Pürblack product**. Never build or write anything that hides the connection. If the relationship changes (Pürblack funds/hosts/reviews anything), update `SITE.disclosure` first. Recommended for stage 2 (not yet confirmed as policy): publish the grading rubric before grading any product, and grade Pürblack by the same rules as everyone.

## Hard rules from the user
- **Do not touch ShilajitDB** (`/Users/mark/Desktop/CURSOR:CLAUDE/ShilajitDB/`, a sibling site by the same operator). Read-only reference for patterns only. Its Bing/other accounts: don't change anything on them.
- Commit/push/deploy only when asked. A push to `main` deploys to production automatically.
- Never enter credentials. The user is signed in to Namecheap, Google Search Console and Bing in Chrome; use Claude in Chrome for those.

## Stack and deploy
- Next.js 15 (App Router) + TypeScript + Tailwind 3, fully static (no DB). `params` in dynamic routes is a Promise.
- GitHub: `github.com/markjcsimmons/peptidetdb` (branch `main`). Vercel project `peptidetdb` (scope `marks-projects-f563f86e`), connected to the repo: **push = deploy**. `NEXT_PUBLIC_SITE_URL=https://peptidetdb.com` is set in Vercel production.
- `www.peptidetdb.com` 308-redirects to the apex (`next.config.mjs`).
- Local preview: `.claude/launch.json` (gitignored) config `science-hub` on port 3123.
- **Do not run `next build` while `next dev` is running** (shared `.next`; causes "no direct app page entry found for /_not-found"). Stop the dev server first. Builds/tsc can be very slow when the Mac is overloaded.

## DNS (Namecheap, Advanced DNS) — do not delete these
A `@` → 76.76.21.21 · CNAME `www` → cname.vercel-dns.com · TXT `@` `google-site-verification=…` (GSC) · CNAME `a890d7c5…dae` → verify.bing.com (Bing). The locked SPF TXT belongs to Namecheap email forwarding.

## Search setup (done 2026-11-09)
- Google Search Console: **domain property** `sc-domain:peptidetdb.com`, verified; sitemap submitted. Indexing requested for `/`, `/science`, `/peptides/legal-status`. **`/peptides` request failed twice (Google-side error): retry.** Methodology and the newer pages not requested yet.
- Bing Webmaster Tools: `https://peptidetdb.com/` added and verified (CNAME); sitemap submitted. Same Bing account holds other sites; leave them alone.
- IndexNow: key file `public/5b2ad43dfaab38cdd4731aa79c07e54a.txt`; run `npm run indexnow -- --all` (or `--url=/a,/b`) **after a deploy is live**. Google doesn't use IndexNow.

## Architecture (everything renders from `lib/`)
| Path | Role |
|---|---|
| `lib/studies.ts` | **Study registry** (22 studies). Types, labels, `STUDIES`. |
| `lib/topics.ts` | Hand-written evidence verdicts per topic (skin, muscle, joints, blood-pressure, brain, safety) with `reviewedOn`. Levels incl. `none` = "No human trials found". |
| `lib/legal-status.ts` | Timeline/table/sources for the legal page. Update `LEGAL_REVIEWED` with it. |
| `lib/site.ts` | Name, disclosure, disclaimer, nav, footer links, `contactEmail` (null = unset; hides contact sections). |
| `lib/corrections.ts`, `lib/glossary.ts`, `lib/studies-export.ts` | Corrections log (empty), glossary, CSV/JSON export. |
| `app/` | `/` · `/peptides` (pillar) · `/peptides/legal-status` · `/peptides/oral-marine-peptides` · `/science` (hub) · `/science/[id]` · `/science/topics/[topic]` · `/science/methodology` · `/about` `/editorial-policy` `/corrections` `/glossary` `/data` (+`studies.csv`, `studies.json`) · `/llms.txt` · sitemap/robots |
| `scripts/` | `study:fetch -- <pmid>` (PubMed record + abstract), `study:audit` (checks every study vs PubMed), `indexnow` |

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

## Content status (2026-11-09)
22 studies: oral collagen (5), BPC-157/injectable reviews and pilots (7), oral marine peptides (10: Evans 2021, Hwang 2026, Kawasaki 2000, Zhu 2010, Oliveira 2020, Eckert 2024, Chataigner 2026, Mjøs 2019, Cordeiro 2020, Oddoux 2022). Key finding: oral marine peptides have limited human evidence (skin best; BP, sleep/memory, muscle small/mixed; 4 of 10 have industry ties) and **no human trials found for joints/tendons, immune function or vision**. Legal page reflects the 2026 FDA picture: Category 2 page (as of 22 Apr 2026), PCAC meeting 23–24 Jul 2026 recommended 6 of 7 peptides for the 503A bulks list (non-binding; FDA staff opposed); no final FDA action found as of 9 Nov.

## Keyword plan
`peptide_keyword_workbook.xlsx` (repo root): 144 keywords (Semrush rounds 1–2, US), 63 proposed pages, waves by KD, priority scores (editable Inputs sheet). Easy wins not yet built: `what do peptides do` (KD 7), `are peptides steroids` (12k), `peptides for muscle growth` (40k, KD 40), collagen cluster pages, injectable profile pages (start with selank, KPV), `peptide COA`/purity guide.

## Open items / decisions
- **HHS enforcement-discretion policy not summarised**: `hhs.gov/…/hhs-503a-peptide-enforcement-discretion-policy-appendix-b.pdf` returns 403 to bots. User can save the PDF; then read and add to the legal page.
- Legal page goes stale: recheck FDA's Category 2 page, the PCAC meeting page and the Federal Register for any final action.
- Decide whether to disclose **AI-assisted drafting** (pages say summaries are written from abstracts, not by whom).
- **Editorial policy commitments are drafts** (include studies whatever they found; public corrections; no products graded). Confirm with the user.
- No contact email yet (Namecheap email forwarding could provide `hello@peptidetdb.com`); set `SITE.contactEmail`.
- Stage 2 product grading: rubric first (see Disclosure).
- Ideas: claim-checker tool, COA checklist, dose comparer, weekly PubMed study monitor (human review before publishing), regulatory tracker, OG images, Vercel Analytics.

## Environment notes
- Default `python3` (3.8) lacks openpyxl; `pip install --user openpyxl` was done; `/usr/bin/python3` is 3.9.
- macOS has no `timeout` command. Foreground `sleep` is blocked; use bounded loops.
- Commit trailer: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.
