/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "files.edgestore.dev",
      },
    ],
  },
};

module.exports = nextConfig;
