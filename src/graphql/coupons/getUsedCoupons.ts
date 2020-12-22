import { gql } from '@apollo/client';

import { CouponStatus } from '../user/getCouponsByUser';

export type CouponType = 'discount' | 'product' | 'free_shipping';

export type GetUsedCouponsData = {
  getUsedCoupon: {
    code: string;
    create_date: string;
    expiration_date: string;
    state: CouponStatus;
    program: {
      name: string;
      reward_type: CouponType;
    };
  }[];
};

export const GET_USED_COUPONS = gql`
  query {
    getUsedCoupon {
      code
      create_date
      expiration_date
      state
      program {
        name
        reward_type
      }
    }
  }
`;
