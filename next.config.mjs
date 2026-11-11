const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://peptidetdb.com").replace(/\/$/, "");

// Request headers that mean "send me markdown" (what AI agents send: Accept: text/markdown).
const WANTS_MARKDOWN = [{ type: "header", key: "accept", value: "(.*)text/markdown(.*)" }];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // One canonical host: www.peptidetdb.com -> peptidetdb.com (canonical links and the sitemap use the apex).
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.peptidetdb.com" }],
        destination: "https://peptidetdb.com/:path*",
        permanent: true,
      },
    ];
  },
  // Every page has a markdown twin at <path>.md (written by scripts/build-markdown.ts after the build; "/" is /index.md).
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", has: WANTS_MARKDOWN, destination: "/index.md" },
        { source: "/:path([^.]+)", has: WANTS_MARKDOWN, destination: "/:path.md" },
      ],
    };
  },
  async headers() {
    return [
      // HTML pages advertise their markdown version; Vary keeps CDNs from mixing up the two answers to one URL.
      {
        source: "/",
        headers: [
          { key: "Link", value: '</index.md>; rel="alternate"; type="text/markdown"' },
          { key: "Vary", value: "Accept" },
        ],
      },
      {
        source: "/:path((?!_next|api)[^.]+)",
        headers: [
          { key: "Link", value: '</:path.md>; rel="alternate"; type="text/markdown"' },
          { key: "Vary", value: "Accept" },
        ],
      },
      // Markdown files: right content type, and point search engines at the HTML page as the canonical one.
      {
        source: "/:path(.+)\\.md",
        headers: [
          { key: "Content-Type", value: "text/markdown; charset=utf-8" },
          { key: "Link", value: `<${SITE_URL}/:path>; rel="canonical"` },
        ],
      },
      // After the rule above, because the last matching rule wins for a repeated header.
      {
        source: "/index.md",
        headers: [
          { key: "Content-Type", value: "text/markdown; charset=utf-8" },
          { key: "Link", value: `<${SITE_URL}/>; rel="canonical"` },
        ],
      },
      { source: "/llms-full.txt", headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }] },
    ];
  },
};

export default nextConfig;
