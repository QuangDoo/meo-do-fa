import { gql } from '@apollo/client';
import { Product, productCardQueryProps } from 'src/graphql/product/getProducts';

export type GetPromotionProductsData = {
  getPrmotionProducts: {
    products: Product[];
    total: number;
  };
};

export type GetPromotionProductsVars = {
  page: number;
  pageSize: number;
};

export const GET_PROMOTION_PRODUCTS = gql`
  query($page: Int!, $pageSize: Int!) {
    getPrmotionProducts(page: $page, pageSize: $pageSize) {
      total
      products {
        ${productCardQueryProps}
      }
    }
  }
`;
