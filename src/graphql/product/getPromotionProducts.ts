import { gql } from '@apollo/client';
import { Product } from 'src/graphql/product/getProducts';

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
        id
        name
        price
        list_price
        old_price
        sale_price
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
