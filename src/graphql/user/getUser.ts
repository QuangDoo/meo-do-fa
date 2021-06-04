import { gql } from '@apollo/client';

import { City } from '../address/getCities';
import { District } from '../address/getDistricts';
import { Ward } from '../address/getWards';

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  account_type: string;
  contact_address: null | {
    city: City;
    district: District;
    ward: Ward;
    street: string;
  };
  company_name: string;
  vat: string;
  representative: string;
  business_license: string;
  cust_no: string;
  activated: boolean;
  waiting: boolean;
  is_auth_otp: boolean;
};

export type GetUserData = {
  getUser: User;
};

export const GET_USER = gql`
  query {
    getUser {
      id
      name
      email
      phone
      account_type
      contact_address {
        city {
          id
          name
        }
        district {
          id
          name
        }
        ward {
          id
          name
        }
        street
      }
      company_name
      vat
      representative
      business_license
      cust_no
      activated
      waiting
      is_auth_otp
    }
  }
`;
