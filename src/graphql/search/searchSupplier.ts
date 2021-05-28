import { gql } from '@apollo/client';

import { SEARCH_QUERY_ATTRIBUTES, SearchResult } from './searchProducts';

export type SearchSupplierData = {
  getSuppliers: SearchResult[];
};

export type SearchSupplierVars = {
  page: number;
  pageSize: number;
  name: string;
};

export const SEARCH_SUPPLIER = gql`
  query ($page: Int!, $pageSize: Int!, $name: String!) {
    getSuppliers(page: $page, pageSize: $pageSize, name: $name) {
      id
      name
      comment
      street
      email
      phone
      vat
    }
  }
`;
