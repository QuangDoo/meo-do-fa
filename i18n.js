/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const NextI18Next = require('next-i18next').default;
const path = require('path');

const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;

module.exports = new NextI18Next({
  defaultLanguage: 'vi',
  otherLanguages: ['en'],
  localeSubpaths,
  localePath: path.resolve('./public/locales'),
  browserLanguageDetection: false,
  serverLanguageDetection: false
});
