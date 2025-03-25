import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during build
  },
  devIndicators: false,
  images: {
    domains:['example.com']
  }
};

export default nextConfig;
