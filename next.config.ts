import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Menu sheets are text-heavy, so they render at a higher quality than the
    // Next.js 16 default of [75].
    qualities: [75, 90],
  },
};

export default nextConfig;
