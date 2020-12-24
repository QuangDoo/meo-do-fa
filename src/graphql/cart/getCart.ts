import { gql } from '@apollo/client';

import { RewardType } from '../coupons/getUsedCoupons';

export type PromotionInfo = {
  reward_type: RewardType;
  discount_percentage: number;
  reward_product_id: number;
  reward_product_name: number;
  reward_product_quantity: number;
};

export type CartItem = {
  _id: string;
  quantity: number;
  productId: number;
  productName: string;
  price: number;
  list_price: number;
  oldPrice: number;
  product: {
    slug: string;
    image_512: string;
    is_quick_invoice: boolean;
  };
  promotions: PromotionInfo[];
};

export type GetCartData = {
  getCart: {
    carts: CartItem[];
    totalPrice: number;
    totalQty: number;
  };
};

export const GET_CART = gql`
  query {
    getCart {
      carts {
        _id
        quantity
        productId
        productName
        price
        oldPrice
        product {
          slug
          image_512
          is_quick_invoice
        }
        promotions {
          reward_type
          discount_percentage
          reward_product_id
          reward_product_name
          reward_product_quantity
        }
      }
      totalPrice
      totalQty
    }
  }
`;
