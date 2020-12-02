import { gql } from '@apollo/client';

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
export const CREATE_COUNSEL = gql`
  mutation createCounsel($cartIds: [String]!) {
    createCounsel(inputs: { cartIds: $cartIds }) {
      code
      status
      message
      data {
        counsel {
          orderNo
          counsels {
            cartId
            quantity
          }
        }
        totalQty
        totalPrice
        totalDcAmt
        totalShippingFee
        totalNetPrice
      }
    }
  }
`;
