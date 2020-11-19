import { gql } from 'apollo-boost';

export const GET_CITY = gql`
  query {
    getCities {
      id
      name
      display_name
    }
  }
`;
export const GET_DISTRICT = gql`
  query getDistricts($city_id: Int) {
    getDistricts(city_id: $city_id) {
      id
      name
      display_name
    }
  }
`;
export const GET_WARD = gql`
  query getWards($district_id: Int!) {
    getWards(district_id: $district_id) {
      id
      name
      display_name
    }
  }
`;
