import { gql } from '@apollo/client';

type CounselDetail = {
  cartId: string;
  productId: number;
  quantity: number;
  productName: string;
};

type Counsel = {
  _id: string;
  userId: number;
  orderNo: string;
  counsels: CounselDetail[];
  create_date: Date;
};

type GiftInfo = {
  gitfId: number;
  gitfName: string;
  giftQty: number;
};

type PromotionType = {
  coupon_code: string;
  dc_coupon_amt: number;
  discount_type: string;
  giftInfo: GiftInfo;
};

export type OutputCounsel = {
  counsel: Counsel;
  totalQty: number;
  totalPrice: number;
  totalDcAmt: number;
  totalShippingFee: number;
  totalNetPrice: number;
  totalDcPayment: number;
  promotion: PromotionType;
};

export type GetCounselData = {
  getCounsel: OutputCounsel;
};

export const GET_COUNSEL = gql`
  query {
    getCounsel {
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
          gitfId
          gitfName
          giftQty
        }
      }
    }
  }
`;
