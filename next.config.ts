import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // 動画アップロード対応: ボディサイズ上限を200MBに
  serverExternalPackages: [],
  experimental: {
    serverActions: {
      bodySizeLimit: "200mb",
    },
  },
};

export default nextConfig;
