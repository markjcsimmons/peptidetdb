/**
 * Writes a markdown version of every page, for AI agents. Runs automatically after `next build` (npm "postbuild").
 *
 *   /peptides/bpc-157  ->  public/peptides/bpc-157.md   (served at /peptides/bpc-157.md)
 *   /                  ->  public/index.md              (served at /index.md)
 *   all pages joined   ->  public/llms-full.txt
 *
 * The markdown is converted from the HTML Next.js already prerendered (.next/server/app/**.html), so it cannot
 * drift from the live page. The sitemap is the list of pages: if any sitemap URL has no prerendered HTML or
 * converts to nothing, this script exits non-zero and the build fails. That is what guarantees "every page".
 *
 * Visual-only content (SVG diagrams, evidence meters) is kept as its aria-label text, so give such components
 * role="img" and a descriptive aria-label (it helps screen-reader users too). Decorative things use aria-hidden.
 *
 * Generated files are gitignored (public/**\/*.md, public/llms-full.txt); this script deletes stale ones first.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { parse, type HTMLElement } from "node-html-parser";
import { NodeHtmlMarkdown } from "node-html-markdown";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://peptidetdb.com").replace(/\/$/, "");
const ROOT = process.cwd();
const APP_DIR = join(ROOT, ".next", "server", "app");
const PUBLIC_DIR = join(ROOT, "public");

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function sitemapPaths(): string[] {
  const file = join(APP_DIR, "sitemap.xml.body");
  if (!existsSync(file)) throw new Error(`Prerendered sitemap not found at ${file}. Run \`next build\` first.`);
  const xml = readFileSync(file, "utf8");
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
    const u = new URL(m[1].trim());
    return u.pathname.length > 1 ? u.pathname.replace(/\/$/, "") : "/";
  });
  if (paths.length === 0) throw new Error("Sitemap contains no URLs");
  return paths;
}

const htmlFile = (path: string) => join(APP_DIR, path === "/" ? "index.html" : `${path}.html`);
const mdFile = (path: string) => join(PUBLIC_DIR, path === "/" ? "index.md" : `${path.slice(1)}.md`);

/** Pages deliberately not listed in llms.txt: the home page is the file's own subject, /data is covered by its CSV/JSON links. */
const LLMS_EXEMPT = new Set(["/", "/data"]);

const OPEN = "\uE000";
const CLOSE = "\uE001";

function clean(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

function toMarkdown(path: string, html: string, pages: Set<string>): string {
  const doc = parse(html);
  const title = clean(doc.querySelector("title")?.text ?? "");
  const description = clean(doc.querySelector('meta[name="description"]')?.getAttribute("content") ?? "");
  const main = doc.querySelector("main#main") ?? doc.querySelector("main");
  if (!main) throw new Error(`${path}: no <main> element`);

  // 1. Images and diagrams that carry meaning become their text label.
  //    A component can set data-md-text to say exactly what the markdown should read (used by the evidence meter).
  //    Brackets are written as private-use markers and turned into real [ ] after conversion, so they are not escaped.
  for (const el of main.querySelectorAll('[role="img"]')) {
    const custom = clean(el.getAttribute("data-md-text") ?? "");
    const label = clean(el.getAttribute("aria-label") ?? "");
    el.replaceWith(custom ? `${custom} ` : label ? `${OPEN}${label}${CLOSE} ` : "");
  }
  // 1b. Rows of chips (flex-wrap containers holding only spans/links) read as a comma-separated list.
  for (const row of main.querySelectorAll("[class*='flex-wrap']")) {
    const kids = row.childNodes.filter((n) => n.nodeType === 1) as HTMLElement[];
    if (kids.length < 2 || !kids.every((k) => k.tagName === "SPAN" || k.tagName === "A")) continue;
    kids.slice(0, -1).forEach((k) => k.insertAdjacentHTML("afterend", ", "));
  }
  // 2. Drop anything that is not content.
  for (const el of main.querySelectorAll("script, style, noscript, svg, button, select, input, form, [aria-hidden='true'], [data-md-skip]")) {
    el.remove();
  }
  // 3. Make links absolute; links to other pages of this site point at their markdown version.
  for (const a of main.querySelectorAll("a[href]")) {
    const href = a.getAttribute("href") ?? "";
    if (/^(mailto:|tel:)/.test(href)) continue;
    let url: URL;
    try {
      url = new URL(href, `${SITE}${path}`);
    } catch {
      continue;
    }
    if (url.origin === SITE) {
      const p = url.pathname.length > 1 ? url.pathname.replace(/\/$/, "") : "/";
      if (pages.has(p)) {
        a.setAttribute("href", `${SITE}${p === "/" ? "/index" : p}.md${url.hash}`);
        continue;
      }
    }
    a.setAttribute("href", url.toString());
  }

  const body = NodeHtmlMarkdown.translate(main.innerHTML, { bulletMarker: "-", maxConsecutiveNewlines: 2 })
    .replaceAll(OPEN, "[")
    .replaceAll(CLOSE, "]")
    // The converter escapes every "2026." as "2026\."; keep the escape only where a line would look like a list item.
    .replace(/^(\d+)\\\./gm, "$1\uE002")
    .replace(/\\\./g, ".")
    .replaceAll("\uE002", "\\.")
    .trim();
  const front = [
    "---",
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `canonical: ${SITE}${path === "/" ? "/" : path}`,
    `format: markdown version of the page above, generated from the same content`,
    "---",
  ].join("\n");
  return `${front}\n\n${body}\n`;
}

function main() {
  // Remove files from the previous run.
  for (const f of walk(PUBLIC_DIR)) if (f.endsWith(".md")) rmSync(f);
  rmSync(join(PUBLIC_DIR, "llms-full.txt"), { force: true });

  const paths = sitemapPaths();
  const pageSet = new Set(paths);
  const problems: string[] = [];
  const written: { path: string; md: string }[] = [];

  for (const path of paths) {
    const file = htmlFile(path);
    if (!existsSync(file)) {
      problems.push(`${path}: no prerendered HTML at ${file}`);
      continue;
    }
    try {
      const md = toMarkdown(path, readFileSync(file, "utf8"), pageSet);
      const bodyLength = md.slice(md.indexOf("\n---\n", 4) + 5).trim().length;
      if (bodyLength < 200) {
        problems.push(`${path}: converted body is only ${bodyLength} characters`);
        continue;
      }
      if (!/^#\s/m.test(md)) problems.push(`${path}: markdown has no heading`);
      const out = mdFile(path);
      mkdirSync(dirname(out), { recursive: true });
      writeFileSync(out, md);
      written.push({ path, md });
    } catch (e) {
      problems.push(`${path}: ${(e as Error).message}`);
    }
  }

  // Also flag prerendered pages that are not in the sitemap (a page added without a sitemap entry).
  const skip = /(^|\/)(_not-found|_global-error|_error|404|500)\.html$/;
  for (const f of walk(APP_DIR)) {
    if (!f.endsWith(".html")) continue;
    const rel = f.slice(APP_DIR.length + 1);
    if (skip.test(rel)) continue;
    const path = "/" + rel.replace(/\.html$/, "").replace(/^index$/, "");
    if (!pageSet.has(path === "/" ? "/" : path)) problems.push(`${path}: prerendered but missing from app/sitemap.ts (so no markdown version)`);
  }

  // Every static route in the app must be in the sitemap (a route that is rendered on demand has no prerendered
  // HTML, so the loop above would never see it). Dynamic [param] routes are covered by their prerendered HTML.
  const manifest = JSON.parse(readFileSync(join(ROOT, ".next", "server", "app-paths-manifest.json"), "utf8")) as Record<string, string>;
  for (const route of Object.keys(manifest)) {
    if (!route.endsWith("/page") || route.includes("[") || route.startsWith("/_")) continue;
    const path = route === "/page" ? "/" : route.slice(0, -"/page".length);
    if (!pageSet.has(path)) problems.push(`${path}: a page route that is not in app/sitemap.ts (add it, or it gets no markdown version)`);
  }

  // Every page must be listed in /llms.txt (the agents' entry point), except those exempted here.
  const llmsFile = join(APP_DIR, "llms.txt.body");
  if (existsSync(llmsFile)) {
    const llms = readFileSync(llmsFile, "utf8");
    for (const path of paths) {
      if (LLMS_EXEMPT.has(path)) continue;
      if (!new RegExp(`https?://[^/\\s)]+${path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.md`).test(llms)) {
        problems.push(`${path}: not linked from /llms.txt (add it to app/llms.txt/route.ts)`);
      }
    }
  } else problems.push("llms.txt was not prerendered, so its links could not be checked");

  if (problems.length > 0) {
    console.error(`\nbuild-markdown: ${problems.length} problem(s):\n- ${problems.join("\n- ")}\n`);
    process.exit(1);
  }

  const full = written.map((w) => w.md).join("\n\n");
  writeFileSync(join(PUBLIC_DIR, "llms-full.txt"), full);
  console.log(`build-markdown: wrote ${written.length} markdown pages and llms-full.txt (${Math.round(full.length / 1024)} KB)`);
}

main();
