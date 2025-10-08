import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Enable live sync for content changes
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Disable caching for development to ensure live sync
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // Disable static optimization for dynamic content
  typescript: {
    ignoreBuildErrors: false,
  },
  // Enable file watching for MDX files
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Enable hot reloading for content files
      config.watchOptions = {
        ...config.watchOptions,
        ignored: /node_modules/,
        poll: 1000, // Check for changes every second
      };
    }
    return config;
  },
};

export default withMDX(config);
