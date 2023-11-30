/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: "tailus.io",protocol:"https",pathname:"/sources/blocks/stats-cards/preview/images/**"
}]}}

module.exports = nextConfig
