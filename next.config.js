/** @type {import('next').NextConfig} */

const url = new URL(process.env.NEXT_PUBLIC_API_SERVICE)

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: `/settings/user-permissions`,
        destination: `/settings/user-permissions/roles`,
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: url.protocol.replace(':', ''),
        hostname: url.hostname,
        port: url.port,
      },
    ],
  },
}
module.exports = nextConfig
