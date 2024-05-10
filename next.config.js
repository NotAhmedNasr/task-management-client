/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    BACKEND_URL: process.env.NEXT_APP_BACKEND_URL,
    URL: process.env.NEXT_APP_URL,
  },
};

module.exports = nextConfig;
