import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "solproducts.blob.core.windows.net",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
