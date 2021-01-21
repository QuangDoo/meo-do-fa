import { gql } from '@apollo/client';

import { AddressDetail } from './createDeliveryUser';

export type UpdateDeliveryUserData = {
  code: number;
  status: string;
  message: string;
};

export type UpdateDeliveryUserVars = Partial<{
  fullName: string;
  email: string;
  shipping_address: {
    city: AddressDetail;
    district: AddressDetail;
    ward: AddressDetail;
    street: string;
  };
  phong: string;
  id: number;
}>;

export const UPDATE_DELIVERY_USER = gql`
  mutation($inputs: {
    fullName: String
    email: String
    shipping_address: ContactAddress
    phone: String
    id: number
  }) {
    code
    status
    message
  }
`;
