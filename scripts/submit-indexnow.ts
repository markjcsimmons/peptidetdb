/**
 * Tells IndexNow-participating search engines (Bing, Yandex and others) that pages are new or changed.
 *
 *   npm run indexnow -- --all                       # every URL in the live sitemap
 *   npm run indexnow -- --url=/peptides,/about      # specific paths
 *   npm run indexnow -- --all --dry-run             # show what would be sent
 *
 * Run it AFTER a deploy is live: the search engine fetches the key file to check you own the site.
 * The key is the 32-hex-character file in public/ (e.g. public/<key>.txt); it is public by design.
 * Google does not use IndexNow; use Search Console for Google.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://peptidetdb.com").replace(/\/$/, "");
const host = new URL(SITE).host;

function findKey(): string {
  const dir = join(process.cwd(), "public");
  const file = readdirSync(dir).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
  if (!file) throw new Error("No IndexNow key file (32 hex characters + .txt) found in public/");
  const key = file.replace(/\.txt$/, "");
  if (readFileSync(join(dir, file), "utf8").trim() !== key) throw new Error(`public/${file} must contain exactly its own name's key`);
  return key;
}

async function sitemapUrls(): Promise<string[]> {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`Could not fetch ${SITE}/sitemap.xml: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function main() {
  const args = process.argv.slice(2);
  const dry = args.includes("--dry-run");
  const urlArg = args.find((a) => a.startsWith("--url="));
  let urls: string[];
  if (urlArg) {
    urls = urlArg
      .slice("--url=".length)
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => (p.startsWith("http") ? p : `${SITE}${p.startsWith("/") ? p : `/${p}`}`));
  } else if (args.includes("--all")) {
    urls = await sitemapUrls();
  } else {
    console.error("Usage: npm run indexnow -- --all | --url=/a,/b  [--dry-run]");
    process.exit(1);
  }
  const key = findKey();
  const body = { host, key, keyLocation: `${SITE}/${key}.txt`, urlList: urls };
  console.log(`${urls.length} URL(s) for ${host}`);
  if (dry) {
    console.log(JSON.stringify(body, null, 2));
    return;
  }
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  console.log(`IndexNow responded ${res.status} ${res.statusText}`);
  const text = await res.text();
  if (text) console.log(text);
  if (res.status !== 200 && res.status !== 202) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
