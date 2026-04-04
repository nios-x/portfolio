import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow LAN client to access Next.js dev HMR resources
  allowedDevOrigins: ["192.168.167.10"],
  transpilePackages: ['three'],
};

export default nextConfig;
