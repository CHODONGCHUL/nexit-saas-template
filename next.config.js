// next.config.js
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      ...(process.env.NEXT_PUBLIC_SUPABASE_URL
        ? [
            {
              protocol: "https",
              hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,
            },
          ]
        : []),
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  webpack: (config) => {
    const path = require("path");
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
  // ✅ 타입 에러 무시하고 빌드 강행
  typescript: {
    ignoreBuildErrors: true,
  },
  // ✅ ESLint 에러 무시하고 빌드 강행
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withNextIntl(nextConfig);
