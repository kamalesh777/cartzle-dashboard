/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: `/workspace-controls/users`,
        destination: `/workspace-controls/users/roles`,
        permanent: true,
      },
    ]
  },
}
module.exports = nextConfig
