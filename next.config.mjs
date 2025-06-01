// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// export default nextConfig

// next.config.js

/** @type {import('next').NextConfig} */
// next.config.mjs
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);
