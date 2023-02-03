/** @type {import('next').NextConfig} */
// https://gateway.lighthouse.storage/ipfs/
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ['gateway.lighthouse.storage'],
  },
}


webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  config.module.rules.push({
    test: /\.md$/,
    use: [
      {
        loader: "ipfs-loader",
        options: {
          ipfsGateway: "gateway.lighthouse.storage",
        },
      },
    ],
  });
  return config;
},

  module.exports = nextConfig;