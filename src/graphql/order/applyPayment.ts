import { gql } from '@apollo/client';

export type ApplyPaymentData = {
  applyPayment: {
    totalPrice: number;
  };
};

export type ApplyPaymentVars = {
  orderNo: string;
  payment_method: number;
};

export const APPLY_PAYMENT = gql`
  mutation($orderNo: String!, $payment_method: Int!) {
    applyPayment(inputs: { orderNo: $orderNo, payment_method: $payment_method }) {
      totalPrice
    }
  }
`;
