import { gql } from '@apollo/client';

export type User = {
  _id: string;
  id: number;
  name: string;
  display_name: string;
  email: string;
  phone: string;
  account_type: string;
  customer_rank: number;
  roles: string[];
  create_date: Date;
  update_date: Date;
  city: string;
  district: string;
  ward: string;
  street: string;
  company_name: string;
  vat: string;
  representative: string;
  business_license: string;
};

export type GetUserData = {
  getUser: User;
};

export const GET_USER = gql`
  query {
    getUser {
      _id
      id
      name
      display_name
      email
      phone
      account_type
      customer_rank
      roles
      create_date
      update_date
      city
      district
      ward
      street
      company_name
      vat
      representative
      business_license
    }
  }
`;
