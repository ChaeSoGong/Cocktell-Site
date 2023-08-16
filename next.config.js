/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

const isProduction = process.env.NODE_ENV === 'production';

export default {
  compiler: {
    styledComponents: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    loader: 'ChaeDoll',
    path: isProduction ? 'https://ChaeSoGong.github.io/' : 'http://localhost:3000',
  },
  assetPrefix: isProduction ? '/premium-page' : '',
};