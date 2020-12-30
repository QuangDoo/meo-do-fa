import { gql } from '@apollo/client';
import { Product, productCardQueryProps } from 'src/graphql/product/getProducts';

export type GetNewProductsData = {
  getProductByConditions: {
    Products: Product[];
  };
};

export type GetNewProductsVars = {
  page: number;
  pageSize: number;
};

export const GET_NEW_PRODUCTS = gql`
  query($page: Int!, $pageSize: Int!) {
    getProductByConditions(
      page: $page
      pageSize: $pageSize
      type: "new"
      condition: { order_type: "01" }
    ) {
      Products {
        ${productCardQueryProps}
      }
    }
  }
`;
