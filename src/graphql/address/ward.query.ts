import { gql } from '@apollo/client';

export const GET_WARD = gql`
  query getWard($city_code: String!, $district_code: String) {
    getWard(inputs: { city_code: $city_code, district_code: $district_code }) {
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
