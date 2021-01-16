/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { nextI18NextRewrites } = require('next-i18next/rewrites');
const withPWA = require('next-pwa');
const localeSubpaths = {};

module.exports = withPWA({
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
    GRAPHQL_GATEWAY_EXT: process.env.GRAPHQL_GATEWAY_EXT
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    GRAPHQL_GATEWAY: process.env.GRAPHQL_GATEWAY // Pass through env variables
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 'googleapis.com','files.medofa.com','files.medofa.bedigital.vn']
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    register: true,
    sw: 'service-worker.js',
    dest: 'public'
  }
});
