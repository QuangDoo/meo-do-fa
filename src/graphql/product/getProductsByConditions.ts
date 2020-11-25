import { gql } from '@apollo/client';
import { Product } from 'src/types/Product';

export type GetProductsByConditionsData = {
  getProductByConditions: {
    Products: Product[];
    total: number;
  };
};

export type GetProductsByConditionsVars = {
  page: number;
  pageSize: number;
  type?: string;
  condition: {
    order_type: string;
    category_id?: string;
    manufacturer_id?: string;
  };
};

export const GET_PRODUCTS_BY_CONDITIONS = gql`
  query getProducts(
    $page: Int!
    $pageSize: Int!
    $order_type: String!
    $type: String
    $category_id: String
    $manufacturer_id: String
  ) {
    getProductByConditions(
      page: $page
      pageSize: $pageSize
      type: $type
      condition: {
        order_type: $order_type
        category_id: $category_id
        manufacturer_id: $manufacturer_id
      }
    ) {
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
        categories {
          id
          name
        }
        manufacturer {
          id
          name
        }
      }
      total
    }
  }
`;
