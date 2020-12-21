import { gql } from '@apollo/client';

import { OutputCounsel } from '../order/getCounsel';

export type ApplyCouponData = {
  applyCoupon: OutputCounsel;
};

export type ApplyCouponVars = {
  orderNo: string;
  code: string;
  type?: number;
};

export const APPLY_COUPON = gql`
  mutation($orderNo: String!, $code: String!, $type: Int) {
    applyCoupon(inputs: { orderNo: $orderNo, code: $code, type: $type }) {
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
        coupon_code
        coupon_type
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
