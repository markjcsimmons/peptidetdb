# PeptideTDB: the Peptide Transparency Database

Domain: peptidetdb.com. Stage 1 of the peptide knowledge base: plain-language summaries of the scientific studies on peptides,
each saying what was tested, what it found, what it cannot show, and who funded it. Static Next.js 15
site (App Router, TypeScript, Tailwind), no database.

The keyword plan behind it is in `peptide_keyword_workbook.xlsx`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 25 static pages
```

## Pages

| Route | What it is |
|---|---|
| `/` | Landing page: topics and how to read a study |
| `/science` | Hub: filter studies by topic, peptide and design |
| `/science/[id]` | One page per study (finding, caveat, funding, links, JSON-LD) |
| `/science/topics/[topic]` | Evidence by topic: hand-written verdicts, study table, coverage gaps |
| `/science/methodology` | How studies are summarised, checked and rated |
| `/llms.txt`, `/sitemap.xml`, `/robots.txt` | Machine-readable summaries for crawlers and AI engines |

## The study registry

Everything renders from `lib/studies.ts`. To add a study:

```bash
npm run study:fetch -- <pmid>      # prints identifiers and the abstract from PubMed
```

1. Read the abstract. Write `finding` and `caveat` in your own words, from the abstract only. Never paste it.
2. Copy identifiers from the script's output, never from memory or a paper's reference list.
3. Put anything an article claims that the abstract does not support in `unverified`.
4. Add the entry, then update the relevant topic verdict in `lib/topics.ts` if it changes.
5. Run the audit:

```bash
npm run study:audit                # checks first author, year, DOI and PMC ID against PubMed
```

The audit proves the identifiers point at the right paper. It cannot tell you whether a finding matches the paper.

## To do before publishing

- **Keep the disclosure true.** `SITE.disclosure` in `lib/site.ts` says the operator works for Pürblack, pays for
  the site personally and gets no funding or support from it. Update it first if that ever changes, and show it
  next to any page that names, links or grades a Pürblack product.
- Set `NEXT_PUBLIC_SITE_URL=https://peptidetdb.com` in production (see `.env.example`).
- If available, buy `peptidedb.com` and redirect it, since "TDB" is easy to mistype.
- Add studies of oral marine bioactive peptides: none are in the registry yet (see `/science/methodology`).
- Legal and regulatory status is not covered yet; write it from FDA and HHS primary sources and date-stamp it.
