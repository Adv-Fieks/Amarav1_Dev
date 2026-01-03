/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/app/studio/:path*',
        destination: '/studio/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
