/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "www.pexels.com", "i.ytimg.com"],
  },
};

module.exports = nextConfig;
