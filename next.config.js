const nextOffline = require('next-offline');
const nextSourceMaps = require('@zeit/next-source-maps')();
const withPlugins = require('next-compose-plugins');

const config = {
  images: {
    domains: [
      's3.eu-central-1.amazonaws.com',
      'static-cdn.jtvnw.net',
      'ws-eu.amazon-adsystem.com',
    ],
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      config.devtool = 'source-map';
    }
    if (isServer) {
      config.resolve.mainFields.reverse();
    }
    return config;
  },
};

const sourceMapsConfig = [nextSourceMaps];

const offlineConfig = [
  nextOffline,
  {
    transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
    workboxOpts: {
      swDest: 'static/service-worker.js',
    },
  },
];

module.exports = withPlugins([sourceMapsConfig, offlineConfig], config);
