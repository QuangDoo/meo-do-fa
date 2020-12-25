import { gql } from '@apollo/client';
import { Product } from 'src/graphql/product/getProducts';

export const GET_INVOICE_COUNSEL = gql`
  query getInvoiceCounsel($orderNo: String!) {
    getInvoiceCounsel(orderNo: $orderNo) {
      display_name
    }
  }
`;

export type GetProductsWithInvoiceVars = {
  orderNo: string;
};

export type GetProductsWithInvoiceData = {
  getInvoiceCounsel: {
    display_name: string;
  }[];
};
