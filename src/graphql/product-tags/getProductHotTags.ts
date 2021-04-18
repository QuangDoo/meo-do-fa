import { gql } from '@apollo/client';

export type HotTag = {
  id: number;
  name: string;
  type: string;
};

export type GetProductHotTags = {
  getProductHotTags: HotTag[];
};

export const GET_PRODUCT_HOT_TAGS = gql`
  query {
    getProductHotTags {
      id
      name
      type
    }
  }
`;
