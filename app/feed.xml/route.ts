import { SITE } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { KIND_HEADING, LATEST_UPDATE, UPDATE_DAYS, summarise } from "@/lib/updates";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const abs = (href: string) => (href.startsWith("http") ? href : `${SITE.url}${href}`);
/** RSS wants RFC 822 dates; updates are dated by day, so use noon UTC. */
const rfc822 = (iso: string) => new Date(`${iso}T12:00:00Z`).toUTCString();

/** RSS 2.0 feed of /whats-new: one item per day, newest first (the 30 most recent days with updates). */
export function GET() {
  const items = UPDATE_DAYS.slice(0, 30).map((day) => {
    const all = day.groups.flatMap((g) => g.items);
    const link = `${SITE.url}/whats-new#d-${day.date}`;
    const html = day.groups
      .map(
        (g) =>
          `<h3>${esc(KIND_HEADING[g.kind])}</h3><ul>${g.items
            .map((u) => `<li><a href="${esc(abs(u.href))}">${esc(u.title)}</a>${u.note ? ` – ${esc(u.note)}` : ""}</li>`)
            .join("")}</ul>`,
      )
      .join("");
    return [
      "<item>",
      `<title>${esc(`${formatDate(day.date)}: ${summarise(all)}`)}</title>`,
      `<link>${esc(link)}</link>`,
      `<guid isPermaLink="true">${esc(link)}</guid>`,
      `<pubDate>${rfc822(day.date)}</pubDate>`,
      `<description>${esc(html)}</description>`,
      "</item>",
    ].join("");
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    `<title>${esc(`${SITE.name}: what's new`)}</title>`,
    `<link>${SITE.url}/whats-new</link>`,
    `<atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>`,
    `<description>${esc("New pages, study summaries, product grades, evidence reviews and corrections on " + SITE.name + ".")}</description>`,
    "<language>en</language>",
    `<lastBuildDate>${rfc822(LATEST_UPDATE)}</lastBuildDate>`,
    ...items,
    "</channel>",
    "</rss>",
  ].join("\n");

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
