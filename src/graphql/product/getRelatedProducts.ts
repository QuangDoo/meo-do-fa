import { gql } from '@apollo/client';
import { Product, productCardQueryProps } from 'src/graphql/product/getProducts';

export type GetRelatedProductsData = {
  getProductByConditions: {
    Products: Product[];
  };
};

export type GetRelatedProductsVars = {
  page: number;
  pageSize: number;
};

export const GET_RELATED_PRODUCTS = gql`
  query getProducts($page: Int!, $pageSize: Int!) {
    getProductByConditions(page: $page, pageSize: $pageSize, condition: { order_type: "01" }) {
      Products {
        ${productCardQueryProps}
      }
    }
  }
`;
