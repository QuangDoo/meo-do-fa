import { gql } from '@apollo/client';
import { Product } from 'src/graphql/product/getProducts';

export const GET_INVOICE_COUNSEL = gql`
  query getInvoiceCounsel(
    $cartId: String
    $productId: String
    $quantity: String
    $productName: String!
  ) {
    getInvoiceCounsel(
      inputs: {
        counsels: {
          cartId: $cartId
          productId: $productId
          quantity: $quantity
          productName: $productName
        }
      }
    ) {
      productName
      quantity
    }
  }
`;

export type CounselDetailInput = {
  cartId?: string;
  productId?: number;
  quantity?: number;
  productName: string;
};

export type GetProductsWithInvoiceVars = {
  counsels: CounselDetailInput[];
};

export type GetProductsWithInvoiceData = {
  getInvoiceCounsel: {
    cartId: string;
    productId: number;
    quantity: number;
    productName: string;
  }[];
};
