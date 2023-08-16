/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
    compiler: {
        styledComponents: true
      },
      eslint: {
        ignoreDuringBuilds: true,
      },
      images: {
        loader: 'default',
        path: isProduction ? 'https://ChaeSoGong.github.io/' : 'http://localhost:3000',
      },
      assetPrefix: isProduction ? '/premium-page' : '',
}

module.exports = nextConfig

