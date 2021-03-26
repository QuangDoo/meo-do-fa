import { gql } from '@apollo/client';

export type Coupon = {
  id: number;
  name: string;
  active: boolean;
  sequence: number;
  promo_code: string;
  reward_description: string;
  reward_type: string;
  discount_type: string;
  rule_min_quantity: number;
  discount_percentage: number;
  discount_fixed_amount: number;
  reward_id: string[];
  rule_date_from: string;
  rule_date_to: string;
};

export type CouponData = {
  getCouponProgramsDetail: Coupon;
};

export type CouponVar = {
  id: number;
};

export const GET_COUPON_PROGRAM = gql`
  query getCouponProgramsDetail($id: Int!) {
    getCouponProgramsDetail(id: $id) {
      id
      name
      active
      sequence
      promo_code
      reward_description
      reward_type
      discount_type
      rule_min_quantity
      discount_percentage
      discount_fixed_amount
      reward_id
      rule_date_from
      rule_date_to
    }
  }
`;
