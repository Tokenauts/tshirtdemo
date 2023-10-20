/** @type {import('next').NextConfig} */
const nextConfig = {
  server: {
    proxy: {
      "/api": {
        target: "https://front-git-test-way2pay.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
};

module.exports = nextConfig;
