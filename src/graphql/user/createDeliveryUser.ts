import { gql } from '@apollo/client';

type AddressDetail = {
  id: number;
  name: string;
};

type ContactAddress = {
  city: AddressDetail;
  district: AddressDetail;
  ward: AddressDetail;
  street: string;
};

type CreateDeliveryUserInput = {
  fullName: string;
  email: string;
  shipping_address: ContactAddress;
  phone: string;
};

export type CreateDeliveryUserVars = {
  inputs: CreateDeliveryUserInput;
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
