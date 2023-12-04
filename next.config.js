/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      { protocol: "https", hostname: "tailus.io", pathname: "/sources/blocks/stats-cards/preview/images/**" },
      { protocol: "https", hostname: "avatars.githubusercontent.com", },
      { protocol: "https", hostname: "lh3.googleusercontent.com", }
      ]
    },
    experimental: {
    serverActions: {
      allowedForwardedHosts: ["localhost", "gp71dwqz-3000.brs.devtunnels.ms"],
      allowedOrigins: ["gp71dwqz-3000.brs.devtunnels.ms", "localhost:3000"]
    }
  }
}

module.exports = nextConfig
