import { gql } from '@apollo/client';
import { User } from 'src/types/User';

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
