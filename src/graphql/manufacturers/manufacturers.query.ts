import { gql } from '@apollo/client';

export type Manufacturer = {
  id: string;
  short_name: string;
};

export const GET_ALL_MANUFACTURERS = gql`
  query {
    getManufactoriesAll {
      id
      short_name
    }
  }
`;

export type GetAllManufacturersData = {
  getManufactoriesAll: Manufacturer[];
};

export const GET_MANUFACTURERS = gql`
  query getManufactories($page: Int!, $pageSize: Int!) {
    getManufactories(page: $page, pageSize: $pageSize) {
      id
      short_name
    }
  }
`;

export const SEARCH_MANUFACTURERS = gql`
  query searchManufactory($page: Int!, $pageSize: Int!, $name: String!) {
    searchManufactory(page: $page, pageSize: $pageSize, name: $name) {
      short_name
      id
    }
  }
`;

export type GetManufacturersData = {
  getManufactories: Manufacturer[];
  searchManufactory?: Manufacturer[];
};

export type GetManufacturersVars = {
  page: number;
  pageSize: number;
  name?: string;
};
