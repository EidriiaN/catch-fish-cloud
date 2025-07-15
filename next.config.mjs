/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Enable static asset compression
  compress: true,
  // Ensure correct asset paths in production
  poweredByHeader: false,
  // Add other configurations here as needed
};

export default nextConfig;
