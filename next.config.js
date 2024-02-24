/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: process.env.NEXT_APP_BACKEND_URL,
  },
};

module.exports = nextConfig;
