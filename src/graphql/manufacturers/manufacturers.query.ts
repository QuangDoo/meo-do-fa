import { gql } from 'apollo-boost';

export const GET_ALL_MANUFACTURERS = gql`
  query {
    getManufactoriesAll {
      id
      short_name
    }
  }
`;

export type GetAllManufacturersData = {
  getManufactoriesAll: {
    id: string;
    short_name: string;
  }[];
};
