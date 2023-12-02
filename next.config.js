/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: "tailus.io",protocol:"https",pathname:"/sources/blocks/stats-cards/preview/images/**"
        }]
    },
    experimental: {
    serverActions: {
         allowedForwardedHosts: ["localhost", "gp71dwqz-3000.brs.devtunnels.ms"],
      allowedOrigins: ["gp71dwqz-3000.brs.devtunnels.ms", "localhost:3000"]
    }
  }
}

module.exports = nextConfig
