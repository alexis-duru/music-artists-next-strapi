/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  env: {
    baseApiUrl: "http://localhost:1337/api",
    baseUrl: "http://localhost:1337",
  },
};

module.exports = nextConfig;
