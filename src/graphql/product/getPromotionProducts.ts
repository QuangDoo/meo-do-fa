import { gql } from '@apollo/client';
import { Product } from 'src/graphql/product/getProducts';

export type GetPromotionProductsData = {
  getProductByConditions: {
    Products: Product[];
  };
};

export type GetPromotionProductsVars = {
  page: number;
  pageSize: number;
};

export const GET_PROMOTION_PRODUCTS = gql`
  query getProducts($page: Int!, $pageSize: Int!) {
    getProductByConditions(page: $page, pageSize: $pageSize, condition: { order_type: "01" }) {
      Products {
        id
        name
        price
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
