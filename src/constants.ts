import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const FILES_GATEWAY = `https://${
  publicRuntimeConfig.FILES_GATEWAY_EXT || process.env.NEXT_PUBLIC_FILES_GATEWAY
}`;
