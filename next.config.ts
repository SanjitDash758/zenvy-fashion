import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // eslint property removed — Next.js 15+ handles it differently
};

export default nextConfig;
