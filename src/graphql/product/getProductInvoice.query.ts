import { gql } from '@apollo/client';

import { Product, productCardQueryProps } from './getProducts';

export const GET_INVOICE_COUNSEL = gql`
  query getInvoiceCounsel($orderNo: String!) {
    getInvoiceCounsel(orderNo: $orderNo) {
      ${productCardQueryProps}
    }
  }
`;

export type GetInvoiceCounselVars = {
  orderNo: string;
};

export type GetInvoiceCounselData = {
  getInvoiceCounsel: Product[];
};
