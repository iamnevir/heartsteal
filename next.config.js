/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "tse1.mm.bing.net",
      },
      {
        hostname: "tse2.mm.bing.net",
      },
      {
        hostname: "tse3.mm.bing.net",
      },
      {
        hostname: "tse4.mm.bing.net",
      },
      {
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
      },
      {
        hostname: "files.edgestore.dev",
      },
    ],
  },
};

module.exports = nextConfig;
