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
export const GET_WARD_DETAIL = gql`
  query getWard($ward_id: Int) {
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
