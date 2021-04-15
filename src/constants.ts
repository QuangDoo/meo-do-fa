import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const FILES_GATEWAY = `https://${
  publicRuntimeConfig.NEXT_PUBLIC_FILES_GATEWAY || process.env.NEXT_PUBLIC_FILES_GATEWAY
}`;

export const MAX_CERTIFICATES = 6;
