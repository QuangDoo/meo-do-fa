import { gql } from 'apollo-boost';

export type GetCartData = {
  getCart: {
    carts: {
      _id: string;
      quantity: number;
      productId: string;
      productName: string;
      price: number;
      oldPrice: number;
      product: {
        image_512: string;
      };
    }[];
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
          image_512
        }
      }
      totalPrice
      totalQty
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
