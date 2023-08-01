/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public/manifest'
})

const nextConfig = withPWA({
  swcMinify: true,
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Users-Length, Users-MD5, Users-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
})

module.exports = nextConfig
