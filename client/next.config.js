/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
    SERVER_API_URI: process.env.SERVER_API_URI,
  },
  images: {
    domains: [
      "sw-jungle-s3.s3.ap-northeast-2.amazonaws.com",
      "cdn.pixabay.com",
      "encrypted-tbn0.gstatic.com/",
    ],
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.SOURCE_URL,
      },
    ];
  },
};

module.exports = nextConfig;
