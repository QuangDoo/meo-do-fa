import { gql } from 'apollo-boost';

export const GET_DISTRICT = gql`
  query getDistrict($city_code: String) {
    getDistrict(city_code: $city_code) {
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
