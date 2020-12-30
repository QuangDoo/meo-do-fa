import { gql } from '@apollo/client';

import { RewardType } from '../order/getCounsel';
import { CouponStatus } from '../user/getCouponsByUser';

export type MyCoupon = {
  code: string;
  create_date: string;
  expiration_date: string;
  state: CouponStatus;
  program: {
    name: string;
    reward_type: RewardType;
  };
};

export type GetUsedCouponsData = {
  getUsedCoupon: MyCoupon[];
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
