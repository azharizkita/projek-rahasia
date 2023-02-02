/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
