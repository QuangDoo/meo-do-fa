import { gql } from 'apollo-boost';

export type City = {
  id: number;
  country_id: string[];
  name: string;
  code: string;
  display_name: string;
};

export type GetCitiesData = {
  getCities: City[];
};

export const GET_CITIES = gql`
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
