/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: false,
  images: {
    domains: ["github.com", "lh3.googleusercontent.com"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
