import { gql } from '@apollo/client';

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

export type GetInvoiceCounselVars = {
  orderNo: string;
};

export type GetInvoiceCounselData = {
  getInvoiceCounsel: {
    id: number;
    name: string;
    image: string;
    price: number;
    total_price: number;
    quantity: number;
    dc_amt_product: number;
    tax: number;
    price_percentage: number;
  }[];
};
