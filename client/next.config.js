/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
  },
  reactStrictMode: true,
  async rewrites() {
    console.log("Rewrites called");
    return [
      {
        source: "/:path*",
        // destination: "https://insightlinkapi.jisuheo.shop/api/:path*", // Proxy to Backend
        destination: "http://localhost:8800/api/:path*", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
