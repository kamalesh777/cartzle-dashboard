/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
}
module.exports = nextConfig
