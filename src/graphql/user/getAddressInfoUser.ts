import { gql } from '@apollo/client';

export type DeliveryAddress = {
  id: number;
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  district: string;
  ward: string;
};

export type GetAddressInfoUserData = {
  getAddressInfoUser: {
    deliveries: DeliveryAddress[];
  };
};

export const GET_ADDRESS_INFO_USER = gql`
  query {
    getAddressInfoUser {
      deliveries {
        id
        use
        name
        phone
        email
        street
        city
        district
        ward
      }
    }
  }
`;
