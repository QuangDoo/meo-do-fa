import { gql } from 'apollo-boost';
import { GetUserResponse } from 'src/types/responses';

export type GetUserData = {
  getUser: GetUserResponse;
};

export const GET_USER = gql`
  query {
    getUser {
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
      company_name
      vat
      representative
      business_license
    }
  }
`;
