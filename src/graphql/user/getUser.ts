import { gql } from '@apollo/client';

import { City } from '../address/getCities';
import { District } from '../address/getDistricts';
import { Ward } from '../address/getWards';

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
    }
  }
`;
