import { gql } from '@apollo/client';

import { CartItem } from './getCart';

export type GetCartByProductVars = {
  ids: string[];
};

export type GetCartByProductData = {
  getCartByProduct: {
    carts: CartItem[];
    totalPrice: number;
    totalNetPrice: number;
    totalDc: number;
    totalShippingFee: number;
    totalQty: number;
  };
};

export const GET_CART_BY_PRODUCT = gql`
  query($ids: [String!]!) {
    getCartByProduct(ids: $ids) {
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
          max_qty_per_order
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
      totalNetPrice
      totalDc
      totalShippingFee
      totalQty
    }
  }
`;
