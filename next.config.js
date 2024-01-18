/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'localhost:3002',
      'localhost:3005',
      'http://localhost:3002',
      'sofiaportafolio.online',
      'asdasdasd3.onrender.com',
      'localhost',
      'tse1.mm.bing.net',
      'tse4.mm.bing.net',
      'tse2.mm.bing.net',
      'example.com',
      'makeup-auh2.vercel.app',
      'sofiacomar1.latincloud.app',
      '65180f852cde840008661f9c--curious-buttercream-52ba76.netlify.app',
      'maps.googleapis.com',
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
