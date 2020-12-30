import { gql } from '@apollo/client';

export const GET_ADDRESS_INFO_USER = gql`
  query {
    getAddressInfoUser {
      deliveries {
        id
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

type DeliveryInfo = {
  id: number;
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  district: string;
  ward: string;
};

type InvoiceInfo = {
  id: number;
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  district: string;
  ward: string;
};

export type GetAddressInfoData = {
  getAddressInfoUser: {
    deliveries: DeliveryInfo[];
    invoices: InvoiceInfo[];
  };
};
