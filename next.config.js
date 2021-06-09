/* eslint-disable no-dupe-keys */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { nextI18NextRewrites } = require('next-i18next/rewrites');
const withPWA = require('next-pwa');
const localeSubpaths = {};

module.exports = withPWA({
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  async rewrites() {
    return [
      {
        source: '/san-pham',
        destination: '/products'
      },
      {
        source: '/san-pham/:productId',
        destination: '/products/:productId'
      },
      {
        source: '/gia-soc-hom-nay',
        destination: '/deals-of-the-day'
      },
      {
        source: '/dat-hang-nhanh',
        destination: '/quick-order'
      },
      {
        source: '/ma-khuyen-mai',
        destination: '/promo-codes'
      },
      {
        source: '/san-pham-khuyen-mai',
        destination: '/deals'
      },
      {
        source: '/chuong-trinh-khuyen-mai',
        destination: '/promotions'
      },
      {
        source: '/tra-cuu-theo-benh-ly',
        destination: '/pathological'
      }
    ];
  },
  publicRuntimeConfig: {
    localeSubpaths,
    GRAPHQL_GATEWAY_EXT: process.env.GRAPHQL_GATEWAY_EXT,
    FILES_GATEWAY_EXT: process.env.NEXT_PUBLIC_FILES_GATEWAY
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    GRAPHQL_GATEWAY: process.env.GRAPHQL_GATEWAY // Pass through env variables
  },
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'googleapis.com',
      'files.medofa.com',
      'files.medofa.bedigital.vn',
      'files.dev.medofa.com'
    ]
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    register: true,
    sw: 'service-worker.js',
    dest: 'public'
  }
});
// source: String - is the incoming request path pattern.
// destination: String is the path you want to route to.
