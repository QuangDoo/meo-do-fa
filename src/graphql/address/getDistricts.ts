import { gql } from '@apollo/client';

export type District = {
  id: number;
  name: string;
};

export type GetDistrictsData = {
  getDistricts: District[];
};

export type GetDistrictsVars = {
  city_id: number;
};

export const GET_DISTRICTS = gql`
  query getDistricts($city_id: Int!) {
    getDistricts(city_id: $city_id) {
      id
      name
      display_name
    }
  }
`;
