import { gql } from '@apollo/client';
import { Product } from 'src/graphql/product/getProducts';

export const GET_INVOICE_COUNSEL = gql`
  query getInvoiceCounsel($orderNo: String!) {
    getInvoiceCounsel($orderNo: $orderNo) {
      display_nam
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
