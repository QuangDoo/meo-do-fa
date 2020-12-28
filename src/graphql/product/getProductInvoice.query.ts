import { gql } from '@apollo/client';
import { Product } from 'src/graphql/product/getProducts';

export const GET_INVOICE_COUNSEL = gql`
  query getInvoiceCounsel($orderNo: String!) {
    getInvoiceCounsel(orderNo: $orderNo) {
      id
      name
      image
      price
      total_price
      quantity
      dc_amt_product
      tax
      price_percentage
    }
  }
`;

export type GetProductsWithInvoiceVars = {
  orderNo: string;
};

export type GetProductsWithInvoiceData = {
  getInvoiceCounsel: {
    id: number;
    name: string;
    image: string;
    price: number;
    total_price?: number;
    quantity: number;
    dc_amt_product?: number;
    tax?: number;
    price_percentage?: number;
  }[];
};
