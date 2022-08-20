/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    imageSizes: [
      128, 224, 288, 576, 768, 960, 1152, 1344, 1536, 1728, 1920, 2112, 2304,
    ],
  },
};

module.exports = nextConfig;
