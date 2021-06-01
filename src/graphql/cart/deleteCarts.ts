import { gql } from '@apollo/client';

export type DeleteCartsData = {
  deleteCart: {
    code: number;
    status: string;
    message: string;
  };
};

export type DeleteCartsVars = {
  ids: string[];
};

export const DELETE_CARTS = gql`
  mutation($ids: [String!]!) {
    deleteCarts(inputs: { listId: $ids }) {
      code
      status
      message
    }
  }
`;
