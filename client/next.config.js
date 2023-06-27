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
        destination: "http://localhost:8800/api/:path*",
      },
      {
        source: "/api/auth/:path*",
        destination: "http://localhost:8800/api/auth/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
