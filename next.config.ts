import type { NextConfig } from 'next'
import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'
const jiti = createJiti(fileURLToPath(import.meta.url))

// Import env here to validate during build. Using jiti@^1 we can import .ts files :)
jiti.import('./src/env/server')
jiti.import('./src/env/client')

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.ytimg.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
