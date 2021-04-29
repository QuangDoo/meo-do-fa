import { gql } from '@apollo/client';
import { Product, productCardQueryProps } from 'src/graphql/product/getProducts';

export type GetQuickOrderProductsData = {
  getProductByConditions: {
    Products: Product[];
    total: number;
  };
};

export type GetQuickOrderProductsVars = {
  page: number;
  pageSize: number;
  name: string;
};

export const GET_QUICK_ORDER_PRODUCTS = gql`
  query getProducts($page: Int!, $pageSize: Int!, $name: String) {
    getProductByConditions(
      page: $page
      pageSize: $pageSize
      type: "is_quick_order"
      condition: { order_type: "01", name: $name}
    ) {
      Products {
        ${productCardQueryProps}
      }
      total
    }
  }
`;
