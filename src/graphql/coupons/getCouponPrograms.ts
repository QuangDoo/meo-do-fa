import { gql } from '@apollo/client';

export const GET_COUPON_PROGRAMS = gql`
  query {
    getCouponPrograms {
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
    }
  }
`;
