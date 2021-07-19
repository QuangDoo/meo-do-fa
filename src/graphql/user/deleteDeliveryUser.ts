import { gql } from '@apollo/client';

export type DeleteDeliveryUserData = {
  code: number;
  status: number;
  message: string;
};

export type DeleteDeliveryUserVars = {
  id: number;
};

export const DELETE_DELIVERY_USER = gql`
  mutation ($id: Int!) {
    deleteDeliveryUser(id: $id) {
      code
      status
      message
    }
  }
`;
