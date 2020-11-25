import { gql } from '@apollo/client';

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

export const GET_MANUFACTURERS = gql`
  query getManufactories($page: Int!, $pageSize: Int!) {
    getManufactories(page: $page, pageSize: $pageSize) {
      id
      short_name
    }
  }
`;

export type GetManufacturersData = {
  getManufactories: {
    id: string;
    short_name: string;
  }[];
};

export type GetManufacturersVars = {
  page: number;
  pageSize: number;
};
