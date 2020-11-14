import { gql } from 'apollo-boost';

export const GET_CITY = gql`
  query {
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
