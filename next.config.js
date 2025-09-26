/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  devIndicators: false,
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
