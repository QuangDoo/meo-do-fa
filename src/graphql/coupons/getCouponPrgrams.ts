import { gql } from '@apollo/client';

export const GET_COUPON_PROGRAMS = gql`
  query {
    getCouponPrograms {
      id
      name
      active
      rule_id
      reward_id
      sequence
      # maximun_use_number
      program_type
      promo_code_usage
      promo_code
    }
  }
`;
