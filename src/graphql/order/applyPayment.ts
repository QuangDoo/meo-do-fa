import { gql } from '@apollo/client';

import { OutputCounsel } from './getCounsel';

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
      counsel {
        _id
        userId
        orderNo
        counsels {
          cartId
          productId
          quantity
          productName
        }
        create_date
      }
      totalQty
      totalPrice
      totalDcAmt
      totalShippingFee
      totalNetPrice
      totalDcPayment
      promotion {
        coupon_code
        dc_coupon_amt
        discount_type
        giftInfo {
          giftId
          giftName
          giftQty
        }
      }
    }
  }
`;
