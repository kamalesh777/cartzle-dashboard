/** @type {import('next').NextConfig} */
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
        protocol: 'https',
        hostname: 'logosbynick.com',
      },
    ],
  },
}
module.exports = nextConfig
