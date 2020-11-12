import { gql } from 'apollo-boost';

export const GET_USER = gql`
  query getUsers {
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
      contact_address
      company_name
      vat
      representative
      business_license
    }
  }
`;
export const GET_CITY = gql`
  query getAllCity {
    getCities {
      id
      zipcode
      city_code
      city
      district
      district_code
      ward
    }
  }
`;
export const GET_DISTRICT = gql`
  query getAllDistrict {
    getDistrict {
      id
      zipcode
      city_code
      city
      district
      district_code
      ward
    }
  }
`;
export const GET_WARD = gql`
  query getAllWard {
    getWard {
      id
      zipcode
      city_code
      city
      district
      district_code
      ward
    }
  }
`;
export const GET_INFO = gql`
  query getUpdateUserInput {
    UpdateUserInput {
      name
      display_name
      email
      contact_address
      company_name
      vat
      representative
      business_license
    }
  }
`;