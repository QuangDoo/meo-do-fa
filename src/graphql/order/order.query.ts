import { gql } from 'apollo-boost';

export const GET_PRODUCTS_LIST_CART = gql`
  query {
    getCart {
      carts {
        _id
        userId
        productId
        quantity
        price
        oldPrice
        productName
        promotionIds
        dcAmt
        shippingFee
        create_date
        update_date
      }

      totalPrice
    }
  }
`;
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
    }
  }
`;
