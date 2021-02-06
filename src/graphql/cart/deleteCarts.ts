import { gql } from '@apollo/client';

export const DELETE_CARTS = gql`
  mutation($ids: [String!]!) {
    deleteCarts(inputs: { listId: $ids }) {
      code
      status
      message
    }
  }
`;

export type DeleteCartsVars = {
  ids: string[];
};

export type DeleteCartData = {
  deleteCart: {
    code: number;
    status: string;
    message: string;
  };
};
