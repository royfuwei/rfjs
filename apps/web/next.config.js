//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const path = require('path');
const webpack = require('webpack');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  output: 'standalone',
  experimental: {
    // this includes files from the monorepo base two directories up
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        // defaultAccessToken
        CESIUM_DEFAULT_ACCESS_TOKEN: JSON.stringify(process.env.CESIUM_DEFAULT_ACCESS_TOKEN),
        CESIUM_BASE_URL: JSON.stringify('cesium'),
      }),
    );
    return config;
  },
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
