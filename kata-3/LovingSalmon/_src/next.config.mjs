/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    npm_package_version: process.env.npm_package_version,
  },
  basePath: '/code-dojo/kata-3/LovingSalmon',
  output: 'export',
};

export default nextConfig;
