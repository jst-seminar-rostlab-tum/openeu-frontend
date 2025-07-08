import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/onboarding',
        destination: '/onboarding/1',
      },
    ];
  },
};

export default nextConfig;
