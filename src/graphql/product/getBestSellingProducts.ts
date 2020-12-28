import { gql } from '@apollo/client';
import { Product } from 'src/graphql/product/getProducts';

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
      # type: "is_quick_order"
      condition: { order_type: "01" }
    ) {
      Products {
        id
        name
        price
        old_price
        sale_price
        list_price
        standard_price
        image_128
        image_512
        image_256
        packing_unit
        is_new
        is_quick_invoice
        is_vn
        is_exclusive
        slug
        categories {
          id
          name
        }
      }
    }
  }
`;
