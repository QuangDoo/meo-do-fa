import { gql } from '@apollo/client';

export type WebsiteConfig = {
  key: string;
  value: string;
};

export type GetWebsiteConfigData = {
  getWebsiteConfig: WebsiteConfig[];
};

export const GET_WEBSITE_CONFIG = gql`
  query {
    getWebsiteConfig {
      key
      value
    }
  }
`;
