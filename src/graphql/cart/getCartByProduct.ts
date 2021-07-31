import { gql } from '@apollo/client';

import { GET_CART_DATA, GetCartData } from './getCart';

export type GetCartByProductVars = {
  ids: string[];
};

export type GetCartByProductData = {
  getCartByProduct: GetCartData['getCart'];
};

export const GET_CART_BY_PRODUCT = gql`
  query ($ids: [String!]!) {
    getCartByProduct(ids: $ids) {
      ${GET_CART_DATA}
    }
  }
`;
