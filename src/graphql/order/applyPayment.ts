import { gql } from '@apollo/client';

import { OUTPUT_COUNSEL, OutputCounsel } from './getCounsel';

export type ApplyPaymentData = {
  applyPayment: OutputCounsel;
};

export type ApplyPaymentVars = {
  orderNo: string;
  payment_method: number;
};

export const APPLY_PAYMENT = gql`
  mutation($orderNo: String!, $payment_method: Int!) {
    applyPayment(inputs: { orderNo: $orderNo, payment_method: $payment_method }) {
      ${OUTPUT_COUNSEL}
    }
  }
`;
