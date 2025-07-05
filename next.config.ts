import type { NextConfig } from "next";

import path from "path";

/* config options here */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://res.cloudinary.com/dfrb7mglo/image/upload/**"),
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias["yjs"] = path.resolve(__dirname, "node_modules/yjs");
    }
    return config;
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
