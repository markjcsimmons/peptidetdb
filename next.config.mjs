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
};

export default nextConfig;
