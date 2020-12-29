import { gql } from '@apollo/client';

import { OUTPUT_COUNSEL, OutputCounsel } from '../order/getCounsel';

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
      ${OUTPUT_COUNSEL}
    }
  }
`;
