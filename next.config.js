/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'localhost:3002',
      'localhost:3005',
      'https://sofiacomar1.latincloud.app',
      'localhost',
      'tse1.mm.bing.net',
      'tse4.mm.bing.net',
      'tse2.mm.bing.net',
      'example.com',
      'makeup-auh2.vercel.app',
      'sofiacomar1.latincloud.app',

      '65180f852cde840008661f9c--curious-buttercream-52ba76.netlify.app',
      'maps.googleapis.com/maps/api/js/QuotaService.RecordEvent?1shttps%3A%2F%2Fwww.google.com%2Fmaps%2Fembed&2sgoogle-maps-embed&7serfz08&10e1&11b1&callback=_xdc_._a82259&client=google-maps-embed&token=122749',
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
