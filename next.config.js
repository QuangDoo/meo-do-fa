/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { nextI18NextRewrites } = require('next-i18next/rewrites');
const withPWA = require('next-pwa');
const localeSubpaths = {};

module.exports = withPWA({
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths
  },
  env: {
    GRAPHQL_GATEWAY: process.env.GRAPHQL_GATEWAY
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 'googleapis.com']
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    register: true,
    sw: 'service-worker.js',
    dest: 'public'
  }
});
