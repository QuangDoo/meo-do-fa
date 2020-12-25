import { gql } from '@apollo/client';

export type AddToCartData = {
  code: number;
  status: string;
  message: string;
};

export type AddToCartVars = {
  productId: number;
  quantity: number;
  price: number;
  productName: string;
  oldPrice?: number;
  promotionIds?: string[];
  dcAmt?: number;
};

export const ADD_TO_CART = gql`
  mutation createCart(
    $productId: Int!
    $quantity: Int!
    $price: Float!
    $productName: String!
    $oldPrice: Float
    $promotionIds: [String]
    $dcAmt: Float
  ) {
    createCart(
      inputs: {
        productId: $productId
        quantity: $quantity
        price: $price
        productName: $productName
        oldPrice: $oldPrice
        promotionIds: $promotionIds
        dcAmt: $dcAmt
      }
    ) {
      code
      status
      message
    }
  }
`;
