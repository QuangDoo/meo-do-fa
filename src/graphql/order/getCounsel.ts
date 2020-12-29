import { gql } from '@apollo/client';

import { RewardType } from '../coupons/getUsedCoupons';

type CounselDetail = {
  cartId: string;
  productId: number;
  quantity: number;
  productName: string;
};

type GiftInfo = {
  giftId: number;
  giftName: string;
  giftQty: number;
};

export type PromotionType = {
  coupon_code: string;
  dc_coupon_amt: number;
  reward_type: RewardType;
  discount_type: DiscountType;
  giftInfo: GiftInfo;
  program_name: string;
};

type PromotionInfo = {
  id: number;
  name: string;
  reward_type: RewardType;
  discount_type: DiscountType;
  discount_percentage: number;
  discount_fixed_amount: number;
  dc_price: number;
  reward_product_id: number;
  reward_product_name: string;
  reward_product_quantity: number;
};

export type DiscountType = 'percentage' | 'fixed_amount';

export type RewardType = 'discount' | 'product' | 'free_shipping';

type Counsel = {
  _id: string;
  orderNo: string;
  promotion: PromotionType;
  counsels: CounselDetail[];
  create_date: Date;
  coupon_code: string;
  coupon_type: RewardType;
  promotions_on_order: PromotionInfo[];
  promotions_on_cart: PromotionInfo[];
  promotions_next_order: PromotionInfo[];
  promotions_coupon: PromotionInfo[];
};

export type OutputCounsel = {
  counsel: Counsel;
  totalQty: number;
  totalPrice: number;
  totalPriceVat: number;
  totalDcAmt: number;
  totalDcPayment: number;
  totalShippingFee: number;
  totalNetPrice: number;
};

export type GetCounselData = {
  getCounsel: OutputCounsel;
};

export const OUTPUT_COUNSEL = `
  totalQty
  totalPrice
  totalDcAmt
  totalShippingFee
  totalNetPrice
  totalDcPayment
  totalPriceVat

  counsel {
    _id
    orderNo
    promotion {
      coupon_code
      dc_coupon_amt
      reward_type
      discount_type
      giftInfo {
        giftId
        giftName
        giftQty
      }
      program_name
    }
    promotions_coupon {
      id
      name
      reward_type
      discount_type
      discount_percentage
      discount_fixed_amount
      dc_price
      reward_product_id
      reward_product_name
      reward_product_quantity
    }
    promotions_on_cart {
      name
      reward_type
      discount_type
      discount_percentage
      discount_fixed_amount
      dc_price
      reward_product_id
      reward_product_name
      reward_product_quantity
    }
    promotions_on_order {
      id
      name
      reward_type
      discount_type
      discount_percentage
      discount_fixed_amount
      dc_price
      reward_product_id
      reward_product_name
      reward_product_quantity
    }
    promotions_next_order {
      name
      reward_type
      discount_type
      discount_percentage
      discount_fixed_amount
      dc_price
      reward_product_id
      reward_product_name
      reward_product_quantity
    }
  }
`;

export const GET_COUNSEL = gql`
  query {
    getCounsel {
      ${OUTPUT_COUNSEL}
    }
  }
`;
