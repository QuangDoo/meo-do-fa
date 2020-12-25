import { gql } from '@apollo/client';
import { Product } from 'src/graphql/product/getProducts';

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
        uom_name
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
