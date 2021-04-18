import { gql } from '@apollo/client';

export type PromotionVar = {
  id: number;
};

export type PromotionData = {
  getWebsitePromotionDetail: {
    id: number;
    name: string;
    link: string;
    content: string;
  };
};

export const GET_PROMOTION = gql`
  query getWebsitePromotionDetail($id: Int!) {
    getWebsitePromotionDetail(id: $id) {
      id
      name
      link
      content
    }
  }
`;
