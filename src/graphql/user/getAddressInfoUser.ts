import { gql } from '@apollo/client';

type Address = {
  id: number;
  use: boolean;
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
    deliveries: Address[];
    invoices: Address[];
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
      invoices {
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
