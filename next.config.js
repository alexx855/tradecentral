/** @type {import('next').NextConfig} */
// https://gateway.lighthouse.storage/ipfs/
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ['gateway.lighthouse.storage', "i.imgur.com"],
  },
}

module.exports = nextConfig;