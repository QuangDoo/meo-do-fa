import { gql } from '@apollo/client';

export type UpdateCartVars = {
  inputs: {
    _id: string;
    quantity: number;
  };
};

export type UpdateCartData = {
  updateCart: {
    code: number;
    status: string;
    message: string;
  };
};

export const UPDATE_CART = gql`
  mutation ($inputs: UpdateCartInput!) {
    updateCart(inputs: $inputs) {
      code
      status
      message
    }
  }
`;
