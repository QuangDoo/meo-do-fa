import { gql } from '@apollo/client';

export type DiscountType = 'percentage' | 'fixed_amount';

export type RewardType = 'discount' | 'product' | 'free_shipping';

export type PromotionType = {
  coupon_code: string;
  dc_coupon_amt: number;
  reward_type: RewardType;
  discount_type: DiscountType;
  giftInfo: {
    giftId: number;
    giftName: string;
    giftQty: number;
  };
  program_name: string;
};

export type PromotionInfo = {
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

export type OutputCounsel = {
  totalQty: number;
  totalPrice: number;
  totalPriceVat: number;
  totalDcAmt: number;
  totalDcPayment: number;
  totalShippingFee: number;
  totalNetPrice: number;
  counsel: {
    _id: string;
    orderNo: string;
    promotion: PromotionType;
    counsels: {
      cartId: string;
      productId: number;
      quantity: number;
      productName: string;
      price: number;
      tax: number;
      dcAmtProduct: number;
    }[];
    create_date: Date;
    coupon_code: string;
    coupon_type: RewardType;
    promotions_on_order: PromotionInfo[];
    promotions_on_cart: PromotionInfo[];
    promotions_next_order: PromotionInfo[];
    promotions_coupon: PromotionInfo[];
  };
};

export type GetCounselData = {
  getCounsel: OutputCounsel;
};

const promotionQueryAttributes = `
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
`;

export const OUTPUT_COUNSEL = `
  totalQty
  totalPrice
  totalPriceVat
  totalDcAmt
  totalDcPayment
  totalShippingFee
  totalNetPrice
  counsel {
    _id
    orderNo
    counsels {
      cartId
      productId
      quantity
      productName
      price
      tax
      dcAmtProduct
    }
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
      ${promotionQueryAttributes}
    }
    promotions_on_cart {
      ${promotionQueryAttributes}
    }
    promotions_on_order {
      ${promotionQueryAttributes}
    }
    promotions_next_order {
      ${promotionQueryAttributes}
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
