import { gql } from '@apollo/client';

type AddressDetail = {
  id: number;
  name: string;
};

export type CreateDeliveryUserVars = {
  inputs: {
    fullName: string;
    email: string;
    shipping_address: {
      city: AddressDetail;
      district: AddressDetail;
      ward: AddressDetail;
      street: string;
    };
    phone: string;
  };
};

export type CreateDeliveryUserData = {
  code: number;
  status: string;
  message: string;
};

export const CREATE_DELIVERY_USER = gql`
  mutation createDeliveryUser($inputs: createDeliveryUserInput!) {
    createDeliveryUser(inputs: $inputs) {
      code
      status
      message
    }
  }
`;
