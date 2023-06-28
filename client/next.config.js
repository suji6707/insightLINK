/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://insightlinkapi.jisuheo.shop/:path*",
      },
      {
        source: "/api/auth/:path*",
        destination: "https://insightlinkapi.jisuheo.shop/auth/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
