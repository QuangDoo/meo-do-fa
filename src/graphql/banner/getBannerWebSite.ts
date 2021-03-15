import { gql } from '@apollo/client';

export enum BannerType {
  MAIN = 'MAIN',
  PROMOTION = 'PROMOTION'
}

export type bannerInputVars = {
  type: BannerType;
};

export type WebBannerData = {
  getWebsiteBanner: {
    id: number;
    name: string;
    link: string;
    image: string;
  }[];
};

export const GET_BANNER = gql`
  query($type: BannerType) {
    getWebsiteBanner(type: $type) {
      id
      name
      type
      link
      image
    }
  }
`;
