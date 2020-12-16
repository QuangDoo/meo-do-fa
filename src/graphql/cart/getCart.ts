import { gql } from '@apollo/client';

export type GetCartData = {
  getCart: {
    carts: {
      _id: string;
      quantity: number;
      productId: string;
      productName: string;
      price: number;
      list_price: number;
      oldPrice: number;
      product: {
        image_512: string;
        is_quick_invoice: boolean;
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
          is_quick_invoice
        }
      }
      totalPrice
      totalQty
    }
  }
`;
