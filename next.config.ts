import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  cacheLife: {
    products: {
      stale: 300, // 5 minutes
      revalidate: 900, // 15 minutes
      expire: 3600, // 1 hour
    },
    stock: {
      stale: 30, // 30 seconds
      revalidate: 60, // 1 minute
      expire: 300, // 5 minutes
    },
    promotions: {
      stale: 30, // 30 seconds
      revalidate: 60, // 1 minute
      expire: 300, // 5 minutes
    },
  },
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [300, 430, 668],
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
