import { gql } from '@apollo/client';

export type CouponStatus = 'reserved' | 'new' | 'used' | 'expired';

export type GetCouponsByUserData = {
  getCouponsByUser: {
    coupons: {
      display_name: string;
      create_date: string;
      expiration_date: string;
      state: CouponStatus;
      orderId: number;
      orderNo: string;
    }[];
    total: number;
  };
};

export type GetCouponsByUserVars = {
  page: number;
  pageSize: number;
};

export const GET_COUPONS_BY_USER = gql`
  query($page: Int!, $pageSize: Int!) {
    getCouponsByUser(page: $page, pageSize: $pageSize) {
      coupons {
        display_name
        create_date
        expiration_date
        state
        orderId
        orderNo
      }
      total
    }
  }
`;
