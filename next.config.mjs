/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "x-vercel-skip-toolbar",
            value: "1",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
