import { gql } from '@apollo/client';

export enum TagType {
  PRODUCT = 'PRODUCT',
  MANUFATURE = 'MANUFATURE',
  INGREDIENT = 'INGREDIENT',
  SUPPLIER = 'SUPPLIER',
  ALL = 'ALL'
}

export const productCardQueryProps = `
  id
  name
  price
  old_price
  list_price
  sale_price
  discount_percentage
  image_128
  image_512
  image_256
  packing_unit
  is_new
  is_quick_invoice
  is_vn
  is_exclusive
  is_available
  slug
  categories {
    id
    name
  }
  manufacturer {
    id
    name
    short_name
  }
  default_vendor
  default_vendor_id
  max_qty_per_order
`;

export type Product = {
  id: number;
  name: string;
  price: number;
  old_price: number;
  list_price: number;
  sale_price: number;
  discount_percentage: number;
  image_128: string;
  image_256: string;
  image_512: string;
  packing_unit: string;
  is_new: boolean;
  is_quick_invoice: boolean;
  is_vn: boolean;
  is_exclusive: boolean;
  is_available: boolean;
  slug: string;
  categories: {
    id: number;
    name: string;
  }[];
  manufacturer: {
    id: number;
    name: string;
    short_name: string;
  };
  default_vendor: string;
  default_vendor_id: string;
  max_qty_per_order: number;
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
  | 'new'
  | 'is_quick_order'
  | 'best-seller';

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
  pathology_id?: string;
  supplier_id?: string;
  search_tag?: TagType;
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
        ${productCardQueryProps}
      }
      total
    }
  }
`;
