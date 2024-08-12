/** @type {import('next').NextConfig} */

const nextConfig = {
    async headers() {
      return [
        {
          source: "/api/getPrice/:slug",
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: "*", // Set your origin
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET, POST, PUT, DELETE, OPTIONS",
            },
            {
              key: "Access-Control-Allow-Headers",
              value: "Content-Type, Authorization",
            },
          ],
        },
      ];
    },
    // Optionally, add any other Next.js config below.
  };

export default nextConfig;
