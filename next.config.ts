import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    contentDispositionType: "inline",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },

  async redirects() {
    return [
      {
        source: "/breast-health-checkup",
        destination: "/breast-cancer-doctor-in-gurgaon",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
