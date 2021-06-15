import { gql } from '@apollo/client';

import { Product, productCardQueryProps } from './getProducts';

type WishProduct = Product;

export type GetWishListData = {
  getWishList: WishProduct[];
};

export type GetWishListVar = {
  page: number;
  pageSize: number;
};

export const GET_WISH_LIST = gql`
  query getWishList($page: Int!, $pageSize: Int!) {
    getWishList(page: $page, pageSize: $pageSize) {
      ${productCardQueryProps}
    }
  }
`;
