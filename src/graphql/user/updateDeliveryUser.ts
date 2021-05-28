import { gql } from '@apollo/client';

import { AddressDetail } from './createDeliveryUser';

export type UpdateDeliveryUserData = {
  code: number;
  status: string;
  message: string;
};

export type UpdateDeliveryUserVars = {
  inputs: {
    id: number;
    fullName?: string;
    email?: string;
    shipping_address?: {
      city: AddressDetail;
      district: AddressDetail;
      ward: AddressDetail;
      street: string;
    };
    phone?: string;
  };
};

export const UPDATE_DELIVERY_USER = gql`
  mutation ($inputs: UpdateDeliveryUserInput!) {
    updateDeliveryUser(inputs: $inputs) {
      code
      status
      message
    }
  }
`;
