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
