/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabled for faster builds - run `npm run type-check` separately
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disabled typedRoutes to speed up build time
  // typedRoutes: true,
  outputFileTracingRoot: __dirname,
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Disable source maps in production for faster builds
  productionBrowserSourceMaps: false,
  // Note: swcMinify is default in Next.js 15+, no need to specify
  poweredByHeader: false,
  reactStrictMode: true,
}

module.exports = nextConfig