/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      process.env.NEXT_PUBLIC_DOMAIN_URL_IMAGE
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        permanent: true,
        destination: '/en'
      },
      {
        source: '/partner',
        permanent: true,
        destination: '/en/partner'
      },
      {
        source: '/community',
        permanent: true,
        destination: '/en/community'
      },
      {
        source: '/community/:slug',
        permanent: true,
        destination: '/en/community/:slug'
      }
    ]
  },
  distDir: process.env.NEXT_PUBLIC_BUILD_DIR,
  generateBuildId: async () => {
    return `${new Date().getTime()}`;
  }
}

module.exports = nextConfig
