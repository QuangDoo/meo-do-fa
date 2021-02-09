import { gql } from '@apollo/client';
import { Product, productCardQueryProps } from 'src/graphql/product/getProducts';

export type GetRelatedProductsData = {
  getRelatedProducts: Product[];
};

export type GetRelatedProductsVars = {
  page: number;
  pageSize: number;
  productId: number;
};

export const GET_RELATED_PRODUCTS = gql`
  query getRelatedProducts($page: Int!, $pageSize: Int!, $productId: Int!) {
    getRelatedProducts(page: $page, pageSize: $pageSize, productId: $productId) {
        ${productCardQueryProps}
    }
  }
`;
