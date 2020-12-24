import { gql } from '@apollo/client';

export type Product = {
  id: string;
  name: string;
  price: number;
  list_price: number;
  sale_price: number;
  standard_price: number;
  image_128: string;
  image_256: string;
  image_512: string;
  packing_unit: string;
  is_new: boolean;
  is_quick_invoice: boolean;
  is_vn: boolean;
  is_exclusive: boolean;
  slug: string;
  categories: {
    id: string;
    name: string;
  }[];
  manufacturer: {
    id: string;
    short_name: string;
  };
};

export type ProductTag =
  | 'invoice-exportable'
  | 'out-of-stocks'
  | 'only-medofa'
  | 'promotion'
  | 'flash-sale'
  | 'common'
  | 'change-style'
  | 'close-date'
  | 'use-vietnamese'
  | 'new';

export type GetProductsData = {
  getProductByConditions: {
    Products: Product[];
    total: number;
  };
};

export type Condition = {
  order_type: string;
  category_id?: string;
  manufacturer_id?: string;
  name?: string;
  min_price?: number;
  max_price?: number;
};

export type GetProductsVars = {
  page: number;
  pageSize: number;
  type?: ProductTag;
  condition: Condition;
};

export const GET_PRODUCTS = gql`
  query getProducts($page: Int!, $pageSize: Int!, $type: String, $condition: Condition) {
    getProductByConditions(page: $page, pageSize: $pageSize, type: $type, condition: $condition) {
      Products {
        id
        name
        price
        list_price
        sale_price
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
        manufacturer {
          id
          name
        }
      }
      total
    }
  }
`;
