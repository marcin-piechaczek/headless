const path = require('path');
const { URL } = require('url');

module.exports = {
  images: {
    domains: [process.env.IMAGE_DOMAIN, process.env.VERCEL_URL]
  },
  env: {
    STOREFRONT_URL: process.env.STOREFRONT_URL,
    MAGENTO_URL: process.env.MAGENTO_URL,
    IMAGE_DOMAIN: process.env.IMAGE_DOMAIN,
    VERCEL_URL: process.env.VERCEL_URL
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      loader: 'graphql-tag/loader'
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname)
    };

    return config;
  },
  async rewrites() {
    return [
      /**
       * Rewrite /graphql requests to Magento
       */
      {
        source: '/graphql/:pathname*',
        destination: new URL('graphql', process.env.MAGENTO_URL).href
      },

      /**
       * Sample of how to use APIs to Proxy Images
       */
      {
        source: '/store/:pathname*',
        destination: '/api/proxy'
      },

      /**
       * URlResolver 🙌
       */
      {
        source: `/:pathname*`,
        destination: '/_url-resolver'
      }
    ];
  }
};
