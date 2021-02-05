import { gql } from '@apollo/client';
import { productCardQueryProps } from 'src/graphql/product/getProducts';

export type GetRelatedProductsData = {
  getRelatedProducts: {
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
    slug: string;
    categories: {
      id: number;
      name: string;
    }[];
    manufacturer: {
      id: number;
      short_name: string;
    };
  }[];
};

export type GetRelatedProductsVars = {
  page: number;
  pageSize: number;
  productId: number;
};

export const GET_RELATED_PRODUCTS = gql`
  query getRelatedProducts($page: Int!, $pageSize: Int!, $productId: Int!) {
    getRelatedProducts(page: $page, pageSize: $pageSize, productId: $productId) {
        ${productCardQueryProps}
    }
  }
`;
