import { gql } from '@apollo/client';

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
      contact_address
      company_name
      vat
      representative
      business_license
    }
  }
`;
export const GET_USER_ADDRESS = gql`
  query getAddressInfoUser {
    getAddressInfoUser {
      deliveries {
        id
        userId
        name
        display_name
        parent_id
        phone
        email
        street
        ward
        district
        city
        type
        use
        create_date
        update_date
      }
      invoices {
        id
        userId
        name
        display_name
        parent_id
        phone
        email
        street
        ward
        district
        city
        type
        use
        create_date
        update_date
      }
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
