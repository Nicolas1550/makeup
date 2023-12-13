/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'localhost:3002', 
      'localhost:3005',
      'localhost', 
      'tse1.mm.bing.net',
      'tse4.mm.bing.net',
      'tse2.mm.bing.net',
      'example.com',
      '65180f852cde840008661f9c--curious-buttercream-52ba76.netlify.app'
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.js$/,
      include: /[\\/]node_modules[\\/](@mui[\\/])/,
      use: [options.defaultLoaders.babel],
    });
    return config;
  },
};

module.exports = nextConfig;
