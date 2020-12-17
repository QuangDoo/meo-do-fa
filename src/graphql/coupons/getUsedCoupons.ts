import { gql } from '@apollo/client';

import { CouponStatus } from '../user/getCouponsByUser';

export type GetUsedCouponsData = {
  getUsedCoupon: {
    code: string;
    display_name: string;
    create_date: string;
    expiration_date: string;
    state: CouponStatus;
  }[];
};

export const GET_USED_COUPONS = gql`
  query {
    getUsedCoupon {
      code
      display_name
      create_date
      expiration_date
      state
    }
  }
`;
