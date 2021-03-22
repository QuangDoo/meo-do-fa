import { gql } from '@apollo/client';

export type Manufacturer = {
  id: string;
  name: string;
  short_name: string;
  description: string;
};

export const GET_ALL_MANUFACTURERS = gql`
  query {
    getManufactoriesAll {
      id
      name
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
      name
      short_name
    }
  }
`;

export const SEARCH_MANUFACTURERS = gql`
  query searchManufactory($page: Int!, $pageSize: Int!, $name: String!) {
    searchManufactory(page: $page, pageSize: $pageSize, name: $name) {
      id
      name
      short_name
    }
  }
`;

export const GET_MANUFACTORY_DETAILS = gql`
  query($id: Int!) {
    getManufactory(id: $id) {
      id
      name
      short_name
      description
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

export type GetManufactoryDetailsVars = {
  id: number;
};

export type GetManufactoryDetailsData = {
  getManufactory: {
    id: number;
    name: string;
    short_name: string;
    description: string;
  };
};
