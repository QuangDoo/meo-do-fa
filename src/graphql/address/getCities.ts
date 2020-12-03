import { gql } from '@apollo/client';

export type City = {
  id: number;
  name: string;
};

export type GetCitiesData = {
  getCities: City[];
};

export const GET_CITIES = gql`
  query {
    getCities {
      id
      name
    }
  }
`;
