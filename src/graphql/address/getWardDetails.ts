import { gql } from '@apollo/client';

import { City } from './getCities';
import { District } from './getDistricts';
import { Ward } from './getWards';

export type Country = {
  id: number;
  name: string;
};

export type GetWardDetailsData = {
  ward: Ward;
  district: District;
  city: City;
  country: Country;
};

export const GET_WARD_DETAILS = gql`
  query getWard($ward_id: Int!) {
    getWard(ward_id: $ward_id) {
      ward {
        id
        name
      }
      district {
        id
        name
      }
      city {
        id
        name
      }
      country {
        id
        name
      }
    }
  }
`;
