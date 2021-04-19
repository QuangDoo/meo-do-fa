import { gql } from '@apollo/client';
import { RewardType } from 'src/graphql/order/getCounsel';

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
  oldPrice: number;
  tax: number;
  product: {
    slug: string;
    image_512: string;
    is_quick_invoice: boolean;
    old_price: number;
    sale_price: number;
  };
  promotions: PromotionInfo[];
  is_available: boolean;
};

export type GetCartData = {
  getCart: {
    carts: CartItem[];
    totalPrice: number;
    totalNetPrice: number;
    totalDc: number;
    totalShippingFee: number;
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
        tax
        product {
          slug
          image_512
          is_quick_invoice
          old_price
          sale_price
        }
        promotions {
          reward_type
          discount_percentage
          reward_product_id
          reward_product_name
          reward_product_quantity
        }
        is_available
      }
      totalPrice
      totalNetPrice
      totalDc
      totalShippingFee
      totalQty
    }
  }
`;
