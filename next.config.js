/** @type {import('next').NextConfig} */
// https://gateway.lighthouse.storage/ipfs/
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    unoptimized: true,
    domains: ['gateway.lighthouse.storage', "i.imgur.com"],
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/404": { page: "/404" },
    };
  }
}

module.exports = nextConfig;