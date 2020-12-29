import { gql } from '@apollo/client';
import { Product, productCardQueryProps } from 'src/graphql/product/getProducts';

export type GetBestSellingProductsData = {
  getProductByConditions: {
    Products: Product[];
  };
};

export type GetBestSellingProductsVars = {
  page: number;
  pageSize: number;
};

export const GET_BEST_SELLING_PRODUCTS = gql`
  query getProducts($page: Int!, $pageSize: Int!) {
    getProductByConditions(
      page: $page
      pageSize: $pageSize
      type: "is_quick_order"
      condition: { order_type: "01" }
    ) {
      Products {
        ${productCardQueryProps}
      }
    }
  }
`;
