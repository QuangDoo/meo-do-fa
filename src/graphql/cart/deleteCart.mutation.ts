import { gql } from '@apollo/client';

export type DeleteCartData = {
  deleteCart: {
    code: number;
    status: string;
    message: string;
  };
};

export type DeleteCartVars = {
  _id: string;
};

export const DELETE_CART = gql`
  mutation($_id: String!) {
    deleteCart(_id: $_id) {
      code
      status
      message
    }
  }
`;
