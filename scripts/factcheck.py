#!/usr/bin/env python3
"""
Fact-check helper (run: python3 scripts/factcheck.py). Two mechanical checks; neither replaces reading.

1. Studies: every number in a study's population/design/dose/duration/finding/caveat must appear in its
   PubMed abstract. Flags spelled-out counts ("Twenty-two"), derived totals and roundings too, so read
   each flag; it is a prompt to look, not proof of an error.
2. Pages: every number on a page must appear somewhere in the abstracts, studies, topics or legal data.

It does not check qualitative claims (what a study "found"), which still need a human read of the abstract.
Uses only the standard library and the public PubMed E-utilities.
"""
import glob
import html
import json
import re
import tempfile
import time
import urllib.request
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/"
CACHE = os.path.join(tempfile.gettempdir(), "peptidetdb_abstracts.json")


def norm(t):
    t = html.unescape(t)
    for a, b in (("−", "-"), ("–", "-"), ("·", "."), (" ", ""), ("\xa0", " ")):
        t = t.replace(a, b)
    return re.sub(r"(?<=\d)[,\s](?=\d{3}\b)", "", t)


def studies():
    s = open(ROOT + "lib/studies.ts").read()
    for b in s.split('\n  {\n    id: "')[1:]:
        b = b.split("\n  },\n")[0]
        yield b.split('"')[0], re.search(r'pmid: "(\d+)"', b).group(1), b


def abstracts(ids):
    if os.path.exists(CACHE):
        cached = json.load(open(CACHE))
    else:
        cached = {}
    need = [i for i in ids if i not in cached]
    for k in range(0, len(need), 40):
        url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&id=" + ",".join(need[k : k + 40])
        x = urllib.request.urlopen(url, timeout=60).read().decode("utf8")
        for art in x.split("<PubmedArticle>")[1:]:
            pm = re.search(r"<PMID[^>]*>(\d+)</PMID>", art).group(1)
            parts = re.findall(r"<AbstractText[^>]*>(.*?)</AbstractText>", art, flags=re.S)
            cached[pm] = norm(re.sub(r"<[^>]+>", "", " ".join(parts)))
        time.sleep(0.4)
    json.dump(cached, open(CACHE, "w"))
    return cached


def nums(t):
    return set(re.findall(r"\d+(?:\.\d+)?", t))


def main():
    entries = list(studies())
    A = abstracts([pm for _, pm, _ in entries])
    print("== Studies: numbers not found in the abstract")
    for id_, pm, b in entries:
        own = ""
        for f in ("population", "design", "dose", "duration", "finding", "caveat"):
            m = re.search(f + r':\s*\n?\s*"((?:[^"\\]|\\.)*)"', b)
            if m:
                own += " " + m.group(1)
        own = re.sub(r"\b(19|20)\d\d\b", "", norm(own))
        missing = [n for n in sorted(nums(own)) if n not in nums(A[pm]) and not (n.isdigit() and int(n) <= 12)]
        if missing:
            print("  ", id_, pm, missing)

    corpus = " ".join(A.values())
    for name in ("lib/studies.ts", "lib/legal-status.ts", "lib/topics.ts"):
        corpus += " " + norm(open(ROOT + name).read())
    known = nums(corpus)
    print("== Pages: numbers not found anywhere in the sources")
    for f in sorted(glob.glob(ROOT + "app/**/page.tsx", recursive=True)):
        src = open(f).read()
        for pat in (r"^import .*$", r'className="[^"]*"', r"https?://\S+", r'href="[^"]*"', r'id="[^"]*"', r'via="[^"]*"'):
            src = re.sub(pat, "", src, flags=re.M)
        t = re.sub(r"\b(19|20)\d\d\b", "", norm(src))
        for m in re.finditer(r"(?<![\w.-])\d+(?:\.\d+)?", t):
            n = m.group(0)
            if n in known or (n.isdigit() and int(n) <= 12):
                continue
            print("  ", f.replace(ROOT + "app/", ""), n, "|", t[max(0, m.start() - 40) : m.start() + 30].replace("\n", " "))


if __name__ == "__main__":
    main()
